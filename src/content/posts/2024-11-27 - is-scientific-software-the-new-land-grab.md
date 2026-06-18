---
layout: post
title: "Is scientific software the new land grab?"
author: Lourens Veen
published: true
source: medium
source_url: https://blog.esciencecenter.nl/is-scientific-software-the-new-land-grab-25e5e76cc323
tags:
  - Containers
  - Environment
  - Open Source
  - Reproducibility
  - Research Software
  - Workflows
---

3

Scientific software platforms are not always as open as they look at first sight. Avoid getting locked in with this advice!

“Do you know what CodeOcean is? Should I do this?” As a Research Software Engineer you often advise on all sorts of stuff, but I hadn’t heard this one before. In this case from a professor I work with, who’d sent a paper to Nature (as you do) and was asked by the editor to put the corresponding code in “CodeOcean”. Do I have an opinion on this?

![Is scientific software the new land grab?](/assets/is-scientific-software-the-new-land-grab-d0106fc2.jpg)
You mean this could be my office? Photo by [Sean Oulashin](https://unsplash.com/@oulashin?utm_source=medium&amp;utm_medium=referral) on [Unsplash](https://unsplash.com/?utm_source=medium&amp;utm_medium=referral)I’d never heard of CodeOcean. Data lakes, yes, and Wind River Systems, but CodeOcean? Never heard of. Fortunately, a web search found it quickly. I started reading.

CodeOcean is a cloud-based workflow execution and data storage platform. You can make an account, and then upload your scientific data and scripts into the system. Because the script is in containers in the cloud, the script’s environment never changes, so it will always run and your research will be easily reproducible by other researchers, who will be able to comfortably find it when they next log in. You and others can then compose *workflows*, step-by-step procedures for processing data, using your own software and that of others.

Sounds great, right?

Well, not to me actually, for reasons practical but mostly political. Let’s have a look at what’s really going on here.

## Reproducing and reusing

First, workflows. Workflows have been around for a long time. The idea of a workflow is that you can use a graphical editor to click together a series of steps that the computer is to perform, so that you can do custom processing without having to learn programming.

This sounds nice in theory, but has its limitations. Steps can only be combined by feeding output from one step into the next. This is done through files, which is slow, and it’s limited in that you cannot send data back and forth between different programs.

Graphical, drag-and-drop approaches, while easy to understand at first, quickly become overly complex in real-world scenarios. Because of this, scripting, where you describe what you want in text, is more popular and increasingly widely taught at universities. So a workflow system is not necessarily what people actually need, even if it looks good on screen.

Furthermore, the story above cuts some corners. Reproducibility is not the same as reusability, and a script is not the same as a reusable software package. Putting your script in the system and getting it into a container and running is probably doable in most cases, and will create reproducibility, at least for a while depending on how complicated the thing is you’re trying to do.

Science is more than just reproducing results though. We want to build on them, and we don’t want to have to re-implement everything that has already been researched. Instead, we’d like to reuse the work of our predecessors, so that we can get started right away. So we need *reusability* as well as reproducibility.

> 

We need reusability as well as reproducibility

For reusability to work, a lot more work is needed. Researchers will have to convert their script, which is designed to run just once, on specific input data, with its author at hand to handle any issues as they arise, into a reusable workflow step that can run many times, handle a range of inputs, and solve any issues by itself or at least give an error that is understandable by someone who doesn’t know the software. This is a lot of work, and it takes a lot more skill and experience than creating a script.

Setting up a workflow system in the cloud is one thing (especially if you pull a ready-made Open Source one off the Internet, as CodeOcean has to their credit done), but it needs to be populated with reusable software to be a useful workflow development platform, and that is difficult and time-consuming.

So, will a system like this actually be useful? We have some existing workflow systems in science that are well used in particular communities, like [KNIME](https://en.wikipedia.org/wiki/KNIME), so it’ll likely be of some use, but I don’t see this being the great solution to reusing scientific software. I do see something else, however: lock-in.

![Is scientific software the new land grab?](/assets/is-scientific-software-the-new-land-grab-420cacda.jpg)

Photo by [Jametlene Reskp](https://unsplash.com/@reskp?utm_source=medium&amp;utm_medium=referral) on [Unsplash](https://unsplash.com/?utm_source=medium&amp;utm_medium=referral)

## The next landgrab

CodeOcean claim that their platform is open. You can put your software and data on there, and everyone else can download it. And since the workflow engine they use, Apache Airflow, is Open Source, you may even be able to use the downloaded bits to put together a workflow locally.

Doing that in practice is going to be quite a bit of work, and unlike with other repositories you need an account just to download anything. So there’s a network effect here: if most of the data and software you want is on this platform, then adding the rest is easier than getting the data and software out and running somewhere else.

The login requirement also raises a barrier: I can easily grab data from a public server from a script, but with CodeOcean I have to go to my browser and do it by hand. Unless of course, I put my script into their platform.

For a workflow platform like this to be truly open, it would have to be able to use data sets and compute steps from other platforms in its workflows, and allow other platforms (or local scripts) to use data and steps available on it. That would leave users free to choose any platform (or their own laptop) to put their data and software on, as well as to compose workflows on, because it ensures that we all can work together regardless of which product we choose to use.

> 

The downside of a federated system is that it’s more difficult to make money off of it.

The downside of a federated system is that it’s more difficult to make money off of it. Without a network effect, multiple providers could compete, and users would be free to switch. Such a free market would reduce prices, and that would be good for us eternally cash-strapped scientists, but investors in these companies would get less profit.

So, if I ran a company like CodeOcean and wanted to make good money, I’d do something else. I’d require people to sign up to use the service, I would make it so that you could only combine data and software from different sources if all the data and all the software is in my system, and then I would make deals with some high-ranking journals to get them to push scientists to put their data and software on my platform.

Other scientists are likely to want to use those high-profile data sets and software modules, and to do so, I’d make them sign up first. I would then design my user interface to push people towards using the data and software on my site, rather than downloading them and using them locally.

They’d add their software and data to my platform, this being easier than getting things to run on their own computers, which encourages others to join as well, and the whole thing will snowball.

Then, having obtained many users, I would have a look at the email addresses with which they signed up. I’d contact the universities they work for, and explain politely that many of their employees are using my service. I’d tell them that free accounts are going to go away, and that the university will have to pay an annual fee.

If they refuse, I’d block their scientists from my platform. The scientists would then protest their university administration because, without their data and software, they cannot work. The university would then pay me, I’d re-enable access, and subsequently retire to a tropical beach to sip cocktails and add more features to my scientific software.

![Is scientific software the new land grab?](/assets/is-scientific-software-the-new-land-grab-53a82e4a.jpg)
I’ll need to order a cup holder for my laptop… Photo by [Whitney Wright](https://unsplash.com/@whitney_wright?utm_source=medium&amp;utm_medium=referral) on [Unsplash](https://unsplash.com/?utm_source=medium&amp;utm_medium=referral)

## Déja vu

Am I a brilliant business strategist? Of course not. This business model, in which society pays people with public money to produce scientific output, which is then appropriated by a commercial platform and sold back to the public, is what Open Access has fought hard against.

It’s taken a long time to get to a point where we are now mostly publishing Open Access (even in Nature, if you’re rich), and much of our publicly funded work is still locked away behind paywalls, but overall I’d say it’s been a success. That doesn’t deter people from trying to pull us back into the same trap however, this time for data and software. Instead of fighting our way out, maybe this time we should avoid falling into it in the first place.

The good news is, we can! Instead of putting your data set on CodeOcean or a similar locked-in platform, put it on [Zenodo](https://zenodo.org/) or [Figshare](https://figshare.com/). These platforms allow anyone to download your data without an account, enabling them to use it anywhere. Scripts can go there too, and like data, they’ll get a DOI so that you can refer to them from your Open Access paper.

No one installs reusable software from Zenodo, so if you make a reusable program then it’s best to publish it to the standard repository for the programming language you’re using. Python should go on PyPI and into conda-forge, the latter is also good for packages in C, C++, and Fortran, and Julia, Rust, R, and Java all have their standard places too.

These repositories are open, allowing anyone to install and use your software anywhere without getting locked into something. For development, you can use GitLab (your own or one in the cloud) or GitHub, which also allows anyone to clone your repository without signing up or putting their own software in there.

Of course running these platforms isn’t free. Zenodo is paid for by CERN, the particle physics lab in Switzerland. Figshare is run by a company. The conda package manager is mostly developed by Anaconda Inc. (another company), conda-forge runs on spare cloud resources donated by Microsoft, GitHub is owned by Microsoft and GitLab is run by the company with the same name.

The difference is that conda is open source and so are conda-forge’s scripts and bots, and that git is an independent open source program, so that I can trivially clone a git repository off of GitHub and push it onto GitLab or vice versa.

Issues and pull requests are harder to move, and there is somewhat of a network effect on these latter platforms for developers, who need to have an account for security reasons, but you don’t get locked in just to run anything, and it’s still easy to combine software and data from different sources.

Sometimes it’s useful to put something in the cloud. Scientific software is often poorly engineered and difficult to install, and it can be nice to share an entire pre-installed environment sometimes, for demonstration purposes for example.

If that’s what you want, go talk to your academic computing center! SURF for example here in The Netherlands have the [SURF Research Cloud](https://www.surf.nl/en/services/surf-research-cloud), an environment in which you can create virtual machine images with your software, which other people can then run and use on SURF infrastructure.

This does require an account (a standard SURFconext one that you use for their other services too), but at least it’s an account with a not-for-profit whose task it is to provide these resources to scientists. In short, SURF are working for you, not for a return on investment.

![Is scientific software the new land grab?](/assets/is-scientific-software-the-new-land-grab-a2a5337a.jpg)
Example of a researcher using the SURF Research Cloud. Photo by [Tim Mossholder](https://unsplash.com/@timmossholder?utm_source=medium&amp;utm_medium=referral) on [Unsplash](https://unsplash.com/?utm_source=medium&amp;utm_medium=referral)

## In short

If someone invites you to put your scientific software onto their platform then you should have a good look first to see what this platform is for. Is this publicly funded infrastructure set up to make science more open and to support open collaboration? Then go right ahead. Is it commercial? Then it could still be okay, if it’s open enough. But beware of companies trying to appropriate your publicly funded work. We don’t need to fall into that trap again.
