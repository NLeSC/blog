---
layout: post
title: "Conversations with a chatbot about CleanX"
date: 2022-03-07
author: Candace Moore
published: true
source: medium
source_url: https://blog.esciencecenter.nl/conversations-with-a-chatbot-about-cleanx-83455a5b1b87
tags:
  - uncategorized

---

# **Conversations with a chatbot about CleanX**

Dr. Moore: **Thank you. Perhaps your reporter module has some advanced algorithms to help people prove their points or maybe that was meant as a joke. What you are saying is a perfectly good example of why carefully curating data matters so much. A perfectly good algorithm trained on really biased or unrepresentative or mislabeled data can produce very misleading results. You clearly haven’t been to, or I suppose virtually seen by getting the right data on, the same hospitals I have been to. As soon as I graduated from medical school, I went to volunteer in Haiti. To say there was an imbalance between medical need and the system’s capabilities doesn’t begin to describe all the deficiencies of that system. That situation is not unique. There are many African countries with a handful of radiologists or less. But the problem of imbalance between radiology workload and workforce is not one confined to poor countries. In more developed health systems people have started relying on imaging and technology more and more, because they view it as objective, and a workaround for not having any clinical intuition. In some advanced systems things still fall between the cracks because people request more imaging than can realistically be read by anyone with the skills to read it. Humans have their limits everywhere, and I’m unaware of any system where things are working absolutely perfectly. That means there isn’t any system that could probably not be improved by AI. In a system with more staff, that might only mean using an AI system as a second opinion, or a triage system for more pathological images…in some countries like Haiti, AI may be the only hope to extend any service to parts of the population. We can’t wait for 20 years for countries like Haiti to cook up new hospital systems staffed by experts. Quite frankly, it might not even happen, and so many people are sick and need care now.

**Alec Smartbot:** Oh, OK, so you are going to save the whole world with technology?

**Dr. Moore: **I would never make such grandiose claims such as being able to save the world with technology. What I hope is that at a minimal my package facilitates communication between engineers and medical staff who want to make ML imaging and also starts educating people, making it easier for people at lower levels of programming skills to get their hands dirty making ML algorithms, especially people who are clinicians. The truth is that AI in medicine is coming whether we want it or not. Some years ago I went into a hypertensive crisis in New York City due to another condition. I did not receive adequate treatment. To this day I will wonder if it was just incompetence on the part of the medical staff, racism from the doctors, or the Optum algorithm. I tend to think it was a combination of all three. That algorithm is now the subject of a lawsuit from the state of New York itself about the fact that it discriminated against black patients. One of the questions we should be asking, if we are doctors who care about patients, is how can we avoid this kind of problem in the future. If we care about patients, we will not let algorithms give them worse care than we would have given them.

**Alec Smartbot:** Isn’t medical imaging probably the last place where you can prevent these kinds of social biases, why start there? I mean the X-rays are not really showing who has some funny sounding name like yours, that might lead doctors to suspect they are dealing with a black person or a woman, so how can using them in large quantities lead to care biased against a particular group?

**Dr. Moore: **Au contraire, chatbot extraordinaire. Bias has already snuck into imaging AI algorithms. You can read several interesting papers about that. Here is a link ([2003.00827.pdf (arxiv.org)](https://arxiv.org/pdf/2003.00827.pdf)) to one.

But let’s be clear just in case your NLP algorithm wasn’t trained on enough well curated data. There is statistical bias, and there is social bias. It’s probably impossible to create a perfect ML algorithm without a bit of statistical bias. What I want to get rid of is bias that causes harm against groups who are already impacted by social bias. We see health disparities among different groups of people for all kinds of reasons including bias against certain groups. Sexual and ethnic minorities, women, and people of low economic status are often not treated as well as others in health systems. AI can seriously compound these problems. I personally see a nightmare on the horizon when AI systems examine mammography screening for breast cancer screening. We need to address the issue that some populations get lower quality imaging read by less expert people, and think about that before we blindly train a dataset that ends up creating ML biased against these populations.

**Alec Smartbot: **OK, but we can’t really know all potential problems with algorithms like this beforehand. There will be mistakes, but AI is helping millions of people. You can buy my creator’s services to better program me as a chatbot or program me yourself. I am open source. I am an open book and you are an open door. Exit status 1.

**Dr. Moore: **So as your “AI” generated chit-chatbot garble nonsense perfectly demonstrates, there already are and will be mistakes. But we could avoid many of them. In a lot of cases it really boils down to adversarial testing. I mean seriously, take the same test data, and change things related to a social variable e.g. racial identity, and see if or how it affects your outcomes. It’s also quite easy to monitor these algorithms as they run if their data is set up in a way that you can easily dis-aggregate it. That’s why CleanX has special functions that process sensitive categories like gender into variables.

**Alec Smartbot:** Which you wrote an entire notebook to demo, which hung on a scenario about Martians. What on EARTH were you thinking? Ha Ha.

**Dr. Moore: **Well, apparently chatbots can* have a sense of humor. Ha ha, now that is a funny idea indeed. But this issue of entrenching and exacerbating social biases is a real world, real earth issue we need to get a hold of before it gets out of hand. Actually, it’s already out of hand, and I fear it could really slow things down in the advance of technology not to mention hurt many people. In the end most of us want a better world. Or so I hope.

So glad you asked. CleanX is…wait a second. I have a better idea. You are just a chatbot. You claim to be an open-source algorithm anyone can add to just like CleanX. I can reprogram you to tell everyone what CleanX is about, maybe even send them links to the demo Jupyter notebooks inside of it ([here](https://github.com/drcandacemakedamoore/cleanX/blob/main/additional_demos/image_quality_function_explanations.ipynb), [here](https://github.com/drcandacemakedamoore/cleanX/blob/main/workflow_demo/bias_not.ipynb), [here](https://github.com/drcandacemakedamoore/cleanX/blob/main/workflow_demo/classes_workflow.ipynb) and [here](https://github.com/drcandacemakedamoore/cleanX/blob/main/workflow_demo/for_medical_people.ipynb) for starters)…I’ll just clone you on my machine, insert CleanX messages in files no one bothers to read in pull requests that fix critical issues…

*…. Several weeks later a young programmer from the QA department of Smartbots suggested that the Alec Smartbot chatbot might do better if not trained on material from chat boards of computer programmers. After she threatened to go to the press (already scared about the rise of robot reporters) exposing some of the real inner workings of the chatbot, the makers of Alec Smartbot officially pivoted to a more limited domain chatbot for food delivery and shelved the robot reporter project….*

*…Guy, a young medical student, orders pizza online….*

**Alec Smartbot (version 2.0)**: How can I help you.

**Guy: **I want to order a cheese pizza. No extra toppings.

**Alec Smartbot (version 2.0)**: I understand you want a cheese pizza. I have predicted with 98% confidence you also have an interest in applying AI to medical imaging, or will in the future. You should know CleanX is open-source code that may be of interest to you. It was originally created for working with chest X-rays, but people in the ML community have also applied it to other types of medical images. CleanX has modules that deal with getting the image data out of DICOMs, evaluating test and training datasets, and exploring, normalizing and augmenting medical images. If you are interested to learn more, you can read every single line of code online. CleanX is open source and free for all. Your pizza will be 9 euros.
