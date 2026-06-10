---
layout: post
title: "Researchers are not born engineers — why are they expected to know how to code?"
date: 2023-04-20
author: Lieke de Boer
published: true
source: medium
source_url: https://blog.esciencecenter.nl/researchers-are-not-born-engineers-why-are-they-expected-to-know-how-to-code-1eeb5c3d03c0
tags:
  - FAIR
  - Git
  - R
  - RSE
  - Reproducibility
  - Research Software
---

Subscribe*Remember me for faster sign in

I refuse to be too hard on my past self. It’s understandable that researchers, who juggle multiple projects and deadlines, do not have the time, energy or resources to become coding experts. But research is increasingly reliant on technology, so it’s important that researchers have access to the support and education they need to develop and use high-quality code. Learning good coding practices (or having access to those who know them) not only improves the reproducibility and reliability of research, but it adds to the fun of coding, saves time and prevents future headaches.

![Researchers are not born engineers — why are they expected to know how to code?](/assets/researchers-are-not-born-engineers-why-a-448a811f.jpg)
Photo by [Clément Hélardot](https://unsplash.com/@clemhlrdt?utm_source=medium&amp;utm_medium=referral) on [Unsplash](https://unsplash.com/?utm_source=medium&amp;utm_medium=referral)When I sat in on a [course on good coding practices](https://www.esciencecenter.nl/event/best-practices-in-research-software-development-coderefinery-3/) at the eScience Center two years ago, I first realized why my own code had been bad: I did not know about good practices. I learned how to properly [collaborate on projects via GitHub](https://coderefinery.github.io/git-collaborative/), which was eye-opening. The fact that you could use branches to work together on solutions to different problems was completely novel to me. The fact that you could write tests to make sure you would realize if part of your code failed was mind-blowing. Also, making my code modular, so that scripts would not contain upwards of 2000 lines, made the entire project so much easier to read and understand. Writing proper help functions was something I used to feel was not that important, because I never wanted anyone to look at my code. Now, documentation is something I strongly believe in.

I am currently farther away from being a researcher in my daily job than ever, but in this job I did write an R package, together with my eScience Center colleague [Barbara Vreede](https://github.com/bvreede). Barbara is an amazing research software engineer who guided me through the process. The package is called [traininginfrastructure*](https://github.com/esciencecenter-digital-skills/training-infrastructure)and creates all necessary communication documents and folders for the workshops we run at the eScience Center. I’m very happy to say the package works and is used by my colleagues. It saves engineers who teach time on repetitive administrative duties and prevents mistakes in creating communication (no more copy-pasting emails with typos).

By no means did I become a perfect research software engineer. But I realized how much I had learned when recently, a researcher contacted me to ask if she could use the same analysis that I had used during a project for my PhD. I reluctantly gave her access to the old private GitHub repo with my project’s scripts and had to dig some non-version controlled other scripts out of my email inbox. Being confronted with that code was sobering. One day, I may try to clean it up so that they are usable for more researchers in the future. But it made one wider point very clear to me: my work at the eScience Center really serves a purpose. It can bring people like me, researchers who write scripts that work, but that they hate, to write code that they can be proud of and freely share with those that may need it. It can save all of us time and effort. And what I learned here really did not take that much time: a 1-week course and some quality guidance in building a fairly simple R package.

Some of those who collaborate with us on projects at the eScience Center find it difficult to accept our engineers’ wishes that they use the same practices we do in research software projects. I now understand that using good practices is the only way to build quality tools for research. If you are ever in a situation where someone forces you, you may end up gratefully learning about (and putting into practice!) version control, collaborative software engineering, testing, and documentation. It can be painful in the beginning, but it will make your and others’ life so much easier in the future, and your software a worthy research output on your CV.

If you want to learn how to write quality code for research, check out [our free workshops](https://www.esciencecenter.nl/events/?f=workshops)! You can also apply for [our calls](https://www.esciencecenter.nl/calls-for-proposals/), or sign up to our [newsletter](http://eepurl.com/dtjzwP) to stay tuned.
