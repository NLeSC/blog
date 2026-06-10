---
layout: post
title: "How to ensure that others can run your code"
date: 2023-12-12
author: eScience Editorial Team
published: true
source: medium
source_url: https://blog.esciencecenter.nl/how-to-ensure-that-others-can-run-your-code-4c7672524a69
tags:
  - uncategorized

---

6

By [Julian Gonggrijp](https://juliangonggrijp.com/)

*This blog was originally written for the *[*Utrecht University (UU) website*](https://www.uu.nl/en/news/how-to-ensure-that-others-can-run-your-code?utm_source=Maileon&amp;utm_medium=email&amp;utm_campaign=Centre+for+Digital+Humanities+Newsletter+-+November+2023&amp;utm_content=https%3A%2F%2Fwww.uu.nl%2Fen%2Fnews%2Fhow-to-ensure-that-others-can-run-your-code)* by Scientific Programmer *[*Julian Gonggrijp*](https://www.uu.nl/staff/JGonggrijp)*. We enjoyed this useful blog post, and hope you will too! If you’re looking for more resources on reusable code, also see *[*this chapter*](https://the-turing-way.netlify.app/reproducible-research/code-reuse)* in *[*the Turing Way*](https://the-turing-way.netlify.app/index.html)*.*

*This is the last eScience Center blog post of 2023, but fear not! We will be back in January with lots more interesting writing from our Center.*

![How to ensure that others can run your code](/assets/how-to-ensure-that-others-can-run-your-c-4f7aaef5.jpg)
Photo by [ThisisEngineering RAEng](https://unsplash.com/@thisisengineering?utm_source=medium&amp;utm_medium=referral) on [Unsplash](https://unsplash.com/?utm_source=medium&amp;utm_medium=referral)Imagine the following scenario. You need to analyze your research data. As is often the case in research, your analysis is going to be similar to, but not quite the same as, previous research. You look for existing software that can do the job for you, but nothing suits your situation. You decide this will be a good opportunity to brush up on your Python-fu. You sit down at your laptop, crack your knuckles and start hacking.

The analysis is far from trivial; so is writing the code. You learn several new things along the way, some of which are interesting, gain a few grey hairs, spend two very late “afternoons” with a colleague to squash a notorious bug. Ten weeks and several hundred lines of code later, though, you manage to make it work. You toast with your colleague, present your analysis at a conference and get very positive responses. Your own software is a great success!

At the conference, you meet a colleague from a different institution. She has a totally different dataset, but she might be able to apply the exact same analysis. You are excited: you might be onto a new methodology, worthy of several papers and a grant or two.

A few months later, you hear back from your new acquaintance. She found time to experiment with your new method and she asks for your code. You were already prepared for that. Your code is on [GitHub](https://www.uu.nl/en/research/research-data-management/tools/software-and-computing/github-and-git), it has a README and you even thought of an open source license, so she can freely adapt the code if necessary. You eagerly send her the link.

You don’t hear back for a while. After two months, you take a deep breath and send her an email. Was she able to get any useful results out of the analysis? Alas, it turns out she did not even reach that stage. She was unable to run your code, even with help from a student assistant from the computer science department. The code would crash with error messages that they could not get past. She went with the conventional analysis in the end; the results were not spectacular, but she managed to squeeze a publication out of it and moved on.

Of course, you are disappointed. Did you just spend ten weeks of your life developing new software, only to find that it will never run through another dataset? Should you have hired a scientific programmer instead of writing the analysis yourself? Fortunately, at this point, you run into this blog, saving you from a depression.

## Why runnable code matters

In the above scenario, it is obvious that other people must be able to run your code because you want your method to be reusable. However, even if you write a quick one-off just for your own research, it is important to ensure that somebody else could run your code. There are two main reasons for this:

* As Stefano mentioned [in the previous blog](https://www.uu.nl/en/news/what-is-version-control-and-what-are-the-benefits-of-it-for-you) on UU’s website, your future self is another person. You might upgrade or replace the PC on which you wrote the code and you might forget some of the preparatory magic incantations. Even in case of a one-off, you might want to run the code again in order to double-check your results, to add new datapoints or even just to impress your spouse. 😉 By ensuring that the code is easy to run while everything is still fresh in memory, you can save time (and dignity) in the future.
* By ensuring that your code is easy to run, you make it easy for others to repeat and verify your work. This can be a great way to convince people!

Making sure that code is easy to *run* is different from ensuring that the code is easy to *read*. The latter is certainly also worthwhile, for different reasons, but that is for another blog post.

Making the code easy to run is also not exactly the same as making it easy to install. If you are serious about your software, you will likely think about publishing it to a package repository (which is also for another blog post) so that it can be easily found and installed, and you should! However, while this technically makes your code easy to run as well, this does not replace making it easy to run the code when obtaining a raw copy. At the very least, the future developer who is going to update the package will need to run it *without* installing it from a package repository.

## Why is code not runnable out of the box?

Let us be honest: it is *infuriating* that code never runs out of the box. We can double-click any picture, PDF file or spreadsheet and it will just open and work, but for some reason, when it comes to code, we still seem to be living in the 1960s. Whenever we receive code from a colleague, we usually first have to install additional software, learn a few new skills, massage our data in just the right shape, take two non-obvious preparatory steps and make a rain dance before we can even hope to be able to run it. Then, there are the unexpected errors.

While this is no excuse by itself, creating infrastructure that makes code easy to run is notoriously difficult. Code is run by other code, and that other code has to be extremely flexible in order to cater to all the possible applications. This by itself already requires highly specialized skills. On top of that, the software landscape is constantly moving because people keep finding new use cases for code, so everyone is constantly struggling to keep their own code compatible with somebody else’s code. Between all that effort, attention tends to be drawn away from keeping the software usable. There have been many honourable attempts at improving this situation, some of them quite successful — I will mention a few below — but even those projects cannot escape the constant struggle to keep their infrastructure current. Making running code as easy as a double-click remains elusive for now.

![How to ensure that others can run your code](/assets/how-to-ensure-that-others-can-run-your-c-5683b09b.jpg)
Photo by [Sigmund](https://unsplash.com/@sigmund?utm_source=medium&amp;utm_medium=referral) on [Unsplash](https://unsplash.com/?utm_source=medium&amp;utm_medium=referral)

## Six things that should be documented for any code

The first thing we can do, is to transfer as much knowledge as possible. The following checklist may help you to ensure that you include all the important details in your README. This is a [good example](https://github.com/UUDigitalHumanitieslab/tscan/blob/master/README.md) of a correct README.

* Why does your code exist? This may seem obvious, but you will be surprised at how often this information is left out. Knowing what your code is about will motivate prospective users to try it for the right reasons. It will also help clarify why things are done a certain way, why some features are included and others omitted.
* What other software needs to be installed before your code can be run? Most unexpected errors, where the software worked for the programmer but not for the user, are due to dependencies that are either missing or have a mismatching version. To prevent this, list the version of your programming language as well as all the packages that your code depends on and be as specific as possible about which versions are expected to work. Also explain how to obtain all dependencies.
* For what type of data is your code suitable and how should it be stored? Include everything relevant: file format versions, required and optional fields, column order, maximum input size, character encoding, etcetera.
* What steps should be followed to use your code? As programmers, this is usually the first thing we think of when writing a README, so it tends to be relatively well documented. For completeness, I will mention that you need to clearly distinguish between steps that need to be run every time or only the first time, describe the different modes/scenarios/use cases for which the code may be used, discuss optional and required arguments, and explain the expected output.
* How to reach out for help? Despite your best efforts to document everything, users can still run into trouble. Some users will not reach out unless you make them aware of the option. An email address is good, a link to an issue tracker on GitHub, Codeberg, GitLab or BitBucket is even better.
* Your software license. Technically, this does not really change how easy or difficult it is to run your code, but it does need to be in the README.

## Don’t be that person

Good documentation will get you a long way, but if there are intrinsic hurdles in your code, users will still struggle and possibly give up. The most common way for this to happen, is when the code is too specific to the current situation of the programmer.

If your code only runs on your computer with your files on it, in January under easterly wind while the moon is waning, then your colleagues will likely find it difficult to run your code. Possibly more problematic is that, one year into the future, even you will not be able to run your code.

For example, a line like the following is all too common in research software:

DATAFILE = "C:\Users\Frank\Downloads\KNMI_klimaat_DeBilt_1980-2010.CSV"Hardcoded assumptions like these are errors waiting to happen. They can be avoided by making parameters like file paths user-configurable. For example, in Python, you can use the `[argparse](https://docs.python.org/3/library/argparse.html)` module to accept file paths as command line arguments.

## Use helpful standards

As I mentioned before, there have been many attempts at improving the ease with which code can be run. None of them will reduce the effort to a double click, but the more you leverage these projects in your own code, the easier it will be to run it. I mention a few examples:

* When working with Python, you can list your package dependencies in a `[requirements.txt](https://pip.pypa.io/en/stable/reference/requirements-file-format/)` and tell users to run `pip install -r requirements.txt`. This saves users from installing the packages manually and ensures that they will have the right version of each package. Even better is to use a [virtual environment](https://docs.python.org/3/library/venv.html) and manage the dependencies with `[pip-tools](https://pypi.org/project/pip-tools/)` or `[pipenv](https://pypi.org/project/pipenv/)` (which is a high-level wrapper around `venv` and `pip-tools`). Similar solutions exist for most other programming languages.
* [Docker](https://en.wikipedia.org/wiki/Docker_(software)) can take the hassle out of installing software in general. You define what installation steps should be taken and how to start the software. Your colleagues only need to run Docker in order to make it happen. Installing Docker itself is a bit tricky, though, especially on Windows, so it is somewhat of a double-edged sword.
* [Binder](https://mybinder.org/) lets you publish and run Docker images in the cloud (i.e., on somebody else’s computer), so that your colleagues do not need to install Docker. It also automatically selects predefined Docker images for a few common types of projects, so you do not need to define your own Dockerfile. The only drawback is that the code tends to start with a noticable delay. It is mostly suitable for visualizations.
* Notebooks provide a handy way to combine scripts, visualizations and documentation in a single file that is relatively easy to run. Dependency management is greatly simplified in notebooks. [Jupyter](https://jupyter.org/) is probably the most widely known notebook format, which supports Julia, Python and R (hence the name). A honorable mention goes to [Pluto](https://plutojl.org/), which only supports Julia but which is probably the easiest and most intuitive notebook environment available. Both of these can run in the cloud using Binder. [CoCalc](https://cocalc.com/) and [Google Colab](https://colab.research.google.com/) provide additional cloud hosting options for Jupyter.

## Use your colleague as a guinea pig

If you follow all the tips above, your code is easier to run than if you don’t. The best way to be sure, however, is to test-drive your code with an unsuspecting colleague. This colleague must not have been involved in the writing of the code. Ideally, you find a colleague who is interested in the problem domain, but who tends to use a different programming environment (or none at all) and a different operating system (so if you wrote your code on a Mac, try to find a tester who runs Windows). Don’t sit next to your colleague during testing; let them figure it out using only the documentation.

If your tester can run your code without trouble, you can be fairly confident that your code is reusable. If not, keep adjusting until it is. Remember that it is always your code or your documentation that needs fixing, never your colleague.

## Join the crowd

It is challenging to make reusable software, and you are not the first researcher to embark on this adventure. Utrecht University has various initiatives where you can meet fellow programmers and exchange tips and tricks:

* Research Data Management Support organizes a monthly [Programming Café](https://www.uu.nl/en/research/research-data-management/workshops/programming-cafe) or hop by at the [Walk-in Hours](https://www.uu.nl/en/research/research-data-management/workshops/walk-in-hours-research-data-and-software) at the [Library Utrecht Science Park](https://maps.app.goo.gl/YV7fGkAtcT9PmWjdA) that are held every Monday afternoon.
* If you happen to work at the Utrecht University Faculty of Humanities, you can also visit the weekly [Digital Humanities walk-in hour](https://cdh.uu.nl/walk-in-hours/), or email the [Centre for Digital Humanities](https://cdh.uu.nl/) at any time for advice.

I wish you much inspiration and fun on your voyage!
