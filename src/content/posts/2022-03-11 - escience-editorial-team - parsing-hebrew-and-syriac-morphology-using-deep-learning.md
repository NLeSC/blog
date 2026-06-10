---
layout: post
title: "Parsing Hebrew and Syriac morphology using Deep Learning"
date: 2022-03-11
author: eScience Editorial Team
published: true
source: medium
source_url: https://blog.esciencecenter.nl/parsing-hebrew-and-syriac-morphology-using-deep-learning-cb6832bb6685
tags:
  - uncategorized

---

**SubscribeRemember me for faster sign in

Generally, we work with a transcription of the text, called the ETCBC transcription. Here you see the vocalized transcription of Genesis 17:4:

&gt;:ANIJ HIN.;H B:RIJTIJ &gt;IT.@K: W:H@JIJT@ L:&gt;AB H:AMOWN G.OWJIMAnd this is the unvocalized transcription:

&gt;NJ HNH BRJTJ &gt;TK WHJJT L&gt;B HMWN GWJMThe analyzed form of this verse looks as follows:

&gt;NJ HNH BRJT/+J &gt;T==+K W-HJ(H&amp;J[T L-&gt;B/:c HMWN/:c GWJ/(JMYes, we know that this may look non-sense to you, but stay with us. Everything will get clearer a few lines below.

The analyzed sequence contains all the consonants from the unvocalized transcription, with a number of added signs. For example, the “=” signs are used to disambiguate lexemes, the “+” is used to separate a pronominal suffix from the rest of a word, and “-” is used to distinguish words that form a single graphical unit, which is often the case with prepositions and the following word. A number of other signs are used for distinguishing different types of morphemes.

The analyzed form contains all the information that is needed to extract all the word-level features, such as verbal stem, verbal tense, person, number, gender, and part of speech. In this research, we want to obtain the fully analyzed form of a verse, using the raw vocalized or unvocalized text as input. It is to be expected that the vocalized text will produce more accurate outputs than the unvocalized text, because it simply contains more information. In many cases, an ambiguity in the consonantal text is disambiguated by the vowels.

If the vocalized text contains more information than the unvocalized text, why do we use the unvocalized text anyway? Most texts in Hebrew and Syriac do not contain vowels, so if we want to use the results of this research in production, in general, the unvocalized texts are more important.

The project** 
Before the project started, we were experimenting already with producing the analyzed sequences using machine learning models, but the help of the eScience Center consultants Dafne van Kuppevelt and Jisk Attema has been invaluable for improving the results. Depending on the quality and amount of the input data, we have been able to increase the accuracy of the predicted forms in some experiments up to 97%.

The consultants helped us implement new models that are used generally for translation tasks, such as LSTM (Long Short-Term Memory) and Transformer models. Also, they have helped with various refinements that improved the result, such as Beam Search and systematically tweaking the input data and hyperparameters of the models. The help of the consultants has resulted in a broader and more up-to-date view of the field of machine learning and to look further than just the most basic techniques.

All in all, this SSI project has expanded our experience with machine learning techniques substantially. Armed with newly acquired skills and experiences, we can move forward and use this type of model in new projects, in which we can effectively produce analyzed Hebrew and Syriac data, not only with the goal of expanding the ETCBC dataset but also in other projects in which parallel language sequences play a role.

[1]: For the Text-Fabric software, see: [https://github.com/annotation/text-fabric](https://github.com/annotation/text-fabric), and for the dataset, see: [https://etcbc.github.io/bhsa.](https://etcbc.github.io/bhsa.)

[2]: More precisely, it is the text of the fourth edition of the Biblia Hebraica Stuttgartensia (BHS). The Text-Fabric text edition with annotations is called Biblia Hebraica Stuttgartensia Amstelodamensis (BHSA).

[3]: For a description of the data creation process, see: [http://www.etcbc.nl/datacreation.](http://www.etcbc.nl/datacreation.)
