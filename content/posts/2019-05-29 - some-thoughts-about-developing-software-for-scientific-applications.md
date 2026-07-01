---
layout: post
title: "some thoughts about developing software for scientific applications"
author: Felipe
published: true
source: medium
tags:
  - Agile
  - RSE
---

> …The children would remember for the rest of their lives the august solemnity with which their father, devastated by his prolonged vigil and by the wraith of his imagination, revealed his discovery to them:
> 
> \-‘The world is round, like an orange.’
> 
> ― **Gabriel Garcí­a Márquez, One Hundred Years of Solitude**

![](/assets/0_stxtWjVMWisEjKv8-b9b5049c.webp)

Photo by Benjamin Davies on Unsplash

Recently, I have been reading a wonderful book called: [*Thinking, fast and slow*](https://en.wikipedia.org/wiki/Thinking,_Fast_and_Slow)*.* In that book, David Kahneman brilliantly guides us through the [two system model](https://en.wikipedia.org/wiki/Dual_process_theory) representing the thought process: a fast system in charge of the automatic behavior and a slow one taking analytical decisions. Mr. Kahneman insistently warns us, in his very clever humor, about the lazy slow system and the biased decision-making of the fast system. In this post I will borrow these ideas to share my experience about designing and implementing scientific software.

Also, in contrast to my [previous blog]( post in which I briefly introduced some guidelines to deal with legacy code, in this one I would like to embark with you on a new journey to the promised land full of nothingness where we can start (almost) from scratch!

### The world is round, like an orange!

> “Our comforting conviction that the world makes sense rests on a secure foundation: our almost unlimited ability to ignore our ignorance.”  
> ― Daniel Kahneman

![](/assets/0_82ZMt6M1u2kNP0Lf-2869ab36.webp)

Photo by NASA on Unsplash

Lets start from the beginning: planet earth. One given day on earth, *José Arcadio Buendía*, one of the main characters of o [ne hundred years of solitude](https://en.wikipedia.org/wiki/One_Hundred_Years_of_Solitude), discovered after many months of effort and pain that the earth is round! Which is great, apart from the fact that the Greeks knew it a couple of millennia before.

Scientific software developing is full of *José* Arcadios, they wake up early on the morning and spend febrile days playing with mathematical model in the shape of quick and dirty script that are going to be hopefully clean and polish on the future. Of course, as the famous software engineer [Robert Martin](https://blog.cleancoder.com/) brilliantly explains in his [clean code book](https://www.pearson.com/us/higher-education/program/Martin-Clean-Code-A-Handbook-of-Agile-Software-Craftsmanship/PGM63937.html), the code never gets clean and it becomes yet another spaghetti monster.

So, what can you do to create flexible and functional software for scientific applications? There are many great books about software architecture like [clean architecture](https://learning.oreilly.com/library/view/clean-architecture-a/9780134494272/) and [the pragmatic programmer](https://www.oreilly.com/library/view/the-pragmatic-programmer/020161622X/). However, when developing software for scientific applications, we usually do not have a set of well defined specifications, instead we just have hunches and vague ideas of what may or may not work.

Since we lack a concrete plan, our mind continuously plays tricks on us, making us to believe that we possess both unlimited time and resources. Professional software architects are quite conscious about this [planning fallacy](https://en.wikipedia.org/wiki/Planning_fallacy) and have years of experience and painful mistakes to remind them about those biases. But scientific software is usually the toil of a [single or few heroes](https://arxiv.org/abs/1904.09954) who work day and night to create software, crunch data and analyze results.

**The question is then how can we make a concrete plan for implementing half-proven ideas**?

*What I have found is that the unknowns of the projects can be treated as black boxes that can be encapsulated in a flexible framework. This framework, allows to replace one black box by another with an small amount of effort.*

In this blog I would like to introduce a simple guideline about best practices for designing scientific software, without entering in any religious battles about whether [Agile](https://en.wikipedia.org/wiki/Agile_software_development) methodologies like [Scrum](https://en.wikipedia.org/wiki/Scrum_\(software_development\)) are suitable for scientific software development.

### Make a clear plan and discuss it with others

> “many people are overconfident, prone to place too much faith in their intuitions.”
> 
> ― Daniel Kahneman

A whiteboard or a piece of paper is a great place to start designing software. Discuss over a cup of coffee with your colleagues what is the functionality that you are expecting from the software. Make a scheme representing the functionality as boxes and the relation between the functions as edges, do not enter on the details of the algorithms for the moment being. Then ask yourself:

- Are the components of you design orthogonal? This means that you can replace one component by another without having to change all the other components.
- Is there some information that is duplicate or can be derived from a higher abstraction level?
![](/assets/0_vh8bBvgToPFAyBLk-b840d649.webp)

Photo by Kaleidico on Unsplash

Once you have a draft about the functionality and its dependencies, look up for the parts of the system that are independent from the current unknowns of the project. Those independent parts constitute the backbone of your framework and should be flexible enough to allow to plugin other components.

The development of a modular and flexible software may seem costly, but the invested time will be amortized on the future when you would need to replace a part of the system without having to restart from scratch. And believe me, that is always going to happen!

If the previous design rings a bell, have a look at the [microkernel architecture](https://www.oreilly.com/library/view/software-architecture-patterns/9781491971437/ch03.html)!

### Test Driven Development

> “We are prone to overestimate how much we understand about the world and to underestimate the role of chance in events.”
> 
> ―David Kahneman

![](/assets/0_G2kcC7G4TFHygK9s-679679d1.webp)

Photo by SpaceX on Unsplash

You may think that since you are navigating uncharted seas, you need to play with the models before testing the code. But, if your goal is to prove an hypothesis based on some data or algorithm, should you not been testing the code that represents the hypothesis since the beginning?

[Test Driven Development](https://en.wikipedia.org/wiki/Test-driven_development) is completely ignored or at best frown upon in scientific software development, but the nature of this software development methodology is deeply rooted on the scientific method. You need to first identity the properties that your system should have and then you progressively build your system around a set of tests that check for the expected functionality.

### Avoid social embarrassment: use the standard libraries

> “true experts know the limits of their knowledge”
> 
> ―David Kahneman

Duplication and re-implementation of well known algorithms should be avoided, correctness is more important than performance. Remember that the main goals of a scientific library is first reproducibility and then performance. A flexible, well-tested and well-documented library can always be improved in the future.

As [Donald Knuth](https://en.wikiquote.org/wiki/Donald_Knuth) famously said: “Premature optimization is the root of all evil”. You first goal should be a functional and well tested library, once you have something that works as expected, you can start profiling and optimizing.

### Finally

![](/assets/0_wbN9foCe_njdkMbr-24583a61.webp)

Photo by Aaron Burden on Unsplash

There is no single recipe that covers all the technical problems for a given scientific application, but identifying the software requirements and the known-unknowns will help you to create a crude chart to navigate the sea of monsters and uncertainties on a scientific software development voyage.
