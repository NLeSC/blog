---
layout: post
title: "Using machine learning to tell apart rain, snow, hail and fog from cell tower data"
author: eScience Editorial Team
published: true
source: medium
source_url: https://blog.esciencecenter.nl/using-machine-learning-to-tell-apart-rain-snow-hail-and-fog-from-cell-tower-data-6ab856c99f8b
tags:
  - Machine Learning
  - Neural Networks
  - Research Software
---

# **Using machine learning to tell apart rain, snow, hail and fog from cell tower data**

][eScience Editorial Team]·Apr 21, 2022

Next, **we explored whether CMLs can be used to detect **fog**. Fog consists of droplets so small that they float in the air up to a few meters above the ground. The disdrometers do not pick up fog accurately enough to be used as target dataset. For this reason, we used an alternative target dataset to detect fog.

Figure 3: CML attenuation signal (red) and target dataset (fog/no fog in blue) model fog prediction (fog/no fog in black) model fog threshold (dashed gray) for 31 August 2015.The relatively round fog droplets can scatter a wide range of wavelengths smaller than the droplets themselves. This includes visible light, making fog… foggy. Fog also affects wavelengths within the near-infrared range. Luckily, the experimental setup of the measurement campaign also included a near-infrared link (Figure 1), which we use as reference dataset of the foggiest time steps. Comparing the fog time series and the CML signal reveals a distinct drop of the CML signal which coincides with the fog occurrence (Figure 3). **Once again we balance the dataset because the moments without fog far outnumber the fog events. After balancing the dataset and feeding the raw CML data into the McFly** algorithm, the result is a mere 49% accuracy. For a balanced two-class dataset, this is not better than just tossing a coin…

It appears that the raw data for each individual time step is not enough to create a neural network that detects fog. However, the attenuation signal in the CML data shows a pattern associated with fog. This pattern changes over time, but **McFly** does not automatically take the time dimension into consideration. Hence, to account for the temporal aspects, a rolling rate of change of the CML attenuation signal over 15 minutes is included for every time step as input to **McFly**. On its own, this input value could be used to gain a validation accuracy of 67%, but combining it with the raw CML data brings it up to 73%. As a next step, we include additional inputs to the machine learning model to represent the time of the day and a time of the year, to allow the neural network to learn the climatology of fog. On its own, this correctly predicts fog 60% of the time steps, but when combined with the other data, the validation accuracy reaches 77%, which is a promising first step towards detecting not only rain, but also fog with CMLs.

This blog is part of our blog series: The Small-Scale Initiative on Machine Learning, how did it go?, *where groups who were invited to participate in a project with eScience Center Research Software Engineers write about their projects and their experience.
