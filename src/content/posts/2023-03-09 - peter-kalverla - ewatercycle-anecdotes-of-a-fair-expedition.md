---
layout: post
title: "eWaterCycle: Anecdotes of a FAIR expedition"
date: 2023-03-09
author: Peter Kalverla
published: true
source: medium
source_url: https://blog.esciencecenter.nl/ewatercycle-anecdotes-of-a-fair-expedition-274d1e8e3bba
tags:
  - uncategorized

---

Subscribe*Remember me for faster sign in

There was also this software called [ESMValTool ](https://docs.esmvaltool.org/en/latest/)that made working with these datasets more FAIR. You describe your workflow in relatively plain language, and the software takes care of finding the data and executing the specified tasks, such as cropping out a specific area. What’s great is that you can easily share your “recipes” so others can repeat and build upon your work.

Another great aspect of ESMValTool is its extensibility. By writing so-called CMORizers*, we could “teach” the software to also understand the other datasets we wanted to support. At the other end of the workflow, we could write custom code snippets to incorporate model-specific quirks, such as deviating file formats. This allowed us to adopt the existing standards and software for our FAIR hydrological forcing module.

![eWaterCycle: Anecdotes of a FAIR expedition](/assets/ewatercycle-anecdotes-of-a-fair-expediti-72d7adc6.png)
ESMValTool’s extensibility allowed us to adopt it for our FAIR hydrological forcing data module.

## FAIR parameter sets?!

So far, our journey had been quite a feat. We’d seen adopting a standard even if it wasn’t widespread, and being pragmatic if it didn’t quite fit. But what if there is no suitable standard?

We would soon discover it as we set foot in the land of parameter sets: home to all kinds of maps, from land use, soil types, elevation, you name it. We had envisioned and half-expected something similar to ESMValTool. But our disappointment grew quickly. Apparently, there was no clear authoritative source of parameter sets. No controlled vocabulary, a wild growth of file formats and software to manipulate them, and no consensus on what to use in hydrological models. We felt disoriented and washed out.

![eWaterCycle: Anecdotes of a FAIR expedition](/assets/ewatercycle-anecdotes-of-a-fair-expediti-1cae2172.png)
By imagining how we would use a standard if there had been one, we were able to “pretend” it exists.So we entered upon a game trail. Out of the control and out of time, we headed straight toward our goal: being able to load parameter sets from within our unified modeling environment. We quickly collected example parameter sets for our set of models and dreamed up a minimal set of metadata to describe them: a name, a directory path, the name of a configuration file, and the name of the model for which it was to be used. That was all we needed to load an existing parameter set that we had magically obtained. We added a DOI field, empty for now, so we could eventually publish the datasets and retrieve them again. FAIR enough.

## A FAIR platform

Anecdotes are nice, but experience is nicer. To help you get started, we collected our models, forcing data, parameter sets, and software stack on a dedicated platform. Even if all these components are more FAIR than they’ve ever been, it’s still a bit of work to collect and configure all that. Clearly, we haven’t yet reached transcendence.

The eWaterCycle demo platform gives a taste of what FAIR can bring in terms of user experience. Simply visit the URL, log in with your credentials, and enter a JupyterLab environment that is ready to go. On top of it, we build a graphical explorer where you can set up a basic experiment with a few clicks — a corresponding notebook will be generated and you can start modeling right away. Notebooks are great for exploratory research and disseminating experiments. Also, there are nice tools to help with things like auto-formatting and version control.

![eWaterCycle: Anecdotes of a FAIR expedition](/assets/ewatercycle-anecdotes-of-a-fair-expediti-3f08044f.png)
A dedicated platform makes all of its components more FAIR and helps to show the merits of FAIRWhile the platform is not necessarily FAIR in itself, we find that it greatly enhances the FAIRness of its components. Technical aspects are hidden from the users, so they can focus on conducting experiments. Models and parameter sets can easily be discovered and used. Our guidelines for adding new models or parameter sets are like a step-by-step guide to making them (more) FAIR.

With eWaterCycle we hope to inspire a new paradigm for conducting hydrological modeling studies. The flowchart draws our FAIR journey in retrospect. It contains valuable insights, but it is by no means an all-encompassing wisdom chart. Now it is time for your expedition.

![eWaterCycle: Anecdotes of a FAIR expedition](/assets/ewatercycle-anecdotes-of-a-fair-expediti-e97ba776.png)
Our FAIR journey in retrospect (not an all-encompassing wisdom chart)For more information on eWaterCycle, see the [publication in Geoscientific Model Development](https://doi.org/10.5194/gmd-15-5371-2022).
