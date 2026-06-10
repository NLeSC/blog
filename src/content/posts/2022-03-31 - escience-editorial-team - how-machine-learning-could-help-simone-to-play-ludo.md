---
layout: post
title: "How machine learning could help Simone to play Ludo"
date: 2022-03-31
author: eScience Editorial Team
published: true
source: medium
source_url: https://blog.esciencecenter.nl/how-machine-learning-could-help-simone-to-play-ludo-fab95721580a
tags:
  - uncategorized

---

SubscribeRemember me for faster sign in

We also received help from the [Netherlands eScience Center](https://www.esciencecenter.nl/) within the ‘Open Call for Small-Scale Initiatives in Machine Learning’. Within this project called ‘Automated video-based movement assessment using machine learning to support personalized treatment of movement disorders’, we focus on the option to use videos. We use stick figure movies extracted from real videos.

![How machine learning could help Simone to play Ludo](/assets/how-machine-learning-could-help-simone-t-9cfec5f2.png)
Real videos were selected from other projects, that had have been scored by the doctor for involuntary movements (dystonia) for the arms and legs. With these data we trained machine learning models to predict dystonia automatically.

Using machine learning within the field of clinical movement analysis was something new for us, as not only the content was new, but also the style of working with stand-up meetings and sprints, sharing codes on Github and right away publishing our dataset. We gained new knowledge and skills that brings us a step forwards to find a way to measure children with dyskinetic cerebral palsy within their home environment.

We are very excited about the results from a random forest regressor, “a traditional machine learning model” as such a model is called in the language used in machine learning world ;-) See figure for the result: the true score by the doctor is plotted against the predicted value by the model. All scores on the diagonal line are predicted completely correct. The model is not perfect yet, but it shows the potential of the method and we are looking very much forward to further improve it.

![How machine learning could help Simone to play Ludo](/assets/how-machine-learning-could-help-simone-t-6e87b0c4.png)
Within our projects we work within a group of clinicians, researchers and software engineers from the [Amsterdam UMC](https://www.amsterdamumc.org/en/research/organization/about-amsterdam-umc.htm) (Annemieke Buizer, Laura Bonouvrié, Marjolein van der Krogt, Helga Haberfehlner, Shankara van der Ven, Dylan den Hartog), from the TU Delft (Jaap Harlaar), from [Moveshelf](https://moveshelf.com/) (Ignazio Aleo, Johannes Gijsbers) and the [Netherlands eScience Center](https://www.esciencecenter.nl/) ([Sven van der Burg](https://www.esciencecenter.nl/team/sven-van-der-burg/), Florian Huber and [Sonja Georgievska](https://www.esciencecenter.nl/team/dr-sonja-georgievska/)).

If you are interested in more technical details please have a look at our [stick figure dataset](https://zenodo.org/deposit/5638470). All contribution to our [code](https://github.com/RehabAUmc/modys-video) is welcome, to help Simone to play Ludo without overthrowing the tokens!
