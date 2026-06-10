---
layout: post
title: "A Tale of Tallness"
date: 2024-05-28
author: Erik Tjong Kim Sang
published: true
source: medium
source_url: https://blog.esciencecenter.nl/a-tale-of-tallness-ade0a82a2380
tags:
  - Collaboration
  - Databases
  - Health
  - RSE
---

In the past two centuries, the Dutch have become the tallest people of the planet. What factors caused this remarkable development? This is the central research question in the work of [Björn Quanjer](https://www.ru.nl/en/people/quanjer-b) of Radboud University of Nijmegen. In May 2024, he completed a comprehensive study involving data of thousands of subjects covering the period 1850–1950.

![A Tale of Tallness](/assets/a-tale-of-tallness-f4a1acee.jpeg)
Björn Quanjer (right) defending his PhD thesis in Nijmegen on Wednesday 1 May 2024. The presented slide shows the researcher superimposed on a picture next to his grandfather (right) to indicate the gain of the heights of Dutch men in the past century

## Phd defense

Björn Quanjer is a member of the project [REE-HDSC](https://research-software-directory.org/projects/ree-hdsc), Recognizing Extracted Entities for the Historical Database Suriname Curaçao, a collaboration between the Netherlands eScience Center and Radboud University Nijmegen. On Wednesday 1 May 2024, he successfully defended his PhD thesis [The Tale of Tallness](https://www.ru.nl/en/research/research-news/what-height-says-about-the-development-of-our-prosperity-and-health), receiving the distinction cum laude. It was the first time since 1987 that this distinction had been awarded to a researcher in his field in Nijmegen.

![A Tale of Tallness](/assets/a-tale-of-tallness-8b19776a.jpeg)
Average height of Dutch males at conscription (blue line) and at adult age (black line) for birth years between 1815 and 1955 (Figure 1.3 of Björn Quanjer’s thesis, reused with permission)

## Data

Quanjer’s study uses the [Historical Sample of The Netherlands](https://iisg.amsterdam/en/hsn/data), a dataset which contains life courses for a sample of about 0.5% of the Dutch population born between 1850 and 1922. The life courses are based on birth, marriage and death certificates from the Dutch civil registry. They also include military conscription records from the provincial archives, which are central to this study. At the time, all young Dutch men were checked for military service, so their height was registered in these records. Because women were exempt from military service, the study is restricted to the height developments of Dutch men.

The study deals with several data challenges. For example, did the lower participation of the elite in the conscription have an effect on the measured heights? Quanjer shows with statistical tests that the effect was small. Furthermore, how can we model the effect of childhood illness on height without data on illness? Quanjer models illness by death: if the people around a Dutch person die (parents, siblings, neighbors), the chance that the person has experienced severe health problems is higher.

![A Tale of Tallness](/assets/a-tale-of-tallness-4b69176a.jpeg)
Relation between birth order and average conscription height of Dutch males (blue line): boys born later in large families are taller than their older brothers (Figure 3.4 of Björn Quanjer’s thesis, reused with permission)

## Results

Quanjer’s study provides several interesting observations. Losing a mother at the age of 5–12 proved to have a negative effect on conscription height compared with siblings that lost their mothers on a different age. However losing a father at that age had an opposite effect: these children were taller at conscription. Growing up in a family with many children can have a negative effect on height (fewer resources per child) but you have to consider that the older children can contribute to the family income. For this reason the younger children of large families were taller at conscription than their older siblings.

## Current developments

Unlike other studies on height development, Quanjer investigates several variables that could have an effect on heights: genetics, nutrition, health, family size, mortality, wealth and life events. An interesting open question that he addresses in his final chapter, is whether historical heights can be used as a proxy for any of these variables. Given the correlation between health, wealth and height, we should be concerned about the recent stagnation in the rise of heights of the Dutch. Quanjer names the current rise of obesity and purchase inequality as possible causes.

> 

Björn Quanjer, [A Tale Of Tallness. A household perspective on early life determinants of male height within the Netherlands between 1850 and 1950](https://repository.ubn.ru.nl/handle/2066/300359). PhD thesis, Radboud University Nijmegen, 2024.

Björn Quanjer, [Hoe welvarender het land, hoe langer zijn inwoners](https://www.nporadio1.nl/fragmenten/nieuwsweekend/9c0422d1-7fa4-45b5-9729-ff9b5d8d4378/2024-05-11-hoe-welvarender-het-land-hoe-langer-zijn-inwoners). Interview Nieuwsweekend, Omroep MAX, Radio 1, 11 May 2024 09:50 (in Dutch).
