---
layout: post
title: "The magic of teaching about the anti-magic of generative AI"
date: 2024-10-03
author: Candace Moore
published: true
source: medium
source_url: https://blog.esciencecenter.nl/the-magic-of-teaching-about-the-anti-magic-of-generative-ai-9f980acf6623
tags:
  - GenAI
  - Git
  - Health
  - Image Processing
  - Machine Learning
  - Python
---

![The magic of teaching about the anti-magic of generative AI](/assets/the-magic-of-teaching-about-the-anti-mag-bb4fa257.jpg)
Photo by [Owen Beard](https://unsplash.com/@owenbeard?utm_source=medium&amp;utm_medium=referral) on [Unsplash](https://unsplash.com/?utm_source=medium&amp;utm_medium=referral)Recently, I taught the pilot workshop [Medical Image Processing in Python](https://www.esciencecenter.nl/event/pilot-medical-image-processing/). The room was full of post-docs, research software engineers and even faculty, but mostly young PhD candidates or freshly minted PhDs. Although the Netherlands eScience Center offers many courses and workshops, most are established. Many are based on existing [Carpentries](https://carpentries.org/) materials that are taught globally. Recognizing a large gap in the existing curriculum in terms of computational medical image processing, the Netherlands eScience Center embraced the idea of starting some sort of workshop about it. Part of the gap, in my opinion, was a lack of a curriculum that addressed generative AI.

A few brave engineers at the Center designed their own workshops. This year, I did just that, and the process was at once terrifying and energizing. On the weekend before the course, I literally had a nightmare that the students would revolt during the workshop. I dreamt about angry PhDs in computer science yelling at me and the other course developer, a biomedical engineer, literally standing up during my MRI lecture, eyes rolling and correcting me about how spin echo MRI sequences were made.

By the end of the day, none of this had happened, yet I expected the students to be exhausted and perhaps annoyed. I had stuck a segment on generative AI onto the end of the day, and was dedicated to teaching it, but feared the student revolt of my nightmares might still be coming.

The role of instructor or faculty can often seem like a bit of a sham in the world of computation-driven health sciences research, and particularly any kind of medical signal processing. On the one hand, the theory behind signal processing is something instructors need to teach to students. On the other hand, all of the theory now needs to be implemented in the digital world, and the ability to implement anything with code well does not seem to track with rank. I have been around this part of academia long enough to know that the pattern is that often students should be teaching the teachers about technology, even if on paper it is the other way around. Would the students be annoyed about the relatively high amount of time we assigned to learn basic code for things like registration and segmentation?

Or would they just be exhausted? After all, since morning we had all written lots of code, accomplishing many non-trivial feats like [visualizing image registration in SITK](https://esciencecenter-digital-skills.github.io/medical-image-processing/simpleitk.html) and augmenting a dataset for machine learning. As I rounded the corner towards the end, showing what [pydicom](https://pydicom.github.io/pydicom/stable/index.html#) could do in terms of anonymizing DICOM metadata, I realized I had an urgent last message to impart. How would I ever make people continue to pay attention?

I took a breath and wondered if the students would start walking out, ready to leave after making it through most of the day. None of them did. Instead, to my surprise, students began engaging more during my last lecture. I could see them thinking about what I was saying.

Perhaps the topic of generative AI was not as ‘last year’ as I had imagined. I thought everyone had discussed generative AI to death at this point, and certainly, I wouldn’t point out anything younger people didn’t already know. I feared that I might seem like a grandma to them, still mystified and confused by the remote control. It turns out I was wrong about all of that.

Image generated in response to prompt for a T2 MRI axial slice of polycystic kidney diseaseI then showed some of the coding fails I have seen other people create with ChatGPT. The code I showed was far from ready to run, but it was what I had seen. The code began with approximately the following:

path_to_niftis = Z:\directory1\subdirectory1/subdirectory2\subdirectoy3
path_to_meta_data = directory1\subdirectory1/subdirectory4\subdirectoy5
variable_1 = some_never_specified_variable
def funct1():
  for variable_1:
  sub_folder = some_other_never_specified_variableSadly, the code did not improve from there. I then pointed out to the students that in both cases the problem here was that anyone had ever taken these outputs (the bad image and the bad code) seriously. Unfortunately, someone had, in the case of the code, and they approached me to review what they had prompted. With one glance, I asked, disingenuously “Did you actually run this?” knowing that at least half the lines would fail to run given that they included variables that were never assigned.

Afterward, I immediately wrote down some notes for my upcoming lecture. I stumbled upon yet another perfect example of one of the counter-intuitive problems of generative AI that I see all the time. To use these algorithms properly, you need to have deep knowledge of what you expect them to generate. At least in the field of medical imaging research, you cannot leapfrog over learning how to code or spending time with radiologists and pathologists to understand what proper images look like. If you are expert enough at coding, generative models can save you time by helping you debug and write boring code quickly (or so I hear from my more skilled colleagues who use these things). Now there is even [some science behind such claims](http://dx.doi.org/10.2139/ssrn.4945566), although the obvious conflicts of interest should have been stated explicitly in the linked article. But if you have not developed certain skills, generative AI will not necessarily save you time, as opposed to say getting people to share their data and code with you.

Unfortunately, I suspect the sudden uptick in student attention and involvement was not a reflection of my teaching. Ask anyone who teaches graduate students these days, and you will likely hear some stories about ChatGPT or Copilot or some other generative algorithm. Students have embraced these tools as if they were a sort of digital magic even though [there is nothing magical about these models](/language-modeling-the-first-100-years-357556816148). Speak the right spell over the bubbling pot, or server in this case, and the entire world will change into a place where you solve all problems in time to spend hours doing something other than studying and learning. The promise that seems to have been marketed is that not only will your code be written and your work done, but you will be transformed into a wizard who can warp the time-space continuum in such a way that you get free time.

Image generated by Openart.ai after several prompts by the authorThere is a bit of truth to this idea. What I didn’t tell the students is that code is by far the easy case. Here even a mediocre engineer can deploy a bit of witchcraft and potentially transform AI-generated code into something usable. The witchcraft is manual and automated testing. Sometimes all you have to do to improve AI-generated code is to try to get it to run and to write some tests for it. Many of my colleagues are actually getting some useful results out of generative tools.

With images, things get murkier. There is some published work showing that there are [synthetic images good enough so that even expert radiologists ](https://www.nature.com/articles/s41467-021-27577-x)could not detect that they were not real. But radiologists are not computers, and typically not engineers either. Rumor has it that in some unpublished studies, while the radiologists were fooled, the software engineers were not. They had seen so much of their own work they could recognize it. I suspect that in terms of machine learning features, generative algorithms might be able to create subtly detectable differences, and therefore a machine learning algorithm could potentially encode some bizarre unintended biases based on these features. I gave the students a more obvious example of potentially doubling down on biases in mammography. What if you want to balance a dataset with more breast cancer samples but all the synthetic data you create shows low-density, relatively fatty, breasts? Then you can potentially increase the correlation between this low density and breast cancer in your dataset. This kind of problem would be fairly easy for human eyes to see, but what about more subtle ones?

Alas, there are, as of yet, no magic-based solutions to some problems we face in medical imaging research. Maybe the younger generation, today’s students are still hoping for this, because some basic tasks in research now do have solutions that work at astounding speed. Computation on modern computers seems like magic, especially if you do not see GPUs, but hear about some mystical cloud where these things live. The mistake I have seen students make is to double down on generative AI. “I must not be prompting this correctly”, they say when things go wrong, based on the assumption that with the right spell, precisely the code and images they want will appear. But could they even recognize them as such if they did?

> 

The mistake I have seen students make is to double down on generative AI. “I must not be prompting this correctly”, they say when things go wrong, based on the assumption that with the right spell, precisely the code and images they want will appear. But could they even recognize them as such if they did?

There is some level of debate in education about the relative importance of teaching facts and information as opposed to teaching methods and skills for discovery. Some people even argued that learning information was already obsolete in the era of search engines and instant access to information. Potentially generative AI is a method of discovery that can amplify anyone’s capabilities. However, I would argue that some amount of foundational information is necessary to get the most from generative tools. What I hope anyone educating university students reading this will take away from learning about my experience is that addressing the issues of Generative AI head-on will make your students stop playing with ChatGPT, sit up, and listen. And maybe even rededicate themselves to including alternative, older forms of knowledge acquisition alongside embracing generative-based methods. Whatever the case, talking about this stuff seems to have almost supernatural effects.
