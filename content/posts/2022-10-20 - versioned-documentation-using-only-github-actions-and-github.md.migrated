---
layout: post
title: "Versioned documentation using only GitHub actions and GitHub pages"
author: Ben van Werkhoven
published: true
source: medium
source_url: https://blog.esciencecenter.nl/versioned-documentation-using-only-github-actions-and-github-pages-1825296e31aa
tags:
  - Git
  - Workflows
---

Today, I tried something new. Something that I wanted to have for quite a while for one of the main software projects that I’m working on. And that is: versioned documentation. With that, I mean to have multiple different versions of the documentation that reflect the different released versions of the software. Let me start with explaining the current setup.

![](/assets/1_WX6X6-C4K_C8Mrc4tyQJKA-c6eba8a8.png)

Currently, we have a GitHub action that generates updated Sphinx doc documentation pages whenever something is committed, or preferably, merged into the main branch of the repository. The generated HTML pages are pushed to the root directory of the gh-pages branch of the repository, which is then served by GitHub as a website hosting the documentation for our software. This in itself works really great. So far, so good.

Now the problem is basically that we don’t make new releases of the software all that often. So the version that is installed using the package manager can actually lag quite a bit behind on the latest developments in the main branch. This is especially nerve wrecking if you realize right before you are about to give an instructor-led tutorial on your software, that there is a rather large mismatch between the version of the software users will install and the documentation pages hosted online.

> Anyone reading this may think: “why aren’t you just using readthedocs, which has features to do all of this automatically for you?” A fair question! If you are already using readthedocs for your project, but would like to try a more self-contained solution without compromising on versioning, please read on! My own reason for not using readthedocs is basically that I don’t want to rely on another service by another third-party. Especially, if one of the service providers that I’m already relying upon (in this case GitHub) has everything that we need to avoid relying on yet another service by another party. On the other hand, I sometimes worry about becoming too reliant on GitHub, but that’s for another blogpost.

