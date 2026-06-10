---
layout: post
title: "Tackling Advent of Code"
date: 2024-12-03
author: eScience Editorial Team
published: true
source: medium
source_url: https://blog.esciencecenter.nl/tackling-advent-of-code-8d4fb719e2b7
tags:
  - uncategorized

---

By [Ewan Cahen](https://www.esciencecenter.nl/team/ewan-cahen/)

[*Advent of Code 2024*](https://adventofcode.com/2024)* has started this week! If you are not familiar with Advent of Code, it’s an annual coding challenge created by Eric Wastl. It’s like an *[*advent calendar*](https://en.wikipedia.org/wiki/Advent_calendar)* for coding challenges containing 25 daily programming puzzles, released once a day between December 1–25. You can still join this year’s edition, and even join our Dutch research community leaderboard when you sign up *[*here*](https://forms.office.com/e/fr8wAeNRin)*.*

![Tackling Advent of Code](/assets/tackling-advent-of-code-b3260b36.jpg)
Photo by [Markus Spiske](https://unsplash.com/@markusspiske?utm_source=medium&amp;utm_medium=referral) on [Unsplash](https://unsplash.com/?utm_source=medium&amp;utm_medium=referral)Whether you’re new to Advent of Code or if you want to brush up on your programming skills, below you can find a list of useful tricks, data structures and algorithms that are often needed when solving the challenges. Some of these are accompanied with links on how to use them in a few popular programming languages.

Note, the list is rather large. We recommend only picking a few items where you think your knowledge is lacking.

### Parsing the input**

In almost every exercise, you are given input, presented as plain text, that you have to parse (i.e. transform it into some structure that is useful for solving the problem). There are a few techniques you can use to accomplish this:

* read the input line by line into a list ([Python](https://www.w3schools.com/python/ref_file_readlines.asp),[ R](https://www.statology.org/readlines-in-r/),[ Java](https://medium.com/@AlexanderObregon/javas-files-readalllines-method-explained-14312314c1c4))
* split a string, useful if data is delimited by e.g. whitespace or a comma ([Python](https://www.w3schools.com/python/ref_string_split.asp),[ R](https://builtin.com/articles/strsplit),[ Java](https://www.w3schools.com/java/ref_string_split.asp))
* parsing a string to an integer ([Python](https://www.w3schools.com/python/ref_func_int.asp),[ R](https://stat.ethz.ch/R-manual/R-devel/library/base/html/strtoi.html),[ Java](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/Integer.html#parseInt(java.lang.String)))
* (Java only) use [Java’s Scanner](https://www.w3schools.com/java/java_user_input.asp) to easily parse various types of data
* (advanced) use regular expressions to parse the input ([Python](https://www.w3schools.com/python/python_regex.asp),[ R](https://www.datacamp.com/tutorial/regex-r-regular-expressions-guide),[ Java](https://www.w3schools.com/java/java_regex.asp))

![Tackling Advent of Code](/assets/tackling-advent-of-code-f19971cc.jpg)
Photo by [Chris Liverani](https://unsplash.com/@chrisliverani?utm_source=medium&amp;utm_medium=referral) on [Unsplash](https://unsplash.com/?utm_source=medium&amp;utm_medium=referral)

### Integer division and modular arithmetic

In Advent of Code, you’ll often have to use integer division (where e.g. `11 / 4 = 2` instead of `2.75`). For Python, have a look at the [double slash operator](https://www.learndatasci.com/solutions/python-double-slash-operator-floor-division/) (`//`) and for R use `%/%` (see [R operators](https://cran.r-project.org/doc/manuals/r-release/R-lang.html#Operators)).

You’ll also have to use modular arithmetic, where you want to know the remainder after integer division (e.g. `11 % 4 = 3`, because 4 fits 2 times into 11 and then you have 3 remaining). You’ll use these when, for example, you have to “wrap around” an array, i.e., when you reach the end of an array, you have to return to the start of the array. For Python, use the[ modulo operator](https://realpython.com/python-modulo-operator/) `%`, for R use `[%%](https://www.datacamp.com/doc/r/operators)` and for Java use`[%](https://www.baeldung.com/modulo-java)`. Also look up how your language behaves when any of the numbers is negative.

### Working with large integers

Sometimes, you need to handle large integers (especially when multiplying numbers). In some languages, where there are several integer types of several sizes, you need to prevent[ integer overflow](https://www.acunetix.com/blog/web-security-zone/what-is-integer-overflow/). This is sometimes a problem when working with [32 bit integers](https://en.wikipedia.org/wiki/32-bit_computing). Usually, using 64 bit integers (keyword: `long`) is sufficient for Advent of Code. In Python, this is [not needed](https://docs.python.org/3/c-api/long.html#integer-objects), as it supports arbitrary large integers. For R, have a look at [this package](https://www.stats.bris.ac.uk/R/web/packages/bit64/index.html) for 64 bit integers. For Java, use the[ long type](https://www.w3schools.com/java/java_data_types.asp) or, if that is not sufficient, use the [BigInteger](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/math/BigInteger.html) class.

![Tackling Advent of Code](/assets/tackling-advent-of-code-72c97208.jpg)
Photo by [Joshua Sortino](https://unsplash.com/@sortino?utm_source=medium&amp;utm_medium=referral) on [Unsplash](https://unsplash.com/?utm_source=medium&amp;utm_medium=referral)

### Data structures

Using the right data structure is crucial to solving the problems. These are the most commonly used ones:

* [array](https://www.w3schools.com/dsa/dsa_data_arrays.php): An array is a fixed-size, ordered data structure, consisting of multiple entries of the same type in a row. You can save and retrieve data in an array by using an index (usually a number from `0` to `n — 1` (inclusive) if the array has length n. While Python’s standard library doesn’t have built-in arrays, the [NumPy](https://numpy.org/) library provides a powerful array implementation that’s widely considered a de-facto standard for numerical computing in Python. In R, one-dimensional arrays are referred to as vectors, and are indexed starting from `1` (so you can index a number from `1 to n`). Used when storing data without further requirements or when the order of the data is important. ([R](https://www.w3schools.com/r/r_arrays.asp),[ Java](https://www.w3schools.com/java/java_arrays.asp))
* list (vector): A data structure that stores multiple entries of (usually) the same type in a row, with dynamic size that grows automatically as needed. While lists offer flexibility, arrays generally provide better performance due to their fixed size and contiguous memory allocation. Arrays are particularly advantageous in Python when using NumPy, as they enable efficient vectorized operations that can significantly speed up numerical computations. Choose arrays when performance and vectorization are priorities, and lists when frequent size changes are required. ([Python](https://www.w3schools.com/python/python_lists.asp),[ R](https://www.w3schools.com/r/r_lists.asp),[ Java](https://www.w3schools.com/java/java_arraylist.asp))
* [dictionary/(hash)map](https://www.w3schools.com/dsa/dsa_data_hashmaps.php): A data structure that stores key-value pairs. If you want to store/retrieve data by something more complex than an index (as with arrays and lists), like a string, this is the data structure to use. While R does not technically have a dictionary data structure, you can often use a named vector as a quick-and-dirty replacement ([Python](https://www.w3schools.com/python/python_dictionaries.asp),[ R](https://chryswoods.com/beginning_r/dictionaries.html),[ Java](https://www.w3schools.com/java/java_hashmap.asp))
* [(hash)set](https://www.w3schools.com/dsa/dsa_data_hashsets.php): An unordered data structure that cannot contain duplicates of an element. Useful when you often need to check if some element is present in a data structure (often used in graph traversal algorithms, see below). ([Python](https://www.w3schools.com/python/python_sets.asp), R has external libraries, such as [r2r](https://cran.r-project.org/web/packages/r2r/index.html),[ Java](https://www.w3schools.com/java/java_hashset.asp))
* [queue](https://www.w3schools.com/dsa/dsa_data_queues.php): A first in, first out (FIFO) data structure where elements are added to the end and removed from the front. While Python lists can be used as queues, this is inefficient due to their underlying array implementation — removing from the front requires shifting all remaining elements. For better performance, use Python’s `collections.deque` which is optimized for both front and back operations. Lists are better suited as stacks (last in, first out). Queues are commonly used in breadth-first search algorithms in graphs (see section on graphs below). (for[ Python](https://www.w3schools.com/python/python_lists.asp) and[ R](https://www.w3schools.com/r/r_lists.asp), you can use the list as a queue, or you can use [Python’s deque](https://realpython.com/python-deque/),[ Java](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/Queue.html))
* [stack](https://www.w3schools.com/dsa/dsa_data_stacks.php): A last* in, first out data structure, meaning you can add and/or remove elements to the front of the stack only. Used in *depth-first search* algorithms (see below). (see queue for Python and R,[ Java](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/Deque.html))
* (advanced) [priority queue/heap](https://www.programiz.com/dsa/priority-queue): Similar to a queue, except that the elements in the queue have a *priority*, and the element with the highest priority will always be served first when retrieving/removing an element, independent of the order in which the elements where added. Used in Dijkstra’s algorithm (see below). ([Python](https://www.geeksforgeeks.org/heap-queue-or-heapq-in-python/), look for external packages for R,[ Java](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/PriorityQueue.html))

### Algorithms

Many problems can be solved with (a variation of) a well known algorithm. Below are listed some commonly needed algorithms for Advent of Code. This is by no means an exhaustive list. Furthermore, you are encouraged to do more research on these algorithms.

* sorting an array/list: You don’t have to implement your own sorting algorithm, but you have to know how to call the built-in sorting functionality of your language, sometimes using a custom sort function/comparator. ([Python](https://www.w3schools.com/python/python_lists_sort.asp),[ R](https://r-coder.com/sort-r/),[ Java arrays](https://www.w3schools.com/java/ref_arrays_sort.asp),[ Java lists](https://www.w3schools.com/java/java_sort_list.asp))
* [breadth-first search](https://en.wikipedia.org/wiki/Breadth-first_search): An algorithm for finding a node in a graph with a certain property. Used for example when looking for the shortest path between two nodes in a graph, when all edge weights have the same value. This uses a queue.
* [depth-first search](https://en.wikipedia.org/wiki/Depth-first_search): An algorithm for finding a node in a graph with a certain property. Used for example when the node(s) you’re looking for in a graph are far away from the starting point. This uses a stack.
* [Dijkstra’s algorithm](https://www.w3schools.com/dsa/dsa_algo_graphs_dijkstra.php): An algorithm for finding a shortest path from a fixed starting point to every other node in a graph, when the edge costs have varying values.
* [memoization](https://www.w3schools.com/dsa/dsa_ref_memoization.php): Not an algorithm, but rather a technique, in which you store (cache) intermediate results so that you don’t have to recompute these over and over again. These intermediate results are usually stored in a dictionary/(hash)map.

## ❄️ Closing words ❄️

I hope this overview is useful to you. I’m not that well-versed in the Python or R ecosystem, so if you know of better resources or techniques on any of the topics presented, please let me know.

Is your favourite technique/algorithm/programming language missing? Feel free to add it below!

Good luck this year!

*Thanks to Raoul Schram and Bj*ø*rn Bartholdy for comments*
