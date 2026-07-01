---
layout: post
title: "Python’s timeit: Find the fastest code in no time"
date: 2024-05-14
author: Sander van Rijn
published: true
source: medium
source_url: https://blog.esciencecenter.nl/pythons-timeit-find-the-fastest-code-in-no-time-23d6092b5c72
tags:
  - Python
---

![Python’s timeit: Find the fastest code in no time](/assets/pythons-timeit-find-the-fastest-code-in--d3174fda.jpg)
Trains are fast, and your code should be too. Or is it the other way around? — Photo by [LUM3N](https://unsplash.com/@lum3n?utm_source=medium&amp;utm_medium=referral) on [Unsplash](https://unsplash.com/?utm_source=medium&amp;utm_medium=referral)Every programmer wants their programs to run a little faster. While optimizing your whole code to run faster can take a lot of effort, an easy way to gain some speed is to choose the fastest implementation. Which of Python’s options *is* the fastest is not always clear though, so wouldn’t it be nice to have a tool to quickly compare the speed of different implementation choices?

In this post, I will give a short introduction to Python’s built-in `[timeit ](https://docs.python.org/3/library/timeit.html)`module, and go over the three main ways to use it to time small snippets of Python code.

## Timey Wimey Python: timeit

What is Python’s `timeit` module?

> 

This module provides a simple way to time small bits of Python code.
It has both a Command-Line Interface as well as a callable one. It 
avoids a number of common traps for measuring execution times.

 — timeit documentation

In contrast to profiling the runtime of your entire program, the `timeit` module is best suited to time small snippets. We can divide these comparisons into three classes, as illustrated by the examples I will use throughout this blog post.

* Standalone one-liners, such as:

# join on a list comprehension
",".join([str(n) for n in range(100)])

# join on a generator expression
",".join(str(n) for n in range(100))

# join on the `map` function
",".join(map(str, range(100)))2. Standalone multi-liners, such as:

# append
x = []
for i in range(1000):
    x.append(i)

# list addition
x = []
for i in range(1000):
    x += [i]*(ignoring the faster list-comprehension alternative *`*[i for i in range(100)]*`* for the sake of example)*

3. Any snippets with some setup required:

# setup
text = "sample string"
char = "g"

# in-operator
char in text

# find-method
text.find(char)
![Python’s timeit: Find the fastest code in no time](/assets/pythons-timeit-find-the-fastest-code-in--070a66dd.jpg)
Calculating with time — Photo by [wu yi](https://unsplash.com/@takeshi2?utm_source=medium&amp;utm_medium=referral) on [Unsplash](https://unsplash.com/?utm_source=medium&amp;utm_medium=referral)

## In a script: import timeit

As `timeit` is a Python module, you can import it and write Python scripts for your tests. This method is the most self-documenting and repeatable way of writing your timing experiments and makes it easy to store the results for further processing.

The first way you might implement this is to directly use the `timeit` function from the module:

&gt;&gt;&gt; import timeit
&gt;&gt;&gt; timeit.timeit()  # default arguments: timeit(stmt='pass', number=1_000_000)
0.01063702700776048By running `timeit()` without any further arguments, we execute the default statement `stmt='pass'` a million times, showing the minimal overhead of Python’s `pass` statement.

> 

Note: `stmt` can either be a string or a so-called *callable*, i.e., a function. For clarity and brevity, I’ll keep using strings for now.

The major drawback of this method is that you have to guess the number of times to run your snippet up front. If you guess too low the results won’t be reliable, but if you guess too high it might take minutes or hours, defeating the point of a quick test.

Luckily, there is a better way: You can create a `Timer` for your snippet, and call the `autorange` method to automatically try increasing numbers until the time taken is at least 0.2 seconds. It returns the number of repetitions reached, and the total time taken, so you can easily calculate the time per iteration.

&gt;&gt;&gt; import timeit
&gt;&gt;&gt; timeit.Timer().autorange()  # default arguments: Timer(stmt='pass')
(50000000, 0.2607337789959274)

### Standalone one-liners**

Let’s start by comparing the simple one-liners. We give the statement we want to time as a string and specify a custom number of iterations. Note that when your statement already deals with double-quoted strings, the whole string should be given single-quoted, or vice-versa.

&gt;&gt;&gt; from timeit import Timer**&gt;&gt;&gt; Timer('", ".join([str(n) for n in range(100)])').autorange()
(50000, 0.3393513219925808)
&gt;&gt;&gt; Timer('", ".join(str(n) for n in range(100))').autorange()
(50000, 0.38378613100212533)
&gt;&gt;&gt; Timer('", ".join(map(str, range(100)))').autorange()
(50000, 0.48742324599879794)From the reported number of repetitions and returned time in seconds, we can calculate that each of these lines took 6.79**, **7.67, **and **9.75** microseconds to execute respectively.

### **Standalone multi-liners**

Sometimes the snippet you want to test will consist of multiple statements. Python allows you to put multiple statements on a single line with a semicolon `x = 1; y = 2`. Then you can just run your test as explained above for the standalone one-liners. This does not work for snippets with indented code like `if` or `for` though.

To time these snippets that *have* to span multiple lines, you can give `Timer()` a multi-line string as argument. The beautiful and Pythonic way to do this is using Python’s multi-line strings. (The non-Pythonic way is to add `\n` characters in your regular strings.)

These multi-line cases are where it becomes more practical to pass a callable than to re-type your code as a string:

&gt;&gt;&gt; from timeit import Timer**&gt;&gt;&gt; Timer('''x = []
... for i in range(1000):
...     x.append(i)''').autorange()
(20000, 0.34225083301134873)
&gt;&gt;&gt; def add_test():
...     x = []
...     for i in range(1000):
...         x += [i]
&gt;&gt;&gt; Timer(append_test).autorange()
(5000, 0.2470278069959022)

### Setup required**

If there is some setup that only has to be run once, including it in a multi-line snippet means it’s executed at every iteration. Then you’d be measuring something you don’t want to measure! Instead, you can pass this setup statement as a separate argument `setup`.

&gt;&gt;&gt; from timeit import Timer
&gt;&gt;&gt; Timer(
...     setup='text = "sample string"; char = "g"',
...     stmt='char in text',
... ).autorange()
(20000000, 0.3793242520041531)
&gt;&gt;&gt; Timer(
...     'text.find(char)',
...     'text = "sample string"; char = "g"'
... ).autorange()
(5000000, 0.36903892100963276)
![Python’s timeit: Find the fastest code in no time](/assets/pythons-timeit-find-the-fastest-code-in--404fd5ff.png)
Time still flies if you’re having fun in the terminal — render by [aclock](https://github.com/tenox7/aclock)

## Command Line: python -m timeit

Python’s `timeit` module can also be run as a command line tool.

$ python -m timeit -n 10000 'pass'
10000 loops, best of 3: 0.0109 usec per loopThe usage is similar to the imported `timeit` function as shown in the previous section. The `-n` option is optional though, and the same `autorange` behavior will be used if it’s not given. It also reports the actual time per iteration, instead of having to calculate that yourself. This is reported in `nsec`, `usec`, `msec` or `sec`, for nano-, micro-, mili- and whole seconds respectively. Note also that it reports ‘best of 5’: it’s repeated the `autorange` timing five times, and reports the minimum.

$ python -m timeit 'pass'
50000000 loops, best of 5: 5.21 nsec per loop

### Standalone one-liners

Testing one-liners with the command line is as easy as replacing `pass` from the introduction with the code you want to test, and the `timeit` tool will automatically report the time in a nice human-readable format.

$ python -m timeit '", ".join([str(n) for n in range(100)])'
50000 loops, best of 5: 6.66 usec per loop
$ python -m timeit '", ".join(str(n) for n in range(100))'
50000 loops, best of 5: 7.62 usec per loop
$ python -m timeit '", ".join(map(str, range(100)))'
50000 loops, best of 5: 9.31 usec per loop

### Standalone multi-liners

As before, the simplest way to test a snippet of multiple lines is to join the statements with a semicolon if no indentation is required. When indentation is required, the other option is to pass multiple strings as arguments to the command. Note that you still have to add the indentation properly yourself! This can get tricky to count if your indentation is more than a single level deep, but is usually not too hard.

$ python -m timeit 'x = []' 'for i in range(1000):' '    x.append(i)'
20000 loops, best of 5: 17.1 usec per loop

$ python -m timeit 'x = []' 'for i in range(1000):' '    x += [i]'
5000 loops, best of 5: 48.4 usec per loop

### Setup required

To add some initial setup such as imports or variable declarations, we can use the `-s` option:

$ python -m timeit -s 'pass' 'pass'
50000000 loops, best of 5: 5.21 nsec per loopThe setup *does* come before the statement to test in this case, so that makes it a bit more intuitive to read.

$ python -m timeit -s 'text = "sample string"; char = "g"' 'char in text'
20000000 loops, best of 5: 19 nsec per loop
$ python -m timeit -s 'text = "sample string"; char = "g"' 'text.find(char)'
5000000 loops, best of 5: 69.3 nsec per loop
![Python’s timeit: Find the fastest code in no time](/assets/pythons-timeit-find-the-fastest-code-in--4c2edcf2.png)
Timing can be an important part of your notebook toolkit

## IPython/Jupyter magics: %timeit

When working in the [IPython](https://pypi.org/project/ipython) interactive shell, or in a [Jupyter notebook ](https://jupyter.org/)with a Python kernel, you have access to the so-called [‘magic commands’](https://ipython.readthedocs.io/en/stable/interactive/magics.html). For timeit, there is the `[%timeit](https://ipython.readthedocs.io/en/stable/interactive/magics.html#magic-timeit)` magic¹. It simply passes the code you type after it to (a version of) `timeit.Timer().autorange()`! Like magic!

One small caveat is that the outcome is reported as a mean +/- standard deviation of multiple repetitions, while the original Python documentation suggests always using the minimum.

### Standalone one-liners

For simple one-liners, just type the code as you would normally, and type `%timeit` before it. That’s all!

In [1]: %timeit ", ".join([str(n) for n in range(100)])
6.92 µs ± 46.7 ns per loop (mean ± std. dev. of 7 runs, 100,000 loops each)

In [2]: %timeit ", ".join(str(n) for n in range(100))
8.27 µs ± 1.15 µs per loop (mean ± std. dev. of 7 runs, 100,000 loops each)

In [3]: %timeit ", ".join(map(str, range(100)))
10.9 µs ± 1.72 µs per loop (mean ± std. dev. of 7 runs, 100,000 loops each)

### Standalone multi-liners

The `%timeit` magic doesn’t quite work for multi-line snippets though. Why? Because magics with a *single* `%` are *line-magics*. For *cell-magics*, you just have to add another `%` to make it `%%timeit`. Then it will time all the code in your cell. No further difficulties whatsoever!

In [1]: %%timeit
   ...: x = []
   ...: for i in range(1000):
   ...:     x.append(i)
   ...:
23.6 µs ± 3.37 µs per loop (mean ± std. dev. of 7 runs, 100,000 loops each)

In [2]: %%timeit
   ...: x = []
   ...: for i in range(1000):
   ...:     x += [i]
49 µs ± 385 ns per loop (mean ± std. dev. of 7 runs, 10,000 loops each)A word of warning: any code on the same line as `%%timeit` will be used as setup and only be run once. I think it’s too easy to make mistakes with this, so I’d avoid this feature. Compare:

In [1]: %%timeit y = [x for x in range(1_000_000)]  # setup is not timed
   ...: len(y)
   ...:
   ...:
21.7 ns ± 0.297 ns per loop (mean ± std. dev. of 7 runs, 10,000,000 loops each)

In [2]: %%timeit
   ...: y = [x for x in range(1_000_000)]  # this line is now being timed
   ...: len(y)
   ...:
   ...:
22.9 ms ± 35.4 µs per loop (mean ± std. dev. of 7 runs, 10 loops each)

### Setup required

Now you might be thinking *“but then where do I put my setup command for either *`*%timeit*`* or *`*%%timeit*`*?”* The answer: you can run it in some previous cell! As IPython/Jupyter already takes care of passing your code on to the `timeit` module properly, it also automatically passes along all current global variables. So we can simply first run a cell with our setup:

In [1]: text = "sample string"
In [2]: char = "g"And use the simple `%timeit` magic to time the code we are actually interested in, without specifying which setup is associated with it.

In [3]: %timeit char in text
22 ns ± 0.267 ns per loop (mean ± std. dev. of 7 runs, 10,000,000 loops each)

In [4]: %timeit text.find(char)
72.3 ns ± 0.811 ns per loop (mean ± std. dev. of 7 runs, 10,000,000 loops each)

## Summary

I hope to have shown how you can easily use Python’s `timeit` module to measure the execution times of your snippets, whether for fun or profit. Although each has its pros and cons (see below), I personally recommend using IPython/Jupyter’s `(%)%timeit` magics as they are the most intuitive to use: just write the code as you would normally with the `(%)%timeit` magic in front or above.

## Pros and Cons

### Importing `timeit` module

Pros:
+ **Time taken can easily be used in further processing**+ **Complete programmable flexibility**Cons:
- **Takes more effort to use the `autorange` feature

### CLI Tool

**Pros:
+ **Fast to use**+ **Uses autorange by default**+ **Nice and concise output**Cons:
- **Requires a separate terminal window outside of your current Python work &amp; Results not easily reusable in a program

### IPython/Jupyter Notebook Magics

**Pros:
+ **Easiest to use**+ **Uses autorange by default**+ **Setup is taken from session context**Cons: 
-** Needs IPython or Jupyter to be installed**- **Gives mean +/- standard deviation as result, while Python’s documentation suggests using the minimum

¹ as opposed to the `(%)%time` magic, which tracks execution time of that line/cell being run just the once as-is.
