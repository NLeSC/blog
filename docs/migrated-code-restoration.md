# Migrated code restoration

This audit supports [issue #21](https://github.com/NLeSC/blog/issues/21). It covers the 278 Medium-migrated posts dated 2017–2026, including examples whose fences or surrounding introductory sections were lost. It does not change the Markdown renderer.

All year-range passes are complete: 278 posts audited, with repairs in 69 posts. Twelve omitted source images were also recovered from the immutable backup. Seven unavailable embedded examples remain documented below.

## Sources and approach

The primary comparison source is the [pre-migration Markdown backup](https://github.com/nlesc-blogging/markdown-backup/tree/a70d8e9d82c28b194c9310fda94ded5a4ad84ff3/posts), pinned at `a70d8e9d82c28b194c9310fda94ded5a4ad84ff3`. This repository is private and requires organization access. Publication dates and titles sometimes differ from the migrated filenames, so articles were matched by their text as well as their titles.

The audit checked original examples against migrated text, rather than only looking for recognizable surviving code. Restorations recover code fences, language labels, literal operators/HTML, line breaks, and source-backed context for completely missing examples. Existing image assets were reused with descriptive alt text; published routes and post frontmatter were preserved.

Some backup examples already contain joined statements or comments. Where existing tokens were separated or reindented, that is inferred formatting—not a claim that pre-export line breaks were retrieved. Published technical mistakes and intentional excerpts remain unchanged. These archival examples have not been executed or certified runnable.

Additional author-owned sources include:

- [Easier Docker in Python: article snippets](https://github.com/jhidding/easy-docker.py).
- [C++/WebAssembly article series](https://github.com/NLESC-JCER/run-cpp-on-web): the `webassembly`, `react`, `vega`, `web-worker`, and `kitchen-sink` article READMEs.
- [Parallel Python erratum](https://gist.github.com/jhidding/e08c3096b5c54bf2138ca248625de029) and [Parallel R article source](https://github.com/PabRod/blog-parallelR/blob/master/parallelR.Rmd).
- [Original shell-testing example](https://github.com/NLeSC/python-template/blob/90273feba08376faea12cd154479ba64fbccf81d/tests/test_project.py), [Twitter workflow](https://github.com/egpbos/covid_vaccine_progress_bot/blob/e9d4eced48f315567c224f19068ab6bd8206020c/.github/workflows/tweet_progress.yml), and [Travis configuration](https://github.com/roofit-dev/root/blob/travis_trusty2018_update/.travis.yml).
- [IP rotation tutorial](https://odissei-soda.nl/tutorials/ip-rotation/).
- [Julia embedding article sources](https://github.com/abelsiqueira/julia-from-cpp/tree/60abbe6eab216f6123d2af3008fb3c60f29470a3) and [the Mcfly article's historical tutorial notebook](https://github.com/NLeSC/mcfly-tutorial/blob/bbd7881a27dd74f2e991cd5c0da8e6774c2dc808/notebooks/tutorial/tutorial_quick.ipynb). Named author files and historical notebook cells recover omitted examples; the exact selections of vanished Medium embeds cannot be asserted. Reconstructed combinations of files were not substituted.
- [Debugging journey author Markdown](https://github.com/suvayu/suvayu/blob/master/blog/2025-02-15-duckdb-julia-windows.md) and [missing-symbols follow-up](https://github.com/suvayu/suvayu/blob/master/blog/2025-03-16-duckdb-mingw-inline-fn.md).
- [Bring Your Own Backend author Markdown](https://github.com/sverhoeven/byob-todo-frontend/blob/main/blog/README.md).
- [Give Me Data, Yesterday: original article](https://ole.mn/posts/2026-02-data-cache/).
- [Medium publication RSS](https://medium.com/feed/escience-center), retrieved 2026-11-03, corroborating the BYOB, FOSDEM, and AI-declaration examples.

## Recovered embedded examples

The backup omitted some embedded examples entirely. The following author-owned gists identify additional source-backed restorations:

| Article | Source gists |
| --- | --- |
| Snakemake and Xenon | [Xenon submit command](https://gist.github.com/jspaaks/cfcba53c0c81934afe68254f57126ccc) |
| Pytest cookbook | [Temporary folder](https://gist.github.com/felipeZ/a8c4e7b7ff8a831ec1f0337e442307c4), [mocking](https://gist.github.com/felipeZ/23a4150c32f5c426e030beddbb67f856), [combined fixtures](https://gist.github.com/felipeZ/1cecca9c5f6fca1d00ea16bf4c23b7c2), [exceptions](https://gist.github.com/felipeZ/66ea367c1b4f285a0989d04d953dad63), [skipping](https://gist.github.com/felipeZ/4f9887ab7e51e90b5edc1db8a20a592b), [MyPy](https://gist.github.com/felipeZ/d976a738856d4373cbceccc52037f478), [documentation](https://gist.github.com/felipeZ/a8e550f9616ab3201ec3ecab699ef2e7), [async](https://gist.github.com/felipeZ/994131e6a3dd0097428401606deba363), [parameters](https://gist.github.com/felipeZ/c3ad9aba9cebe1931b33e6d723aec5d5) |
| Nanopublications | [Client](https://gist.github.com/raar1/ec0a562cf45fdffabfe618d70c39444a), [search](https://gist.github.com/raar1/ab7003b7047e8bac3549151318c2ef35), [fetch](https://gist.github.com/raar1/b751c3b1a7d1b6874ee1ae6cb5a1c397), [claim](https://gist.github.com/raar1/4b2b17a5f399c025aa531b9c05b3347f), [custom assertion](https://gist.github.com/raar1/a468cb64086097966b8c850adfb0c37d) |
| Rust numerical applications | [Eigenvalues example](https://gist.github.com/felipeZ/5191e5f499e06092fc10ee2515499af7) |
| Containerized NetLogo on HPC | [Definition](https://gist.github.com/lyashevska/324889c574859d720a9f782f08ae6752), [build](https://gist.github.com/lyashevska/19f0465dc852ec15e469b18ff3d5cf01), [model job](https://gist.github.com/lyashevska/38fb02ccf15d83248e505ad097327f4c), [submission](https://gist.github.com/lyashevska/0232bd8ae7a2db2e274e7c40a028f1f3) |

Gist filenames, authors, dates, descriptions, and contents were checked against the article context. Original code defects were preserved, apart from trimming line-end whitespace. Medium's embedded `/media/.../href` redirect chain could not be verified because those endpoints returned HTTP 403; do not confuse a strong author-source match with a verified redirect chain.

## Unresolved source gaps

Seven examples remain unavailable; no approximate replacement was inserted:

- **Snakemake and Xenon:** the native Grid Engine and Slurm submit commands. The [author RSS](https://medium.com/feed/@jhspaaks) identifies embed targets [912f983dbbd1d28f1f0352ac81eb8e19](https://medium.com/media/912f983dbbd1d28f1f0352ac81eb8e19/href) and [e43c63543f7feee0eee898d5d9a0cd67](https://medium.com/media/e43c63543f7feee0eee898d5d9a0cd67/href), but retrieval is blocked. Author gist history contains scheduler-specific Xenon commands, not proven replacements for the native examples.
- **GraphQL/Ceiba:** the simplified query schema, mutation schema, and resolver. [Historical production code](https://github.com/nlesc-nano/ceiba/tree/1845e6adfe710949f2f544ec4a41745e4bd130e5/ceiba) has different statuses and arguments from the article's simplified examples. It was not substituted. No matching author gist or exact-article Wayback snapshot was found.
- **Embedding Julia in C/C++:** the original “Install Jill” and “Makefile (version 1)” embeds. The backup and original-article mirror retain their captions but not their code. Current/historical installer instructions and combinations of author Makefile revisions are not evidence of those exact examples, so they were not substituted.

Five current posts have no matching backup original: the 2019 dark-matter article; the 2020 AI speech-learning, evidence-for-research-software, and WOSSS19 articles; and the 2025 Floris-Jan interview. Their surviving text contains no code candidates, but original-content completeness cannot be asserted for them.

Keep issue #21 open until the unavailable examples are recovered or explicitly resolved editorially.
