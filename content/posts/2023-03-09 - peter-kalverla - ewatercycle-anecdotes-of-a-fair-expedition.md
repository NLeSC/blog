---
layout: post
title: "eWaterCycle: Anecdotes of a FAIR expedition"
date: 2023-03-09
author: Peter Kalverla
published: true
source: medium
source_url: https://blog.esciencecenter.nl/ewatercycle-anecdotes-of-a-fair-expedition-274d1e8e3bba
tags:
  - Environment
  - FAIR
  - Workflows
---

The journey of a group of hydrologists and research software engineers after FAIRer research software.

## A grand challenge

This story begins in April, 2019. A group of hydrologists and research software engineers had [gathered in Leiden](https://www.lorentzcenter.nl/fair-hydrological-models-automated-comparisons-using-escience-tools.html) to discuss one of the grand challenges in contemporary research: *how to make our scientific endeavors reproducible and easier to reuse?*

The problem was obvious. Hydrological modeling studies had grown complex. So complex, in fact, that it was virtually impossible to reproduce them from scratch. The only way to keep up was to maintain your own virtual research environment, with your own model, your own copy of input data, and your own computational facilities.

![](/assets/1_VVhO3G5VtX4HqlFP6LaJvQ-1f1f952a.png)

An unFAIR landscape: silo structure prohibits the exchange of models and their input/output data

> Side note: a characteristic figure in hydrological modeling studies is a hydrograph. This chart displays river discharge over time. To produce it, you simulate how the precipitation over a certain region propagates through the landscape: seeping into the soils, collecting into rivers, and flowing towards the sea. Hydrographs provide insight in the hydrology of a certain area and can serve to evaluate (and compare) the quality of your simulations.

Despite the recent push towards more openly sharing datasets and model source code, this had minimal effect. Even with access to the source code, it remained difficult to compile each others’ models. And because modeling choices had diverged, it was not straightforward to swap out components or input datasets, or simply compare outputs of different models. Something had to change.

A few years earlier, a set of [“FAIR” principles](https://www.go-fair.org/fair-principles/) had been formulated with the ultimate goal of making scientific datasets *Findable, Accessible, Interoperable, and Reusable*. Intuitively, these concepts could be applied to other aspects of the research process as well. It was the right idea at the right time. Thus [the workshop in Leiden](https://www.lorentzcenter.nl/fair-hydrological-models-automated-comparisons-using-escience-tools.html) marked the start of our FAIR expedition.

## FAIR models

The first uncharted territory was that of models, the core substance of every modeling study. Hydrological models come in many flavours. They differ in the physical processes they include or in the way in which they describe these processes mathematically. They use different methods to discretize the equations, and different programming languages to implement them. How could such diversity ever be more FAIR?

We found there was an interesting initiative from Boulder, Colorado: the [*Basic Model Interface*](https://csdms.colorado.edu/wiki/BMI) (BMI). Even if models work differently under the hood, we could standardize the way users interact with them. Such a familiar interface would make it easier to reuse and exchange each others’ models.

At that time, this standard had not been broadly embraced. But we were ambitious and we wanted to set an example of FAIR scientific conduct. So we decided to complement the participating models with a BMI. To top it off, we packaged them in Docker containers and made software to use them in a Python scripting environment.

![](/assets/1_CO5kblmYtR5qGYAcvuIbHg-3a474f0c.png)

Different models, but to the user they look the same. We decided to embrace Basic Model Interface (BMI).

## FAIR forcing data

Next, we entered the realm of forcing data: the weather that’s fed into the models. Here we discovered a very good standard with the only downside that it didn’t quite fit. Generations of coordinated climate research programmes had established conventions known as [CF](https://cfconventions.org/) and [CMOR](https://pcmdi.llnl.gov/software/cmorTable/index.html). They describe how climate model output should be stored, including variable names, filename patterns, file formats, units, et cetera.

There was also this software called [ESMValTool](https://docs.esmvaltool.org/en/latest/) that made working with these datasets more FAIR. You describe your workflow in relatively plain language, and the software takes care of finding the data and executing the specified tasks, such as cropping out a specific area. What’s great is that you can easily share your “recipes” so others can repeat and build upon your work.

Another great aspect of ESMValTool is its extensibility. By writing so-called *CMORizers*, we could “teach” the software to also understand the other datasets we wanted to support. At the other end of the workflow, we could write custom code snippets to incorporate model-specific quirks, such as deviating file formats. This allowed us to adopt the existing standards and software for our FAIR hydrological forcing module.

![](/assets/1_pCv3lwGmPzeENax9hIhuww-3a4f874f.png)

ESMValTool’s extensibility allowed us to adopt it for our FAIR hydrological forcing data module.

## FAIR parameter sets?!

So far, our journey had been quite a feat. We’d seen adopting a standard even if it wasn’t widespread, and being pragmatic if it didn’t quite fit. But what if there is no suitable standard?

We would soon discover it as we set foot in the land of parameter sets: home to all kinds of maps, from land use, soil types, elevation, you name it. We had envisioned and half-expected something similar to ESMValTool. But our disappointment grew quickly. Apparently, there was no clear authoritative source of parameter sets. No controlled vocabulary, a wild growth of file formats and software to manipulate them, and no consensus on what to use in hydrological models. We felt disoriented and washed out.

![](/assets/1_PKcxGe1AcIoAu1_Wf44XAw-561d6116.png)

By imagining how we would use a standard if there had been one, we were able to “pretend” it exists.

So we entered upon a game trail. Out of the control and out of time, we headed straight toward our goal: being able to load parameter sets from within our unified modeling environment. We quickly collected example parameter sets for our set of models and dreamed up a minimal set of metadata to describe them: a name, a directory path, the name of a configuration file, and the name of the model for which it was to be used. That was all we needed to load an existing parameter set that we had magically obtained. We added a DOI field, empty for now, so we could eventually publish the datasets and retrieve them again. FAIR enough.

## A FAIR platform

Anecdotes are nice, but experience is nicer. To help you get started, we collected our models, forcing data, parameter sets, and software stack on a dedicated platform. Even if all these components are more FAIR than they’ve ever been, it’s still a bit of work to collect and configure all that. Clearly, we haven’t yet reached transcendence.

The eWaterCycle demo platform gives a taste of what FAIR can bring in terms of user experience. Simply visit the URL, log in with your credentials, and enter a JupyterLab environment that is ready to go. On top of it, we build a graphical explorer where you can set up a basic experiment with a few clicks — a corresponding notebook will be generated and you can start modeling right away. Notebooks are great for exploratory research and disseminating experiments. Also, there are nice tools to help with things like auto-formatting and version control.

![](/assets/1_-2EFy2k5Gwj7OXMkZgwQGg-957d5fa9.png)

A dedicated platform makes all of its components more FAIR and helps to show the merits of FAIR

While the platform is not necessarily FAIR in itself, we find that it greatly enhances the FAIRness of its components. Technical aspects are hidden from the users, so they can focus on conducting experiments. Models and parameter sets can easily be discovered and used. Our guidelines for adding new models or parameter sets are like a step-by-step guide to making them (more) FAIR.

With eWaterCycle we hope to inspire a new paradigm for conducting hydrological modeling studies. The flowchart draws our FAIR journey in retrospect. It contains valuable insights, but it is by no means an all-encompassing wisdom chart. Now it is time for your expedition.

![](/assets/1_6MXyXLQhvkjN7PL6Jp4gcw-79a28e46.png)

Our FAIR journey in retrospect (not an all-encompassing wisdom chart)

For more information on eWaterCycle, see the [publication in Geoscientific Model Development](https://doi.org/10.5194/gmd-15-5371-2022).
