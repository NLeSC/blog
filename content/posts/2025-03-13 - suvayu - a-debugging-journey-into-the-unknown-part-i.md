---
layout: post
title: "A debugging journey into the unknown (part I)"
date: 2025-03-13
author: Suvayu
published: true
source: medium
source_url: https://blog.esciencecenter.nl/a-debugging-journey-into-the-unknown-a2fa291bfb35
tags:
  - API
  - Environment
  - Git
  - Julia
  - Linux
---

*Faced with a buggy library, most people will just give up and wait for a patch to be released. Certainly not our engineers.*

![A debugging journey into the unknown (part I)](/assets/a-debugging-journey-into-the-unknown-par-feee515a.jpeg)
[*NASA/JPL-Caltech*](https://science.nasa.gov/image-detail/pia17049-hires/)It all started with a colleague trying to update their Julia environment for one of [our projects](https://github.com/TulipaEnergy). They could not update because a dependency, the Julia bindings for DuckDB, was failing to compile. For the moment we decided to deal with it later, and pinned `DuckDB.jl` to the working version. We also filed an issue upstream: [duckdb/duckdb#13911](https://github.com/duckdb/duckdb/issues/13911).

Since there was no significant progress on the issue for a few months, I decided to dive in once and for all — this is that story.

## The issue

On Windows, trying to install any version of `DuckDB.jl` later than `1.0.0` was failing with the error:

ERROR: LoadError: could not load symbol "duckdb_vector_size":
The specified procedure could not be found.Some Julia packages, like `DuckDB.jl` depend on a native library. The native library is an internal dependency, and typically named `MyPackage_jll.jl`; in the case of DuckDB, it is `DuckDB_jll.jl`. The error above tells us that during the compilation step, Julia tries to load a symbol from the native library, but cannot find it. A "symbol" here refers to a DuckDB C-API function provided by the native DuckDB library.

So as a first step, I wanted to check: can we actually install this library, and load that symbol? To get the call syntax correct, I looked at the source code of `[DuckDB.jl](https://github.com/duckdb/duckdb/blob/5f5512b827df6397afd31daedb4bbdee76520019/tools/juliapkg/src/api.jl#L1285-L1297)`[ ](https://github.com/duckdb/duckdb/blob/5f5512b827df6397afd31daedb4bbdee76520019/tools/juliapkg/src/api.jl#L1285-L1297):

function duckdb_vector_size()
    return ccall((:duckdb_vector_size, libduckdb), idx_t, ())
endThe variable `idx_t` above is defined in `ctypes.jl` as:

const idx_t = UInt64 # DuckDB index typeSo we can test loading the native library like this:

pkg&gt; add DuckDB_jll
julia&gt; using DuckDB_jll
julia&gt; ccall((:duckdb_vector_size, libduckdb), UInt64, ())The above recipe replicates the error for any version newer than `1.0.0`! Hurray! Now that we have confirmation that the problem is in the native library, we have to understand: *Why is the symbol not visible to Julia?*

## Symbol visibility in Windows DLLs

My first hurdle was to find a way to get both versions of the library and compare. I decided to install different versions of the native library `DuckDB_jll`in different directories; after loading the library, the `libduckdb` variable points to the correct path of the shared library. We can then use other tools to inspect the [dynamic-link libraries](https://en.wikipedia.org/wiki/Dynamic-link_library) (DLLs) and check if the symbols actually exist. If we can compare the working version of the native library with a version that does not maybe we can find out what is wrong.

On Linux, we can use `nm` from `binutils` to look at the symbols present in the library. Thanks to the `-C` flag, `nm` can even ["demangle"](https://en.wikipedia.org/wiki/Name_mangling) symbol names if necessary. So for the moment we can copy over DLLs from Windows to Linux, and inspect.

$ nm -C libduckdb.dll | grep duckdb_vector_size  # working version: v1.0.0
000000036a271d00 T duckdb_vector_size
$ nm -C libduckdb.dll | grep duckdb_vector_size  # not working version: e.g. v1.1.2
000000036a36e0e0 T duckdb_vector_size
000000036be998d0 r .rdata$.refptr.duckdb_vector_size
000000036be998d0 R .refptr.duckdb_vector_sizeNo luck 😦, seems that the symbols exist for both versions of the native library. I was puzzled. Searching around I found while building Windows DLLs, you have to explicitly [export symbol names](https://learn.microsoft.com/en-us/cpp/build/exporting-from-a-dll-using-declspec-dllexport) using the `__declspec(dllexport)` attribute. Besides signalling which names are available, it also serves as a mechanism to optimise DLL load times. So I went looking for these attributes in the DuckDB [source code](https://github.com/duckdb/duckdb/blob/5f5512b827df6397afd31daedb4bbdee76520019/src/include/duckdb.h#L17-L31):

#ifndef DUCKDB_API
#ifdef _WIN32
#ifdef DUCKDB_STATIC_BUILD
#define DUCKDB_API
#else
#if defined(DUCKDB_BUILD_LIBRARY) &amp;&amp; !defined(DUCKDB_BUILD_LOADABLE_EXTENSION)
#define DUCKDB_API __declspec(dllexport)
#else
#define DUCKDB_API __declspec(dllimport)
#endif
#endif
#else
#define DUCKDB_API
#endif
#endifYou can see, the `#ifdef` directives conditionally defines the macro `DUCKDB_API` which expands to `__declspec(dllexport)` when building a Windows DLL. Later in the header file, this macro is used to [mark every C-API function for export](https://github.com/duckdb/duckdb/blob/5f5512b827df6397afd31daedb4bbdee76520019/src/include/duckdb.h#L1289-L1295).

DUCKDB_API idx_t duckdb_vector_size();Now that we know the C-API function name symbols are marked for export correctly, we should check if they are indeed exported. After some searching, I learnt Windows development tools includes the program `dumpbin.exe` that can show the exported symbol names. So I can search for exported symbols in the output.

Working version of `libduckdb.dll` :

&gt; dumpbin.exe /EXPORTS .\bin\libduckdb.dll | findstr duckdb_vector_size
        335  14E 0078D1B0 duckdb_vector_sizeFaulty version of `libduckdb.dll` :

&gt; dumpbin.exe /EXPORTS .\bin\libduckdb.dll | findstr duckdb_vector_size
# empty output, since nothing was foundSo it is confirmed that the symbol export is not working for the faulty version. However we still do not know which commit introduced the issue. Let us try to find that 🙂.

## Hunt for the first “bad” commit

To be able to find the first bad commit, we need to be able to compile the library. Julia has a whole other infrastructure called `[BinaryBuilder](https://binarybuilder.org/)`. It cross-compiles native binaries for all platforms on Linux. This is a whole another rabbit hole, and let us shelve this for another time. The only relevant bit is, the builds are done only* on Linux. This presents a different problem, `dumpbin.exe`, the tool to check if the symbol export is correct is available only on Windows. If we are to find the bad commit, we need to automate the build &amp; check steps and run it with `git-bisect`. How can we do that if parts of our toolchain runs on different platforms‽

So I went searching again for an alternative. Unsurprisingly, Wine (the Windows compatibility layer for Linux) ships with the tool `[winedump](https://gitlab.winehq.org/wine/wine/-/wikis/Man-Pages/winedump)`, which is an equivalent to the Windows tool `dumpbin.exe`.

To build with Windows DLL, we need to cross-compile DuckDB on Linux using the MingW-w64 toolchain. Combined with the `winedump` tool, I wrote the following script that we can use to test a successful build.

#!/bin/bash

rm -rf build
cmake -B build \
      -DCMAKE_BUILD_TYPE=Release \
      -DCMAKE_TOOLCHAIN_FILE=mingw-w64-x86_64.cmake \
      -DBUILD_EXTENSIONS='autocomplete;icu;parquet;json;fts;tpcds;tpch' \
      -DENABLE_EXTENSION_AUTOLOADING=1 \
      -DENABLE_EXTENSION_AUTOINSTALL=1 \
      -DBUILD_UNITTESTS=FALSE \
      -DBUILD_SHELL=TRUE \
      -DDUCKDB_EXPLICIT_PLATFORM=x86_64-w64-mingw32-cxx11 .
cmake --build build

[[ $? -ne 0 ]] &amp;&amp; \
{
    echo "build failed, cannot test"
    exit 125
}

if [[ -f build/src/libduckdb.dll ]]; then
    winedump -j export build/src/libduckdb.dll | grep -q duckdb_vector_size
    if [[ $? -eq 0 ]]; then
	exit 0
    else
	exit 1
    fi
else
    echo "cannot find DLL, cannot test"
    exit 125
fiThe script builds DuckDB, and checks whether the generated DLL file export the C-API symbols correctly. It also handles a few corner cases of build failures. Note that the build command uses the following toolchain file (thanks to this [gist](https://gist.github.com/peterspackman/8cf73f7f12ba270aa8192d6911972fe8/)).

set(CMAKE_SYSTEM_NAME Windows)
set(TOOLCHAIN_PREFIX x86_64-w64-mingw32)

# cross compilers to use for C, C++ and Fortran
set(CMAKE_C_COMPILER ${TOOLCHAIN_PREFIX}-gcc)
set(CMAKE_CXX_COMPILER ${TOOLCHAIN_PREFIX}-g++)
set(CMAKE_Fortran_COMPILER ${TOOLCHAIN_PREFIX}-gfortran)
set(CMAKE_RC_COMPILER ${TOOLCHAIN_PREFIX}-windres)

# target environment on the build host system
set(CMAKE_FIND_ROOT_PATH /usr/${TOOLCHAIN_PREFIX})

# modify default behavior of FIND_XXX() commands
set(CMAKE_FIND_ROOT_PATH_MODE_PROGRAM NEVER)
set(CMAKE_FIND_ROOT_PATH_MODE_LIBRARY ONLY)
set(CMAKE_FIND_ROOT_PATH_MODE_INCLUDE ONLY)Now we can use this script with `git-bisect` to find the first bad commit, like this:

$ git bisect start
$ git bisect bad v1.1.2
$ git bisect good v1.0.0
$ git bisect run ./bisect-script.bash
$ git bisect visualize # shows a nice summary
$ git bisect resetThe bisection led me to this commit: [d1ea1538](https://github.com/duckdb/duckdb/commit/d1ea1538c9217fb536485f1500f04a0b55b1e584). Unfortunately it is not clear how that commit would lead to symbol export failure, it only adds 11 new functions to the C-API (so 11 new symbols). So for now, this debugging journey has to stop here, without a clear resolution. But we did learn a lot of new concepts, and used a wide variety of tools to investigate.

## What did we learn?

To summarise, the issue is:

* All releases of `DuckDB.jl` after `v1.0.0` on Windows are broken.
* We recreate the issue without Julia, which shows the the DuckDB build using the MingW-w64 toolchain is broken for all releases after `v1.0.0` .

And in the process of debugging this, we learnt:

* Windows has a separate mechanism to export symbol names in its shared libraries (DLL).
* We learnt about tools to inspect symbols in native libraries; namely `nm`, `dumpbin.exe`, and `winedump`.
* We learnt about the Julia build system for native libraries (a topic for a future post).
* We learnt to write a script that we can use with `git-bisect` to run automatic bisections (a potential topic for a future post).

—

*The story isn’t complete. There will be a concluding part when I actually fix the problem.*

—

*Cross post from: *[*https://github.com/suvayu/suvayu/blob/master/blog/2025-02-15-duckdb-julia-windows.md*](https://github.com/suvayu/suvayu/blob/master/blog/2025-02-15-duckdb-julia-windows.md)
