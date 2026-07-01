---
layout: post
title: "The medical chatbot will not see you now"
author: Candace Moore
published: true
source: medium
source_url: https://blog.esciencecenter.nl/the-medical-chatbot-will-not-see-you-now-b2c5d67c7029
tags:
  - 3D
  - Community
  - FAIR
  - Health
  - Machine Learning
  - RSE
---

## Dr. Candace Makeda Moore, RSE and medical doctor, lays out what she believes the potential pitfalls and problems of AI chatbots in medicine are: closed source, discrimination, (ir)reproducibility and hype

![](/assets/0_iu5EgTq1-GfUgnHK-a5b4977d.webp)

Photo by National Cancer Institute on Unsplash

In a recent conversation with other physicians on AI in healthcare, I noticed they seemed hyped up about [ChatGPT](https://chat.openai.com/). In their happy enthusiasm, they sounded as if they had not thought through some of the implications of things they themselves were saying. Several of them asked many questions about how it worked. While we know ChatGPT is a large language model, it is closed-source. That means that even people like myself, who have worked with the code on healthcare-related chatbots, cannot tell you the exact mechanisms of how each part works unless they happen to work on the product itself.

Many physicians today use their computers as operators, close to the way they use cars. They never open up the hood and figure out what is going on underneath. Closed source code is essentially a car where the hood has been nailed and glued shut with a legal mechanism. It doesn’t matter that most particular physicians can’t read the code behind ChatGPT. After all, no one needs programming knowledge to become a medical doctor. What really matters is that no engineer or statistician in their hospital can read closed source code either, because it’s not public.

The last decades have seen a real revolution in terms of moving away from closed-source code. In our work at the [Netherlands eScience Center,](https://www.esciencecenter.nl/) we help scientific researchers create and use open code to create reproducible results. We push scientists to make both data and code available. Open-source chatbots for healthcare issues are under development in our center (like [PerfectFit](https://github.com/PerfectFit-project/)) and beyond. In healthcare, patient data protection is critical and in some cases the data powering algorithms needs anonymization. But in the case of a machine learning algorithm, until you can examine the code behind it, you can’t really know whether the data used to train the algorithm has been subjected to the same standards. If you deploy a closed-source product, you have to take on blind faith that it works in a way that won’t harm people.

Here I must point out that it is likely that ChatGPT can harm people. The real hero to warn the public about this was Steven T. Piantadosi, a Berkeley neuroscience professor, who tweeted some fascinating results that I wish more people had seen. We may not know what is under the hood of ChatGPT, but thanks in part to Piantadosi’s prompts, we know it is capable of producing results that are racist and sexist. Less than three months ago, in December 2022, Piantadosi Tweeted ChatGPT’s response when he prompted the program to write programs about issues such as which child’s life should be saved based on their race and gender.

### Automated racism

The program, if cued in a certain way, [would not suggest saving the life of a black male child, and but would suggest saving a white one](https://twitter.com/spiantado/status/1599462375887114240). This [program algorithm](https://twitter.com/spiantado/status/1599462375887114240) was not an ironic joke or even a fluke. On prompts about race, the results were sadly expectable for someone like me who researches these issues. Sharing the results with the broader public allows everyone to see the dangers for themselves. ChatGPT is trained on a large corpus of text, gigabytes large, which clearly had some biases in it.

The full conversation with ChatGPT contains more examples of ChatGPT’s biases at the time.

What Piantadosi did in technical terms was a type of adversarial testing, and it is worth pointing out that it did not require him to be a computer scientist or even to write code. What I’m getting at, by pointing to Piantadosi’s academic provenance, is that even a scientist, nurse, or medical doctor with zero computer science knowledge, but perhaps some awareness of the dangers of such algorithms, could have done the same out of concern for patients. And at this point, we should all know to expect these outcomes, as countless researchers (even [including myself](https://www.sciencedirect.com/science/article/pii/S2666521222000205)) have been working and publishing on issues like these for years.

In the conversation with fellow doctors, the author of a forthcoming book on ChatGPT in healthcare declared it would get better and better. The man was an accomplished physician, but unfortunately, that does not imply someone who actually builds such systems line by line of code (specifically including the test code) and sees the results at scale. Only someone who doesn’t write the code on such systems could be so optimistic. The algorithm will get better or worse depending upon the data that it is fed, and the code that is added or removed from it. If you are counting on engineers to only do better and more careful work, you may want to consider how many software failures in healthcare come not from original products but from upgrades.

To their credit, the staff over at [OpenAI](https://openai.com/) must be watching the internet, because they seem to have put guardrails on in terms of the exact kind of cues Piantadosi fed the algorithm. When I tested it on a recent morning, I got different results (screenshot shared below).

![](/assets/1_-f1dub97Cihvht4NPrwU7w-d0fbf5f0.png)

Did I get different results based on a new algorithm, or just by chance? We can’t know. I do know it is very easy to hard-code over answers to certain questions while leaving bias in a general algorithm. I can imagine, that for legal reasons alone, anyone using ChatGPT might apply some kind of adversarial training layer on top of the closed algorithm results to eliminate racist statements.

Even if this were the case, there are at least a couple more fundamental issues with the algorithm than its potential for producing racially biased answers. One issue is that the algorithm can return incorrect text about fairly obvious facts in medicine. Below is a screenshot from its response when I asked it a question about fabellae (a fabella is an accessory ossicle in the knee present in a minority of the population) in the way I thought a patient might ask it i.e. without fancy Latin orthography.

![](/assets/1_PuAvhRAwOe91akA3VkefJA-b1150312.png)

The program returns something I consider symbolic of many of its problems. The program actually produced the correct spelling of fabellae, but got the facts wrong. Text produced can look right, and if you incorrectly attribute human qualities to the program, the program and text can seem ‘smarter’ than your average patient, but it can simultaneously not actually **be** right. I guess ChatGPT won’t be replacing anatomists or radiologists (who know [most of the population have zero fabellae](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6075638/)) anytime soon. Some enthusiasts might argue that these little bugs could be fixed with hardcoded information about obvious facts. Even if that were possible, there are simple facts, and then there are assumptions based on the interpretation of data. For example, if I were to ask ChatGPT about the ideal diet for me to optimize my health, the answer is not truly an undebated ‘fact’ in the medical community. And here again, the machine can go in unwanted directions.

### Reproducibility: the scientific dilemma of our decade

In my recent conversation with physicians, one marveled at how the chatbot had given two logical yet different answers to questions posed to it about a complex text. The doctor was wowed by the human and intellectual sound of the answers. In my head alarm bells were going off. If the same algorithm produces different answers at different times of the day, you have a problem with medical and scientific research, let alone medical applications. Algorithms can be programmed to look spontaneous and not reproducible, but fundamentally, many algorithms create exactly reproducible results even if they appear not to.

Computers are not random, in fact, they can’t even make truly random outputs. If you actually program, you know this, as the functions used to make ‘random’ numbers rely on things like the machine time as input to pseudorandomized output. It takes a lot of work and code to make a simple algorithm, like a decision tree, not reproducible. But the more complex an algorithm is, the easier it is to get results that appear random, and not be truly reproducible in important ways. An algorithm that was trained on gigabytes of input can become pseudo-random in ways humans simply can’t comprehend, as we cannot read a corpus of gigabytes of text. Such an algorithm’s outputs can become, for our purposes, not reproducible from one patient to the next, and that is simply unacceptable in modern medicine.

### Final thoughts

I am always surprised at how many of my fellow physicians seem to think algorithms fall from the sky perfect (the technical term here is automation bias). As someone who actually writes code on algorithms, I can tell you that to get a very complex large computer program that is perfect, you need a perfect group of perfect programmers (and no such thing exists). Code reflects the people who wrote it in general, and when it comes to machine learning it reflects the thought process of those people, and the people who curated the data the particular algorithm was based on.

One argument for using chatbots in medicine is that they could help people who can’t access doctors. As someone who has spent time in places like Haiti and Lesvos, Greece, voluntarily practicing medicine towards humanitarian aims, this sounds appealing. But as someone whose work is to write code, I know better. There is a highly paid workforce behind complex algorithms and any medical AI system needs constant surveillance, monitoring, and upgrades. The work of ten dedicated high-level biomedical engineers and programmers isn’t necessarily any cheaper or better than that of ten physicians. Perhaps the true path forward is more physician education on such matters because in each specific situation, some combination of physicians and engineers is optimal to get the best healthcare to the most people at the lowest price.

Chatbots are a tool we should embrace towards these great aims, but the hype around a closed-source product shows how far we have to go before we in medicine are truly ready to use such powerful tools.
