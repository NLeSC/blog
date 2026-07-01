---
layout: post
title: "Literate Programming in Science"
date: 2021-07-07
author: Johan Hidding
published: true
source: medium
source_url: https://blog.esciencecenter.nl/literate-programming-in-science-1669094541a7
tags:
  - API
  - C++
  - Databases
  - Environment
  - FAIR
  - Git
---

![](/assets/0_3ke-o36ZPmah-PK4-a8e3aba4.webp)

Photo by Prateek Katyal on Unsplash

## 2\. The How

*This is part 2 in a series on Literate Programming in Science. If you haven’t yet,* [*please read part 1 “The Why”*](https://blog.esciencecenter.nl/literate-programming-in-science-1669094541a7)*.*

> ***Literate programming*** */ˈlɪtəɹət ˈpɹəʊɡɹæmɪŋ/ (computing) Literate programming is a programming paradigm introduced by Donald Knuth in which a program is given as an explanation of the program logic in a natural language, such as English, interspersed with snippets of macros and traditional source code, from which a compilable source code can be generated.* [*Wikipedia*](https://en.wikipedia.org/wiki/Literate_programming)

If you’re reading this, then I hope I’ve convinced you (or maybe you didn’t need convincing) of the necessity of Literate Programming in Science. The next question should be: where do I start? I will discuss three methods of Literate Programming that you can use today, their upsides and downsides, what-have-you-not.

First, I should explain some nomenclature surrounding the concept of Literate Programming. The idea is that you write documentation first, interspersed with code blocks that actually implement the described ideas. These code blocks can be named and referenced from other code blocks using a system of references called *Noweb*. A special program is needed to extract all the code blocks from the markup and put them in the right order so that a well formed program code emerges on the other end: a process known as *tangling*.

A literate form of “Hello, World” in C++ would look something like this:

## Hello World

This example is written in a style of *literate programming* (Knuth 1984). The combined code-blocks in this example compose a compilable source code for “Hello World”. For didactic reasons we don’t always give the listing of an entire source file in one go. In stead, we use a system of references known as *noweb* (Ramsey 1994).

Inside source fragments you may encounter a line with `<<...>>` marks like,

```rb
«hello_world.cc»=
#include <cstdlib>
#include <iostream><<example-main-function>>
@
```

which is then elsewhere specified. Order doesn’t matter,

```rb
«print-message»=
std::cout << "Hello, World!" << std::endl;
@
```

So we can reference the `<<print-message>>` code block later on.

```rb
«example-main-function»=
int main(int argc, char **argv) {
  <<print-message>>
}
@
```

A definition can be appended with more code as follows (in this case, order does matter!):

```rb
«print-message»+=
return EXIT_SUCCESS;
@
```

These blocks of code can be *tangled* into source files, in this case a single `hello_world.cc` would emerge.

This “Hello World” shows just how you can combine the contents of code blocks to create a fully functional “Hello World” in C++. More examples of this type of literate programs can be found on the [Entangled website](https://entangled.github.io/examples).

The Noweb method of literate programming is not the only way to mix documentation with code. Not all methods described here have all the features that you would expect from Knuth’s original invention. In fact the most popular incarnation of Literate Programming arguably is that of notebooks. We may judge each method by their ease of use, and if they fit the bill of generating publishable and reproducible scholarly products.

![](/assets/0_E5I_DM8KaxUxkDNf-4dd728e6.webp)

Photo by NASA on Unsplash

## Notebooks (in particular Jupyter)

The most common form of Literate Programming found in todays jungle of digitized science is the *notebook*. Personally my first encounter with notebooks was with the use of Mathematica, which featured notebooks as early as 1988. Many commercial packages for data analytics and modelling featured notebook interfaces long before the rise of [Jupyter notebooks](https://jupyter.org/) in 2014. What makes Jupyter special is that it is an open source solution for many different languages (as long as someone took the effort of writing a Jupyter kernel for it).

### Pros:

- **Dynamic evaluation**
- **Easy interface**
- **Easy sharing** with MyBinder or related tools
- **Language agnostic (in theory)**

### Cons:

- **No support for Noweb references or tangling**: the code is evaluated in any possible order, depending on user interaction.
- **Only really meant for end-of-line products**: it is not expected that you write a Python library in a Jupyter notebook that someone else can import. It can be done in the case of Python ([see Jupyter docs](https://jupyter-notebook.readthedocs.io/en/stable/examples/Notebook/Importing%20Notebooks.html)), but just reading the documentation should instill a deep feeling that you really shouldn’t.
- **Only works for evaluated languages**: because notebook interfaces are designed to be interactive, they are fundamentally limited to languages that provide a Read-Evaluate-Print loop (or REPL for short). Examples of languages that don’t have this are Java, Rust, Go (I would like to include C++ here, but there is Cling, the complexity of which is an argument against itself). In the case of Haskell we do have a REPL, but it doesn’t expose the full language.
- **Crappy text editor**: With Jupyter you’re stuck with the default inline text editor of Jupyter. If you use VSCode, you can edit notebooks directly from there, but the interface is still quite slow and buggy.
- **Hard to debug**: The latest version of Jupyter has a debugger for Python, I’m not sure if this debugger translates well to other languages.
- **No stable API**: This is not a principal argument, but a practical one. The Jupyter API changes often. As a consequence, the only kernel that can be expected to always work is the Python one. I’ve experienced frequent breaks when using Jupyter, even in the relatively common case of GNU R. For most other languages, sadly, chances are that you will have to experiment with downgrading Jupyter.
- **Stored in JSON**: the contents of the notebook are stored in JSON, even opening a notebook changes its contents. This is especially annoying when working with **git**.

Some of these downsides may lessen or disappear entirely as Jupyter improves. The first three however are rather fundamental to the method. That is no critique. I love working with Jupyter and use it every day. It just isn’t for everything.

![](/assets/0_VXW1HQh6uiOo2ftU-cef2e6ae.webp)

Photo by Margarida Afonso on Unsplash

## RMarkdown and Knitr (with RStudio)

RMarkdown was designed as the Literate Programming solution for R, with a focus on reproducibility. As the name suggests, it is a dialect of the markdown language.

Contrary to Jupyter, RMarkdown is more focused on creating high-quality documents than on interactivity, making it a perfect choice for writing vignettes, reports and even academic papers.

RMarkdown is particularly easy to learn and to use from RStudio. Nowadays it supports several languages apart from R, such as Python or SQL.

### Pros:

- **Easy to install:** (comes by default with RStudio)
- **Dynamic evaluation:** only if desired.
- **Easy interface**: RMarkdown is very accessible to new users through the RStudio interface, but it is possible to use it outside RStudio.
- **Easy sharing:** with RPubs, MyBinder or related tools.
- **Plain text:** Well defined plain-text format, in this case Markdown.
- **Fixed order of evaluation:** The code is evaluated sequentially by default. Other than with Jupyter, where the order of execution depends on user interaction.
- **Language agnostic (in theory):** many languages are supported through the *Knitr engine*.
- Fancy functionalities are constantly added by the R community, such as caching for long calculations, support for different languages, cross-referencing, templates, etc.

### Cons:

- **No support for Noweb references or tangling**: the code is evaluated in the order that you enter it.
- **End-of-line:** It is not expected that you write an R package in a RMarkdown file that someone else can import. Usually, the RMarkdown files are an addition to a package.
- **Hard to debug**
- **Language centric:** The integration with languages other than R happens through R packages. Most of these packages are quite well designed and just work out-of-the-box, but for some of them you may need to invest learning how they work.

Just as Jupyter, RMarkdown is a great tool to get started with Literate Programming. It stops just shy of being able to create fully compilable files from the literate sources.

![](/assets/0_1arvThu4tV8Y4Zuy-effb0a2b.webp)

Photo by Brigitta Schneiter on Unsplash

## Emacs org-mode

While [Org-mode](https://orgmode.org/) is not terribly well known, it offers one of the most complete solutions for Literate Programming that you can find. Me myself, I’m a born Vim user. Every now and then I take these editor excursions: VSCode lasted a week before I went back screaming for Vim. For this single feature of Org-mode I nearly switched to Emacs. I tried [SpaceMacs](https://spacemacs.org/) for about *half a year* until reverting back to Vim. *That is how good Org-mode is (26x all of VSCode if you can count).* Many adepts describe it as a life changer.

In essence Org-mode is an editor mode that helps you edit nestings of unordered lists, it’s main use being for brainstorming and keeping todo lists. From these humble beginings sprouted a markup language that, entirely in the Emacs tradition, includes everything and the kitchen sink (did I mention the spreadsheet?). Today Org-mode could be considered a variant on other markup languages like Markdown and reStructured Text. What makes Org-mode special is the way you can edit and interact with it inside Emacs.

One of the many features of Org-mode is that it supports code-blocks *with noweb references*. These code-blocks can be evaluated inline (using one of many plugins available for Emacs) or tangled to runnable/compilable source files.

### Pros:

- Supports noweb and tangling.
- Well defined plain-text format.
- Export to nearly anything.
- Dynamic evaluation of code blocks.
- Completely language agnostic.
- Plain text markup.

### Cons:

- Only works as intended in **Emacs.**
- Collaborators would have to use **Emacs.**
- Debugging should be done from **Emacs.**

In its own way Emacs is awesome. If this fits the bill for you, by all means shape your life around it, join the church. I do believe however, that this is not something you can force onto someone else.

What all the previous methods share is that they drive you into using a chosen set of tools, each with its own particular down sides. What I am aiming for is a method of Literate Programming that is feature complete and *minimally intrusive*. Feature completeness is always a matter of personal taste, nevertheless I will give it a shot:

- Deconstruct code using Noweb syntax, or something very close to it.
- Be completely language agnostic.
- Export to nearly everything.
- Use a plain-text markup format.
- Play nicely with existing methods for publishing on the web.

One thing I didn’t include in there is the feature of dynamic evaluation. Such a thing could be achieved in a generic way by implementing editor plug-ins on top of the [Language Server Protocol](https://microsoft.github.io/language-server-protocol/) (using a code action of some kind). Implementing an Org-mode kind of interaction in this way would be a very interesting project onto itself, but not today.

Instead, I introduce a new feature that none of the other methods have: the ability to work on tangled source code while keeping the original markup synchronized. This feature greatly improves the maintainability of the literate program while also opening up all the normal tools you’re used to work with: debuggers, linters, transmogrifiers, you name it. Let’s call this feature: **live untangle mode**.

## The Entangled Project

I hope by now I have convinced you that A. Literate Programming is awesome and B. the current set of available tools are not sufficient. This is why I started [the Entangled project](https://entangled.github.io/). The goals of the Entangled Project are three-fold:

- Develop tools for Literate Programming
- Arrive at a set of best practices
- Communicate, teach and promote

The push for these methods and best practices focusses on a system using *Markdown* as the primary markup language. I believe Markdown offers the ideal combination of readability and flexibility to suit most needs, a stance that I previously defended in a blog post: [Why all you’ll ever need is Markdown](https://blog.esciencecenter.nl/why-all-youll-ever-need-is-markdown-dc604f0ab309). This does not mean that the choice for Markdown is final; all of what we do carries over without problems to other formats.

### Tools

The primary tool we have developed is Entangled. This is a daemon that runs while you edit the markup files or the tangled sources. Entangled keeps the two in sync so that you only ever have one version of the code.

Next to this core tool we have several experimental filters for [Pandoc, the universal document converter.](https://pandoc.org/) These filters can do several things:

- Annotate generated output with headings for the named code fragments.
- Evaluate code fragments by passing them through Jupyter.
- Inject Javascript code fragments into the HTML output for interactive elements (e.g. PlotLy).
- Generate Bootstrap UI elements, for example: foldable code blocks.

The approach we take to Literate Programming has been battle tested using three different document converters: Pandoc, MkDocs and Docsify. Each generator works with a slightly different dialect of Markdown.

### Future plans

Entangled is ready to use, but it is not too user friendly yet. For one, we expect you to setup your own pipeline for building the document for public release. Most often this would be some static HTML generator using Pandoc or MkDocs. Alternatively you can use Docsify to serve a website directly from the Markdown sources.

- **Getting started:** The problem for entry level users is that it may not be trivial to set these up. The current template for working with Pandoc requires Pandoc (duh), GNU Make, browser-sync, some form of inotify-wait, and of course, Entangled. We’d like to make it much easier to start working on your own projects, so we’d like to bring this set of requirements back to just Entangled.
- **Templates:** We should provide easy to use starting templates for a set of popular document generators. The one currently still unmentioned being Sphinx. These templates should be initialized using an `entangled init` sub-command.
- **Single file mode**: The default operation of Entangled should be a single file mode (most probably `README.md`), and work out of the box with no configuration. Imagine a Github repository with just a `README` (and a `LICENSE` and a `CITATION.cff` and a `.editorconfig` and a … oh you get the point!) and a Github Action tacked on to generate the Github.io pages.
- **Flexible code presentation:** in the publicized output code cells are currently static. At the very least Noweb references should be clickable. Other features could include: links to the tangled output, be able to view the code in expanded form.

Help is appreciated! Entangled is primarily developed in Haskell, though no skill in Haskell is required for example to create templates for working with Entangled. Pandoc filters can be developed in Python. In particular the filter for interacting with Jupyter could use some fresh ideas.

*About the author: I’m (among other things) the developer of* [*Entangled, a Literate Programming framework and toolset*](https://entangled.github.io/)*. The main goal of this blog-post is to convince you that existing tools for Literate Programming are not yet ready to serve the needs of the broader scientific community.*
