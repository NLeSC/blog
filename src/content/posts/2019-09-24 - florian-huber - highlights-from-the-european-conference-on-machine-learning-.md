---
layout: post
title: "Highlights from the European Conference on Machine Learning 2019"
date: 2019-09-24
author: Florian Huber
published: true
source: medium
source_url: https://blog.esciencecenter.nl/highlights-from-the-european-conference-on-machine-learning-2019-3537900d0557
tags:
  - uncategorized

---

## ML highlights and trends as seen at [ECML-PKDD 2019](https://ecmlpkdd2019.org/) (16–20 September, Würzburg, Germany)

**SubscribeRemember me for faster sign in

5 Autoencoder with agnostic feature selection****Guillaume Doquet and Michèle Sebag presented an [autoencoder](https://twitter.com/hashtag/autoencoder?src=hashtag_click) combined with structural regularization for better feature selection (or agnostic feature selection, hence the name AGNOS**). It indeed performs pretty well (unfortunately computational cost increase quite a bit).**Paper: [https://www.ecmlpkdd2019.org/downloads/paper/744.pdf](https://www.ecmlpkdd2019.org/downloads/paper/744.pdf)
Code not available yet.

## Other trends and common themes

### Probabilistic models

What people in machine-learning mean by probabilistic models is usually models that not only output a single prediction, but also give a distribution or other measure for how certain the model is about its prediction.

Back in the older times of ML (which in ML means a few years back), most ML practitioners would be happy enough to have a model that performs decently with respect to its output accuracy. To estimate the certainty of those models, it was often common practice (which means it in many cases still is!) to simply look at the model predictions one layer before the final argmax and treat those values as probabilities. But although a softmax layer will indeed give probability-like looking values (they are properly normalized to a sum of 1), they are usually not very reliable uncertainty estimates.

ECML-PKDD2019 hosted two entire sessions on probabilistic models with a very strong focus on Gaussian processes. There was, for instance, an interesting implementation by [Wistuba and Rawat](https://ecmlpkdd2019.org/downloads/paper/116.pdf) using a “Large Margin Gaussian Process” that can be added to the end of a conventional CNN. Or a promising looking deep constitutional Gaussian process method by[ Blomqvist et al.](https://ecmlpkdd2019.org/downloads/paper/645.pdf)

### Algorithm benchmarking vs. real-world usability

This is not exactly a new trend. But you could say it’s a remaining theme. The ML field is no different than most scientific domains in that it is highly driven by the “publish or perish” paradigm. You want to stay in academia? Better publish as much as you can!

So no surprise that at ECML-PKDD2019 I saw what also can be seen elsewhere: Most papers coming out in ML represent — at best — incremental improvements over previous work! **Often that means a slightly better benchmark here, a little faster computation there. That’s fine of course. Only that for people like me that are mostly interested in applying ML tools for a wide range of real world problems, those incremental changes rarely justify going through the hassle. The projects I work on are scientific research projects. For those, I would nearly always favor a more-established, better documented method that gives me a decent accuracy over a newly developed one that might give me slightly better results, but is either more cumbersome to implement, or that requires more expertise to properly tune and understand.

### Resource-efficient deep learning (and ML)

Often motivated by limited computational resources of devices (IoT, smartphones etc.), sometimes also motivated by energy efficiency/sustainability aspects, efficient machine learning algorithms have gained quite some traction.

Typical tricks include network pruning (creating sparser models), or lower precision values (e.g. gradients), for instance by going from floats to bitsets. 
Another approach is cleverly designed network architectures that allow to drastically cut down training cost for large ensembles of networks. The well-known Inception architecture for CNNs could be seen as such a case. Dimitrios Stamoulis (Carnegie Mellon, USA), for instance presented a [new efficient method for neural architecture search](https://ecmlpkdd2019.org/downloads/paper/880.pdf).

Closely related, there was also an entire [workshop on green data mining](https://greendatamining.github.io/).

### Explainability, Interpretability

Not unexpectedly, explainable AI or model interpretation came up at many points during the conference. The keynote by Tinne Tuytelaar (KU Leuven, Belgium) on computer vision discussed this to quite some extent. And on the last day there was an entire tutorial/workshop session on the topic → see [AIMLAI-XKDD website](https://kdd.isti.cnr.it/xkdd2019/)

The slides of the XKDD tutorial part are also all available online: [https://kdd.isti.cnr.it/xkdd2019/pkdd2019xkdd_tutorial_last.pdf](https://kdd.isti.cnr.it/xkdd2019/pkdd2019xkdd_tutorial_last.pdf)

### Use of ML all over the place

Again, no new trend. But it remains great to see, because in the end this is what all of this is about (for me at least). And that’s the use of ML techniques over a wide range of fields and topics.

Obviously there were many of the usual suspects: analysis or prediction making in finance, e-commerce, power consumption, public transport usage, etc. Closer to my heart though, were the many nice examples of different scientific disciplines using ML to help analyze and interpret their data. I attended a cool [workshop on machine-learning and music](https://musml2019.weebly.com/), looking at neural networks generating human-resembling sheet music or reading ancient hand-written sheets.
I also greatly enjoyed the keynote on “palaeontology as a computational science” by [Indrė Žliobaitė,](https://twitter.com/inzl) and saw plenty of interesting cases from life sciences and social sciences.

![Highlights from the European Conference on Machine Learning 2019](/assets/highlights-from-the-european-conference--a5344497.jpeg)
ECML PKDD 2019 group picture supporting Fridays for Future.
![Highlights from the European Conference on Machine Learning 2019](/assets/highlights-from-the-european-conference--055191f3.jpeg)
Lively discussions of current techniques in 900 year old wine cellar…
