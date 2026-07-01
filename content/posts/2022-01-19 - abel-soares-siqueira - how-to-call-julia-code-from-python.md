---
layout: post
title: "How to call Julia code from Python"
date: 2022-01-19
author: Abel Soares Siqueira
published: true
source: medium
source_url: https://blog.esciencecenter.nl/how-to-call-julia-code-from-python-8589a56a98f2
tags:
  - Julia
  - NumPy
  - Performance
  - Python
---

## A three-part series on achieving high performance with high-level code

![](/assets/1_rO_VWgfXj4zuFDtX28Uc1g-c9e56d67.jpeg)

Caption: Astronaut carrying Python and Julia. Photo by Brian McGowan on Unsplash ( https://unsplash.com/photos/MR9xsNWVKvo ), modified by us.

### Target audience

This is the first post in a three-part series about achieving high performance with high-level code. This series is aimed at people working with Python who needs better performance but prefers not to develop a low-level performant library.

## Introduction

Having recently joined the Netherlands eScience Center after working with research using the Julia language for seven years, I was excited to highlight some of its cool features. At the eScience Center, many of our engineers use Python, some use C or C++, and in some cases, we see Python calling C++ code, to speed up the code. This was the perfect opportunity to introduce Julia’s interoperability with Python and to investigate whether we could achieve comparable speed by calling Julia code in Python. This means that for situations where Python’s performance is not sufficient, we can speed it up with another high-level language, avoiding the use of a low-level language like C++. This series of three blog posts will investigate these topics.

In this first post, we will learn how to call a Julia code from Python. We will set up the environment and show some examples. In the second post, we will take a problem that was solved by using Python in combination with C++ to speed up the code. We will replace the C++ code with a Julia code and compare the performance. In the third post, we will solve the same problem in Julia, optimize the Julia code to reach its maximum performance and compare it with the implementation in the second post.

## What is Julia, and how does it compare to Python?

What is Julia? Julia is a high-performance, high-level programming language. It was created a few years ago with the ambitious goal of being fast with a high-level syntax, and it has been mostly successful. It can, in a few cases, reach the speed of low-level programming languages like C. For more information, the [julialang.org](https://julialang.org/) site is a great first stop.

One of the most frequently asked questions is: “how does it compare to Python or some other programming language in terms of performance?”. The short answer: Julia is [generally faster](https://julialang.org/benchmarks) than Python and many other programming languages.

The performance of a Python code can be optimized, but even the optimized code usually underperforms compared to a Julia version of the same code. The performance increase of a Python code can be achieved in a few ways, but a frequent one is to call a code written in a low-level language, such as C, C++ and Fortran, like NumPy which does its calculations mostly in those low-level languages. What is less common, but also possible, is to call Julia from Python. In this post, we are going to show you how to do that!

Before we forget, all the code used in this post can be found in our [GitHub repository](https://github.com/abelsiqueira/faster-python-using-julia-blogposts). We have also created a [Docker image](https://hub.docker.com/r/abelsiqueira/python-and-julia) that includes a ready-to-use environment to run both Julia and Python. To run that environment with Python 3.10 and Julia 1.6, install Docker and run the following in your terminal:

```hs
$ docker pull abelsiqueira/python-and-julia:py3.10-jl1.6
$ docker run -it exec abelsiqueira/python-and-julia:py3.10-jl1.6 /bin/bash
```

## Preparation

In the following steps, we will configure our system to execute Julia code from Python. To learn more about this topic, the documentation for the packages we describe below is a great starting point. You will need four things:

1. **Python** distribution [compiled with shared libpython](https://docs.python.org/3/using/configure.html#cmdoption-enable-shared) option. There are workarounds, but this is the most straightforward way.
2. [**Julia**](http://julialang.org/), the executable that runs the Julia language.
3. [**PyCall,**](https://github.com/JuliaPy/PyCall.jl) the Julia package that defines the conversions between Julia and Python.
4. [**PyJulia**](https://pyjulia.readthedocs.io/en/stable/), the Python package to access Julia from Python.

We are going to go through the installation and configuration of these steps on a Linux system. It will be very similar on MacOS or with [WSL](https://docs.microsoft.com/en-us/windows/wsl/install) for Windows once the required tools are installed.

### Step 1: Python with shared libpython

To check whether the Python distribution is compiled with **\--enable-shared** option, we run:

```hs
ldd $(which python3) | grep libpython
```

If the output is something like:

```hs
libpython3.10.so.1.0 => /usr/local/lib/libpython3.10.so.1.0 (0x00007f567e548000)
```

… then we are good to go! If we get nothing, that means that the Python distribution has not been compiled with the desired flags. In this case, we can compile our own Python distribution with the flag **\--enable-shared**, which takes some time but is mostly straightforward. This [Dockerfile](https://github.com/abelsiqueira/python-and-julia/blob/debf6da21390c34331b708d8e93b97563ac83a78/Dockerfile#L22) has the instructions. Remember that if you just want to test it out, you can run the Docker image as mentioned in the previous section.

### Step 2: Julia and PyCall

Now, we will install Julia. We recommend using [jill](https://github.com/abelsiqueira/jill), a script I created, which downloads and installs a specific version of Julia, but Julia can also be installed via the official binaries or package managers. In this post, we use version 1.6.5, which is the current Long Term Support version at the time of writing. Most likely this will work with a newer version as well. To install Julia 1.6.5 using jill, we run:

```hs
$ wget https://raw.githubusercontent.com/abelsiqueira/jill/v0.4.0/jill.sh$ sudo bash jill.sh -y -v 1.6.5
```

Now, we will install PyCall and configure it to use the correct Python version. We start Julia by running `julia` in the terminal, and then we set the `ENV["PYTHON"]` variable:

```hs
$ juliajulia> ENV["PYTHON"] = "PATH/TO/python"
```

Here we use the full path to Python’s executable. In our case, it is the Python distribution we compiled from the source code. You could change the path according to your configuration.

Now, we will install PyCall using Pkg, Julia’s package manager:

```hs
julia> using Pkgjulia> Pkg.add("PyCall")
```

### Step 3: PyJulia

As the last step, we must install the Python package to talk with Julia. First, use pip, Python’s package manager, to install the package PyJulia — remember to use the same Python passed to `ENV["PYTHON"]`:

```hs
$ python3 –m pip install julia
```

To finalize configuring the communication between Julia and Python, we run the following in the Python interpreter:

```hs
$ python3>>> import julia>>> julia.install()
```

If we had more than one Julia version on our system, we could specify it with an argument:

```hs
>>> julia.install(julia='julia-1.6.5')
```

We test the installation running the following in the Python interpreter run:

```hs
>>> from julia import Main>>> Main.eval('[x^2 for x in 0:4]')
```

## Showcasing PyJulia

### Basics

- To use a Julia module, use `from julia import MODULE`
- To evaluate a command, import `Main` and use `Main.eval("...")`
- To create and use variables, use `Main.VARIABLE`
- To install Julia packages, `import Pkg` and use `Pkg.add("Package")`
- Use `%load_ext julia.magic` to add a [IPython’s magic command](https://ipython.readthedocs.io/en/stable/interactive/magics.html) called `%julia`. Just prepend `%julia` to Julia commands. In this case, use `$var` to access python variables

### Example: Linear Algebra

In this short example, we can see one of the strengths of Julia syntax for Linear Algebra. A random linear system is created and solved. The result is checked with NumPy, so we can see the compatibility.

We have chosen to define `A`, `b` and `x` in three different ways, to show the different syntaxes. The definition of **A** occurs completely inside the eval block. The variable `A` is created and is available inside the Julia scope, or as `Main.A`. The definition of `b` uses the `Main.b` access directly and uses the result of `Main.eval`. Finally, `%julia` is the magic IPython command to simply use Julia syntax directly.

We can quickly compare the timing of solving the system with Julia’s backslash command and Numpy’s `linalg.solve`:

### Example: Automatic differentiation

The next example installs and uses the package called **ForwardDiff**, which performs automatic differentiation. ForwardDiff defines a Julia type called **Dual** internally, so we can’t use it with Python functions because Python functions are not compatible with that type. However, we can define Julia functions and use them.

The local minimum of the quadratic occurs at 2.5, so the derivative at 2.5 is 0.0.

Another, more interesting interaction is below, in which we create a function *g* inside Julia, and define functions for its derivatives there. Then we create a Python function with the Taylor expansion around the value *a*. Furthermore, we use Matplotlib, Python’s plotting library to visualize the results coming from Julia. Pretty neat, right?

![](/assets/1_PFodxQbLaofzbmaYRPzuZA-ba9a400c.png)

Image generated above, showing the function f and its third-order Taylor approximation.

## Next episodes

Now that we can call Julia code in Python, we are prepared to move to our next adventure: improve the speed of a Python code by calling Julia from it. [Follow our medium account](https://blog.esciencecenter.nl/) to get notified when Part 2 goes live.

*Many thanks to our proofreaders and reviewers,* [*Elena Ranguelova*](https://www.esciencecenter.nl/team/dr-elena-ranguelova/), [Jason Maassen](https://www.esciencecenter.nl/team/dr-jason-maassen/), [Jurrian Spaaks](https://www.esciencecenter.nl/team/jurriaan-spaaks-msc/), [Patrick Bos](https://www.esciencecenter.nl/team/dr-patrick-bos/), [Rob van Nieuwpoort](https://www.esciencecenter.nl/team/prof-dr-rob-van-nieuwpoort/), [Stefan Verhoeven](https://www.esciencecenter.nl/team/stefan-verhoeven-bsc/), and [Veronica Pang](https://www.esciencecenter.nl/team/veronica-pang/).
