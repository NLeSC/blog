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

![An orange crab wearing safety goggles and holding a laboratory flask.](/assets/1_ijMaliTc1TsD40XB7YW5GQ-9aa1eddf.png)

Image: courtesy of Chiara Caratelli

I am a software developer at the [Netherlands eScience Center](https://www.esciencecenter.nl/), where we empower all researchers across all scientific disciplines in the Netherlands by providing the right digital tools for their research. Picture this, a scientist comes to us with a brilliant idea about creating a novel material for improving solar cells or a revolutionary algorithm to grasp the science of protein interactions, but she needs to come out with the high performance software to run hundreds of simulations. Therefore, we work together with them to develop the software tools that can bring their ideas to concrete results.

Some of these projects involve a lot of number crunching and therefore we need tools to produce lightning-fast applications: enter [Rust](https://www.rust-lang.org/). [Rust](https://www.rust-lang.org/) is a low-level language with a welcoming community that [stands as a strong competitor to traditional languages like C/C++/Fortran](https://www.nature.com/articles/d41586-020-03382-2) for numerical applications thanks to its performance, memory management system, high abstraction level, and flourishing ecosystem. Check [the Rust book](https://doc.rust-lang.org/stable/book/) to get a feeling of the language!

> What I love about Rust is that it has been developed to solve concrete problems, built on top of the lessons (painfully) learnt while implementing real systems.

At the [Netherlands eScience Center](https://www.esciencecenter.nl/), my main focus is on [computational chemistry](https://en.wikipedia.org/wiki/Computational_chemistry) and [materials science](https://en.wikipedia.org/wiki/Materials_science). In these fields, the principles of quantum mechanics are used to generate models that allow the computation of interesting physical and chemical properties. These computations boil down to a lot of [***Linear Algebra***.](https://en.wikipedia.org/wiki/Linear_algebra) In case this sounds like an esoteric math concept to you, let me tell you that linear algebra is the mathematical bedrock upon which all modern machine learning applications are based.

The beauty of linear algebra is that many scientific and engineering problems can be modeled using numerical operations on vectors and matrices. Among the powerful tools in the linear algebra toolkit, the algorithms to find [eigenvalues and eigenvectors](https://en.wikipedia.org/wiki/Eigenvalues_and_eigenvectors) of a given matrix are the cornerstones for generating quantitative solutions to diverse questions like: “how much energy does a molecule absorb?” or “how much force can be applied on a bridge?” Since the start of computational physics, the scientific community has produced a plethora of libraries and tools to solve those numerical problems, mainly written in C/C++/Fortran.

![A colored ball-and-stick molecular model on a dark reflective surface.](/assets/0_OdXNA_YpyI6tlQn6-a8350266.webp)

Photo by Terry Vlisidis on Unsplash

Now the question is: how does Rust compare to the traditional approaches for building number-crunching applications? In this post, I am not going to present benchmarks comparing performance (check [this benchmark](https://benchmarksgame-team.pages.debian.net/benchmarksgame/fastest/rust.html) if you are curious about how Rust compares to C/C++). Instead, I will focus on what I consider the most important aspects of developing scientific software: ***development speed and maintainability***.

Do not take me wrong, performance is a top priority. However, if we build a weather model that predicts if we are going to be underwater in a couple of weeks (I live in the Netherlands), making sure that the model is well tested and ruling out the possibility that a [segmentation fault](https://en.wikipedia.org/wiki/Segmentation_fault) is going to pop up (after a couple of weeks of simulation), it is then more important than squeezing out the last bit of performance. Therefore, I am going to address the following questions:

- How much effort is needed to build and deploy the software?
- How do I manage the dependencies?
- Can we develop a minimum viable product (MVP) in a reasonable time?
- How much effort is required to test, document, and maintain the code?
- How do I parallelize the application?

## Implementing an Eigenvalue solver

I will address the aforementioned questions using the experience that I gained while creating a Rust package (a.k.a [crate](https://learning-rust.github.io/docs/d4.crates.html)) called “e [igenvalues](https://github.com/felipeZ/eigenvalues) **”** where I have implemented a couple of algorithms to compute the eigenvalues and eigenvectors of a given matrix.

[***Here***](https://github.com/felipeZ/eigenvalues) is the link to my eigenvalues library. You can also have a look at the [***documentation***](https://docs.rs/eigenvalues/0.4.0/eigenvalues/).

The following code snippet shows how to use the e [igenvalues](https://github.com/felipeZ/eigenvalues) library,

```rust
// Use the Davidson method
use eigenvalues::davidson::Davidson;
use eigenvalues::{DavidsonCorrection, SpectrumTarget};

// Generate random symmetric matrix
let matrix = eigenvalues::utils::generate_diagonal_dominant(20, 0.005);
let tolerance = 1e-4;

// Compute the first 2 lowest eigenvalues/eigenvectors using the DPR method
let eig = Davidson::new(
  matrix, 2, DavidsonCorrection::DPR, SpectrumTarget::Lowest, tolerance).unwrap();
println!("eigenvalues:{}", eig.eigenvalues);
println!("eigenvectors:{}", eig.eigenvectors);
```

**How much effort is needed to build and deploy the software?**

![A performer spinning a hoop with burning wicks.](/assets/0_tji-dAXf4iNkxkAM-fb77df43.webp)

Photo by Conor Samuel on Unsplash

Number-crunching software usually relies on highly optimized math libraries (e.g. [OpenBlas](https://www.openblas.net/), [Lapack](http://www.netlib.org/lapack/), [Eigen](https://eigen.tuxfamily.org/), *etc.*)offering low level operations which are used as building blocks to develop more complex calculations. Those dependencies are usually installed by the system administrator or using a Linux package manager (*e.g.* [apt](https://en.wikipedia.org/wiki/APT_\(software\))). These dependencies, together with other miscellaneous libraries to parse, log, *etc.,* are then tied together using something like [CMake](https://cmake.org/), which gracefully compiles and links your dependencies. Go ahead, start laughing!

The previous approach works great on paper, but in reality, developers spend considerable time learning and writing [CMake](https://cmake.org/) configuration files ([CMake](https://cmake.org/) may not be a programming language by itself but it gets the category of a dialect with its own peculiarities). In addition, looking for the right compiler version and installing the correct dependencies without messing up the other libraries make things so complicated that people literally prefer to write and maintain their own set of tools instead of having to deal with the dependency hell. So, you end up juggling different compiler vendors with their corresponding version, [CMake](https://cmake.org/), your core dependencies, the miscellaneous libraries that you have implemented yourself, and (of course) your code. Finally, the cherry on top: you share the software with your collaborators and they will need to install it in their own environment and deal with their own dependency hell, which will probably be different from yours!

How does Rust (partially) solve this mess?

- Say goodbye to CMake! You (or your system admin) still need to install the core highly optimized math libraries, but the Rust package manager (a.k.a [Cargo](https://doc.rust-lang.org/cargo/)) will solve, install and compile all the dependencies for you.
- [The Rust community offers mature packages](https://crates.io/) providing the common functionality that you need to write numerical applications.

Check my [dependencies file](https://github.com/felipeZ/eigenvalues/blob/master/Cargo.toml) to get an idea of what kind of information [Cargo](https://doc.rust-lang.org/cargo/) (Rust package manager) needs to build your application. In this case, I am using the excellent [nalgebra library](https://nalgebra.org/) to build some algorithms on top of nalgebra’s arrays manipulation API.

**Can we develop a minimum viable product (MVP) in a reasonable time?**

In scientific applications, we often start with a model or a hypothesis in mind and we then build software to prove it (or disprove it) and to connect theory to experiments. Given the high levels of uncertainty, we cannot be sure that what we are developing is going to work out, we need to explore a prototype or minimum viable product to corroborate that our ideas are correct, before investing valuable human resources in a project.

Therefore, it is common to write an MVP in a language like Python that allows to quickly implement an algorithm or method, at the expense of runtime performance (Python is *painfully slow,* but great for prototyping!). It is extremely risky to develop an MVP in C or Fortran given the complexity and low abstraction level of those languages, meaning that to implement the same concepts we need to write many more lines of code compared to Python.

But what if we could implement something almost as quickly as in Python but with the C++ speed? Rust again to the rescue!

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

![Using Rust for Scientific Numerical applications: Learning from Past Experiences](./using-rust-for-scientific-numerical-appl-ab3f6590.png)
Image: courtesy of [Chiara Caratelli](https://www.instagram.com/qiadraws/)***Disclaimer****:* *due to my ignorance of the latest Rust developments on multi-node computing (*[*MPI*](https://en.wikipedia.org/wiki/Message_Passing_Interface)*) and GPU integration, I am going to blatantly ignore those two subjects.*

Scientific simulations like weather prediction, protein binding, fluid dynamics, etc*.* are computationally intensive but often parallelizable (at least on paper!). It goes without saying that we want to make use of all cores available in a given machine. The standard approach is to use something like [OpenMP](https://www.openmp.org/) that consists of runtime libraries, compiler directives, *etc*. to support shared-memory multithreading programming.

A quite dreaded moment for scientific software developers is when the serial implementation is working and a new parallel version must be implemented. Seriously, parallel implementation in C/C+/Fortran means that all your [unknown unknowns](https://en.wikipedia.org/wiki/There_are_known_knowns) about unsafe memory management suddenly uncover all the obnoxious bugs that you didn’t know about until now, and that you need to track for endless hours.

As a remedy for all that frustration and wasted time, Rust offers a novel approach coined as [fearless concurrency](https://doc.rust-lang.org/book/ch16-00-concurrency.html). This concept refers to the possibility of writing parallel applications that are free of subtle bugs and can be refactored without introducing new bugs.

But how does Rust achieve this marvelous formula? It turns out that the Rust type system and [ownership system](https://doc.rust-lang.org/book/ch04-00-understanding-ownership.html) keep track of what is safe to share across threads, refusing to compile illegal concurrent memory transactions that would have resulted in runtime issues. So, the Rust compiler happily raises compilation errors whenever you are trying to use memory in an unsafe way instead of unleashing Godzilla in the middle of your simulation.

![Using Rust for Scientific Numerical applications: Learning from Past Experiences](./using-rust-for-scientific-numerical-appl-622b6b49.jpg)

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
