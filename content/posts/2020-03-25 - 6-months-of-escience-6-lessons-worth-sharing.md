---
layout: post
title: "6 months of eScience: 6 lessons worth sharing"
author: Peter Kalverla
published: true
source: medium
source_url: https://blog.esciencecenter.nl/6-months-of-escience-6-lessons-worth-sharing-4fc925a1e376
tags:
  - Citation
  - Climate
  - Code Review
  - Collaboration
  - Community
  - FAIR
---

## On the road towards FAIR and reproducible science.

Ever find yourself hesitating to send that important email, cursor hovering over the send button? For me, it’s grown into a curious habit. I particularly recall the time that I had to submit a code sample for my job application at the [eScience Center](https://www.esciencecenter.nl/). Sharing my code felt like publishing my diary. (If you feel the same, be sure to read the part about linters).

My strategy for the job interview was simple: I was frankly going to admit that my code wasn’t great. I would explain why I thought this was a problem, not just for me, but for science as a whole. And then beg to be hired so I could contribute to the solution. *It was super effective.*

So what is this problem that turned a scientist into a research software engineer? It has everything to do with the digital competence required to work with large and complex models and data sets, in a manner consistent with the principles of FAIR and open science (as illustrated below). As a PhD student, I never quite felt properly equipped to effectively wield the tools and technologies that are available to this effect.

![](/assets/0_bqZuEZ4aKevZpJVu-b09ef874.jpg)

This image was created by Scriberia for The Turing Way community and is used under a CC-BY licence.

That’s why I applied at the eScience Center. Because being surrounded by experts is the easiest way to become an expert yourself. And because I wanted this expertise to become widespread in the academic world. Today, six months into my eScience adventure, I want to share some of the lessons I’ve learned with my scientific peers.

I’ll start with something I found quite surprising: treating research code as ‘software’. I’ll explain how that can help to think about re-use and reproducibility. Sharing code is an essential, and therefore I continue with a number of lessons I learned about sharing software. The last two lessons are about reuse of existing software and a community of Research Software Engineers that I discovered.

### Research code vs scientific software

Most of my everyday research activities centered around data analysis, which typically consists of a long exploratory phase and then converges towards something publishable. I never thought of the selected fragments of code, tailored to my publications, as (research) software. I still think this is a bit far-fetched, but I *do* see now that this *scientific software perspective* completely changes the way I think of my code in retrospect.

What mostly set ‘my code’ apart from ‘software’ was that it was tailored to my use case, whereas software would be more generally applicable. It felt as a humble perspective at the time, but come to think of it, perhaps the term *downplay* better captures my reluctance to think of my code as something bigger than my own scribbles. It is an attitude that hampers re-use and, consequently, progress.

I think everyone can agree that sharing research code, even if it’s just for reproducibility, can be considered good practice. So why aren’t we doing it? I think there are three\* main obstacles:

1. We’re insecure about our research code
2. We’re willing to share, but don’t know how
3. A lack of time, priority or incentive

The good news is that all these issues can easily be addressed if we stop thinking of (‘just my’) code and start thinking more in terms of research software. Software developers ([lazy as they are](https://www.techwell.com/techwell-insights/2013/12/why-best-programmers-are-lazy-and-act-dumb)) have come up with all kinds of tools and tricks and practices and whatnot to facilitate and automate issues like quality control and collaboration.

\*I’m assuming you’re *willing* to share the code here. If you want to keep it to yourself, there are options, but we should have a good discussion about that…

### Improve your code using linters

For example, I wish I had known about ‘linters’ before I submitted my code sample for the job application.

Linters are little tools that will check whether your code is up to standard. There are many linters for various programming languages that focus on different sets of standards. Many decent code editors offer plugins that provide suggestions as you go. The image below shows an example for Python and [Atom](https://atom.io/).

![](/assets/0_ec0KLCI8_avDgIRw-f4562f4d.webp)

Example view from https://atom.io/packages/linter-python-pep257

Here, [pep257](https://www.python.org/dev/peps/pep-0257/) refers to style guidelines for Python documentation. Flake8 combines several common Python quality checks, including [pep8](https://www.python.org/dev/peps/pep-0008/) adherence. For those who like to work with Jupyter notebooks: there are several plugins to check or even [auto-format](https://jupyterlab-code-formatter.readthedocs.io/en/latest/index.html) your code. These tools are great to help you improve your code formatting and learn about quality standards.

### Use project templates to organize your work

Research projects usually consist of more than code, and you don’t want your beautiful code to be undermined by a messy project structure. But organizing your work can be a challenge. I for one have wished for guidance more than once.

Luckily, more people are facing this problem, and some have come up with solutions. One of those solutions is [Cookiecutter](https://cookiecutter.readthedocs.io/en/1.7.0/index.html), ‘a tool for creating projects from templates’. There are templates for many kinds of projects, so you can choose one that suits your needs, for example [Reproducible Science](https://cookiecutter.readthedocs.io/en/1.7.0/README.html#reproducible-science). For the more experienced Python programmers, the eScience Center developed a [template for Python packages](https://github.com/NLeSC/python-template).

The tool automatically sets up a directory structure for your project. It also creates things like a license and a README file. These will be useful when you’re ready to share your project. An important advantage of using a standardized project structure is that it will make it easier for others to navigate your project.

### Sharing is easy, version control is great

Once there’s no more need to be shy about our projects, let’s talk about *how* to share it. Software repositories like GitHub (or GitLab, or the like) are the way to go here. During my PhD I was familiar with the basics of version control and GitHub, but I found it quite cumbersome as I was just working on it alone. Therefore, I never made it to all the nice features.

For example, GitHub offers a great workflow for code review. You can configure it such that you’re code must always be checked by at least one other person. You can also set it up to perform all kinds of checks and tests. You can add various [automated quality badges](https://www.freecodecamp.org/news/how-to-use-badges-to-stop-feeling-like-a-noob-d4e6600d37d2/). A lot is happening around notebooks as well ([example](https://github.com/reviewNB/treon)).

![](/assets/0_eRGe6Sr1ihmPTH92-aecc852c.png)

[https://xkcd.com/1296/](https://xkcd.com/1296/)

By writing nice commit messages, it becomes easy to show all the hard work you’ve been doing to e.g. your supervisor. Tangible output is nice! And why not use tags or releases for making a stable version for the reviewers of your publication? And then another release when the paper is accepted.

The problem here is that, although this all sounds very nice, it requires collaboration and therefore commitment from a larger entity than yourself. It’s probably best organized at the level of a chair group/research unit. And that brings me to the last obstacle I listed above: ‘it all sounds very nice, but we simply don’t have the time…’

### Proper recognition for research code through software citations

[Software is citeable](https://the-turing-way.netlify.com/credit/credit.html). It is not (yet) commonplace, but think about how this can change the everyday life of an academic. Imagine my PhD supervisor valued my code just as much as he valued my research papers. Time spent on code would suddenly have a purpose. All those hours of endless debugging would have a clear, visible, *citeable* output product. Impact factor over 9000.

My group (at the time) could have owned and maintained a public code base, and encouraged and assisted every employee to contribute. With a little generalization effort, some pieces of code might be suitable for reuse and could eventually become their own little tools in their own little repositories. Other repos could host (sets of) notebooks illustrating the analysis underlying corresponding journal publications.

Of course, if you release something that you hope will have an impact, you want to have some sort of quality assurance. Therefore, my group would start encouraging us to test and provide feedback on each other’s code. Collaboration and exchange within the research group would drastically increase.

How is that possible when each PhD student works on ‘his own’ project? First of all, because it pays. To stop reinventing the wheel will actually save a lot time. But more importantly: perhaps that status quo is also up for revision.

> The proposition of one of my peers that ‘ *Becoming an independent scientist is often mistaken for working alone* ’ could finally become a thing of the past.

Okay, I seem to be going astray here. But I *do* think this is the direction in which we’re headed. After [open access publications](https://www.openaccess.nl/en/what-is-open-access) and [FAIR data](https://www.force11.org/group/fairgroup/fairprinciples), software is the [next big thing](https://content.iospress.com/articles/data-science/ds190026) in open science. The eScience Center is [actively involved](https://www.esciencecenter.nl/news/netherlands-escience-center-and-dans-launch-new-fair-software-website-2/) in making this transformation possible.

### Boarding an existing project

The last lesson I want to share is probably the most important one. At this point, I hope you’re all enthusiastic to start sharing your code. But before you go, please consider the image below.

![](/assets/0_xfyQzwHuHr3xQSjD-498ccc5c.png)

[https://xkcd.com/927/](https://xkcd.com/927/)

The notion that you’d better use an existing standard, even if it doesn’t exactly fit your use case, probably applies even more to software than to usb-cables. Not only can you benefit from what’s already there, but more importantly, you’ll get involved with an existing community.

If you build something from scratch, the impact is null unless you convince many potential users to abandon their own workflow in favor of yours. Contributing to an existing project is much easier, and you’ll immediately create an impact for all its users.

And that’s not all. Boarding an existing project means more collaboration from which you can benefit. And you’ll have less to worry about the maintenance and sustainability of your code.

One of the projects I get to contribute to at the eScience Center is [ESMValTool](https://esmvaltool.readthedocs.io/en/latest/introduction.html). This tool consists of two main repositories: one of them contains the actual ‘machinery’ to perform robust and efficient climate data analysis. The other repository is mostly a collection of ‘recipes’. I think this is a prime example of how a large community of climate scientists (re-)use a common code base to perform a broad variety of analyses that can easily be reproduced.

### A career path for Research Software Engineers

When I applied at the eScience center, I knew I wanted to contribute to ‘better’ science or improved scientific practice. But I wasn’t sure exactly how. Already after six months, I’ve learned a lot of tricks and obtained many new insights.

This video nicely illustrates what reproducible research could look like.

Sometimes I wish I could go back to the start of my PhD, to start fresh and do everything ‘the proper way’. I now have a much clearer vision on how FAIR and open science can actually be implemented in my field, and I could put that into practice.

But I’ve also learned about myself. I’ve discovered a community of like-minded people that identify as [Research Software Engineers](https://nl-rse.org/). In a [very well-written report](https://zenodo.org/record/495360#.XnUY5FHQg5l), the UK-RSE community explains how this community has sprouted. They also write:

> A career path for Research Software Engineers would increase access to skills that are vital to modern research.

I couldn’t agree more. For all my enthusiasm about my work, I understand that not all scientists feel the same. That’s why we need each other. RSEs can look after the software so others can focus on the science. I’ll be the RSE.

### Thanks for reading!

I hope I’ve inspired you to pursue the path of FAIR and reproducible science. If you want to read more, there are many excellent resources out there. I highly recommend the [Turing Way](http://the-turing-way.netlify.com/). And don’t hesitate to get in touch:-).

You can reach me via [email](mailto:p.kalverla@esciencecenter.nl) or [LinkedIn](https://www.linkedin.com/in/peter9192/).
