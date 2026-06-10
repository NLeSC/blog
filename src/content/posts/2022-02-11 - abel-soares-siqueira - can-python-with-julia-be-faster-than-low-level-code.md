---
layout: post
title: "Can Python with Julia be faster than low-level code?"
date: 2022-02-11
author: Abel Soares Siqueira
published: true
source: medium
source_url: https://blog.esciencecenter.nl/can-python-with-julia-be-faster-than-low-level-code-cd71a72fbcf4
tags:
  - C++
  - Environment
  - Julia
  - Performance
  - Python
  - RSE
---

## Part 3 of the series on achieving high performance with high-level code

Using the `read` function of Julia, we can parse the file as a stream of bytes**. This way we can manually walk through the file and parse the integers. This is the code:

We denote this strategy **Optimized Julia. **This version of the code manually keeps track of the sequence of bytes related to integers, so it is much less readable. However, this version achieves an impressive speedup, surpassing the C++ version:

![Can Python with Julia be faster than low-level code?](/assets/can-python-with-julia-be-faster-than-low-48d3ad5b.png)

![Can Python with Julia be faster than low-level code?](/assets/can-python-with-julia-be-faster-than-low-ccc4a93a.png)
Run time of **Pure Python**, **C++**, **Basic Julia, Prealloc Julia, Julia + C parsing, **and **Optimized Julia **strategies. (a) Time per element in the log-log scale. (b) Time per element, relative to the time of the C++ version in the log-log scale.It was not easy to get to this point, and the code itself is convoluted, but we managed to achieve a large speedup in relation to Python using only Julia, another high-level language. The average speedup for files with over 1 million elements is 40.25, which is over 2 times faster than what we got with the **C++ **strategy. We remark again that the **Pure Python **and** C++** strategies have not been optimized, and that readers can let us know in the comments if they found a better strategy.

So yes, we can achieve a speedup equivalent to a low-level language using Julia.

## Conclusions: We won, but at what cost?

One thing to keep in mind is that to achieve high speedups, we had to put more effort into getting to that point. This effort comes in diverse ways:

* To write and use the **C++** strategy, we had to know sufficient C++, as well as understand the libraries used. If you don’t have enough C++ knowledge, the effort is higher, since what needs to be done is quite different from what Python developers are used to. If you already know C++, then the effort is that of searching the right keywords and using the right libraries.
* To write and use any of the Julia strategies, you need to put some effort into having the correct environment. Using Julia from Python is still an experimental feature, so your experience may vary.
* To write the **Basic Julia** and **Prealloc Julia** strategies, not much previous knowledge is required. So, we can classify this as a small effort.
* To write the **Julia + C** and **Optimized Julia **strategies, we need more specialized knowledge. This is again a high-effort task if you do not already know the language.

Here’s our conclusion. To achieve a high speedup, we need specialized knowledge which requires a big effort. However, we can conclude as well that, if you are not familiar with either C++ or Julia, then acquiring some knowledge in Julia allows you to get a smaller improvement. That is, a small effort with Julia already gets you some speedup. You can prototype quickly in Julia and get a reasonable result and keep improving that version to get C-like speedups over time.

![Can Python with Julia be faster than low-level code?](/assets/can-python-with-julia-be-faster-than-low-5308e8ab.png)
Speedup gain relative to the effort of moving the code to a different language.We hope you have enjoyed the series and that it helps you with your code in any way. Let us know what you think and what you missed. Follow us for more research software content.

Many thanks to our proofreaders and reviewers, *[*Elena Ranguelova*](https://www.esciencecenter.nl/team/dr-elena-ranguelova/)*, *[*Jason Maassen*](https://www.esciencecenter.nl/team/dr-jason-maassen/)*, *[*Jurrian Spaaks*](https://www.esciencecenter.nl/team/jurriaan-spaaks-msc/)*, *[*Patrick Bos*](https://www.esciencecenter.nl/team/dr-patrick-bos/)*, *[*Rob van Nieuwpoort*](https://www.esciencecenter.nl/team/prof-dr-rob-van-nieuwpoort/)*, and *[*Stefan Verhoeven*](https://www.esciencecenter.nl/team/stefan-verhoeven-bsc/)*.*
