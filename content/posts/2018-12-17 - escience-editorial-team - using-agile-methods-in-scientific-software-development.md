---
layout: post
title: "using agile methods in scientific software development"
date: 2018-12-17
author: eScience Editorial Team
published: true
source: medium
tags:
  - Agile
  - Collaboration
  - Git
  - RSE
  - Research Software
  - Software Engineering
---

![](/assets/1_4cOctoypHHDbrgkQ1CGUvA-30a9a8fb.jpeg)

Photo: www.unsplash.com

**Software plays an increasingly important role in all aspects of the modern scientific enterprise. The practice of developing scientific software, however, is still young and uncultivated compared to more traditional methods and instruments. In this sense, the full potential of software for science has yet to be realised, but to reach that point, we must improve upon the methods by which the software is conceived, produced, and maintained. In this post, we consider what Agile methodologies have to offer scientific software development, with the hope of stimulating discussion around what practices can help improve the quality and longevity of scientific software.**

Software engineering research has long recognised the importance of having adequate processes and methodologies to guide software development, but much more needs to be done to realise the benefits of good practices in the scientific software domain. Systematic [reviews of the literature](https://doi.org/10.1145/1985782.1985784) support Agile methodologies as being beneficial to scientific software developers as there appears to be a natural fit between iterative development and the exploratory character of science. However, “Agile” is often a term applied post hoc to scientific software developers, who, without formal training, have independently arrived at approaches that resemble agile ones. Domain scientists would benefit from having a closer dialogue with software engineers in order to create approaches that are more tailored to their needs and that take advantage of the best practices known in conventional industry. But what does it mean for “Agile” to work in the context in scientific software development, and how do we sell these ideas to our audience?

Agile itself is a term laden with meaning in industry, and for the sake of clarity, we begin by defining just what is meant by it. Here we use the language of the [Agile Manifesto](http://agilemanifesto.org/), which identified the four principles of Agile: (1) individuals and interactions over processes and tools, (2) working software over comprehensive documentation, (3) customer collaboration over contract negotiation, and (4) responding to change over following a plan. There are many methodologies which support these principles (e.g. scrum), but a pitfall of applying these methodologies to scientific software is that they may not match the needs and expectations of these teams. For example, we cannot focus our attention on the individual without recognising their context: scientific software developers are often self-taught, uniquely qualified in their domain, and divided between many different commitments; this does not mesh well with the implicit assumption of many agile methods that developers are trained, interchangeable, and fully committed to a project. The realities of scientific software development demand a principled approach to adapting and adopting Agile. Along these lines, we provide several guidelines.

**Make priorities explicit.** Know what tasks need to be done, understand their priority and make realistic time predictions. One way to make your tasks and priorities visual is by using a physical to-do board with post-its. Of course, this is not always practical when the team is physically separated, but platforms like Github offer digital alternatives to create and organise issues.

**Work iteratively.** During a research project, insights evolve and the requirements for the software change. This is exactly where iterative, agile development is a good fit. Implement features during relatively short iterations, for example based on a 2-week sprint, if that fits your team. After each iteration, review and revise the plans and tasks, and make adjustments based on feedback from stakeholders.

**Communication within a clear framework.** Ensure that all collaborators involved understand the Agile way of working, and preferably have them committed to the process. Make an inventory of who the key actors are in the project — who are the developers, who is the “product owner” (one of the developers, the project PI, an external collaborator, etc.) and who the end-users are. For all of these people, determine how they are involved in the process and how to get their feedback during development. This helps you shape the development process. Communication between both team members and stakeholders is key for an effective agile workway. Therefore, facilitate both informal and formal contact moments to keep everyone involved. How to do this in practice depends very much on the size, composition and location of your team. If possible, organise a short daily stand-up: this provides a natural occasion to keep each other up-to-date and to ask for help.

**Introduce Agile working in an agile way.** The million dollar question is what aspects of Agile working are beneficial to your research software project. Each project is different, and defining a good development process is a process in itself! It is unlikely that you know the ideal way of working at day one of your project. Therefore, start with small steps to improve the process, and iterate and reflect along the way.

Scientific software developers can benefit from Agile practices for scientific software. The adoption and proper tailoring of these practices can increase the efficiency and effectiveness of teams working to provide software to scientists. Many scientists know about the benefits of agile methods and partially implement them even without knowing about agile development. The simple steps of making a plan, continuously adapting the plan, effective communication and iteratively adjusting the working method to test and include more agile methods can help them create software.To support scientific software developers on this way, we all need to help point software engineers in the right direction. We suggest the conduction of empirical studies to assess benefits and challenges of agile practices in scientific software engineering. One step in this direction is the creation of an “Agile in Research Software Development” carpentries course by the WSSSPE/SSI/RSE community.
