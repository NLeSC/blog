---
layout: post
title: "Decorators in R"
author: Pablo Rodríguez-Sánchez
published: true
source: medium
source_url: https://blog.esciencecenter.nl/decorators-in-r-ec84eaeca3e3
tags:
  - Git
  - Python
---

Decorators have been made quite popular by Python but, did you know they also exist in R?

![](/assets/0_A6j5Seyt_V3qq5Si-c5a79df8.webp)

Photo by Lenny Kuhne on Unsplash

Decorators are typically used to extend the behaviour of a function in an elegant and minimally invasive way. Graphically, we can think of a decorator as:

![](/assets/1_ciWjhFQWICOV9SmeFsMuWg-594f2a3b.png)

An analogy of a decorator. The original function is a car. The decorator adds an antenna and a wing to the car, but the basic functionality of the car (transporting people) remains unchanged. Icons made by Smashicons and Freepik.

Some examples of things you may want to do with a decorator are logging the input/output of a function, or timing it. The power of decorators is that, when properly designed, they work for **any** function. This makes them quite versatile and useful, as we’ll see in some examples below.

From a more technical point of view, decorators are *functionals*. In mathematics, a functional is an object that takes functions as an input. In the case of decorators, they also return a function as an output. If you want to sound fancy, you can say that a decorator is an endomorphism over a functional space. But I prefer clarity above fanciness: a decorator is something that swallows functions and, well…, poops functions.

## Functions as first-class objects

Decorators can be implemented in any language that treats functions as first-class objects. Long story short, this means that functions exist even if they are not called. Does this sound too abstract? Let’s get specific: check out the code snippets below.

We can use the function `cos` to calculate a cosine:

```hs
> cos(3.1416)
[1] -1
```

But in R, `cos` itself is an object. We can, for instance, assign it to something:

```hs
> foo <- cos
```

Because `foo` is now a function, we can call it with an argument:

```hs
foo(3.1416)
[1] -1
```

If we call it without an argument, it still returns something. Something a bit obscure, but something nonetheless:

```hs
> foo
function (x)  .Primitive("cos")
```

This means that the function itself is an object that lives in our environment and that, in principle, we can manipulate it. This is exactly what a decorator will do.

## The skeleton of a basic decorator

The basic skeleton of a decorator in R looks like this:

```hs
deco <- function(f) {  wrapper <- function(...) {
       # <code prior to execution>
       res <- f(...)
       # <code posterior to execution>       return(res)
  }  return(wrapper)
}
```

and we can apply it like this:

```hs
f_decorated <- deco(f)
```

It is worth spending a minute looking at the skeleton above. The decorator will return a wrapper. A wrapper can be thought of as an improved version of the original function (but not of its result!, just like `foo` didn’t return a result until we called `foo(3.1416)`). The `...` symbol stands for **any** input (more on this later).Now, every time we call `f_decorated` passing some argument(s) to it, not only the original `f` will be executed, but also the code marked as prior and posterior.

Let’s see some examples:

## Time my function

The decorator below can be used to print the starting and ending times of your function:

```hs
timer <- function(f) {   wrapper <- function(...) {
      # Before execution
      op <- options(digits.secs = 6) # Increase time resolution
      print(paste("Ini time:", Sys.time())) # Show the clock before      res <- f(...)      # After execution
      print(paste("End time:", Sys.time())) # Show the clock after      return(res)
  }  return(wrapper)
}
```

Now we can create an “improved” version of any function. Let’s try with the cosine function:

```hs
> cos_timed <- timer(cos)
> cos_timed(3.1416)
[1] "Ini time: 2021-07-28 12:32:26.309175"
[1] "End time: 2021-07-28 12:32:26.310383"
[1] -1
```

Note that the code above is equivalent to the shorthand:

```hs
timer(cos)(3.1418)
```

The `...` syntax, meaning any amount of input parameters, allows for timing functions of different amounts of parameters without having to change anything at all. Check this out:

