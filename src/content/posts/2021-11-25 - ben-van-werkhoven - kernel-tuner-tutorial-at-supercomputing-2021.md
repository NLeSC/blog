---
layout: post
title: "Kernel Tuner tutorial at Supercomputing 2021"
date: 2021-11-25
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

SubscribeRemember me for faster sign in

For the hands-on sessions, we made use of [Google Colab](https://colab.research.google.com/?utm_source=scs-index), which allows anyone with a Google account to run Jupyter notebooks on Google’s cloud services. There are several providers of similar services, but the great thing about Colab is that you can get a virtual machine with a GPU, which is exactly what we need to get started with tuning GPU kernels. Colab turned out to be a great choice for the tutorial, because it can be accessed from a browser without the need for participants to install any software locally, nor do they have to be able to access their own GPU server from the conference network. Because Kernel Tuner is a Python-based tool, the participants could use it right away inside the Jupyter notebook environment and get started on the exercises.

![Kernel Tuner tutorial at Supercomputing 2021](/assets/kernel-tuner-tutorial-at-supercomputing--84aa09d9.jpeg)
Dr. Alessio Sclocco wrapping up the first hands-on session of the tutorial. Photo by Floris-Jan Willemsen.During the hands-on sessions, the attendees read about the exercises in the notebook at hand and attempt to solve small example problems. All four of us, including Stijn and Floris-Jan, were busy with answering questions from the attendees regarding the hands-on exercises.

The second session focused on how to start using Kernel Tuner to optimize existing GPU functions, or kernels, and how to correctly supply Kernel Tuner with the set of possible values for application parameters such as the number of threads per block and the number of thread blocks. Alessio introduced the concept of user-defined metrics that allow the user to instruct Kernel Tuner to calculate certain metrics that are relevant for the application, while it is being benchmarked on the GPU.

The third and fourth sessions introduced more complex concepts and features of the tool, including how to verify the output of all program variants during tuning and how to integrate auto-tuned GPU kernels into larger applications.

The response from the audience was really great. The room was as full as the COVID-19 measures would allow. The conference organizers even had to arrange for extra tables to allow all attendees to actively participate. During the lectures and hands-on sessions, we received many in-depth questions about the inner workings of Kernel Tuner and GPU code optimization techniques. We are very grateful for the opportunity to present our work at the Supercomputing conference and we look forward to organizing more tutorials on Kernel Tuner in the coming years.

The rest of the week, we enjoyed the Supercomputing conference where Floris-Jan Willemsen also presented his paper titled “Bayesian Optimization for auto-tuning GPU kernels” at the [Performance Modeling, Benchmarking and Simulation of High Performance Computer Systems (PMBS)](https://www.dcs.warwick.ac.uk/pmbs/pmbs/PMBS/Welcome.html) workshop.

![Kernel Tuner tutorial at Supercomputing 2021](/assets/kernel-tuner-tutorial-at-supercomputing--537de6ac.jpeg)
A view of St. Louis and the Gateway Arch from across the Mississippi river. Photo by Floris-Jan Willemsen.In case this blogpost has made you curious about the Kernel Tuner tutorial, we have some great news for you since all the tutorial materials, including the notebooks for the hands-on sessions, [are freely available online here](https://github.com/benvanwerkhoven/kernel_tuner_tutorial).

To find out more about Kernel Tuner, please see the [Kernel Tuner GitHub repository](https://github.com/benvanwerkhoven/kernel_tuner).

Funding acknowledgements: The Kernel Tuner tutorial has been made possible by the CORTEX and ESiWACE2 projects. The CORTEX project has received funding from the Dutch Research Council (NWO) in the framework of the NWA-ORC Call (file number NWA.1160.18.316). ESiWACE2 has received funding from the European Union’s Horizon 2020 research and innovation programme under grant agreement No 823988.
