---
layout: post
title: "A Quick and Dirty Pytest Cookbook"
author: Felipe
published: true
source: medium
source_url: https://blog.esciencecenter.nl/a-quick-and-dirty-pytest-cookbook-58051a2980c3
tags:
  - Git
  - Parallel Computing
  - Python
  - Testing
---

Subscribe*Remember me for faster sign in

As an alternative to the above snippet, you can install and run the [pytest-mypy-plugins](https://pypi.org/project/pytest-mypy-plugins/).

## Testing the documentation

Testing the documentation is a must have. The following snippet shows how you can do so:

## Testing async code

If you do web applications or something similar you probably have run into Python [asyncio](https://docs.python.org/3/library/asyncio.html). If you try to run async code using normal pytest code, chances are that you wouldn’t notice that there are no tests running at all. Async code is lazy and requires that you run it inside an async block*, otherwise nothing interesting happens. The following snippet shows how to invoke async code in Pytest:

For more details about testing asynchronous code in python check [pytest-asyncio](https://github.com/pytest-dev/pytest-asyncio).

## Running tests in parallel

If you, like me, have the tendency to procrastinate while waiting for the test suite to finish executing, then a good way to reduce the procrastination time is to run the tests in parallel.

For running your tests in parallel, you just need to install the [pytest-parallel](https://github.com/browsertron/pytest-parallel) library that not only allows you to run your tests in parallel but also in a thread-safe manner, using commands as simple as:

pytest --workers 2

## Running a test with multiple parameters

Imaging that you have a simulation that receives some parameters as input and gives you back some numerical output. You can use [pytest’s parametrize extension](https://docs.pytest.org/en/stable/parametrize.html) to feed one parameter at a time to the simulation and check that each one of them returns the expected output. The following snippet shows how to accomplish that:

If you run the previous snippet, you should see something like:

pytest -v test_parameters.py
test_parameters.py::test_simulation[pi-3.141592653589793] PASSED                                      
test_parameters.py::test_simulation[exp-2.718281828459045] FAILEDparameter = 'exp', expected = 2.718281828459045[@pytest](http://twitter.com/pytest).mark.parametrize("parameter, expected", 
                         [("pi", np.pi), ("exp", np.exp(1))])
    def test_simulation(parameter: str, expected: float) -&gt; None:
        """Check the simulation."""
        result = run_simulation(parameter)
&gt;       assert abs(result - expected) &lt; 1e-8
E       assert 39.28171817154095 &lt; 1e-08
E        +  where 39.28171817154095 = abs((42 - 2.718281828459045))test_parameter.py:16: AssertionError

## Conclusions

Pytest is a flexible tool with a great number of useful extensions. With Pytest, there is always a way to check your code functionality, even those annoying corner cases.

Please comment if you find these tricks useful or if you find another nice trick that you want to share.

## Acknowledgement

My special gratitude to Bas van Beek to share with me some of his useful recipes. I would like also to thank [Florian Huber] and Stefan Verhoeven for their feedback.

Thanks to [Pablo Rodríguez-Sánchez] and Steven Roldan for their help editing the text.
