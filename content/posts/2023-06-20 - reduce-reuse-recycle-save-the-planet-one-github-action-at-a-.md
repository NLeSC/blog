---
layout: post
title: "Reduce, reuse, recycle: save the planet one GitHub action at a time"
author: Stef Smeets
published: true
source: medium
source_url: https://blog.esciencecenter.nl/reduce-reuse-recycle-save-the-planet-one-github-action-at-a-time-4ab602255c3f
tags:
  - Climate
  - Environment
  - Git
  - Machine Learning
  - Python
  - RSE
---

**

# Reduce, reuse, recycle: save the planet one GitHub action at a time

53


Written by [Stef Smeets](https://medium.com/@stefsmeets) and [Sander van Rijn](https://medium.com/@s.vanrijn).

Photo by [Ralph (Ravi) Kayden](https://unsplash.com/@ralphkayden?utm_source=medium&amp;utm_medium=referral) on [Unsplash](https://unsplash.com/?utm_source=medium&amp;utm_medium=referral)Ask any environmentalist what you can do to help combat climate change and protect the environment, and they will tell you to ["Reduce, Reuse, Recycle."](https://en.wikipedia.org/wiki/Waste_hierarchy) These actions are focused on maximizing practical benefit while minimizing the cost to the environment through conservation of resources and preventing the emission of greenhouse gases.

As software engineers, we are big fans of integration and continuous delivery (CI/CD) workflows as part of sustainable software development. GitHub actions is [completely free for public repositories](https://docs.github.com/en/billing/managing-billing-for-github-actions/about-billing-for-github-actions#about-billing-for-github-actions), so why wouldn't we? We use it for everything, from code analysis and linting, running tests and builds in isolated environments, generating documentation on [readthedocs](https://docs.readthedocs.io/en/stable/integrations.html), and publishing packages on [PyPI](https://github.com/marketplace/actions/pypi-publish).

Until all of our power comes from nuclear fusion, and data centers can be made of trees, running any code will have an environmental impact: CO2 and other emissions from the power used and the production of the computers it runs on. Not writing code won't solve our problems either, so we need to find places in our workflow where we can reduce our impact.

Many CI/CD systems are configured to run automatically, often out of sight, so their impact to the planet adds up quickly. We have been asking ourselves some questions, like what we can do to make our use of CI/CD more sustainable.

* Do we need to build the documentation for every commit we make to the code?
* Do we need to test on every version of Python on all platforms to ensure code works?
* Do we need to run all our machine learning notebooks on every push?
* When we fix a typo in our documentation, do we need to run a complete suite of regression tests?
* When we fix a bug, can we get away just re-running the failed tests?

In this blogpost we share what we have learned and give some ideas about what you can do to reduce your impact using [GitHub Actions](https://docs.github.com/en/actions).

## Why bother?

Data centers need large amounts of energy, from running servers, computing hardware, and refrigerating equipment. And, let's not forget that the production of servers, cables and supporting equipment, and mining of the required raw materials also contribute.

According to the [IEA](https://www.iea.org/reports/data-centres-and-data-transmission-networks), all data centers and data transmission networks account for 2–3% of global electricity use. This corresponds to 300 Mt [CO2-eq](https://en.wikipedia.org/wiki/Global_warming_potential#Carbon_dioxide_equivalent) in 2020 (0.9% energy related greenhouse gas emissions). The costs for the environment are enormous. Although improvements in efficiency and hyperscale data centers help limit the growth in energy demands somewhat, the demand for data workloads and internet traffic still grows every year.

GitHub (this blog is about GitHub Actions after all!) claims to be [committed to environmental sustainability](https://github.blog/2021-04-22-environmental-sustainability-github/). A noble effort, but its parent company Microsoft increased its CO2 emissions by [nearly 15% from 2020 to 2022](https://aka.ms/SustainabilityReport2022). Most companies who claim to achieve 'net zero' do so not by reducing their emissions, but by compensating elsewhere. Microsoft compensated only about 10% of their emissions in 2022. This is typically done through [buying certified green energy](https://en.wikipedia.org/wiki/Guarantee_of_origin), [CO2 compensation](https://en.wikipedia.org/wiki/Carbon_offsets_and_credits), or [emission trading](https://en.wikipedia.org/wiki/Emissions_trading). This allows companies to be green on paper by trading certificates, with little direct effect on their business operations. Such climate certificates are often sold on a promise, like planting trees or saving a forest from clearing. Better than nothing, but it’s even better to not have those emissions in the first place.

Photo by [Etienne Girardet](https://unsplash.com/@etiennegirardet?utm_source=medium&amp;utm_medium=referral) on [Unsplash](https://unsplash.com/?utm_source=medium&amp;utm_medium=referral).

## Reduce

So, what can we do?

The best thing we can do is prevent resource usage by reducing the number of times we trigger the CI/CD workflows.

### Restrict branch and event type

Many of us have configured our CI to run whenever a commit is pushed to a pull request (PR). While this gives great peace of mind to see that our tests pass, we can't help but wonder if this is really necessary. 

One pattern we like to use when we are still working on a PR is to keep it in [Draft mode*](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/changing-the-stage-of-a-pull-request). Once we are happy with our code and want some feedback, we mark the PR as as *Ready for review*. We can configure the CI to only run once a PR is *Ready for review*. This gives the reviewer peace of mind that the PR is bug free and is safe to be merged.

This also saves a whole bunch of unnecessary CI runs, and gives you more control when actually running the CI. 

To set this up, add this to your github action:

# tests.yml
name: Tests

on:
  pull_request:
    branches:
      - main
    types:
      - opened
      - reopened
      - synchronize
      - ready_for_review
  push:
    branches:
      - main

jobs:
  test:
    if: github.event.pull_request.draft == false
    ...

    steps:
      ...See an example of how we have implemented this for one of our projects [here](https://github.com/duqtools/duqtools/blob/main/.github/workflows/test.yaml).

### Filter by changed files

Another common pattern we use is to only run a job when the relevant files have changed. Let's say we have a simple project with the following folder structure:

project-to-save-the-planet/
├── docs/
│   └── the_plan.md
│   └── ...
├── src/
│   ├── save_the_planet.py
│   ├── supporting_documentation.md
│   └── ...
├── tests/
│   └── ...
├── ...
└── README.mdWe don't have to re-run all tests if something only changed in the documentation, nor do we have to rebuild the documentation if we only make changes to some tests. And if we only fix a typo in `README.md` neither will be necessary. These restrictions can be enabled by adding filters in the `[paths](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#onpushpull_requestpull_request_targetpathspaths-ignore)` section of the workflow triggers. These `paths` specifications can also be combined with the other filters such as branches shown earlier, to trigger only if it matches the paths and **branch. **
Here's an example configuration that triggers only on changes in the `docs` folders:

# docs.yml
on:
  push:
    ...
    paths:
      - 'docs/**'

jobs:
  ...Certain paths or types of files can also be excluded using an exclamation mark (`!`). This can be useful if we want to trigger the tests to run on changes in `src/` or `tests/`, except when we make changes to some supporting documentation or other data that does not affect the outcome of the tests. Here's an example of such a workflow:

# tests.yml
on:
  push:
    ...
    paths:
      - 'src/**'
      - '!src/supporting_documentation.md'
      - 'tests/**'

jobs:
  ...

### Use CPU versions of tensorflow and pytorch

If you are working in machine learning, you will know that tensorflow and pytorch are enormous libraries. Together with their dependencies, they can be several gigabytes in size. On a CI, downloading these packages can already take up to a minute.

But, did you know that most of this space is taken up by GPU support? Try using `[tensorflow-cpu](https://pypi.org/project/tensorflow-cpu/)`or `[pytorch-cpu](https://pytorch.org/get-started/locally/)` instead of full-fat libraries. From our experience, this reduces the install size of our Python environments by approximately 1.5 GB on linux systems (this has no effect on Windows and Mac runners). The trick here is to install these prior to installing your package via `pip`. These will then be skipped by `pip` if these packages are also defined in your `pyproject.toml` or `requirements.txt`. Considering that all the common CI systems typically do not have GPUs in them, this makes the installs significantly lighter and therefore faster to run too!

To do so, add this step to your GitHub action prior to installing your package:

# tests.yml
jobs:
  test:
    steps:
    ...
    
    - name: Install tensorflow
      if: runner.os == 'Linux'
      run: |
        python3 -m pip install tensorflow-cpu

    - name: Install pytorch
      if: runner.os == 'Linux'
      run: |
        python3 -m pip install torch --index-url https://download.pytorch.org/whl/cpu
    
    - name: Install dependencies
      run: |
          pip install .
*Why throw away when you can reuse?* Photo by [JulieN2212 via Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Upcycled_Roses.jpg).

## Reuse

If you must run the CI, the best way to reduce its impact is limit the actual work that needs to be done. 

With the [cache action](https://github.com/actions/cache), you can cache dependencies and build outputs to make your workflows faster and thus more efficient. Maybe you need to compile some dependency, download and pre-compute some data, or set up your python environment via `pip`. These typically do not change much from run to run, so try to cache these where possible.

### Caching your Python environment

Just the installation of the dependencies of some Python code via pip can be quite significant. Some libraries just seem to pull in an endless stream of dependencies. So, why don't we cache our entire Python environment?

Below is a snippet that we find effective in our workflows for Python code. 

As the cache key, we use a combination of the Python directory name (this includes the version) in combination with the hash of the `pyproject.toml`, `setup.cfg`, or `requirements.txt` file. Whenever these get updated, the cache gets invalidated and regenerated.

This means we can also safely skip the `pip install` step if we hit the cache. Depending on the number of dependencies, this virtually eliminates the setup time of your workflow.

# tests.yaml
jobs:
  test:
    steps:
      ...
      
      - uses: actions/cache@v3
        id: cache-python-env
        with:
          path: ${{ env.pythonLocation }}
          key: ${{ env.pythonLocation }}-${{ hashFiles('pyproject.toml') }}

      - name: Install dependencies
        if: steps.cache-python-env.outputs.cache-hit != 'true'
        run: |
          python -m pip install -e .[develop]

### Caching any directory

To generalize the action below, the example below shows how any directory can be cached. We have used this to cache dependencies that need to be compiled. This can save minutes if not more from your workflow every single time it gets triggered.

We recommend adding a version to the cache key, so that you can easily invalidate the cache and force a re-trigger through the action itself.

Any subsequent workflows, will restore the directory from GitHub's cache.

# tests.yaml
jobs:
  test:
    steps:
      ...
      
      - uses: actions/cache@v3
        id: cache-important-dependency
        with:
          path: important-dependency
          key: cache-key-1

      - name: Compile dependency
        if: steps.cache-important-dependency.outputs.cache-hit != 'true'
        run: |
          mkdir important-dependency
          cd important-dependency
          echo "All I want is world peace... Or a piece of the world." &gt; t.txt
Failing code into the red bin, please. Photo by [Pawel Czerwinski](https://unsplash.com/@pawel_czerwinski?utm_source=medium&amp;utm_medium=referral) on [Unsplash](https://unsplash.com/?utm_source=medium&amp;utm_medium=referral).

## Recycle

Finally, can we recycle **anything that is left when our CI run is done? Although not exactly trash, what's typically leftover is the test results: which tests passed and failed. If any tests failed, those definitely have to pass before we want to continue. It makes sense then to re-run those tests first, and we can stop if any of those fail again.

### Pytest last failed

Pytest has a very handy `[--last-failed](https://docs.pytest.org/en/stable/how-to/cache.html)` flag for exactly this purpose, but that obviously depends on a local cache to remember the outcome of the previous run. Luckily for you, [we've already made a GitHub action](https://github.com/sjvrijn/pytest-last-failed) that takes care of setting this up for you! Simply use this action instead of your `*run: pytest --my --pytest --args*` step:

# tests.yaml
jobs:
  test:
    steps:
      # create python environment and install pytest    
      ...  

    - name: Run pytest
      uses: sjvrijn/pytest-last-failed@v2
      with:
        pytest-args: '--my --pytest --args'

## Conclusion

In this blog post, we introduced some options to make your sustainable software development more sustainable to the planet as well, whether by preventing double work or avoiding unnecessary CI runs in the first place. All it takes is a few extra lines in your workflows to help save the planet and save yourself some time in the process.

Of course, there are many other strategies to reduce your impact, such as using pre-built dependencies, more efficient libraries, or preparing a docker container for complex test environments.

It turns out that once you start looking, there are many technical options to reduce your impact. The more difficult challenge may be a social one, to convince your peers that change is necessary. In the end, we hope that this blog post inspired you, and that you will consider the environmental impact of your work.
