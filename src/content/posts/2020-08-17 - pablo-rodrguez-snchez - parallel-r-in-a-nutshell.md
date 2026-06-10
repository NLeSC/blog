---
layout: post
title: "Parallel R in a nutshell"
date: 2020-08-17
author: Pablo Rodríguez-Sánchez
published: true
source: medium
source_url: https://blog.esciencecenter.nl/parallel-r-in-a-nutshell-4391d45b5461
tags:
  - uncategorized

---

][Pablo Rodríguez-Sánchez]·Aug 17, 2020

In our case, the function** performs a test on primality (if you think this is a silly function, you are right, but please see Notes at the end of this tutorial).

fun &lt;- function(x) {**  numbers::isPrime(x) # Requires the package numbers
}And the input** is just a vector containing 1000 large integers (that I created programmatically just to not have to type then one-by-one).

# Generate some large integers
N &lt;- 1000 # Number of integers
min &lt;- 100000 # Lower bound
max &lt;- 10000000000 # Upper boundinputs &lt;- sample(min:max, N) # List of N random large integers (between 1e5 and 1e10)These two objects, `fun` and `inputs`, define the homework *we want to assign to our computer (in this case, to decide which integers from the list of inputs are prime). We also want our computer to store the results. We will do this in six different ways, two of them parallel. Later, we’ll compare their performance.

## Possibility 0: run serially

In this section, we’ll see three different ways of solving our problem by running serially. That is, without using parallelization. The user is likely to be familiar with at least some of them.

## 0.1 Run serially with a loop

This is the most straightforward approach, although not very efficient. The basic structure is given in the snippet below.

results &lt;- rep(NA, N) # Initialize results vector
for (i in 1:N) { # Loop one by one along the input elements
  results[i] &lt;- fun(inputs[i])
}

## 0.2 Run serially with `foreach`

The`foreach`package saves us the explicit typing of the index (compare with the `for` loop in the previous example). The output of `foreach` is, by default, a list. We used the parameter `.combine = "c"` (concatenate) to return the output as a vector.

# Load the required libraries
library(foreach)foreach (val = inputs, .combine = "c") %do% { 
    fun(val) # Loop one-by-one using foreach
} -&gt; results

## 0.3 Run serially with `lapply`

`lapply` is usually preferred over explicit `for` or `foreach` loops.

results &lt;- lapply(inputs, fun) # Use lapply instead of for loop

## Do it in parallel!

And now, we’ll finally use parallel programming to solve our problem.

## Possibility 1: run in parallel with `mclapply` (Linux only)

`mclapply` is part of the `parallel` library. Rule of thumb: use it instead of `lapply`. If the code is parallelizable, it will do the magic:

# Load the required libraries
library(parallel)# Run parallel
results &lt;- mclapply(inputs, fun, mc.cores = numCores)
 
# Note that the number of cores is required by mclapplyUnfortunately, this approach only works on Linux. If you are working on a Windows machine, it will perform as a serial `lapply`.

## Possibility 2: run in parallel with `doParallel` + `foreach`

Rule of thumb: `doParallel` transforms a `foreach` loop into a parallel process. Provided, of course, the underlying process is parallelizable.

# Load the required libraries
library(iterators)
library(doParallel)# Initialize
registerDoParallel(numCores)# Loop
foreach(val = inputs, .combine = "c") %dopar% {
    fun(val)
} -&gt; results

## Possibility 3: take advantage of vector functions

Most (but not all) of `R` functions can work with vectorized inputs. This means that the function accepts a vector of inputs and returns an equally sized vector of outputs. This allows *hiding* the whole *loop* in a single, easy-to-read line.

results &lt;- fun(inputs)More importantly, although running serially, vector functions often run faster than parallel schemes. Why not use them always then? The quick answer is: we are not always lucky enough to have a function that accepts a vector input.

## Compare results

In the figure below we plot the execution times of each of the six methods we tried. We also provide a summary table for each of them.

We notice that the parallel methods performed significantly better than the serial ones. We also notice that the vector method performed even better (but keep in mind not all functions are vectorizable).

*Pro tip: what about using vectorization AND parallelization?*

## Trying to parallelize non-parallelizable code

In this subsection we’ll use the expression below as an example:

It is just a recipe to build a list of numbers by adding 1 to the previous number in the list. It is easy to see that, when initialized with *x*0=0, this iterator yields {0,1,2,3,4,…}. Note that in order to obtain the value a given x in position n, we need to know the value of the previous x (that in position n-1; remember the analogy of building a stack of bricks). This operation is thus intrinsically serial.

In this case, our function and inputs look like:

fun &lt;- function(x) {x + 1}N &lt;- 6
inputs &lt;- rep(NA, N) # Initialize as (0, NA, NA, ..., NA)
inputs[1] &lt;- 0Using a serial loop everything works fine:

foreach(i = 2:N) %do% {
  inputs[i] &lt;- fun(inputs[i-1])
}# The result is the expected: 0 1 2 3 4 5But what if we insist on parallelizing? After all, our serial loop is very similar to the `foreach` + `doParallel` one, so it is tempting to at least try. And what happens then? As expected, it simply doesn’t work properly. And more worryingly, doesn’t throw an error either!

inputs &lt;- rep(NA, N) # Initialize again
inputs[1] &lt;- 0foreach(i = 2:N) %dopar% {
  inputs[i] &lt;- fun(inputs[i-1])
}# The result in this case is a disastrous 0 NA NA NA NA NAAnd that was it. This is just a quick starting guide to a complicated topic. If you want to know more, I suggest you go directly to the [future](https://github.com/HenrikBengtsson/future) library.

## Notes

The astute reader may have noticed that our function `fun` is a mere renaming of the function `isPrime` contained in the package `numbers`. The reason for that is merely pedagogical: we want the readers to:

* Notice that the structure input -&gt; function -&gt; results is indeed VERY general.
* Be able to try their own pieces of slow code inside the body of `fun` (this can be done comfortably using our [vignette](https://github.com/PabRod/blog-parallelR)).

## Are you more into Python?

We can also help with that! Check out this other tutorial: [Parallel program in Python](/parallel-programming-in-python-7fd62c90217d).

## Acknowledgments

I want to say thanks to [Lourens Veen](https://www.esciencecenter.nl/team/lourens-veen-msc/), [Peter Kalverla](https://www.esciencecenter.nl/team/dr-peter-kalverla-2/) and [Patrick Bos](https://www.esciencecenter.nl/team/dr-patrick-bos/). Their useful comments definitely improved the clarity of the final text.
