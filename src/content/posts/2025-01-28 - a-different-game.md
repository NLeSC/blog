---
layout: post
title: "A Different Game"
author: Carsten Schnober
published: true
source: medium
source_url: https://blog.esciencecenter.nl/a-different-game-7e1a1c5797c8
tags:
  - Collaboration
  - Community
  - Deep Learning
  - GPU
  - Git
  - Linux
---

3

*According to a panel of football experts, the world's best male player of the year 2024 was Rodri. The choice is naturally debatable, but even if you put him together with other stars like Erling Haaland and Kylian Mbappé, they will not stand a chance in a match against a full team of 11 amateurs. The world stars could perform great dribblings and accurate passes, but they cannot play the team sport called football.*

*To build complex software, highly skilled programmers are essential. But only effective collaboration enables them to achieve big things in the world of modern software engineering.*

![A Different Game](/assets/a-different-game-f432a766.jpg)

Photo by [Ruben Leija](https://unsplash.com/@rleija_?utm_source=medium&amp;utm_medium=referral) on [Unsplash](https://unsplash.com/?utm_source=medium&amp;utm_medium=referral)

## From Programmer to Software Engineer

At the [Netherlands eScience Center](https://www.esciencecenter.nl/), we do not play football, but we develop research software. We also teach [courses and workshops](https://www.esciencecenter.nl/training-materials/), including *Collaborative Software Development*. Compared to workshops about Deep Learning or GPU Programming, tools like [Git](https://git-scm.com/), [GitHub](https://github.com/) or [GitLab](https://gitlab.com/) may not seem very advanced. Nevertheless, at the end of some workshops, some participants almost refuse to leave the room, enthusiastically finishing the collaborative setup for a project. Also, I vividly remember how a partner of ours spontaneously mentioned her most important learning while working with us: “I learned to cooperate with others!”

The impact that the relatively little technical learnings have on the personal progress seems almost unreasonably large. That is because we do not just teach how to use the Git ecosystem, but how to collaborate. Mastering the tools gives a glimpse at another level of software development that may have seemed unreachable for many programmers — like a lonely football player that has practised his or her skills on the ball and suddenly finds themselves in a well-organized team of players.

It is not a coincidence that Git was invented by the initiator of the most prominent open-source software. With his initial versions of Linux, Linus Torvalds made a great start. However, without good tooling, collaboration causes friction. To use [Linus' own words](https://ideas.ted.com/the-wisdom-of-linus-torvalds/):

> 

We were in this bad spot where we had thousands of people who wanted to participate, but in many ways I was the break point.

On his own, Linus could never have developed an operating system that now runs on millions of computers, including high-performance clusters, desktop PCs, laptops, phones, embedded systems and more. Seamless collaboration is the key:

> 

The big point for me was not being alone and having ten, maybe 100 people being involved. […] Going from 100 people to a million people is not a big deal.

The open-source software community turned Linux into high quality software in which bugs are fixed at a speed that software companies could only dream of, and new features come in by the day.

![A Different Game](/assets/a-different-game-9cf5e1f7.png)
A graph showing contributions to a Git repository.Epiphany moments emerge when individual software engineers realize — for instance during a workshop — that they can reach that new level of software engineering. In a collaborative setting, tools and methods like version control, automated testing, [linting](https://en.wikipedia.org/wiki/Lint_%28software%29), and [continuous integration](https://www.redhat.com/en/topics/devops/what-is-ci-cd) are no longer merely aesthetic practices. Not surprisingly: the rules of the game make sense once you play it.

## Incentives?

Software engineers working in the industry often pride themselves on their practical engineering skills. Partly understandably, because even Computer Science PhDs, hence highly skilled individuals, can seem like novices when they join a team and don’t know how to collaborate with them. This is, however, a comparison between players of different games: individual programming and collaborative software development, respectively.

For a company, the ability to develop software collaboratively is essential to survive after the start-up stage. If they do not adopt methods to join their forces effectively, their software engineers drown in a swamp of ever-increasing maintenance efforts and dependencies on individualized knowledge.

## Reality Check

So why is collaborative software development not the default method? One reason is that collaborative methods imply some overhead: developers need to invest time in learning to apply the tools — which only pays off in a team that thinks beyond short-term goals.

But collaborative development is more than tooling: it also requires open communication and mutual trust, which often comes into conflict with hierarchies and individualized reward systems. Each member of a team needs to find intrinsic motivation and confidence that they can contribute something meaningful.

Collaborative development principles often compete with existing incentives. In academia, software may be necessary to run an experiment, but is frequently abandoned as soon as the corresponding paper is published. Terms like “project-ware”, “PhD-ware” and “professor-ware” are typically not used in a positive way, but the one-off approach concurs with the fact that individual performance is measured by the number of publications.

Developing software so that other researchers can extend it for their own experiments brings no benefit — in a highly competitive environment, the opposite might even be the case. In the football analogy: a striker that is measured by how well they can shoot penalties does not benefit from practicing combination play with the team.

The same applies in industry settings, even though playing the team game is more fundamental. Anyway, developers are hired, promoted and fired based on their individual performances. An engineer who quickly drops a new feature into production is more likely to be perceived as a mythical 10x engineer* than their peer who makes sure it still works after the next update, for instance by implementing integration tests.

## Agile, Waterfall and Hierarchies

How to tackle the complexities of software development has been a hot topic for decades. The *Waterfall* approach tries to plan a project as a sequence of clearly defined steps that eventually lead to the finish line. In the reality of software engineering, however, that finish line tends to be moving, while the intermediate steps face unforeseen obstacles and complexities that cannot be fully grasped by an individual engineer.

To account for the inherent dynamics of software development, *Agile* methods have proposed that planning has to be refined iteratively, involving continuous interaction between all stakeholders — requiring effective collaboration on various levels.

![A Different Game](/assets/a-different-game-351e29e4.jpg)
Collaboration is more than learning how to use Git. *Photo by Lisamarie Babik — Ted &amp; Ian. Uploaded by Edward, CC BY 2.0, *[*https://commons.wikimedia.org/w/index.php?curid=9546406*](https://commons.wikimedia.org/w/index.php?curid=9546406)However, the reality of organizational hierarchies, project-based budgeting and purely individual accountability conflicts with the radical changes that are required to have teams that can refine their (intermediate) goals autonomously. In practice, *Agile* therefore often means not much more than introducing a level of fancy terminology and rituals.

## To the Next Level

In any organization, collaboration remains a trade-off between immediate personal advancement on the one hand, and contributing to sustainable, collective progress on the other hand. The feedback that we get at *Collaborative Software Development* workshops shows that many people like the team game: it allows them to shine as part of a team that is able to build things far bigger than what any member could achieve on their own.

The topic of collaborative software development might be so fascinating because it touches upon many issues beyond engineering. Like forming an effective football team, software engineering is a social process that requires technical skills, but can also lead to questions about the structure of an entire organization.
