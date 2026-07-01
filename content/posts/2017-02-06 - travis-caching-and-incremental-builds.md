---
title: "Travis caching and incremental builds"
author: Patrick Bos
published: true
source: medium
tags:
  - uncategorized
---

![](/assets/1_eCqVHpbrSZqs3AeGMUhY3Q-17430e5f.jpeg)

*Update (Aug 7, 2018): added a section at the bottom with new configuration settings and an added time-out step for extending build times beyond the 50 minute limit to bootstrap your build cache.*

*Original post (Feb 6, 2017):*

I've been working on the C++ code [ROOT](https://root.cern.ch/), which is a humongous data analysis package for particle physics. As part of [my current project](https://www.esciencecenter.nl/project/automated-parallel-calculation-of-collaborative-statistical-models), I'm only adding things to a small part ([RooFit](https://root.cern.ch/roofit-20-minutes)), but to do so, the full code has to be compiled, which can take hours. Luckily you don't have to rebuild everything every time you make a small change to one file thanks to smart building tools like `make`.

I decided that I wanted to add continuous integration to my workflow. [Travis CI](https://travis-ci.org/) is the current go-to solution for us (it's open, transparent and free!). However, when using Travis, one has to jump through a few hoops to allow quick rebuilds (I guess the same holds for other continuous integration services, but I haven't tried those…). Speed is absolutely necessary for running tests in ROOT, since the full build on Travis takes more than 45 minutes and the timeout for free Travis accounts is 50 minutes, which I hit regularly, and that's still without any tests… However, even when I cached my [build directory](https://docs.travis-ci.com/user/caching/), the next time a build was triggered, every file would be compiled all over again. What's up?

## Build tool dependency resolving

One of the main reasons for using `make`, `ninja` or similar build tools (you can use both with ROOT, since it uses [CMake](https://cmake.org/), which supports both `make` and `ninja`) is that they incrementally rebuild your code. When you change a single source file, only that file is recompiled to an object file and linked into the final binary. The other object files are reused from the previous build.

The way these tools find out which files to recompile is by using timestamps, specifically the mtime, or modification time, on Unix systems.

`make` simply checks whether the mtime of a source file is older than the corresponding object file. This makes perfect sense: when the object file is built, it is newer than the source file. When the source file is edited, its mtime will become newer than the object file and the file should and will be rebuilt.

`ninja` can store all mtimes of the object and other files it generates in a log file. On the next build, it does the same check as `make`, but also checks whether the mtimes of the generated files have changed compared to the times that were stored in the log file. This is used to avoid having to check dependencies between object files.

## Travis, Git and timestamps

In Travis, we can cache the files that were created in a build, so surely we can reuse these in the next build? The mtimes of the build files are even preserved by the `tar` archive that is used for caching. So what’s the problem with Travis?

On each commit to GitHub a Travis build is triggered. Travis starts up a container or VM with a clean environment. It then installs some tools, the cached files from the previous build are restored and **your GitHub repository is freshly cloned**.

`git` does not store timestamps, though! It only looks at the contents of your files. A fresh `git clone` creates all files in the repo anew. This means that all of a sudden your source files are all newer than the cached build files. Clearly, both `make` and `ninja` will protest and rebuild!

## Hammer time

The solution is simple: we simply change some mtimes using `touch`.

Most cached object files will not have to be rebuilt on a next build, so their mtimes must be newer than the source files in the git repo.

### Make

In the case of `make`, the key is the order of timestamps of dependencies. We can save the order at the end of each build in a file in the cache:

```hs
find . -type f -printf "%T+\t%p\n" | sort | cut -f 2 > touch_order.txt
```

Then in the next build, after the cache is restored, we can recreate the mtime ordering by touching the files in the saved order:

```hs
if [[ -f touch_order.txt ]]; then
  while read fn; do
    touch $fn
  done < touch_order.txt
fi
```

I added the `if` statement for when I delete my cache and the file is gone. Now all cached files are newer than the cloned source files and nothing will be rebuilt… But that's not really what we want either! We want the files that were changed since the cache was created to be rebuilt. So after creating the `touch_order.txt` file, let's also create a file with the hash of the commit we just built:

```hs
cd "${TRAVIS_BUILD_DIR}" && git rev-parse HEAD > $CACHED_DIR/previous_git_commit.txt
```

where `$CACHED_DIR` is the directory with the build files, in which the previous order commands were also run. Then before you start building, add a command that uses this information to fix the mtimes of the files that were changed since the previous commit:

```hs
cd "${TRAVIS_BUILD_DIR}"
read PREVIOUS_GIT_COMMIT < $CACHED_DIR/previous_git_commit.txt
changed_files=\`git diff --name-only $PREVIOUS_GIT_COMMIT HEAD\` 
touch \`echo $changed_files\`
```

I put the changed files list in an environment variable so I could easily add some `echo` 's for debugging. That's it! Running `make` now takes advantage of the already built files and you save tons of time on each build.

Alternatively, to fix the git repo files' mtimes, you could use an [existing script like this one,](https://github.com/MestreLion/git-tools/blob/master/git-restore-mtime-core) but we don’t need that kind of precision in mtimes here and it comes with an extra download step and Python dependencies, which may take more precious Travis time.

### Ninja

Using `ninja` for building is usually a lot faster on rebuilds than `make`. For ROOT, when I run `make` on my laptop without changing any file (so without any actual compiling), the `make` run still takes 12 seconds, while `ninja` finishes in 0.2 seconds. That's pure overhead for ya. When actual compiling takes place, the difference can become even larger, since `ninja` smartly detects dependencies, so it only recompiles the absolute necessary parts.

However, `ninja` is not as mainstream as `make`. On Travis, `make` comes pre-installed, whereas `ninja` has to be installed with `apt`, which takes an extra download and installation step. The time this costs has to be weighed against the time gained in the build step. Ymmv.

In any case, rebuilding on Travis with `ninja` works slightly differently than with `make`, since the absolute mtimes are compared, not just the order. The mtimes of the build files themselves must not be changed. So if we cannot change those, the only other option is to make all the cloned source files older than the oldest build file:

```hs
find . -type f -printf "%.10T@\n" | sort | read OLDEST_MTIME
export OLDEST_MTIME=$((OLDEST_MTIME-1))
find ${TRAVIS_BUILD_DIR} -type f -exec touch -c -m -d “@$OLDEST_MTIME” {} \;
```

Luckily, the order of the source files' mtimes doesn't matter, so we just set all of them to the timestamp of the oldest build file, minus one.

Finally, touch the source files that were changed since the previous build in the same way as with `make` above. Lightning fast rebuilds, yay!

Sure we can.

## Update (7 Aug, 2018): Mate — Hajime

In the one and a half years since publishing this post (as written above), a few things changed:

- The default Travis environment was updated, changing some things for me
- [ROOT migrated to GitHub](https://github.com/root-project/root), making forking, PRs, etc a lot easier
- … but it also added a Travis configuration file, which conflicted with mine.

As a result I stopped using my own Travis configuration and went without CI for about a year. Bad idea… but that’s a different story. Last week, however, I decided I wanted it back. I updated my setup to fit the latest Travis environments and it is now fully operational again.

I now also added a time-out to the building phase ([see a working example here](https://github.com/roofit-dev/root/blob/travis_trusty2018_update/.travis.yml)), which automatically stops building after some set time:

```hs
timeout 35m ninja -j4
```

I chose 35 minutes, because loading the cache, Travis setup and storing the cache together took about 10–15 minutes. This way, I automatically stay within the 50 minute limit.

It turns out this has become crucial, since for some reason building on Travis has become a lot slower for me. Either ROOT has grown substantially, or the Travis setup I chose is less suitable than the one I had previously.

In any case, I now need at least three Travis “cached build cycles” to fully build ROOT. The way I run multiple build cycles is by simply manually restarting the build after it has “failed” due to the timeout.
