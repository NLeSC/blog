---
layout: post
title: "active learning"
date: 2018-03-20
author: Erik Tjong Kim Sang
published: true
source: medium
tags:
  - uncategorized

---

![](/assets/1_ip7UM0nLXChqg8vw6hivcg-bf510538.jpeg)

Computers perform better than humans in arithmetic and chess but if there is one task in which humans are superior it is image processing. But for how long? In 2015 there was a breakthrough in computing science: the [ResNet](https://arxiv.org/pdf/1512.03385.pdf) system won the international image recognition competition [ImageNet Challenge](http://image-net.org/) with a score of 96.5%. People achieve 95% on that task. For the first time, a computer was better than humans in identifying objects in images.

The winning system used machine learning to recognize objects in images. The advantage of using machine learning is that you do not need to specify a task in great detail. Instead you provide the computer with examples of input and required output. If the task is recognizing the content of images, the input consists of images while the associated outputs are labels specifying the contents of the images. The computer then uses machine learning to learn how to assign labels to any image based on the available examples.

![](/assets/1_blKiRBXTOa73tuXYonlUfQ-02d4804b.jpeg)

Three examples of labelled images from the ImageNet challenge: label people (left), label house (center) and label website (right)

If we want the machine learner to perform well, we need to supply it with many good training examples. But what are the best examples? An image which ==is== very similar to one of the known examples, will probably not contribute much to the learning process. But an image which is quite different, might be a good new training example.

It would be nice if there was an automatic method for determining of which training examples a machine learner would benefit most. Then we can restrict human labeling efforts to these data and quickly improve the machine learning. Such a method exists: it is called **active learning**.

![](/assets/1_BdSQuGsyzCI0zuM8pIQenA-5eae29ef.jpeg)

The active learning process: a machine learner labels new data based on training examples. The best items are selected by active learning. These are labelled by a human annotator and added to the training examples after which the process is repeated.

Active learning is a semi-automatic method for expanding the training set of a machine learner. For example, if we want to learn the difference between images of cats and images of dogs, we can train a machine learner using images which are labelled either “cat” or “dog”. We can expand this set of training examples with active learning by performing the following six steps:

1. train the machine learner with all available labelled training examples
2. use the learner to classify many unlabelled images
3. **select the images which could be most instructive for the learner**
4. ask a human to assign correct labels to these images
5. add the newly labelled images to the training set and retrain
6. repeat steps 2–5 until the performance reaches an acceptable level

The most challenging part of this active learning process is step 3. There are two ways of performing this step. First, we can require the machine learner to specify for each predicted label how confident it is about the prediction, and select the items with the lowest confidence (uncertainty sampling). Second, we can use several competing machine learners to predict labels and select the items on which they disagree (query-by-committee, more detailed information can be found in a study by [Burr Settles](http://burrsettles.com/pub/settles.activelearning.pdf)).

![](/assets/1_LtDiL648MS0Fd45E_ArEWg-868eeae4.jpeg)

Examples of images from the competition Dog vs Cats by Kaggle. The best image recognition systems currently manage to recognize more than 98% of these images correctly.

## Example: automatic spelling correction

An example of an application of active learning is the study of [Michelle Banko and Eric Brill](https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/acl2001.pdf) on automatic spelling correction. They started with a training text of one million words and achieved a score of 96% on their task. By adding to the training data randomly selected texts with a total length of six million words, they managed to improve the score to 97%. But next, they showed that if the extra texts of six million words were selected with active learning (query-by-committee), the score on their task went up to almost 99%, a significant reduction of the error.

![](/assets/1_uWJdJ52Us6JFY3nwA6Xvzg-4186a06a.png)

## When active learning does not help

Several studies have shown that active learning can be applied successfully to improve the performance of machine learning. Increasing the number of training examples will often improve machine learners. The advantage of active learning is that it picks the new training examples in a smart way so that the machine learner can improve faster than when the training material was chosen randomly. However, active learning does not always perform better than random selection of new training examples. Most importantly, [Sanjoy Dasgupta](https://www.sciencedirect.com/science/article/pii/S0304397510007620) has shown that active learning will only work better than random selection if the initial size of training examples is large enough so that the initial machine learner can make reliable predictions. The required training size depends on the problem and is usually hard to estimate.

![](/assets/1_QUtAcWuLvlautD5kEL7gfg-bf1343aa.png)

## Active learning at the Netherlands eScience Center

Since lack of training data is a common problem in machine learning research, there are several projects of the [Netherlands Science Center](http://esciencecenter.nl/) that are interested in applying active learning. The method was already used by [myself](https://ifarm.nl/erikt/papers/2017-icnlssp.pdf) in the project [Automated Analysis of Online Behaviour on Social Media](https://www.esciencecenter.nl/project/automated-analysis-of-online-behaviour-on-social-media) (2017) for obtaining more political tweets labelled with the intention of the sender. The topic active learning was also discussed in the meetings of the Machine Learning group of the eScience Center. Do you have any active learning tips and tricks for our group? Please let us know in the comments below!
