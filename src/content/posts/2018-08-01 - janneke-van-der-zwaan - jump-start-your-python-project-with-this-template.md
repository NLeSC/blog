---
layout: post
title: "jump start your python project with this template"
date: 2018-08-01
author: Janneke van der Zwaan
published: true
source: medium
tags:
  - uncategorized

---

## Spend less time creating high quality software

![](/assets/1_haFkoDH9n76tojtq8MqHbQ-0fbfa97d.jpeg)

Use our python template to build better software.

At the Netherlands eScience Center, we believe that [better software leads to better research](https://www.software.ac.uk/resources/publications/better-software-better-research). We wrote a [guide](https://guide.esciencecenter.nl/) to help you create high quality software. However, if you try to follow the guide, you quickly find out that it is a lot of work, and some of it is repetitive.

So, we made the [Netherlands eScience Center Python template](https://www.research-software.nl/software/nlesc-python-template), that automates part of the work for new Python packages. The Python template helps beginners to get started, and experienced developers to save time.

> Spend less time setting up and configuring your new Python packages.

The Python template allows you to generate a basic project structure, so you can spend less time setting up and configuring your new Python packages, and automatically follow development best-practices right from the start. The ‘empty’ Python project contains a README with extensive documentation about the project setup, and provides further instructions on what to do.

### Default configurations

When writing software, there is a lot to configure. The Python template comes with sensible default configurations:

- `setup.py`, for installing the package, and specifying package metadata and dependencies,
- `setup.cfg`, for defining additional installation commands, e.g., to run tests and to build the documentation,
- `.editorconfig`, for making sure your editor or [IDE](https://en.wikipedia.org/wiki/Integrated_development_environment) plays nice with your python code,
- `.gitignore`, for keeping unwanted files out of your [git repository](https://help.github.com/articles/about-repositories/).

### Boilerplate testing and documentation

Software tests help you make sure your software does what it is supposed to do. Documentation tells users how to use your software. However, setting up tests and documentation can be a hassle. If you use the Python template, you can immediately start writing tests and documentation, so everything works as expected right from the start!

### Code style checking

Following code style conventions makes it easier for others (and yourself) to understand your code. The Python template is set up with a default [.editorconfig](https://editorconfig.org/) and [prospector](http://prospector.readthedocs.io/en/master/) to automatically check the code style.

### Miscellaneous files included

In addition to code and configuration, there are miscellaneous files that make life easier for you and your users by clarifying what you did and what you expect from others. The Python template contains a

- Software license, to specify how users can use the software,
- Change log, to keep your users up to date about changes to the code,
- Code of Conduct, to tell users and contributers how to behave professionally, and
- Contributing guidelines, to explain how others can help to develop the software,

so you don’t have to remember adding them.

### Freedom to choose

Project requirements differ. While the Python template makes some choices for you, it also tries to give you as much freedom as possible. For example, the template does not force you to use a [specific Python version](https://wiki.python.org/moin/Python2orPython3), but comes set up for both Python 2 and 3. The template also leaves you free to choose the package manager (i.e., [pip](https://www.w3schools.com/python/python_pip.asp) or [conda](https://conda.io/docs/)) that best suits your requirements.

### What are you waiting for?

Check out the [Netherlands eScience Center Python template](https://github.com/NLeSC/python-template) and let us know what you think!
