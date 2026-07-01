---
layout: post
title: "portable hpc workflows with snakemake and xenon"
author: Jurriaan H. Spaaks
published: true
source: medium
tags:
  - C++
  - Containers
  - Docker
  - Environment
  - Git
  - Parallel Computing
---

### Migrate your scientific workflows to different remote machines in minutes instead of days

![](./1_Dkns3eBVvWMJHsR08BZaCQ-a2000236.jpeg)

Image courtesy of WallpaperUP

Scientific workflows are often coupled to the computer systems for which they were developed. This can be a problem when you want to migrate a workflow to a different system that has better performance, higher availability, is cheaper to use, or stores data that are difficult to move around etc.

In this blog, we describe a solution we use in the life science domain to run an analysis of genetic variations in genome sequencing data. For this, we use 4 different algorithms, each implemented in a separate command-line tool.

Each of these tools requires its own configuration steps such as setting up input and output directories and specifying how many threads to use for parallel execution. Post-processing steps are also needed, to aggregate the results from each tool.

## Snakemake ties it all together

To tie all the tools in the analysis together, we use the workflow tool [Snakemake](https://snakemake.readthedocs.io/en/stable/). Snakemake makes it relatively easy to write down the steps that make up an analysis in a “recipe”. We can including things like concurrency (“ *Run this part of the analysis at the same time as this other part* ”), and dependencies (“ *Don’t start this part of the analysis until these other parts have completed successfully* ”).

## Using Conda environments

The command-line tools included in our workflow are written in a variety of programming languages (C, C++, Python, Java, and R), and each need their own set of software dependencies. To prevent the tools from interfering with one another, we use the [Conda](https://conda.io/docs/) package and environment manager. Conda installs the required software into a separate environment, preventing interference and making the execution of a software less dependent on how the host system is set up.

Snakemake supports both Conda environments, or containerized environments such as [Docker](https://www.docker.com/) or [Singularity](https://www.sylabs.io/docs/). For our purposes, there is no added benefit of using containers, so we just use Conda environments.

With this setup, we can run all tools and aggregate and analyze the results.

## Portability problems

Initially, we used a compute cluster based on the Grid Engine scheduler to allocate resources. To submit our workflow to this machine, we can use Snakemake’s `--cluster` option:

`snakemake --use-conda --cluster "${SUBMIT_CMD}"`

Through this option, you can specify things like which submit command to use, which job submission queue to submit to, the number of process needed per node, how much memory is needed, etc. The following command submits the Snakemake workflow on the Grid Engine cluster:

The submit command needed by Snakemake to submit to a compute cluster using the Grid Engine scheduler.

While this lets us specify how our workflow is executed on the remote system, it does have the undesired side effect of making it specific to one type of scheduler or compute cluster. This soon became a problem for us when we started making plans to use a different compute cluster, whose resources were allocated using [Slurm](https://slurm.schedmd.com/) instead of Grid Engine. For Slurm a different submit command is needed:

The submit command needed by Snakemake to submit to a compute cluster using the Slurm scheduler.

Although the information contained in both commands is the same, the exact command and options are very different. Figuring this out for each new compute cluster can be quite a hassle and makes it hard to share workflows with other researchers.

## Xenon to the rescue

To improve the portability of our workflow, we use the [Xenon](https://github.com/NLeSC/Xenon) command-line tool that hides the differences between Grid Engine, Slurm, and [Torque](http://www.adaptivecomputing.com/products/torque/) from the user. Using Xenon, we can provide a single submit command that will be translated on the fly to the exact command expected by the different schedulers. For example:

By simply changing the value of SCHEDULER, this submit command works on both Grid Engine and Slurm clusters — everything else stays the same.

Switching from an Grid Engine system to a Slurm system is now as simple as replacing

`SCHEDULER=gridengine`

by

`SCHEDULER=slurm`

while the rest of the submit command can remain exactly as is. This approach makes it much easier to port our workflow to other compute clusters and to share them with our fellow researchers.

## Conclusion

To summarize, our setup provides separation of concerns:

1. use the Snakemake workflow system to describe the steps that make up an analysis;
2. use Conda environments or containers for installing the tools needed by the workflow steps and to stop them interfering with each other or with the host system’s setup;
3. use Xenon to make the workflow easily portable to HPC systems that use different schedulers for resource allocation.

If you’re interested in learning more about how to use Xenon, its command line interface, or how to use it from a variety of programming languages, [Xenon’s README on GitHub](https://github.com/NLeSC/Xenon/blob/master/README.md) is probably your best starting point. Happy porting!
