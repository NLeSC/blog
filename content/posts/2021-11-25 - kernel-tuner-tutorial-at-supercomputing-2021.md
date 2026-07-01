---
layout: post
title: "Kernel Tuner tutorial at Supercomputing 2021"
author: Ben van Werkhoven
published: true
source: medium
source_url: https://blog.esciencecenter.nl/kernel-tuner-tutorial-at-supercomputing-2021-d97444d6961a
tags:
  - Bayesian
  - Benchmarking
  - Environment
  - GPU
  - Git
  - Optimization
---

![](/assets/1_msfW7zq3-awfNStVOT-xBQ-893acb07.jpeg)

A view of St. Louis from the Gateway Arch. Photo by Floris-Jan Willemsen.

November 2021 — Together with my colleagues, Alessio Sclocco, Stijn Heldens, and Floris-Jan Willemsen, we travelled to the latest edition of the [Supercomputing conference](https://sc21.supercomputing.org/), SC21, in St. Louis, USA, to give a tutorial.

The goal of the tutorial was to teach Supercomputing attendees how to use [Kernel Tuner](https://github.com/benvanwerkhoven/kernel_tuner), a tool that is being developed at the Netherlands eScience Center to assist in the development of highly-optimized applications for Graphics Processing Units (or GPUs). These GPUs form the primary source of compute power in many of today’s supercomputers. However, optimizing applications to run efficiently on GPUs can be challenging, and that’s where Kernel Tuner comes into play.

The tutorial was divided into four sections, each consisting of a short presentation followed by a hands-on session, in which the attendees get to practice using the tool on some of the example codes that we provided.

![](/assets/1_ModR0KTUHXWxS-IlCs0f_A-4f639c67.jpeg)

Dr. Ben van Werkhoven presenting at the Kernel Tuner tutorial at SC21. Photo by Floris-Jan Willemsen.

The first session explained the problem that Kernel Tuner is aiming to solve, namely the problem that creating GPU applications with optimal performance is a bit like trying to find a needle in a haystack. This is because the developer has a great number of choices to make when creating a GPU application. These choices won’t affect the outcome of the program, but they can have a dramatic impact on the time it takes to perform the computations. All implementation choices combined create a huge program design space of potential implementations that all compute the same thing, but in different ways. Using several examples, I explained that while using auto-tuning to optimize GPU applications may be a complex process, it can also be really rewarding when you find those few configurations that outperform all others by a large margin.

For the hands-on sessions, we made use of [Google Colab](https://colab.research.google.com/?utm_source=scs-index), which allows anyone with a Google account to run Jupyter notebooks on Google’s cloud services. There are several providers of similar services, but the great thing about Colab is that you can get a virtual machine with a GPU, which is exactly what we need to get started with tuning GPU kernels. Colab turned out to be a great choice for the tutorial, because it can be accessed from a browser without the need for participants to install any software locally, nor do they have to be able to access their own GPU server from the conference network. Because Kernel Tuner is a Python-based tool, the participants could use it right away inside the Jupyter notebook environment and get started on the exercises.

![](/assets/1_IPaVLwyMntpH4XpMhNToRw-4da126f0.jpeg)

Dr. Alessio Sclocco wrapping up the first hands-on session of the tutorial. Photo by Floris-Jan Willemsen.

During the hands-on sessions, the attendees read about the exercises in the notebook at hand and attempt to solve small example problems. All four of us, including Stijn and Floris-Jan, were busy with answering questions from the attendees regarding the hands-on exercises.

The second session focused on how to start using Kernel Tuner to optimize existing GPU functions, or kernels, and how to correctly supply Kernel Tuner with the set of possible values for application parameters such as the number of threads per block and the number of thread blocks. Alessio introduced the concept of user-defined metrics that allow the user to instruct Kernel Tuner to calculate certain metrics that are relevant for the application, while it is being benchmarked on the GPU.

The third and fourth sessions introduced more complex concepts and features of the tool, including how to verify the output of all program variants during tuning and how to integrate auto-tuned GPU kernels into larger applications.

The response from the audience was really great. The room was as full as the COVID-19 measures would allow. The conference organizers even had to arrange for extra tables to allow all attendees to actively participate. During the lectures and hands-on sessions, we received many in-depth questions about the inner workings of Kernel Tuner and GPU code optimization techniques. We are very grateful for the opportunity to present our work at the Supercomputing conference and we look forward to organizing more tutorials on Kernel Tuner in the coming years.

The rest of the week, we enjoyed the Supercomputing conference where Floris-Jan Willemsen also presented his paper titled “Bayesian Optimization for auto-tuning GPU kernels” at the [Performance Modeling, Benchmarking and Simulation of High Performance Computer Systems (PMBS)](https://www.dcs.warwick.ac.uk/pmbs/pmbs/PMBS/Welcome.html) workshop.

![](/assets/1_GVZ3jeEm-_QWClVazkrQ2g-684ffc76.jpeg)

A view of St. Louis and the Gateway Arch from across the Mississippi river. Photo by Floris-Jan Willemsen.

In case this blogpost has made you curious about the Kernel Tuner tutorial, we have some great news for you since all the tutorial materials, including the notebooks for the hands-on sessions, [are freely available online here](https://github.com/benvanwerkhoven/kernel_tuner_tutorial).

To find out more about Kernel Tuner, please see the [Kernel Tuner GitHub repository](https://github.com/benvanwerkhoven/kernel_tuner).

Funding acknowledgements: The Kernel Tuner tutorial has been made possible by the CORTEX and ESiWACE2 projects. The CORTEX project has received funding from the Dutch Research Council (NWO) in the framework of the NWA-ORC Call (file number NWA.1160.18.316). ESiWACE2 has received funding from the European Union’s Horizon 2020 research and innovation programme under grant agreement No 823988.
