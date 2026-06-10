---
layout: post
title: "floating (point) butterfly effect"
date: 2018-08-06
author: Patrick Bos
published: true
source: medium
tags:
  - uncategorized

---

## Searching for tiny bugs that cause big problems

![](/assets/1_Qoq1_5fKSaZA65JyVWjfmg-1f26fc50.jpeg)

I know it’s a bug, but it’s so pretty… what harm could it do?

Last year, I took a few weeks to look into floating point round-off errors in [RooFit](http://roofit.sourceforge.net/), the particle physics model building and fitting code that’s used for many large experiments, like the Higgs boson searches at CERN’s LHC.

My job was to make RooFit faster by parallelizing part of it, but without changing the outcome of calculations. However, I found that fitting a model to some data set (which is the basic purpose of the code) using my new method did not yield exactly the same result… uh-oh.

Now, whenever I hear the *holy mantra of innocent round-off errors*, I immediately jump up in my seat…

I hope after reading this blog, you’ll feel the same way and help me to encourage people to chase after their butterflies. Below I shared some helpful tips for solving floating point precision issues. Be sure to add your tips and experiences in the comments!

![](/assets/1_9dKx8jvCN8reko75ydVE1w-f5f193c7.png)

Lorenz’s strange attractor, an icon of chaos theory and the butterfly effect. By Dschwen — Own work, CC BY 2.5

## Round and round and round it goes, where it stops…

In numerical computing, it is quite common to encounter round-off errors due to floating point precision.

A sum or difference of two innocent looking values like 1 and 2/3 (two-thirds) may take the first-time programmer by surprise. For instance, Python will tell you that `1 + 2/3` equals `1.666666666666666***5***`. To any student of basic math, a *seven* at the end would have made sense, but a *five* is just crazy talk.

Cue the lesson about floating point numbers, and the student can sleep well again, knowing the world still makes approximate sense.

For most computational scientists, pretty soon these errors will become a fact of life: no further thought is given when one encounters such errors. An anthropologist studying the tribe of computational scientists would certainly identify the phrase *“yeah, there’s always some inevitable round-off errors”* as one of the community’s central chants in its prayers to its digital deity.

> *Yeah, there’s always some inevitable round-off errors…*

In my own experience, but also from talking to many people over the years, the floating point round-off is discarded as an integral part of doing numerical science, for instance when doing large simulations or data analysis.

While this is a useful day-to-day reflex, it pays off to take a deeper look at your calculations and try to find out exactly why you did not get the result you expected.

Better yet, try to find out whether you can get the result you were looking for after all and, if relevant, how much performance this will cost you versus how much you will gain by this. Even after years of experience (or perhaps especially then), going back to basics in this way can help you gain some new perspectives, as it did for me.

Most of the time, these errors are not really an issue, but sometimes they can be, as they turned out to be in RooFit.

## A swarm of butterflies: parallelizing RooFit

![](/assets/1_w6-Be9A0zcDpN4VLb4OftQ-bf6f2222.jpeg)

They can leave quite a mess.

Parallelization is a common source of round-off errors, but in fact, my errors happened before the actual parallelization. What’s more, the results weren’t off by a few bits like the `1 + 2/3` example above. They were sometimes off by as much as the 5th significant digit, like in `1.000**0**` versus `1.000**1**`.

This certainly cannot be explained by floating point round-off alone. Seeing as the point of RooFit is to robustly determine whether billions of €/$/CHF and many thousands of hours were spent sensibly, one might imagine the anxiety that such errors could produce in its stakeholders: the particle physicists, their funders, the world and myself.

In the end, the error could be explained by a combination of factors, all originating from floating point precision errors:

1. Initially tiny errors were, in fact, blown up to cause the larger errors we saw.
2. Due to the sensitivity of the fitting algorithm, a bit-size difference in input will change the direction of the search for the model’s optimal parameters.
3. After several search steps, a few bit-size differences and ensuing differing search directions will have made a big difference in the outcome.

### Dealing with chaos

RooFit does “compensate” for this search strategy by demanding a certain precision in the search outcome. By default, this precision comes down to precision up to the 5th significant digit, so that explains why the differences in outcome were never larger than that.

Still, this kind of “imprecision” is a long way from ==the differences of order== ==`10^-17`== ==numerical scientists are well used to==, so it stands out immediately when you’re trying to reproduce earlier experiments.

In fact, this was not the only effect we saw.

Some runs of the algorithm, using particularly pathological models, converged a lot slower or sometimes not at all, while they did converge before. The small differences in search direction can bring the algorithm into a problematic part of the parameter space.

In most cases, RooFit (actually Minuit, the minimizer behind the scenes) can deal quite cleverly with such cases, but it usually does take some extra time.

## How to catch butterflies

![](/assets/1__VfBrGlGdiR89ytOXj6Zcw-6af30ad5.jpeg)

Like a ninja

Here are some things I encountered and will try to remember next time I find myself in such a situation:

1. **Print values in hexadecimal notation**. Floating point numbers are always rounded in some way. Why settle for anything less than the absolute bit-wise truth? ==For instance, in C++, use== ==`std::cout << std::hexfloat << your_float;`====. Set it back to decimal afterwards using== ==`std::defaultfloat`====.==
2. **Trace your problem to the source**. This may sound obvious, but it can be such a huge pain in the ass that I reckon this is in fact the reason why most people just accept floating point values (ok, it is the reason **I** accept them). Surely, navigating through 20 layers of functions passing your value along is arduous. When arriving at the source, it can still be challenging to see exactly what is causing your error, especially when multiple arithmetic operations are involved. Some examples are:
3. **Trigonometric functions** like sines can give identical results for as much as three consecutive, bit-wise different floating point numbers, mainly around the maxima and minima. This means that these and the inverse relations such as the arcsine can in fact hide floating point errors! When you have become as paranoid for floating point errors as I have, and you notice that a bit-wise difference in input does **not** cause the differences in outcome you were expecting, this can be even more vexing than your initial **different** outcome. Or, in technical terms: what the crap?!
4. **Mapping of values to different ranges** using division, like often happens in coordinate transformations, can cause loss of least significant bits (thanks to [@lourensveen](https://medium.com/@lourensveen) for pointing this one out to me!). For instance, mapping to \[0,1\] can be useful in some cases. Note that this can also cause a nasty bug where your mapping operation results in values outside of your intended bounds, like `1.000000000000000001`. Next time I encounter this bug, before I rip my hairs out, I’ll try to consider that even when I’m sure my maths check out, I need to make sure my computer agrees. Programming is a two-way conversation.
5. When doing sums, **make sure the order is fixed**. This is often an issue in parallel/asynchronous programming, where the order in which cores finish their calculations depends on external factors like your incoming email, whether or not you’re replying to an email, the downloading of embedded images in your emails and many other possible concurrent processes your OS is trying to schedule simultaneously.
6. Also, for sums, it’s possible to use higher precision algorithms. **Kahan summation**, for instance, has an error bound on the order of floating point precision errors. This is typically a lot more precise than naive summation, although it does cost 4 operations instead of one. More precision usually comes at a cost to performance.
7. One of the easiest things you can do is just upgrade your algorithm to **use a higher precision floating point type** for the precision-crucial parts of your calculations, like `double` instead of `float` in C++.
8. … though even this seemingly simple trick can lead to problems! For instance, most modern processors have a so-called extended precision floating point precision mode where floats are internally represented by **80 instead of 64 bits**. The extra bits are used to “fix” precision errors for you. If you were expecting errors one way, but now aren’t getting them… again, confusion ensues.

Do you have related stories involving precision errors? Or do you have some great tactics for avoiding them? Share in the comments! *(Edit Aug 8: or join the discussion* [*on Reddit*](https://www.reddit.com/r/cpp/comments/959vc2/floating_point_butterfly_effect_searching_for/)*)*

*Edit 30 Aug:* a great suggestion by is to check out the paper “What Every Computer Scientist Should Know About Floating Point Arithmetic”, originally from 1991 by David Goldberg ([here an edited reprint](https://cr.yp.to/2005-590/goldberg.pdf)). Seems like a really great reference on almost anything floating point!
