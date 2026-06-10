---
layout: post
title: "Solving the mystery of the missing symbols! (part II)"
date: 2025-04-22
author: Suvayu
published: true
source: medium
source_url: https://blog.esciencecenter.nl/solving-the-mystery-of-the-missing-symbols-part-ii-acc122e11a96
tags:
  - uncategorized

---

## *This is the conclusion to the story I *[*wrote about*](https://medium.com/escience-center/a-debugging-journey-into-the-unknown-a2fa291bfb35)* earlier.*

In that earlier post, we were investigating why the MingW-w64 build of DuckDB fails to export the C-API symbols in the final DLL. We identified that the issue was introduced by the commit [d1ea1538](https://github.com/duckdb/duckdb/commit/d1ea1538c9217fb536485f1500f04a0b55b1e584). However, we could not ascertain the underlying reason for the problem. To take this further, let us try to isolate which part of the change was the cause.

![Solving the mystery of the missing symbols! (part II)](/assets/solving-the-mystery-of-the-missing-symbo-41382a82.jpg)
Photo by [Tomas Martinez](https://unsplash.com/@tomasmartinez?utm_source=medium&amp;utm_medium=referral) on [Unsplash](https://unsplash.com/?utm_source=medium&amp;utm_medium=referral)

## A dead-end

To identify the source file responsible for the bug, we can start by inspecting the different build artifacts and checking for the C-API symbols. But first, we need to log all the build commands. It is much easier to do this with Make than Ninja (default generator for DuckDB). We can choose our generator by calling CMake as:

$ cmake -G "Unix Makefiles" ...We can then log all the build commands by starting a verbose build with Make:

$ VERBOSE=1 make -j6 |&amp; tee build.logWith all the build commands recorded to a log file, I searched for commands that create the shared library `libduckdb.dll` and narrowed it down to the following set of build commands:

$ /usr/bin/cmake -E rm -f CMakeFiles/duckdb.dir/objects.a
$ /usr/bin/x86_64-w64-mingw32-ar qc CMakeFiles/duckdb.dir/objects.a @CMakeFiles/duckdb.dir/objects1.rsp
$ /usr/lib64/ccache/x86_64-w64-mingw32-g++ -O3 -DNDEBUG -shared -o libduckdb.dll \
    -Wl,--out-implib,libduckdb.dll.a -Wl,--major-image-version,0,--minor-image-version,0 -Wl,--whole-archive \
    CMakeFiles/duckdb.dir/objects.a -Wl,--no-whole-archive @CMakeFiles/duckdb.dir/linkLibs.rspGoing through the steps individually, we will see that even though the symbols are present in the earlier steps, the final library creation step drops them.

## Tracing through the build steps

Let us first look for the object file that has the C-API symbols.

$ tr ' ' '\n' &lt;CMakeFiles/duckdb.dir/objects1.rsp | grep capi.cpp
main/capi/CMakeFiles/duckdb_main_capi.dir/ub_duckdb_main_capi.cpp.objWe can then check for the C-API symbols in the object, and confirm that the object file is included in the objects archive.

$ nm -C main/capi/CMakeFiles/duckdb_main_capi.dir/ub_duckdb_main_capi.cpp.obj | grep duckdb_vector_size
0000000000004f60 T duckdb_vector_size
$ /usr/bin/x86_64-w64-mingw32-ar t CMakeFiles/duckdb.dir/objects.a | grep capi.cpp
ub_duckdb_main_capi.cpp.objIf we check for the C-API symbols again in the archive file, we see they are present and publicly visible (exported).

$ nm -C CMakeFiles/duckdb.dir/objects.a | grep duckdb_vector_size
0000000000004f60 T duckdb_vector_size
$ winedump -j export CMakeFiles/duckdb.dir/objects.a | grep duckdb_vector_size
 31a0ae4 duckdb_vector_sizeFinally, we can create the shared library by calling the linker.

$ /usr/lib64/ccache/x86_64-w64-mingw32-g++ -O3 -DNDEBUG -shared -o libduckdb.dll \
    -Wl,--out-implib,libduckdb.dll.a -Wl,--major-image-version,0,--minor-image-version,0 -Wl,--whole-archive \
    CMakeFiles/duckdb.dir/objects.a -Wl,--no-whole-archive @CMakeFiles/duckdb.dir/linkLibs.rspWe see that while the C-API symbols are present, they are not exported!

$ nm -C libduckdb.dll | grep duckdb_vector_size
00000001f3d116e0 T duckdb_vector_size
$ winedump -j export libduckdb.dll | grep duckdb_vector_size # no match
> While not helpful on its own, the observation that symbols are not exported in the final linking step that creates the DLL will make sense later.

## A clue

Since we could not already isolate the issue to a source file, next, I decided to “bisect” the contents of the problem commit. As the issue is with C-API symbols, I started with the files that have these symbols:

* `src/include/duckdb.h`,
* `src/main/capi/aggregate_function-c.cpp`, and
* `test/api/capi/capi_aggregate_functions.cpp`.

I commented out parts of the above files, while ensuring the build still succeeds, and checking for the C-API symbols in the final DLL in the usual way with `nm` and `winedump`. This led me to discover that the *problem disappears if we reorder the include headers* in `src/main/capi/aggregate_function-c.cpp`. You can see the change in this PR: [duckdb/duckdb#16396](https://github.com/duckdb/duckdb/pull/16396/files).

diff --git a/src/main/capi/aggregate_function-c.cpp b/src/main/capi/aggregate_function-c.cpp
index 43ddfdbc074a..1379f652d669 100644
--- a/src/main/capi/aggregate_function-c.cpp
+++ b/src/main/capi/aggregate_function-c.cpp
@@ -1,9 +1,11 @@
+// clang-format off
+#include "duckdb/main/capi/capi_internal.hpp"
+// clang-format on
 #include "duckdb/catalog/catalog.hpp"
 #include "duckdb/common/type_visitor.hpp"
 #include "duckdb/common/types.hpp"
 #include "duckdb/function/function.hpp"
 #include "duckdb/function/scalar_function.hpp"
-#include "duckdb/main/capi/capi_internal.hpp"
 #include "duckdb/main/client_context.hpp"
 #include "duckdb/parser/parsed_data/create_aggregate_function_info.hpp"
 #include "duckdb/planner/expression/bound_function_expression.hpp"This is, of course, not the correct solution since there should not be any dependence on the order in which we include headers. It is indicative of an underlying bug. This means some definition in the headers is being overridden silently. This can only happen for preprocessor macros; anything else would trigger a compilation error.

## Solution to the mystery!

After further investigation from DuckDB core developer Mark Raasveldt, the issue was resolved in this PR: [duckdb/duckdb#13697](https://github.com/duckdb/duckdb/pull/16397). So, what was the issue?

When building shared libraries for Windows, the public API has to be marked for export. This is done by adding the `__declspec(dllexport)` [attribute](https://github.com/suvayu/suvayu/blob/master/blog/2025-02-15-duckdb-julia-windows.md#symbol-visibility-in-windows-dlls) to the relevant symbols. In the DuckDB codebase this is done by defining a macro `DUCKDB_API` that expands to that attribute. However, there were two such definitions, they were in:

* `src/include/duckdb.h`, and
* `src/include/duckdb/common/winapi.hpp`.

Superficially, they seem equivalent, however, they are actually used in slightly different contexts. The macro defined in `duckdb.h` is used to annotate symbols that are part of the C-API*. Whereas the macro defined in `winapi.hpp` is used to mark symbols that comprise the *C++ API*. In an earlier commit ([367595af](https://github.com/duckdb/duckdb/commit/367595af51b459d07121647bc2de1beabc836e0c)), the macro defined in `winapi.hpp` was changed to exclude MingW builds.

diff --git a/src/include/duckdb/common/winapi.hpp b/src/include/duckdb/common/winapi.hpp
index 2cff5d12d4..65dd89975e 100644
--- a/src/include/duckdb/common/winapi.hpp
+++ b/src/include/duckdb/common/winapi.hpp
@@ -9,7 +9,7 @@
 #pragma once
 
 #ifndef DUCKDB_API
-#ifdef _WIN32
+#if defined(_WIN32) &amp;&amp; !defined(__MINGW32__)
 #if defined(DUCKDB_BUILD_LIBRARY) &amp;&amp; !defined(DUCKDB_BUILD_LOADABLE_EXTENSION)
 #define DUCKDB_API __declspec(dllexport)
 #else

## The reason &amp; the fix

When exporting symbols, MingW normally excludes inline functions (see `man x86_64-w64-mingw32-g++` and search for `-fkeep-inline-functions`). The macro redefinition handles this case by excluding symbol export for MingW.

Now, in the DuckDB source, depending on which definition is seen first, symbols may or may not be exported. This, of course, depends on the order of the include headers.

* If `DUCKDB_API` in `duckdb.h` is seen first, symbols are exported correctly, on the other hand
* if `DUCKDB_API` in `winapi.hpp` is seen first, symbols are not exported.

The final fix was to rename one of the macros to make the two definitions distinct so that they do not interfere with each other; i.e.

* `DUCKDB_API` in `duckdb.h` was renamed to `DUCKDB_C_API`, and
* `DUCKDB_API` in `winapi.hpp` remains unchanged.

## What did we learn?

After this resolution, any project reliant on this build can update to the latest version of DuckDB starting from version 1.2.1. In our case that is the Julia binding for DuckDB, `DuckDB.jl`. If we look at the original issue: [duckdb/duckdb#13911](https://github.com/duckdb/duckdb/issues/13911), there are many different projects reliant on it, so the impact of this fix is quite broad!

During this investigation, we also learnt:

* bisection is an incredibly effective idea that can be used in many different contexts, and
* macro hygiene is important in C/C++ code bases.
