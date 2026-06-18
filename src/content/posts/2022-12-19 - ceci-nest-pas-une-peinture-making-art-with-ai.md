---
layout: post
title: "Ceci n’est pas une peinture — making art with AI"
author: Eva Viviani
published: true
source: medium
source_url: https://blog.esciencecenter.nl/ceci-nest-pas-une-peinture-making-art-with-ai-5491010c372
tags:
  - API
  - Collaboration
  - Deep Learning
  - FAIR
  - RSE
  - Training
---

Over time, the model ultimately learns how to discriminate between these two groups (Van Gogh vs. other) and outputs the probability that a new observation belongs to the Van Gogh’s category. To do so, however, discriminative modelling requires that each observation in training must have a label, i.e., all Van Gogh’s paintings are labelled as 1, and non-Van Gogh paintings as 0.

Generative models instead don’t need a labelled dataset¹: they output sets of pixels, I.e. other images, and are trained to minimize the difference between the images they produce and the images they are trained on.

> 

Key points:

In other words, the key difference between discriminative and generative modelling is that while the former attempts to estimate the probability that an observation ***x*** (pixel) belongs to the learned category ***y***(Van Gogh), the latter instead attempts to estimate the probability of seeing the observation ***x*** (pixel) at all.

Once trained, generative models can be used to produce completely novel images that share features with the training set. What the model learns is a highly sophisticated method for interpolating images: Not magic, but impressive, nonetheless.

### Good artists copy, great artists steal

Since the AI is trained on images pulled from the internet, it learns from a store of pictures that people have chosen to share. As a consequence, the blind use of these models often reveals how deeply social bias is baked into our data sets. For example, OpenAI has found that [prompting the word “Nurse” will always show a woman, while the word “CEO” always a man](https://industrywired.com/for-the-nurse-prompt-dall-e-will-only-show-a-woman-exploring-ai-bias/). Bias doesn’t seem to be limited to gender, but [encompasses race as well](https://analyticsindiamag.com/midjourney-is-biased/)[.](https://analyticsindiamag.com/midjourney-is-biased/).) One solution to this is to provide a more socially and ethnically diverse training dataset that would comprehend different ethnicities and gender descriptions.

More concerning on the long term, however, is the potential of these tools to create misinformation. In a [test](https://www.proquest.com/docview/2190341785?pq-origsite=gscholar&amp;fromopenview=true) run at Art Basel in 2016— an annual fair showcasing contemporary art — the authors of [AICAN](https://www.aican.io/) (Artificial Intelligence Creative Adversarial Network) showed that people were very often unable to tell the difference between AICAN generated images and artworks produced by a human artist (see also Tidio’s recent [test](https://www.tidio.com/blog/ai-test/) confirming this trend). This suggests that the share of “visual literacy” in the public is not very high and may pose a risk in a society that hasn’t integrated more sophisticated tools to tell apart humans- vs AI- generated images in our daily life.

Aside from these ethical concerns, there is also the question of plagiarism. The training dataset is obtained by web scraping millions of images that are necessarily made by someone else. This suggests a form of plagiarism which affects artists who upload their works to the internet (perhaps for self-promotion) and that may be unaware of helping an AI to become their competitors.

![Ceci n’est pas une peinture — making art with AI](/assets/ceci-nest-pas-une-peinture-making-art-wi-91e9b380.png)
The Portrait of Edmond Belamy [**sold at auction for $432,000**](https://www.christies.com/features/A-collaboration-between-two-artists-one-human-one-a-machine-9332-1.aspx?sc_lang=en)on 25 October 2018 at Christie’s in New York. The artwork was produced using a generative model and a data set of 15,000 portraits painted between the 14th and 20th Centuries. Image © Obvious

### Is it society doomed?

Allen’s “Theatre d’Opera Spatial” was a test of how the world would view AI-generated art: The award got mixed responses. Some people accused him of cheating because he didn’t make the work, others (like Allen himself) took pride in seeing an AI-generated piece beat the competition.

When a new technology gains traction, it always fuels the public debate. In the case of generative models, the enthusiasts foresee the liberation of human creativity from the burden of technical expertise, the worried fear the end of traditional image production as an art form.

Many people compare these reactions to those that followed the invention of photography in 1822, which many artists at that time saw as an insult to human creativity and artistry. It ended up creating a revolution, not a murder, of the visual arts. Most people now acknowledge that ultimately the human, not the device, is responsible for the image.

Ultimately, making generative art the new photography is up to us. It will depend on how we choose to answer important questions like: Who does the technology belong to? Who can use it? What is the allowed use, and do deep learning models expand or compress our freedom?

It is us, not the technology, who choose the direction.

1: though it can also be applied to a labelled dataset in case we wish to generate observations from each distinct class
