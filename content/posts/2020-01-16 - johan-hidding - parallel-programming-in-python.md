---
layout: post
title: "Parallel programming in Python"
date: 2020-01-16
author: Johan Hidding
published: true
source: medium
source_url: https://blog.esciencecenter.nl/parallel-programming-in-python-7fd62c90217d
tags:
  - 3D
  - NumPy
  - Parallel Computing
  - Performance
  - Python
  - RSE
---

**SubscribeRemember me for faster sign in

Depending on your level of Python expertise, you might implement such an algorithm in different ways.

In an introductory Python course we could write this function as follows.

import randomdef calc_pi(N):
  M = 0  for i in range(N):
    # Simulate impact coordinates
    x = random.uniform(-1, 1)
    y = random.uniform(-1, 1)
 
    # True if impact happens inside the circle 
    if x**2 + y**2 &lt; 1.0:
      M += 1  return 4 * M / NThis implementation has serious shortcomings when it comes to performance. We learn how to fix this in the second week of learning Python, when we encounter NumPy! We show here another way of implementing the same idea. In this case we are taking advantage of NumPy’s recommended vector notation. Used smartly, it avoids the need of for loops.

import numpy as npdef calc_pi_numpy(N):
  # Simulate impact coordinates
  pts = np.random.uniform(-1, 1, (2, N))  # Count number of impacts inside the circle
  M = np.count_nonzero((pts**2).sum(axis=0) &lt; 1)  return 4 * M / NThis implementation is a lot faster than the first one, but it still only uses a single processor. Surely, we can do better than that! We can parallelize this algorithm by running it several times and then computing the mean of the outputs.

The problem of computing π is representative of a family of problems known as embarrassingly parallel**. Roughly, this means that parallelizing the algorithm [should be easy](https://en.wikipedia.org/wiki/Embarrassingly_parallel). If we want to use, say, 80000 random points, and we have 8 cores, we can split our problem in 8 problems of 10000 points each. This will give 8 different results, that we will collect together using a mean.

![Parallel programming in Python](/assets/parallel-programming-in-python-7a254843.jpeg)
The GIL

## The GIL

There are many ways of parallelizing programs in Python, but not many of them are actually very good for problems like this. The reason is the Global Interpreter Lock or GIL. The GIL is infamous for killing any naive attempts at parallel programming in Python in its tracks.

The designers of Python chose ease-of-use over the use of power, a design principle that is in part responsible for the popularity of the language today. In the case of the GIL this means that any operation that requires interaction with the Python interpreter is locked to what is effectively a single thread. Multi-threading in Python is useful only for doing IO operations or native function calls that resolve outside the ever present eye of the Python interpreter. There are two solutions to this problem: running multiple Python instances or doing all of your work outside of Python.

For a lot of small-scale parallel work, running multiple instances of Python is not a very good solution: there is the overhead of copying data between the different Python instances. We can do better than this! **What if we just kill the GIL?** We’ll see soon that the package Numba allows us to do it easily by just using a decorator in our function. We can then use any other tool for parallelizing Python to run the algorithm in parallel, in this case: Dask.

One way of using Dask is through its NumPy-esque `daskarray` interface. This will give some speedup because the underlying NumPy routines are not choked by the GIL. However, we can do a lot better if we eliminate the GIL entirely using Numba.

## Let’s do it

First, we want to know how many cores we have. In Python this can be easily figured out easily using the multiprocessing package:

import multiprocessing
ncpus = multiprocessing.cpu_count()
print(“We have {} cores to work on!”.format(ncpus))Now, we use Numba to comfortably avoid the GIL by simply using the `@jit` decorator around our function. Numba compiles the Python code to native machine code to make it perform faster. We have to forget what we learned about using NumPy here.

from numba import jit@jit(nopython=True, nogil=True) # Required to kill the GIL
def calc_pi_nogil(N):
  M = 0  for i in range(N):
    # Simulate impact coordinates
    x = random.uniform(-1, 1)
    y = random.uniform(-1, 1)
 
    # True if impact happens inside the circle 
    if x**2 + y**2 &lt; 1.0:
      M += 1  return 4 * M / NIronically, our implementation is identical to the first very slow Python version, with the exception of the `@jit` line!

We set out multiple jobs for computing π and take the mean of the results.

from dask import delayed@delayed
def mean(*args):
  return sum(args) / len(args)# Call calc_pi_nogil 10 times with N = 10 million
x = mean(*(delayed(calc_pi_nogil)(10**7) for i in range(10)))The workflow can be visualized using:

x.visualize()
![Parallel programming in Python](/assets/parallel-programming-in-python-8c13deee.jpg)
A recipe for computing π fasterAnd evaluated using:

x.compute()Try it out yourself! Fire up a Jupyter notebook, `pip install dask numba`, and you’re good to go.

> 

Erratum 2020/01/16: There are some issues with the code presented in this post, these are largely due to Medium replacing double quotes with unicode characters. A functioning example code is available in this Gist:

[https://gist.github.com/jhidding/e08c3096b5c54bf2138ca248625de029](https://gist.github.com/jhidding/e08c3096b5c54bf2138ca248625de029)
