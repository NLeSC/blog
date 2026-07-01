---
layout: post
title: "how do we evaluate research software to meet different requirements"
author: eScience Editorial Team
published: true
source: medium
tags:
  - Citation
  - Community
  - Environment
  - FAIR
  - RSE
  - Reproducibility
---

![](/assets/1_mOfFxGkE0FP-eQ30xoYxlQ-533fe1a4.jpeg)

**Software written to solve research questions gains more recognition as a research result of its own and requires evaluation in terms of usability as well as its potential to facilitate high-impact and reproducible research. Indeed, in recent times there has been increased emphasis on the importance of reproducibility in science — particularly of results where software is involved. In order to tackle this problem, there have been efforts to evaluate reproducibility of research results. For instance, one could use different metrics to evaluate important aspects for software such as quality, findability, and, of course, reproducibility.**

## Evaluation requirements from different perspectives

The evaluation of Research Software should consist of several perspectives and the use of tools or application of a framework heavily depends on these perspectives. (see “ [Setting Up a Software Seal Approval](https://figshare.com/articles/Setting_up_a_Software_Seal_of_Approval/4737178/1) ”, slide 3)

There is the funder’s perspective where it is most interesting how funding has changed how people do software-based science. The following aspects play a role:

- Number of people or research projects using it. This could be measured by letting the software “phone home” or crawl the web for active installations. The number of citations to the software itself (e.g. using [Citation File Format (CFF)](https://doi.org/10.25504/FAIRsharing.m2NU20)) or citations to articles mentioning the software could be used as an approximation. Social media mentions also indicate impact to a certain degree.
- Funders may encourage [repeatability studies](http://repeatability.cs.arizona.edu/index.html) and positive outcome for some software-related experiments may satisfy funding agencies.
- The funder’s perspective definitely needs some future work which starts at making software a ”First class citizen of research’’ in terms of recognition and management. It will be challenging for funders to develop fair recognition framework to treat or review all the virgin or mature projects according to their expected milestones. [Sustainability](https://www.software.ac.uk/resources/online-sustainability-evaluation) of software may play a major role here. Availability, usability, maintainability, portability are all aspects of software which determine its sustainability (see “ [Setting Up a Software Seal Approval](https://figshare.com/articles/Setting_up_a_Software_Seal_of_Approval/4737178/1) ”, slide 4). Funders may also want to [incentivise the sharing of code](http://www.orfg.org/incentivization-blueprint) for better evaluation options.

The developer’s perspective for evaluating their code will probably include quality measures like test coverage or code coverage and to follow certain development process standards. The output of a code linter may contain flags indicating the (lack of) quality for a piece of code (which may influence career perspectives for e.g. coding PostDocs).

There is the user’s perspective where possible reuse of existing research software may be the main focus during evaluation. Users may want to run the code with their own data in executable environments (e.g. in [Code Ocean “Capsules”](https://help.codeocean.com/?q=Capsule)). And users will probably also investigate how a version control system is used and how the community looks like. Much more detailed “ [criteria-based software evaluation](http://software.ac.uk/sites/default/files/SSI-SoftwareEvaluationCriteria.pdf) ” guides are available at the [Software Sustainability Institute](https://software.ac.uk/resources/guides-everything/software-evaluation-guide). [Other survey resources](https://www.questionpro.com/survey-templates/software-evaluation/) shall inspire individual software evaluation.

## Ideas on how to evaluate research software quantitatively

We have discussed key aspects related to helping others to select research software to meet different requirements. For example, a scientist would like to solve a particular problem in their domain and seeks a tool for solving this problem. How would this researchers select their tools and based on what criteria would they make this decision. Some ideas for such criteria and for making such decisions are presented below.

*Identification of key important metrics that are useful and easy to generate. This may include the identification of pre-existing that compute metrics.*

1 — When creating a metric framework one should consider:

- What am I measuring?
- Why am I measuring it?
- How am I measuring it?  
	a) What are the inputs?  
	b) What are the outputs?  
	c) What is a pass / fail / how are we giving a score?
- Who should define the metrics?

2 — Examples of metrics for assessing software quality and reusability are linters, code coverage, and code evaluation tools.

3 — Examples of research impact metrics are downloads, contributors, citations, and publications/impact factors derived from software.

4 — Examples of metrics for assessing transparency of software, e.g. documentation (high level description of what the software does as well as inline code documentation), references to papers describing the algorithms used, and communication of software development and maintenance processes.

5 — Another set of metrics that could be useful would be metrics for understanding how easy it is to install and manage dependencies. For example, it is installable via popular package management systems or via a single container.

6 — A metric of replicability and provenance of the results generated by the software: the software should be able to encapsulate the data with the associated configuration, parameters and related context (version control of software, system it was built on, number of processes used, runtime telemetry).

*Badge systems — combine metrics through standards to develop a software quality rating system.*

It is our hope that the sum total of the criteria in Section C could be used to develop a more formal, but easy-to-use system of evaluation such as the aforementioned badge system. In addition, we hope that by presenting to the community key goals for development of research software that we will incentivise best practices.

We should ideally agree on what metrics are important to evaluate some of these aspects. Different communities might come with different agreements. For instance, [ELIXIR](https://elixir-europe.org/) and [EGI](https://www.egi.eu/) might have different ideas about what to evaluate and how to evaluate, for instance quality. Different agreements are fine as far as each community defines what are the important metrics to evaluate something (e.g. quality) and they wrap them up into a badge that people (the community) can identify and understand. This way so people will be able to say I am compliant with that badge tailored to measure one specific aspect. Software could be compliant with more than one badge.

For every badge, it would important to identify and describe the metrics part of the badge. For the description of metrics it would be helpful to agree on how we describe metrics. A citation metric, for instance, might mean different things to different people and there might be different methodologies to collect the data that makes the metric mean different things. So for the badge to work, each metric part of the badge needs to be very well described in a consistent manner.

## The need to develop and adopt a framework for community metrics

At the moment what we miss is a metadata standard to consistently describe metrics and a framework to be able to group metrics into badges. A framework to discover badges that also helps users, organisations and funders to say what badges they support. This framework is not a metrics framework to collect data but a framework to define and describe badges and their metrics. Different metrics frameworks collecting metrics data like [FAIRshake](https://fairshake.cloud/), [FAIR evaluator](http://dx.doi.org/10.1101/418376), [OpenEbench](https://elixir.bsc.es/) could be used to evaluate the metrics defined by a badge.

In summary, it becomes clear that metrics and badges for research software are urgently needed, but are still a long way off.The roadmap may look like this:

- Evaluate pre-existing badge systems. Starting points are:
- Badges related to software development practices
- [Software Seal of Approval](https://figshare.com/articles/Setting_up_a_Software_Seal_of_Approval/4737178/1) (inherited from DSoA)
- [Libraries.io](https://libraries.io/), to manage software projects and dependencies on other packages.
- [ropensci.org](https://ropensci.org/) — to peer review of packages, resulting in accession to a curated register.
- Create a badge for 4OSS
- Create a badge for FAIR software metrics
- Collaborate with funders on “interesting” metrics

It would be nice if volunteers from the RSE community could be found to make progress here.

Relevant contacts can be found at:

- [The Software Sustainability Institute](https://www.software.ac.uk/)
- [URSSI](http://urssi.us/)
- [RSE groups in UK, NL, DE](https://www.de-rse.org/en)
- [Alliance of Science Organisations in Germany, i.e. Digital tools — software and services](https://www.allianzinitiative.de/fields-of-action-projects/digital-tools-software-and-services/?lang=en)
- Collaborate with developers in a community to identify “interesting” metrics
- Collaborate with users in a community to identify “interesting” metrics
