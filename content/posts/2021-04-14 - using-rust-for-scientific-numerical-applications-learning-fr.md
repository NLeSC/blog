---
layout: post
title: "Using Rust for Scientific Numerical applications: Learning from Past Experiences"
author: Felipe
published: true
source: medium
source_url: https://blog.esciencecenter.nl/using-rust-for-scientific-numerical-applications-learning-from-past-experiences-798665d9f9f0
tags:
  - C++
  - FAIR
  - GPU
  - Git
  - Parallel Computing
  - RSE
---

Every experienced programmer knows that both their productivity depends on the abstraction level of the language. The fewer lines of code you write, the fewer bugs you introduce.* However, an increase in abstraction often results in a higher runtime cost (code that needs to run extremely fast is often *very* ugly). Rust [zero-cost abstraction](https://carette.xyz/posts/zero_cost_abstraction/) allows you to write more concise code by using a higher level abstraction without additional computing cost at runtime. *Rust *[*iterators*](https://doc.rust-lang.org/book/ch13-02-iterators.html) are a great example of the power of Rust zero cost abstraction. *It is fair to mention that zero-cost abstraction is also central in C++.*

How much effort is required to maintain the code?**

If you have ever worked in a medium to large size C/Fortran code base, you certainly know how incredibly difficult and frustrating it can be to maintain it. A recurrent complaint among the programmers in these languages is the dreadful bugs related to unsafe memory management that can take days to trace and reproduce. Fortran programmers are famously known for having [segmentation faults](https://nalgebra.org/) for breakfast.

The Rust type system stands out for its capabilities to rule out memory errors at runtime. The Rust [borrow checker](https://blog.logrocket.com/introducing-the-rust-borrow-checker/) is the killer feature that helps to eliminate all those memory bugs while still offering lightning-fast speed.

Also, as mentioned previously, Rust’s zero cost abstraction allows you to keep a lean code base that is easier to maintain.

***Note for C++ developer: ****smart pointers partly alleviate the memory management issues, but the borrow checker can help you to extend the safety guarantees to multithreading code.*

**How much effort is required to test the code and write documentation?**

Writing documentation in C/C++/Fortran involved bringing a third-party tool like [Doxygen](https://www.doxygen.nl/index.html) that we need to install and add to our CMake zoo. Also, we need to learn this tool’s special syntax to write documentation and then pray that the documentation builds.

Software documentation is essential for scientific code due to the volatile nature of scientific research. *Scientific software without documentation is not legacy code but dead code. *Given the high barrier imposed by traditional languages to write documentation, it is expected that most scientific software is stillborn due to the impossibility to understand what has been done, even by experts in the same field (or sometimes even by the person who wrote it).

Documenting a Rust project only requires that you write the documentation in markdown inside the source code as shown in [this example](https://github.com/felipeZ/eigenvalues/blob/master/src/lib.rs). Then you just need to run the `cargo doc` command and that is it!

Testing in C/C++/Fortran has a similar fate, they required third-party frameworks that need to be installed and added to CMake. Fortran is particularly painful for testing due to the lack of a standard testing framework, forcing programmers to maintain a bunch of scripts to call the binaries, parse the output, and check the results.

Rust has a built-in system to test your code, with no third-party libraries. You can have [unit tests](https://doc.rust-lang.org/nightly/rust-by-example/testing/unit_testing.html) to check the functionality of a given module at a time, but also [integration tests](https://doc.rust-lang.org/rust-by-example/testing/integration_testing.html) to check the public interface of your code. You can even run and test the [examples in the documentation](https://doc.rust-lang.org/rustdoc/documentation-tests.html)! In summary, writing and running tests is as effortless as you can get it.

Lowering the barrier to write tests and documentation is an undervalued feature of Rust. I bet that we all agree that code without tests and documentation is short of useless.

**How do I parallelize the application?**

![Using Rust for Scientific Numerical applications: Learning from Past Experiences](/assets/using-rust-for-scientific-numerical-appl-ab3f6590.png)
Image: courtesy of [Chiara Caratelli](https://www.instagram.com/qiadraws/)***Disclaimer****:* *due to my ignorance of the latest Rust developments on multi-node computing (*[*MPI*](https://en.wikipedia.org/wiki/Message_Passing_Interface)*) and GPU integration, I am going to blatantly ignore those two subjects.*

Scientific simulations like weather prediction, protein binding, fluid dynamics, etc*.* are computationally intensive but often parallelizable (at least on paper!). It goes without saying that we want to make use of all cores available in a given machine. The standard approach is to use something like [OpenMP](https://www.openmp.org/) that consists of runtime libraries, compiler directives, *etc*. to support shared-memory multithreading programming.

A quite dreaded moment for scientific software developers is when the serial implementation is working and a new parallel version must be implemented. Seriously, parallel implementation in C/C+/Fortran means that all your [unknown unknowns](https://en.wikipedia.org/wiki/There_are_known_knowns) about unsafe memory management suddenly uncover all the obnoxious bugs that you didn’t know about until now, and that you need to track for endless hours.

As a remedy for all that frustration and wasted time, Rust offers a novel approach coined as [fearless concurrency](https://doc.rust-lang.org/book/ch16-00-concurrency.html). This concept refers to the possibility of writing parallel applications that are free of subtle bugs and can be refactored without introducing new bugs.

But how does Rust achieve this marvelous formula? It turns out that the Rust type system and [ownership system](https://doc.rust-lang.org/book/ch04-00-understanding-ownership.html) keep track of what is safe to share across threads, refusing to compile illegal concurrent memory transactions that would have resulted in runtime issues. So, the Rust compiler happily raises compilation errors whenever you are trying to use memory in an unsafe way instead of unleashing Godzilla in the middle of your simulation.

![Using Rust for Scientific Numerical applications: Learning from Past Experiences](/assets/using-rust-for-scientific-numerical-appl-622b6b49.jpg)

Photo by [Markus Winkler](https://unsplash.com/@markuswinkler?utm_source=medium&amp;utm_medium=referral) on [Unsplash](https://unsplash.com/?utm_source=medium&amp;utm_medium=referral)

Since Rust is a system programming language, rather than choosing a single parallelism model, it allows multiple low level models like message-passing, share-state, *etc*. The good news is that we don’t need to use the primitives ourselves, instead, we can use the community-provided libraries like [Rayon](https://github.com/rayon-rs/rayon) that build on top of those primitives. [Rayon](https://github.com/rayon-rs/rayon) offers powerful functionality like [parallel iterators](https://docs.rs/rayon/1.5.0/rayon/iter/index.html) that allow us to execute operations on the elements of an [iterator](https://doc.rust-lang.org/book/ch13-02-iterators.html) in parallel, with minimal changes in the source code.

What is even better, you can use libraries like [ndarray](https://github.com/rust-ndarray/ndarray) that has a Numpy-style API to manipulate arrays, while simultaneously offering features like an interface to [Rayon](https://github.com/rayon-rs/rayon) to run your array operations in parallel.

## The Challenges of using Rust for scientific applications

Rust is a promising language for scientific applications but there are several challenges that need to be overcome before the language can gain significant traction by the scientific community.

* **Rust is a low-level language with many powerful features**. In other words, actually you do not learn Rust during a Saturday afternoon while drinking mojitos. It takes significant effort and time before you can start writing with confidence. Fortunately the Rust community is very open and welcoming and there are always people willing to help. Besides, the compiler has the most informative error messages that I have seen in any programming language. In short, the learning curve is steeper than Python, but you will have a single memory-safe language to rule them all.
* **There may be some functionality that is still missing or unstable**. The Rust ecosystem is growing rapidly and more people are coming out with great libraries. The community is always happy to help you to come up with a solution for your missing functionality.
* **Interoperability with C/C++**. We certainly do not want to rewrite everything from scratch, therefore we would like to reuse as much code as we can from C/C++. For the Rust community, smooth interoperability with C/C++ is a top priority.

## Any further thoughts?

I hope that I could give you an idea about using Rust for scientific software applications. Comments and thoughts are appreciated.

## Acknowledgement

Thanks to Chiara Caratelli from providing the great drawings. Also my special thanks to [Florian Huber], [Carlos Martinez-Ortiz,] [Patrick Bos] and Tom Bakker for their help editing the text.
