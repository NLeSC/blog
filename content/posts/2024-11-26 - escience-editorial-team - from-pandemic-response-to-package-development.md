---
layout: post
title: "From Pandemic Response to Package Development"
date: 2024-11-26
author: eScience Editorial Team
published: true
source: medium
source_url: https://blog.esciencecenter.nl/from-pandemic-response-to-package-development-52aba8e249c3
tags:
  - Collaboration
  - Data Science
  - Environment
  - Git
  - Health
  - Python
---

By [Fenne Riemslagh](https://www.esciencecenter.nl/team/fenne-riemslagh/)

We had the pleasure of sitting down with [Kirsten Bulsink](http://www.linkedin.com/in/kirsten-bulsink), a data scientist at the Dutch National Institute for Public Health and the Environment ([RIVM](http://www.rivm.nl)). Our discussion covered her journey from pandemic response to R-package development and how the Netherlands eScience Center played a part in creating a crucial part of tooling at RIVM. Her story demonstrates the importance of collaborative work in research.

![From Pandemic Response to Package Development](/assets/from-pandemic-response-to-package-develo-32f8ae64.jpg)

Photo by [Eran Menashri](https://unsplash.com/@chesnutt?utm_source=medium&amp;utm_medium=referral) on [Unsplash](https://unsplash.com/?utm_source=medium&amp;utm_medium=referral)Q: Can you tell us about your background and current role at RIVM?**

A: I’ve been working at RIVM for a little over three years now. My background is in psychology, with a master’s in neuroscience. During my Research Master’s, I discovered my passion for data analysis and finding answers through data. This led me to pursue a minor in data science.

I started working at RIVM during the COVID-19 pandemic. Initially, it was a chaotic time, with researchers working overtime to analyze and report data quickly. When I joined, there was already a semi-automatic data pipeline in place, but we still had to tackle complex challenges, like calculating vaccination rates with data from a selected group (because of opt-out).

As our team grew to about 9 to 10 people, we started organizing workshops to reflect on our processes. We asked ourselves what worked well and what we’d do differently if we could start over. This reflection led to the development of new tools and approaches.

> 

“…we started organizing workshops to reflect on our processes. We asked ourselves what worked well and what we’d do differently if we could start over. This reflection led to the development of new tools and approaches.”

Before the pandemic, processes and methods differed for different infectious diseases. As a result, researchers at RIVM had to perform many actions manually, and these processes could differ per infectious disease. The pandemic necessitated more knowledge sharing and collaboration. We started standardizing and automating data transformation and reporting for infectious diseases.

**Q: We understand that you and your colleague participated in the R-packaging workshop organized by the eScience Center. Can you tell us about that experience and the R-package your team developed?**

Yes, that’s correct. One of my colleagues actually took the [R-packaging workshop](https://carpentries-incubator.github.io/lesson-R-packaging/) offered by the eScience Center before I did. Later, I also had the opportunity to take the same course.

The package, which now serves as a core tool for epidemiological pipelines at RIVM, provides functionality for loading, cleaning, and reporting data, with various checks in place. It also includes functions to create graphs in RIVM colors and style.

For example, during the COVID-19 pandemic, we used analysis methods to process data on positive cases, calculate the number of cases over time, and generate reports. Now, we use the package for monitoring and reporting on various infectious diseases like [sexually transmitted infections](https://www.rivm.nl/soa/cijfers-en-rapportages-soa) and [respiratory infections](https://www.rivm.nl/luchtweginfecties/actuele-cijfers), not just COVID-19.

![From Pandemic Response to Package Development](/assets/from-pandemic-response-to-package-develo-64e59eb1.jpg)

Photo by [Fahim Muntashir](https://unsplash.com/@f12r?utm_source=medium&amp;utm_medium=referral) on [Unsplash](https://unsplash.com/?utm_source=medium&amp;utm_medium=referral)**

How did the R-packaging workshop help professionalize your package?**

After joining the workshop at the Netherlands eScience Center, I organized a session for my team to share what I had learned. While my colleagues had already done a great job, the workshop helped us improve consistency in managing dependencies. We also enhanced our documentation. The package improvements made it easier for others to use the package. Installation became smoother, and users no longer had to figure out why they needed to install extra packages.

> 

“The package improvements made it easier for others to use the package. Installation became smoother, and users no longer had to figure out why they needed to install extra packages.”

Later on, I also took the [Python software development course](https://carpentries-incubator.github.io/python-intermediate-development/) offered by the eScience Center, which was really eye-opening. I learned about tools like linters, virtual environments, testing, coverage, and CI/CD pipelines. This knowledge made us realize we needed to implement these practices in our R-package as well.

After gaining all this knowledge from the eScience Center courses, we felt ready to take our package to the next level. We decided to organize hackathons to focus on implementing best practices and improving our package structure.

Our first main goal was to internally demonstrate that we had a high-quality product, especially since many analyses of infectious disease data rely on this package. Our second goal was to share our methodology with external parties like the GGD (Municipal Health Services), even if we couldn’t share the actual data.

We reached out to the eScience Center training team for support, and they connected us with [Pablo Rodríguez Sánchez](https://www.esciencecenter.nl/team/pablo-rodriguez-sanchez/) (one of the eScience Center’s Research Software Engineers (RSEs) and main author of the R-packaging course, ed.) to consult during our hackathon. This collaboration was very valuable in guiding our efforts and providing expert insights.

![From Pandemic Response to Package Development](/assets/from-pandemic-response-to-package-develo-f8e29e49.jpg)

Photo by [Mika Baumeister](https://unsplash.com/@kommumikation?utm_source=medium&amp;utm_medium=referral) on [Unsplash](https://unsplash.com/?utm_source=medium&amp;utm_medium=referral)**Q: What were the outcomes of the hackathons?**

We had two hackathons. In the first one, we focused on testing and documentation. We increased our test coverage and improved our package documentation, including creating a vignette with examples.

The second hackathon was about splitting our large package into smaller, more manageable ones. We also worked on establishing a workflow for potentially publishing the package on GitHub while keeping our main development on RIVM’s internal GitLab.

Pablo provided a fresh perspective and helped us confirm that we were on the right track. His expertise was particularly valuable in the second hackathon when we were making decisions about package structure and workflow.

> 

“Pablo Rodríguez-Sánchez, Research Software Engineer (RSE) at the Netherlands eScience Center, provided a fresh perspective and helped us confirm that we were on the right track. His expertise was particularly valuable in the second hackathon when we were making decisions about package structure and workflow.”

**Q: How has this experience changed your team’s way of working?**

In the past year, we’ve started to work much more like a software development team. We now use a Kanban board for project management and have implemented CI/CD pipelines, which have made our development process much smoother. The package split has made everything more manageable, and it’s easier to see where we need certain tests or improvements.

**Q: What’s next for your package and team?**

We’re planning to release some of our packages in GitHub in the next couple of months, which will allow external users to download and use them. We’re also focusing on internal knowledge sharing and running workshops about our tooling.

We value having the eScience Center as a sparring partner for tackling these technical challenges.

In my current role I now have a nice combination of technical skills and advisory tasks. We advise and make other people at RIVM enthusiastic about our tools. Our recent experience in developing this R package has been invaluable.

The Netherlands eScience Center would like to thank Kirsten for her time for the interview . We look forward to continuing our collaboration. If you want to learn more about collaborating with the eScience Center or are interested in our training programme, please visit [Training &amp; Workshops — eScience Center](https://www.esciencecenter.nl/digital-skills/). If you are interested in receiving consulting like Kirsten did, you may be interested in our [Fellowship Programme](https://www.esciencecenter.nl/fellowship-programme/).
