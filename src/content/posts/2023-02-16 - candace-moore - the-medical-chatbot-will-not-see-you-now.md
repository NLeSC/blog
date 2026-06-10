---
layout: post
title: "The medical chatbot will not see you now"
date: 2023-02-16
author: Candace Moore
published: true
source: medium
source_url: https://blog.esciencecenter.nl/the-medical-chatbot-will-not-see-you-now-b2c5d67c7029
tags:
  - uncategorized

---

## Dr. Candace Makeda Moore, RSE and medical doctor, lays out what she believes the potential pitfalls and problems of AI chatbots in medicine are: closed source, discrimination, (ir)reproducibility and hype

**SubscribeRemember me for faster sign in

To their credit, the staff over at [OpenAI](https://openai.com/) must be watching the internet, because they seem to have put guardrails on in terms of the exact kind of cues Piantadosi fed the algorithm. When I tested it on a recent morning, I got different results (screenshot shared below).

![The medical chatbot will not see you now](/assets/the-medical-chatbot-will-not-see-you-now-10893f61.png)
Did I get different results based on a new algorithm, or just by chance? We can’t know. I do know it is very easy to hard-code over answers to certain questions while leaving bias in a general algorithm. I can imagine, that for legal reasons alone, anyone using ChatGPT might apply some kind of adversarial training layer on top of the closed algorithm results to eliminate racist statements.

Even if this were the case, there are at least a couple more fundamental issues with the algorithm than its potential for producing racially biased answers. One issue is that the algorithm can return incorrect text about fairly obvious facts in medicine. Below is a screenshot from its response when I asked it a question about fabellae (a fabella is an accessory ossicle in the knee present in a minority of the population) in the way I thought a patient might ask it i.e. without fancy Latin orthography.

![The medical chatbot will not see you now](/assets/the-medical-chatbot-will-not-see-you-now-533d3fee.png)
The program returns something I consider symbolic of many of its problems. The program actually produced the correct spelling of fabellae, but got the facts wrong. Text produced can look right, and if you incorrectly attribute human qualities to the program, the program and text can seem ‘smarter’ than your average patient, but it can simultaneously not actually be** right. I guess ChatGPT won’t be replacing anatomists or radiologists (who know [most of the population have zero fabellae](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6075638/)) anytime soon. Some enthusiasts might argue that these little bugs could be fixed with hardcoded information about obvious facts. Even if that were possible, there are simple facts, and then there are assumptions based on the interpretation of data. For example, if I were to ask ChatGPT about the ideal diet for me to optimize my health, the answer is not truly an undebated ‘fact’ in the medical community. And here again, the machine can go in unwanted directions.

### Reproducibility: the scientific dilemma of our decade

In my recent conversation with physicians, one marveled at how the chatbot had given two logical yet different answers to questions posed to it about a complex text. The doctor was wowed by the human and intellectual sound of the answers. In my head alarm bells were going off. If the same algorithm produces different answers at different times of the day, you have a problem with medical and scientific research, let alone medical applications. Algorithms can be programmed to look spontaneous and not reproducible, but fundamentally, many algorithms create exactly reproducible results even if they appear not to.

Computers are not random, in fact, they can’t even make truly random outputs. If you actually program, you know this, as the functions used to make ‘random’ numbers rely on things like the machine time as input to pseudorandomized output. It takes a lot of work and code to make a simple algorithm, like a decision tree, not reproducible. But the more complex an algorithm is, the easier it is to get results that appear random, and not be truly reproducible in important ways. An algorithm that was trained on gigabytes of input can become pseudo-random in ways humans simply can’t comprehend, as we cannot read a corpus of gigabytes of text. Such an algorithm’s outputs can become, for our purposes, not reproducible from one patient to the next, and that is simply unacceptable in modern medicine.

### Final thoughts

I am always surprised at how many of my fellow physicians seem to think algorithms fall from the sky perfect (the technical term here is automation bias). As someone who actually writes code on algorithms, I can tell you that to get a very complex large computer program that is perfect, you need a perfect group of perfect programmers (and no such thing exists). Code reflects the people who wrote it in general, and when it comes to machine learning it reflects the thought process of those people, and the people who curated the data the particular algorithm was based on.

One argument for using chatbots in medicine is that they could help people who can’t access doctors. As someone who has spent time in places like Haiti and Lesvos, Greece, voluntarily practicing medicine towards humanitarian aims, this sounds appealing. But as someone whose work is to write code, I know better. There is a highly paid workforce behind complex algorithms and any medical AI system needs constant surveillance, monitoring, and upgrades. The work of ten dedicated high-level biomedical engineers and programmers isn’t necessarily any cheaper or better than that of ten physicians. Perhaps the true path forward is more physician education on such matters because in each specific situation, some combination of physicians and engineers is optimal to get the best healthcare to the most people at the lowest price.

Chatbots are a tool we should embrace towards these great aims, but the hype around a closed-source product shows how far we have to go before we in medicine are truly ready to use such powerful tools.each specific situation, some combination of physicians and engineers is optimal to get the best healthcare to the most people at the lowest price.

Chatbots are a tool we should embrace towards these great aims, but the hype around a closed-source product shows how far we have to go before we in medicine are truly ready to use such powerful tools.
