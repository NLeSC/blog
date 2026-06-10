---
layout: post
title: "eScience trends from ADASS 2019"
date: 2019-10-21
author: Hanno Spreeuw
published: true
source: medium
source_url: https://blog.esciencecenter.nl/escience-trends-from-adass-2019-f68cd8cca49b
tags:
  - Astronomy
  - Containers
  - Docker
  - Performance
  - Workflows
---

**SubscribeRemember me for faster sign in

Now, in getting to deliver those science-ready data products, e.g., well calibrated sky maps, we need compute and data transfer infrastructure, data reduction pipelines and support scientists to build, run and maintain those pipelines. Let’s look at the compute and data transfer problem first.

Bring the compute to the data or the data to the compute?**

![eScience trends from ADASS 2019](/assets/escience-trends-from-adass-2019-6a396fd8.png)
Slide from presentation by R. Chary (Caltech/IPAC) for the Joint Survey Processing Working Group. The red line indicates the increase of data rates from future telescopes.This slide from the presentation of Ranga-Ram Chary (invited speaker) clearly depicts our problem as well as the possible solution. Moore’s law — about the doubling of the number of transistors we can print on integrated circuits every two years-cannot keep up with the increasing data rates from new telescopes: its slope is too shallow. Moreover, Moore’s law [ended](https://medium.com/@sgblank/the-end-of-more-the-death-of-moores-law-5ddcfd8439dd) (H.S.). This means that worldwide compute power does not keep pace with the data rates from future telescopes. The slide also shows the solution: bandwidths across the world will increase faster than these data rates and we will be able to process observations by distributing them over many compute clusters across the globe.

**Data reduction pipelines**

![eScience trends from ADASS 2019](/assets/escience-trends-from-adass-2019-35938457.png)
Slide from presentation by Christine Banek: Why is the LSST Science Platform**Built on Kubernetes?Another big trend and irreversible: the use of containers like Docker and Singularity containers. They are lightweight, i.e. their use will have a negligible effect on performance and they help to reproduce scientific results. Kubernetes and Helm are tools that help to manage all these containers.

And finally, the people.**

Long gone are the days when the most significant progress came from one or a few geniuses working alone or in small isolated teams. Over the last few centuries, all the low hanging fruit has been picked. What remains is much harder to investigate and likely requires hundreds of people. A large fraction of those will be the builders, testers and maintainers of data reduction pipelines, more generally referred to as support scientists. For these people there will be plenty of work in the coming decades. Moreover, in designing any new telescope or spacecraft mission for astronomy, one will have to think beyond data collection; the delivery of science-ready data products will be added to the responsibilities of the observatories conducting these projects.
