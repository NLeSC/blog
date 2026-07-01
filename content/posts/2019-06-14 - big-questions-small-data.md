---
layout: post
title: "big questions — small data."
author: Florian Huber
published: true
source: medium
tags:
  - Deep Learning
  - FAIR
  - Git
  - Health
  - NLP
  - Neural Networks
---

At the [eScience Center](https://www.esciencecenter.nl/) our mission is to **“digitally enhance science”**.  
How to do this other than by the biggest tech-superpowers of our time:  
super-computing, big-data, and of course: deep learning!  
But are these technologies suitable or even necessary for every scientific problem?

![](/assets/0_kuv6purwbawIwU37-22aa1350.webp)

Actual scientific research is often a lot less shiny. Actually, we also tend to work with smaller touch screens... Photo by Josh Hild on Unsplash

Our world, our universe, we ourselves are incredibly complex systems.  
And as no surprise this also means that the way we try to understand all of this is incredibly complex as well. And research technologies, paradigms, and philosophies are as diverse as one can imagine.

In this post I want to argue that it is all about finding or developing the **right techniques for the right problem**. For some that could indeed be buzzword-superpowers. But for most people in scientific research it is probably something less buzz-wordy…

## Hey Researcher! How much data have you got?

Seems like it’s all about ***big data*** nowadays… well not exactly.  
I’m coming from a physics and life-science background. More importantly, I spent a big part of my own research being an experimentalist. That means you start forming a hypothesis, think of an experiment to test it, and then you spend some months, some years, or even some decades on doing those experiments.

![](/assets/0_Rq9Nd5b7Em4_sCoB-c783816e.webp)

A modern library is a good metaphor. For some tasks you want to train a very deep neural network on all books in it (e.g. to gain deeper insides such as that a king that is female would be a queen, a very famous but misleading example from the field of natural language processing ). For other research questions it will be about finding the ONE right book that contains the answer (a specific biographical note, a mathematical proof, a previously overlooked footnote …). Photo by Sara Kurfeß on Unsplash

And there is quite a number of research fields where people work on experiments that are very hard to carry out AND that produce very little data. One datapoint at a time. I will always remember what a former colleague of mine said when she quit after her first year of postdoc:

> “It took me one year to get one datapoint! I think I don’t need to spend another year to get a second one.” (anonymous postdoc)

As you might guess, she left science and was indeed fairly frustrated by how little data she got. It’s important to note that she was very skilled, so it wasn’t her ‘fault’ that she collected the data so slowly. She was simply unlucky to work on an experiment that turned out to be a combination of difficult steps glued together. This meant that getting ***one*** successful experimental run, where everything worked out fine, was simply very unlikely.

What type (and amount) of data you need strongly depends on the research question and hypothesis that you want to address. To prove that not all swans are white, you only need one black swan. If you want to prove that birds shit onto your car more often than onto the car of your neighbor, you need to have proper statistics. And that means: many more datapoints!

Now speaking for life sciences only, the spectrum of possible scenarios is huge. For some types of experiments you can be happy if you gather **5 or 10** datapoints. For others you can hope to run **10s or 100s** of similar experiments (and hence also learn about the intrinsic randomness and noise of the data). Think of typical medical studies with 10s or 100s of patients or animals. **Not exactly BIG data!**

But sure, there are also cases where life science questions are tackled with much larger amounts of data. Large genetics studies, population wide screenings, automated, or semi-automated types of experiments.

## Big? Small? Tiny? And what about complex?

With the over-use of the term ‘big data’ it seems as if everything would be about whether your data is too small, or big enough. In reality, things are a lot more complicated. Not only do people not agree on how big is really BIG. There is also much more depth to the problem. Data can be more or less noisy, more or less ‘rich’, more or less ‘complex’.

You can have the age, name, and location of millions of people. That would maybe be big data, but not very complex. Or you could have high-resolution MRI scans from 20 patients, which would maybe not be considered big in the number of datapoints (every patient is one), but each collected sample is very complex and potentially contains a lot information (another way to classify big data are the [Four V’s](https://www.ibmbigdatahub.com/infographic/four-vs-big-data)).

## How to make most of your data?

In the tech world with the ongoing rise of deep learning techniques, it seems there is only one proper answer. DO DEEP LEARNING.

If you live in the machine-learning tutorial world you could even get the impression that people will laugh at you if you turn towards ‘old school’ machine-learning techniques. Deep learning is smarter, better, faster, and of course: much fancier and cooler!

To make things simple: Deep learning can be the ultimate super power if you have a clearly defined question and near-to-unlimited data. It works like a charm for the google-type of things in the world. And **IT CAN** also work for smaller datasets as well. But in those cases it:

1. Will not always work!
2. Will quite often not be the best solution.
3. Will need much more custom-tailoring.

In industry (and increasingly in the academic world as well) there is currently a strong tendency to dump ‘old-fashioned’ machine-learning and statistical tools to move on to deep learning models. Their main advantage is that they are very strong in finding the right way to treat complex data ‘themselves’. That means, we as researchers do not have to add complex rules, models, or hypotheses onto the input data. Seems great. But it really won’t work for many scientific use cases. If it is about rare events, or smaller datasets, or more complex types of questions (say, more complex than a simple classification task), deep learning models often perform very poorly.

And, surprise!  
In many such cases, very boring old-school methods like more traditional machine-learning techniques (support vector machines, random forests etc.) or even more old-fashioned: classical statistical tools, can do a much better job.

I am not trying to argue that there is no use for deep learning in academic research. There is, plenty even. But it is not the ultimate weapon. I’m sure it will do an unbelievable job for some cases (and an OK job for some others). But researchers need to be well-aware of its possibilities and limitations to use it for the right data, and the right research questions.

![](/assets/1_D2uZDKsjjb_kaqPX_x_zJw-1d63c8f5.jpeg)

Many examples from archeology illustrate nicely that it is often about extracting as much as possible from one or few samples. While modern machine-learning tools will have potential use for some of the tasks involved, it is clearly not feasible to simply run current cutting-edge NLP models on a few fragments of ancient writings. Depicted here: Oxyrhynchus papyrus (P.Oxy. I 29) showing fragment of Euclid’s Elements. See wikipedia.

## Final note: Make tiny data count.

The ideal industry use-case: plenty of data, plenty of compute power, simple classification task… is very far from most current and future scientific problems of interest. For research it will be key to put more effort into developing statistically sound models that can do great things, with little data.

Often this means custom-tailoring different techniques to fit the respective research question and available data. In most cases researchers will have very little use for the newest, cutting-edge 100-layer deep neural network architecture. They won’t have enough data to train it. And researchers have other needs than industry use cases. They will be happy to sacrifice a few percentage points in model accuracy for the gain of a much simpler and more intuitive algorithm or model architecture (see [blog post on explainability]( So, typically simplicity beats benchmarking.

Instead of simply reusing the latest benchmark winning networks, successful application of machine-learning and deep learning in research projects is more like this: Take a simpler, but still a little bit fancy-looking deep learning model for a sub-task, combine it with some ‘old-school’ machine-learning tools (say support vector machines or Bayesian network), and in the end use some good old basic statistics stuff from the 19th century.

Maybe a little less shiny and fancy, but that is often how we can make best use of **tiny data to be able to answer big questions**.
