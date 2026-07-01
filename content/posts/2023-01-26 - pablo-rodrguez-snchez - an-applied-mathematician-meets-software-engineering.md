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

How software engineering practices helped me bridge the gap between mathematics and other fields

![](/assets/0_cJAE3sgoAlTXMc4E-ebafd1fe.webp)

Photo by Mick Haupt on Unsplash

## From industry to academia

Let’s go backward to 2015. Back then, I had a degree in theoretical **physics** and a 3-year professional experience in industrial software **engineering**. All of it spiced with many semi-professional activities in **science communication**. At the end of that year, I was hired as an applied **mathematician** at an aquatic **ecology** department, in order to perform a PhD.

In short: physics, engineering, communication, mathematics, and ecology, … it was the quintessential multidisciplinary job.

As often happens, one of the disciplines was overrepresented. This happened just naturally: I was working in an aquatic ecology group, inside an ecology building, on a campus specialized in biology, in a city nicknamed “the city of life sciences”. So biologists outnumbered non-biologists at around a 9 to 1 ratio. Indeed, I was the only physicist in the group, and also the only one with engineering experience. This meant that I was expected to adapt my academic culture to theirs, not the other way around. And rightfully so. Summarizing: my (mostly) mathematical background was required to produce publications interesting for an audience of (mostly) biologists.

What about the biologists’ mathematical background? Well, something I learned is that any preconceived assumption in this direction will fail. Some biologists just don’t like mathematics (just like many other humans), while others are really interested and proficient at it. One way or another, I was supposed to provide mathematical content and tools for all of them. And this posed a serious problem: how could I possibly do that without frustrating the former or boring the latter?

Talking about frustration, I should also not forget about frustrating the reader. It is time to stop talking about myself and dive into an example.

## Tracking bugs (the many-legged ones)

One good day, our department bought a fancy tracking device. The purpose was to observe the movements of some tiny invertebrates inside a Petri dish.

The device was, essentially, a digital camera. It captured several images per second and identified the position of the bug in each of them. Then it returned a list of these positions (*x*, *y*) and the corresponding sampling time *t*. The figure below shows a bug’s trajectory.

![](/assets/1_iF9f0KmFW_0FjvLyLi6Eww-b4c83a7e.png)

Example of a bug’s trajectory

The machine’s output also created some obscure and difficult-to-interpret processed data. Unnecessarily obscure, I would say. This is the kind of situation where multidisciplinarity can do its magic: there is a physicist in the room so, why not use the good-old theory of classical kinematics (the simple, elegant, and centuries-old mathematical tool for describing movement) to extract information directly from the list of positions and times?

Doing this involved using numerical differentiation to extract information such as instantaneous speed, acceleration, or curvature. Still technical, but way easier to interpret than the data the machine returned by default. I presented the idea to my colleagues. Some of them liked it, while others received it with a bit of skepticism. This is understandable: most people are usually not keen to hear about differentiation and parameterized curves on a coffee break.

This was when software engineering came to the rescue. What if I code this mathematical knowledge in the form of a software package? This way, the interested enough colleague can dig into the details, while the busy and/or not mathematically oriented one can just trust that the package does its work.

Having both my two imaginary colleagues in mind, I followed some software engineering [best practices](https://journals.plos.org/plosbiology/article?id=10.1371%2Fjournal.pbio.1001745) to make **their** lives easier. My package was:

**Openly published**. So it was easy to find, install and inspect (and it [still is](https://github.com/PabRod/kinematics)).

**Documented in detail.** So it is easy to learn the basics, and possible to dive into the details if desired.

**Citable.** So users can cite [its DOI](https://zenodo.org/record/5107805#.Y3Y1UNLMKUk) in their publications.

**Covered by unit tests**. So trusting the results doesn’t require a huge leap of faith. (What are unit tests? Tiny scripts that check that the package delivers what the developer expects, and that can be run again at any moment. Sounds silly but it is one of the most powerful tools I’ve learned in my stage as a software engineer).

When written like this, as a proper code package, **the tool solved a problem instead of creating a new one** (the problem of having to struggle with a new tool from its foundations).

![](/assets/1_Ml-WjxRKZdgLxPgeWjS2IA-c2570084.png)

The same trajectory as before, but now “enriched” with extra information, such as absolute speed and absolute acceleration

Additionally, the package could be applied to any time series representing a two-dimensional movement, so it was useful for problems other than bug tracking on a Petri dish. The package proved to be interesting to other researchers (the metrics say it’s downloaded around 200 times per month), and even managed to get all its way to [CRAN](https://cran.r-project.org/web/packages/kinematics/index.html), the *Mons Olympus* of packages in R language.

## Mathematical talent locked in a drawer

Let’s imagine a parallel universe in which I never had previous experience as a software engineer. In such a universe, my package would have never taken off. Interestingly though, I’m sure I would have written the code anyways… but I don’t think I would have managed to recruit any users apart from myself. In that universe, my code will be rotting inside some portable hard drive locked in a drawer.

In that universe, I wouldn’t know anything about software best practices. I know what you are thinking. “Best practices” sounds a bit like “good manners”, something desirable but not strictly necessary. Even less when you have more important stuff to do, such as writing publications. But best practices are necessary… at least if you want your methods to be usable by others, and even by your future self.

At the eScience Center we often wonder how many brilliant pieces of knowledge follow this sad destiny. Do you have a great algorithm that deserves to fly free? Let us know. Perhaps we can help you!

Or perhaps you want to try it yourself. If that’s the case, I recommend you start with [*Best practices for scientific computing (Wilson, 2014)*](https://journals.plos.org/plosbiology/article?id=10.1371%2Fjournal.pbio.1001745). Also, take a look at the lessons and workshops on computational skills for researchers offered by [Software Carpentry](https://software-carpentry.org/).
