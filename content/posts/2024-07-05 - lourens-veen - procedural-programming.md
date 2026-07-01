---
layout: post
title: "Procedural Programming"
date: 2024-07-05
author: Lourens Veen
published: true
source: medium
source_url: https://blog.esciencecenter.nl/procedural-programming-f1d8cdef7540
tags:
  - Python
  - RSE
---

The Engineering Corner

*A blog-within-a-blog on the transition from writing simple scripts for yourself to writing larger programs with and for others. TEC appears on an irregular schedule driven by workload and inspiration.*

## № 2: Procedural Programming**

[Previously](https://medium.com/escience-center/scripting-vs-programming-8d7d276f3ba3) we talked about scripting and programming. One difference I mentioned between scripts and programs is that scripts usually consist of a single source file with a straightforward list of instructions, while programs are larger and have a more complex structure. If your script is getting too big to easily read and understand, what are the things you can do?

![Procedural Programming](/assets/procedural-programming-01699b68.jpeg)
My copy of Pascal User Manual and Report by Jensen &amp; Wirth (1975).Here’s an example of a Pascal program (a lesser known programming language developed in the 1970s - Ed.), in fact Program 0.1 from *Pascal User Manual and Report* (1975) by Kathleen Jensen and [Niklaus Wirth](https://en.wikipedia.org/wiki/Niklaus_Wirth):

program inflation(output);

const n = 10;
var i : integer; w1,w2,w3 : real;
begin
    i := 0; w1 := 1.0; w2 := 1.0; w3 := 1.0
    repeat
        i := i+ 1;
        w1 := w1 * 1.07;
        w2 := w2 * 1.08;
        w3 := w3 * 1.10;
        writeln(i,w1,w2,w3)
    until i==n
 end.If you are a Python user, you can see this is not that different[⁰](https://medium.com/p/f1d8cdef7540#bf2b). A Pascal program begins by listing all the constants and variables we are going to need, and their types. Then follows a list of statements, which in this case calculate and print a table of inflation-adjustment factors for ten years and three different inflation rates.

I’ll leave a Python version as an exercise to the reader, but you can see that it will be quite similar (answer below[¹](#2c46), if you want to check your work). In Python, variables are made automatically and don’t have to be declared in advance, but the style of programming is similar. It’s known as *imperative programming*.

As the Pascal User Manual points out, *“A (…) computer program consists of two essential parts, a description of *actions* which are to be performed, and a description of the *data*, which are manipulated by these actions.”* As your script gets larger and more complicated it will process more data, and it will perform more actions, until it all becomes too much to easily understand. What to do?

Let’s start with those actions, as that’s what most people like to focus on. In bigger scripts you often see a long list of instructions, and if it’s more than a screenful, that list may be split up into several blocks by comments. A load-data/process/save-data structure is common for example. What’s been done here is that the script has been split up, so that we can deal with it one section at a time (Philip II of Macedon would be proud, see [TEC 1](https://medium.com/escience-center/dynamic-types-static-types-oh-my-py-25c9743b72c4)).

Can we really deal with the sections independently though? Not entirely, as they still communicate with each other. Each section reads variables written by a previous section, and creates variables for other sections to use. So, if you want to make changes to one section, you still have to take into account the interactions with the others.

Unless the sections do completely different, independent things, this is inevitable: they have to communicate somehow. It’s tricky though. If you change the name of a variable for example, then you have to search the entire script to see if it’s shared with another section, which you then have to modify accordingly. This could trigger changes somewhere else, and before you know it everything is broken.

So, we could use a bit of help. In Pascal, this comes in the form of a *procedure*. Here’s a slightly modified version of Program 11.3 from the same book as above:

program parameters(output);

var a, b, c: integer;

    procedure h(x: integer, var y: integer);
    var z: integer;
    begin
        x := x + 1;
        y := y + 1;
        z := x + y;
        writeln(z)
    end;

begin
    a := 0; b := 0; c := 0;
    h(a, b);
    writeln(a, b)
end.What we have here is a program like before, but the work it does is now split up between the main program and a separate section, which is our procedure. It consists of two parts: a *declaration* (the first line) and an *implementation* (the rest of the block).

A procedure is a kind of box around a block of code (a *scope*). Variables can not pass through the walls of the box, unless we explicitly pass them through. In the declaration `procedure h(x: integer, var y: integer);` we specify explicitly which variables can be passed into the box to communicate between the procedure and the rest of the program: `x` and `y` in this example. These are called the procedure’s *parameters*.

The `var` keyword in front of `y` says that `y` is passed by reference, while the lack of one for `x` means that `x` is passed by value. What that means is that when we call the procedure with arguments `a` and `b`, the first parameter `x` becomes a *copy* of the first argument `a` (so that changing `x` doesn’t affect `a`), while the second parameter `y` becomes *another name* for the second argument `b` (and so changing `y` changes `b`).

No other variables can enter or exit the box. Variable `z`is declared inside the procedure, and it is only visible within the procedure because we haven’t said otherwise.

{ The main program again }

begin
    a := 0; b := 0; c := 0;
    h(a, b);
    writeln(a, b)
end.This program has some nice properties. When we call procedure `h` in the main program, we can be sure that variable `c` will not be changed, without even looking at `h`! Then, taking the declaration (the first line with the parameters) of `h` into account, we can also tell that `a` will probably be read by `h` , but won’t be changed, and that `b` may end up having a different value after the call. Crucially, we can know all of this without ever reading `h`’s implementation.

{ Procedure h by itself }

procedure h(x: integer, var y: integer);
var z: integer;
begin
    x := x + 1;
    y := y + 1;
    z := x + y;
    writeln(z)
end;Looking at procedure `h`, we can tell by looking only at the procedure that any changes we make to it that do not affect what we do to `y` will not affect how the rest of the program runs, again *without inspecting the rest of the program*.

Of course, if we do make such a change, then we will still have to find all the places in which `h` is called and possibly modify them. There is still a dependency! It’s just been made explicit. The same goes if we change the declaration, for example by changing `x` to be a `real`.

(To clear up the potentially confusing terminology: Pascal has both procedures and functions. Conceptually, a procedure is a list of actions that together enact a desired change (like directions for navigating to a destination), while a function is a list of instructions that produce a result (like how to calculate the length of the hypotenuse of a right triangle).

Pascal has different language features for procedures and functions, as does Fortran, but more modern programming languages don’t bother with this and just allow you to make a function that returns `void` or `None`. So, practically speaking, a function in Pascal is the same as a function in Python, and a Pascal procedure is a Python function that doesn’t return a value.

I’m going to continue to use the term procedure here, because we’re talking about procedural programming, and we can talk about functions later when we talk about functional programming, which is a different beast altogether.)

![Procedural Programming](/assets/procedural-programming-9ac4b700.jpg)
Procedures for making a tasty lunch. Photo by [S O C I A L . C U T](https://unsplash.com/@socialcut?utm_source=medium&amp;utm_medium=referral) on [Unsplash](https://unsplash.com/?utm_source=medium&amp;utm_medium=referral)

### Making a good procedure

So, when should you make a procedure, and what does a good procedure look like? One good programming rule to live by is DRY: Don’t Repeat Yourself. So, if you find yourself copy-pasting some code, consider making a procedure instead, and calling it twice.

Procedures are also fine if they’re only called once though. In the words of Jensen and Wirth: “One should not hesitate, however, from formulating an action as a procedure — even when called only once — if doing so enhances the readability. Defining development steps as procedures makes a more communicable and verifiable program.”* Hear hear!

As we’ve seen above, the point of procedures is to split up your program into self-contained components, which can be modified independently. On the other hand, these components have to work together, for which they need to exchange information, and that introduces dependencies. There’s no perfect solution to this paradox, but it does lead to some good advice: fewer parameters is better, relative to the length of your procedure.

If you’re a statistician or a graph theorist, consider a procedure to be a cluster: a good cluster has lots of stuff and connections inside it, but few connections to things outside it. Or if you’ve ever written a text: a procedure is like a paragraph, with some closely related sentences inside it, but connected to the rest of the text only by the things in its topic sentence.

How about length? Some purveyors of questionable programming advice suggest hard length limits of sometimes as little as five lines per procedure[²](#f9c1). I think the idea behind that is that humans can keep track of five to seven objects (chunks) at a time in short-term memory, so that this allows the reader to keep the whole procedure actively available.

I don’t think it really works this way though. Blog posts tend to have really short paragraphs for easier reading on screen, but novels don’t and they are still perfectly readable. Grabbing a random one off my bookshelf I count 8 sentences and 163 words in a paragraph, which is three to four times the previous paragraph in this blog and it still reads just fine. So I think that longer procedures are okay, as long as they don’t get so long that you find yourself searching back and forth for something while reading them, or you (or rather someone else who isn’t all that familiar with the code!) have trouble keeping track of what’s going on.

I also think that short procedures should be avoided. Here’s the above example without procedure `h`:

program parameters(output);

var a, b, c, z: integer;

begin
    a := 0; b := 0; c := 0;
    y := y + 1
    z := x + 1 + y;
    writeln(z);
    writeln(x, y);
end.9 lines of code, versus 15 before. And it looks simpler too, doesn’t it? No need to look at the parameter declaration, or to consider which variable belongs where. So maybe procedures aren’t all they’re made out to be?

### Costs and benefits

Well, no, it’s not that simple. Procedures are an abstraction. Abstractions make it possible to write larger programs with a finite human brain, but they come at a cost of extra overhead. The shorter your procedures, the more of them you’ll need, and the more *abstraction overhead* (procedure declarations and calls) you’ll introduce. At some point, that’s actually going to make the code more difficult to read, and it’s up to you, the programmer, to find a happy medium that allows others to easily understand your code.

I do often find myself writing one-line or few-line procedures, but they’re usually actually abstraction overhead introduced by larger-scale abstractions like classes and modules. Not counting those, my normal range seems to be something like 5 to 20 lines, with an occasional stretch into the thirties or more.

What matters is not so much the number of lines, but whether everything within the procedure belongs together, and whether the whole thing is still comprehensible. Sometimes splitting up a longer list of instructions that fundamentally belong together will actually make the code harder to read.

This brings me back to what I said above about the number of parameters relative to the length of the procedure. A good procedure does something that can be described in a few words, all of which are in its name. If you need many words to say *what* it does, then you’re trying to cram too much in, and should split it up. If you need many words to say *how* it does it, and you find that that recipe naturally breaks up into several blocks, then make separate procedures for each block. If *what* it does can be expressed simply, and *how* it does it doesn’t split easily, then you have a nice procedure.

### Final words

Procedures are a useful way of breaking up all the things your program does into manageable chunks. They impose a hierarchical organisation on the functionality of your program, and hierarchies are powerful means of simplification. (Niklaus Wirth wrote a [famous paper about it](https://dl.acm.org/doi/pdf/10.1145/362575.362577), actually, which is why he and Pascal made an appearance here.) As pointed out by Jensen and Wirth however, there’s another essential part of any computer program: data. We’ll talk more about variables and records, values and objects in future posts.

← [TEC 1: Better scripts with typing](https://medium.com/escience-center/dynamic-types-static-types-oh-my-py-25c9743b72c4) — TEC 3: &lt;Stay tuned!&gt; →

[0] Modern languages don’t seem to have repeat..until loops anymore. I miss them sometimes.

[1] Here’s a Python version. As you can see, Pascal and Python use different symbols for things, and I’ve used a for-loop because Python doesn’t have repeat..until, but it looks pretty similar.

# inflation

N = 10
i = 0; w1 = 1.0; w2 = 1.0; w3 = 1.0
for i in range(1, N+1):
    w1 = w1 * 1.07
    w2 = w2 * 1.08
    w3 = w3 * 1.10
    print(i, w1, w2, w3)[2] I’m not naming names here…
