---
layout: post
title: "Literate Programming in Science"
date: 2021-07-07
author: Johan Hidding
published: true
source: medium
source_url: https://blog.esciencecenter.nl/literate-programming-in-science-1669094541a7
tags:
  - uncategorized

---

![Literate Programming in Science](/assets/literate-programming-in-science-bca09353.jpg)
Photo by [Paul Melki](https://unsplash.com/@paulmelki?utm_source=medium&amp;utm_medium=referral) on [Unsplash](https://unsplash.com/?utm_source=medium&amp;utm_medium=referral)

# Literate Programming in Science

## 1. The Why

][Johan Hidding]·Jun 22, 2021Subscribe*Remember me for faster sign in

Then, what are we aiming for? We need to move scientific publishing into the current century: the century of Wikipedia and Github. Scientific information need not be bound to bundles of papers of decreasing length. We are building a trinity of data, code and knowledge.

Some would say code is data, which is true on a certain level, but what I mean by data is things that are measured in real life, or outcomes of previous computational experiments. Scientific data is stored in huge databases that are often publicly accessible. We have seen the movement of making data FAIR, Findable, Accessible, Interoperable and Reusable, and in general people have gotten the idea (I know, wishful thinking).

## FAIR Software?

Then there is code: by now most funding agencies agree that scientific results should be produced with open source software. What no one agrees on, is what this should mean: sure, your code needs to be accessible somewhere, and have a license. Do we get penalized if we write bad code? Is the paper rejected? I’m digressing. Attempts are underway to define what the FAIR principles would mean in the case of software: see for instance [https://fair-software.eu/.](https://fair-software.eu/.)

When it comes to scientific software, each package falls in roughly one of two categories: modelling and data analysis. While many scientists do a bit of both, these different categories require a different approach to development and especially documentation.

### Notebooks

Analysis pipelines are often developed inside real-time environments like Matlab, RStudio and Jupyter (is this wishful thinking again?). These tools generally allow for a limited form of literate programming in the form of notebooks. Yes, notebooks are great for rapid development and data exploration, but they come with a few downsides: they don’t support the noweb* syntax for decomposing codes into didactictally advantageous chunks, order of evaluation is generally not fixed, and they don’t work well with compiled languages. Jupyter Notebooks can be exported to Markdown, offering an easy transition from a “live” development stage to making the analysis ready for publication. RStudio offers a (almost) complete solution here with RMarkdown. In [past](/entangled-1744448f4b9f) and future blog posts, I argue that [Entangled](https://entangled.github.io) offers a more generic method for Literate Programming, ideal for writing reports and papers.

### Modelling

Where I think Literate Programming really shines, is in scientific modelling. When it comes to modelling, the code really is an extension of what you can do with mathematics. Writing a code helps you understand a system. The code is not just a translation of a model such that the computer can execute it. It is also a rigourous encoding of the model itself. We cannot mince words about what we’re doing: the code is absolute. This is exactly why we traditionally use equations to communicate the more exacting parts of our work.

I have worked out several examples that show how nicely equations and code mix when it comes to physical modelling:

* LiteratePT ([https://jhidding.github.io/literatept/](https://jhidding.github.io/literatept/)) is my translation of Kevin Beason’s SmallPT 100 lines of C++ global illumination ray-tracer into Rust. It was a fun puzzle to figure out how this code really works!
* Chaotic Pendulum ([https://jhidding.github.io/chaotic-pendulum/](https://jhidding.github.io/chaotic-pendulum/)) is a demonstration of [PureScript](http://purescript.org) to model a chaotic double pendulum.
* Adhesion model ([https://jhidding.github.io/adhesion-code/](https://jhidding.github.io/adhesion-code/)) part of my thesis work, this C++ code uses CGAL (https://cgal.org/) to compute large scale structure of the Universe.


## Some concerns, some chances

### Maintenance

Talking to computer scientists, the major critique of Literate Programming in general, is that it hurts the maintainability of the code. While the code is excellently documented, it can be very hard to navigate the functionality of the code from a software architecture point of view. This is where [Entangled](http://entangled.github.io) comes in. Entangled makes it possible to edit the code both from the original Markdown as well as the generated source code. We *can* have the best of both worlds. Debugging and maintenance is done as before in the traditional way. Refactoring code sometimes actually becomes easier, since code can be moved around by changing a few directions in the Markdown files.

### Hybrid styles

Every code contains boilerplate. It becomes a matter of taste how to deal with this in the context of Literate Programming. You don’t *need* to put everything in a literate style. It is perfectly possible to leave boilerplate code in normal source files.

### Layered programming

Literate programming techniques also offer new paradigms for development. One such paradigm is *layered programming*. In this approach you can structure a code not just in modules but also in layers, each layer being a separate chapter or section in the literate code, while the modules organize the code in a traditional manner for the compiler. This gives an extra option for seperation of concerns, the code now having a two-dimensional organisation structure. One immediate example that comes to mind is the building of a command line tool with multiple sub-commands. Each command shares the same structure but adds different functionality. In a more scientific setting, this could be a model with increasing levels of complexity. Each layer may touch upon every part of the code, adding functionality to many different modules.

## Conclusion

To conclude, Literate Programming can solve some real problems in the realm of Research Software Engineering and our means of publishing about software in science in general. Jupyter notebooks go a long way, but to my taste not far enough. The main reason for this is that scientists are not aware of the possibilities, while for computer scientists Literate Programming is something of a past station, of which the usefulness is debated.

It is high time that we identify areas where Literate Programming maybe has little added value, and others where it works great (there are plenty: did I mention writing tutorials?) Meanwhile, we need to improve our toolset (Entangled is not perfect yet), and develop a set of best practices when it comes to Literate Programming.

[*Read on in Part 2: The How, on different existing methods for Literate Programming, where I discuss Jupyter Notebooks, RMarkdown and Emacs Org-mode along with my own ideas for Entangled.*](/literate-programming-in-science-ed94dcc8f758)

*About the author: I’m (among other things) the developer of *[*Entangled, a Literate Programming framework and toolset*](https://entangled.github.io/)*. The main goal of this blog-post is to convince you that Literate Programming is a good idea in the first place.*
