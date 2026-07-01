---
layout: post
title: "National Research Software Day: National Infrastructures for Sustainable Software"
author: eScience Editorial Team
published: true
source: medium
source_url: https://blog.esciencecenter.nl/national-research-software-day-national-infrastructures-for-sustainable-software-f5e20ec3eeff
tags:
  - API
  - Accessibility
  - Collaboration
  - Environment
  - Git
  - Open Science
---

*Written by *[*Luisa Orozco*](https://www.esciencecenter.nl/team/luisa-orozco/)*, *[*Daniela Gawehns*](https://danielagawehns.github.io/)*, and *[*Carlos Martinez-Ortiz*](https://www.esciencecenter.nl/team/dr-carlos-martinez-ortiz/)

The first [National Research Software Day](https://www.esciencecenter.nl/news/national-research-software-day-recap/) already took place more than five months ago in Hilversum, on 23 April 2024. Following an inspiring keynote by Rogier Kievit, several parallel sessions competed for the attention of participants. This blog covers the ‘National infrastructures for sustainable software’ session.

![National Research Software Day: National Infrastructures for Sustainable Software](/assets/national-research-software-day-national--8a937220.jpg)
This session was a follow-up from a [similar session](/open-science-festival-what-infrastructures-do-we-need-to-preserve-research-software-7c181404f310) that took place during the [Dutch Open Science Festival](https://opensciencefestival.nl/) in 2023. On this occasion, the format was the same: a series of panel pitches, followed by a group discussion. The panel shared their insights and experiences related to infrastructure used for creating and maintaining sustainable research software. The composition of the panel was different on this occasion, so the discussion took a different direction.

Luisa Orozco, RSE at the Netherlands eScience Center, led the discussion.

After the session, the panelists were also interviewed by Peter Schmidt for the [Code for Thought Podcast](https://codeforthought.buzzsprout.com/1326658/15210839-en-a-national-day-for-research-software-the-escience-center).

![National Research Software Day: National Infrastructures for Sustainable Software](/assets/national-research-software-day-national--912a8b8f.jpg)

## Panel composition and introduction

### Elaine van Ommen Kloeke, ARISE

At Naturalis we build a digital infrastructure for recognizing species biodiversity. Data is huge, vertebrates, plants, insects, fungi. It is a huge challenge to capture, store and move data.

### Louise Bezuidenhout, CWTS Leiden University

Senior researcher focusing on Open Science monitoring and the evolution of Open Science infrastructures. The CWTS publishes the annual Leiden University rankings using Open Data, based on the Leiden manifesto which advocates for open and transparent research assessments moving beyond the normal metrics.

### Jason Maassen, Research Software Directory

Jason is a Technology Lead at the Netherlands eScience Center supporting and helping researchers develop software. The eScience Center leads the Research Software Directory (RSD), a platform developed to highlight the roles of RSEs in research through links between software and other kinds of research outputs such as datasets, publications, research activities, projects and people.

### Roel Janssen, 4TU.ResearchData

4TU.ResearchData stores, archives and publishes datasets for technical universities in the Netherlands. I have the opportunity to work together at the National level with, for example, the RSD, to implement APIs and standards to help the deployability of research data and software.

## Discussion

*Which kind of software, or which kind of infrastructure do you need in your day-to-day work or your institutes?***

*Elaine:* There’s nothing standard that we can use. Some parts we can reuse and are open-source, while others have to be built from scratch. I need data storage, computing, dimension systems, PID identification systems, authentication, authorization and I need it to be user-friendly and encourage collaboration.

*Louise: *I need access to data and knowledge graphs that we can use for our meta-research.

***How does the RSD and 4TU cater to the needs that researchers have in terms of infrastructure? Which niche or which solution are you targeting?***

*Jason:* With the RSD, we link software to other research outputs and activities, integrating information needed for institute assessment. Also, it is a useful tool for researchers to find software.

*Roel: *At 4TU we offer data and software repositories, more data storage is a common request. We also offer computation environments such that a given code can be run alongside the data.

We also strive for recognition of good software, so that a user can find and reuse the software. We also try to make data publications more attractive to researchers.

***When using those infrastructures, what are the boundaries or limitations that you encounter? For example national vs international, or open/closed/paid.***

*Elaine: *My first criterion is ‘does it get the job done’? Ideally open and reusable.

*Louise: *I work with computer scientists examining how accessible these infrastructures are to users globally. We have used VPNs to access resources and found significant variability not only in terms of access speed but also in geographical accessibility. This variability raises questions about the impact of resource location, funding models, and user requirements on accessibility. We need to critically evaluate the geopolitical landscape surrounding infrastructure choices, take the example of GitHub, which is inaccessible to users in countries currently under financial sanction by the US.

***From more of a provider side: What are your boundaries or limitations? How do you decide who is your public and how far can you get?***

*Roel, you mentioned new features that the users were requesting. How do you handle those requests?***

*Roel:* We do receive more feature requests than we can implement due to limited manpower. To manage this, we prioritize based on ease of implementation, sometimes responding quickly and other times taking longer due to extensive planning required. At community events like those within 4TU, we prioritize requests from partners, universities, and funders, addressing recurring ones promptly. Additionally, we anticipate future needs by observing trends in software usage, implementing APIs for upcoming demands even before they are explicitly requested. It’s a balancing act between fulfilling immediate requests and anticipating long-term needs to stay ahead of the curve.

## Questions from the public

**GitHub plays a central role in software development and it is a potential point of failure: it is centralized in nature, American-owned and has the possibility of being closed down, similar to what happened with Google Code. This is a vulnerability not just for the Netherlands but globally. How can these risks be mitigated?**

*Roel:* There was a similar issue in the past with SVN and SourceForge. Unlike then, modern version control systems like Git offer a distributed model, where each developer has a complete copy of the source code, making it easier to switch platforms if needed. SoftwareHeritage also stores a copy of everything stored on GitHub. However, transferring auxiliary components like Wikis and issues remains a challenge. Continuous integration tools like GitHub Actions, while powerful, can be proprietary and tied to specific platforms, raising concerns about dependence on a single provider.

*Louise*: Now that the OpenScience movement is gaining momentum, the Open Science community should have a better dialogue with companies such as GitHub, and together find a suitable way of working. This type of change has already started, for example, with the publishing industries which have also been changing in this direction. The decision to create a national dataverse is also an outcome of these dialogues.

*Jason*: You do see a lot of organizations looking for alternatives, for example, running local GitLab instances. But these alternatives also take time and cost money. When organizations realize how much time and effort it costs, they often back off and turn back to commercial providers.

*Elaine*: It depends on what you are trying to achieve. I could run my own data management system, but then I would need 15 dedicated engineers, and I only have two. I want those two to focus on other things. It is a bit of a balance between being principled and being pragmatic. There needs to be a conversation between research-performing organizations and commercial companies. I have no problem using a commercial company, as long as I keep the option to move my data.

**There is an issue with depending on commercial companies, because if, for example, they change their license, you may need to change things in your own software. The same applies if they change formats — I have a lot of data from 30 years ago in Microsoft formats that I am unable to read anymore. You are putting yourself at risk!**

*Elaine*: It is the same story with a Discman, it is the natural evolution of products and services that occurs everywhere, all the time. We now no longer use Discman today, but rather we use Spotify. We still listen to music, but if you insist on sticking with a Discman and are not prepared to move to new tech, you can get stuck. It is not something that applies to commercial products only. It is a risk that exists and that you need to take into account and plan for sufficiently in advance. You need to be aware of what risks exist, and what alternatives are available.

*Roel*: Maybe it is preferable to keep options as generic as possible. So instead of having a button that says “link with GitHub” have a more generic “link with any git version control”. It is useful to show which options you provide and that there are alternatives.

**Do you think having a centralized way of operation is the solution?**

*Jason*: For many types of infrastructure, perhaps that would be a viable option. That would be the case for a national PID system. It is the type of infrastructure that everybody needs, but nobody wants to build it or pay for it.

*Roel*: Maybe in terms of standards, if we have a well-defined standard and many options of implementation, then that would be the best.

**Is there a way to see at an institutional level how much data and software have been produced? For example, PURE registers all your publications, but for data and software, it is not done as much.**

*Jason*: For publications, publishers harvest and analyze this information. Technically, it is not that hard to do, but it is not consistently done for data and software. One thing we have done is look at OpenAlex and try to connect all of these resources and figure out if we can identify citations for software. What you see is that there are many citations for publications, some citations for datasets and very few citations for software.

*Louise*: At CWTS we are looking into this, and we’ve been working with the Center for Digital Scholarship, but we do not have solutions yet.

**At Digital Humanities Lab we are looking into how to make our software more visible. But if we offload all the metadata to the RSD, how many people will use it? You also need to engage in how to make users find it. For developers, the incentive to create software is knowing it will be used.**

*Jason*: We are currently working with different communities to create community-specific views, the goal is that communities themselves curate the content by ensuring keywords are relevant for the target users. We are also looking into integrating the RSD with search engine tools so that software can be found more easily.

**What is the bus-factor for the RSD/4TU.ResearchData? What challenges do you face in increasing it?**

*Jason*: Currently, at the eScience Center the bus-factor is three. This is a great increase from one, which is what it was a few years ago. We are also collaborating with other organizations in Germany, which increases it. But finding someone to keep pushing the software remains a difficult challenge.

*Roel*: Our bus factor is two and a half or three, spread over multiple people over the team. We do not have enough money available to grow the team, but we do have multiple people who understand how everything works.

## Wrap-up

What would you like participants of this session to remember as their take home message. Something you would still like to say?

*Elaine*: Keep talking! People hate meetings, but getting together is how people share ideas, especially across domains but also for setting standards.

*Louise*: Keep talking, also to people who you never talked to before. The range of stakeholders in science is very broad: it is not limited to academia, not limited to the Netherlands.

*Jason*: Recognition not only for those developing great research software but also for those engaging in promoting best practices, infrastructures and in setting standards.

*Roel*: For me, if you have any ideas on how to improve repositories please get in touch!

**Thank you to all of our panellists for their participation. These are a lot of topics that are very interesting for us and it is great we could have this nice conversation!**
