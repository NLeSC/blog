---
layout: post
title: "turning a panda into a cat!"
date: 2019-06-20
author: Sonja Georgievska
published: true
source: medium
tags:
  - uncategorized

---

## Why adversarial examples are not scary…but are most likely useful

![](/assets/0_xr8cAurNp61q6Vfe-7789a74b.webp)

“Is it a bird? Is it a plane?” A child who never saw Superman might mistake him for a bird or a plane. On the other hand, who knows what a time traveler from the ’70s would see in this picture. Photo by 贝莉儿 NG on Unsplash

If you’ve had anything to do with deep learning recently, you’ve heard of them: *adversarial examples*.

The nightmare of deep neural networks. Every skeptic’s favorite example.

Adversarial examples are one way of showing the limitations of neural networks when someone asks “is this how human vision works”?.

In a nutshell, it is possible to change a few carefully chosen pixels in a picture of a panda, such that a network that was trained to distinguish pandas from cats will classify the *picture* of the panda as a *picture* of a cat. (Pandas are so cute, therefore they are used [a lot]( in the data science world.)

![](/assets/0_l0s5ZoLgVp2tIIMr-d558db4b.webp)

In this example, the panda is confused for a gibbon, but cats are cuter than gibbons, so I use cats in the text

Now, note how I emphasized the word *picture* above. Why? Because *that* is what we give to the network as input: a picture, a matrix of pixels.

It learns *patterns* that appear frequently in the matrices of pixels (i.e. pictures) that represent a panda. A *combination* of patterns represents a category, like pandas (well, actually a *hierarchical* *nonlinear* combination of patterns, but those are details).

If none of the pictures of pandas used for training contained ‘weird’ pixels, the network will not learn that pictures may come with weird pixels. (Just think of all the funny mistakes that your children were making when learning various things at age 3… well, funny to *you*, not to them!)

That said, if at prediction time you give a picture with weird pixels, the network might give *anything* for an answer — because it has to give one. And if you have two categories and you chose the pixels to alter carefully (it is very easy actually), voila — it will predict that your panda is a cat.

![](/assets/0_eyLwwz_4InVWo3Of-30eeda49.webp)

“I better watch the road and not those weird pixels” - a well-trained biker. Photo by Nikita Ignatev on Unsplash

**Truth is in the eye of the beholder**

Wait a minute. We asked the network if it saw a picture of a panda, not an actual panda. Did the network say it was an actual picture of a panda? No. Correct answer. Why? Because we did not give it an *actual* picture of a panda. It was a *digitally manipulated* picture. Fake. A human will *not* recognize that that was not an actual picture of a panda. But the network said “No” and in a sign of a protest it answered “ A cat!”. (The last is a joke, obviously.)

So, garbage in, garbage out.

Why is this not scary? Actually, why do people think it is scary? Supposedly, in computer vision, one might use carefully digitally manipulated image to fool the network. True. But if you are using computer vision (thus automated) instead of human vision, and if I am a hacker, then I can fool you in much easier ways. If I want to use your smartphone that uses facial recognition to unlock itself, I don’t have to digitally alter an image of me so that the network thinks it is you. I will show the network an actual image of you.

Ok. But what about the changed *reality* rather than changed pictures? Namely, another favorite example is the altered stop sign at a crossroad that might trick a self-driving car into going straight and crashing, while a human driver would still recognize the sign.

![](/assets/0_EZweu8W1Iv2CyL4f-8a057f5e.webp)

A ‘stop’ sign for a human driver, a ‘go ahead’ sign for a self-driving car. Photo by Luke van Zyl on Unsplash

It is actually not difficult to realize that a vandal who wants to crash a self-driving car (?!) can do it in a much easier way, than by carefully spraying the stop sign using deep learning. [Here](https://medium.com/@catherio/unsolved-research-problems-vs-real-world-threat-models-e270e256bc9e) is a post that elaborates on this.

So, we saw that everyone’s favorite security examples are not really a threat.

Why are adversarial examples useful? Because they improve the knowledge that we have on deep learning. By being aware of its current limitations, researchers can make the neural networks even ‘smarter’ and maybe one day they will actually imitate human vision if that’s what we aim for.

Until that day, I am so eager to hear of a *real* threat that adversarial examples might pose.

(Bonus: [Do **we** see reality as it is?](https://www.ted.com/talks/donald_hoffman_do_we_see_reality_as_it_is?language=en#t-1108775))

*Thanks to Florian Huber, Berend Weel, Felipe Zapata, Kim Holthaus, Johan Rheeder, Patrick Bos, and Zvezdan Protic for the useful suggestions.*
