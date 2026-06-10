---
layout: post
title: "Can we teach AI’s speech by simulating young children’s ability to learn spoken language?"
date: 2020-04-02
author: Netherlands eScience Center
published: true
source: medium
source_url: https://blog.esciencecenter.nl/can-we-teach-ais-speech-by-simulating-young-children-s-ability-to-learn-spoken-language-7cd9d33943
tags:
  - GPU
  - Machine Learning
  - Neural Networks
  - Parallel Computing
  - Performance
  - RSE
---

**8
Today, we can´t imagine life without voice controlled intelligent systems such as Siri, Google Assistant, car navigation systems and other applications. Such systems use a speech understanding component to interact with humans. Their ability to understand human language is therefore a crucial capability.**

The most widely used technique to enable an application to understand and react to spoken language is to first transcribe speech into text using a speech recognition module, and then to process the text with a separate text understanding module.

**An alternative approach**

The project ‘Understanding visually grounded spoken language via multi-tasking’ is a result of the Accelerating Scientific Discovery 2018 call for proposals. Led by Dr Grzegorz Chrupała, associate professor at Tilburg University and supported by the Netherlands eScience Center, the project proposes an alternative approach inspired by how humans understand speech. “I am primarily interested in how we can simulate young children’s ability to learn spoken language simply by being exposed to speech in various situations”, says Chrupała. “We call this scenario visually grounded, because the source of supervision comes from correlations between two (or even more) modalities: speech and vision.”

*Photography: Kim-Anh Holthaus*

![Can we teach AI’s speech by simulating young children’s ability to learn spoken language?](/assets/can-we-teach-ais-speech-by-simulating-yo-e9857822.jpeg)
*Dr Grzegorz Chrupała*Speech will be processed directly by an end-to-end neural network model without first being transcribed into text, avoiding the need for large amounts of transcribed speech required to train a traditional speech recognition system. The system will instead learn simultaneously from more easily obtained types of data. For example, it will learn to match images to their spoken descriptions, answer questions about images, or match utterances spoken in different languages.

“For this project we want to look at what additional signals we can exploit, or what additional tasks can help the computational model to learn something about the meaning of spoken language”, Chrupała explains. “Does it help to have access to a written language sample, and how much? Can an attempt to translate between different languages contribute? What specific biases can we put into the model to make language acquisition more efficient in our visually grounded learning scenario?”

![Can we teach AI’s speech by simulating young children’s ability to learn spoken language?](/assets/can-we-teach-ais-speech-by-simulating-yo-8df78313.jpeg)
*Left to right: Dr Patrick Bos, Dr Bertrand Higy, Dr Grzegorz Chrupala, Dr Afra Alishahi and Dr Jisk Attema*Dr Patrick Bos, eScience Research Engineer at the Netherlands eScience Center, clarifies three main goals of the project:

* The impact of adding other types of data on speech recognition model performance. For instance, does it help to tell the model which sounds correspond to separate letters? Or does it help to tell it about sentence grammar?
* When exploring the technical details of the machine learning model, we need to ask ourselves whether we can make the model work just as well (or better) by using a so-called “transformer” model instead of the recurrent neural network we currently use. Also, do we need more or less data to train it? Does it take more or less time (hence higher or lower power consumption by the computers)?
* To make the speech recognition models useful for a wide range of problems in many different languages, with different amounts of data, different demands on performance in certain tasks, etcetera, we need to make them as efficient as possible. One of the ways to make it faster to train a model and make more efficient use of available hardware is to enable parallel calculation on multiple GPUs at once. The aim is to implement this for the project’s model.

The project promises to be less reliant on strong supervision and expensive resources and thus applicable in a wider range of circumstances than traditional systems, especially when large amounts of transcribed speech are not available, for example when dealing with low-resource languages or specialized domains.

Although the project recently started, the team is aware expertise and focus are essential. Chrupała: “Jisk and Patrick have expertise in high- performance computing. The models we use in our project are deep neural networks with hundreds of thousands or millions of trainable parameters, which are learned from hours of spoken language and thousands of images. The only realistic way to fit these models is by using Graphical Processing Units (GPU). Patrick is working on adapting our software to make training more efficient and scalable to multiple GPU hardware, using state of the art neural architectural designs.’’

![Can we teach AI’s speech by simulating young children’s ability to learn spoken language?](/assets/can-we-teach-ais-speech-by-simulating-yo-217423ae.jpeg)

![Can we teach AI’s speech by simulating young children’s ability to learn spoken language?](/assets/can-we-teach-ais-speech-by-simulating-yo-1f1a38e0.jpeg)

![Can we teach AI’s speech by simulating young children’s ability to learn spoken language?](/assets/can-we-teach-ais-speech-by-simulating-yo-181aa193.jpeg)

![Can we teach AI’s speech by simulating young children’s ability to learn spoken language?](/assets/can-we-teach-ais-speech-by-simulating-yo-8708486a.jpeg)
“One thing I have noticed so far is that this field (deep learning for voice recognition) is moving quite fast, a lot faster than fields I’ve worked in.” says Bos.

Dr Bertrand Higy, postdoc at Tilburg University and part of the project team, notes the benefits of collaborating with different partners and how research is done during the project. “What gives this project such great potential is the fact that we can focus all our efforts on our research question and bring together researchers with different backgrounds and expertise.”

![Can we teach AI’s speech by simulating young children’s ability to learn spoken language?](/assets/can-we-teach-ais-speech-by-simulating-yo-5ba44267.jpeg)
**Making an impact**

The project aims to help us understand the connection between human language learning and teaching language to a computer. As such, it promises to make learning more data efficient by using less training examples.

“Most researchers in our field work either on textual data or on transcribing speech into text”, says Chrupała. “By working on the more general problem of modeling the learning of spoken language in a multimodal setting, we hope to move one step closer to the amazing language learning skills that young children possess. Although we mostly focus on basic research, we believe our work could help improve practical applications such as conversational agents of image retrieval via spoken commands. The recent deep learning revolution relies heavily on expensive labeled data. By exploring how language understanding can be acquired in a less supervised manner, I hope we can contribute to a more accessible technology. I imagine that some progress toward this goal will have been made in the next three years.”

Read more about project [Understanding visually grounded spoken language via multi-tasking](https://www.esciencecenter.nl/projects/understanding-visually-grounded-spoken-language-via-multi-tasking/)
