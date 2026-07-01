---
layout: post
title: "Give Me Data, Yesterday"
date: 2026-03-18
author: eScience Editorial Team
published: true
source: medium
source_url: https://blog.esciencecenter.nl/give-me-data-yesterday-7a3c8124b143
tags:
  - Benchmarking
  - Collaboration
  - Containers
  - Databases
  - Docker
  - Environment
---

![Give Me Data, Yesterday](/assets/give-me-data-yesterday-bd7575b9.png)
I want this data, and I want it yesterday!*This post is adapted, with the *[*author*](https://ole-mn.medium.com/)*’s permission and collaboration, from *[*this post*](https://ole.mn/posts/2026-02-data-cache/)* in his personal blog.*

This is a quest. A quest for the right tool for the right job, for usability, and performance. We will torture databases, run tens of thousands of benchmarks and conjure charts, numbers, and tables. Because science. 🧑‍🔬

But first, some background.

The patient is the package search program `[nps](https://github.com/OleMussmann/nps/)`, which provides information about all packages the `[nix](https://nixos.org/)` package manager has to offer. What’s the patient’s complaint? `nps` needs a better database and a better way to update its data.

Erm, `nix`? Never heard of it? It’s kinda special. Unlike `apt`, `pacman`, or their siblings, it is declarative, reproducible and reliable. To top it off, it has a [gigantic library](https://repology.org/repositories/graphs). If you don’t know what that means, no worries! Here’s a primer.

## `nix`? What’s That?

How do you set up your operating system? You install, for example, Ubuntu. Then you install a bunch of packages. You configure them. Then you set the wallpaper, the color scheme, the fonts, and make yourself at home. And if you set up a new system, you start again from square one. This whole process is *procedural*, you follow one step after another. If you re-do all your steps again, you get the same result; and any changes to the recipe will result in a different outcome.

With `nix`, you describe the end state you want to have, and `nix` will build and set up the system like you describe. Reliably. Reproducibly. `nix` is *declarative*.

Worry not, you can still apply tweaks and modifications. The desired end state including all customizations can be described in a single configuration file (keep it simple), or a set of files (make it modular). Let’s call this configuration file a “flake”. ❄️ Throw `git` at this flake file and now you can jump between different versions on demand.

If you share your flake with someone else, they can re-create the exact environment on their system. This is great for collaborative development! Runs on your computer? Runs everywhere. You can run other people’s software *without installing*, and others can run yours. For even more portability, you can create Docker containers, virtual machines, or even a bootable ISO from your project.

Sounds like magic? It comes close.

Current gotchas include a lack of broad adoption, a steep learning curve for the `nix` language, as well as not great (but improving) documentation. And, well, a distinct lack of a native, fast, offline program for searching packages.

## Paper Cuts

`nix`’s usability has, let’s say, still room for improvement. Prime example: how to find out which packages one can install. What do these packages do exactly, and what version do I get? The [recommended way](https://wiki.nixos.org/wiki/Searching_packages) is – drumroll – a website: [search.nixos.org/packages](https://search.nixos.org/packages). It’s fast, comprehensive, and detailed. It works well.

But it’s a website.

When I’m pondering about installing packages, I’m not staring at a browser. I’m in the terminal. I want to have the equivalent of `apt search` or `pacman -Ss`¹.

There are some wonderful CLI search programs out there², but they hook into the ElasticSearch database powering the backend of [search.nixos.org/packages](https://search.nixos.org/packages). This means that you need to be online to get any package information, and (minor quibble, I know) it takes a bit for the information to appear on your screen.

## `nps`

I built the [Nix Package Search ](https://github.com/OleMussmann/nps/)`[nps](https://github.com/OleMussmann/nps/)` program to do my part to make `nix` more user-friendly. `nps` stores the package information locally, searches this cache, and presents the result – color-coded and sanely sorted. It works offline. It’s fast. It’s beautiful. Yeah, yeah, I know, I’m biased. Try it for yourself, though! Remember, you can run it without installing.

Lately, [kevb1973](https://github.com/kevb1973) asked me to [provide more package information](https://github.com/OleMussmann/nps/issues/25) in the (dense) output that `nps` provides. It’s a great idea and would increase the utility that `nps` provides! Unfortunately, this is not something I can just bolt on to the existing program. Let’s have a look at the moving parts of `nps` to understand why.

## Architecture

Ok, architecture is a big word. Let me run by you how `nps` currently works:

* Run `nix search nixpkgs ^` – get all information for “all” packages.
* Create a text file with package names, versions, and descriptions and store them locally.
* `grep` through the text file (yes, it’s that low-tech) to find matches.
* Sort matches nicely into exact hits (searching for “avahi” matches package `avahi`), direct hits (finds packages starting with “avahi”, e.g. `avahi-compat`) and indirect hits (“avahi” appears anywhere in the package name or description).
* Create columns for better readability.
* Add a lick of paint to color-code the different types of matches.
* Print the result.

The issue: the data is stored as one row per package. Adding more information to each package row will make it harder for `grep` to find the packages you’re looking for. This looks like a job for a “proper” database now. But which one? There’s plenty of cool tech out there, but which would be the “best” one for this use case?

## Database Candidate Boundary Conditions

Alright, before we dive in, let’s define a few corner stones.

### Data Source

Remember the `nix search` command from above? It does not actually find “all” packages, [https://search.nixos.org](https://search.nixos.org) finds significantly more³. Why? No idea. Also, `nix search` supplies only the package name, version, and description. No other information. Not great. Another aspect that’s missing is that packages might provide a differently named executable: you install the package `neovim` and use the executable `nvim`; some packages even provide multiple different executables. `nix search` can’t find those.

The data needs to come from a better source.

The ElasticSearch backend is a good choice, but it’s meant to be queried, not downloaded. This means we have to scrape it in its entirety first.

Setting up a project that does the scraping and regularly builds a cache that is usable by (a future version of) `nps` is a task that goes beyond the scope of this post. Let’s assume for now that we have the data available, and we can squish (very scientific term here) it into any shape or form that we need for querying.

### Substring Matching

Subwhat? A substring is a part of a string: “crow” is a substring of “miCROWave”. It can be anywhere in a string, beginning, middle, or end. When searching for “nvim” I want to find `nvim` (duh!), as well as `nvimpager` “use neovim as pager”, and `gnvim` “GUI for neovim, without any web bloat”. As most databases are specialized in retrieving “exact” matches, substring matching might take some convincing.

### Query Time

I want future `nps` to stay fast. I’m happy with the responsiveness of the current implementation. To get a feeling for this, using `nps` to search for the package `nps` takes about 6ms on my desktop – so let’s take that as a baseline. If the pure data retrieval of the database candidates takes longer than current-`nps`, then that’s a red flag, since sorting, coloring, etc. will take some extra time on top of that.

Quick Cold Start**

Related to “Query Time”: many “serious” databases are designed to run as a service; that makes querying fast, but you need something running in the background all the time. We don’t want that. Instead, we have a single program that starts up, queries a database, prints stuff, and then quits. This excludes many of the usual suspects like MySQL and its colleagues.

### Data Amount

The current data amount is about 8.5 Mb of package information and metadata for one `nixpkgs` channel. The future, more detailed one (also including a long description, project URL and location within the `nixpkgs` repo) would be 26 Mb of plain text. For three NixOS channels (“unstable”, “current stable”, “previous stable”), this would be about 80 Mb. While compression can bring this down a bit, some databases need to index their database to be able to search quickly; this will increase the data amount again. How much? That depends on the database used.

The increased data amount is defensible when taking into account that one could regularly download the *incremental changes* instead of the whole database for refreshing the cache.

Yes, this is pretty hand-wavy for now. We’ll get more concrete about this later.

### Memory Usage

A bit less crucial than the above, I’d like to use as little RAM as possible during the search. `nps` is a guest on your machine and it should use only as much of your resources as needed.

Many databases (as well as the good ol’ `grep`) don’t load the whole data into memory before searching, they “crawl” through the data and drop the parts they have already used. I’d set that as a “nice to have”.

## Database Candidates

First, let’s discuss the candidates and their structural strengths and weaknesses. We get to the hard numbers below, in the chapter [**“Gimme Numbers!”**](#37a0).

### `grep` a Text File 🦖

Why change a working system? The old dinosaur `grep` is fast. Really fast. We have the [“GNU” flavor](https://www.gnu.org/software/grep/) that runs on the command line, then there’s a [Rust implementation called ](https://github.com/BurntSushi/ripgrep)`[ripgrep](https://github.com/BurntSushi/ripgrep)`, and lastly the [Rust crate called ](https://docs.rs/grep/latest/grep/)`[grep](https://docs.rs/grep/latest/grep/)`, which is – despite the name – closer to `ripgrep` than to `grep`.

Let’s dial it up a notch. I’d like to see how just calling `grep` or its cousin `ripgrep` from the command line (equivalent to step 3. from [“Architecture”](#architecture); we will label all those tests with the “CLI” suffix) compares to calling it from Rust and splitting the results (necessity for the “new” architecture). `ripgrep` likes to work with streaming data, but we can’t do that if we want to form columns later. So what’s the overhead of the extra data mangling?

That brings us to the following list:

* GNU `grep` (called from CLI, results *not* split)
* `ripgrep` (called from CLI, results *not* split)
* GNU `grep` (called from Rust)
* `ripgrep` (called from Rust)
* Rust crate `grep` (called from Rust)

### Benefits

* Simple
* Single file “database”
* Easy and good compression
* Trivial substring matching

### Drawbacks

* Extra finagling to only search certain parts of a line, yet still returning the whole row of data; in practice this means extra lines of code plus possibly a few extra gray hairs
* Incremental data updates are difficult

### SQLite 🪶

The gold standard for “simple” databases. Scales less well for serious applications than MySQL (or MariaDB or whatever), but should be “good enough” for a few hundred thousand packages.

We use trigram (N-gram with N=3)⁴search to achieve fast substring matching. This makes it, well, fast. But it also inflates the database size and ignores any search terms shorter than 3 characters. One *could* check for search string length and use a different matching algorithm for shorter terms, but is that worth the effort?

### Benefits

* Single file database
* Battle-tested and stable
* “Proper” database queries, the results are well-structured
* Incremental updates are trivial

### Trade-offs

* How compressible is an already compressed database?
* Needs indexing for fast substring matches, balancing database size vs performance

### Drawbacks

* Compression per row, not on the whole file

### Tantivy 🐎

I sparred with ChatGPT about which database to use, and it was very enthusiastic about Tantivy — we will see later if that was a good idea or not. It is designed for a quick cold-start and fast data retrieval, sounds like a match to me! Tantivy stores data in several files and has a `meta.json` file to figure out what’s what.

A quirk: technically, you can’t delete already stored data. Instead, you add a “delete” file that ignores entries and you can delete storage files that eventually become obsolete. Still, incremental updates should not be too hard this way. Every once in a while one would need to re-download the whole thing once the local index grew too large with all those “delete” files.

Same as with `SQLite`, we use trigram matching for speed, with the same benefits and drawbacks.

### Benefits

* Pretty much designed for this purpose
* Incremental updates are easy
* “Proper” database queries, the results are well-structured

### Trade-offs

* The database is a folder with multiple files
* Needs indexing for fast substring matches, balancing database size vs performance

### Drawbacks

* Incremental updates do need a strategy, with an occasional fresh download of the whole database
* The many files might take some time to read, benchmarks will tell if that’s an issue
* Compression per row, not on the whole file

### DuckDB 🦆

Completing our zoo is the new duckling on the block. DuckDB sports rad analytics which might be handy for retrieving already correctly sorted search results.

However, DuckDB can’t do N-grams. [Yet](https://github.com/duckdb/duckdb/discussions/16071). Sad quack.

What can we do instead?

* Benchmark the slower, standard way of case-insensitive substring matching, called `ILIKE`.
* Benchmark the slower, other way of case-insensitive substring matching with regular expressions: `regex`.
* Who needs built-in N-gram indexing when Gemini can build one (let’s call it `trigram`) for you? We will soon find out if that’s a good idea.

### Benefits

* Ducks are cool
* Single file database
* Supports incremental updates
* “Proper” database queries, the results are well-structured

### Trade-offs

* Would the analytics work for proper sorting?

### Drawbacks

* No built-in N-gram indexing for fast substring matching, uh oh!
* Compression per row, not on the whole file

## Benchmarking Boundary Conditions

We will be testing for a lot of things at once, here’s a break-down.

### Parameters

We are searching for four different search terms with increasing number of matches. This should give us enough data points to make out a trend.

* “nps” (21 matches)
* “nvim” (1301 matches)
* “python” (21123 matches)
* “e” (131567 matches, almost the whole database)

### Data Types

To be able to compare database performances with the current implementation of `nps` we start with a “minimal” database, containing the package name, version, and short description. This mirrors the current implementation of `nps` and allows for comparisons.

The entire “minimal” data for the `abcde` package look like this:

abcde   2.9.3   Command-line audio CD ripperThen we try a “detailed” database, containing:

* package name
* executable names (which might be different than the package name)
* version
* description (short)
* description (long)
* homepage URL
* and the URL to the package in the `nixpkgs` repository.

Formatted, the information for the same package could look like this:

abcde [abcde-musicbrainz-tool, abcde, cddb-tool]  2.9.3

Command-line audio CD ripper
    abcde is a front-end command-line utility (actually, a shell
    script) that grabs tracks off a CD, encodes them to Ogg/Vorbis,
    MP3, FLAC, Ogg/Speex and/or MPP/MP+ (Musepack) format, and tags
    them, all in one go.
    Project URL: http://abcde.einval.com/wiki/
    Nixpkgs URL: https://github.com/NixOS/nixpkgs/pkgs/by-name/ab/abcde/package.nix:83Off-topic: this project’s website gives me heavy 90’s vibes, woah.

### `hyperfine`, Engage

If you counted correctly, you should have four search terms, two data types, and eleven search approaches. We are skipping some combinations, e.g. “detailed search” is not supported on the O.G. `nps`, and Tantivy and DuckDB can’t find anything shorter than 3 characters. In the end we have more than 80 distinctly different benchmarks. Some are run from Rust, some from the command line. To be able to compare them, we benchmark them with `[hyperfine](https://github.com/rmlmcfadden/hyperfine)`. Bonus: on top of min-, max-, mean-, and median-runtimes we also get the memory usage of the runs. Nice!

This is what a typical run on the command line looks like:

$ hyperfine 'nps neovim'
Benchmark 1: nps neovim
  Time (mean ± σ):       6.0 ms ±   0.4 ms    [User: 1.5 ms, System: 4.4 ms]
  Range (min … max):     5.0 ms …   7.3 ms    351 runsEven better, we can also get the results in JSON format. Unfortunately, this also means that it’s written to file.

Sigh. So we have to read in that file to get the data we need. On the plus side, the JSON detour makes sure we don’t have any unforeseen hick-ups with data parsing, which could have happened if we wanted to retrieve the runtimes via regex from the output shown above.

The JSON data looks like this:

{
  "results": [
    {
      "command": "nps neovim",
      "mean": 0.006715249454725274,
      "stddev": 0.0026061538013605248,
      "median": 0.0065737821799999995,
      "user": 0.001504577142857143,
      "system": 0.005087126153846152,
      "min": 0.00505421018,
      "max": 0.03085960318,
      "times": [
        0.03085960318,
        0.00686827018,
        ...
      ],
      "memory_usage_byte": [
        12791808,
        12791808,
        ...
      ],
      "exit_codes": [
        0,
        0,
        ...
      ]
    }
  ]
}For benchmarking, we are using `hyperfine` the following way:

hyperfine --shell=none --warmup=5 --export-json [filename] 'COMMAND'Break-down of the moving parts:

* `--shell=none` tells `hyperfine` to, well, not start any shell. This shaves a few milliseconds off the benchmark score and allows for easier runtime comparisons.
* `--warmup=5` tells `hyperfine` to run `COMMAND` 5 times before actually measuring the runtime. This makes sure that all files that are read are properly cached first.
* `--export-json [filename]` tells `hyperfine` to write out the data in JSON format.

## Gimme Numbers

Now to the fun part. Buckle up, it’s finally benchmark time! With repetitions, we have &gt;40.000 data retrieval runs.

Below are all the tests we run against the above parameters and data types. To be able to compare apples to apples, these are the steps each approach conducts, unless noted otherwise:

* Read in the data,
* Find package matches in the whole row (minimal databases) , or in the fields “package name”, “executable names”, and “package description (short)” (detailed databases),
* Split the matched data if necessary, so we have access to the “fields” of the data row,
* Collect the split data lines into an array, so we could sort and color them later, and
* Print all results to screen.

> 

Disclaimer: Apart from *`*nps*`*, all search approaches are mostly vibe-coded with “Gemini 3 Pro Preview”. I wanted to iterate quickly to test as many approaches as needed. I did my best to avoid the common pitfalls, but it’s always possible that I missed something. To be fair, the same warning would apply if I coded it by hand.*

*This code will *not* end up in production.*

*Once I identify the correct approach, I will re-write it from scratch and work it into the *`*nps*`* implementation. This way I make sure I am responsible for and understand every line of it.*

### Comparing Speed against Current `nps`

We start out to compare the new contenders against the existing approach. For this, we query the smaller, “minimal” database.

### `nps`

Providing a baseline, we try the current `nps` program. It *should* be slower than the other search implementations, since it provides the full pipeline instead of the four steps mentioned above; this includes forming proper columns and coloring the output.

We also throw the Rust crate `grep` into the ring; this is what `nps` currently uses internally. Usually, Rust `grep` likes to work with a data stream; this makes it really fast. For the benchmark, however, we are deliberately sabotaging its performance by collecting the output into a vector before printing. This is needed for the future `nps` implementation, where we will sort the results and color them appropriately. Without hamstringing Rust `grep`, the benchmark comparisons would not be entirely fair.

> 

*Regarding the data: often the *`*y*`*-axis (the vertical one) will be logarithmic. Each tick on the *`*y*`*-axis will denote “10x more than the previous one”. This makes sure we can comfortably see a difference between 2 ms, 2.5 ms and 2000 ms in the same plot.*

![Give Me Data, Yesterday](/assets/give-me-data-yesterday-c8b7629b.png)
Now we have something to aim for. If the pure search approach is slower than `nps` – which includes creating columns and coloring the output – then we shout “boo!”. Is it faster than the current data retrieval “Rust grep”? Extra brownie points.

### GNU `grep`

“Rust `grep`” is already there. Now we compare it to “GNU grep” both from the command line and from within Rust. We keep the above run times for `nps` and Rust `grep` as a gray band for comparison.

![Give Me Data, Yesterday](/assets/give-me-data-yesterday-c3a768c9.png)
The base speed is decent, but remarkably, the old “GNU `grep` (CLI)” becomes *faster* with shorter search terms. Afterwards there’s some extra work to do, namely splitting the lines into fields, negating this speed benefit somewhat. This run is labeled “GNU `grep` (CLI, rs)”.

### `ripgrep`

Will the Rust flavor of `grep` fare any different?

![Give Me Data, Yesterday](/assets/give-me-data-yesterday-34a0003e.png)
Yes. Yes it does. Here we start faster than the “GNU `grep` (CLI)” above, but take a bit more time the more matches we find, labeled “`ripgrep` (CLI)”. Including line splitting, we’re competitive compared to `nps`. This is marked as “`ripgrep` (CLI, rs)”.

### `Tantivy`

Next, we put ChatGPT’s favorite through the wringer. Note that we are dropping the search for `e`, since Tantivy cannot find it with the trigram matching in place.

![Give Me Data, Yesterday](/assets/give-me-data-yesterday-6e7b6b2c.png)
While reasonably fast for few matches, it becomes pretty slow for increasing hits. Sad pony. After whining to ChatGPT about it, it suggests that it could have to do something with the number of files to be read. Doubtful, since it *can* be fast for few matches. I’m not sure why it can’t keep up.

### `DuckDB`

We are probing three ducklings, one that uses `ILIKE`, one that uses `regex`, and the self-made `trigram` indexing.

![Give Me Data, Yesterday](/assets/give-me-data-yesterday-fd04450a.png)
Ok, this is bad. Really bad. Remember that we have a logarithmic `y`-axis? The bump you see in the plot is the jump from 88 ms for searching for “nvim” to 2.3 s(!) for searching for “python”. For the letter “e” it probably uses the same fallback search that the other two versions have, since anything shorter than three letters not in the trigram index.

Apparently Gemini cannot successfully hallucinate a feature which would take a small team of software engineers weeks to create, tune, polish, and test.

Moving on. The other approaches are not disastrous, but they are not great either. Since DuckDB has to crawl through every row of data to find substring matches, that’s not too surprising. If we were searching for exact words *only*, that would look much different. But alas, we’re not.

### `SQLite`

How about the [most widely deployed SQL database engine in the world](https://en.wikipedia.org/wiki/Embedded_database#SQLite)?Fun fact, SQLite is open-source, but maybe not in a way you’d expect: instead of having a license attached, the code is entirely in the [Public Domain](https://sqlite.org/copyright.html).

![Give Me Data, Yesterday](/assets/give-me-data-yesterday-6b334e6c.png)
Nice. For few-result queries, SQLite is *really* fast. Approaching thousands of results, it’s on par with Rust `grep` and only takes a moderate performance hit beyond that.

### Summary

Here we condense the above results in a single plot and aim for the realistic worst-case scenario of searching for “python”. The results are not spanning orders of magnitude, so the `y`-axis is back to linear.

![Give Me Data, Yesterday](/assets/give-me-data-yesterday-ad585d61.png)

## Comparing Speed for Future `nps`

To cut an entirely too long story slightly shorter, we get pretty much comparable results for querying the “detailed” database.

![Give Me Data, Yesterday](/assets/give-me-data-yesterday-aa3c82c3.png)
Let’s condense the above results in a single, easy-to-interpret table.

![Give Me Data, Yesterday](/assets/give-me-data-yesterday-cf19c14b.png)
So far Rust `grep` and `ripgrep` are leading the pack, with SQLite and GNU `grep` hard on their virtual heels.

### Database Size

That one is easy, we ask the disc usage tool `du`.

du --apparent-size -h *Break-down of the arguments:

* `--apparent-size` - show the size of the files as they would be without file-system compression, and
* `-h` - human-readable output, e.g. `M` for megabytes instead of just bytes.

On top of the plain size (as it would appear on a user’s machine), we also compress the databases with `gzip` to see how large a typical download would be.

$ du --apparent-size -h *
63M     detailed.sqlite
28M     detailed.sqlite.tar.gz
15M     detailed_duckdb.db
6.3M    detailed_duckdb.db.tar.gz
169M    detailed_duckdb_trigram.db
48M     detailed_duckdb_trigram.db.tar.gz
30M     detailed_tantivy_index
21M     detailed_tantivy_index.tar.gz
46M     minimal.sqlite
23M     minimal.sqlite.tar.gz
4.8M    minimal_duckdb.db
2.9M    minimal_duckdb.db.tar.gz
148M    minimal_duckdb_trigram.db
42M     minimal_duckdb_trigram.db.tar.gz
23M     minimal_tantivy_index
15M     minimal_tantivy_index.tar.gz
25M     package_list_detailed.txt
4.7M    package_list_detailed.txt.tar.gz
8.5M    package_list_minimal.txt
2.3M    package_list_minimal.txt.tar.gzIn the same discussion we also need to have a look at what updating the database with fresh package information would look like.

For plain text files, we would either download the whole thing from scratch, or supply diff information, so the existing file could be “patched” with the updates. This would work on a per-row basis which is unfortunate, considering that most of the time you would have an updated version number. To make things worse, the diff would need to indicate the old data *and* the new data. Not great.

Tantivy cannot directly change data, but works with “delete” files that ignore entries. Once a data fragment is ignored in its entirety, it can be deleted. In practice this would mean that the local database size would slowly grow with “delete” files, until a whole, fresh database would be downloaded. The same per-row gotcha from plain text files applies here as well.

DuckDB and SQLite not only support incremental updates, they also store the data as fields. This allows the updates to be tiny, containing just the information that has changed. This does require some data-dance of “downloadable full databases” and “incremental update files” as well as logic to combine those, but this is solvable.

Summarized in a table:

![Give Me Data, Yesterday](/assets/give-me-data-yesterday-acd39667.png)

### RAM usage

For both “minimal” and “detailed” searches:

![Give Me Data, Yesterday](/assets/give-me-data-yesterday-7ab29ec9.png)
This is excitingly unexciting. Ignoring the poor performance of DuckDB with bad `trigram` indexing, the worst contender only uses a smidgen more than 30 Mb of RAM. This is fine for all but embedded systems, which would be outside the target group.

## Conclusion

Tallied up in one neat overview:

![Give Me Data, Yesterday](/assets/give-me-data-yesterday-fbc295ef.png)
The family of `grep`s were surprisingly fast. They did a splendid job up till now, but do not scale too well with additional information. Larger datasets also introduce the challenge of download size for updating package information.

Tantivy gallops quickly for few-result queries, but struggles a bit with large result sets. It’s unclear to me why that would be. Do let me know if you either know why, or point out where I made performance mistakes. Incremental updates are possible, but complicated.

The paddling (this is the actual collective noun!) of ducks did not fare too well, no thanks to the missing N-gram indexing. It’s probably plenty fast for retrieving exact words, but that’s not what we’re after here. B̶u̶i̶l̶d̶i̶n̶g̶ ̶t̶h̶e̶ ̶i̶n̶d̶e̶x̶ ̶o̶u̶r̶s̶e̶l̶v̶e̶s̶ *Gemini vibing the index* leads to the worst performance in all metrics. Shocker.

SQLite truly shines here. Speed is great, even with many matches. The only challenge is the increased database size due to indexing, but this can be solved by both extra compression for downloads as well as tiny diff files for updating existing databases.

Phew. That was longer than planned, but we finally have a candidate for the future `nps` implementation.

## Award Ceremony

Due to outstanding scores in the “update” category, as well as excellent speed scores, we are handing the “cup of brrrrrr” to SQLite.

🪶🏆👌

The question of the data source remains unsolved. For the short term, I will scrape and provide the package data myself. Maybe in the future, `nixpkgs` data could be offered as a SQLite database, or at least as a JSON file?

But that, dear reader, is a challenge for another day.

* They have their flaws as well. The packages that I want to check out are usually somewhere in the middle of a wall of text. Now I have to search the results of my previous search. Yay.
* [https://github.com/peterldowns/nix-search-cli](https://github.com/peterldowns/nix-search-cli) and [https://github.com/nix-community/nh?tab=readme-ov-file#nh-search](https://github.com/nix-community/nh?tab=readme-ov-file#nh-search)
* About 27%, or 132,108 vs 103,640 — as of January 2026.
* This form of indexing stores strings of N letters pointing to the word they are extracted from: “duc”, “uck”, and “cks” would point to the word “ducks”, for N=3.
