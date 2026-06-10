---
layout: post
title: "mcfly time series classification made easy"
date: 2017-03-20
author: Dafne van Kuppevelt
published: true
source: medium
tags:
  - uncategorized

---

## A deep learning approach for time series

![](/assets/1_sT8uHuUVZ-7OnowqXugn0A-1d0ef40a.png)

Deep learning is hot. It is the state-of-the-art method for object recognition in [images](https://techcrunch.com/2016/10/01/how-deep-learning-allowed-computers-to-see/) and video, and was an important component of the AI system that [beat the best human player in GO](https://research.googleblog.com/2016/01/alphago-mastering-ancient-game-of-go.html). Deep learning can even be used to imitate human creativity by training it to [write Shakespeare poems](http://karpathy.github.io/2015/05/21/rnn-effectiveness/) or [compose Bach chorales](http://bachbot.com/#/?_k=af67i3).

With all these success stories in the news, you might wonder what deep learning can do for you if you are no expert in machine learning. We have good news: our Python package mcfly might help you explore the power of deep learning, without having to be an expert on the topic!

### The power of deep learning

Deep learning works well on raw data. Take for example the task of object recognition in an image: in traditional methods, you would first manually define features of the images (edges, corners, etc) and then use for example logistic regression to decide what object is in the image. In deep learning, the input of the model are raw pixels, and the model *learns* what features are important. Moreover, it combines low level features (edges, corners) to learn higher level features (squares, circles) and even higher level concepts (faces, text). In this way, it can solve more general problems than a model based on hand-crafted features.

![](/assets/1_Ejsgqmu3zfJCWIDqI39QRA-619f2c59.png)

In traditional computer vision methods, you have to extract features to feed into the classifier.

### Starting with deep learning

It seems therefore that Deep Learning could be a very low-barrier method to try out on your data: you don’t have to spend time on creating good features from your data. Unfortunately, for beginners it is not always clear how to start with deep learning, and what specific choices for the algorithm they should make for their specific data. Of course it is a good idea to learn the fundamentals of Machine Learning and Neural Networks (for example through the blog of [Adam Geitgey](https://medium.com/@ageitgey/machine-learning-is-fun-80ea3ec3c471#.bm3dpwuc1)). However, there are infinitely many different algorithm choices to make for the Deep Learning model. For example:

- The number of layers in the network (also called the depth of the network)
- The type of layers (there are many types, like Convolutional, Recurrent and Fully Connected layers)
- The size of each layer (this influences how many parameters the model has)
- The learning rate (how strong does the learning algorithm adjust its parameters when it sees new training data?)
- Regularization options (how do we make sure the model is not overfitted on the training data?)

For computer vision (images, video) there are several tools that provide pre-trained models that you can use as a starting point for your own problem. [Caffe](http://caffe.berkeleyvision.org/) is an example of such a Deep Learning framework, specifically for computer vision tasks. What about other types of data?

### Time series classification

At the Netherlands eScience Center we regularly collaborate with scientists on projects that involve some type of time series data. For example, we want to [classify activity types from accelerometer data](https://www.esciencecenter.nl/project/classifying-activity-types). Or [diagnose epilepsy with consumer-grade EEG devices](https://www.esciencecenter.nl/project/diagnosis-of-active-epilepsy-in-resource-poor-setting). These are examples of time series classification tasks: we have excerpts of (multi-channel) time series data that are associated with a class label, such as the activity type (sleeping, walking, exercising, etc). If we have enough annotated data, we could use a deep learning model to learn how to classify new data.

![](/assets/1_3DcHZvmP6ioaLNK0Z-_o9g-152ab3f3.png)

Why did we call our tool mcfly? Because of Back to the Future, a movie with many layers in which Marty Mcfly travels through time!

To accommodate for time series classification use cases, we developed a software package called [mcfly](https://github.com/NLeSC/mcfly). It is a wrapper around [Keras](https://keras.io/), a deep learning framework in Python. Although Keras is a very powerful and user-friendly library, it does require you to define exactly the architecture of the model you want to use, and to provide all hyper-parameters. Mcfly makes life easier. It performs a search over suitable architectures and possible hyper-parameters to find the best performing model for you. Since the resulting models are simply Keras models, it is definitely possible to modify these models to explore all functionalities that Keras has to offer.

![](/assets/1_9E4fZeHXzho-_sktSY0jpA-08cc2e40.png)

Left the python code to define a model in Keras, right the python code to let mcfly find the model for you.

For a more in depth introduction to deep learning, follow the online Stanford course on [Convolutional Neural Networks for Visual Recognition.](http://cs231n.github.io/) If all the material on deep learning is overwhelming, don’t worry! Maybe [mcfly](https://github.com/NLeSC/mcfly) is just the push you needed to try out Deep Learning for your problem.

So try mcfly out on your own data! You can download mcfly from our [github page](https://github.com/NLeSC/mcfly), or through [PyPi](https://pypi.python.org/pypi/mcfly/1.0.0). To get started with mcfly, we developed an [iPython notebook](https://github.com/NLeSC/mcfly-tutorial/blob/master/notebooks/tutorial/tutorial.ipynb) with a tutorial. Have you used mcfly? We would love to hear about your experiences!
