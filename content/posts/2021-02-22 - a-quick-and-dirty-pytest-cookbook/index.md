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

[Pytest](https://docs.pytest.org/en/stable/) has become the standard tool to test python code. In this post I will show you several tricks and hacks to create, configure and run your tests. without further ado, let’s eat the bugs!

![Drawing of a potted carnivorous plant with open, tooth-lined mouths and flies nearby.](/assets/1_H0EmQizVVc4_BG8gYWl1sw-66539f1c.jpeg)

Image by Chiara Caratelli

## Configuring Pytest

Since I don’t want to burden my users with testing dependencies, I usually put all the test and documentation dependencies in the [extra\_require](https://extras-require.readthedocs.io/en/latest/) section of th *e* ***setup.py*** file, like:

```python
extras_require={
 "test": ["coverage", "mypy", "pycodestyle", "pytest", "pytest-cov",
 "pytest-mock", "pytest-asyncio"]}
```

In this way, when I am developing code, I can install these testing dependencies like:

```sh
pip install -e .[test]
```

I also like to configure Pytest to automatically look for the tests folder and generate a coverage report. For doing so, I add the following lines in the [configuration *setup.cfg*](https://docs.python.org/3/distutils/configfile.html) file:

```ini
[tool:pytest]
testpaths = tests
addopts = --cov --cov-report xml --cov-report term --cov-report html
```

## Running the tests in GitHub actions

I use [GitHub actions](https://docs.github.com/en/actions/quickstart) to tests my Python code. The following snippet defines the commands that I use to install and run the Pytest dependencies:

```yaml
- name: Install the library
  run: |
    pip install -e .[test]
- name: Test
  run: |
    pytest --cov-config setup.cfg
- name: coverage
  uses: codecov/codecov-action@v1
  with:
    file: ./coverage.xml
    name: codecov-umbrella
```

The final action takes the automatically generated coverage and send it to [codecov](https://github.com/codecov/codecov-action). Pretty neat, right?

## Using a temporary folder

Sometimes you find yourself wanting to get a temporal folder to write output files from your server, simulation, etc. in order to check that things are going as expected. The following snippet shows you how to do so:

```python
from pathlib import Path
from mypackage import run_workflow

def test_check_files(tmp_path: Path) -> None:
    """Check that your code generate some files."""
    # call you package with a temporal folder
    run_workflow(tmp_path)

    # Check that the package produce the expected output
    result_json = tmp_path / "results.json"
    assert result_json.exists()
```

Notice that `tmp_path` is an argument provided automatically by Pytest. You just need to use it in your code.

## Mocking code

[Mocking functionality](https://mock.readthedocs.io/en/latest/) is a cool trick when you need to test expensive or complex code, like calling a web service.

Let’s suppose that I have a command line interface to interact with a web service and I will like to test its behavior. I would first mock the reading of the user’s arguments by [argparse](https://docs.python.org/3/library/argparse.html), then I would mock the expensive or complex functionality, like calling a web service. The following snippet shows how you can do so:

```python
import pytest
from pytest_mock import MockFixture
from mypackage import cli
import mypackage

def test_mock_argparse(mocker: MockFixture) -> None:
    """Mock argparse argument."""
    mocker.patch("argparse.ArgumentParser.parse_args", return_value=argparse.Namespace(
        command="login", token="SomeRandomToken", web="localhost:8080/graphql"))

   # Mock the call to the web service
   # the call_client function is call by cli
   mocker.patch("mypackage.client.call_client", return_value=None)

    # Call the Command line interface using the mocked arguments
    cli()

```

Notice that the `mocker` argument is automatically injected by Pytest. For more information check the [pytest-mock page](https://pypi.org/project/pytest-mock/).

## You can use multiple Pytest fixtures

A common pattern when testing is to mock part of the functionality, while writing some output to a file. For doing so, you use both a *mocker* object and a *temporal file*, like:

```python
import pytest
from pytest_mock import MockFixture
from pathlib import path
from mypackage import run_workflow
import mypackage


def test_mock_tmp(tmp_path: Path, mocker: MockFixture) -> None:
    """Mock some functionality while using a temporal folder."""
    mocker.patch("mypackage.workflows.call_client", return_value=None)
    run_workflow(tmp_path)

    expected_output = tmp_path / "expected.csv"

    assert expected_output.exists()

```

## Checking exceptions

Testing that an exception is raised helps to check that your code functionality behaves as expected, for example when the wrong arguments are passed or the user runs into a corner case. The following snippet allows you to test that behavior:

```python
import pytest
from mypackage import run_app

def test_check_exception():
    """Check that an exception is raised."""
    wrong_argument = "invalid_argument
    with pytest.raises(RuntimeError) as excinfo:
        run_app(wrong_argument)

    assert "is not a valid argument" in str(excinfo.value)
```

## Skipping tests

Sometimes is very useful to skip a test if a dependency is not present at runtime. Maybe the dependency takes a lot of time to install in the CI or it is a proprietary package that you cannot install easily. You can skip those tests with the following snippet:

```python
import pytest
from distutils.spawn import find_executable
from mypackage import run_workflow

def is_dependency_available(name: str) -> bool:
    """Check if a dependency is available."""
    path = find_executable(executable)
    return True if path is not None else False


@pytest.mark.skipif(
    not is_dependency_available("awesome"), reason="Dependency is not available")
def test_single_point(tmp_path: Path):
    """Check that the couplings run."""
    run_workflow(tmp_path)
```

## Running MyPy

I personally love to use [type hints](https://docs.python.org/3/library/typing.html) in my functions and methods. I use [mypy](http://mypy-lang.org/) to check that those types make sense. the following snippet presents the configuration that I use to call [mypy](http://mypy-lang.org/) on a package.

```python
"""Tests using mypy."""

import subprocess
import warnings
import pkg_resources as pkg
from typing_extensions import Literal

from .utils_test import PATH_CEIBACLI, PATH_TEST

PATH_PACKAGE = Path(pkg.resource_filename('mypackage', '')).absolute().as_posix()
# You need to add the mypy.ini file in your repo
PATH_TEST = PATH("Path / to /your / test/ folder")
INI = (PATH_TEST / 'mypy.ini').absolute().as_posix()
ACTION = frozenset(['raise', 'warn', 'ignore'])

def test_mypy(action: Action = 'warn') -> None:
    """Test using mypy."""
    if action not in ACTION:
        raise ValueError(f"Invalid value for the 'action' parameter: {action!r}")

    command = f"mypy {PACKAGE!r} --config-file {INI!r}"
    out = subprocess.run(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE, shell=True)

    stdout = out.stdout.decode()
    stderr = out.stderr.decode()
    assert not stderr, stderr

    if action == 'warn' and out.returncode != 0:
        warnings.warn(stdout)

    elif action == 'raise':
        try:
            assert out.returncode == 0, stdout
        except AssertionError as ex:
            msg = stdout.rsplit('\n', maxsplit=2)[1]
            raise AssertionError(msg) from ex
```

Notice that you need to define a [mypy.ini](https://mypy.readthedocs.io/en/stable/config_file.html) file somewhere in your repository ( I put that file inside the *tests* folder). I also prefer that the mypy raises some warnings if there are issues with the types instead of raising a (very annoying) error.

As an alternative to the above snippet, you can install and run the [pytest-mypy-plugins](https://pypi.org/project/pytest-mypy-plugins/).

## Testing the documentation

Testing the documentation is a must have. The following snippet shows how you can do so:

```python
import shutil
from os.path import join, isdir

from sphinx.application import Sphinx

SRCDIR = 'docs'
CONFDIR = SRCDIR
OUTDIR = join('tests', 'test_files', 'build')
DOCTREEDIR = join('tests', 'test_files', 'build', 'doctrees')


def test_sphinx_build() -> None:
    """Test :meth:`sphinx.application.Sphinx.build`."""
    try:
        app = Sphinx(SRCDIR, CONFDIR, OUTDIR, DOCTREEDIR,
                     buildername='html', warningiserror=True)
        app.build(force_all=True)
    finally:
        if isdir(OUTDIR):
            shutil.rmtree(OUTDIR)
```

## Testing async code

If you do web applications or something similar you probably have run into Python [asyncio](https://docs.python.org/3/library/asyncio.html). If you try to run async code using normal pytest code, chances are that you wouldn’t notice that there are no tests running at all. Async code is lazy and requires that you run it inside an async block*, otherwise nothing interesting happens. The following snippet shows how to invoke async code in Pytest:

```python
import pytes
from my_app import resolver_query

@pytest.mark.asyncio
async def test_query():
  """Check an async query."""
  query = await resolver_query(name = "constants")

  assert "pi" in query

```

For more details about testing asynchronous code in python check [pytest-asyncio](https://github.com/pytest-dev/pytest-asyncio).

## Running tests in parallel

If you, like me, have the tendency to procrastinate while waiting for the test suite to finish executing, then a good way to reduce the procrastination time is to run the tests in parallel.

For running your tests in parallel, you just need to install the [pytest-parallel](https://github.com/browsertron/pytest-parallel) library that not only allows you to run your tests in parallel but also in a thread-safe manner, using commands as simple as:

```sh
pytest --workers 2
```

## Running a test with multiple parameters

Imaging that you have a simulation that receives some parameters as input and gives you back some numerical output. You can use [pytest’s parametrize extension](https://docs.pytest.org/en/stable/parametrize.html) to feed one parameter at a time to the simulation and check that each one of them returns the expected output. The following snippet shows how to accomplish that:

```python
import pytest
import numpy as np

def run_simulation(parameter: str) -> float:
    """Do something amazing."""
    if parameter == "pi":
       return np.pi
    else:
       return 42

@pytest.mark.parametrize("parameter, expected",
                         [("pi", np.pi), ("exp", np.exp(1))])
def test_simulation(parameter: str, expected: float) -> None:
    """Check the simulation."""
    result = run_simulation(parameter)
    assert abs(result - expected) < 1e-8

```

If you run the previous snippet, you should see something like:

```text
pytest -v test_parameters.py
test_parameters.py::test_simulation[pi-3.141592653589793] PASSED                                      
test_parameters.py::test_simulation[exp-2.718281828459045] FAILED

parameter = 'exp', expected = 2.718281828459045

@pytest.mark.parametrize("parameter, expected",
                         [("pi", np.pi), ("exp", np.exp(1))])
    def test_simulation(parameter: str, expected: float) -> None:
        """Check the simulation."""
        result = run_simulation(parameter)
>       assert abs(result - expected) < 1e-8
E       assert 39.28171817154095 < 1e-08
E        +  where 39.28171817154095 = abs((42 - 2.718281828459045))

test_parameter.py:16: AssertionError
```

## Conclusions

Pytest is a flexible tool with a great number of useful extensions. With Pytest, there is always a way to check your code functionality, even those annoying corner cases.

Please comment if you find these tricks useful or if you find another nice trick that you want to share.

## Acknowledgement

My special gratitude to Bas van Beek to share with me some of his useful recipes. I would like also to thank [Florian Huber] and Stefan Verhoeven for their feedback.

Thanks to [Pablo Rodríguez-Sánchez] and Steven Roldan for their help editing the text.
