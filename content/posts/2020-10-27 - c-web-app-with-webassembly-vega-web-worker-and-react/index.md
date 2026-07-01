---
layout: post
title: "C++ web app with WebAssembly, Vega, Web Worker and React"
author: eScience Editorial Team
published: true
source: medium
source_url: https://blog.esciencecenter.nl/c-web-app-with-webassembly-vega-web-worker-and-react-1e5b750c88df
tags:
  - C++
  - Containers
  - Git
  - Python
  - Visualization
---

To generate the Vega-Lite specification we can write a function like so

To wrap the Vega-Lite visualization in React component we will use `useRef` to get a DOM element as container and use `useEffect` to call vegaEmbed when the iterations or container changes. The React component to render the visualization is

## Pack it up

The React components and React render call can be packed up all together in a JavaScript file called [app.js](https://github.com/NLESC-JCER/run-cpp-on-web/blob/master/kitchen-sink/app.js).

The web applications needs a HTML page to fetch all the React and Vega dependencies, define a HTML tag for rendering the React app to and finally include the application JavaScript file.

File: app.html*

We’ll need a web server to display the HTML page in a web browser. For this, we’ll use the http.server module from Python 3 to host all files on port 8000, like so:

python3 -m http.server 8000Visiting the page at [http://localhost:8000/app.html](http://localhost:8000/app.html) should give us a plot like


](https://nlesc-jcer.github.io/run-cpp-on-web/kitchen-sink/app.html)(Click on image to get interactive version)You can try out different initial guesses to get different amount of iterations. For example having initial guess located in a local minimum like `2` will make the algorithm use many iterations to jump over the minimum.

## Recap

In this series of blog posts we introduced a lot of different technologies to able to take an algorithm written in C++ and make a interactive web application that will run fully in a web browser.

All the source code shown is available at [https://github.com/NLESC-JCER/run-cpp-on-web](https://github.com/NLESC-JCER/run-cpp-on-web).

This blog was written by the Generalization Team of the Netherlands eScience Center. The team consists of Stefan Verhoeven, Faruk Diblen, Jurriaan H. Spaaks, Adam Belloum and Christiaan Meijer. Feel free to get in touch with the generalization team at [generalization@esciencecenter.nl](mailto:generalization@esciencecenter.nl).

Hope you enjoyed this series of blogs and if you have suggestions or questions please post a comment below.

*These blogere written as part of the “Passing XSAMS” project. To learn more about the project, check out its *[*project page*](https://www.esciencecenter.nl/projects/passing-xsams/)*.*
