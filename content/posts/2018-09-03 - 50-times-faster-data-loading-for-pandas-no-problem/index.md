---
layout: post
title: "50 times faster data loading for pandas no problem"
author: Patrick Bos
published: true
source: medium
tags:
  - C++
  - Data Science
  - Git
  - NumPy
  - Pandas
  - Performance
---

## Loading irregular data into Pandas using C++

![](./1__VtPjK42c2ZgoCVQPR2Hbw-eb27275d.jpeg)

Irregular pandas

If [Python is the reigning king of data science](https://twitter.com/egpbos/status/1034709099945054208), Pandas is the kingdom’s bureaucracy. [As recognized by Pandas creator Wes McKinney himself](http://wesmckinney.com/blog/apache-arrow-pandas-internals/), it is slow, heavy and using it can be dreadful… But it fulfills many dire needs and the country would collapse without it.

Especially when your data source is slightly non-standard (and, in science, that’s almost every source) loading your data **fast** can be a great struggle. In this post I’ll share two methods for making Pandas faster when loading irregular data:

1. From within Python itself
2. By whipping up your own C++ Python module **in less time than it would take Pandas to load the data**.

## Pandas: so pretty, but so slow

![](./1_alCOYhk4upBAls2ne9vLOA-1ede877d.jpeg)

Data is my middle name

The “slow and heavy” mostly goes for **idiomatic** Pandas, or at least what I would expect to be idiomatic, i.e. using the package’s built-in features.

For instance, say I have a simple dataframe: one column has words, another has counts (of those words in a set of documents). The table could look something like this:

```rb
the           1028012
and            128102
what            38012
whoops          12800
scallywag   100000001
```

However, there’s an artifact in the counts: some of them had an artificial frequency of 100000000 added to them. We want to get rid of this artifact, so for the numbers higher than 100000000 we subtract 100000000. I would say idiomatic Python/Pandas would be to use a one-liner using `apply`:

```rb
# THIS IS SOOOO SLOOOOW!
df2 = df.apply(lambda x: (x.word, x.counts-100000000 if x.counts>=100000000 else x.counts),
               axis=1,
               broadcast=True)
```

I love compact one-liners, it’s one of the reasons I love using Python. This one is, however, slower than watching paint dry. The following is orders of magnitude quicker:

```rb
# better:
df2 = df[['word', 'counts']].copy()
df2.loc[websites.clean_no_artifrq['counts'] >= 100000000, 'counts'] -= 100000000
```

This makes use of the fact that Pandas columns are actually NumPy arrays.

### NumPy ❤

Now, if Pandas is bureaucracy, NumPy is like iron, or plastics, or wheels, or roads, or computers, or the internet… It’s a great piece of technology that makes the whole Python world run more efficiently.

However, it is really its own sub-language, and it has its own idiomatic uses.  
It is a language for vectorized numerical mathematics. It beautifully expresses mathematical operations on arrays of numbers in a way that comes very close to the expressiveness of mathematics used to model scientific problems in many fields, especially natural sciences and engineering. For computational scientists in such fields, loops are mental overhead. Vector/matrix/tensor operations clear this overhead.

I am happy to use this language when I’m working with raw numerical data, but it annoys me to no end that I have to resort to using it when working with Pandas. I do not want to have to build my own roads in order to make the bureaucracy work more smoothly…

Also, it is not the language I expect of a tabular data handling tool. Why should it make sense that column-wise operations are orders of magnitude faster than row-wise operations? It’s a table, it should work either way.

Nevertheless, even though it pains my soul, it seems that in order to get some performance and still use the Pandas ecosystem (which has a lot of great features), we must often work around Pandas’ limitations by applying NumPy logic, rather than being able to constantly stay in a tabular mindset.

However, if we’re going to get out of the Pandas mindset anyway, we could go one step further. If we’re going to build our own roads, why not go for high speed train connections instead?

## Loading irregular data into Pandas

![](./1_gQlglop8uC1KVY9WN-ZfbA-06a24d5e.jpeg)

Pandas ingesting messy data

The problem I want to discuss here was one I ran into while working on the [TICCLAT project](https://www.esciencecenter.nl/project/ticclat) using the [TICCL spelling / OCR correction tool](https://github.com/LanguageMachines/PICCL). I wanted to load the following type of text file into Pandas:

```rb
1190068#67676465299
1391727#85478414561,86121676092,86741116243,88625929516,89990773818
1638659#71938173924,72490106635,72511962205,
1806002#105558929611,106429736524,120455253831
```

Without going into too much detail, the longer numbers represent words in a text and the short ones at the front represent possible errors (e.g. an **o** that should have been an **e**). Essentially this is a key-value store: the keys are the first integers, then comes a `#` separator, and the corresponding value is a list of integers separated by commas. The list lengths range between one and hundreds of integer numbers and are completely irregular.

One could naively load the file as a key value table, for instance like this:

```rb
df = pd.read_csv('filename.txt',
                 names=['key', 'value'],
                 sep='#',
                 index_col=0, # we can use the key as index
                 converters={'value':
                             lambda w: tuple(w.split(','))})
```

However, I wanted to load it in a way that I could do efficient statistics with it. Doing statistics on an array of lists is again horribly slow.

Transforming it to a regular table seems like a good bet, because then we can again make use of the magic (and speed) of NumPy. This can be done by transforming `df` as follows:

```rb
df = df['key'].apply(pd.Series, 1).stack().to_frame()
df.index.rename(["key", "list_index"], inplace=True)
df.rename({0: 'value'}, axis='columns', inplace=True)
```

This works, albeit slowly. Just loading a 23MB file took over 3 minutes on my laptop. When I encountered a file of 1.8GB that was structured this way, it was time to bring out the big guns. Not only because it would take at least 4 hours to load (probably more, I don’t expect this to scale linearly), but also because it might need too much RAM. Pandas is not known for its efficient use of memory and in this case it can hardly be blamed, because loading irregular data makes it hard to predict what resources are necessary, making dynamic allocation necessary. That means copying data around the memory banks, which will slow things down a lot.

## Building a Python C++ module in under 10 minutes

![](./1_jjXJIgBEdZ6RPApXojBX5Q-313e9b21.jpeg)

Ok, let’s say 15 minutes…

… I guess if you don’t know any C++ it may take a bit longer, but not that much. Just start out with programming like you would in Python, but declare variables with types, put semicolons at the end of lines, put loop and branching conditions in parentheses, put curly braces around indented blocks and forget about the colons that start Python indented blocks… that should get you about 80% of the way there. Oh and avoid pointers for the time being. Oh and use references whenever possible. They’re kinda like pointers but… Well maybe avoid those as well for now.

*Anyway*, let’s see how to get this done in 10 minutes.

### Setup the environment

The requirements are to have [Miniconda](https://conda.io/miniconda.html) installed and to create a `conda` virtual environment with the `xtensor-python` Python bindings for the C++ [xtensor](http://quantstack.net/xtensor) package:

```rb
conda create -n build_a_python_cpp_module xtensor-python -c conda-forge
```

Activate the environment to run the commands in the rest of this article:

```rb
source activate build_a_python_cpp_module
```

You could also install a C++ compiler in this environment using `conda`, but you probably already have one of those.

### Start your project with Cookiecutter

![](./1_1Ur9MmksUtYJHs_EbtxIqg-cee5f8b8.png)

We then start out our new Python module project with the `xtensor-python` [Cookiecutter](https://cookiecutter.readthedocs.io/en/latest/) template (see [my colleague’s blog post]( for a great Python project template). Install Cookiecutter with `pip` (if you don’t have it yet) and begin your project:

```rb
pip install cookiecutter
cookiecutter https://github.com/QuantStack/xtensor-python-cookiecutter.git
```

Cookiecutter will now ask you some questions about your project, like its name, your name, etcetera. The answers will be used to generate the project’s initial files and even some initial documentation.

After this, you’ll have a directory named after your project, containing all the files you need to build and install your C++ Python module.

The file you’ll want to look at first is `src/main.cpp`. This contains a number of example functions and the boilerplate of converting them into Python module functions.

### Loading irregular data into Pandas… via C++

In our case, we want to build an efficient way of loading our irregular key-value file. Since Pandas columns are in fact NumPy arrays, we’re going to use C++ to fill up the necessary NumPy arrays. Once that is done, we can easily convert those to a Pandas dataframe in Python itself. This way we optimized the most costly part of loading the data and still keep the C++ to a minimum (also, I have no idea how to load it directly into a Pandas dataframe from C++, but never mind that).

So we will need to build three arrays of unsigned integers: two with 32 bit integers (the keys and the list\_indices) and one with 64 bit integers (the list values). As the Cookiecutter template examples show, NumPy arrays can be defined using the `pyarray` class.

To avoid costly resizing of our arrays, it would be nice if we can calculate the total size we will need for these three arrays. Luckily, we can do that by realizing that every list value will generate a row in the table. The easiest way I can think of to do this is to count all the commas and new-lines in the file, for instance like this:

```rb
std::ifstream file("filename.txt");
char c;
std::size_t array_size = 0;
while(file.get(c)) {
 if (c == ',' || c == '\n') {
   ++array_size;
 }
}
```

This scans the entire file, which we’ll have to do again to read the actual numbers, so this is costly in terms of disk I/O. Almost certainly, resizing arrays dynamically many times while reading the file only once would be far more costly, so it is worth it.

Now that we know the sizes of the arrays we need, we can generate them:

```rb
auto first_array = xt::pyarray<unsigned>::from_shape({array_size});
// ... etc
```

Then we start going through the file, reading in the numbers and separators and putting them in our arrays as we go. You’ll find [a finished example on GitHub](https://github.com/TICCLAT/ticcl-output-reader) which I’m using in the [TICCLAT project](https://www.esciencecenter.nl/project/ticclat).

Finally, compiling and installing happens from the command line using setup.py:

```rb
python setup.py install
```

Or you can use `pip`, as I found out by reading the `README.md` … that Cookiecutter automatically generated for me!

```rb
pip install .
```

Now, inside your virtual environment, you can start your Python session, import your freshly baked module and start crunching numbers at maximum speed.

[The function in the example on GitHub](https://github.com/TICCLAT/ticcl-output-reader/blob/8d2d5886be48c3e9ad401e49c6a48e497b359f1b/src/main.cpp#L22) returns a tuple of three arrays. In Python, you can directly convert these into a Pandas dataframe:

```rb
cpp_arrays = my_module.fast_reader("filename.txt")
df = pd.DataFrame.from_records(
       {"key": cpp_arrays[0],
        "list_index": cpp_arrays[1],
        "value": cpp_arrays[2]},
       index=["key", "list_index"])
```

The result looks exactly like the dataframe loaded using the Pandas example above. The only difference is that it loads over 50 times as fast.

So there you have it. Perhaps this wasn’t really 10 minutes of work, I actually spent two hours creating and debugging the entire thing, but that’s still less than the four hours I’d have to wait on Pandas to load the data, and I will now save hours of loading time in the future. I even had time to spare to write this blog post (well, a first version at least)!

An added bonus of this setup I didn’t even touch upon is that the C++ `pyarray` objects are actually `xtensor` arrays. These [can be used the same way as NumPy arrays](https://xtensor.readthedocs.io/en/latest/numpy.html), with essentially the same syntax, but a lot faster. Moreover, there are Julia and R bindings that should work just as easy as the Python bindings I used here. In fact, the function I wrote for this module could be directly reused in packages for R and Julia. Pretty cool!

## C++: don’t be scared!

![](./1_XQ0EU5XYtzGfXcycU8ZdGQ-b41233ff.jpeg)

Learning a bit of C++ has big advantages.

Maximum performance is the obvious one. You’ll get this not just by whipping up your own libraries or number crunching extensions, but also by making use of the ecosystem of high performance C++ libraries already out there.

The other big advantage is that it is the language on which most of our high performance data science (Python, R, Julia) modules are (or should be) based. If you want to add to that ecosystem, C++ will be your best bet.

Yes, C++ can be pretty tough to debug, but it has a huge community to lend you a hand when you get stuck. And in fact, a current trend in the C++ world is that more and more user friendly libraries are popping up.

Already, dataframe solutions for C++ are being worked on. The xtensor universe has [xframe](https://github.com/QuantStack/xframe). The ROOT particle physics analysis suite from CERN has [RDataFrame](https://root.cern/doc/master/classROOT_1_1RDataFrame.html). We can even do interactive C++ now with [cling](https://root.cern.ch/cling), also [from a Jupyter notebook (try it!)](http://jupyter.org/try). Perhaps one day soon, we won’t have to choose between user friendliness and performance any more.
