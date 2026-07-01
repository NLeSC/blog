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

*What does a Research Software Engineer do? This is not always easy to answer, but when your parents are asking, you definitely want to give a nice answer*

![A fountain pen writing on a piece of paper.](/assets/1_yseerb7z2bld7brhdY2y1A-0749df51.jpeg)

A fountain pen writing on a piece of paper.

Dear Mum and Dad,

I always wonder how you picture my daily work at the Netherlands eScience Center. Probably you imagine me sitting behind a computer all day. I think you know by now that I also sometimes talk to scientists, mostly from the healthcare domain. To give you a better feeling of the kind of things I do I decided to write you about my experience in the *Automated Video-based Assessment of Movement Disorders* project.

Automated Video-based Assessment of Movement Disorders… That is a mouth full of words. Let me try to explain what I did in this project.

This project is in collaboration with [Helga Haberfehlner](https://www.amsterdamumc.org/en/research/researchers/helga-haberfehlner.htm) and her colleagues who work at the Department of Rehabilitation medicine of the Amsterdam UMC. Helga is a kind, energetic, and passionate researcher who is trying to improve the diagnosis and treatment of movement disorders in children.

One of the problems they face in the clinic is how to objectively determine how severe such a movement disorder is and how it progresses over time. This is important to know because it helps the doctors pick the right treatment, or give them an idea about whether a treatment is working. In one such method a video of the patient is recorded. The video is then observed by a doctor who is trained to carefully look at the movements of the body. The doctor gives a score between 0 and 4 for how bad a particular set of symptoms is in a particular body part. For example, the doctor could rate the symptoms in the left lower arm as a 3. If, for example, after a year of medical treatment this score goes to 1 this indicates that the treatment is working.

Now the problem is that it is quite difficult to score the symptoms of a patient. Different doctors tend to look at different things. Even the same doctor looking at the same video could give a low score on an optimistic day, and a high score on a pessimistic day. Also, it takes a lot of time for the doctors to do this correctly, time that is better spent on care for the patients instead of looking at videos. So, the doctors would be helped a lot if the scoring of these videos could be done automatically by a computer. Together with my eScience Center colleagues Florian Huber and Sonja Georgievska we set out to help Helga and her colleagues from the Amsterdam UMC.

In most of the projects at the eScience Center we build computer programs with input from the domain scientists we work together with. These are long projects, taking at least 2 years. But in this project (the so-called Small-Scale-Initiative Machine Learning project) we only had half a year in which we mostly gave advise on the activities that the researchers perform themselves. The good thing is that this is exactly what Helga needed: technological expertise. And by doing projects in such a way we could actually not just help Helga and her colleagues, but also 11 other such projects from a diverse range of scientific disciplines.

How did we help Helga and her colleagues? We mostly gave advise on a technique called ‘Machine Learning’. It is a technology that teaches a computer how to do a task by showing it examples of how to do it. In our case, the computer had to learn how to give a score between 0 and 4 indicating how bad the symptoms of a movement disorder are in the patient in the video. We managed to teach the computer how to do it reasonably well, although there is still some work needed before doctors can start using this technique. You can see our results in our [Github repository](https://github.com/RehabAUmc/modys-video) (I might explain more about Github in another letter 😉). We are also working on writing our conclusions down in a scientific article (**@dad** I hope we get as much attention as [you got in the glory of your soil-researching period](https://library.wur.nl/ojs/index.php/njas/article/view/16546)).

What I most enjoyed in this project is the fruitful collaboration that we had. I think Helga and her colleagues learned a lot from the technological expertise we could offer. Helga even started to (successfully) do more programming herself. But the other way around we learned a lot about how to apply machine learning techniques in a clinical setting. We even got a tour around Helga’s department where she showed us all the devices that they use to investigate movement disorders.

I hope this gives you a bit of a feeling for what I do at the Netherlands eScience Center.

Lots of love,

Sven
