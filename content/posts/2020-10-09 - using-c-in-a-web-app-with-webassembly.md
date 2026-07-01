---
layout: post
title: "Using C++ in a web app with WebAssembly"
author: eScience Editorial Team
published: true
source: medium
source_url: https://blog.esciencecenter.nl/using-c-in-a-web-app-with-webassembly-efd78c08469
tags:
  - 3D
  - C++
  - Performance
  - Python
  - RSE
  - Research Software
---

*By* [*Stefan Verhoeven*](https://orcid.org/0000-0002-5821-2060)*,* [*Faruk Diblen*](https://orcid.org/0000-0002-0989-929X)*,* [*Jurriaan H. Spaaks*](https://orcid.org/0000-0002-7064-4069)*,* [*Adam Belloum*](https://orcid.org/0000-0001-6306-6937)*, and* [*Christiaan Meijer*](https://orcid.org/0000-0002-5529-5761)*.*

Let’s say you have some C++ code laying around that you would like to make available to a wider audience, by putting it on the web as a ready to use web tool. Until recently, this used to be pretty difficult, and may even have required reimplementation of the software in JavaScript, the programming language that browsers use.

*Wouldn’t it be great if you could run your existing C++ code on the web with only minor effort?*

That way, loads more people would be able to see your results, interact with your algorithm, and apply it for their own purposes.

In this blog, we’ll show you how to take a simple algorithm written in C++ and make it available as a web application. Subsequent blogs in this series will expand on the current one by laying out more advanced topics, specifically how to [make the app interactive](https://medium.com/@eScienceCenter/interact-with-your-c-web-app-using-react-forms-543e676a7634), how to [visualize the results](https://medium.com/@eScienceCenter/spice-up-your-c-web-app-with-visualizations-bcc1e888ec25), and how to [deal with long running tasks](https://medium.com/@eScienceCenter/help-my-c-web-app-is-not-responding-b930ca3034ad).

## Root finding

So today’s aim is to have a simple web app that determines the root of a mathematical function *2x³ — 4x² + 6*, i.e. the value of *x* where *y = 0*.

![](/assets/0_bXP0Qywo6n7wLdXS-790afe24.png)

Function 2x³ — 4x² + 6.

For this, we’ll use an iterative method known as the [*Newton-Raphson* root finding method](https://www.youtube.com/watch?v=cOmAk82cr9M). Remember Newton? Quiet fellow, fabulous hair? Yes, *that* Newton. The way Newton-Raphson works is, you give it the equation whose root you want to find, along with the derivative of that equation. Then you take an `initial_guess` of what you think the value of the root could be, then let the method iterate towards the solution. The solution is approximate within a `tolerance`, which you can also set. Anyway, the algorithm is written C++, but **with some trickery, we'll be able to use that C++ code from the browser, without the need to port it first**!

![](/assets/0_GL19nE2yCZ-loY6y-2b0130c2.jpg)

Newton (and his hair). Image courtesy of Wikimedia Commons.

Now before you say *“That’ll be so much slower than running it native!”* or *“C++ from the browser? Impossible!”*, just hold your horses for a sec. With the right tools, it is possible to run C++ code in the browser, with an acceptable performance penalty. For example, Gabriel Cuvillier was able to run the video game *Doom 3* [in the browser](http://wasm.continuation-labs.com/d3demo/). He was able to do this by compiling the game’s source code into WebAssembly, a low-level language that browsers can run. And if it works for video games, it will likely work for your research software, too.

![](/assets/0_WILEEGqVA7Izb05c-277ca307.jpeg)

Hold your horses. Image courtesy of Luciano Marelli via pixabay.

## What we’ll need

OK, now that you’re fully on board with this, let’s get to it. Here’s a list of what we need:

1. We are going to write a small HTML page, so you will need basic knowledge of [HTML](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/HTML_basics) and [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript).
2. Some C++ code to illustrate the process. We’ll use our Newton-Raphson C++ code.
3. A program ==that== can take our existing C++ code and compile it into a WebAssembly module. For this, we’ll use [Emscripten](https://emscripten.org/) ’s `emcc` compiler, the most popular C++ to WebAssembly compiler of the bunch.
4. To use the WebAssembly functionality from JavaScript, a binding is required. The binding will map C++ constructs to their JavaScript equivalent and back. For this, we’ll use [embind](https://emscripten.org/docs/porting/connecting_cpp_and_javascript/embind.html#embind).
5. A web server to serve our files. We’ll use Python 3’s `http.server`, but other web servers work equally well.

## Tying it all together

### The C++ code

Here is the equation whose root we want to find, along with its derivative, since that’s what Newton-Raphson requires:

File: problem.hpp

File: problem.cpp

The snippet below shows the contents of the file `newtonraphson.hpp`. It is the header file for the Newton-Raphson iterative root finding algorithm. It defines a class named `NewtonRaphson`. Besides the constructor method `NewtonRaphson(float tolerance_in)`, `NewtonRaphson` has one other public method, `solve`, which takes a `float`, and returns another `float`. Furthermore, `NewtonRaphson` also has a private member, `tolerance` of type `float`, which is used to store the class instance's private data.

File: *newtonraphson.hpp*

File `newtonraphson.cpp` contains the corresponding implementation:

File: newtonraphson.cpp

From this definition, `NewtonRaphson` instances need to be initialized with a value for `tolerance_in`, which is then stored as the private member `tolerance`. Once the object instance has been constructed, users can call its `solve` method to iteratively find `equation` 's root, with `equation` and its `derivative` being imported from `problem.hpp` via the `include` line near the top.

### Check on command line

The following code is a minimal command line program that we can use to check if everything is working correctly:

File: *cli.cpp*

Our command line program can be compiled with:

```hs
g++ -o cli.exe problem.cpp cli.cpp newtonraphson.cpp
```

Subsequently running it should give the following output:

```hs
./cli.exe
The value of the root is : -1.00
```

Now we’re ready to move on to the WebAssembly part.

### Binding

To use the Newton-Raphson code from JavaScript, we’ll need to define the *bindings* file. The binding allows compiled code to be called from JavaScript. For our Newton-Raphson code, the binding file looks like this:

File: *bindings.cpp*

The binding file uses `embind` [binding statements](https://emscripten.org/docs/porting/connecting_cpp_and_javascript/embind.html#classes) to expose the `NewtonRaphson` class, its constructor method, as well as its public method `solve`.

### Compiling to WebAssembly

First we need to [download and install](https://emscripten.org/docs/getting_started/downloads.html) Emscripten to get the compiler. The Newton-Raphson source and its binding can be compiled into a WebAssembly module with Emscripten’s `emcc` compiler, as follows:

```hs
emcc -I. -o newtonraphson.js -Oz -s MODULARIZE=1 \
 -s EXPORT_NAME=createModule --bind \
 problem.cpp newtonraphson.cpp bindings.cpp
```

This will generate a WebAssembly module `newtonraphson.wasm`, along with a JavaScript file `newtonraphson.js`. We also export the `createModule` JavaScript function in the compile command so it can be used to load and initialize the WebAssembly ==module==. Using the `newtonraphson.js` JavaScript library, we can find the root of the mathematical function, and subsequently display its value with the following HTML:

File: *index.html*

### Hosting the app with a web server

We’ll need a web server to display the HTML page in a web browser. For this, we’ll use the [http.server](https://docs.python.org/3/library/http.server.html) module from Python 3 to host all files in the current directory on port 8000, like so:

```hs
# change to directory with index.html and newtonraphson.* files
python3 -m http.server 8000
```

From the figure at the top of the article, the root of the equation should be at `x = -1.00`. Visit [http://localhost:8000/](http://localhost:8000/) to see if your browser shows the correct result.

![](/assets/0_sgmpFtqMZRHKIBW4-19d2b6c1.png)

The resulting page if everything works. See the live version of the app on GitHub pages.

## Recap

1. We wrote a simple algorithm in C++
2. We defined the JavaScript interface by writing Emscripten bindings
3. We compiled the algorithm and bindings to a WebAssembly module with Emscripten compiler
4. We ran the algorithm in a web browser using some JavaScript to talk to the WebAssembly module.

The nice thing about this solution is that we don’t need expensive infrastructure to perform computation as the computation is done in the user’s web browser — we just need somewhere to host the files.

## Get in touch with us

This blog was written by the Generalization Team of the Netherlands eScience Center. The team consists of Stefan Verhoeven, Faruk Diblen, Jurriaan H. Spaaks, Adam Belloum and Christiaan Meijer. Feel free to get in touch with the generalization team at [generalization@esciencecenter.nl](mailto:generalization@esciencecenter.nl).

## Where to go from here?

In upcoming blogs we will cover:

- [Help! My C++ web app is not responding](https://medium.com/@eScienceCenter/help-my-c-web-app-is-not-responding-b930ca3034ad): how to perform computations without blocking the user interface.
- [Interact with your C++ web app using React forms](https://medium.com/@eScienceCenter/interact-with-your-c-web-app-using-react-forms-543e676a7634): how to let the user supply their own input values for `tolerance` and `initial_guess`.
- [Spice up your C++ web app with visualizations](https://medium.com/@eScienceCenter/spice-up-your-c-web-app-with-visualizations-bcc1e888ec25): how to visualize data from the algorithm.

We’ll wrap up the series in [a final blog](https://medium.com/@eScienceCenter/c-web-app-with-webassembly-vega-web-worker-and-react-1e5b750c88df) that combines the topics of the whole series in a full-featured web application. If you’re curious what that’s going to look like, make sure to check out the [live demo](https://nlesc-jcer.github.io/run-cpp-on-web/kitchen-sink/app.html) on GitHub Pages.

If you enjoyed this article, leave a comment and give us a clap!

*These blogs were written as part of the “Passing XSAMS” project. To learn more about the project, check out its* [*project page*](https://www.esciencecenter.nl/projects/passing-xsams/)*. Thank you to our proof readers* [*Jan van Dijk*](https://orcid.org/0000-0001-8002-5459)*,* [*Daan Boer*](https://github.com/DAANBOER)*,* [*Lourens Veen*](https://orcid.org/0000-0002-6311-1168) *and* [*Patrick Bos*](https://orcid.org/0000-0002-6033-960X)*.*
