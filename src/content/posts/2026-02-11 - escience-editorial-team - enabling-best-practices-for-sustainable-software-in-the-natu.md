---
layout: post
title: "Enabling best practices for sustainable software in the Natural &amp; Engineering sciences (SS-NES)"
date: 2026-02-11
author: eScience Editorial Team
published: true
source: medium
source_url: https://blog.esciencecenter.nl/enabling-best-practices-for-sustainable-software-in-the-natural-engineering-sciences-ss-nes-0fe81f2995d2
tags:
  - uncategorized

---

# **Enabling best practices for sustainable software in the Natural &amp; Engineering sciences (SS-NES)**

Authors: Roel Janssen, Jason Maassen and Carlos Martinez-Ortiz

*With the available constellation of data and code repositories, it can be hard to choose the best way of making your research code and data available. Here we present an automated way of synchronizing *[*4TU.ResearchData*](https://community.data.4tu.nl/)* with the *[*Research Software Directory*](https://research-software-directory.org/)*.*

![Enabling best practices for sustainable software in the Natural &amp; Engineering sciences (SS-NES)](/assets/enabling-best-practices-for-sustainable--312dc003.jpeg)
4TU.ResearchData is a data and software repository for science, engineering and design domains, as well as support services and a vibrant community around them. The Research Software Directory is an open-source project initiated by the [Netherlands eScience Center](https://www.esciencecenter.nl/) and jointly developed with [Helmholtz](https://www.helmholtz.de/).

As part of the project [Enabling best practices for sustainable software in the Natural &amp; Engineering sciences (**](https://ss-nes.github.io/)**SS-NES) **the 4TU.ResearchData’s data repository and eScience Center’s Research Software Directory (RSD) collaborated to ensure software published in 4TU.ResearchData is also made available in the Research Software Directory.

To achieve this goal, 4TU.ResearchData adapted its metadata intake and implemented API endpoints following the [CodeMeta](https://codemeta.github.io/) standard. Additionally, 4TU.ResearchData implemented API endpoints to communicate statistics on Git repositories following existing Github and Gitlab practices.

The RSD implemented a harvester for 4TU.ResearchData which uses the CodeMeta metadata standard and a Communities feature to group software from a particular source.

## Adding to the research software landscape

![Enabling best practices for sustainable software in the Natural &amp; Engineering sciences (SS-NES)](/assets/enabling-best-practices-for-sustainable--2404cfd2.jpeg)
When creating software as part of your research activities, it is advisable to use a version control system like Git to manage the evolution of the software. At some point, the software needs to be shared with other researchers, either to reuse or extend it, or to validate the research results. Publishing the software provides the benefits of having a URL to cite as well as having a guarantee that the source code of the software is stored at a persistent location for the long term. These benefits are provided by 4TU.ResearchData.

To publish the software in 4TU.ResearchData from Gitlab, Github or Codeberg, one can use Git’s “remotes” concept to push a copy to 4TU.ResearchData while retaining the active development on the hub.

Fun fact**: Due to the collaboration between the eScienceCenter’s RSD and 4TU.ResearchData, the latter added the “Git repository name” and “Code hosting project URL” metadata fields so that they can be used and passed along to the RSD.

We chose this approach because it works regardless of whether the repository is public or private, and regardless of the implementation of the hosting platform. We support Github, Gitlab, Codeberg, Savannah, or any other Git-based platform. Additionally, when dealing with private Git repositories, no systematic integration or information exposure is needed.

## Finding and showcasing software in the research software landscape

![Enabling best practices for sustainable software in the Natural &amp; Engineering sciences (SS-NES)](/assets/enabling-best-practices-for-sustainable--4f34d759.jpeg)
Once the software is published on 4TU.ResearchData, it is automatically picked up by the RSD and added to the 4TU Community collection. The RSD uses the information recorded in 4TU.ResearchData to generate a unique software page designed to highlight the impact of the software.

Next to showing basic static information about the software such as a short description, author list, keywords, and links to the source code, the RSD also enriches the software page with information harvested from other data sources in the open science and open-source ecosystem. Examples include information on software development activity, citation information for the different software releases, and a list of papers citing the software.

## Concluding words

Publishing your software on a trusted repository is one of the good practices advocated by the SS-NES project and the eScience Center. With the integration between 4TU.ResearchData and the RSD, researchers automatically benefit from the findability and exposability of the RSD when they publish their software in 4TU.ResearchData. The RSD has become a more complete source of mapping the research software landscape by automatically harvesting 4TU.ResearchData’s software publications.
