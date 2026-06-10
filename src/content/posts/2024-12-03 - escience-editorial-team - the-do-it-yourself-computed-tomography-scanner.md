---
layout: post
title: "The ‘do-it-yourself’ Computed Tomography scanner"
date: 2024-12-03
author: eScience Editorial Team
published: true
source: medium
source_url: https://blog.esciencecenter.nl/the-do-it-yourself-computed-tomography-scanner-e9e666ea4789
tags:
  - 3D
  - Collaboration
  - Git
  - RSE
---

By [Francien Bossema](https://www.esciencecenter.nl/fellowship-programme/francien-bossema/)

Researchers developed a method to use existing X-ray imaging facilities for Computed Tomography (CT) scanning

![The ‘do-it-yourself’ Computed Tomography scanner](/assets/the-do-it-yourself-computed-tomography-s-69f18984.jpg)
Photo by [Cara Shelton](https://unsplash.com/@socalcaral?utm_source=medium&amp;utm_medium=referral) on [Unsplash](https://unsplash.com/?utm_source=medium&amp;utm_medium=referral)This is a cross-post from our fellow [Dr. Francien Bossema](https://www.linkedin.com/in/francien-bossema-a587b012a/). Originally published on the [CWI website](https://www.cwi.nl/en/news/the-do-it-yourself-ct-scanner/).

More information on our Fellowship programme [here](https://www.esciencecenter.nl/fellowship-programme/).

—

What if you could saw a wooden sculpture through to look at the tree rings? Could a clay sculpture be hollow? What type of instruments were used to craft art objects? These questions could be answered by X-ray imaging. In particular, CT-scans are useful to investigate historical art objects on the inside. The CT-scans that are suitable for this application are however not easily accessible for researchers and quite expensive to acquire. An international team of researchers led by CWI, the Dutch national research center for mathematics and computer science, has therefore developed a method to use existing X-ray imaging facilities for CT scanning. The results have been published [on the 14th of May in Nature Communications](https://www.nature.com/articles/s41467-024-48102-w).

Research facilities of large museums, such as the Rijksmuseum in Amsterdam, often house an X-ray imaging machine, with which they can perform live inspection of objects. This works in the same way as when you have to have an X-ray image taken at the hospital because of a broken bone. On such an image the bone can be seen, because it has a higher density than the muscles and tissue surrounding it. Usually, a few images are taken, so that the fracture can be inspected from different sides. For more complex problems, a CT scan is made. The technique behind CT scans is similar to X-ray images. For a CT scan hundreds of X-ray images are taken from different angles and then combined into a 3D image using reconstruction algorithms. This 3D image can then be ‘sliced open’ to obtain cross sections showing the interior.

Over the past years, this technique has been increasingly applied to art objects, because it gives the possibility to investigate the interior without damaging the object. It is possible to date wooden objects by looking at the tree rings, assess the internal damage by an insect infestation or search for clues about the techniques used by the artist.

## No CT scanner? No problem!

![The ‘do-it-yourself’ Computed Tomography scanner](/assets/the-do-it-yourself-computed-tomography-s-7f9418ba.jpg)
CT scans provide more information than X-ray images. In museums, however, simple X-ray imaging setups are more common. The components of the machine are similar (an X-ray tube, rotation stage and a detector), but for a CT scan the positions of these components during the scan need to be known very accurately. The researchers from CWI have therefore developed a method to calculate these positions after a data acquisition, with nothing more than a few small metal balls. These balls are put in a piece of foam and scanned alongside the object. Based on the location of the balls on the X-ray images, all the necessary positions can be calculated. These are then used to obtain a CT-scan.

This unique project is a collaboration between a team of international researchers from CWI (Amsterdam), Leiden Institute of Advanced Computer Science (Leiden), Rijksmuseum (Amsterdam), The British Museum (London, UK) and the J. Paul Getty Museum (Los Angeles, USA). The X-ray imaging facilities of each of these museums, as well as the FleX-ray laboratory at CWI, have been used to test the new method and compare results in different facilities. The X-ray setups at the Rijksmuseum and the J. Paul Getty museum have been used for CT scans for the first time.

The first author of the associated Nature Communications article [Francien Bossema](https://www.cwi.nl/en/people/francien-bossema/) will defend her PhD thesis at Leiden University on the topic of CT scanning for cultural heritage on the 23rd of May.

> 

We can do something that was not possible before. CT scanning is an important imaging method for museums, because researchers can digitally cut open an object without damaging it. Our method makes it possible to further integrate this technique into research practices in the museum, without obtaining new hardware. We only use small metal balls of the type you also have in the pedals of your bike and algorithms specifically designed for this purpose. This means no extra investments are needed, while still providing an additional imaging technique.*

*Francien Bossema, CWI*

## New method gives insights into the making process of a sculpture

After the development of this technique, a sculpture made of plaster from the J. Paul Getty Museum was studied: *Python Killing a Gnu*, by Antoine-Louis Barye (J. Paul Getty Museum, 85.SE.48). The sculpture originally had a different configuration, it was smaller and more compact because it was initially used as a model for a group of sculptures that was displayed on a dining table. The artist later decided to change the model to open and enlarge the arrangement and turn it into a stand-alone sculpture. The possibility to CT-scan the object was welcomed by the conservator who was investigating this object, Madeline Corona (Getty Museum): ‘On the X-ray images, we could see that areas had been broken, altered, and filled but it was difficult to understand exactly how the artist made these changes because there were too many overlapping features. The CT-scan gave us an incredible opportunity to obtain clearer and more detailed images of these areas of change. In the end, it provided important insights that allowed us to confirm some of our hypotheses about Barye’s working methods, something we could not have done without this technique.”

![The ‘do-it-yourself’ Computed Tomography scanner](/assets/the-do-it-yourself-computed-tomography-s-db1b697e.jpg)

![The ‘do-it-yourself’ Computed Tomography scanner](/assets/the-do-it-yourself-computed-tomography-s-66c789e0.png)

## More information

* Article [*Enabling 3D CT-scanning of cultural heritage objects using only in-house 2D X-ray equipment in museums*](https://www.nature.com/articles/s41467-024-48102-w) in Nature Communications 14 May 2024.
* [Francien Bossema](https://www.cwi.nl/en/people/francien-bossema/) (CWI/Rijksmuseum), bossema@cwi.nl
* [Prof. dr. Joost Batenburg](https://www.cwi.nl/en/people/joost-batenburg/) (LIACS), k.j.batenburg@liacs.leidenuniv.nl
* [Madeline Corona](https://www.getty.edu/author/corona-madeline/) (Getty Museum), MCorona@getty.edu
* [FleX-ray CT lab at CWI](https://www.cwi.nl/en/collaboration/labs/flex-ray-lab/)
* [Computational Imaging group at CWI](https://www.cwi.nl/en/groups/computational-imaging/)
