---
layout: post
title: "A letter to my parents about my experience in a machine learning consultancy project"
date: 2022-04-14
author: Sven van der Burg
published: true
source: medium
source_url: https://blog.esciencecenter.nl/a-letter-to-my-parents-about-my-experience-in-a-machine-learning-consultancy-project-aa5520d63329
tags:
  - Collaboration
  - Git
  - Health
  - Machine Learning
  - RSE
---

**SubscribeRemember me for faster sign in

One of the problems they face in the clinic is how to objectively determine how severe such a movement disorder is and how it progresses over time. This is important to know because it helps the doctors pick the right treatment, or give them an idea about whether a treatment is working. In one such method a video of the patient is recorded. The video is then observed by a doctor who is trained to carefully look at the movements of the body. The doctor gives a score between 0 and 4 for how bad a particular set of symptoms is in a particular body part. For example, the doctor could rate the symptoms in the left lower arm as a 3. If, for example, after a year of medical treatment this score goes to 1 this indicates that the treatment is working.

Now the problem is that it is quite difficult to score the symptoms of a patient. Different doctors tend to look at different things. Even the same doctor looking at the same video could give a low score on an optimistic day, and a high score on a pessimistic day. Also, it takes a lot of time for the doctors to do this correctly, time that is better spent on care for the patients instead of looking at videos. So, the doctors would be helped a lot if the scoring of these videos could be done automatically by a computer. Together with my eScience Center colleagues Florian Huber and Sonja Georgievska we set out to help Helga and her colleagues from the Amsterdam UMC.

In most of the projects at the eScience Center we build computer programs with input from the domain scientists we work together with. These are long projects, taking at least 2 years. But in this project (the so-called Small-Scale-Initiative Machine Learning project) we only had half a year in which we mostly gave advise on the activities that the researchers perform themselves. The good thing is that this is exactly what Helga needed: technological expertise. And by doing projects in such a way we could actually not just help Helga and her colleagues, but also 11 other such projects from a diverse range of scientific disciplines.

How did we help Helga and her colleagues? We mostly gave advise on a technique called ‘Machine Learning’. It is a technology that teaches a computer how to do a task by showing it examples of how to do it. In our case, the computer had to learn how to give a score between 0 and 4 indicating how bad the symptoms of a movement disorder are in the patient in the video. We managed to teach the computer how to do it reasonably well, although there is still some work needed before doctors can start using this technique. You can see our results in our [Github repository](https://github.com/RehabAUmc/modys-video) (I might explain more about Github in another letter 😉). We are also working on writing our conclusions down in a scientific article (@dad** I hope we get as much attention as [you got in the glory of your soil-researching period](https://library.wur.nl/ojs/index.php/njas/article/view/16546)).

What I most enjoyed in this project is the fruitful collaboration that we had. I think Helga and her colleagues learned a lot from the technological expertise we could offer. Helga even started to (successfully) do more programming herself. But the other way around we learned a lot about how to apply machine learning techniques in a clinical setting. We even got a tour around Helga’s department where she showed us all the devices that they use to investigate movement disorders.

I hope this gives you a bit of a feeling for what I do at the Netherlands eScience Center.

Lots of love,

Sven
