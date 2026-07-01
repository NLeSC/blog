---
layout: post
title: "Be like Jurriaan"
author: Patrick Bos
published: true
source: medium
source_url: https://blog.esciencecenter.nl/be-like-jurriaan-ac9e8926d1b3
tags:
  - Environment
  - Git
  - Open Source
  - Python
  - RSE
  - Workflows
---

## Write copy-pasteable READMEs for developers

The main message of this post is short:

Thank you,

[Jurriaan H. Spaaks](https://medium.com/u/fd96a2a5f9bc?source=post_page---user_mention--ac9e8926d1b3---------------------------------------)

, for including developer’s READMEs in the [zenodraft](https://github.com/zenodraft/zenodraft) and the [zenodraft GitHub action](https://github.com/zenodraft/action) repos!

*(Zenodraft automates uploading releases of your repository to Zenodo. This story applies to any similar tool.)*

In particular, having copy-pasteable commands ready to get going saved my week. Without them, I would have dropped any hope of [fixing the issues I had running a CI workflow](https://github.com/NLeSC/guide/pull/443) … or worse, I would have had to rebuild something like zenodraft from scratch!

![](/assets/1_SP0juQAauTLoEAw6Scb8RQ-1a7e6e06.png)

It doesn’t have to be long and complicated. Just having those commands ready to copy is all I need.

Zenodraft is written in TypeScript, which is a foreign language to me. I’m unfamiliar with the tools necessary to make it work. The [developer’s README](https://github.com/zenodraft/action/blob/main/README.dev.md) file exactly fixed that issue, allowing me, a TypeScript-noob (but otherwise experienced programmer), to dive in and fix my problems within a few hours of building up the courage to even try. I was even able to contribute a [PR](https://github.com/zenodraft/action/pull/31), my first one in a TypeScript project!

In the world of open source (research) software, where ambitions are high and budgets are low, it turns out that such documentation can mean the difference between life and death for the software.

If you are the owner of a package and expect to be unavailable to maintain your code, the best thing you can do is to enable the random passer-by to independently fix their own problems.

Be like Jurriaan. Write developer’s READMEs!

![](/assets/0_xNfeV7xNnIrP31fx-c6c80d22.jpg)

If you had asked me a week ago whether such documentation is necessary I would have shrugged. This experience made me change my mind. A lazy, clutter-averse and/or “minimalist” person could argue that most development ecosystem tools are well documented on their own, and technically they might even be right (although rants on how soul-crushingly horrible Python’s or Javascript’s developers’ ecosystems are aren’t hard to find). Why duplicate efforts?

Just ask yourself: would you take the effort of reading up on the current state of such an ecosystem just to make random-tool-on-GitHub do what you want? Even if it’s just a minor tweak in the code, the effort necessary to get that tweak into production can easily put developers off.

So, just copy-paste the minimal commands you need to get a working development environment set up into a README file. You probably have these commands set up in your CI build job already, so it’s really not that much effort. And you might gain a new contributor…
