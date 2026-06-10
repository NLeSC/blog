---
layout: post
title: "Versioned documentation using only GitHub actions and GitHub pages"
date: 2022-10-20
author: Ben van Werkhoven
published: true
source: medium
source_url: https://blog.esciencecenter.nl/versioned-documentation-using-only-github-actions-and-github-pages-1825296e31aa
tags:
  - Git
  - Workflows
---

SubscribeRemember me for faster sign in

With this knowledge, we can easily modify the basic usage of the sphinx-notes/pages action to use the trigger `on:release:published` instead of `on:push:branches:-master`. However, we still need to ensure that the generated documentation is stored in a directory specific for that version. So we need extract the version number from GitHub so that we can use it inside the action. Luckily, [someone in one of the stackoverflow discussions](https://stackoverflow.com/questions/69063452/github-actions-on-release-created-workflow-trigger-not-working) provided a line for this in their code:

- name: Set env
  run: echo "RELEASE_VERSION=${GITHUB_REF#refs/*/}" &gt;&gt; $GITHUB_ENVAfter this, we can use $RELEASE_VERSION inside our workflow as a variable that contains the version number of the release currently being published. This means we can further modify our action to use $RELEASE_VERSION as the target_path for our sphinx-nodes/pages action to ensure that the generated HTML documentation pages are stored in a directory named after our version. I first tried to use:

- name: Build and Commit 
  uses: sphinx-notes/pages@v2
  with: 
    documentation_path: doc/source 
    target_path: $RELEASE_VERSIONBut for reasons that are obscure to me, this didn’t work. A directory was created with the name “$RELEASE_VERSION”. The variable was not evaluated, but basically treated literally as a fancy string starting with a dollar sign and someone shouting RELEASE_VERSION in full caps. After referring back to the [same stackoverflow issue](https://stackoverflow.com/questions/69063452/github-actions-on-release-created-workflow-trigger-not-working), I noticed there was another way to use the variable, which lead me to try:

- name: Build and Commit
  uses: sphinx-notes/pages@v2
  with:
    documentation_path: doc/source
    target_path: ${{ env.RELEASE_VERSION }}And this worked like a charm! Now finally, I wanted to have the URL /stable/ to point to the most recently released version. For this, I’ll be using a symlink. So after the “Build and Commit” step, but before the “Push changes” step, I’m introducing another step in the workflow:

- name: Redirect stable to new release
  run: |
    echo "Redirecting stable to newly released version" 
    ln -sf $RELEASE_VERSION stable
    git add stable
    git commit -m "redirect stable to new version $RELEASE_VERSION"This set of commands removes the old ‘stable’ symlink, if there is any, and creates a new link named stable that points to the value of $RELEASE_VERSION. We then add the file to the git repo, which is already configured to commit as a ‘GitHub actions user’ and is already set on the gh-pages branch thanks to the previous ‘Build and Commit’ step in our workflow. The resulting GitHub action workflow file can be found here:

[https://github.com/KernelTuner/kernel_tuner/blob/master/.github/workflows/docs-on-release.yml](https://github.com/KernelTuner/kernel_tuner/blob/master/.github/workflows/docs-on-release.yml)

This ensures that versioned documentation will be automatically created for us for all new releases. However, we already had a couple of releases over the last six years. To retroactively generate documentation pages for those, we move to step 3.

3 Going through all of the previous releases, generating documentation for those, and pushing them to the right directory on the gh-pages branch, first appeared to me as a daunting, mind-numbing, “oh-this-is-going-to-be-a-lot-of-manual-labour” task.

Fortunately, the actual commands used to generate the documentation pages never changed since the first version. This actually means that once we know how to do it for one version, automating the procedure for all previous versions with a simple bash script is trivial:

versions=`git tag -l`for version in $versions; do  git checkout tags/$version
  cd doc
  rm -rf build
  make html
  cd ..
  git checkout gh-pages
  mkdir $version
  cp -r doc/build/html/* $version/
  git add $version
  git commit -m "generate documentation for version $version"doneFirst, we can use git to query all released versions, which correspond to ‘tags’ in git. The command `git tag -l` generates a list of all released versions of our repo. This allows us to iterate over all versions of our software, using a simple for loop in bash.

In this loop, we “git checkout” the specific tag. This brings our local git repository in the dreaded “detached HEAD” state. Fortunately for us this doesn’t matter this time, since we are only going to read from this state. Usually when I end up with my HEAD detached, I try to undo whatever I was doing and get the hell out of there as fast as possible. But trust me, for what we are doing here: it’s OK.

Using the version of the repository at this specific tag, we can generate the HTML documentation as it was when this version was released. Note that our git repository is configured to not track files in the “doc/build” directory, so we are not changing anything in our “detached HEAD” state and we can safely leave this state again without git starting to complain and not allowing you to leave this limbo state. Then, we checkout the gh-pages branch and copy the recently build HTML pages to a directory named for this version. Finally, we commit the changes to the gh-pages branch and proceed to the next tag in the list provided by git. Rinse and repeat, for all released versions of our software.

4 Step 4 is really simple. I wanted our main repository URL to redirect to the /stable/ URL. The idea behind this is that most users will likely install the software using PyPI and therefore the default location for the documentation should correspond with the latest version present in PyPI.

After cleaning up the old HTML files in the root of the gh-pages branch, I created an index.html file with the following contents:

&lt;html&gt;
 &lt;head&gt;
  &lt;meta http-equiv="refresh" content="0; url=stable/" /&gt;
 &lt;/head&gt;
&lt;/html&gt;And that’s all! We now have versioned documentation pages for all of our released versions, including all previous releases. A [/stable/](https://kerneltuner.github.io/kernel_tuner/stable/) that points to the documentation of most recently released version of the software. A [/latest/](https://kerneltuner.github.io/kernel_tuner/latest/) that contains the documentation corresponding to the latest developments in the main branch. And an automated workflow that generates versioned documentation whenever we create a new version and updates the location pointed to by /stable/. And all of this using only GitHub actions and GitHub pages.
