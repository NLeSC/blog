---
layout: post
title: "Research Ethics and Authorship: The Technological Solution"
author: Candace Moore
published: true
source: medium
source_url: https://blog.esciencecenter.nl/research-ethics-and-authorship-the-technological-solution-70ca7466a0e
tags:
  - API
  - Community
  - Ethics
  - Git
  - Health
  - RSE
---

## Dr. Candace Makeda Moore discusses the potential for distributed version control as a tool to prevent questionable authorship practices.

Recently I read a story in *Retraction Watc* h about a service selling authorships on scientific papers in the peer review pipeline. On the same day a colleague physician mentioned that at our hospital, there were many cases where authorship was given in exchange for access to certain patients as potential research subjects. While the former type of blatant research fraud makes headlines, the latter barely raises an eyebrow. But giving authorship for research related favors or other ‘political’ reasons is neither a victimless minor crime, nor it is a problem without an easy, free and enforceable solution.

![](/assets/0_VoR_1wmNArGuE5-2-b031096c.webp)

Photo by Annie Spratt on Unsplash

Because I come from a medical background, I am most familiar with standards in this field, although problems related to authorship extend to most scientific fields.

Perhaps at this point it’s worth pointing towards what authorship should actually be, using academic medicine as an example. The International Committee of Medical Journal Editors (ICJME) has [exemplary recommendations](https://www.icmje.org/recommendations/browse/roles-and-responsibilities/defining-the-role-of-authors-and-contributors.html). The spirit of these recommendations is incredibly simple: authors should be involved in the design or analysis as well as the literal writing of research. There is some variation in different fields, and differences from place to place, and of course there can be exceptions with specific kinds of research papers e.g. papers for datasets and/or code. But we probably all agree that in least in principle, an author should be someone who does something significant for the work.

Unfortunately, in day to day academic medical research it is typical to see people getting authorship on papers for all sorts of illegitimate reasons. Getting someone to sign off that researchers can access patients in a particular department, handing over an existing dataset, and many more tasks are necessary and integral parts of research. Such actions deserve praise, and there should be some system to reward such tasks in place, but as the medical-scientific community has defined authorship, they alone should not confer authorship.

There are several major impediments to the adoption of proper research ethics in authorship in medicine. Some are simply related to inertia and the infamous conservatism of medicine. At many institutions authorship is given in customary ways including to any principal investigator (PI) who so much as attends meetings around research, because *‘that is the way it has been done’*. And of course no one wants to get on the bad side of someone like a powerful principal investigator who can potentially ruin their career.

![](/assets/0_D3cyAE6qwer8JuUl-6d02b345.webp)

Photo by National Cancer Institute on Unsplash

This is, of course, another reason fraudulent authorships happen quite commonly. Politics. In some cases a principal investigator or high ranking researcher may provide very necessary help to a research group, e.g. without their signature nothing will move. But the truth is that there are well defined rules around authorship. One of the reasons for this is that authorship is so critical to advancing academic careers. Unfortunately, in academic medical centers, in practice what this means is that all levels of researchers enter into a treacherous political game where the bulk of authorships tend to accrue towards more established researchers who have more resources in the way of data access, workers and political capital. Such systems favor researchers who are privileged across almost every other axis of privilege possible.

A medical researcher who lives in the real world of any large academic hospital may think ‘if I don’t give authorships to important professors who helped me, I’ll never get their help again, or worse, they will open some kind of problems for me’. They feel disempowered about what would be essentially telling the truth by demanding correct authorship lists, because it would be their word against the word of someone more powerful and established in many cases. But there is literally a free solution right beneath the nose of researchers.

Every modern researcher uses a computer to accomplish aspects of their research from code scripts or programs for statistical analysis to word processing programs for writing articles. The solution to these messy problems of authorship is right at the fingertips, or only a mouse click away from anyone with a computer and internet connection. The solution is **distributed version control systems** like Git or Mercurial.

When a version controlled repository is created, there is a history of who wrote what and when. Unlike Google Docs or Word or any other of the more common tools for writing papers, version control makes it almost impossible to erase the trace of someone else’s work, or claim you or someone else made significant contributions in writing an article when it did not happen. Unless, of course, you are part of the extremely tiny group of researchers particularly talented with programming. But let’s face it, most people in medical research don’t want to use version control because they literally don’t even know how. They never learned it because it was never considered a critical skill for research.

Some people do not find git or other version control languages and programs intuitive. For whatever reason this seems particularly true of physicians. However, even leaving issues of authorship aside, version control is an important skill in terms of modern computational research. The Netherlands eScience Center offers small hands on courses lasting one or a few days to train researchers in this area. An example of one upcoming such course can be viewed [here](https://www.esciencecenter.nl/event/good-practices-in-research-software-development/). We have also contributed to high quality [open source free lesson material](https://swcarpentry.github.io/git-novice/index.html).

While such programs are often used in practice with services like Github or Gitlab, they need not be. Technically, you could just create a repository and send files for it to other people. You can even sign commits with and/or make them traceable by servers. If you use git, you can use \`git blame\` to figure out who did something.

![It looks like I may be to blame for problems in this environment?](/assets/1_LmRkMTNvxvcbQ0k7NXoOZg-33c307bf.png)

I may have some blame for problems in the environment in this program (output of \`git blame\` in a terminal)

Obviously, using version control as the medium through which scientific papers are written favors the young and computer savvy. Would this cause the reverse problem to privileging the old and established? Hardly. Help for Git or any other open source version control system can be found across the internet. Lately, I often run across young students who have taught themselves to use a version control system without anyone asking them to for a class. The biggest barrier to learning version control systems for most high ranking researchers in medicine may be the psychological pain of having to ask people they consider their inferiors for help.

In a world where people are questioning if what journals actually do is of any value when everyone could just publish on the internet and/or preprint servers, checking authorship should be a task that they are legitimately valued for. Such a task could be accomplished using free open source software like Git. The only thing necessary is a dash of skill in computing, or barring that, some learning.

![](/assets/1_dmCCMU2_nkATdc_qG9xJSQ-c26bf96e.png)

One approach to begin learning version control is simply searching and reading on the internet

How am I sure this could work? Because we see these processes everywhere and all the time in terms of the code related to research. I myself am an author on several open code repositories related to medical signal processing and/or image processing, and if anyone were to question my role, I could just point to the lines of code I wrote as evidence that I did in fact do real work. Open source code provides a model for how papers could be made way more transparent in terms of authorship. In fact if researchers were to send their code repository and a related repositories which include study design documents, every aspect of authorship can be verified.

Physicians are often called upon to lead research in medicine for obvious reasons, but have never really get trained (save a few who had post-graduate training in very select fields such as imaging informatics or public health) to do any computational research at all. A future where physicians and others working in medical research take a few days to learn the fundamental tools of computational research is a better future for everyone, because then we can efficiently combine clinical insight and large datasets. Whether to shield themselves from authorship problems, or go after the larger goal of better science, medical researchers should embrace version control.
