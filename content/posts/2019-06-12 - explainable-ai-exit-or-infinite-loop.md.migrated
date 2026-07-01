---
layout: post
title: "explainable ai exit or infinite loop"
author: Sonja Georgievska
published: true
source: medium
tags:
  - Community
  - Deep Learning
  - GPU
  - Machine Learning
  - Neural Networks
  - Performance
---

> Let us simplify before we try to explain

![](/assets/0_SJOGsixtTuXLuT7p-0bbdb076.webp)

Photo by Franck V. on Unsplash

Before we start, let’s make it clear: by AI here I mean computational statistics, and by explainable — well, I don’t really know what I mean by that. This is because of a lack of a standard definition, just like there is no definition of (human) intelligence on which everyone agrees.

**The black box that gives the magic numbers**

![](/assets/0_wgh71PgpNMU7tonx-d189acd0.webp)

Photo by Farhan Siddicq on Unsplash

Explainable AI as a concept is as [old](https://en.wikipedia.org/wiki/Explainable_artificial_intelligence) as the field of AI. However, only recently it gained a lot of interest from researchers. The interest, of course, came due to the enormous boom that the technology called deep learning (DL) has made in public life. But also due to the way DL works. Namely, in the past, machine learning practitioners used to craft intuitively explainable features that represented the problem and the data. However, nowadays, it seems that all one needs is a lot of data, a GPU computing cluster, and time, for the deep neural network to come up with the magical numbers.

**Magic makes you feel out of control**

![](/assets/0_Mbz9uhZnei5ol2lm-6d9b045e.webp)

Photo by FuYong Hua on Unsplash

This is where the frustrations start for those that need to implement a trained network into practice. They are puzzled about how this technology solves the problem. Will they have any control over it when the conditions or the data change [slightly](https://openai.com/blog/adversarial-example-research/), will the performances stay the same? Will they have to deal with [lawsuits](https://en.wikipedia.org/wiki/Right_to_explanation) because the network made ridiculous mistakes in critical decisions?

**We need to be able to explain how it works**

Clearly, there is a lot of demand for explainable AI, no matter what exactly it is. Any ray of light in the complete darkness is better than no light at all. This arguably sparkled a whole new field called explainable AI. Which is good: with so much research going on, something useful must come out of it…. Right?

**Taking the high-speed train, but in which direction?**

![](/assets/0_dZCufW48zn80OKDf-d7ad172e.webp)

Photo by Free To Use Sounds on Unsplash

So, we try to craft models that explain how DL techniques work. But are we heading in the right direction? Aren’t things actually happening too fast? Namely, DL is taking precedence in practice so fast, that there was even no time so far [to develop a theoretical framework](https://sites.google.com/site/deeplearningtheory/) that captures its power and limitations. Nevertheless, we want it already to explain itself?!

**Once upon a time, there used to be *Occam’s razor***

> “All other things being equal, the simplest solution is the best” — a simple explanation of Occam’s razor

I studied computer science a while ago, but I believe that the main principles in designing a model/algorithm are still valid today: make your models simple and avoid too many parameters in your models. Something like Occam’s razor.

Translated to the DL world, this would mean: do not use more complex networks than you actually need for your problem. Otherwise, you are in the wild, and slight changes in the data distribution can lead to a ‘disaster’. Or, if not, then at least, the ‘explanation’ is lost in the abundance of [redundant](https://arxiv.org/abs/1803.03635) parameters.

However, at this moment rarely we consider optimizing the models. There is a simple reason: DL networks are so successful at solving particular problems, black box or not, that almost all attention of the research community goes into the front end, that is, application (and explainability therein).

**Without law, there is no crime**

In this situation, when we try to explain AI, we might be fixing cracks while making new ones. Namely, at the moment we have to rely on heuristics for explaining the DL results.

This means that eventually, we will need to define metrics to be able to compare the different heuristics, or *explainability models*, that have been proposed. [As it is usually the case](https://en.wikipedia.org/wiki/No_free_lunch_theorem), for every particular problem and dataset, and for every metric, a different model will outperform the rest. Then one will have to choose between different explainability models for her problem/data at hand. Then she will be asked to explain how she chose that particular model, “how can we trust it”? Then we will need to develop models that ‘explain’ the explainability models. And there we go forever and ever in an infinite loop…

> Ctrl+Alt+Del

(OK, I am exaggerating here;), but please bear with me, I am just trying to make a point … Did I make it, by the way?)

***Acknowledgments***

*Thanks to Carlos Martinez Ortiz, Janneke van der Zwaan, Maarten van Meersbergen***,** *Florian Huber, Patrick Bos, Tom Bakker, and Zvezdan Protic for proof-reading and for the useful comments.*
