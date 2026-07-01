---
layout: post
title: "is an escience research engineer simply a computer scientist in disguise"
date: 2018-09-06
author: Elena Ranguelova
published: true
source: medium
tags:
  - Biology
  - Collaboration
  - Computer Vision
---

## My personal view on the differences between Computer Scientists and eScience Research Engineers

![](/assets/1_RPecqNsPMcKZ8I_tj16VCA-67637b30.jpeg)

## Can a wolf change its mind by changing its coat?

The origin of this proverbial question comes from the Latin motto:

> Lupus pilum mutat, non mentem.
> 
> The wolf can change its coat, but not its mind (character/disposition).

Querying the ability of any person to change its innate being is a just question. Can a computer scientist change his mind by changing his title? Is an eScience Research Engineer simply a computer scientist in disguise?

I fell in love with computer science and engineering in high school and I have been in love since. The master degrees and a doctorate which followed were a mere formal manifestation and consequence of how I felt. In my career path, I had applied my knowledge in different ways reflected by different job titles: post-doctoral researcher, innovator, R&D engineer. I consider myself a computer scientist and engineer and I currently work as an eScience Research Engineer (eSRE) and eScience coordinator. Many of my colleagues at the [Netherlands eScience Center](https://www.esciencecenter.nl/) have similar careers.

### Six aspects explaining my personal identity change

Working with many partners — other researchers, experts in their scientific domain — inevitably raises the question of who we are. Especially by partners who are computer scientists themselves! Being a “convert” myself, I see similarities but also differences between working as a computer scientist and as an eScience Research Engineer.

In this blog post I will explain my personal view on 6 aspects of this mysterious “identity change”:

- **Science:** Is the focus on computer science, or on domain science?
- **Software:** Is the focus on the software itself, or on the impact of the software?
- **Research:** How much freedom do you have in developing your expertise area?
- **Publication:** Is publishing a main goal or not?
- **Collaboration:** Is collaboration an option or a requirement for doing research?
- **Funding:** Is applying for funding an option or a requirement for doing research?

I will illustrate these six aspects in two stories: one about myself collaborating as a Computer Scientist, and one about myself collaborating as an eScience Research Engineer.

![](/assets/1_iSf90cSRNy2SrF_I8hr7PA-540047fe.jpeg)

Principal Investigators day in 2017. The eScience Research Engineers wear blue badges (contrasting nicely my red cardigan) and the various domain scientists wear white badges. Blue and white, the colors of the Netherlands eScience center, match nicely and the bearers of the different badges work nicely together!

## Collaborative science

Modern science is a multidisciplinary effort. Computer science nowadays is often inspired by the needs and challenges of other sciences, which need computer science achievements in order to progress in the big data era. The keyword for a computer scientist and especially for an eSRE is *collaboration*.

### Collaborating as a computer scientist

Not all computer scientists work with other domain scientists, but many do. While working as a computer scientist (computer vision researcher to be precise) I worked within [Europhlukes](https://cordis.europa.eu/project/rcn/58425_en.html), a joint project with marine biologists. They needed a tool for automated identification of individual humpback whales from images of their unique spots and patterns of the underside of their flukes. These spots and patterns are used for automated individual identification of these endangered mammals from large photo catalogs. The problem in biology gave me inspiration for computer vision research which would solve that problem. I have developed and published an [algorithm for automatically identifying salient regions in an image](http://muscle.ercim.eu/images/DocumentPDF/MP_260_Ranguelova_GVIP05_ext.pdf).

![](/assets/1_hzrWj-0ARNUFPPyQ4HmqAw-1b354da3.png)

![](/assets/1_8-asBtFELsEPiR0NjQmY4A-9de1805a.png)

Two pairs of images of two humpback whales. Each pair corresponds to the same individual. Every image is processed independently: after automatic segmentation of the flukes from the background, salient regions are detected automatically. The regions are then matched between a new image of a whale and all other images of known whales in a catalog. The matching regions in each pair of images are displayed using the same color.

Automating this step allowed the biologists to process faster their large image catalogs and spend their time and efforts on studying the population dynamics of the endangered species. I have met with the biologists a few times to discuss their problem, get feedback and train them on my software.

The same generic algorithm was later applied not only for identifying individual dolphins, newts, leather-back turtles and determining the wood type from microscopy images, but for identifying whether any digital photos subject to different distortions have captured the same object or scene.

![](/assets/1_6cC32D_Xp6hKcWr9YYFKWg-7bdd2c83.png)

Regions detected independently on four images of the same scene. The first image is the original and the other three are being distorted by blur, decreased light and different camera angle respectively.

As a computer science researcher my aim was to publish my algorithm as a first author in a large computer vision conference or journal. Applying the algorithm to real images for real applications served as proof of the usability and increased the acceptance chances of my publications. I was the only developer of the software. I used a proprietary software (MATLAB) to create the tool and delivered an executable to my users.

### Collaborating as an eScience Research Engineer

At the [Netherlands eScience Center](https://www.esciencecenter.nl/), I have worked on many projects requiring computer vision expertise. My first project in collaboration with neuroscientists from four medical centers, was [Biomarker Boosting](https://www.esciencecenter.nl/project/biomarker-boosting).

![](/assets/1_7ltJ6xYnoF6BQdJ9DlntAA-36a82e5b.png)

A *biomarker* is a measurable indicator of some biological state or condition. For example, the volume of the *hippocampus* in the brain is a marker for Alzheimer’s disease. Smaller volume is strongly correlated with both age and cognitive impairment diseases. The larger the sample size, the better the predictive value of the biomarker, which can be achieved by combining data sets obtained by different medical centers. The aim of the Biomarker Boosting project was to build a reusable platform for sharing patient imaging data among medical centers to run a common analysis pipeline. I have worked on the core of the processing pipeline - automatic segmentation of the hippocampus.

![](/assets/1_Fla0k1Hl4j7Szpl0nEEnbQ-4fb4060e.png)

Visualizing the segmentation result of the hippocampus. The volume can be obtained by simple voxel count.

The developed algorithm was generic and could be used to segment any brain structure, but it was used with atlas data for the hippocampus. The pipeline was applied to four different cohorts collected to study dementia and mild cognitive impairment as that was the focus of the neurological researchers. I have worked together with the scientists in the same office on a regular basis (a day every week) during the project and we have kept in touch closely. We have presented and published the results of the project in neuroscience conferences and journals and I was often a co-author. I attended neurological conferences and made links with that community. We have worked together in the same software repository, the development was adhering to high code quality, testing and documentation standards. The goal was to deliver an open source software in order to increase the chances of community adoption and to serve as many neuroscientists as possible and even reach other domains.

## Similarities and Differences

The above examples from my career illustrate the *similarities* and *differences* between working as a computer scientist and as an eScience Research Engineer asI experienced them.

On a first glance, the work of a computer scientist and an eSRE is the same, only the job title differs. But the main difference between the work of a computer scientist and an eSRE stem from their different **focus.**

- **Science:** Both a computer scientist and an eSRE work in scientific projects. Computer science is the science of interest of a computer scientist. Other scientific domains might present inspiration, challenge or serve as application domains, but are not the focus. eScience stands for enhanced science, an eSRE’s applies ICT expertise to facilitate breakthroughs in another science. The focus is on the domain research question.
- **Software:** Both aim to produce working software. Computer scientists write software implementing new research ideas and producing correct publishable results is sufficient. eRSE write software to solve a domain question. eRSEs take care of the usability and within (or even cross-) domain applicability of the software. While the computer scientists do not necessarily open their code (e.g. to have a competitive advantage), eSREs do this as main principle. The impact of the research software they produce should be as large as possible.
- **Research:** Computer scientists and eSRE are researchers. eSRE can do (applied) research in their expertise area if it fits the project, but always engineer research software. The main research in the project is the one aimed at answering the domain research question.
- **Publication:** Both publish their work. Publishing as a first author (at the beginning of the career) is the main goal of a computer scientist. eSRE also publish either as a first author about the eScience or often as a co-author in a domain publication, but that is not their major goal.
- **Collaboration:** Some computer scientists collaborate with other scientific domains researchers, but not all. For an eSRE this is one of the core job competencies — collaboration is much more intense and crucial for the success of the collaborative projects.
- **Funding:** Computer scientists (especially to progress in their career) apply as PI for research projects funding as their core task. Sometimes also eSREs apply for funding, although usually together with a domain scientist as a PI. The Netherlands eScience center is a funding organization, hence many of the (junior) eSREs do not need to worry about acquiring funds. Although by doing their job excellently, the happy PIs are investing money for further future work together.

## What about the wolf?

It is not so important what the job title is, what is important is the **mission** behind it. I have enjoyed working as a computer scientist, but looking back — Europhlukes, my favorite project, could be considered an eScience project. Working closely with domain scientists can be very challenging, but also very rewarding.

> Using ICT expertise to enable breakthroughs in science for the good of society is very rewarding.

It seems that I haven’t changed my disposition, but I have changed into much more of a team player. If you are inspired by the possibilities to work [with](https://www.esciencecenter.nl/funding) the eScience Research Engineers or want to be [part of the team](https://www.esciencecenter.nl/about/careers), come to work with us!
