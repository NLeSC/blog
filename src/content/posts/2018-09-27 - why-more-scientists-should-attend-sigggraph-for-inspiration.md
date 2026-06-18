---
title: "Why more scientists should attend SIGGGRAPH for inspiration!"
author: Maarten van Meersbergen
published: true
source: medium
tags:
  - uncategorized
---

![](/assets/1_bhrYc7NjpacyJ64gwFACSQ-aa6a14d8.png)

This year I was lucky enough to be able to travel to the city of Vancouver to attend the SIGGRAPH 2018 conference, the annual conference on computer graphics convened by the ACM SIGGRAPH organization. What I learned there was most of all that I want to go every year! What a great source of knowledge and inspiration!

In this blog post I will summarize my experiences along the following themes:

- Courses
- Papers and posters
- Production sessions
- Birds of a Feather and Khronos-specific events
- Keynote talks

I hope this will give you some insight into the SIGGRAPH conference and what it can offer.

## Courses

Many courses were offered at the conference, with a wide range of topics related to computer graphics, machine learning, animation and more. The full list can be found [here](https://s2018.siggraph.org/conference/conference-overview/courses/). I’ve attended two of these; *Introduction to the Vulkan Graphics API* and [*Introduction to DirectX Raytracing*](http://intro-to-dxr.cwyman.org/). The website of the second is quite comprehensive so in the interest of not making this blog *too* extensive, I’ll leave that to you to explore if you want.

![](/assets/1_g8BdoXVRbTApuzEOjUYKRQ-edf396b8.png)

### Introduction to the Vulkan Graphics API

**(material** [**here**](http://web.engr.oregonstate.edu/~mjb/vulkan/Handouts/ABRIDGED.1pp.pdf)**)**

**Vulkan goals:**

- much less driver complexity and overhead than OpenGL has
- much less user hand-holding
- higher single-threaded performance than OpenGL can deliver
- able to do multithreaded graphics
- able to handle tiled rendering

### Main takeaways:

- Screen coordinate system is Y-down (internally LEFT-handed)
- No “current state”, at least not one maintained by the driver (Synchronization is the responsibility of the application)
- All transformation, color, texture functionality must be done in shaders
- Shaders are pre-”half-compiled” outside of your application. The compilation process is then finished during the pipeline-building process (Your shaders get turned into an intermediate form known as SPIR-V )
- Data Buffers for everything!

## Technical papers and posters

Now we get to the meat of the conference and the main reason I was there. The technical papers tracks were excellent, and the way SIGGRAPH introduces the talks there is equally good. The Sunday evening programme included a 2-hour fast-forward session in which the presenters each had 30 seconds to introduce their talk and try to get people to attend. With the conference App in hand, it was easy to register the talks that you peaked your interest, and assemble your personal schedule.

Here’s a selection of the fast-forwards to the talks I attended, please let me know if you want to know more!

- [**Synthetic depth-of-field with a single camera mobile phone**](https://www.youtube.com/embed/CV_14aUBxsI?start=1805&end=1839&autoplay=1)
- [**Stereo magnification**](https://www.youtube.com/embed/CV_14aUBxsI?start=1839&end=1874&autoplay=1)
- [**FaceVR**](https://www.youtube.com/embed/CV_14aUBxsI?start=2017&end=2049&autoplay=1) **(VR conference without VR headsets)**
- [**Deep appearance models for face rendering**](https://www.youtube.com/embed/CV_14aUBxsI?start=2049&end=2084&autoplay=1)
- [**Natural boundary conditions for smoothing**](https://www.youtube.com/embed/CV_14aUBxsI?start=2510&end=2540&autoplay=1)
- [**Water surface wavelets**](https://www.youtube.com/embed/CV_14aUBxsI?start=3459&end=3490&autoplay=1)
- [**TempoGAN**](https://www.youtube.com/embed/CV_14aUBxsI?start=3490&end=3525&autoplay=1) **(Deep learning smoke)**

![](/assets/1_1hJampYm5dmZzf0_O8hRRQ-eb31375d.png)

some of the posters at the siggraph 2018 conference

- [**High performace software rendering pipeline**](https://www.youtube.com/embed/CV_14aUBxsI?start=5595&end=5629&autoplay=1)
- [**Slang**](https://www.youtube.com/embed/CV_14aUBxsI?start=5595&end=5664&autoplay=1)
- [**Mode-adaptive neural networks for quadruped motion control**](https://www.youtube.com/embed/CV_14aUBxsI?start=5773&end=5804&autoplay=1)
- [**Physical simulation of environmentally induced thin shell deformation**](https://www.youtube.com/embed/CV_14aUBxsI?start=5843&end=5876&autoplay=1)
- [**A material point method for thin shells with frictional contact**](https://www.youtube.com/embed/CV_14aUBxsI?start=5876&end=5911&autoplay=1)
- [**Animating fluid sediment mixture**](https://www.youtube.com/embed/CV_14aUBxsI?start=5951&end=5983&autoplay=1)
- [**Skaterbots**](https://www.youtube.com/embed/CV_14aUBxsI?start=6443&end=6475&autoplay=1)
- [**Deep video portraits**](https://www.youtube.com/embed/CV_14aUBxsI?start=6549&end=6581&autoplay=1)
- [**Headon, real time reenactment of human portrait videos**](https://www.youtube.com/embed/CV_14aUBxsI?start=6581&end=6615&autoplay=1)

The main takeaway here for me are that Computer Graphics(CG) nowadays is heavily dependent on Neural Networks and much of the latest research in Neural networks has direct implications in this bleeding-edge field.  
Attending also reaffirmed my belief that many scientists can benefit from knowing the latest and greatest in Computer Graphics.

Not only because physics simulations and animation are rapidly approaching realism or that the latest techniques in CG can have significant impact in other fields, but also because it is very important to show to the public what science is all about. The more enthusiastic we can get the public about science, the better!

## Birds of a Feather sessions

![](/assets/1_r5jZBdvOEhy10nH2Pqyg2Q-2bdc044a.png)

These sessions focus on bringing communities together and stimulate the sharing of knowledge. This is (mostly) done by showing applications that make use of certain libraries, as well as presenting the updates to said libraries and planned future work and attempting to involve the audience in discussions on the future direction of the library or field.

[**CesiumJS: 3D globes on the web**](https://www.youtube.com/embed/r-5ADuoFNws?start=338&end=861&autoplay=1)

Please check the link for many exciting talks about the new capabilities of CesiumJS as well as applications and future directions. I especially liked the new point cloud options in Cesium as well as the procedural terrain shading.

**Scaling up 3D Medical Applications for people everywhere**

Talks on medical domain applications of 3D. Here’s some links to excellent examples I picked up:

- [https://github.com/VolumeRC/MIRROR4all](https://github.com/VolumeRC/MIRROR4all) (Medical Image Rendering Online for Real people)
- [Zebrafish browser](http://metagrid2.sv.vt.edu/~chris526/zbb/)
- [Virtual Natural History Museum](http://vnhm.de/VNHM/index.php)
- [3dprint.nih.org](https://3dprint.nih.gov/)

## Khronos events

The consortium for open standards in 3d graphics and much more, the Khronos Group organized its own sessions which were filled with discussions and presentations on the current state of OpenGL and Vulkan, WebGL (2.0) and more. I managed to catch a few of these, most notably:

![](/assets/1_sk5bXLmgG-2jhtLBDgkHzQ-a4e828ba.png)

- [**WebGL: Latest techniques**](https://www.youtube.com/embed/FCAM-3aAzXg?start=7335&end=7553&autoplay=1)
- [**Uber**](https://www.youtube.com/embed/FCAM-3aAzXg?start=8677&end=9009&autoplay=1) **’s** [**Vis.gl**](http://vis.gl/) [**Deck.gl**](http://deck.gl/) [**Kepler.gl**](http://kepler.gl/) [**Nebula.gl**](https://neb.gl/)
- [**Sub-centimeter pointclouds in Cesium**](https://www.youtube.com/embed/%20FCAM-3aAzXg?start=10087&end=10416&autoplay=1)
- [**Ricardo Cabello, THREE.js founder, discussing the state of the art**](https://www.youtube.com/embed/FCAM-3aAzXg?start=10442&end=11129&autoplay=1)

## “Production sessions”

These are not really my core business so I couldn’t attend a lot of these, but oh my what a source of inspiration. The production sessions at SIGGRAPH are all about implementing visual effects techniques, mostly in movies and games. These are the ones I attended:

- **DNEG, Framestore, and MPC Present: The Visual Effects of “Blade Runner 2049”**
- **Making the Kessel Run in Less Than 12 Parsecs — The VFX of “Solo: A Star Wars Story”**
- **The Making of Marvel Studios’ “Avengers: Infinity War”**

## Talks

![](/assets/1_p77ONGFKyvZKJjbVGRWGlQ-b4e7c46e.png)

Not necessarily scientific talks, these elaborate on the full range of computer graphics and interactive techniques, including case studies, academic research, technical developments, improved pipeline tools, education and curriculum, professional development, or social commentary.

- **StarWars: The Last Jedi — Effects Simulation**
- **A Collocated Spatially Adaptive Approach to Smoke Simulation in Bifrost**
- **Rampage: A Pipelined Approach to Managing Large Scale Character Driven Effects**
- **SimpleBullet: Collaborating on a Modular Destruction Toolkit**

## Last but not least: Keynotes

Of course there were keynotes!

[**Rob Bredow: Star Wars: Solo**](https://www.youtube.com/watch?v=kUoIbP1l9yA)

An inspiring presentation by the executive creative director of Industrial Light and Magic (ILM) about the philosophy behind the making of Star Wars: Solo, as well as an inspirational talk for the upcoming generation in VFX.

[**Jen-Hsun Huang: Gforce RTX**](https://www.youtube.com/watch?v=Mrixi27G9yM) **launch**

It was amazing to be present at this monumental moment for 3D graphics. Real-time ray tracing was always “the future” and even though a lot of deep learning trickery is still needed for denoising the images, being able to have a working implementation of this already is an astounding achievement. The links below bring you directly to the most inspiring and interesting moments in the presentation on YouTube:

![](/assets/1_XWFlmYkdpAQ-hLKcMXZ3TQ-0ed1d48f.png)

## And then there was… computer animation festival

Another recurring feature of SIGGRAPH, the computer animation festival is a celebration of computer graphics and visual effects used for storytelling. Some trailers to the short films shown are here:
