---
layout: post
title: "An applied mathematician meets software engineering"
date: 2023-01-26
author: Pablo Rodríguez-Sánchez
published: true
source: medium
source_url: https://blog.esciencecenter.nl/an-applied-mathematician-meets-software-engineering-987e94c5b0e7
tags:
  - Biology
  - Git
  - Parallel Computing
  - RSE
  - Software Engineering
  - Workshop
---

Doing this involved using numerical differentiation to extract information such as instantaneous speed, acceleration, or curvature. Still technical, but way easier to interpret than the data the machine returned by default. I presented the idea to my colleagues. Some of them liked it, while others received it with a bit of skepticism. This is understandable: most people are usually not keen to hear about differentiation and parameterized curves on a coffee break.

This was when software engineering came to the rescue. What if I code this mathematical knowledge in the form of a software package? This way, the interested enough colleague can dig into the details, while the busy and/or not mathematically oriented one can just trust that the package does its work.

Having both my two imaginary colleagues in mind, I followed some software engineering [best practices](https://journals.plos.org/plosbiology/article?id=10.1371%2Fjournal.pbio.1001745) to make their** lives easier. My package was:

**Openly published**. So it was easy to find, install and inspect (and it [still is](https://github.com/PabRod/kinematics)).

**Documented in detail. **So it is easy to learn the basics, and possible to dive into the details if desired.

**Citable. **So users can cite [its DOI](https://zenodo.org/record/5107805#.Y3Y1UNLMKUk) in their publications.

**Covered by unit tests**. So trusting the results doesn’t require a huge leap of faith. (What are unit tests? Tiny scripts that check that the package delivers what the developer expects, and that can be run again at any moment. Sounds silly but it is one of the most powerful tools I’ve learned in my stage as a software engineer).

When written like this, as a proper code package, **the tool solved a problem instead of creating a new one** (the problem of having to struggle with a new tool from its foundations).

![An applied mathematician meets software engineering](/assets/an-applied-mathematician-meets-software--2f539f1e.png)
The same trajectory as before, but now “enriched” with extra information, such as absolute speed and absolute accelerationAdditionally, the package could be applied to any time series representing a two-dimensional movement, so it was useful for problems other than bug tracking on a Petri dish. The package proved to be interesting to other researchers (the metrics say it’s downloaded around 200 times per month), and even managed to get all its way to [CRAN](https://cran.r-project.org/web/packages/kinematics/index.html), the Mons Olympus *of packages in R language.

## **Mathematical talent locked in a drawer**

Let’s imagine a parallel universe in which I never had previous experience as a software engineer. In such a universe, my package would have never taken off. Interestingly though, I’m sure I would have written the code anyways… but I don’t think I would have managed to recruit any users apart from myself. In that universe, my code will be rotting inside some portable hard drive locked in a drawer.

In that universe, I wouldn’t know anything about software best practices. I know what you are thinking. “Best practices” sounds a bit like “good manners”, something desirable but not strictly necessary. Even less when you have more important stuff to do, such as writing publications. But best practices are necessary… at least if you want your methods to be usable by others, and even by your future self.

At the eScience Center we often wonder how many brilliant pieces of knowledge follow this sad destiny. Do you have a great algorithm that deserves to fly free? Let us know. Perhaps we can help you!

Or perhaps you want to try it yourself. If that’s the case, I recommend you start with [*Best practices for scientific computing (Wilson, 2014)*](https://journals.plos.org/plosbiology/article?id=10.1371%2Fjournal.pbio.1001745). Also, take a look at the lessons and workshops on computational skills for researchers offered by [Software Carpentry](https://software-carpentry.org/).
