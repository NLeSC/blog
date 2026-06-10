---
layout: post
title: "Unweaving legacy code using Entangled"
date: 2022-11-10
author: Johan Hidding
published: true
source: medium
source_url: https://blog.esciencecenter.nl/unweaving-legacy-code-using-entangled-2e6380a88b2f
tags:
  - C++
  - Git
  - Nix
  - Physics
---

][Johan Hidding]·Nov 10, 2022

SubscribeRemember me for faster sign in

Depending on the size of the project you may want to disentangle just a few essential files in this manner, or perhaps you prefer to deconstruct the entire code. It doesn’t matter. The resulting Markdown files can be converted for online reading using any of your favourite tools: Pandoc, MkDocs, Jekyll, you name it.

### Examples

This all doesn’t mean much without a decent example, so let's see a couple of them.

The first example we’ll look at is one that I picked from Rosetta Code. It’s an implementation of the game [Snake in Bash](https://rosettacode.org/wiki/Snake#UNIX_Shell). Since Bash can be quite a dense language to read, we may learn a lot by destructuring even this tiny program.

Legacy code, looking readable thanks to EntangledAs far as Bash scripts go, this is reasonably clean code, so not your worst nightmare. I encourage you to take a look at the full result at [jhidding.github.io/shell-snake](https://jhidding.github.io/shell-snake). As you may see, I have split the program into three parts: setup, main loop, and post-mortem. If I were more interested, I could further pull apart some expressions, building a deeper hierarchy. If I’m unhappy with some part, I can swap out some code in a well-documented manner.

The second example is a bit bigger. Also, this time I’ve translated the source code from C++ to Rust. There is a 100-sloc C++ code for ray tracing a set of spheres by Kevin Beason, called [SmallPT](https://www.kevinbeason.com/smallpt/) (it is quite famous in some circles). While the original is focused on getting as much as possible into a hundred lines of code, I wanted a bit more understanding. A ray tracer computes an image by doing a physical simulation of millions of photons in a given scene.

A ray-traced rendering of a few spheres.The full demo can be found here: [jhidding.github.io/literatept](https://jhidding.github.io/literatept/). I made some algorithmic changes to the original that are well documented. See for instance the [section on path tracing](https://jhidding.github.io/literatept/#path-tracing). In another instance, I tried to understand the underlying physics of [reflecting rays in the transparent sphere](https://jhidding.github.io/literatept/#partial-reflection). There I was able to underpin the code with equations and references.

> 

Does this sound interesting to you? Then you may like to get Entangled at [https://entangled.github.io/](https://entangled.github.io/).

Also read my other blog posts about [Literate Programming in Science](/literate-programming-in-science-1669094541a7).
