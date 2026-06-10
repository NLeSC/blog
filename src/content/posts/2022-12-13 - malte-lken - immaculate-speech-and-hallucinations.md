---
layout: post
title: "Immaculate Speech and Hallucinations"
date: 2022-12-13
author: Malte Lüken
published: true
source: medium
source_url: https://blog.esciencecenter.nl/immaculate-speech-and-hallucinations-ea87e545a9ef
tags:
  - uncategorized

---

## When (not) to use OpenAI’s Whisper to transcribe audio in a social sciences project

Using Whisper off-the-shelf in this case might bias the results because it tends to “polish” the structure and coherence of the speech in the transcription. It is also known to sometimes insert* common words when nothing was said, which is called “hallucination”. Thus, Whisper could artificially create, alter, or even remove the effect to be investigated.

![Immaculate Speech and Hallucinations](/assets/immaculate-speech-and-hallucinations-c3c9df4f.jpg)
Photo by [Miguel Henriques](https://unsplash.com/@miguel_photo?utm_source=medium&amp;utm_medium=referral) on [Unsplash](https://unsplash.com/?utm_source=medium&amp;utm_medium=referral)

### Other Scenarios Where Whisper Can Be Useful

In addition to the previous examples, I also want to mention two other good use cases for Whisper. The transcripts can be fed into a second machine learning model which, for example, predicts the sentiment of each sentence. The sentence structure returned by Whisper is necessary, and many recent language models that perform sentiment prediction benefit from clean and structured input text. However, one should keep in mind that errors in the transcriptions made by Whisper will likely lead to errors in the sentiment prediction too.

Another use case is the transcription of audio recordings in languages that are not known a priori, for example, when using data from YouTube. Whisper can automatically detect the language and transcribe the recordings. Moreover, it can also translate the transcripts to English. This combination can make the analysis of multilingual datasets a lot easier. However, Whisper transcribes some languages better than others, which researchers should consider to avoid bias.

### Concluding Remarks

In this post, I gave some examples how Whisper can be applied in social science research. Whisper shines when structured and coherent transcripts are important. In contrast, when the transcribed text should mimic the original speech closely, the model might be less useful. With Whisper many tasks can be solved using a single tool, whereas traditional approaches require many processing steps by different methods. Finally, I want to highlight that, in any case, the transcripts should at least be partially checked for unexpected results by someone who is familiar with the recordings and the research domain. Discussing the approach and results with a machine learning expert will also not hurt. To those, who found inspiration in this post, happy whispering!

Reference: Radford, A., Kim, J. W., Xu, T., Brockman, G., McLeavey, C., Sutskever, I. (2022). Robust speech recognition via large-scale weak supervision. [https://cdn.openai.com/papers/whisper.pdf](https://cdn.openai.com/papers/whisper.pdf)

[1]: In the field of machine learning, audio transcription falls under the task Automatic Speech Recognition (ASR).

[2]: This figure gives a quick overview of Whispers transcription performance: [https://github.com/openai/whisper/blob/main/language-breakdown.svg](https://github.com/openai/whisper/blob/main/language-breakdown.svg)
