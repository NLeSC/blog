---
layout: post
title: "Monopolizing AI"
date: 2020-02-07
author: Florian Huber
published: true
source: medium
source_url: https://blog.esciencecenter.nl/monopolizing-ai-8c87e00b854d
tags:
  - uncategorized

---

## The field of machine learning and AI is facing an increasing divide.

][Florian Huber]·Feb 4, 2020

**16

*Last edit: 07/02/2020*

It seems contradictory at first. On the one hand, deep learning has become incredibly accessible. Few decades ago it was only used by a comparably small number of computer scientists, but nowadays there are plenty of free, easy-to-use, open-access tools and frameworks to build and train your own deep learning models. And the internet is flooded with (often free) online courses and tutorials from entry level to expert level, instructing people on how to make use of deep learning.

But on the other hand, there also is an increasing sense of divide among many “ML practitioners”, i.e. the people that actually apply machine-learning or deep learning to uncountable problems in industry and academia. Or rather the people that* want* to apply those techniques. Because more and more frequently it turns out that the best-performing deep learning solutions are moving way beyond the data- and compute-budget of researchers or mid-sized companies.


## Where does the divide come from?

The great success of deep learning over the last decade is rooted in a combination of three factors:

* Ever-growing data sets.
* Heavily increased compute power (in particular around GPUs/TPUs which were discovered to be extremely well suited for deep learning).
* Development of novel deep neural network architectures. Together with discoveries of numerous new ‘tricks’ to deal with deeper and deeper networks.

A few years back, cutting-edge results in deep learning could often be achieved by training a cleverly chosen network architecture on a number of standard GPUs. However, already back then it became clear that if it comes to big data sets (for instance on images, text, or user behavior), the big tech companies were often playing in a different league. And this is not only because they collect more data, but also because they have the financial resources to properly label** much more data.

## Transfer learning i̶s̶ was able to bridge the gap

One could still argue that techniques such as transfer learning can democratize the resulting huge networks. Transfer learning refers to building models from pre-trained networks which are then adapted by retraining on the desired data. Often this means only retraining a small part of the network which requires far less compute power. Within only a few years, this approach has become widely used in many fields of machine learning.**

The need for transfer learning started with the [rise of deeper and deeper networks in computer vision](https://paperswithcode.com/sota/image-classification-on-imagenet). In 2015, for instance, Resnet-152, a deep learning network with 152 layers won the ImageNet competition [[He et al., 2015]](https://arxiv.org/abs/1512.03385). Such types of networks are very expensive to retrain from scratch (and at times technically challenging). It has hence become common practice to simply import one of the current standard image-based networks and continue from there.

More recently, the same development took place in the field of natural language processing (NLP). At least since 2019 with the rise of [BERT and similar models](https://ruder.io/state-of-transfer-learning-in-nlp/), state-of-the-art performance is now often only achievable by re-using very large, pre-trained networks.

Another less debated example is the famous AlphaGo Zero from DeepMind. This made the headlines in 2017 when it started to learn playing Go by self-play from scratch. Within 1.5 days AlphaGo Zero became stronger than any human player. 1.5 days on google infrastructure that is. Go and AI enthusiasts were keen on reproducing this success but realized that [it would take 1700 years to train on commodity hardware](http://computer-go.org/pipermail/computer-go/2017-October/010307.html). That was followed by an unprecedented effort to join forces across a large online community and [build a similar deep network as a distributed effort, Leela Zero](https://github.com/leela-zero/leela-zero).

Still fine one could say. As long as data and compute power remain at least accessible enough so that larger consortia, collectives, or institutions can retrain those models. But all signs point towards a very near future where even this criteria becomes increasingly difficult to meet. Last week [a team from google published their results on a new chatbot, Meena](https://arxiv.org/abs/2001.09977). Their best model was trained on 2,048 TPU v3 cores for 30 days! Taking the current price on the google cloud of 1$/hour for one TPU v3 core ([source: google cloud on 04/02/2020](https://cloud.google.com/tpu/pricing)), this corresponds to 1,500,000 $, hence by far exceeding what most institutions can afford to spend just for the final model training. The true number of core hours will of course be even larger if we imagine that many training runs are necessary to settle on the final architecture and hyper-parameters. And with more and more refined network architectures and training algorithms, we can expect even more expensive models to appear over the next few years (expensive in terms of budget and energy consumption).

## What’s next?

I don’t see a simple remedy to ensure that the most powerful AI tools are not reserved to the few tech giants. One route certainly is the continuous improvement of deep learning algorithms with respect to their efficiency from an energy perspective (an emerging field now is “green AI”). Usually cleverer model architectures and training algorithms will allow for similar or better results with less training and less parameters. Examples from recent years here would be regularization techniques such as “dropout”, or a [trend to sparser networks](https://timdettmers.com/2019/07/11/sparse-networks-from-scratch/). Unlikely that this would stop the success of computationally expensive, huge, brute-force networks anytime soon. But it might offer good options for following the state-of-the-art with some delay (maybe few years behind “cutting edge”).

Another option worth considering in my eyes, is large-scale public investments in AI compute infrastructure. Say on national, or better even European scale. It would make me much less worried if we wouldn’t have to rely on google, facebook and Co. to release their newest models, and instead had powerful institutions that could provide the research community (and the public) with relevant large-scale models and compute power.

In any case, I believe it is essential to watch this divide closely. Not only because it means that academia and the public risk being outpaced (and thereby potentially missing vital opportunities). I also believe it should be observed and interpreted in the light of what [Shoshana Zuboff termed “surveillance capitalism”,](https://en.wikipedia.org/wiki/Surveillance_capitalism) which points at a far bigger threat.

### Resources/links:

* “[Energy and Policy Considerations for Deep Learning in NLP](https://arxiv.org/pdf/1906.02243.pdf)” by Emma Strubell, Ananya Ganesh, and Andrew McCallum.
Great article on cloud compute costs and energy consumption of current state-of-the-art models.*
* Currently, there are many interesting research projects working on more efficient, more robust, more accessible deep learning techniques. One of them is [efficientdeeplearning.nl](https://efficientdeeplearning.nl/), which also includes the eScience Center.
* [“The Age of Surveillance Capitalism”](https://www.publicaffairsbooks.com/titles/shoshana-zuboff/the-age-of-surveillance-capitalism/9781610395694) by Shoshana Zuboff.
*Exciting book that adds another facet to the increasing agglomeration of behavioral data and compute power by the big tech companies.*
