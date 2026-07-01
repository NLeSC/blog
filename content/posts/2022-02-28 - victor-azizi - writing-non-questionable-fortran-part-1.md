---
layout: post
title: "Writing non-questionable Fortran (Part 1)"
date: 2022-02-28
author: Victor Azizi
published: true
source: medium
source_url: https://blog.esciencecenter.nl/writing-non-questionable-fortran-part-1-fc5edc7115ee
tags:
  - Git
---

Luckily gfortran (I’ll stick to gfortran, although many commercial/non-open compilers have similar flags, but named differently) has compiler flags available that disallow such legacy behaviour. The following two compiler flags should solve the issues that we are having with the example.

* `-fimplicit-none
`Do not allow any implicitly defined variables (this is the same as putting `implicit none` in every subroutine/function (which I guarantee you will forget at some point, and then this flag will save you)
* `-Werror=implicit-interface
`Do not allow any implicitly defined function calls

If we add `implicit none` to our program and procedures, and compile with the flags enabled the following happens:

Great! The compiler is trying to tell us what went wrong. Let’s solve the first error first. We have called the Procedure `hello_world` with an implicit interface, uh-oh 😨.

## Fixing the Call to hello_world

The interface of the `hello_world` function can be exposed to the main.f90* in three ways:

* Including the *hello_world.f90* file in the *main.f90* file

2. Telling the compiler explicitly what the interface looks like and adding it to the program**

3. Creating a module from the *hello_world.f90* file, and telling *main.f90* to use the `hello_world` definition from there

Method 1 causes the subroutine to be duplicated each time it is included, probably not ideal. Method 2 gets rid of the errors, but the interface is still not correct! Method 3 does not cause code duplication, and is not able to wrongly specify the interface. Therefore my preference always goes to method 3. However, now we have introduced an *ordering* in which the files must be compiled. There are a few programs out in the wild which can create the correct *compile order* for you (e.g. [CMake](https://cmake.org/) and [makedepf90](https://github.com/outpaddling/makedepf90) ). But for now we know the correct order, first we have to compile *hello_world.f90* to get the interface *hello_world_mod.mod* and object file *hello_world.o*:

Aw shucks, we still have one more error left! gfortran tells us that we are trying to use a `CHARACTER(1)` in a function that takes an `INTEGER(4)`. Which brings us to the second problem we have to solve: the types used in our program!

Recompile everything, et voilà:

We have successfully fixed our program and made all the interfaces and variables explicit, leaving less room for questionable-Fortran behaviour. Without implicit typing the code also becomes better maintainable and has better readability than before, which in turn means more people will be able to understand and use the code, win-win!

## Takeaway

Always use the `-fimplicit-none` and `-Werror=implicit-interface` compiler options when compiling your Fortran code, and add `implicit none` to every procedure and the program itself!

*Originally published at *[*https://blog.lipsum.eu*](https://blog.lipsum.eu/fortran_engineering_pt1/)*.*
