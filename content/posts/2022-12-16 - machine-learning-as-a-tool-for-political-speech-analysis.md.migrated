---
layout: post
title: "Machine Learning as a tool for political speech analysis"
author: eScience Editorial Team
published: true
source: medium
source_url: https://blog.esciencecenter.nl/machine-learning-as-a-tool-for-political-speech-analysis-c8abf5cd8c0d
tags:
  - Machine Learning
  - Research Software
  - Workflows
---

The following example of a sentence from Putin’s invasion-speech may clarify what CM annotation of texts involves: ‘The purpose of this operation is to protect people** **[Effect]** who, for eight years now, have been facing humiliation and genocide perpetrated by the Kiev regime. To this end, we will seek to [Causal Link]* **demilitarise (Cause A)** and **de-nazify (Cause B)** Ukraine, as well as **bring to trial those who perpetrated numerous bloody crimes against civilians [Cause C]**’. This example also provides a first indication of the complexity of our research goal, as it shows that:

* Each of the three parts the causal relation may correspond to a multi-word phrase in a text;
* The three parts may appear in different orders in the text;
* A causal relation may cross sentences.

Using existing CM data from a previous project on the [meaning making of political and financial leaders concerning the Eurozone crisis](https://www.transcrisis.eu/wp-content/uploads/2018/03/Deliverable-3.3-Meaning-Making-of-the-Euro-Crisis.pdf), we set two initial aims for our project: To identify sections of text that contain causal relations and to identify the causal triplets of *cause*, *causal link* and *effect*. For both tasks we used several easy to implement, state-of-the-art machine-learning methods.

![Machine Learning as a tool for political speech analysis](/assets/machine-learning-as-a-tool-for-political-2655339b.png)
*Figure 1: Excerpt of the cognitive map concerning the Eurozone crisis of Dutch Central Bank Governor Klaas Knot*We focused on deriving causal (rather than normative) relations from text, because the method is much more complex than existing automated text-analysis techniques. The causal relations that make up the core of the CM technique consist of three parts: The cause-concept, the effect-concept and the phrase or word (often a verb or conjunction) indicating that they are related and in what way (positively or negatively). The outcomes of our project confirmed our expectation that automating CM is a difficult machine learning task: the predictions from the mchine learning models do not come close to the labels given by the human coders.

Still, there are plenty of reasons to be optimistic about our results: Both the models we developed for the causal relation presence detection and the causal relation tagging tasks could be quite useful despite producing false positives. Evaluation of the outcomes showed that it is quite easy for a hand-coder to recognize and dismiss them. The models may thus be used in a so-called ‘human-in-the-loop’ pipeline in which the ‘machine’ identifies causal sections or relations in the text that are subsequently checked and corrected by a human coder. These corrections could then be fed back into the model to improve its learning.

We also found that especially the semantic role labelling method in combination with manually written rules seems promising in the causal relation tagging task. We also used relatively strict evaluation criteria for this project. Compared to other widely used automated methods in the field of political science, for example, our results are actually comparable. We are currently further exploring the potential of a rule-based model.

Although we did not fully solve our research problem in this project, participating in the [Small-Scale Initiative in Machine-Learning](/small-scale-initiative-in-machine-learning-2021-how-did-it-go-9978a70b5b1) yielded promising results which culminated into a new research question guiding the next stage of our project. Our research team had only a basic understanding of machine learning before the start of this project, and the support offered by the engineers of the eScience Center has been invaluable to reaching the next stage of our project This allows us state with confidence: To be continued…

*This blog is part of our blog series: *[*The Small-Scale Initiative on Machine Learning, how did it go?*](/small-scale-initiative-in-machine-learning-2021-how-did-it-go-9978a70b5b1)*, where groups who were invited to participate in a project with eScience Center Research Software Engineers write about their projects and their experience.*

1. Read a full report of the project [here](https://www.researchgate.net/publication/363295614_Towards_Automated_Cognitive_Mapping_of_Political_Speeches_using_Machine_Learning).
