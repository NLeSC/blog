---
layout: post
title: "Decorators in R"
date: 2021-09-29
author: Pablo Rodríguez-Sánchez
published: true
source: medium
source_url: https://blog.esciencecenter.nl/decorators-in-r-ec84eaeca3e3
tags:
  - uncategorized

---

Let’s see some examples:

## Time my function

The decorator below can be used to print the starting and ending times of your function:

timer &lt;- function(f) {   wrapper &lt;- function(...) {
      # Before execution*
      op &lt;- options(digits.secs = 6) *# Increase time resolution*
      print(paste("Ini time:", Sys.time())) *# Show the clock before***      res &lt;- f(...)      ***# After execution*
      print(paste("End time:", Sys.time())) *# Show the clock after***      return(res)**  }  return(wrapper)
}Now we can create an “improved” version of any function. Let’s try with the cosine function:

&gt; cos_timed &lt;- timer(cos)
&gt; cos_timed(3.1416)
*[1] "Ini time: 2021-07-28 12:32:26.309175"
[1] "End time: 2021-07-28 12:32:26.310383"
[1] -1*Note that the code above is equivalent to the shorthand:

timer(cos)(3.1418)The `...` syntax, meaning any amount of input parameters, allows for timing functions of different amounts of parameters without having to change anything at all. Check this out:

&gt; timer(runif)(5, -1, 1)
*[1] "Ini time: 2021-07-28 12:35:02.506004"
[1] "End time: 2021-07-28 12:35:02.50642"
[1]  0.63678797  0.99874053 -0.09436601  0.91444153  0.77181499**Note: please take this only as an example. If you really need to time your R functions, I advise you to use profiling tools instead.*

## Log my function

Another interesting possibility is using a decorator for logging the output of any function. Check this out:

logger &lt;- function(f, filename = 'log.txt') {   wrapper &lt;- function(...) {
*      # Before execution
      # Do nothing***      res &lt;- f(...)***      # After execution*
      write(res, file = filename, append = TRUE)**      return(res)**  }  return(wrapper)
}Let’s apply it, for instance, to the power function:

&gt; logger(pow)(2, 3)
*[1] 8*and it will log the value `8`in the default file `log.txt`. A non-default log filename can be passed via:

&gt; logger(pow, filename = "otherlog.txt")(4, 5)
*[1] 1024*

## What about syntactic sugar?

Certainly one of the secrets to the success of decorators in Python is that they look really neat. Instead of something like:

*# In Python*f_dec = decorator(f)We can use syntactic sugar to apply the decorator from the moment the function is defined:

*# In Python*@decorator
def f(args):
   # &lt;function body&gt;Is it possible to do something similar in R? The answer is yes. And all of it thanks to the [tinsel](https://cran.r-project.org/web/packages/tinsel/index.html) package. As usual, the first step is to install and load it:

install.packages("tinsel")
library(tinsel)Now, if we want to apply, say, our `timer` decorator to a brand-new defined function, we’ll use the special comment `#. timer` on top of the definition. This would be equivalent to the syntactic sugar `@timer` in Python.

#. timer
say_hi &lt;- function(name) {
   return(paste("Hi", name, sep = " "))
}In order to make it work, we have to source the file with a special source function contained in the tinsel package:

source_decoratees('filename.R')And we are ready to try it:

&gt; say_hi("Pablo")
*[1] "Ini time: 2021-07-29 10:29:27.364677"
[1] "End time: 2021-07-29 10:29:27.366081"
[1] "Hi Pablo"*Yes… this syntactic sugar is (still) not so amazing as that of Python, but still quite remarkable.

## A real-world problem

Wait a minute… is this useful at all? I mean, in real-world problems?

Let me tell you a story. Not long ago, I had to refactor some code that I hadn’t written myself. I cannot imagine a more real-world task than that… and decorators made my life much easier.

Long story short, the code contained several one-liners that did too much. Particularly, the command `system` was used to execute very long instructions that were constructed by pasting pieces of strings. Something like:

system(paste("command1 ", "--parameter ", "command 2 ", as.character(1250), " more_commands "), intern = TRUE, ignore.stdout = TRUE)Each line differed in the size and composition of the pasted string. In order to refactor this, and to make it more readable, the first thing I needed to know was the exact content of those complicated strings. There were lots of them, and I didn’t want to manually extract them from inside `system`. Luckily for me, the pasted string was passed always as the first argument to the `system` function.

So I wrote a decorator that logs the first argument of anything, and it saved my day:

log1starg &lt;- function(f, filename = 'loginput.txt') {  wrapper &lt;- function(x, ...) {
      *# Before execution*
      write(x, file = filename, append = TRUE) *# Log the 1st arg*****    
      res &lt;- f(x, ...)*      # After execution
      # Do nothing***      return(res)
  }
  
  return(wrapper)
}Now, I only had to find all the appearances of `system`and substitute them by `log1starg(system)`. After that, just run the script from beginning to the end, and open the freshly created `loginput.txt` file containing all the information I needed.

## What about you?

Can you think of another use for decorators? Please feel free to leave a comment below!

## Acknowledgments

I want to express my gratitude to [Patrick Bos] for his useful suggestions.

This entry appears in [R-bloggers.com](https://r-bloggers.com/)
