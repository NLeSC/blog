---
layout: post
title: "Use Julia to write code that runs on any GPU"
date: 2026-01-15
author: Bart Schilperoort
published: true
source: medium
source_url: https://blog.esciencecenter.nl/use-julia-to-write-code-that-runs-on-any-gpu-3710cc8362da
tags:
  - API
  - Floating Point
  - GPU
  - Git
  - Julia
  - Machine Learning
---

# Use Julia to write code that runs on *any* GPU

10

*How to write Julia code than can run on any GPU, and why you would want to do that.*

As the name implies, the main use of Graphics Processing Units is to process and render things to your screen, such as images, videos, or video games. Almost any device that has a display will have a GPU, although this can also come in the form of a chip integrated in the CPU instead of a separate graphics card. When using applications such as Google Maps, YouTube, or Netflix, the GPU renders the image/video to the screen more quickly and efficiently compared to the CPU. This can result in lower power consumption and a better user experience.

![Use Julia to write code that runs on any GPU](/assets/use-julia-to-write-code-that-runs-on-any-f2817526.jpg)

Photo by [Dimitris Chapsoulas](https://unsplash.com/@synesthe2ia?utm_source=medium&amp;utm_medium=referral) on [Unsplash](https://unsplash.com/?utm_source=medium&amp;utm_medium=referral)

To be able to render things to screen quickly, GPUs are able to do a lot of computations in parallel. Besides just graphics rendering, doing many computations in parallel can also come in use elsewhere, such as in (scientific) numerical models, and especially relevant recently, machine learning.

Before the release of Nvidia’s CUDA platform in 2007, people would use routines designed for graphics processing (like [shaders](https://en.wikipedia.org/wiki/Shader)), for non-graphics purposes [such as numerical solvers for the Navier-Stokes equations](https://doi.org/10.1145/882262.882363). However, with CUDA, and soon after also OpenCL, it became more straightforward to write General Purpose GPU code.

When writing code for CUDA, you are locked into Nvidia designed GPUs, and the code cannot run elsewhere. With OpenCL, it *was* possible to write GPU code that can run on many platforms. While it can still work well on most hardware, it is seeing less and less support from Apple and Nvidia, who prefer to push their own proprietary platforms (Metal and CUDA).

Writing generic GPU code has a few benefits however, as you are not tied to a certain vendor, and there is a larger possible user base and thus more use cases. For example; accelerating a scientific model with GPU impacts both for laptop and high performance computing users.

To continue writing GPU code that can run on any hardware you can make use of [Julia’s GPU ecosystem](https://juliagpu.org). With the [KernelAbstractions.jl](https://juliagpu.github.io/KernelAbstractions.jl) package you can write a kernel (a function that runs on a GPU and executes in parallel) that will work on any of the supported backends. Currently supported are Nvidia’s CUDA, AMD’s ROCm, Apple Metal, and Intel oneAPI. Which means that nearly all modern GPUs are supported, ranging from small laptops to supercomputers.

## Julia example

To get started, after installing Julia, you can initialize arrays on the GPU with the appropriate backend package. As an example, I will use oneAPI, but the code will look the same for the other backends. The following line is the only one that’s machine dependent:

import oneAPI.oneArray as GPUArrayHaving imported this, we can define arrays on the GPU. In this case a 2D matrix containing single-precision floating point numbers:

A = GPUArray(ones(Float32, 1024, 1024))Now we can write a kernel. This example comes from the [KernelAbstractions documentation](https://juliagpu.github.io/KernelAbstractions.jl/stable/quickstart/), and will simply multiply every element of the matrix by 2:

using KernelAbstractions

@kernel function mul2_kernel(A)
  I = @index(Global)
  A[I] = 2 * A[I]
endWe can apply the kernel to the matrix `A` :

backend = get_backend(A)
mul2_kernel(backend, 64)(A, ndrange=size(A))And that’s it! — *Note that *`64`* is the “workgroup size”, i.e., the number of the array elements assigned to one work group. Tuning this parameter can make the kernel run faster.*

import AcceleratedKernels as AK

function cpu_copy!(dst, src)
    for i in eachindex(src)
        dst[i] = src[i]
    end
end

function gpu_copy!(dst, src)
    AK.foreachindex(src) do i
        dst[i] = src[i]
    end
endThe `gpu_copy` function will run on GPU if `dst` and `src` are GPU arrays. Otherwise the function will run on CPU.

## Example packages

There are already some great packages that use KernelAbstractions to run on both CPU and any GPU. One of these is [WaterLily.jl](https://www.sciencedirect.com/science/article/pii/S0010465525002504), a Computational Fluid Dynamics solver. Because it uses KernelAbstractions, they were able to run simulations not only on Nvidia GPUs, but also on AMD GPUs available on the [LUMI supercomputer](https://www.surf.nl/en/services/compute/lumi) (one of the fastest in Europe!).

![Use Julia to write code that runs on any GPU](/assets/use-julia-to-write-code-that-runs-on-any-6be9197d.gif)
Simple 2D flow around the Julia logo, simulated using [WaterLily.jl](https://github.com/WaterLily-jl/WaterLily.jl) (source: WaterLily.jl)The animation above can be generated on a laptop using the CPU or integrated graphics, but can be easily adapted to a higher resolution or 3D simulation to be run on a supercomputer.

The Julia GPU [showcase page](https://juliagpu.org/showcases/) has many more examples ranging from climate models to bioinformatics.

## Conclusion

By using Julia’s generic GPU framework, you can:

* run and debug code locally, on your laptop using your CPU or GPU
* have a larger community of users who can run the code on their own devices
* deploy the code on any supercomputer, e.g., both Snellius (Nvidia GPUs) and LUMI (AMD GPUs)

So next time you need code to be fast and portable, consider using Julia to write code that can run fast, anywhere.
