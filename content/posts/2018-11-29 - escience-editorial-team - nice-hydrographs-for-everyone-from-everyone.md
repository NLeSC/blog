---
layout: post
title: "nice hydrographs for everyone from everyone"
date: 2018-11-29
author: eScience Editorial Team
published: true
source: medium
tags:
  - Community
  - Containers
  - Environment
  - Python
  - RSE
  - Reproducibility
---

![](/assets/1_N3tLDW1E26SIaXiq52OOiA-043872bb.jpeg)

## “Nice hydrographs! Can you now compare your model to ‘that other hydrology groups model’?”

The phd student suppresses the urge to roll her eyes. Her supervisor is asking her to go back into code-hell. That other model is written in Fortran and she works in Python. It took her two months to get the Python model used in her group running in the first place. Realizing she needed to install an obtuse library on her computer needed by a hidden part of the hydrological model that the post-doc who left science four months ago had added took her two weeks alone. She doesn’t look forward to installing an other institutes favorite model just to compare its output to hers. It will mean getting back behind the computer working on getting someone else’s code to run and not on using her hydrology skills for a few more weeks.

![](/assets/1_tWlNAgC9-9vdCsZ0TLo_oA-6b031d8b.jpeg)

> “Most computational hydrology is not reproducible, so is it really science?”

Scientifically her supervisor is right, of course. If a hydrologist improves an existing model ideally one would not only like to compare the model output to observations, but also to other models. However, running someone else’s model is often a pain. It is no coincidence that model comparison papers often involve all the groups responsible for the different models being run in the study.

As Chris Hutton et. al. said in an opinion paper: “Most computational hydrology is not reproducible, so is it really science?”(\*1). In the ensuing discussion Nick van de Giesen (Delft University of Technology), Niels Drost (Netherlands eScience Center) and I argued that to increase the reproducibility, but also the reusability, of hydrologic models we should present them in such a way that they can be run independent of a local computer, ie. in virtual machines or the lightweight equivalent: containers. In the [eWaterCycle II project](https://www.ewatercycle.org/) we are putting our money(\*2) where our mouths are and are building a system that easily lets hydrologist do just that.

![](/assets/1_jf64V268zNb931xeV3rJFA-ea9780e5.jpeg)

The goal we have for the eWaterCycle II project is to provide the hydrological community with tools that:

- Allow the use of a wide variety of models, written in different programming languages, without having to learn those languages.
- Run models needing large amounts of memory and CPUs.
- Have access to all the relevant datasets from the community (forcing, observations).
- Allow advanced use cases such as data assimilation and model coupling studies.
- Allow the sharing of models with the entire community, both for citing (DOIs) and re-use.

Ultimately providing hydrologists with a toolset that allows them to run each other models, but also adept, couple, and in general tinker with models without the headache of having to delve into each others detailed code.

![](/assets/1_Q9Doww3A-kIupuUuzH099Q-34d746b1.jpeg)

![](/assets/0_BSs-A7UD4LvwfBWG-6c9dabfc.png)

## Minimum Viable Product

Currently six months into this three year project, we have created a “minimal viable product (MVP)(\*3)”, a first, duck-taped version of what we intend to build. To gauge in the hydrological community if we’re moving in the right direction. In our MVP scientists can:

- Get started with modelling without installing a single piece of software(\*4).
- Run any of the available models within minutes.
- Develop code quickly in a notebook environment.

![](/assets/1_DEyuHeBBPaQ7-nncEKRm1g-96d0192c.jpeg)

The MVP currently runs on a cloud computer with limited compute and is far from production ready, so access is restricted to project members. Medio 2019 we intend to deploy the system on more robust infrastructure and open up the environment for the entire hydrological community to try out. The video below shows a screencast of the MVP in action. In it we select a model from our experiment finder. We automatically generate a jupyter notebook with python code that runs the model and plots a hydrograph. The model is not part of the notebook: it is a process in a separate container that talks to the notebook.

“Minimum Viable Product” demo.

## A future where hydrologist can produce reproducible results

Had the model of ‘that other hydrology group’ be in our system, than the phd student from the start of this blog wouldn’t have to despair: three clicks and she could have looked at a hydrograph. Our MVP allows hydrologist to quickly run pre-existing models, compare outputs of different models and change the model state during the run to do experiments. We hope that our project contributes to a future where hydrologist can produce reproducible results and thus can build on each others work more easily. If you would like to be amongst the first to work with the our system, if you want to add your model to it, or if you just want to provide us feedback please let us know in a comment below!

![](/assets/1_oihdbRG9rcIx6DBuXdm1gA-4a0e2f89.jpeg)

The eWaterCycle project team, from left to right: Jerom Aerts (Delft University of Technology), Maarten van Meersbergen (eScience Center), Rolf Hut (Delft University of Technology), Yifat Dzigan, Inti Pelupessy, Berend Weel and Martine de Vos (eScience Center), Toju Babalola ( Federal University Oye-Ekiti, Nigeria), Niels Drost, Gijs van den Oord and Ben van Werkhoven (eScience Center)

> **About eWaterCycle II  
> **Understanding water movement on a global scale is essential for society to predict floods, droughts and the effect of land use on water balance. However, large scale hydrology is difficult because, from a hydrological point of view, every field, every street, and every part of the world is unique. We are able to understand and describe how water moves in these locations at a local scale, but due to the extreme spatial variability it is difficult to capture such processes at a global scale. We call this the curse of locality.
> 
> On top of this, existing hydrological models exist in a huge variety of programming languages, standards etc. which limits their re-usability and reproducibility. In the eWaterCycle II project, we are developing a framework in which hydrological modellers can work together in a collaborative environment.  
> [www.ewatercycle.org](https://www.ewatercycle.org/)

1. Hutton, C., T. Wagener, J. Freer, D. Han, C. Duffy, and B. Arheimer (2016), Most computational hydrology is not reproducible, so is it really science?, Water Resour. Res., 52, 7548–7555, doi: 10.1002/2016WR019285.
2. Well, our funders money, but you get the point.
3. A method of developing copied from start-up culture and software development. One of the benefits of working with a multidisciplinary team of experts is that they provide one with new ways of approaching a project.
4. Well, ok, a web browser.
