---
layout: post
title: "Better scripts with typing"
date: 2024-07-05
author: Lourens Veen
published: true
source: medium
source_url: https://blog.esciencecenter.nl/dynamic-types-static-types-oh-my-py-25c9743b72c4
tags:
  - Python
  - RSE
---

1

The Engineering Corner

*A blog-within-a-blog on the transition from writing simple scripts for yourself to writing larger programs with and for others. TEC appears on an irregular schedule driven by workload and inspiration.*

### № 1: Better scripts with typing

Imagine that one day you are in the office, and a colleague comes by explaining that their Python script isn’t doing what it’s supposed to. They ask you to help solve the problem. You happily agree. You see they’ve written a function:

def foo(a, b):
    return a + bIs this code correct, or will it give an error if you run it? (`foo` is a traditional name for example functions, it doesn’t mean anything.)

The answer, as often in engineering, is, “It depends”. It depends, in this case, on how the function is called. Something like this will work:

print(foo(1, 1))On the other hand, this won’t work:

print(foo([1], 1))So, whether this function is correct or not depends on what you pass into it. It works for two `int`s (and for two strings too), but not for a `list` and an `int`.

So how do you tell whether the problem is in this function? Well, you can simply check the rest of the script, find where the function is called, see what goes into it, and if `a+b` works for whatever `a` and `b` are put in, then the code is correct and the mistake must be somewhere else.

So far, so good. But what if this is more than just a script? If you have functions calling functions, and functions being called from different places, then figuring out all the different things that can go into the function is going to be quite a bit of detective work. Pretty soon, it’s going to be quite difficult to know whether a function will work or crash. It can even be impossible:

import json

with open('input.json') as f:
    a = json.load(f)
print(foo(a, 1))Now whether the program works or crashes depends on what’s in some file on the user’s computer! So maybe the script is correct after all, and the problem is elsewhere? This doesn’t make for reliable scripts, or even reproducible science, for that matter.

