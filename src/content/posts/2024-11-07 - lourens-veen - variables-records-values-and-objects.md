---
layout: post
title: "Variables, Records, Values and Objects"
date: 2024-11-07
author: Lourens Veen
published: true
source: medium
source_url: https://blog.esciencecenter.nl/variables-records-values-and-objects-971e2a30be6d
tags:
  - uncategorized

---

14

The Engineering Corner

*A blog-within-a-blog on the transition from writing simple scripts for yourself to writing larger programs with and for others. TEC appears on an irregular schedule driven by workload and inspiration. (*[*TEC1*](/dynamic-types-static-types-oh-my-py-25c9743b72c4)*, *[*TEC2*](https://medium.com/escience-center/procedural-programming-f1d8cdef7540)*)*

## № 3: Variables, Records, Values and Objects

Last time, we talked about the actions taken by scripts, and how they could be organised hierarchically using procedures. This makes it possible to split up a big problem into clearly delineated blocks with well-defined interfaces. These blocks can then be glued together into a hierarchical structure that gets complex things done in a well-organised way.

However, actions are only one half of the programming equation. Procedures give us verbs, but we’re still missing nouns: data, or state. In Python, and many other languages, data is stored in *variables*. Variables connect a name to a memory location holding a value. This connection is created by an *assignment*. The statement `x = 1` will create a new memory location, associate it with the name `x`, and write the number `1` in it. Other examples of Python values are the string `"The Engineering Corner”` and the boolean value `True`.

![Variables, Records, Values and Objects](/assets/variables-records-values-and-objects-ec9ee01b.jpg)
Values spilling out of a variable? Could there be a memory leak? Photo by [Napendra Singh](https://unsplash.com/@napender?utm_source=medium&amp;utm_medium=referral) on [Unsplash](https://unsplash.com/?utm_source=medium&amp;utm_medium=referral)Variables can be used in different ways. Often, they store the data that we are processing; after we read it from an input file, halfway through a calculation, and before we write it out again. But we also have variables that are used to control the execution of the script: loop variables, flags that keep track of whether something has happened, and so on. Sometimes, data is used to make decisions as well (“if x is negative, do this, else do that”).

At any point during its execution, a program has a *state*, which is simply the collection of all existing variables, plus an indication of the next statement to execute. Together with any future inputs, this state will determine what the program is going to do. Which branch of an if-statement is taken, how many loops a for-statement executes, it all depends on the state.

As your script gets bigger it will get more and more variables, until it becomes difficult to keep track of them all. As with the actions, the solution is to organise the variables hierarchically. There are two ways to do that actually, *scopes* and *records*.

### Scopes

Scopes come for free once you start making functions (procedures in [TEC 2](https://medium.com/escience-center/procedural-programming-f1d8cdef7540), we’re switching back to Python terminology here and call them functions). Variables created within a function are *local* to that function, which means that they’re only visible to statements inside of the function. In other words, they are *in the function’s scope*. Variables that aren’t created within a function are *global* variables, and are *in the global scope*.

So, if you make functions, you’ll notice that most of your variables will end up being local variables. In fact, if you design these functions well and have them only communicate with other functions via parameters and return values, then the only global variables you’ll have are at the top level of your Python script. In Python, you *can* actually read those global variables from inside a function, but something funny happens if you write to them:

global_variable = 42

def my_function() -&gt; None:
    print(global_variable) # prints 42
    global_variable = 43
    print(global_variable) # prints 43

my_function()

print(global_variable) # prints 42The way this works is that if you try to use a variable, it is first looked up in the local scope you’re in. If it’s not found there, then the global scope is tried. So the first time `global_variable` is read in `my_function`, this is what happens. Assignment however is not affected, so on the next line a *new* variable is made in the *local* scope, which is called `global_variable` and given the value 43.

On the next line, this local variable is found first and its value is printed. Note that the global variable named `global_variable` is now invisible from within `my_function`, as it is masked or *shadowed* by the local variable of the same name. The print statement at the end of the script isn’t in `my_function`’s scope, so, it sees the global version of the variable, which still has the value 42.

Scopes are very, very good to have when you’re making larger programs, because they decouple different parts of the state from each other. If your functions are of a reasonable length, then all the code that can possibly affect a local variable is on your screen at once, and easy to have a picture of in your head. This makes it much easier to reason about the code, something that is very important if you’re writing code that will run on someone else’s computer while you’re not around.

You can in fact write to a global variable from inside of a function, but you’d have to have some very very good reasons to do so. It’s almost never good design, so I’m not going to tell you how to do it. Instead, let’s talk about records.

![Variables, Records, Values and Objects](/assets/variables-records-values-and-objects-56480c6a.jpg)
A record record has a record company, catalog number, artist, and title. Photo by [Mick Haupt](https://unsplash.com/@rocinante_11?utm_source=medium&amp;utm_medium=referral) on [Unsplash](https://unsplash.com/?utm_source=medium&amp;utm_medium=referral)

### Records

Sometimes, one variable just isn’t enough to contain all the information you want to store about a particular thing. For example, if you need to keep track of a person, you’ll want to store their name, but maybe also their date of birth, email address, and whatever other properties are of interest to your application. And speaking of dates, those consist of a day, month and year [[0]](#2459). So it seems that some way of grouping multiple variables together would be a useful language feature.

Fortunately, language designers have come to the same conclusion, and have added records* (Pascal) and *structs* (C and C++) to languages. More recent languages like Python tend to have classes instead (more on those in a future instalment), but the closest equivalents in Python would be a *dataclass* [1]:

from dataclass import dataclass

@dataclass
class Date:
    day: int
    month: int
    year: int

@dataclass
class Person:
    name: str
    date_of_birth: DateHere we have a statement that creates a class named `Date`, containing `day`, `month` and `year` fields all of type `int`. What does that mean? One way of looking at a class or a record is that it is a description of the structure of a certain type of complex values. So here we are saying that any value of type `Date` must contain three subvalues with the given names, each of type `int`. These subvalues can themselves be complex objects, as we see in class `Person`.

And so here is a hierarchy again, but a different one than the hierarchy of functions. That one lets us describe complex actions as a combination of simpler actions, while this one lets us describe complex objects as combinations of simpler parts. Together, they make it possible to describe very complex programs in such a way that we can understand them one piece at a time.

There’s one thing still missing though. A class is just a description of what a particular type of value looks like. In order to actually do something, we need some variables containing such values (they’re often called *objects*). Fortunately, Python’s `@dataclass` annotation automatically creates a function with the same name as the class, which takes as arguments the values contained in the class, and returns a value containing them [2]. Some code shows it more clearly:

p = Person(
        name='Albert Einstein',
        date_of_birth=Date(
                day=14, month=3, year=1879))

p2 = Person(
        name='Emmy Noether',
        date_of_birth=Date(
                day=23, month=3, year=1882))

p3 = p2
print(p3.date_of_birth.month)Here we create some values of class `Person` by calling the correspondingly named function, and assign them to variables. To create a `Date`, we have to call that function instead, and pass appropriate arguments.

Once we have these complex values, we can use them as a whole, like in the assignment `p3 = p2`, or we can access some detail inside of them using the `.` operator, as in the `print` statement. And just like that, we’re talking about complex things like people and calendar dates!

One more thing before we go. In [TEC 1](https://medium.com/escience-center/dynamic-types-static-types-oh-my-py-25c9743b72c4), we talked about type annotations, which you can use to specify which types function arguments must have, and what the type of the return value will be. Records and (data)classes are in fact types, and you can use them to annotate functions. So given the above, you can write a function

def update_date_of_birth(p: Person, d: Date) -&gt; None:
    p.date_of_birth = d

update_date_of_birth(p2, Date(day=23, month=3, year=1982))and have mypy check that it’s being called correctly.

If you go and play around a bit with this code, you may notice that there’s some really funny business going on when you assign using whole objects and also parts of them. In the next instalment, we’ll take a look behind the scenes to see what’s actually happening inside of the computer when we make variables and complex values, and clear all that up.

← [TEC 2: Procedural programming ](/procedural-programming-f1d8cdef7540)— TEC 4: &lt;Stay tuned!&gt; →

[0] At least with the calendar system currently used in the western world. There have been many calendar systems over the course of history, it’s a fascinating subject actually. If you’re ever bored, look into it!

[1] Or a NamedTuple or perhaps even a dict, but a data class is the most straightforward and provides for a good starting point when we talk about classes later.

[2] It’s actually a bit more complicated than that, more in a future instalment on Object Oriented Programming.
