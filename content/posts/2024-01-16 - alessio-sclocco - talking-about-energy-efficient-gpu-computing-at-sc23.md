---
layout: post
title: "Talking about energy-efficient GPU computing at SC23"
date: 2024-01-16
author: Alessio Sclocco
published: true
source: medium
source_url: https://blog.esciencecenter.nl/talking-about-energy-efficient-gpu-computing-at-sc23-c85d75fd3928
tags:
  - Community
  - Ethics
  - Floating Point
  - GPU
  - HPC
  - Optimization
---

1

November is the time for Supercomputing, or [SC](https://sc23.supercomputing.org/) as it is called nowadays, and in 2023 the largest High-Performance Computing (HPC) conference in the world took place in Denver, USA, from the 12th to the 17th of that month.

It was a week packed with talks, workshops, tutorials, exhibitors from all over the world, social gatherings, announcements and all of the usual SC glamour. While the eyes of the world were all pointed at the [TOP500](https://top500.org/) to see if Aurora would become the fastest supercomputer on the planet (spoiler: it did not; [Aurora sits at number 2 behind Frontier](https://www.hpcwire.com/off-the-wire/argonne-shares-strong-early-performance-numbers-for-aurora-supercomputer/)), there were many highlights of the conference.

![Talking about energy-efficient GPU computing at SC23](/assets/talking-about-energy-efficient-gpu-compu-ef98a387.jpeg)
Ben, Floris-Jan, Stijn, and Alessio standing with the SC23 logo at the Colorado Convention Center in Denver. Photo by Floris-Jan Willemsen.On the technical front, it is clear that Graphics Processing Units (GPUs) are here to stay, as they provide more than 70% of the total TOP500 FLOPs (Floating Point Operations per second); in other words, most of the computational power of the largest supercomputers in the world comes from GPUs.

With new systems being installed, GPUs from at least three different vendors (i.e. AMD, Intel, NVIDIA) being used, and [a dozen or so programming models available](https://dl.acm.org/doi/abs/10.1145/3624062.3624178) for programming them, one of the hottest topics of SC23 was performance portability.

Performance portability means that software written originally for one platform can not only run on a different platform but even provide comparable performance. This is a very important property for scientific software, which typically has a lifespan longer than that of the life of any modern supercomputer.

Another hot topic was energy efficiency. Being able to perform more work for the same energy budget, by increasing energy efficiency, is a societal issue that is becoming increasingly pressing in the HPC community. An entire workshop was dedicated to “Sustainable Supercomputing”, with discussions ranging from how to make code more efficient, to where to build a data center to utilize renewable energy. The workshop also highlighted how simply making users aware of the energy consumption of scientific code can have an impact, especially at the political level.

A small delegation from the Netherlands eScience Center comprised of Ben van Werkhoven, Alessio Sclocco, Stijn Heldens and Floris-Jan Willemsen attended SC23 to present a tutorial on “[Energy-Efficient GPU Computing](https://sc23.conference-program.com/presentation/?id=tut127&amp;sess=sess217)” on the first Sunday of the conference; the same engineers taught a tutorial about [Kernel Tuner](/kernel-tuner-tutorial-at-supercomputing-2021-d97444d6961a) at SC21 in St. Louis, USA. The new tutorial was also mentioned on a slide in the opening of the “[Ethics in HPC](https://www.hpcwire.com/2023/11/29/sc23-the-ethics-of-supercomputing/)” session, as further proof that energy and sustainability are pressing concerns of the SC community in 2023.

While energy efficiency in HPC is a broad topic, our focus was on what programmers can do to reduce the energy consumption, and thereby increase the efficiency, of their GPU code. The focus on GPUs does not only come from our expertise, but also reflects the fact that GPUs are what provide most of the computational power in current supercomputers.

![Talking about energy-efficient GPU computing at SC23](/assets/talking-about-energy-efficient-gpu-compu-abaffb9a.jpeg)
Ben teaching part of the tutorial. Photo by Floris-Jan Willemsen.The tutorial was structured into four parts, each consisting of a brief lecture followed by a hands-on session. We strongly believe that participants learn more effectively when they can immediately apply what they have learned.

The main takeaway of this first part could be summarized in the three action points for energy-efficient GPU code: (1) use energy-aware optimizations, (2) reduce data movement and (3) optimize clock frequencies.

The second part of the tutorial was all about improving the performance of GPU code, since code that runs faster often ends up consuming less energy for the same amount of work, thereby being more efficient.

After a lecture on GPU code optimizations, loosely based on a [paper](https://dl.acm.org/doi/full/10.1145/3570638) we published last spring, participants applied “kernel fusion” during the hands-on. This is an optimization that merges two GPU functions into one, in which it becomes apparent that optimizations can not only improve performance, but can also lower energy consumption.

The third part focused on reducing data movement, crucial for energy efficiency, through mixed precision programming. This technique uses lower precision data types to decrease the number of bytes required for data storage, at the cost of introducing numerical error in the results. Fortunately, this error can be kept within an acceptable error margin by utilizing Kernel Tuner’s new capabilities for accuracy tuning, resulting in code that is faster, more energy-efficient, and shows minimal numerical error. Additionally, we showcased [Kernel Float](https://github.com/KernelTuner/kernel_float), a C++ library developed by the eScience Center for mixed precision programming in NVIDIA CUDA. Participants had the chance to experiment with this in real GPU code during the hands-on session.

![Talking about energy-efficient GPU computing at SC23](/assets/talking-about-energy-efficient-gpu-compu-3c41024a.jpeg)
Stijn talking about mixed precision in front of the audience. Photo by Floris-Jan Willemsen.In the last part of the tutorial, we looked at how Kernel Tuner can be used to automatically tune power capping values and clock frequencies. While just improving performance is generally enough to improve the energy efficiency of a program, we also showed how finding the optimal GPU core frequency can further improve efficiency.

Moreover, based on the result of a [paper](https://ieeexplore.ieee.org/abstract/document/10024022) published last year, we also showed that by directing Kernel Tuner to use energy efficiency as its main metric in the search for the optimal configuration, it is possible to find the most energy-efficient configuration and even quantify the acceptable loss in performance to achieve it.

The tutorial was well attended, with over 30 participants, and the interaction with the audience was very positive, especially during the hands-on. We received many questions, and some participants have already contacted us online in the Kernel Tuner [discussion forum](https://github.com/orgs/KernelTuner/discussions). If you would like to know more about this tutorial, the [slides](https://github.com/KernelTuner/kernel_tuner_tutorial/blob/master/slides/2023_Supercomputing/SC23.pdf) we used are available online (for free), and using Google Colab you can also run the hands-on exercises that we prepared for the event.

Funding acknowledgments: the “Energy-Efficient GPU Computing” tutorial has been made possible by the CORTEX, COMPAS, and ESiWACE3 projects. The CORTEX project has received funding from the Dutch Research Council (NWO) in the framework of the NWA-ORC Call (file number NWA.1160.18.316). The COMPAS project has received funding from the Netherlands eScience Center (NLESC.OEC.2022.001). ESiWACE3 is funded by the European Union. This work has received funding from the European High Performance Computing Joint Undertaking (JU) and Spain, Netherlands, Germany, Sweden, Finland, Italy and France, under grant agreement No 1010930.
