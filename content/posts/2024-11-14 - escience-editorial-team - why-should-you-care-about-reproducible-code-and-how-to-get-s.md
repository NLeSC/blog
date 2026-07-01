---
layout: post
title: "Why should you care about reproducible code — and how to get started?"
date: 2024-11-14
author: eScience Editorial Team
published: true
source: medium
source_url: https://blog.esciencecenter.nl/why-should-you-care-about-reproducible-code-and-how-to-get-started-1e944bb920a4
tags:
  - Bayesian
  - Biology
  - Community
  - Containers
  - Environment
  - Git
---

## On 23 April 2024, the first ‘[National Research Software Day](https://www.esciencecenter.nl/news/national-research-software-day-recap/)’ took place in Hilversum, the Netherlands. During the unconference part of the program, [Eduard Klapwijk](https://www.universiteitleiden.nl/medewerkers/eduard-klapwijk#tab-1) ran the session about the importance of reproducible code.

3

![Why should you care about reproducible code — and how to get started?](/assets/why-should-you-care-about-reproducible-c-984b86bd.jpeg)
Credit: [The Turing Way](https://the-turing-way.netlify.app/_images/reproducibility.jpg)*Authors: Diana I. Bocancea¹, Daniela Gawehns², Julian Lopez Gordillo³, Sam Langton¹, Katinka Rus¹, Sally Hogenboom⁴, Iris Spruit⁵, Eduard Klapwijk⁶*

Despite the increased awareness regarding reproducibility in recent years, most research results are not [computationally reproducible](https://book.the-turing-way.org/reproducible-research/overview/overview-definitions): they cannot be independently reproduced. The main reason for this is that in most cases, data and code are not shared publicly. But even when a researcher openly shares their data and code with the public, reviewers or research colleagues, their findings can rarely be reproduced in their entirety. Perhaps the code cannot be executed, only parts of the results are generated, or perhaps the results produced are totally different from the published study. Reproducibility can even be a challenge internally. As any programmer will know, just because your code runs perfectly today, it does not mean it will run perfectly in five years’ time (or even five days’ time!).

But why does writing reproducible code even matter, and how might you as a researcher get started on this journey toward reproducible research?

## *Benefits of working reproducibly*

One reason is that it will make your life as a researcher easier! Many of the components that make a piece of research reproducible — well-documented, clearly written code, containerised environments, properly organized data — are also things that save a lot of time. These activities ensure that when you return to code six months later, the scripts still run, and you don’t have to spend three days debugging them. It also means that your code can be shared and reused by your colleagues, saving them time, and giving you credit (e.g., authorship) in the process. There are other reasons too, including reputational benefits and advantages during peer review. You can read more about ‘selfish’ reasons to make your research reproducible [here](https://genomebiology.biomedcentral.com/articles/10.1186/s13059-015-0850-7%22%20%EF%B7%9FHYPERLINK%20%22https://doi.org/10.1186/s13059-015-0850-7).

What about the scientific community? We are currently in a situation where a large proportion of research is not reproducible. This situation threatens the integrity of scientific research, weakens our evidence base, and ultimately might lessen public trust in science. The main method for scrutinising and sharing scientific results — peer-reviewed journals — are slowly adapting to this realisation. Increasingly, researchers are encouraged, if not expected, to provide their data, code and other materials used alongside the publication itself. In time, we could see reproducibility move from being an optional bonus to becoming a mandatory part of the research (and publication) process. Adapting to this change early will bring you all the benefits noted above (e.g., timesaving, code reuse) but will also prepare you for the future.

## *Reproducible tools as a contribution to science*

On that note, the changing perspective on the importance of reproducibility is bringing new career paths with it. For example, beyond the fundamental tools that enable reproducible research (such as git for version control), other higher-level tools are appearing to address certain challenges particular to some scientific domains. Usually, they are aimed at solving well-known problems for researchers from a certain field, problems not well-known outside of one niche. They might revolve around workflow management and experiment design or standardisation of certain procedures within the community. In many cases, the developers behind those software tools and resources are… the researchers themselves. They might have struggled with these issues in their own research and decided to take up the task of developing the tools that they wished they had (for example, extensive Python-based processing pipelines such as [fmriprep](https://doi.org/10.1038/s41592-018-0235-4) in the neuroimaging field, and thousands of R packages ranging from complex statistical modelling packages such as [brms](https://doi.org/10.18637/jss.v080.i01) for Bayesian regression to packages to help you formatting manuscripts such as [papaja](https://cran.r-project.org/web/packages/papaja/index.html)). In doing so, they shifted their focus from their original subject domain to the mission of making research within that domain reproducible. This typically takes the form of developing the software libraries that make that possible and integrating them with the standard software used within the domain.

The whole scientific community can benefit from such tools! Newer research can be built on top of them, without the need to solve common reproducibility issues from scratch. These software developments can be just as valuable a contribution to the research domain as other research findings, and as such, they should be recognised accordingly. And just like it is possible to publish your research findings, it should be possible to publish your code contributions when they are significant enough. A good example of this idea put into practice is the [Journal of Open Source Sofware](https://joss.theoj.org/) (JOSS), where the submitted code takes the main stage in the review process (as opposed to be required as “supplementary material”). Initiatives like JOSS showcase developments around reproducible research as a meaningful contribution to science and a viable development path, both of which are powerful incentives for researchers to get interested in the topic.

In time, with all these smaller and bigger changes, scientific research can become more trustworthy, more reliable, and in turn, more impactful.

## How to get started*

The inevitable question that follows is then: how to get started with reproducibility? One answer is training. Luckily, there are a lot of initiatives for training that will help you to get started, both nationally and internationally. For example, a lot of institutions organize Software and Data [Carpentries](https://carpentries.org/) that offer foundational coding and data science skills.

One way senior academics can make a difference — as group leaders, supervisors, and grant reviewers — is to give (junior) colleagues the time and incentives to value and practice reproducibility. For instance, supervisors could have all PhD students replicate and extend an existing analysis as part of their initial research. The process of reproducing an existing work will familiarize the student with the common challenges that come with doing good science. The work of reproducing someone else’s work might entail finding and understanding a certain dataset (sometimes difficult to even get access to), as well as the software (e.g. scripts or packages) that was used to produce the results. Running the previous analysis, often on a different computer and at a later time (when software dependencies have likely changed) would check the computational reproducibility of the previous work, and in doing so, be a valuable learning experience for the student.

Group leaders benefit from reproducible workflows as it prevents (PhD) students from re-writing the same piece of software again and again. While learning the ropes is important for any junior scholar, it is not very efficient if every new generation of students re-writes code for basic operations or frequently used analysis methods.

In addition to the benefits of an academic career, researchers themselves also increase their employability outside of academia by learning digital skills (such as version control or programming reusable pieces of code) that are valued in many different (industry) jobs.

In modern science, computational methods are the norm in almost every discipline. Yet attempts at reproducibility are almost always unsuccessful due to missing materials and/or lack of skills. Part of this problem can be mitigated by learning how to produce reproducible code: how to write documentation, perform version control, and manage packages. Doing so will benefit you as a researcher, but also your colleagues, and the wider scientific community, because your (coding) efforts will become reusable. Increasing the use of reproducible workflows is in the interest of many stakeholders in academia — increasing the reproducibility of research is key for a broader change in how we do science.

Footnotes

* [Amsterdam UMC](https://www.amc.nl/web/home.htm)
* [University Medical Center Groningen](https://www.umcg.nl/)
* [Naturalis Biodiversity Center](https://www.naturalis.nl/en)
* [Open Universiteit](https://www.ou.nl/en/home)
* [Universiteit Leiden](https://www.universiteitleiden.nl/en)
* [Erasmus School of Social and Behavioural Sciences](https://www.eur.nl/en/essb)
