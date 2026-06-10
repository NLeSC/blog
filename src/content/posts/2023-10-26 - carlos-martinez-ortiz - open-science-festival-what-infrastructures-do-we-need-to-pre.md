---
layout: post
title: "Open Science Festival: What infrastructures do we need to preserve research software?"
date: 2023-10-26
author: Carlos Martinez-Ortiz
published: true
source: medium
source_url: https://blog.esciencecenter.nl/open-science-festival-what-infrastructures-do-we-need-to-preserve-research-software-7c181404f310
tags:
  - uncategorized

---

*written by *[*Luisa Orozco*](https://www.esciencecenter.nl/team/dr-luisa-orozco/)*, *[*Daniela Gawehns*](http://www.linkedin.com/in/danielagawehns/)*, and *[*Carlos Martinez-Ortiz*](https://medium.com/@c.martinez)

![Open Science Festival: What infrastructures do we need to preserve research software?](/assets/open-science-festival-what-infrastructur-9069ad56.jpeg)

## Introduction

Earlier this year, the 2023 edition of the Dutch [Open Science Festival](https://opensciencefestival.nl/) was held. We (the eScience Center and Leiden University) organised the session “National infrastructure for sustainable research software”. In this session we discussed the benefits and limits of available software preservation platforms (or infrastructures) and if national infrastructures for research software development are feasible and desirable.

Research software increasingly forms a critically important element of many research projects across a wide array of domains. To achieve truly sustainable and reproducible research, not only the software itself but also the computational environment it depends on needs to be preserved. Different types of infrastructure are required to support these preservation activities.

One user-friendly example of a friendly way to package computational environmetns are Docker containers. These containers can be archived on privately owned platforms like Docker Hub and GitHub or on publicly funded archives such as Zenodo. Such platforms become part of the infrastructure needed to rerun and reuse research code associated with research results.

## Panel composition and pitches

The session was organised as a series of panel pitches, followed by a group discussion. The panel shared their insights and experiences, as we explored current issues with container storage platforms and related infrastructure and the role the Dutch research landscape can take as a provider of independent and government funded infrastructure for sustainable research software.

The panel was composed of national and international experts from different domains and backgrounds to contribute (researcher, software engineer, administrator of research servers, science funders). Panellists were John Swinbank from ASTRON, Niki van Stein from LIACS, Leiden University, Matthijs Moed from SURF and Jeremy Cohen from Imperial College London.

Panellists were asked to prepare a short pitch with their view on the following question:

*Which infrastructures (version control, containers publication, Zenodo, testing infrastructure, any other?) are most important to the work your organisation does?*

This is a summary of the pitches from each panellist:

## John Swinbank, ASTRON

ASTRON works on a regime of big data. We are already working with tens of petabytes of data from telescopes like LOFAR, and that will increase to the order of 1 Exabyte per year when SKA (Ed.: a [new radio telescope](https://www.astron.nl/category/telescopes/ska/)) comes online later this decade. Our task is to make sure this volume of data is in a format that is usable for astronomers. The astronomical community has been working towards full reproducibility, but it is not yet completely embedded in the culture. In terms of infrastructure, we have a local GitLab instance for code sharing;using containers and publishing on Zenodo is not yet universally accepted.

## Niki van Stein, LIACS, Leiden University

In my group reproducibility is a big thing. Both to verify research results from us and other groups and also to build and document on code developed by master and PhD students. We use version control, and docker. Code alone is not enough, we aim to share the whole environment. But this is challenging when the code requires multiple CPUs and GPUs, you cannot easily put that in a docker container!

## Matthijs Moed, SURF

At SURF, we build tools that fit in the workflow of researchers. Our biggest challenge is finding out what researchers actually need and how they can use our tools in their work. We work not only with organisations like Astron, who need very special infrastructure, but also for the majority of researchers who use computational methods but are not specialists in using them. Offering the right tools to them involves sometimes knowing their needs without them being able to formulate them. Meeting researchers where they are is key to developing sustainable research software.

## Jeremy Cohen, Imperial College London

Infrastructure to support software, such as version control, is particularly important in my work and that of people I collaborate with. Containers are becoming more important in the research community as a method to help support reproducibility and address challenges such as working across different computing platforms. Continuous integration (CI) (Ed: continuously testing code while expanding its functionality) is also growing in importance. At Imperial College London, as in many other research institutions, we have access to such services, but of course, as the use of software and computing infrastructure in research continues to grow, there are frequently new opportunities emerging to improve the offerings and infrastructure that are provided to researchers. This is something that I aim to help support as a leader of our local research software community.

## Discussion session

While we had prepared some questions for the panellists, we also allowed the discussion to flow organically. Members of the audience were also invited to ask their own questions. This is a summary of some of these questions and the panel’s responses.

How is national infrastructure organised in the UK, and how does it compare to the Netherlands?***

*Jeremy*: While there is national research computing infrastructure in the UK, many resources are also provided at a local or regional level. There is wide use of commercial services for managing code, such as GitHub. I feel that there is scope for improvement in the context of providing coordinated research software infrastructure at a national level but it can be difficult to assess the value of this and how to make it available. A key discussion point is who pays for such infrastructure and how? And how do we make sure people have equal access to these resources particularly when they are paid services?

*Matthijs:* at SURF we provide national infrastructure. There are technical difficulties like federation (Ed: sharing resources across multiple organisations), but we probably need to revisit some of these limitations and see what is possible as technology changes.

*John*: One thing we notice is that the barrier to external contributors is high with our local GitLab instance — working on GitHub makes it easier for astronomers around the world to collaborate, and some of our collaborators are based around the world, in places such as the USA and China.

*Audience member #1*: National infrastructure also creates fragmentation. Maybe we need a roadmap / strategy, not only infrastructure.

***In your opinion, which infrastructures are missing, that you/your organisation would benefit if they were available?***

This question sparked a short discussion and several audience members contributed to it: One audience member said that guidance on HPC resources is very valuable. They have HPC resources available from SURF (Lisa, Research Cloud, etc.) but still need some guidance on when to use which one. Another audience member experienced SURF as an invaluable resource for navigating the different solutions available for their research needs. Another point that was raised were generic skills that would help all researchers working with high computational needs, like basic GPU and CPU programing. The audience member mentioned that there is a hurdle to getting to know all these systems, while, at the same time, a bit of speedup in your results is indeed an invaluable resource.

***How about the code itself? Are there quality criteria applicable to all code, making it FAIR and sustainable? Should we educate all researchers?***

*Jeremy*: Not every researcher should be a computer scientist, but some level of understanding on code quality and how to think about writing your code is still valuable. For example, how you think about the problem. Software being considered a first class output would make researchers see more value in producing good code. Architecture of code makes code more sustainable. Good quality documentation should provide the information users will need. Documenting decisions on choices of libraries used is also useful.

*John*: At ASTRON there are some practices we follow to make code better, and we should do more. We have professional engineers who are not (necessarily) astronomers. In this group we encourage good practices like code reviews. I am curious about using Sonarqube (Ed: an [open-source platform for continuous analysis of code quality](https://www.sonarsource.com/products/sonarqube/)), but just playing with it at the moment. One thing that resonated from what Jeremy said, is that there are astronomers who get really involved in developing code (such as astropy), but it does not get recognition — it will not get you tenure. This is a problem for the sustainability of astropy. And we do not have funding models for it, such as turning packages into part of the infrastructure.

***Are we creating walls around science? “To be an astronomer you need to know a long list of things”?***

*John*: You do need to have some level of knowledge. We have been using things like mentoring or google summer of code to develop some of these skills on people who use them.

*Audience*: what I find interesting are the collaborations for example in digital humanities: computer scientists &amp; historians, more collaboration is the way to go.

It is in a way similar to a chemistry lab: at the lab you have materials available, and protocols you need to follow to use those materials. Researchers get trained on how to use those materials, but they do not need to build them themselves. Research software is similar to those materials, researchers need to be trained on how to use them, but they can work together with research software engineers that can help them build those materials.

## Wrap-up

**Most important points/Key Message**

During our panel session on infrastructure for sustainable research software, we discussed several services for tracking changes, sharing computational environments and high performance computing. Interestingly, the discussion quickly moved from technical solutions towards a more broader view of what constitutes infrastructure:

The panel and audience agreed that it should be acknowledged that infrastructure is not only facilities and services, but that people, and in some cases software, can also be a critical part of infrastructure.

For the panel session itself, we cannot say that the panellists and audience agreed on which services exactly are critical or absolutely essential to be offered at national level. What the audience and panellists agreed on was that we need a national strategy or roadmap to organise infrastructure in a way that is technically sound, as well as useful for the end users. And not just the technical infrastructure, but also the organisational infrastructure and personnel to provide better support to researchers by providing consultancy, training and implementation. Furthermore, everyone in the room saw the need to include the points of view from a diverse set of users when deciding on the infrastructure. Not all users will want or need to have a say in what type of services are offered, but they will want to be informed on how to use and access those services when needed.
