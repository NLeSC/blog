---
layout: post
title: "Optimizing plasma sources through numerical simulation"
date: 2019-11-28
author: eScience Editorial Team
published: true
source: medium
source_url: https://blog.esciencecenter.nl/optimizing-plasma-sources-through-numerical-simulation-a530f4623cdb
tags:
  - uncategorized

---

![Optimizing plasma sources through numerical simulation](/assets/optimizing-plasma-sources-through-numeri-d4fbc88f.png)

# Optimizing plasma sources through numerical simulation

Cold plasma sources are promising devices for the transformation of carbon dioxide into methane and other value-added chemicals. These sources have numerous other important technological applications and as such are the focus of many projects currently carried out with industrial research partners.**

![Optimizing plasma sources through numerical simulation](/assets/optimizing-plasma-sources-through-numeri-67412b5b.png)
From left to right: Wouter Graef, Jan van Dijk, Stefan Verhoeven, Nicolas Renaud, Chris Schoutrop., Adithya VijaykumarAt the Modeling Section of the group Elementary Processes in Gas Discharges at Eindhoven University of Technology, extensive research is being done on gaining a better understanding of cold plasma sources and on using this knowledge to optimize these plasma sources with the help of modelling and numerical simulation. Doing so, however, requires managing and reducing chemical complexity, and the ability to successfully exchange underlying data sets and tools with peers and end-users. The project Passing XSAMS, led by Dr. Jan van Dijk from TU Eindhoven and supported by the Netherlands eScience Center, targets both. Its aim is to develop efficient numerical schemes to simulate the transport fluxes in multi-component mixtures and develop new data exchange formats.

## MagnumPI**

“The project came at the perfect moment”, says Van Dijk, who is associate professor of Applied Physics. “We were looking for opportunities to fund the work on these themes, which is not always easy because they require a blend of physical, computational mathematics and networking expertise that is difficult to come by. XAMS matched our needs perfectly and has been a true game changer.”

![Optimizing plasma sources through numerical simulation](/assets/optimizing-plasma-sources-through-numeri-7ee518e9.jpeg)
According to Van Dijk, work in all three areas has progressed significantly. Two new iterative matrix solvers have been implemented for the Eigen matrix-vector library and will be made available to the community after further testing and documentation. The mathematics of multi-component mixtures have been clarified significantly and new transport flux schemes are on the way. In addition, new data formats are currently being tested in a code that integrates inter-atomic potentials into cross sections and other quantities of interest for transport simulations. This code, called MagnumPI, will be made available to the community in the near future.

> 

“The collaboration with the eScience Center has been a wonderful experience.” — Jan van Dijk

Stefan Verhoeven, senior research engineer at the eScience Center, was closely involved in the development of MagnumPI. ‘The tool can calculate different aspects of two particles such as atoms crashing into each other”, says Verhoeven. “We wrote it in C++ and wrapped it into a web application. In addition, we developed the tool with a clear focus on making it compatible with open formats and ensuring it is unit aware.” In addition to MagnumPI, the eScience Center team, which includes Verhoeven and Dr Adithya Vijaykumar, also standardized the input and output formats of the command line, web service and web application using JSON schemas, thereby making it possible to take C++ functions and run them in a web browser without the need for server compute power.

![Optimizing plasma sources through numerical simulation](/assets/optimizing-plasma-sources-through-numeri-75eb9831.png)

## **Own language, unique expertise**

The project has benefitted immensely from the unique expertise each project member brings to the table, says Van Dijk. “The collaboration with the eScience Center has been a wonderful experience. The combination of the eScience knowledge of Adithhya and Stefan in their respective fields of expertise with the domain-specific knowledge on plasmas at TU/e and project partner Plasma Matters B.V. has resulted in progress that until recently I had not even dared to hope for.”

> 

“I really believe that our own vocabularies and set of expertise combined nicely to accelerate the rate of progress we made in the project. It has been a great experience.”

While extremely fruitful, the collaborative effort wasn’t without its own set of challenges, says Verhoeven. “I previously worked in the pharmaceutical industry where a lot of use was made of molecular dynamics. The XAMS project uses some of the same terminology, but also terms that have a completely different meaning. For example, the term ‘species’ has a very clear meaning to most people, but in plasma physics it refers to a type of particle. This domain-specific language took some time getting used to, especially the abbreviations. Luckily, the project partners were extremely patient in explaining their domains and the problems they face. I really believe that our own vocabularies and set of expertise combined nicely to accelerate the rate of progress we made in the project. It has been a great experience.”

Read more about [Passing XSAMS](https://www.esciencecenter.nl/project/passing-xsams)
Read more about [Jan van Dijk](https://www.tue.nl/en/research/researchers/jan-van-dijk/)
