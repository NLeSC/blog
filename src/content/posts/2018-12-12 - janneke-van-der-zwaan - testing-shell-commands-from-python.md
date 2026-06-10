---
title: "Testing shell commands from Python"
date: 2018-12-12
author: Janneke van der Zwaan
published: true
source: medium
tags:
  - uncategorized
---

[image]

What to do with these shells?

How do you test shell commands? Recently, I came across several cases where I wanted to run shell commands for testing, but couldn’t find a tutorial about how to do it from Python. After a lot of Googling, I found a solution that worked for me, and maybe it works for you too!

### Why test from Python?

You could use [dedicated tools](https://spin.atomicobject.com/2016/01/11/command-line-interface-testing-tools/) to test shell commands. Why choose Python over those? If you are working on a Python package, it makes sense to use Python, because Python already includes robust test functionality that is easy to integrate with other tools. Testing shell commands from Python allows you to harness those facilities and prevents you from having to keep track of tests in different places. Plus, if you are already familiar with writing tests in Python, writing tests for shell commands becomes a breeze.

### Use cases

For the [Netherlands eScience Center Python package template](https://github.com/NLeSC/python-template), I wanted tests to verify that the generated package can be installed, that the tests can be run, and that the documentation can be generated without errors. My Python text processing package [nlppln](https://github.com/nlppln/nlppln) contains [CWL](https://www.commonwl.org/) specifications of text mining tools, that can be validated by running them using a command line tool called `cwltool`. Another use case would be testing your package’s [console scripts](https://python-packaging.readthedocs.io/en/latest/command-line-scripts.html) (although in this case it might be more convenient to use a package for creating command line interfaces that comes with built-in testing functionality, such as [Click](http://click.pocoo.org/)).

### The sh package

You can run shell commands from Python using the [subprocess](https://docs.python.org/3/library/subprocess.html) module from the Python standard library. However, using this module is a hassle, because you have to do all the error handling yourself. [Sh](https://amoffat.github.io/sh/) is a Python package that takes care of all that and allows you to run shell commands using a single line of code. If you want to run `python setup.py install`, all you have to do is:

```hs
import shsh.python(['setup.py', 'install'])
```

If you want to run `foo` and it is installed on your system, you can just do `sh.foo()`.

### Writing a test

So how can we use this for testing? Let’s look at an example. For the Python template, I want to test whether a project generated from the [cookiecutter](https://github.com/audreyr/cookiecutter) template can be installed without errors. The goal of the template is to help users write high quality code with less effort, and having an installable empty project is a good first step. The code for the [test that tests the installation](https://github.com/NLeSC/python-template/blob/90273feba08376faea12cd154479ba64fbccf81d/tests/test_project.py#L15) is:

```hs
import pytest
import os
import shdef test_install(cookies):
  # generate a temporary project using the cookiecutter
  # cookies fixture
  project = cookies.bake()                                                    # remember the directory where tests should be run from
  cwd = os.getcwd()
  # change directories to the generated project directory 
  # (the installation command must be run from here)
  os.chdir(str(project.project))  try:
    # run the shell command
    sh.python(['setup.py', 'install'])
  except sh.ErrorReturnCode as e:
    # print the error, so we know what went wrong
    print(e)
    # make sure the test fails
    pytest.fail(e)
  finally:
    # always change directories to the test directory
    os.chdir(cwd)
```

That is all there is to it!

### More examples

Of course there is a lot more you can do, e.g., [checking whether files exist](https://github.com/NLeSC/python-template/blob/90273feba08376faea12cd154479ba64fbccf81d/tests/test_project.py#L66) after running a shell command, or [verifying the contents of generated files](https://github.com/nlppln/nlppln/blob/67bdee66f2ca3f2f15d6764235de619942e148a0/tests/test_prettify_xml.py#L38). What use cases can you come up with?

### On Windows: use subprocess

[Sh does not work on Windows](https://amoffat.github.io/sh/sections/faq.html?highlight=windows#will-windows-be-supported). If you need to test shell commands on Windows, you are stuck with [subprocess](https://docs.python.org/3/library/subprocess.html). Provenance tracking package [recipy](https://github.com/recipy/recipy) contains some nice examples of [tests using subprocess](https://github.com/recipy/recipy/blob/c877026602372d85e83b058e833d86e3e407d990/integration_test/test_recipy.py#L93) that might help you on your way.