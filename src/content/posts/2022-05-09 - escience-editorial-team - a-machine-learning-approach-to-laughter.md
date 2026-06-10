---
layout: post
title: "A machine learning approach to laughter"
date: 2022-05-09
author: eScience Editorial Team
published: true
source: medium
source_url: https://blog.esciencecenter.nl/a-machine-learning-approach-to-laughter-fdbcee3fb000
tags:
  - uncategorized

---

**SubscribeRemember me for faster sign in

Our mentors at the eScience Center ([Patrick Bos](https://www.esciencecenter.nl/team/dr-patrick-bos/), [Florian Huber](https://medium.com/@f.huber), and [Jisk Attema](https://www.esciencecenter.nl/team/dr-jisk-attema/)), provided us with practical guidance in the use of such libraries, which provided an invaluable learning opportunity. For instance, we learned about how the data quality (i.e., sample size, uneven distribution of certain features) might affect the machine learning outputs, which resulted in taking the time to evaluate and scope data with meticulous data integration and data exploration. They also helped our conceptual understanding: what could the results actually tell us? Our machine learning results confirmed quantitatively what the t-SNE had shown qualitatively: tickling laughter was acoustically distinct from the other three types, while laughter produced in reaction to verbal jokes, someone else’s misfortune, and watching something funny were not systematically different from one another. An experiment with human participants also confirmed that tickling laughter is perceptually distinct from the other types; listeners could tell whether a laugh was produced by a person who was being tickled or not with remarkable accuracy. Our results made a lot of sense: tickling is a play behavior that is evolutionarily ancient and shared with other animals, whereas the other kinds of situations are all much more cognitively demanding, and probably unique to humans.

Extracting feature importance told us which acoustic features were most distinct, pointing us to the possibility that tickling laughter is less controlled than other kinds of laughter. To really understand what differentiates laughter produced in tickling contexts from other situations, we complemented the computational analyses with human perceptual judgments. We ran a new listening task in which naive participants (who did not know about the context in which the laughs were produced) were asked to judge the extent to which the laughter sounded controlled, energetic, and so on. The results showed that laughter produced during tickling was judged to sound like the laughing person was not in control of their actions, in a state of high arousal, and in a situation involving physical contact with a familiar other.

Meanwhile, we also analyzed the visual content of the videos in order to see whether the types of situations that we had inferred qualitatively would be distinguishable by a quantitative analysis of what was actually in the videos. Maybe verbal jokes would involve more conversations, and videos involving someone laughing at another’s misfortune would feature more people slipping? To test this, we ran the videos through Google Video Intelligence API, which picks out categories of objects and events. For example, this analysis revealed that the tickling laughter videos involved a lot of body parts, while people laughing when they were watching something funny often involved screens and animals. Machine learning analyses showed that the four types of situations could be well differentiated from just the visual contextual information in the video clips, demonstrating that the distinctions we had made were indeed meaningful, even though some of the differences in context did not translate into acoustically different types of laughter.

![A machine learning approach to laughter](/assets/a-machine-learning-approach-to-laughter-3f586d65.png)
Random forest classification of the acoustic analysisAnd there you have it! We bet that after this blog and our analyses you’ll be thinking twice about your laughter. What makes you giggle? What makes your belly laugh? You’re also probably wondering, what’s next?

The next step for this project will be to tie the different strands together into a manuscript, accompanied by interactive online illustrations, which will be submitted for publication in a peer-reviewed journal. The consultation with our excellent mentors at the eScience Center provided an inspiring setting for discussing our ideas in a constructive and fun atmosphere. The guidance we received will be useful not only for this project but also for our future research.

[Dr. Disa Sauter**](https://www.uva.nl/en/profile/s/a/d.a.sauter/d.a.sauter.html) Associate Professor in the Department of Psychology at the University of Amsterdam. She studies emotions, focusing on nonverbal expressions with a particular interest in positive emotions.

[**Roza Kamiloğlu**](https://www.uva.nl/profiel/k/a/r.g.kamiloglu/r.g.kamiloglu.html)is a PhD candidate in psychology at University of Amsterdam. Her research interests include nonverbal expressions, emotion, and computational modeling.

[**Dr. Rui Sun**](https://www.uni-muenster.de/PsyIFP/AEMilek/en/team/sun.html) is a guest researcher at the Department of Psychology, University of Amsterdam. She is interested in positive emotion, wellbeing, and social media research.
