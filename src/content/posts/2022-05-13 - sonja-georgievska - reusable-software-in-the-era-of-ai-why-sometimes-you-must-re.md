---
layout: post
title: "Reusable software in the era of AI: why sometimes you must reinvent the wheel"
date: 2022-05-13
author: Sonja Georgievska
published: true
source: medium
source_url: https://blog.esciencecenter.nl/reusable-software-in-the-era-of-ai-why-sometimes-you-must-reinvent-the-wheel-306036754bec
tags:
  - uncategorized

---

][Sonja Georgievska]·May 13, 2022

Note that for every problem a customized* shape, a *customized* adaptation of the input data, and a *customized* loss function is needed. This is creative process and takes some time for understanding and investigation. Otherwise, if one uses a generic shape or a generic input data adaptation or a generic loss function, the time it would take for a computer to learn the parameters well could easily become [infinite](/how-not-to-use-deep-learning-in-science-e984b02a4df0). (In this case, it may be concluded that “the network cannot learn well”, or “there is not enough data”. It can be difficult to dispute these conclusions, though, especially if there is no reference point.)

Making AI can feel like climbing up infinite stairs. Photo by [Maxime Lebrun](https://unsplash.com/@flub?utm_source=medium&amp;utm_medium=referral) on [Unsplash](https://unsplash.com/?utm_source=medium&amp;utm_medium=referral)Bellow is a schematic representation of the process of machine learning, the model being usually the shape of F (or the neural net architecture). Note that the process can be iterative: most of the time it is not linear.

This image by [Sonja Georgievska](https://medium.com/@s.georgievska) is licensed under [CC by 4.0](https://creativecommons.org/licenses/by/4.0/)

### Enter reusability

Suppose you want to make a reusable software tool for AI, a software that can be reused in another context or for another problem. What does it mean? Which parts of the AI system can be completely automated and reused?

The data aggregation process can be made reusable, for example, for multiple problems that use the same type of data. You can even use generic data objects that can hold any type of data; taking into account that further along the process you will need a customized component that prepares the data for the particular neural network architecture. (Note that, however, data aggregation has nothing to do with AI; data does not need AI, it’s the other way round.)

The data adaptation is more tricky, because as we pointed out above, it is specific to the actual problem, so choices being made here influence the end result (finite vs infinite training). The data adaptation also depends on the data distribution: datasets may have the same type but different distribution. Not taking into account the data distribution leads to biased, or [irresponsible AI](/ai-will-not-steal-your-job-heres-why-d59231eac0ef). This leaves very little space for a generic reusable component here. The more you want to reuse, the more assumptions you are making, that may hurt you in the long run.

How is *your*** data distrubuted? Photo by [Luke Chesser](https://unsplash.com/@lukechesser?utm_source=medium&amp;utm_medium=referral) on [Unsplash](https://unsplash.com/?utm_source=medium&amp;utm_medium=referral)Then, model (neural net architecture) crafting. You can choose to make it from scratch in one of the generic deep learning frameworks. But then, we saw that the model is specific to the problem and dataset. If you want to make a reusable component here, you can make a model-generator, that would give the user a choice, manual or automated, of a plethora of models suitable for the problem. This generator takes some **time** to build; yet, your final result in terms of accuracy will be as good as you can get from the pre-defined choice of models. Your model will not be the state-of-art model for the particular problem and data type, nor will it include expert insights about the problem and data. This automation or reusability saves users time at the expense of the quality of results. Instead of potentially 98%, your model will have an accuracy of 91%.

Please, choose a model that satisfies specifications. Photo by [Karen Vardazaryan](https://unsplash.com/@bright?utm_source=medium&amp;utm_medium=referral) on [Unsplash](https://unsplash.com/?utm_source=medium&amp;utm_medium=referral)Then you have the loss function. This is a small piece of code that is either highly adapted to the actual problem, or one uses one of the pre-existing (and reusable) loss functions in the deep learning framework, but then with a [“fingers crossed”](/how-not-to-use-deep-learning-in-science-e984b02a4df0) strategy. If overlooked, it can also produce “biased AI”.

Model training is already fully automated by the deep learning framework, that is the “machine learning” process.

### So…

We saw that the only part that can produce a reusable component without affecting the final results is the data aggregation process. In the stages that follow, every time you use something off the shelf, you are doing it at the expense of the quality of the final results. On the other hand, most of the workload in the following stages is intellectual rather than programming. The data-adaptation code is a Python script that calls standard libraries; but you have to know exactly what you are doing to your data. The model is also a few hundreds of lines of code. The loss function is usually a few lines of code. It is at most tens of lines of code, if you are encoding your (very customized) domain knowledge into it. The trained model could be gigabytes of automatically generated machine-readable, and not human-readable, high-dimensional matrix. Ironically, before thinking about reusability of the [trained model](https://www.infoworld.com/article/3644968/how-no-code-reusable-ai-will-bridge-the-ai-divide.html), and making your model transferable, let us point that it is already [challenging](/machine-learning-when-it-is-easy-when-it-is-difficult-9de0e1129593) enough to have the model re-usable on future data for which it was originally meant.

The bulk of your AI software is not human-readable. Photo by [Compare Fibre](https://unsplash.com/@comparefibre?utm_source=medium&amp;utm_medium=referral) on [Unsplash](https://unsplash.com/?utm_source=medium&amp;utm_medium=referral)Thus, will you think twice next time you want to build a reusable AI software? Is your goal to have a tool that can show proof-of-concept but never be actually used in production mode? Then, invest your time in making it reusable. Is your goal to have an AI tool that will make profit, “beat” your competition or give state-of-art science results? Then, better invest less time on the keyboard and more time on the whiteboard.

*A special thanks to *[*Patrick Bos*](https://egpbos.medium.com/)*, *[*Tom Bakker*](https://www.esciencecenter.nl/team/dr-tom-bakker/)* and *[*Lieke de Boer*](https://www.esciencecenter.nl/team/dr-lieke-de-boer/)* for improving the post.*
