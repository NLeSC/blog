---
layout: post
title: "How to find your rubber duck: Using machine learning to understand a changing sea"
author: eScience Editorial Team
published: true
source: medium
source_url: https://blog.esciencecenter.nl/how-to-find-your-rubber-duck-using-machine-learning-to-understand-changes-in-the-wadden-sea-7c10da354e24
tags:
  - Containers
  - Machine Learning
  - Neural Networks
---

Subscribe*Remember me for faster sign in

To get a quick start, they applied for the eScience Center Small-Scale Initiative (SSI), and were awarded consultancy on their project titled “Machine Learning for the complex response of the Wadden Sea*”. A first goal for the group was to determine what can machine learning actually do and which machine learning tools the group would need for this to happen. After all, machine learning is not magic. The group found great discussion partners in the eScience Center engineers.

They decided to focus on two main questions: First, if machine learning can predict the daily averaged state of the Wadden Sea if we know the forcing. Second, if we can predict the trajectories of particles in the Wadden Sea with machine learning.

The most suitable tool to answer these questions were Long short-term memory (LSTM) artificial recurrent neural network (RNN). Using LSTM is essential because the current state of the Wadden Sea not only depends on the current forcing (e.g., the wind); it also depends on the history of the system. The engineers at ESC have helped to set up the first models.

## One additional complication: particle trajectories are chaotic

It is well known that particle trajectories in the ocean are chaotic. This means that two particles starting close together (either in time or space) will eventually have very different trajectories. In fact, one of the first observations of this phenomenon are due to cargo falling out of ships (just like it happened in 2021 in the North Sea). In 1992, a cargo ship container tumbled into the North Pacific, dumping 28,000 rubber ducks and other bath toys. These rubber ducks ended up in beaches all around the world in, for example, Hawaii, Alaska, Chile, Ireland.

![How to find your rubber duck: Using machine learning to understand a changing sea](/assets/how-to-find-your-rubber-duck-using-machi-0e922506.png)
*A few of the particles released close to the sluice in Den Oever on May 1st, 2009. The particles start very close together but end up in very different places after a few days.*One of the open questions that the group is currently exploring is up to which point machine learning can be used to capture chaotic particle trajectories.

We are excited to see future outcomes of this project and would like to thank Dr. Matias Duran Matute and his colleagues for this contribution to our blog.