```hs
> timer(runif)(5, -1, 1)
[1] "Ini time: 2021-07-28 12:35:02.506004"
[1] "End time: 2021-07-28 12:35:02.50642"
[1]  0.63678797  0.99874053 -0.09436601  0.91444153  0.77181499
```

*Note: please take this only as an example. If you really need to time your R functions, I advise you to use profiling tools instead.*

## Log my function

Another interesting possibility is using a decorator for logging the output of any function. Check this out:

```hs
logger <- function(f, filename = 'log.txt') {   wrapper <- function(...) {
      # Before execution
      # Do nothing      res <- f(...)      # After execution
      write(res, file = filename, append = TRUE)      return(res)
  }  return(wrapper)
}
```

Let’s apply it, for instance, to the power function:

```hs
> logger(pow)(2, 3)
[1] 8
```

and it will log the value `8` in the default file `log.txt`. A non-default log filename can be passed via:

```hs
> logger(pow, filename = "otherlog.txt")(4, 5)
[1] 1024
```

## What about syntactic sugar?

Certainly one of the secrets to the success of decorators in Python is that they look really neat. Instead of something like:

```hs
# In Pythonf_dec = decorator(f)
```

We can use syntactic sugar to apply the decorator from the moment the function is defined:

```hs
# In Python@decorator
def f(args):
   # <function body>
```

Is it possible to do something similar in R? The answer is yes. And all of it thanks to the [tinsel](https://cran.r-project.org/web/packages/tinsel/index.html) package. As usual, the first step is to install and load it:

```hs
install.packages("tinsel")
library(tinsel)
```

Now, if we want to apply, say, our `timer` decorator to a brand-new defined function, we’ll use the special comment `#. timer` on top of the definition. This would be equivalent to the syntactic sugar `@timer` in Python.

```hs
#. timer
say_hi <- function(name) {
   return(paste("Hi", name, sep = " "))
}
```

In order to make it work, we have to source the file with a special source function contained in the tinsel package:

```hs
source_decoratees('filename.R')
```

And we are ready to try it:

```hs
> say_hi("Pablo")
[1] "Ini time: 2021-07-29 10:29:27.364677"
[1] "End time: 2021-07-29 10:29:27.366081"
[1] "Hi Pablo"
```

Yes… this syntactic sugar is (still) not so amazing as that of Python, but still quite remarkable.

## A real-world problem

Wait a minute… is this useful at all? I mean, in real-world problems?

Let me tell you a story. Not long ago, I had to refactor some code that I hadn’t written myself. I cannot imagine a more real-world task than that… and decorators made my life much easier.

Long story short, the code contained several one-liners that did too much. Particularly, the command `system` was used to execute very long instructions that were constructed by pasting pieces of strings. Something like:

```hs
system(paste("command1 ", "--parameter ", "command 2 ", as.character(1250), " more_commands "), intern = TRUE, ignore.stdout = TRUE)
```

Each line differed in the size and composition of the pasted string. In order to refactor this, and to make it more readable, the first thing I needed to know was the exact content of those complicated strings. There were lots of them, and I didn’t want to manually extract them from inside `system`. Luckily for me, the pasted string was passed always as the first argument to the `system` function.

So I wrote a decorator that logs the first argument of anything, and it saved my day:

```hs
log1starg <- function(f, filename = 'loginput.txt') {  wrapper <- function(x, ...) {
      # Before execution
      write(x, file = filename, append = TRUE) # Log the 1st arg
    
      res <- f(x, ...)      # After execution
      # Do nothing      return(res)
  }
  
  return(wrapper)
}
```

Now, I only had to find all the appearances of `system` and substitute them by `log1starg(system)`. After that, just run the script from beginning to the end, and open the freshly created `loginput.txt` file containing all the information I needed.

## What about you?

Can you think of another use for decorators? Please feel free to leave a comment below!

## Acknowledgments

I want to express my gratitude to [Patrick Bos](https://medium.com/u/1382ec3ac71f?source=post_page---user_mention--ec84eaeca3e3---------------------------------------) for his useful suggestions.

This entry appears in [R-bloggers.com](https://r-bloggers.com/)
