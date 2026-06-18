---
layout: post
title: "FAIR Software at the 2019 eScience Symposium"
author: Ben van Werkhoven
published: true
source: medium
source_url: https://blog.esciencecenter.nl/fair-software-at-the-2019-escience-symposium-6117f310aa34
tags:
  - Citation
  - FAIR
  - Git
  - Open Source
  - Parallel Computing
  - RSE
---

SubscribeRemember me for faster sign in

An important part of giving proper attribution is to make your software citable and to cite others when you build upon their work. Stephan and others have developed the Citation File Format ([https://citation-file-format.github.io/](https://citation-file-format.github.io/)), a metadata format for both humans and machines. While these citation files can be read and manually written, there is also an entire toolbox available to support creation, validation, and conversion of CFF files, and automation is on the horizon, with build plugins and automated updates.

Stephan’s slides are available at:
[https://sdruskat.net/2019-11-21-nl-escience-symposium/](https://sdruskat.net/2019-11-21-nl-escience-symposium/)

## Pablo Rodríguez-Sánchez: How software development shaped the way I write science

![FAIR Software at the 2019 eScience Symposium](/assets/fair-software-at-the-2019-escience-sympo-80880d4e.jpg)
Pablo Rodríguez-Sánchez is working as an RSE at the Netherlands eScience Center. His talk was about how software development shaped the way he writes about his research.

With a great example of communication between Johannes Kepler and Galileo Galilei, Pablo confronted the audience with the fact that, despite great advances in the means of information and communication technology, some parts of scientific communication have not improved over the last four hundred years.

Pablo defines a scientific paper as a trustworthy and useful piece of encapsulated knowledge, and argues that there are actually many parallels between scientific papers and software. Both should adhere to the properties: consistency, reproducibility, being properly written, having references/dependencies, written by a team, and evolving over time. Instead of only using software development tools to write his paper, Pablo, inspired in what [other researchers](https://www.carlboettiger.info/2012/05/06/research-workflow.html) did before, takes it one step further and writes software packages whose output is the paper.

Using a combination of markdown and knitr, Pablo writes his papers as software packages in a way that all of the content of the paper, graphs and all can be fully reproduced by others who run the software.

Pablo’s slides are available at:
[https://pabrod.github.io/NLeSC_symp19-en.html#NLeSC_symp19](https://pabrod.github.io/NLeSC_symp19-en.html#NLeSC_symp19)

## Panel Discussion

Following the tree talks our speakers gathered on one side of the table for the panel discussion. While Ben was chairing the discussion, James was analyzing the questions that were submitted to mentimeter. The discussion involved questions such as:

* What does metadata mean in the context of software?
* How to make software dependencies FAIR as well?
* Should FAIR Software imply open source?
* Does FAIR/Open Software conflict with the university’s striving for spin-offs/patents/commercialization?
* The discussions are all quite abstract, what can we do concretely?

Anna-Lena, Stephan, Pablo and also several attendees of the session shared their insights, experiences, perspectives and some speculations, making it a lively and inspiring session.

With regard to the question what to do concretely, Pablo mentioned “that the main bottleneck for FAIR software is, still, much more basic: many researchers who would like to share their code with FAIRness just don’t know how to begin.” In an effort to provide some concrete pointers on where to begin with making software FAIR, the Netherlands eScience Center and DANS developed [fair-software.nl](http://fair-software.nl), which was officially launched later that day at the symposium.

If you would like to join the discussion on FAIR Software, the session’s organizers and the speakers of this session will be using the #fair-software on the [RSE slack server](http://ukrse.slack.com) to continue the discussion on FAIR Software.
