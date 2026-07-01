---
layout: post
title: "eScience trends from ADASS 2019"
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

The 2019 Conference on Astronomical Data Analysis and Software Systems (ADASS, 353 participants) took place in Groningen between 6 and 10 October, 2019. The aim of this annual conference is to bring together scientists and programmers to discuss the trends, developments and challenges in the processing and dissemination of astronomical data. For me, as an eScience Research Engineer at the Netherlands eScience Center, it was particularly interesting because these trends may apply to all domains of science, not only astronomy.

![](/assets/1_W1CJSpubMdkogPvP6K5f2g-906ce1f5.jpeg)

**Increasingly sensitive new telescopes are not enough for astronomical breakthroughs**

I attended inspiring talks about data management [for the Large Synoptic Survey Telescope (LSST](https://www.lsst.org/)), the [EUCLID](https://www.euclid-ec.org/) mission and the [Cherenkov Telescope Array](https://www.cta-observatory.org/) (CTA). All of these projects face major challenges beyond their deployment: the collected data have to be stored and processed into science-ready data products; “science-ready data products” became a buzz phrase across the conference. It means that building an even more sensitive telescope will not result in high scientific output if the observations are stored as raw, uncalibrated data.

**Throwback time, what my Ph.D. research was actually about…..**

![](/assets/1_q7DY353RmUprEG8VdE0znQ-85995019.png)

Slide from André Offringa’s presentation: “Designing radio-astronomical software for delivering science-ready products”

The discussion about science-ready data products reminded me of what I spent most of my time on during my Ph.D. research: not astronomical interpretation of an observation, but data reduction. So I actually don’t have a Ph.D. in astronomy, but in data reduction! While I spent about five months processing an uncalibrated data set into a well calibrated sky map, only a total of six months were scheduled for actually publishing that observation. This meant that two weeks were left for astronomical analysis and two weeks for writing a paper. That’s insane! This was over ten years ago, but little has changed since then. Imagine how scientific output would increase if astronomers could actually spend their time on astronomy. And likewise for other scientific domains.

Now, in getting to deliver those science-ready data products, e.g., well calibrated sky maps, we need compute and data transfer infrastructure, data reduction pipelines and support scientists to build, run and maintain those pipelines. Let’s look at the compute and data transfer problem first.

**Bring the compute to the data or the data to the compute?**

![](/assets/1_9Y12e1V5GDc07WbZ78shfQ-3a8dcfad.png)

Slide from presentation by R. Chary (Caltech/IPAC) for the Joint Survey Processing Working Group. The red line indicates the increase of data rates from future telescopes.

This slide from the presentation of Ranga-Ram Chary (invited speaker) clearly depicts our problem as well as the possible solution. Moore’s law — about the doubling of the number of transistors we can print on integrated circuits every two years-cannot keep up with the increasing data rates from new telescopes: its slope is too shallow. Moreover, Moore’s law [ended](https://medium.com/@sgblank/the-end-of-more-the-death-of-moores-law-5ddcfd8439dd) (H.S.). This means that worldwide compute power does not keep pace with the data rates from future telescopes. The slide also shows the solution: bandwidths across the world will increase faster than these data rates and we will be able to process observations by distributing them over many compute clusters across the globe.

**Data reduction pipelines**

![](/assets/1_-0P5c8YNlTytlT_YLBtQ1w-3b37f090.png)

Slide from presentation by Christine Banek: Why is the LSST Science Platform Built on Kubernetes?

Another big trend and irreversible: the use of containers like Docker and Singularity containers. They are lightweight, i.e. their use will have a negligible effect on performance and they help to reproduce scientific results. Kubernetes and Helm are tools that help to manage all these containers.

**And finally, the people.**

Long gone are the days when the most significant progress came from one or a few geniuses working alone or in small isolated teams. Over the last few centuries, all the low hanging fruit has been picked. What remains is much harder to investigate and likely requires hundreds of people. A large fraction of those will be the builders, testers and maintainers of data reduction pipelines, more generally referred to as support scientists. For these people there will be plenty of work in the coming decades. Moreover, in designing any new telescope or spacecraft mission for astronomy, one will have to think beyond data collection; the delivery of science-ready data products will be added to the responsibilities of the observatories conducting these projects.
