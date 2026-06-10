---
layout: post
title: "Defining the roles of research software"
date: 2023-03-21
author: Rob van Nieuwpoort
published: true
source: medium
source_url: https://blog.esciencecenter.nl/defining-the-roles-of-research-software-21535a43f23
tags:
  - uncategorized

---

SubscribeRemember me for faster sign in

Examples: In the biochemistry realm, software is used for modeling molecules for use in a next-gen diagnostics or therapeutics: we want to design some molecule in software with some characteristics that we can experimentally validate later. Other examples include designing and modeling medical devices, devices to help with environmental monitoring or cleanup, CAD tools, or designing new compute hardware [suggested by Jonathan Romano].

![Defining the roles of research software](/assets/defining-the-roles-of-research-software-cf81259f.jpg)

## Research software analyses research data

Research software is important for analysing research data as well. Sometimes this analysis is automated, such as data access and processing, model fitting, filtering, aggregation, and search. In other cases, the software supports and facilitates researchers in doing the analysis, for example, for qualitative data analysis. Other examples of software-supported analysis include natural language processing pipelines, data science tools (a concrete example could be [ESMValTool](https://www.esmvaltool.org/)), software notebooks (Jupyter), machine learning pipelines for classification and anomaly detection, etc.

![Defining the roles of research software](/assets/defining-the-roles-of-research-software-4d883c98.jpg)

## Research software presents research results

Research software can also be used to explain data, or to present research results. Scientific visualizations are a prime example, but so is software with the specific purpose of generating plots in research papers, or interactive visualizations on websites. Note that software is used to disseminate research in general, not only to researchers but also to a broader audience. It also is applicable for transitioning the research from academia to industrial applications. Having well-written software can help encourage the adoption of the research software in companies [suggested by Ian McInerney].

![Defining the roles of research software](/assets/defining-the-roles-of-research-software-21d8eeff.jpg)

## Research software assembles or integrates existing components into a working whole

[suggested by Mark Hoemmen] An important, but often overlooked purpose of research software is integration and automation. This includes making efficient use of infrastructure, as well as repetition and scaling of experiments or analysis. A growing number of experimental systems (more than just an instrument) need to be run simultaneously in an orchestrated manner [suggested by Ian Cosden]. The research software performing these tasks is becoming ever more complex. Software supporting workflows, for example, can help in structured and reproducible automation and repetition.

Another form of integration is the coupling of different computational models, combining computational models with data-driven models (AI-based surrogate models), potentially while assimilating observational data. Consider the construction of digital twins, for example. Specifically designed research software in the form of model-coupling frameworks can facilitate this, helping with the coupling and deployment, but also for example with the propagation of uncertainty quantification between models.

A third class of integration software also deserves attention: Python or shell scripts that automate things, connect components and tools, or let data flow between different executables. Note that small scripts especially often are not adequately tested and maintained, even though they are critical to reproducing scientific results.

![Defining the roles of research software](/assets/defining-the-roles-of-research-software-0660c420.jpg)

## Research software is infrastructure or an underlying tool

[suggested by Jed Brown] In all areas of research, there is a role for “infrastructure software,” which sometimes is not unique to research-oriented organizations, but is heavily relied upon [suggested by Jordan Perr-Sauer]. Some lower-level software was created specifically for research (i.e., known as research software,) while other software infrastructure is meant for general utility and happens to be important for research (i.e., software in research.) Examples include compilers and programming languages, generic software libraries, code repositories, data repositories, and open source software in general. (Note that this is discipline-dependent, as a compiler would likely be research software within computer science research on programming languages.) As described by the Ford Foundation: “Free, publicly available source code is the infrastructure on which all of digital society relies. It is vital to the functioning of governments, private companies, and individual lives.” (See [Roads and Bridges: The Unseen Labor Behind Our Digital Infrastructure / Ford Foundation](https://www.fordfoundation.org/work/learning/research-reports/roads-and-bridges-the-unseen-labor-behind-our-digital-infrastructure/).) It is equally vital to research.

![Defining the roles of research software](/assets/defining-the-roles-of-research-software-ab3a3c28.jpg)

## Research software facilitates distinctively research-oriented collaboration

[suggested by Lee Liming] A lot of software and services have been specifically designed to facilitate research-oriented collaboration. Although sometimes not considered research software as such, this class certainly is important in research, and deserves a mention. With research becoming more and more open, team-based, interdisciplinary, collaborative, and inclusive (e.g., citizen science,) the usage and value of software facilitating collaboration is exploding. Examples include platforms to collaborate on software (GitHub, GitLab, Stack Overflow,) papers (Overleaf, ORCID, Zotero,) data (Zenodo, HUBzero, CyVerse,) computing (SciTokens, SciGaP,) software that is employed in citizen science [suggested by Chris Erdman] and many others.

## Summary

It is clear that there are many different types of research software, fulfilling many different roles and functions. This huge variety makes it hard to come up with a good classification that captures all aspects and does justice to all the hard work done by the developers of the software. Nevertheless, we hope that we have succeeded in providing a bit more insight into the value of research software, the importance of sustaining said software, and recognizing the people involved in developing the software.

You can contact us at [R.vanNieuwpoort@esciencecenter.nl](mailto:R.vanNieuwpoort@esciencecenter.nl) and [d.katz@ieee.org](mailto:%22Daniel%20S.%20Katz%22%20%3Cd.katz%40ieee.org%3E).

Copyright © 2023 Rob van Nieuwpoort, Daniel S. Katz. Distributed under the terms of the [Creative Commons Attribution 4.0 License.](https://creativecommons.org/licenses/by/4.0/legalcode)
