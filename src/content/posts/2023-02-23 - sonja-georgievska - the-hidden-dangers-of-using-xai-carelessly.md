---
layout: post
title: "The hidden dangers of using XAI carelessly"
date: 2023-02-23
author: Sonja Georgievska
published: true
source: medium
source_url: https://blog.esciencecenter.nl/the-hidden-dangers-of-using-xai-carelessly-88f1d5fc3432
tags:
  - Collaboration
  - Training
---

This means that in general, we can’t use the SHAP values of pre-processed features to represent the importance of the original features. (In general*: to be precise, specific variants of SHAP, like [BShap](https://arxiv.org/pdf/1908.08474.pdf), do allow for specific *affine* transformations of the features — like transforming Celsius to Fahrenheit — a property called *affine scale invariance.)*

With multi-variate transformations like PCA, the original features are even gone.

You might be tempted to play with the SHAP values of the pre-processed features to get “SHAPpy” values for the original features.

But what about the additivity property? Will the sum of the post-processed “SHAPpy” values of each feature for a given observation give the difference between the full model prediction and the null model prediction? Probably not.

This means that the “SHAPpy” values lose their original meaning. So,

> 

using SHAP or XAI while pre-processing features is risky business!

Does this mean there’s something wrong with SHAP? No, not at all. The point of this post is to give you a heads up that when you pre-process features in a non-affine way, you can’t count on explainability in advance. And in reality, most of the time, features are pre-processed to get good results with training, unless you use tree-based models that don’t require pre-processing.

Does this mean SHAP is at a disadvantage compared to other feature importance methods? Nope, not at all. This post didn’t even scratch the surface of the specifics of SHAP. So stay tuned, we might do a follow-up post on another method!

p.s. This post was inspired by a productive discussion with the [*Non-equilibrium soft matter*](http://tps.phys.tue.nl/janssen)group in Eindhoven, within a [collaboration](/small-scale-initiative-in-machine-learning-2021-how-did-it-go-9978a70b5b1) with the [Netherlands eScience Center](https://www.esciencecenter.nl/).

*Many thanks to Meiert Willem Grootes, Christiaan Meijer, Candace Moore and Patrick Bos for improving the blog post!*
