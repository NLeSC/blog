---
layout: post
title: "eScience trends from ADASS 2020"
date: 2020-11-23
author: Hanno Spreeuw
published: true
source: medium
source_url: https://blog.esciencecenter.nl/escience-trends-from-adass-2020-d83f18b228d4
tags:
  - uncategorized

---

# **eScience trends from ADASS 2020**

## **Scaling up compute and storage resources are not going to be the biggest hurdles.**

**8
### My general feeling about this conference

What a delight ADASS (Astronomical Data Analysis Software and Systems) 2020 was! My first virtual conference, but the same positive vibe as the previous one, ADASS 2019 in Groningen, The Netherlands. This one was in Granada, Spain, but it could have been anywhere, obviously. There were 581 participants and over 50 talks. Last year, ADASS had 353 participants, which was also quite considerable. One of the organisers said that there were quite a few participants from previously underrepresented countries. The cost of participating in this virtual conference was substantially lower than for the physical conferences, which could explain its popularity this year.

In hindsight, the Discord tool for discussion and social talk was essential. This gave me a feeling of being part of this conference. It was set up nicely with separate channels for each session, that continued after the session had ended, together with a number of general channels. Talks started at 6:00 a.m. CET and ended at 20:30 CET with somewhat fewer talks during the middle of the day to accommodate for speakers and audience in other time zones. Of course, it is impossible to make a schedule that fits all time zones, but I guess the organisers wanted to avoid people having to present their work at 3 a.m. local time.

### Highlights

![eScience trends from ADASS 2020](/assets/escience-trends-from-adass-2020-5a8a4b9c.png)
Slide from Matthew Graham’s presentation “[What did we get right? Lessons learned from the first 300 million alerts of ZTF](https://www.youtube.com/watch?v=rPb22usn7hU&amp;t=41m10s)” .Matthew Graham** (invited speaker, professor at Caltech and project scientist for ZTF, the Zwicky Transient Facility), started off by listing his predictions from his ADASS 2008 presentation: what he thought would be the main bottlenecks and achievements in astronomy by the year 2020. Here are two of those predictions:

* In 2008 he perceived that artificial intelligence would govern the alert streams without human interactions. We have clearly not reached that point yet. Humans are still in the loop, i.e. the current machine learning algorithms are not fully trusted.
* In 2020, we would have huge problems with scalability to process the data firehoses and store the data lakes. As stated clearly in the slide above, this turns out not to be the case: we do have the compute power and storage to handle all this data and we can develop software that scales well.

Instead our focus needs to shift from data management to information and knowledge management. Present concerns are about establishing veracity, about provenance and probabilities based on astrophysical statistics. What are my assumptions and where are they coming from? These are presently much more severe concerns in delivering sound scientific conclusions than technogical challenges, they require astronomical or astrophysical expertise rather than computer engineering solutions.

![eScience trends from ADASS 2020](/assets/escience-trends-from-adass-2020-fce35a68.png)
Slide from talk by Verdana Desai: “Enabling next-generation science investigations with the NASA Astrophysics Archives”.**Vandana Desai** (invited speaker, associate scientist at Caltech and science lead for the Infrared Science Archive (IRSA) of IPAC, the Infrared Processing &amp; Analysis Center) gave an insightful talk: “Enabling next-generation science investigations with the NASA Astrophysics Archives”. This covered part of her white paper “[A Science Platform Network to Facilitate Astrophysics in the 2020s](https://www.noao.edu/2020Decadal/files/DesaiVandana.pdf)”. This white paper advocates “funding of data centers to develop and operate ‘science platforms’, which will provide storage and computing resources for the astronomical community to run analyses near the data”. “Science platforms” are envisaged as the way to enable scientific progress in the era of big data; our progress in understanding physical processes in the cosmos is enhanced by the simultaneous use of multi-wavelength observations possibly augmented with neutrino and gravitational wave detections. These platforms should accommodate the needs of a much larger group than just the ‘power users’, serving many more than the inner circle of scientists that are aware of all the complexities involved in reducing the raw data. Desai made clear that “We cannot have all of the data that an astronomer might want to use under a single, unified science platform”. This is not feasible “and probably never will be “ because of the “practicalities involved” which I suppose reflects the heterogeneity of astronomical observations. It is clear that analysis tools, including machine learning will require more compute power. The bottom panel from the slide above shows the increased use of archival data in the last decades, i.e. the use of data by others than the people near the principal investigator of a rewarded observing proposal. Until now, the combined data from astronomical sources was mostly extracted from catalogs which only include a few quantities like position on the sky, peak intensity, integrated flux and perhaps a few other quantities derived from the source pixel distribution. In the future, astronomers will need access to the actual pixels comprising the source for a more accurate analysis, which enhances the demand for storage and computing.

![eScience trends from ADASS 2020](/assets/escience-trends-from-adass-2020-cf4353c4.png)
Slide from Cristobal Bordiu’s presentation “[Astronomical research in the next decade: trends, barriers and needs in data access, management, visualization and analysis](https://www.youtube.com/watch?v=oG_Xq3FzRGU&amp;t=1h53m36s)”.Some of the same conclusions, but more from a European rather than American perspective, were drawn by **Cristobal Bordiu** (postdoc for the Italian National Institute of Astrophysics (INAF) at the Catania Astrophysical Observatory) from a survey for NEANIAS (Novel EOSC Services for Emerging Atmosphere, Underwater &amp; Space Challenges). This project, which emerged from EOSC, the European Open Science Cloud, aims to set solid foundations for astronomy in the coming decade, so it covers the same time span as the [white paper by Desai et al.](https://www.noao.edu/2020Decadal/files/DesaiVandana.pdf) The respondees showed concern about storage, about reproducibility and about findability and interopability of raw, calibrated and higher level data products, as reflected by the slide above. They also perceive the availability of visual analytics tools as a main research barrier.

### Conclusion

The lack of science-ready data products, [which I reported on last year](/escience-trends-from-adass-2019-f68cd8cca49b), applies mostly to radio astronomy, where the complete reduction of observations, including calibration of visibilities and subsequent imaging has to be done quite often by the researchers themselves. Fortunately, this situation is improving, with radio observatories taking up the glove. However, what ADASS 2020 made clear, is that more is needed that just these science-ready data products; to enhance scientific progress interoperable data from simultaneous observations at multiple electromagnetic wavelengths — possibly augmented with neutrino and gravitational wave detections— are required. Most conveniently, these would be analysed using “science platforms” which offer software tools for analysis, such as machine learning, that can be run in a completely hardware agnostic way.
