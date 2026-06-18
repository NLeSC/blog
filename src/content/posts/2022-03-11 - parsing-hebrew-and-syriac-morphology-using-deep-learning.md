---
layout: post
title: "Parsing Hebrew and Syriac morphology using Deep Learning"
author: eScience Editorial Team
published: true
source: medium
source_url: https://blog.esciencecenter.nl/parsing-hebrew-and-syriac-morphology-using-deep-learning-cb6832bb6685
tags:
  - Deep Learning
  - Git
  - Machine Learning
  - Parallel Computing
  - RSE
---

State-of-the-art technology meets ancient literature

This blog is part of our blog series: *The Small-Scale Initiative on Machine Learning, how did it go?,* where groups who were invited to participate in a project with eScience Center Research Software Engineers write about their projects and their experience. This week, the guest authors are Dr. [Martijn Naaijer](https://vu-nl.academia.edu/MartijnNaaijer) and Prof. [Wido van Peursen](https://research.vu.nl/en/persons/willem-van-peursen).

![](/assets/0_RCeTAIngNgdUP3P0-10f08def.webp)

Photo by Mick Haupt on Unsplash

Over the past 40 years, the Eep Talstra Center for Bible and Computer ([ETCBC](http://etcbc.nl/)) has developed a richly annotated text of the Hebrew Bible. The annotations consist of features on the levels of words, phrases, clauses, and larger text units. Since a few years ago, this dataset is freely available and can be downloaded and processed with the Python package Text-Fabric¹.

The ETCBC has the ambition to expand its dataset with other Hebrew and Syriac texts. However, annotating these texts is a labor-intensive task, and it is desirable to develop ways to speed up this process. In this project with the eScience Center, we opt to do this using machine learning. We use the Hebrew Bible to train a model capable of analyzing the Biblical Hebrew morphology. After the optimization of this model, we use the developed approach to apply it to Syriac texts, for which a relatively small annotated dataset is available.  
  
**The Hebrew Bible**  
The Hebrew Bible is an ancient text, which is mostly written in, as the name already suggests, Biblical Hebrew. Mostly, but not only, as some parts are written in Biblical Aramaic. The Hebrew Bible consists of 39 books, which were written over the span of nearly a millennium (10th century BCE — 2nd century BCE). The oldest complete manuscript that is known to us is the so-called *Codex Leningradensis* (1008–1009 CE). The text of this manuscript is widely used as the basis of research on the Hebrew Bible and Bible translations. This is also the text contained in the ETCBC dataset².  
  
**Semitic languages**  
Syriac and Hebrew are relatively closely related Semitic languages, so it is expected that a method developed for Hebrew will also work for Syriac. The corpus of Classical Hebrew is relatively small, consisting of the Hebrew Bible, Ben Sira, the Dead Sea Scrolls and a number of inscriptions. In contrast, a vast corpus of Syriac literature has been transmitted to us, which makes it necessary to think about new approaches of analyzing these texts. Presently, the ETCBC databank contains a few annotated Syriac texts.  
  
**Hebrew morphology for computers**  
One of the first steps in the annotation process of new data for the ETCBC dataset is the analysis of word morphology, that is, the study of the words’ constituent parts³. This is done by distinguishing morphemes in words. The morphemes are encoded with various symbols added to the raw text.

For example, this is the text of Genesis 17:4 in Hebrew:

אני הנה בריתי אתך והיית לאב המון גוים

This is called the consonantal text, which is the oldest part of the text.

In the Middle Ages, some dots and lines above and under the letters were added. Those represent vowels and cantillation marks, small surrounding signs that clarify the pronunciation.

אֲנִ֕י הִנֵּ֥ה בְרִיתִ֖י אִתָּ֑ךְ וְהָיִ֕יתָ לְאַ֖ב הֲמֹ֥ון גֹּויִֽם

Generally, we work with a transcription of the text, called the ETCBC transcription. Here you see the vocalized transcription of Genesis 17:4:

```hs
>:ANIJ HIN.;H B:RIJTIJ >IT.@K: W:H@JIJT@ L:>AB H:AMOWN G.OWJIM
```

And this is the unvocalized transcription:

```hs
>NJ HNH BRJTJ >TK WHJJT L>B HMWN GWJM
```

The analyzed form of this verse looks as follows:

```hs
>NJ HNH BRJT/+J >T==+K W-HJ(H&J[T L->B/:c HMWN/:c GWJ/(JM
```

Yes, we know that this may look non-sense to you, but stay with us. Everything will get clearer a few lines below.

The analyzed sequence contains all the consonants from the unvocalized transcription, with a number of added signs. For example, the “=” signs are used to disambiguate lexemes, the “+” is used to separate a pronominal suffix from the rest of a word, and “-” is used to distinguish words that form a single graphical unit, which is often the case with prepositions and the following word. A number of other signs are used for distinguishing different types of morphemes.

The analyzed form contains all the information that is needed to extract all the word-level features, such as verbal stem, verbal tense, person, number, gender, and part of speech. In this research, we want to obtain the fully analyzed form of a verse, using the raw vocalized or unvocalized text as input. It is to be expected that the vocalized text will produce more accurate outputs than the unvocalized text, because it simply contains more information. In many cases, an ambiguity in the consonantal text is disambiguated by the vowels.

If the vocalized text contains more information than the unvocalized text, why do we use the unvocalized text anyway? Most texts in Hebrew and Syriac do not contain vowels, so if we want to use the results of this research in production, in general, the unvocalized texts are more important.

**The project**  
Before the project started, we were experimenting already with producing the analyzed sequences using machine learning models, but the help of the eScience Center consultants Dafne van Kuppevelt and Jisk Attema has been invaluable for improving the results. Depending on the quality and amount of the input data, we have been able to increase the accuracy of the predicted forms in some experiments up to 97%.

The consultants helped us implement new models that are used generally for translation tasks, such as LSTM (Long Short-Term Memory) and Transformer models. Also, they have helped with various refinements that improved the result, such as Beam Search and systematically tweaking the input data and hyperparameters of the models. The help of the consultants has resulted in a broader and more up-to-date view of the field of machine learning and to look further than just the most basic techniques.

All in all, this SSI project has expanded our experience with machine learning techniques substantially. Armed with newly acquired skills and experiences, we can move forward and use this type of model in new projects, in which we can effectively produce analyzed Hebrew and Syriac data, not only with the goal of expanding the ETCBC dataset but also in other projects in which parallel language sequences play a role.

\[1\]: For the Text-Fabric software, see: [https://github.com/annotation/text-fabric](https://github.com/annotation/text-fabric), and for the dataset, see: [https://etcbc.github.io/bhsa.](https://etcbc.github.io/bhsa.)

\[2\]: More precisely, it is the text of the fourth edition of the Biblia Hebraica Stuttgartensia (BHS). The Text-Fabric text edition with annotations is called Biblia Hebraica Stuttgartensia Amstelodamensis (BHSA).

\[3\]: For a description of the data creation process, see: [http://www.etcbc.nl/datacreation.](http://www.etcbc.nl/datacreation.)
