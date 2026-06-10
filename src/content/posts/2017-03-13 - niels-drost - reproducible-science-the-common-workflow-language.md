---
title: "Reproducible Science The Common Workflow Language"
date: 2017-03-13
author: Niels Drost
published: true
source: medium
tags:
  - uncategorized
---

[image]

Screenshot of the eWaterCycle forecast workflow, as produced by Cylc

Why standards are more important than software, and how these will help to make science more reproducible.

This blog is in part based on a [paper available as a preprint on figshare](https://doi.org/10.6084/m9.figshare.4746931.v1), as inspired by [this blog post](http://rolfhut.nl/2016/07/27/why-scientists-should-write-blogs-instead-of-articles/).

At the Netherlands eScience Center we cooperate with scientists from all disciplines on projects. [A lot of projects](https://www.esciencecenter.nl/projects). At any given time the 35 or so engineers of the eScience Center are involved in over 50 projects. This large portfolio of projects give us a unique view: we see common problems faced across disciplines.

One example of such a common problem is to manage workflows. More often than not, scientists will use software to do at least some part of their research. Invariably this involves multiple steps. First do some pre-processing on the data, then run some analysis or simulation, produce a plot, etc. Doing these steps by hand is tedious, error prone, and often hard to reproduce exactly. If you cannot reliably reproduce your result, is it still science?

Luckily, workflow management systems exist to help out. The problems faced are common across most disciplines: reliably and reproducibly run a number of processes in a row (or perhaps a slightly more complex graph). For some strange reason this does not lead to one or a handful of commonly used workflow systems. Instead, it leads to hundreds! See for example [this list](https://github.com/common-workflow-language/common-workflow-language/wiki/Existing-Workflow-systems). As many projects start from existing software using different workflow systems, choosing one or even a few will be impossible for us, and we may end up using a different workflow system for each project. This will, among others, greatly reduce the re-usability of the software we develop at the eScience Center.

### So, now what?

Instead of trying to find (or, worse, try to build!) the One True Workflow Management System, instead we plan to use standards for workflows. If we have a good format for describing a workflow that is portable across workflow systems, we should then be able to use whatever workflow system is best for the given problem, without having to re-write all the workflows every time.

Trying to choose a good workflow description language standard turned out to be much easier than choose between all the workflow systems. As far as we could find, there is only one: [The Common Workflow Language](http://www.commonwl.org/) (CWL). CWL is a [YAML](https://en.wikipedia.org/wiki/YAML) -based workflow specification language. It explicitly supports using containers ([Docker](https://www.docker.com/) for now, [open containers](https://www.opencontainers.org/) when available), and should make it easy to migrate workflows between workflow system if needed. To show how a CWL workflow typically looks, here is a simple CWL example, running `echo`, with a single string input:

```hs
cwlVersion: v1.0
class: CommandLineTool
baseCommand: echo
inputs:
  message:
    type: string
    inputBinding:
      position: 1
outputs: []
```

More elaborate examples become increasingly complex, but even a [complicated workflow](https://github.com/common-workflow-language/workflows/blob/master/workflows/lobSTR/lobSTR-workflow.cwl) is much easier to read then, say, an xml workflow representation, or some binary format.

Of course, a format itself does not help if it is then not also supported by workflow management systems. Some, like [Arvados](https://arvados.org/), and [Toil](https://github.com/BD2KGenomics/toil) fully support CWL already. Some, like the well known [Galaxy](https://galaxyproject.org/) and [Taverna](http://taverna.incubator.apache.org/) workflow engines, are currently working on implementing support. We hope and expect more will follow. For example, we are hoping Europe’s multi-billion [European Open Science Cloud](http://ec.europa.eu/research/openscience/index.cfm?pg=open-science-cloud%29) will support CWL explicitly. We ourselves plan to add CWL support to [Xenon](http://nlesc.github.io/Xenon/), our middleware abstraction library.

### eScience Center Workflow Roadmap

[image]

Netherlands eScience Center Workflow Roadmap, with a CWL based workflow with support for containers in the middle.

With CWL as the centerpiece of our workflow world, we can now start to envision a small ecosystem around it. We will need different interfaces to create and run workflows. Some projects are better suited to using a *graphical user interface* (GUI) to click together a workflow. Some will need a *scripting interface*, a notebook like environment to create workflows using code. Sometimes a scientist does not need to see the workflow at all, and we can hide it completely behind an *application frontend*, for example a website that can run some analysis for a scientist, where the analysis itself is then implemented as a CWL workflow.

After having created or submitted a workflow, we also need some way to actually run this workflow. We should take care to select the best implementation for the target infrastructure. For a laptop you want the simplest possible system and get started quickly. For servers, clusters, supercomputers, and clouds we need increasingly complex implementations, perhaps tailor-made for a single platform.

To make the impact of our work as large as possible, we will contribute any generic software or tools we build back to the community. We are already using CWL in a few projects, and hope to increase this number greatly in the course of 2017. Stay tuned for updates here, and in the meantime pay a visit to the [CWL website](http://www.commonwl.org/). We would love to hear your experiences with CWL!