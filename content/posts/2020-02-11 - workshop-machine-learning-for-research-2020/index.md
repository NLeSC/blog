---
layout: post
title: "Workshop Machine Learning for Research 2020"
author: Florian Huber
published: true
source: medium
source_url: https://blog.esciencecenter.nl/workshop-machine-learning-for-research-2020-39c4fc8218e8
tags:
  - Bayesian
  - Deep Learning
  - GPU
  - Machine Learning
  - Neural Networks
  - Physics
---

## For one full week we worked with 6 research teams from different disciplines to explore if and how machine learning could help them answer their research question(s). Here is a brief summary of what we did, how it went, and what we learned.

][Florian Huber]·Feb 10, 2020

2 
 DIALECT, Diabetes and Lifestyle Cohort Twente**** Team from: University of Twente and ZGT Almelo.
 Field: Medicine

The team from University of Twente and ZGT Almelo came to the workshop with a number of different data sets. The main work was done on diabetes type 2 patient data containing details on food intake. During the workshop, the team managed to experiment with many key machine learning techniques for such types of data.

3
** **Detection/Prediction of Freezing of Gait in Parkinson’s Disease**** Team from: University of Twente, Orikami, Radboud University 
 Field: Medicine

This team came with motion sensor data of patients with Parkinson’s disease. Motion data were recorded during a lab experiment during which patients experienced “freezing gait”: a sudden, brief episode of ineffective stepping also described “as if the feet are glued to the floor”. The aim was to classify motion sensor data as freezing of gait epochs in order to improve freezing of gait detection (and prediction) algorithms. The complex nature of the data gave the team the chance to build deep learning networks and work with techniques to handle unbalanced data sets, such as up-sampling.

4
 Identification of Source Types from Measured Vibration Signals**** Team from: TNO
 Field: Earth Sciences, Physics


Presentation of Davide Moretti from TNO on how they had assembled a really nice test data set on vibration signals (left). And presentation of Sanne van den Boom from TNO on the impressive results they got from their deep learning classifier at the end of the workshop.The team from TNO came with a really interesting data set on vibration signals. They had collected vibration signals from 20 different sources, which included sources such as earthquakes, traffic, drilling, but also bouncing of a ball, a running washing machine or jumping. Using a deep learning model, they were able to beat classical ML tools (random forests etc.) and in the end managed to classify the source types very well! From there the team started to explore Bayesian approaches as possible next steps.

5
 Early prediction of psychiatric problems in developing twins**** Team from: Leiden University
 Field: Medicine

Presentation by Anna van Duijvenvoorde from University of Leiden.This team of researchers from the University of Leiden used the week to explore whether the features they had collected, among others, from MRI scans could be used to make predictions on psychiatric problems. During the workshop, the team managed to apply a wide range of different machine learning techniques, including unsupervised clustering approaches that revealed interesting correlations and aspects within their patient data.

6Segmentation and Tracking of Single Cells from Live Cell Microscopy Images.**** Team from: TU Delft, AMOLF, Wageningen University
 Field: Life Sciences

This team was hoping to automate a very labor-intensive process which is an essential part of their research on living cells. Within those cells, the bacteria E. Coli are growing and dividing within microfludic chambers. To follow individual bacteria over longer periods of time, it is necessary to properly segment the light microscopy images. The group brought a nice dataset of time series of bacteria with a large number of hand-corrected masks which we then used as training labels. Using convolutional deep neural networks together with proper data augmentation techniques gave us very good results by the end of the workshop.

First results based on a CNN used for segmenting bacteria from phasecontrast microscopy images.

## Thanks to:

* All participants** and teams! We really had a great week and it was wonderful to see so much enthusiasm, curiosity and interesting research questions.
* All the **mentors,** who were really a driving force behind this workshop! Thanks to all of you for spending so much time mentoring, but also preparing the workshop in advance and reviewing the numerous applications.**Mentors were: [Sonja Georgievska,] Christiaan Meijer, Jaro Camphuijsen [Patrick Bos], Meiert Grootes, Cunliang Geng, Erik Tjong Kim Sang, Faruk Diblen, [Dafne van Kuppevelt], [Felipe], Bouwe Andela, Maxwell Cai, [Florian Huber,] [Jisk Attema].
* SURF,** which provided key infrastructure for this workshop. A lot of the model training was done using Jupyter notebooks that were running on GPUs from LISA. Also thanks Maxwell (SURF) for joining us as a mentor and giving a great first day introduction to ML.
* **eScience Center and SURF staff** for helping to set-up and manage the workshop (special thanks to Sacha van Breugel, Mateusz Kuzak, Carlos Martinez, Tom Bakker, Frank Seinstra, Johan Rheeder, Kim-Anh Holthaus).
* **Peter Steinbach** from HZBR, Germany, who gave me the idea to initiate this workshop. Generously shared his own experiences and helped to brainstorm. [Here details on their deep learning hackathon in 2019.](https://indico.mpi-cbg.de/event/186/overview)

### [**→ Go on to read part 2/2 on our workshop evaluation: how did it work?**](/workshop-machine-learning-for-research-2020-did-it-work-4c178f9dbb14)
