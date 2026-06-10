---
layout: post
title: "Interact with your C++ web app using React forms"
date: 2020-10-09
author: eScience Editorial Team
published: true
source: medium
source_url: https://blog.esciencecenter.nl/interact-with-your-c-web-app-using-react-forms-543e676a7634
tags:
  - uncategorized

---

Subscribe*Remember me for faster sign in

Let’s implement the `value` and `onChange` for the `tolerance` input. To store the value we will use the [React useState hook](https://reactjs.org/docs/hooks-state.html).

The argument of the `useState` function is the initial value. The `tolerance` variable contains the current value for tolerance and `setTolerance` is a function to set the `tolerance` to a new value. The same logic is also used for the `initial_guess` variable.

The input tag in the form will call the `onChange` function with an event object. We need to extract the user input from the event and pass it to `setTolerance` or `setGuess`. The value should be a number, so we use `Number()` to cast the string from the event to a number.

We are now ready to implement the `handleSubmit` function which will process the submitted form data. The function will get an event object, similar to the `onChange` of the input tag. Normally when you submit a form, the form fields will be sent to the server, but we want to perform the calculation in the browser, so we have to disable the default action with `preventDefault()`. We will then construct a WebAssembly module as we did in [a previous post](https://github.com/NLESC-JCER/run-cpp-on-web/blob/master/webassembly/README.md).

We need a place to store the result of the calculation ( `root` value), we will use `useState` function again. The initial value of the result is set to `undefined` as the result is only known after the calculation has been completed.

When the calculation is done it will store the result value ( `root`) using `setRoot`.

To render the result we can use a React Component which has `root` as a property. When the calculation has not been done yet, it will render `Not submitted`. We will show the `root` property value once it is set.

Finally we can render the `App` component to the HTML container with `id` equal to `container`.

We can combine the heading, form and result components and all the states and `handleSubmit` function into the `App` React component and its rendering and save it as `app.js`. You can find the resulting code [here](https://github.com/NLESC-JCER/run-cpp-on-web/blob/master/react/app.js).

Like before, we also need to host the files in a web server with

python3 -m http.server 8000
![Interact with your C++ web app using React forms](/assets/interact-with-your-c-web-app-using-react-fb84c1c4.gif)
The final page if everything works.*Visit [http://localhost:8000/app.html](http://localhost:8000/app.html) to see the root answer, or go to [GitHub pages](https://nlesc-jcer.github.io/run-cpp-on-web/react/app.html) to see a hosted version of the example app.

## Extra notes

The code supplied here should not be used in production as converting JSX in the web browser is slow. It’s better to use [Create React App](http://create-react-app.dev/), which gives you an infrastructure to perform the transformation offline.

## Conclusion

By writing React components we were able to create an interactive page with a form that executes the WebAssembly module compiled from the C++ code we introduced in the [first blog](https://medium.com/@eScienceCenter/using-c-in-a-web-app-with-webassembly-efd78c08469) of the series.

We went over JSX, props, state, and components, which together constitute the core building blocks of a React web application.

In other blogs of the series that might be of interest we cover

* [Using C++ in a web app with WebAssembly](https://medium.com/@eScienceCenter/using-c-in-a-web-app-with-webassembly-efd78c08469): How to turn C++ code into a web app.
* [Help! My C++ web app is not responding](https://medium.com/@eScienceCenter/help-my-c-web-app-is-not-responding-b930ca3034ad): How to use web workers to perform computations without blocking the user interface.
* [Spice up your C++ web app with visualizations](https://medium.com/@eScienceCenter/spice-up-your-c-web-app-with-visualizations-bcc1e888ec25): Plotting data from the C++ web app using web visualization.

We’ll wrap up the series in a [final blog](https://medium.com/@eScienceCenter/c-web-app-with-webassembly-vega-web-worker-and-react-1e5b750c88df) that combines the topics of the whole series in a full-featured web application.

## Get in touch with us

This blog was written by the Generalization Team of the Netherlands eScience Center. The team consists of Stefan Verhoeven, Faruk Diblen, Jurriaan H. Spaaks, Adam Belloum and Christiaan Meijer. Feel free to get in touch with the generalization team at [generalization@esciencecenter.nl](mailto:generalization@esciencecenter.nl).

If you enjoyed this article, leave a comment and give us a clap!

*These blogs were written as part of the “Passing XSAMS” project. To learn more about the project, check out its *[*project page*](https://www.esciencecenter.nl/projects/passing-xsams/)*.*

*Thank you to our proof reader *[*Daan Boer*](https://github.com/DAANBOER)*.*