![Better scripts with typing](/assets/better-scripts-with-typing-f3cdba31.jpg)
The Philippeion of Olympia (Mark Cartwright — [CC BY-NC-SA](https://creativecommons.org/licenses/by-nc-sa/4.0/))

### Modularity and types

Clearly, we get all kinds of problems when we try to make software that will reliably get the user what they want, especially if the software is large and complex. Fortunately, there’s a good way of dealing with complexity. Invented by legendary RSE [Philip II of Macedon](https://www.worldhistory.org/Philip_II_of_Macedon/) some 2300 years ago: Divide et Impera (Divide and Rule). You split up your program into components (functions, procedures, classes, packages, etc.) that you can deal with one by one, then assemble them into a reliably operating empire, I mean program. Let’s look again at that function:

def foo(a, b):
    return a + bIt receives two arguments, `a` and `b`, from the caller, and returns some value that is the result of the operation `a + b`. Receiving arguments and returning a value are the only connections it has to the outside world (such a function is called *pure*). But whether the function works correctly depends on the values of `a` and `b`, and therefore on the outside world. That means it’s not a very reliable building block. Philip would be disappointed.

What if we chose a set of acceptable values for both `a` and `b`? Then we could at least reason that if the function does not crash when an acceptable value is passed for both arguments, then the function works correctly. For example, we could specify that `a` and `b` both need to be in the set of all integer numbers. Such a collection of possible values is called a type*. Let’s annotate our function with the types we want to receive:

def foo(a: int, b: int):
    return a + bWill this function work correctly? Yes! If you pass it two `int` s, it will return their sum and not crash. The above is actually valid Python (the `:int` bits are called *type annotations*) and it will run just the same as the previous example:

def foo(a: int, b: int):
    return a + b

def bar():
    print(foo(1, 1))

def baz():
    print(foo([1], 1))

bar()
baz()As you can see, if you run this, the code does exactly the same. There is something funny though. In principle, Python could see when it reads the part `foo([1], 1)` that it is not correct. `[1]` is a list, and the function `foo `needs an int. Nevertheless, Python will happily accept the definition of `baz`, and it won’t crash until you actually *run *`baz`, in turn calling `foo`and trying to add a list and an `int`. It’s only then that Python realizes that the values are the wrong type and can no longer add them, so it dutifully generates a `TypeError`.

![Better scripts with typing](/assets/better-scripts-with-typing-df0ab36b.jpg)
Photo by [Mark König](https://unsplash.com/@markkoenig?utm_source=medium&amp;utm_medium=referral) on [Unsplash](https://unsplash.com/?utm_source=medium&amp;utm_medium=referral)

### Static vs. Dynamic typing

Not all programming languages are like this. The Python language is a so-called *dynamically typed* language, which means it won’t check whether things are the right type until it’s running the code and trying to do something with that value. Furthermore, Python completely ignores those type annotations, which explains why it crashes only when it tries to execute `a + b` rather than already when executing `foo([1], 1)`. Nevertheless, it *will* eventually realize that something is wrong at that point and give an error (or it would be an *untyped* language, now mercifully extinct), so that we have a chance to find the problem.

In contrast, languages like C++, Java and Rust are *statically typed*, which means that they do the type checking immediately when the code is read before it’s ever started. It’s impossible to create an executable[⁰](#d5ef) from this C++ code:

auto foo(int a, int b) -&gt; int {
    return a + b;
}

auto baz() -&gt; list&lt;int&gt; {
    return foo(list&lt;int&gt;{1}, 1);
}If I try anyway, GCC tells me: `error: cannot convert 'std::__cxx11::list&lt;int&gt;' to 'int' for argument '1' to 'int foo(int, int)'`, correctly pointing out that `foo` needs an int, where I’m trying to pass a list. Note that it’s doing this already at the call, not inside `foo`, and since no executable is created, I can’t run the code either.

Now if we review this code, we can see that the compiler is in fact right. Function `foo` is fine, but `baz` tries to pass a list as the first argument, and from the definition of `foo` we can see that it takes an int, so that’s wrong. In fact, because the return types are also declared, we can see that there is another problem in this version of `baz`: `foo` returns an int, which `baz` then tries to return even though it should return a list. The C++ compiler will give an error for that as well when we fix the first one.

We didn’t annotate the return type in the Python code before, but you can do that:

def foo(a: int, b: int) -&gt; int:
    return a + b

def baz() -&gt; None:
    print([1], 1)Again, this is not checked by Python, so it will happily return something that doesn’t match the annotation if you tell it to.

### mypy

So what good do those annotations do, if Python ignores them? First of all, type annotating your Python code forces you to think about what kinds of values your functions should accept, and then what to do with different kinds of inputs. That helps you write better code. Second, type annotations are really useful for people reading your code, like another developer, a code reviewer or someone using your package. They don’t need to wonder about what to pass to `foo` anymore as it’s now obvious: integer numbers! And finally, there are tools that will check your type annotations even if Python doesn’t.

The oldest and probably most commonly used one of these (and the one that I use) is called `mypy`. You can pip-install it, and then call `mypy script.py`to check your types, just like `flake8` checks your syntax (your IDE may do this for you actually, look it up!). When I give the above to `mypy`, it tells me `test.py:8 error: Argument to "foo" has incompatible type "List[int]"; expected "int"` and that is exactly what is wrong with my code (and exactly what the C++ compiler said). It points out the right location too! That makes it really easy to fix your code.

### Conclusion

Type annotations and mypy make your Python code more modular and make it easier to find mistakes, and that is particularly important when you start making larger programs that you share with others. Your code becomes more predictable and easier to understand when you use it, and that makes for a more reliably good experience for its users and developers. There are some downsides, mostly to do with mypy and type annotations still in development and being bolted on after the fact to a language that wasn’t conceived as a statically typed language from the start, but for scientific software, it works fine and is an excellent idea.

To summarise:

* As all good Macedonians know, modularity is good!
* To make functions modular (analyzable in isolation), you need to specify input and output types.
* Strongly typed languages check types on reading the code, dynamically typed ones do it when running.
* With mypy, you can check types in Python too, and find a ton of bugs much quicker than without it.

← [TEC 0: Scripting vs. Programming](/scripting-vs-programming-8d7d276f3ba3) — [TEC 2: Procedural Programming](/procedural-programming-f1d8cdef7540) →

[0] C++ is a compiled language. That means that there are two steps to running a C++ program: 1) translating (or *compiling*) it from C++ text to machine code for whichever kind of computer you want to run it on, and 2) running the resulting *executable*. Type checking happens as part of the first step in C++, not the second.
