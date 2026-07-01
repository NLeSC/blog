---
layout: post
title: "Mcfly: An easy-to-use tool for deep learning for time series classification"
author: Florian Huber
published: true
source: medium
source_url: https://blog.esciencecenter.nl/mcfly-an-easy-to-use-tool-for-deep-learning-for-time-series-classification-b2ee6b9419c2
tags:
  - Deep Learning
  - Git
  - Performance
  - Training
  - Visualization
---

## A new mcfly 3.0 release is out. See how it works and how it can help you to apply deep learning to time series classification.

][Florian Huber]·Apr 15, 2020

Once the models are generated, they will be trained on the given data (or a subset to speed things up). This is done using `train_models_on_samples`.

[See full tutorial notebook for more information.](https://github.com/NLeSC/mcfly-tutorial/blob/master/notebooks/tutorial/tutorial_quick.ipynb)

The performance of the trained models can then interactively be compared using mcfly***, for example by comparing the accuracy on the validation set versus a number of key hyperparameters (see screenshot below). The built-in visualization is interactive and allows to select specific models (here numbered 0 to 7), or select specific architectures (here ‘CNN’ or ‘InceptionTime’), or learning rates. Most important feature to look at are the two plots on the top which display the development of the accuracy on both the training set and the validation set. A good model should perform decently well on both sides.

mcfly build-in visualization of the model performance. While in this example all models achieve good results on the training dataset, much fewer reach decent results on the validation dataset.

### Overfitting

Since the RacketSports dataset only consits of 150 training examples, you will frequently see that generated deep learning models will **overfit** the data. Overfitting is one of the most common problems when working with deep learning. It essentially means that you optimize too much on the training data so that the performance on unseen data will suffer. A typical signature for this is that models will do well on the training data (high training accuracy), but will perform poorly on the validation data (low validation accuracy). A typical example is shown below with 8 models, most of which report high `train_accuracy`but very low `val_accuracy`values!

Example results of 8 mcfly generated models trained on RacketSports dataset. Six perform well on the training data, but only 2 models also perform well on the validation data.If we now pick one of the better performing models (or iteratively generate and train more models), then we can get quite good results on the RacketSports dataset. Below you can see how we could inspect this by generating a confusion matrix. And here it indeed reveals that most of the times the picked **model is correctly predicting the actual activity!**

Generating a confusion matrix using the validation dataset.

### And now… what are you waiting for?

Grab some interesting time series data and try out some deep learning!

## Did you use mcfly?

Awesome! We are always happy to hear from people who have made good use of ***mcfly***. Please get in touch if you have suggestions and ideas for future developments or fixes (e.g. via [GitHub](https://github.com/NLeSC/mcfly), via[ twitter](https://twitter.com/me_datapoint), or as response to this post). Many thanks.

**Reference:
**D. van Kuppevelt, C. Meijer, F. Huber, A. van der Ploeg, S. Georgievska, V.T. van Hees. *Mcfly: Automated deep learning on time series.* SoftwareX, Volume 12, 2020. [doi: 10.1016/j.softx.2020.100548](https://doi.org/10.1016/j.softx.2020.100548)

## Links

* [Former blog post from 2017](/mcfly-time-series-classification-made-easy-e47de8d29838) by [Dafne van Kuppevelt]
* ***mcfly*** on pypi: [https://pypi.org/project/mcfly/](https://pypi.org/project/mcfly/)
* ***mcfly*** on GitHub: [https://github.com/NLeSC/mcfly](https://github.com/NLeSC/mcfly)
* Ready-to-use RacketSports dataset on zenodo: [https://zenodo.org/record/3743603](https://zenodo.org/record/3743603#.XpAypXKxUuU)
* ***mcfly*** tutorial(s): [https://github.com/NLeSC/mcfly-tutorial](https://github.com/NLeSC/mcfly-tutorial)
* Tutorial notebook with all code mentioned in this blog post: **[https://github.com/NLeSC/mcfly-tutorial/blob/main/notebooks/tutorial/tutorial_quick.ipynb](https://github.com/NLeSC/mcfly-tutorial/blob/main/notebooks/tutorial/tutorial_quick.ipynb)

*mcfly**** *was developed at the [**Netherlands eScience Center**](https://www.esciencecenter.nl/) by [Dafne van Kuppevelt], Christiaan Meijer, [Sonja Georgievska], [Vincent van Hees], [Florian Huber], [Patrick Bos], [Jurriaan H. Spaaks], Mateusz Kuzak, [Johan Hidding], [Atze van der Ploeg].

Thanks to Johan Rheeder, [Sonja Georgievska], [Dafne van Kuppevelt], [Peter Kalverla,] [Patrick Bos], and [Tom Bakker] for helpful comments and edits.
