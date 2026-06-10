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

Now, we will install PyCall using Pkg, Julia’s package manager:

julia&gt; using Pkgjulia&gt; Pkg.add("PyCall")

### Step 3: PyJulia

As the last step, we must install the Python package to talk with Julia. First, use pip, Python’s package manager, to install the package PyJulia — remember to use the same Python passed to `ENV["PYTHON"]`:

$ python3 –m pip install juliaTo finalize configuring the communication between Julia and Python, we run the following in the Python interpreter:

$ python3&gt;&gt;&gt; import julia&gt;&gt;&gt; julia.install()If we had more than one Julia version on our system, we could specify it with an argument:

&gt;&gt;&gt; julia.install(julia='julia-1.6.5')We test the installation running the following in the Python interpreter run:

&gt;&gt;&gt; from julia import Main&gt;&gt;&gt; Main.eval('[x^2 for x in 0:4]')

## Showcasing PyJulia

### Basics

* To use a Julia module, use `from julia import MODULE`
* To evaluate a command, import `Main` and use `Main.eval("...")`
* To create and use variables, use `Main.VARIABLE`
* To install Julia packages, `import Pkg` and use `Pkg.add("Package")`
* Use `%load_ext julia.magic` to add a [IPython’s magic command](https://ipython.readthedocs.io/en/stable/interactive/magics.html) called `%julia`. Just prepend `%julia` to Julia commands. In this case, use `$var` to access python variables

### Example: Linear Algebra

In this short example, we can see one of the strengths of Julia syntax for Linear Algebra. A random linear system is created and solved. The result is checked with NumPy, so we can see the compatibility.

We have chosen to define `A`, `b` and `x` in three different ways, to show the different syntaxes. The definition of A **occurs completely inside the eval block. The variable `A` is created and is available inside the Julia scope, or as `Main.A`. The definition of `b` uses the `Main.b` access directly and uses the result of `Main.eval`. Finally, `%julia` is the magic IPython command to simply use Julia syntax directly.

We can quickly compare the timing of solving the system with Julia’s backslash command and Numpy’s `linalg.solve`:

### Example: Automatic differentiation

The next example installs and uses the package called **ForwardDiff**, which performs automatic differentiation. ForwardDiff defines a Julia type called **Dual** internally, so we can’t use it with Python functions because Python functions are not compatible with that type. However, we can define Julia functions and use them.

The local minimum of the quadratic occurs at 2.5, so the derivative at 2.5 is 0.0.

Another, more interesting interaction is below, in which we create a function g* inside Julia, and define functions for its derivatives there. Then we create a Python function with the Taylor expansion around the value *a*. Furthermore, we use Matplotlib, Python’s plotting library to visualize the results coming from Julia. Pretty neat, right?

![How to call Julia code from Python](/assets/how-to-call-julia-code-from-python-bd817202.png)
Image generated above, showing the function f and its third-order Taylor approximation.

## Next episodes

Now that we can call Julia code in Python, we are prepared to move to our next adventure: improve the speed of a Python code by calling Julia from it. [Follow our medium account]( to get notified when Part 2 goes live.

*Many thanks to our proofreaders and reviewers, *[*Elena Ranguelova*](https://www.esciencecenter.nl/team/dr-elena-ranguelova/), [Jason Maassen](https://www.esciencecenter.nl/team/dr-jason-maassen/), [Jurrian Spaaks](https://www.esciencecenter.nl/team/jurriaan-spaaks-msc/), [Patrick Bos](https://www.esciencecenter.nl/team/dr-patrick-bos/), [Rob van Nieuwpoort](https://www.esciencecenter.nl/team/prof-dr-rob-van-nieuwpoort/), [Stefan Verhoeven](https://www.esciencecenter.nl/team/stefan-verhoeven-bsc/), and [Veronica Pang](https://www.esciencecenter.nl/team/veronica-pang/).