In this case, we use the the Python package index (PyPI) and users may simply install the software using “pip install [kernel\_tuner](https://github.com/KernelTuner/kernel_tuner) ”. When developments continue for a few months without a release, the documentation pages hosted on GitHub pages will reflect those recent developments, which may include new features or changes that are not present in the version that users receive when they “pip install” the latest version.

So the main question that I’ll try to answer in this article is: How can we use just GitHub to create versioned documentation pages?

I solved this in a few simple steps:

1. Keep the current GitHub action for generating new documentation after changes on the main branch, but host these in the /latest/ directory.
2. Create a new GitHub action that triggers when we create a new release to generate documentation pages for that specific release, use a symlink `stable` to point to the latest released version.
3. Retroactively generate documentation for all previously released versions.
4. Redirect the main repository URL to the documentation in /stable/

1 The first change that we’ll make is to keep the current setup of generating the documentation whenever something changes on the main branch, but instead of pushing the generated HTML pages to the root directory of our gh-pages branch, we’ll instead push it into the ‘latest’ directory.

We need to modify [our current GitHub action](https://github.com/KernelTuner/kernel_tuner/blob/51f353535ce2bc682cf40944eb8b52a46b0dd71d/.github/workflows/docs.yml), which is based on the [sphinx-notes/pages](https://github.com/sphinx-notes/pages) action. Specifically, I was using the action sphinx-notes/pages@master, but to my surprise the master version is behind the newer versions of this action. I’m now using sphinx-notes/pages@v2, because it supports the `target_path` option, which we can use to make sure our documentation pages are stored in the /latest/ directory rather than the root directory of our gh-pages branch.

2 Step 2 is the most elaborate part of this post. I was looking into GitHub actions that would trigger when someone creates a new release of the software. When searching for this online, I mostly ran into questions on Stackoverflow from people who did not manage to get their GitHub actions to [trigger properly when new releases were created](https://stackoverflow.com/questions/69063452/github-actions-on-release-created-workflow-trigger-not-working). Not a very good sign when you are just starting to look into how to get something done.

The main issue is apparently that actions that trigger on the creation of a new release do not necessarily trigger for creating a *draft* release, and the ‘creation’ trigger of the release can be skipped entirely when an external tool is used to create the GitHub release. There were some suggested solutions to these problems, but most of these seemed overly complicated, and also not really related to the underlying issue. Luckily, [someone answered on another question about this issue](https://stackoverflow.com/a/61066906) to use `on:release:published` instead of `on:release:created` to avoid all of the issues related to triggering workflows on new software releases.

With this knowledge, we can easily modify the basic usage of the sphinx-notes/pages action to use the trigger `on:release:published` instead of `on:push:branches:-master`. However, we still need to ensure that the generated documentation is stored in a directory specific for that version. So we need extract the version number from GitHub so that we can use it inside the action. Luckily, [someone in one of the stackoverflow discussions](https://stackoverflow.com/questions/69063452/github-actions-on-release-created-workflow-trigger-not-working) provided a line for this in their code:

```hs
- name: Set env
  run: echo "RELEASE_VERSION=${GITHUB_REF#refs/*/}" >> $GITHUB_ENV
```

After this, we can use $RELEASE\_VERSION inside our workflow as a variable that contains the version number of the release currently being published. This means we can further modify our action to use $RELEASE\_VERSION as the target\_path for our sphinx-nodes/pages action to ensure that the generated HTML documentation pages are stored in a directory named after our version. I first tried to use:

```hs
- name: Build and Commit 
  uses: sphinx-notes/pages@v2
  with: 
    documentation_path: doc/source 
    target_path: $RELEASE_VERSION
```

But for reasons that are obscure to me, this didn’t work. A directory was created with the name “$RELEASE\_VERSION”. The variable was not evaluated, but basically treated literally as a fancy string starting with a dollar sign and someone shouting RELEASE\_VERSION in full caps. After referring back to the [same stackoverflow issue](https://stackoverflow.com/questions/69063452/github-actions-on-release-created-workflow-trigger-not-working), I noticed there was another way to use the variable, which lead me to try:

```hs
- name: Build and Commit
  uses: sphinx-notes/pages@v2
  with:
    documentation_path: doc/source
    target_path: ${{ env.RELEASE_VERSION }}
```

And this worked like a charm! Now finally, I wanted to have the URL /stable/ to point to the most recently released version. For this, I’ll be using a symlink. So after the “Build and Commit” step, but before the “Push changes” step, I’m introducing another step in the workflow:

```hs
- name: Redirect stable to new release
  run: |
    echo "Redirecting stable to newly released version" 
    ln -sf $RELEASE_VERSION stable
    git add stable
    git commit -m "redirect stable to new version $RELEASE_VERSION"
```

This set of commands removes the old ‘stable’ symlink, if there is any, and creates a new link named stable that points to the value of $RELEASE\_VERSION. We then add the file to the git repo, which is already configured to commit as a ‘GitHub actions user’ and is already set on the gh-pages branch thanks to the previous ‘Build and Commit’ step in our workflow. The resulting GitHub action workflow file can be found here:

[https://github.com/KernelTuner/kernel\_tuner/blob/master/.github/workflows/docs-on-release.yml](https://github.com/KernelTuner/kernel_tuner/blob/master/.github/workflows/docs-on-release.yml)

This ensures that versioned documentation will be automatically created for us for all new releases. However, we already had a couple of releases over the last six years. To retroactively generate documentation pages for those, we move to step 3.

3 Going through all of the previous releases, generating documentation for those, and pushing them to the right directory on the gh-pages branch, first appeared to me as a daunting, mind-numbing, “oh-this-is-going-to-be-a-lot-of-manual-labour” task.

Fortunately, the actual commands used to generate the documentation pages never changed since the first version. This actually means that once we know how to do it for one version, automating the procedure for all previous versions with a simple bash script is trivial:

```hs
versions=\`git tag -l\`for version in $versions; do  git checkout tags/$version
  cd doc
  rm -rf build
  make html
  cd ..
  git checkout gh-pages
  mkdir $version
  cp -r doc/build/html/* $version/
  git add $version
  git commit -m "generate documentation for version $version"done
```

First, we can use git to query all released versions, which correspond to ‘tags’ in git. The command `git tag -l` generates a list of all released versions of our repo. This allows us to iterate over all versions of our software, using a simple for loop in bash.

In this loop, we “git checkout” the specific tag. This brings our local git repository in the dreaded “detached HEAD” state. Fortunately for us this doesn’t matter this time, since we are only going to read from this state. Usually when I end up with my HEAD detached, I try to undo whatever I was doing and get the hell out of there as fast as possible. But trust me, for what we are doing here: it’s OK.

Using the version of the repository at this specific tag, we can generate the HTML documentation as it was when this version was released. Note that our git repository is configured to not track files in the “doc/build” directory, so we are not changing anything in our “detached HEAD” state and we can safely leave this state again without git starting to complain and not allowing you to leave this limbo state. Then, we checkout the gh-pages branch and copy the recently build HTML pages to a directory named for this version. Finally, we commit the changes to the gh-pages branch and proceed to the next tag in the list provided by git. Rinse and repeat, for all released versions of our software.

4 Step 4 is really simple. I wanted our main repository URL to redirect to the /stable/ URL. The idea behind this is that most users will likely install the software using PyPI and therefore the default location for the documentation should correspond with the latest version present in PyPI.

After cleaning up the old HTML files in the root of the gh-pages branch, I created an index.html file with the following contents:

```hs
<html>
 <head>
  <meta http-equiv="refresh" content="0; url=stable/" />
 </head>
</html>
```

And that’s all! We now have versioned documentation pages for all of our released versions, including all previous releases. A [/stable/](https://kerneltuner.github.io/kernel_tuner/stable/) that points to the documentation of most recently released version of the software. A [/latest/](https://kerneltuner.github.io/kernel_tuner/latest/) that contains the documentation corresponding to the latest developments in the main branch. And an automated workflow that generates versioned documentation whenever we create a new version and updates the location pointed to by /stable/. And all of this using only GitHub actions and GitHub pages.
