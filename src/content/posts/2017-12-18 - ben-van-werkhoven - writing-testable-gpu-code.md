---
title: "Writing Testable GPU Code"
date: 2017-12-18
author: Ben van Werkhoven
published: true
source: medium
tags:
  - uncategorized
---

Anyone involved in software development has probably heard someone say “testable code is better code”. While I was a bit skeptical at first, I now have to admit that I agree. One of the reasons it may have taken me a bit longer to get convinced is that I mostly write GPU code, in languages such as CUDA and OpenCL.

![](/assets/1_OtfM8fdvOaIT3OlaUfZBjw-2f2797dc.jpeg)

First of all, you don’t see a lot of GPU code that is thoroughly tested. And while, there are many articles and blogs on how to write good unit tests or how to apply unit testing effectively, none of them focus specifically on testing GPU code. Today, I write unit tests for every bit of GPU code that I write. And since there aren’t that many resources on testing GPU code, I’ll explain how I managed to make testing part of my GPU coding practice.

Just to be clear, this post is about unit testing GPU code and not about automated testing, formal verification, or model-checking code. While testing comes with its own limitations — in the words of Edsger Dijkstra: *“Testing shows the presence, not the absence of bugs”* — testing is easier to apply and is very beneficial to the quality of your code.

Writing tests for every part of your code forces you to keep functions short, simple, and focused on one thing. It will also force you to think longer on what you are coding. The resulting code is not only well-tested, but also structured differently, because the code is written with testability in mind.

### Unit Testing GPU Code

Many excellent articles on effective unit testing and how to write good unit tests exist, but most of them focus on problems in object-oriented programming. Let’s take a look at some of the advice and see how it applies to unit testing GPU code.

In general, articles on unit testing seem to agree that good unit tests have the following properties ([source](https://www.toptal.com/qa/how-to-write-testable-code-and-why-it-matters)):

- Easy to write — you often write multiple tests for a single unit
- Readable — easy to understand what is being tested
- Reliable — should only fail if there is a bug in the code
- Fast — test are run frequently so should complete fast
- Truly unit, not integration — not reliable on external factors

***Easy to write.*** If you have to write host code for every bit of GPU code that you want to test, writing tests can be cumbersome. Fortunately, we will introduce a method that will greatly simplify writing tests for GPU code in the next section of this post.

***Readable.*** It can be a bit difficult to understand the purpose of a test when testing GPU code, because what is being tested is basically encoded into the data that is passed to the GPU code.

***Reliable.*** GPU code is in general very dependent on the host code that is supposed to call it. The test may fail if the data structures on the GPU are allocated incorrectly, if there is not enough memory available to hold the test data, or if the GPU kernel is launched with an incorrect number of threads per block.

***Fast.*** It is often possible to test the code with a smaller problem size than expected in a real application. On other hand, keep in mind that what may be a small problem size to work on for the GPU, may be take a long time to compute on the CPU.

***Truly unit.*** The idea of this point is that the tests should not depend on external factors, such as database servers or file systems. This is something that is hard to achieve for testing GPU code on the GPU. Some people may argue that testing GPU code on your GPU could not even be called ‘unit testing’ because of this point. I’d like to leave the terminology discussion for what it is, and focus on how to test GPU code.

### Testing GPU Code

Testing in general involves three steps:  
1\. Decide on some input  
2\. Execute the system under test  
3\. Check the behavior of the system under test

![](/assets/1_fosmxReXyy9S3J3J9fdPPA-fbb981ff.jpeg)

This may sound very simple, but when we’re talking about GPU code and executing it, things tend to get messy rather quickly. You can see this when we specify everything that needs to happen when our system under test consists of GPU code:

1\. Decide on some input data  
2\. Compile the GPU code (if not compiled already)  
3\. Allocate GPU memory  
4\. Copy input data to the GPU  
5\. Setup thread block and grid dimensions  
6\. Call the kernel  
7\. Copy data back to host memory  
8\. Free GPU memory  
9\. Check the behavior of the system under test

Now if you have to write the host code for steps 2 through 8 for every kernel that you’d like to test, you’ll quickly learn to avoid writing tests for every bit of GPU code that you write. Basically, what we are missing is a good testing framework that allows GPU programmers to easily call GPU code for testing purposes.

During the development of [Kernel Tuner](http://github.com/benvanwerkhoven/kernel_tuner), I realized that the simple interface used for tuning GPU kernels could just as easily be used to run GPU kernels. We could support a function that executes a kernel and returns its output, instead of benchmarking the kernel and returning its execution time.

Let’s take a look at a simple example, where we test a vector addition kernel implemented in CUDA with a short bit of Python code:

In this example, the kernel code is specified as a string, but it’s also possible to just supply a filename. Note that you can pass either CUDA or OpenCL code, both are supported and the language will be detected automatically. Numpy is used to create some random input data for vectors `a` and `b`. We also create an array `c` with zeros of the same size and data type. A list called `args` is used to hold the arguments for calling the kernel. The `params` dictionary is where we specify the thread block dimensions.

Next, we call the `run_kernel` function that takes the name of the function we’d like to test, the code (or filename) as a string, the problem size (used to compute the grid dimensions), and finally the arguments list and parameters dictionary.

Finally, in the example above we use `numpy.allclose` to compare the GPU output with the same result computed in Python using `(a+b)`. We use Python’s `assert` statement so that our test can be executed using the **nosetests** or **pytest** frameworks for testing Python code.

To summarize, we take another look at our list of steps required to test GPU code, using [Kernel Tuner](http://github.com/benvanwerkhoven/kernel_tuner) as a framework for testing GPU code, the list becomes:

![](/assets/1_fW4l25XYSf0AjYg27X3HbA-fb2622ee.png)

### Testing device functions

Now that we have an easy way to test GPU kernels from Python, you may be wondering what about device functions? The way I test device functions is by writing a small wrapper kernel that calls the device function. This allows you to test device functions on the GPU and the wrapper kernel could even take care of creating the necessary context for your device function to execute correctly, such as declaring shared memory and looking up thread and block indices.

### Designing your test case

The hardest part of testing GPU code is designing a good test case. Actually, designing the testcase is all about choosing what data you put into the code. It’s very easy to just generate some random data, but for many codes using only random data is far too unrealistic. You have to keep in mind what assumptions are in the code about valid ranges for input data.

![](/assets/1_n2fyfhTfBwGjbZJa43iptw-5979f48b.jpeg)

I ran into a problem like this myself once, when a kernel executed correctly only when one of its inputs was sorted. Testing only with randomly generated data did not reveal a race condition that I had introduced in the code. The bug only surfaced when I started testing with more realistic data.

Another thing to keep in mind is that there should be sufficient variance in the output of your code. For example, if your GPU code outputs data in the interval \[0,1\] and your randomly generated input data causes the output to be all ones, you don’t have a very well designed test case and bugs may go undetected.

The important thing to remember is that in order to design a good test case for your GPU code you should: first understand what your code is doing with the data you put in, and secondly, for more complex kernels, you should not only compare against the output of a CPU version of your code, but also ensure that the output itself makes sense.

### Conclusions

In general, testing GPU code can be a bit more difficult and a bit more work than testing other sorts of code. However, using testing frameworks specifically designed for testing GPU code, such as [Kernel Tuner](http://github.com/benvanwerkhoven/kernel_tuner), drastically reduces the effort involved in writing tests.

I hope this post contributes to enabling GPU programmers to make testing an integral part of their code development. And that we may see a lot more GPU code that is developed with testing in mind.
