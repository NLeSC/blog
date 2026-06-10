---
layout: post
title: "dealing with dragons and monsters best practices for handling legacy code"
date: 2019-01-09
author: Felipe
published: true
source: medium
tags:
  - C++
  - Git
  - Performance
  - RSE
  - Reproducibility
---

> “So comes snow after fire, and even dragons have their endings.”  
> ― **J.R.R. Tolkien,** [**The Hobbit**](https://www.goodreads.com/work/quotes/1540236)

![](/assets/1_frYHQLnu7557WfFq0j7L1w-0f8293f3.png)

Typical debugging session

When I started my PhD in the field of [computational chemistry](https://en.wikipedia.org/wiki/Computational_chemistry) I was given the task of improving and contributing to different pieces of code in the infamous [FORTRAN 77 standard](https://en.wikipedia.org/wiki/Fortran#FORTRAN_77). I gathered all my courage and spent several months banging my head against a wall of esoteric compilation errors trying to decipher the arcane arts of compiling and running legacy code.

Back then the basic idea was to dig into all the blogs, documents and different Q&A sites, then muddle through the code until it compiled. Subsequently, I put warnings for all the unfortunate souls that would have to deal with the spaghetti monster in the future, warning them to not touch this and that keyword under the threat of eternal damnation.

> Then, I wondered: if dealing with legacy code is such a nightmare, why do we not throw away all the legacy code and start from scratch?

Yes, legacy code is ugly, convoluted and sometimes it is indistinguishable from [black speech of Mordor](https://en.wikipedia.org/wiki/Black_Speech) (see for instance: *goto*, *rewind* and *common blocks***).** But, *in general scientific legacy code contains the tears, sweat and blood of researchers who have spent many days and nights implementing new features and fixing bugs*. You can argue that all the knowledge lies within publications and therefore we can throw everything away and start from scratch, but as discussed in [this excellent post](https://www.joelonsoftware.com/2000/04/06/things-you-should-never-do-part-i/), the answer is more complex than that and we still need to produce working code while keeping the previous developments alive.

> So, how do we then face legacy code while maintaining our sanity?

## The quest

Before embarking on any enterprise about maintaining/modernizing legacy code, let me tell you that on my experience the war against bad code is won battle by battle, one at a time, so be wise when choosing your battles. Experience will tell you what the most urgent issues are to fix, provided that you have experience on the code that you are working on. But since that is seldom the case, the first step to take is read as much as you can about the language/tool that you are going to use.

> The time that you spend reading material related to your project’s programming languages, libraries, tools, etc. will pay you back many times in the future when you identify an issue and immediately know how to deal with it.

If you happened to run into a *C++* legacy monster go and read [*Effective modern C++*](http://shop.oreilly.com/product/0636920033707.do)*.* On the other hand if you need to deal with *FORTRAN*, I would recommend you to have a look at [*Modern Fortran Explained*](https://global.oup.com/academic/product/modern-fortran-explained-9780198811893?cc=nl&lang=en)*.*

Now, if we follow the [Pareto principle](https://en.wikipedia.org/wiki/Pareto_principle), we can expect that roughly 80% of the performance/functionality of a given software, depends on approximately 20% of the source code. This rule of thumb basically means that we do not need to change every single line of code, but just some core components that most of the functionality depends on. A [*profiler*](https://en.wikipedia.org/wiki/Profiling_\(computer_programming\)) is the tool that will help you to identify the hot spots of your software. Profilers can be used together with [***gprof2dot***](https://github.com/jrfonseca/gprof2dot) to generate a graph showing the most used functions together with their dependencies.

## The strategy

> Would you go on the quest for unraveling the mysteries of the universe with a rusted and lousy tool?

Once you know how to use the tools of your language and have identified the core functionality of your software, it is time to reflect on what you want to get out of the code. You may come out with several words like: performance, efficiency, etc. but if you are doing science, in my view the really important word is ***reproducibility****.* Reproducibility is fundamental within science, because it is what sets up the basis of hypotheses and subsequently theories. Without it we will go blind searching for ghosts.

To my knowledge, there are three fundamental features that scientific code must contain in order to be reproducible: ***a test suite, a portable installation*** *and* ***documentation***. A test suite is simply a collection that asserts that a software behaves as expected. While a portable installation refers to a simple procedure that allows to easily install the software in different platforms and operative systems. I will elaborate more about these three important features in the following section.

Notice that these three features are extremely difficult to implement without a [version control system](https://guide.esciencecenter.nl/best_practices/version_control.html), that in modern scientific development boils down to using [***git***](https://git-scm.com/book/en/v2) (specifically one of the several free [***repository management services***](https://medium.com/flow-ci/github-vs-bitbucket-vs-gitlab-vs-coding-7cf2b43888a1)). I am aware that there are some politics among scientists against making the code open source, mainly due to the prejudice that someone else is going to steal their ideas. Admittedly, no serious scientist will go through the pain of understanding thousands of lines of obfuscated code to steal a complex mathematical model that is already public knowledge. But more importantly, science is about probing reality with experiments and simulations. How can an obscure and inaccessible code achieve those goals?

## Even heroes need help

> Do not reinvent the wheel, use the high quality and free available software for testing and building

### Testing

A test suite is extremely important since it will guarantee that we do not introduce new bugs when we are refactoring the core components. If there are no tests you may need to come out with your own test suite using a [*test infrastructure for your* language](https://guide.esciencecenter.nl/best_practices/testing.html). Notice that testing does not mean to run the whole software with hundreds of complicated calculations in a supercomputer, producing Gigabytes of output. Testing is about making sure that small components (e.g. functions and methods) behave as you expect. Yes, it means that you should have a lot of small tests! Also, in order to help with the process of refactoring the legacy code you will certainly need to get familiar with the concept of [**continuous integration**](https://realpython.com/python-continuous-integration/).

### Installation

Legacy code usually lacks a portable installation and users are forced to deal with low level shell scripts or [Make files](https://www.gnu.org/software/make/) (or whatever [build system](https://en.wikipedia.org/wiki/Build_automation) you are using), in order to install the code. If you are using C/C++ or FORTRAN, [**CMake**](https://cmake.org/) is the tool that you are looking for in order to make your software easy to install, most of the instructions that you will need are nicely explained in the [CMake Cookbook](https://www.packtpub.com/application-development/cmake-cookbook).

> Being portable is important not only for the people interested in using the software but also for you in order to work in a continuous integration model*.*

### Documentation

Testing and installing the code is half of the story, a software without documentation is basically inaccessible even for the experts in a given field. By documentation I do not mean a lengthy and detailed description of every feature available in the software. What users of the software want to see is a short and clear description of a given feature or functionality, while implementation details can be moved to the source code.

There are several choices to write documentation in C/C++, while for FORTRAN the standard tool is [**Doxygen**](https://github.com/doxygen/doxygen). For an extensive discussion about how to write documentation for scientific code, check the [Ten simple rules for documenting scientific code](https://journals.plos.org/ploscompbiol/article?id=10.1371%2Fjournal.pcbi.1006561).

## “Here be dragons”

Together we have just piped out at some guidelines and tools to face scientific legacy code. They are not silver bullets and only intended to give some help when navigating uncharted seas. Finally, bear in mind that cleaning, testing and documenting while coding are the most powerful tools against prospective code-monsters.
