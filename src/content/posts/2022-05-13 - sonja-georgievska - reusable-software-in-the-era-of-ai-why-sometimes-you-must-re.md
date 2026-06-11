---
layout: post
title: "Reusable software in the era of AI: why sometimes you must reinvent the wheel"
date: 2022-05-13
author: Sonja Georgievska
published: true
source: medium
source_url: https://blog.esciencecenter.nl/reusable-software-in-the-era-of-ai-why-sometimes-you-must-reinvent-the-wheel-306036754bec
tags:
  - Deep Learning
  - Machine Learning
  - Neural Networks
  - Python
  - Training
---

> In traditional software development, reinventing the wheel is a cardinal sin. But AI has changed the picture. In AI-based software development the traditional reusable components, like data aggregation, are only the beginning. What about the actual AI pipeline, can we make that reusable? Should we *want to* invest our time in reusable AI?

![](/assets/0_fxCP5veXW7Lagbci-2b192df1.webp)

Reusable components. Photo by Sandra Harris on Unsplash

When building software from scratch, in business or academia, a very desirable property of the software is for it to be [reusable](https://link.springer.com/conference/icsr). This means that it is not meant to be used for one particular task, one business client or one scientific problem. Ideally, one would like the software to be built ground-up with re-usability in mind: allow for the tool to be able to operate on different data types, different context and different future scenarios that cannot be considered at the moment. In business, this approach maximizes profit, as many clients can be acquired with the same tool. Each business case would require some customization, but the backbone of the software remains the same and stable. In academia, reusability of tools or components allows for wider scientific impact.

Contemporary software solutions are increasingly based on “Artificial Intelligence” (AI) models. It is tempting to explore how much of the AI based tools can be reusable and applied in a different context. This text attempts to break down and take a closer look at the AI-based software development process and to discuss potentials and pitfalls when trying to make AI reusable.

### How modern AI systems work

What is AI today? It is mostly a system that relies a lot on deep neural networks. In the past decades, depending on fulfilled or unfulfilled promises of different methods, AI meant different things, but in 2022 certainly AI is a system that uses one or more deep neural networks to come with results.

What is a deep neural network? It is a complex function F that maps input to output. Input or output can be any object that you can think of.

![](/assets/0_oopxG6xQfBVnmDAS-c3de90c1.webp)

Mapping input to output. Try all possible connections until it works? Photo by Victor Barrios on Unsplash

Every function has shape and concrete parameters. For example,

F(x) = 3x² + 4x +1

has the shape of a quadratic function with parameters 3,4,1. Note that there is an infinite number of possible shapes that a function can take. The shape of a deep neural network is, in principle, very complex.

Different shapes work for different types of input data. That’s because data type can be a video or a molecule or a piece of text, or a collection of the previous.

In deep learning, the task of a team of engineers is to craft a shape of the function that is suitable to the kind of input data, and to the problem that it is trying to solve. Or to adapt (preprocess) the input data for a known shape, based on knowledge about the data, the problem, and shapes. The parameters are learnt automatically by the computer, therefore “machine learning”. The parameters are learnt from a lot of data, for which X and F(X) are known. In order for the computer to be able to learn the parameters, the engineer has to guide it with an appropriate “loss” or optimization function, that computes the “difference” between the predicted F(X) and the actual F(X). Note that, for a particular X, the loss function is a function of the parameters of F. The loss function incorporates the optimization strategy, based on (again) the problem and data.

![](/assets/0_rmutMCsM9DcmafzT-7a28f5b1.webp)

What’s your strategy? Photo by JESHOOTS.COM on Unsplash

In time, with enough data, the computer learns the parameters that minimize the value of the loss function, that is, match best X and F(X) for any X from the domain of F. This “time” can be reasonably finite, unreasonably long but still finite, or infinite. That depends on how well the loss function was designed, how well the shape of F was crafted, and how well the input data was adapted for the problem.

![](/assets/0_H7AH31piD9B-ZNcg-4fab4f2d.webp)

Time is a component, too. Non-reusable. Photo by Lukas Blazek on Unsplash

For all of those ingredients to be there, the team needs [combined knowledge](https://blog.esciencecenter.nl/small-scale-initiative-in-machine-learning-2021-how-did-it-go-9978a70b5b1) and understanding of

- the problem and data, or *domain knowledge*,
- various shapes of F, or *neural network architectures*,
- mathematical optimization — for the loss function and related,
- statistical methodology — to make sure that F will perform well on future data,
- existing software frameworks for deep learning, and, of course,
- programming.

The more knowledge, the better, but it cannot be measured or quantified. This is what is called “expert” knowledge, built over years of education, training and/or experience.

Note that for every problem a *customized* shape, a *customized* adaptation of the input data, and a *customized* loss function is needed. This is creative process and takes some time for understanding and investigation. Otherwise, if one uses a generic shape or a generic input data adaptation or a generic loss function, the time it would take for a computer to learn the parameters well could easily become [infinite](https://blog.esciencecenter.nl/how-not-to-use-deep-learning-in-science-e984b02a4df0). (In this case, it may be concluded that “the network cannot learn well”, or “there is not enough data”. It can be difficult to dispute these conclusions, though, especially if there is no reference point.)

![](/assets/0_CgfhCugQCpo4ZuBb-b5d2571e.webp)

Making AI can feel like climbing up infinite stairs. Photo by Maxime Lebrun on Unsplash

Bellow is a schematic representation of the process of machine learning, the model being usually the shape of F (or the neural net architecture). Note that the process can be iterative: most of the time it is not linear.

![](/assets/0_WlD44RaYM6VTcvA--92cce4d2.webp)

This image by Sonja Georgievska is licensed under CC by 4.0

### Enter reusability

Suppose you want to make a reusable software tool for AI, a software that can be reused in another context or for another problem. What does it mean? Which parts of the AI system can be completely automated and reused?

The data aggregation process can be made reusable, for example, for multiple problems that use the same type of data. You can even use generic data objects that can hold any type of data; taking into account that further along the process you will need a customized component that prepares the data for the particular neural network architecture. (Note that, however, data aggregation has nothing to do with AI; data does not need AI, it’s the other way round.)

The data adaptation is more tricky, because as we pointed out above, it is specific to the actual problem, so choices being made here influence the end result (finite vs infinite training). The data adaptation also depends on the data distribution: datasets may have the same type but different distribution. Not taking into account the data distribution leads to biased, or [irresponsible AI](https://blog.esciencecenter.nl/ai-will-not-steal-your-job-heres-why-d59231eac0ef). This leaves very little space for a generic reusable component here. The more you want to reuse, the more assumptions you are making, that may hurt you in the long run.

![](/assets/0_xdWZT-pRN4VbdV7j-7fe2acb7.webp)

How is your data distrubuted? Photo by Luke Chesser on Unsplash

Then, model (neural net architecture) crafting. You can choose to make it from scratch in one of the generic deep learning frameworks. But then, we saw that the model is specific to the problem and dataset. If you want to make a reusable component here, you can make a model-generator, that would give the user a choice, manual or automated, of a plethora of models suitable for the problem. This generator takes some **time** to build; yet, your final result in terms of accuracy will be as good as you can get from the pre-defined choice of models. Your model will not be the state-of-art model for the particular problem and data type, nor will it include expert insights about the problem and data. This automation or reusability saves users time at the expense of the quality of results. Instead of potentially 98%, your model will have an accuracy of 91%.

![](/assets/0_51Plh81AdqTfFgbH-cfe03464.webp)

Please, choose a model that satisfies specifications. Photo by Karen Vardazaryan on Unsplash

Then you have the loss function. This is a small piece of code that is either highly adapted to the actual problem, or one uses one of the pre-existing (and reusable) loss functions in the deep learning framework, but then with a [“fingers crossed”](https://blog.esciencecenter.nl/how-not-to-use-deep-learning-in-science-e984b02a4df0) strategy. If overlooked, it can also produce “biased AI”.

Model training is already fully automated by the deep learning framework, that is the “machine learning” process.

### So…

We saw that the only part that can produce a reusable component without affecting the final results is the data aggregation process. In the stages that follow, every time you use something off the shelf, you are doing it at the expense of the quality of the final results. On the other hand, most of the workload in the following stages is intellectual rather than programming. The data-adaptation code is a Python script that calls standard libraries; but you have to know exactly what you are doing to your data. The model is also a few hundreds of lines of code. The loss function is usually a few lines of code. It is at most tens of lines of code, if you are encoding your (very customized) domain knowledge into it. The trained model could be gigabytes of automatically generated machine-readable, and not human-readable, high-dimensional matrix. Ironically, before thinking about reusability of the [trained model](https://www.infoworld.com/article/3644968/how-no-code-reusable-ai-will-bridge-the-ai-divide.html), and making your model transferable, let us point that it is already [challenging](https://blog.esciencecenter.nl/machine-learning-when-it-is-easy-when-it-is-difficult-9de0e1129593) enough to have the model re-usable on future data for which it was originally meant.

![](/assets/0_JtDR94c8PMnvwFa3-d69b3e33.webp)

The bulk of your AI software is not human-readable. Photo by Compare Fibre on Unsplash

Thus, will you think twice next time you want to build a reusable AI software? Is your goal to have a tool that can show proof-of-concept but never be actually used in production mode? Then, invest your time in making it reusable. Is your goal to have an AI tool that will make profit, “beat” your competition or give state-of-art science results? Then, better invest less time on the keyboard and more time on the whiteboard.

*A special thanks to* [*Patrick Bos*](https://egpbos.medium.com/)*,* [*Tom Bakker*](https://www.esciencecenter.nl/team/dr-tom-bakker/) *and* [*Lieke de Boer*](https://www.esciencecenter.nl/team/dr-lieke-de-boer/) *for improving the post.*
