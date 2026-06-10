---
layout: post
title: "(Nano)Publish your research with Python"
date: 2021-05-31
author: Robin Richardson
published: true
source: medium
source_url: https://blog.esciencecenter.nl/nano-publish-your-research-with-python-b81aa54eb1a2
tags:
  - uncategorized

---

## Using nanopub, a high-level, user-friendly python interface to the nanopublication network

Subscribe*Remember me for faster sign in

For example, if you want to e.g. search for all nanopublications containing the text Picoides*:

which returns two results both pointing to the example nanopublication we just discussed:

{'np': '[http://purl.org/np/RAMzGwLotMRSQTHRCS15B6hvuYSyEupGnxZaFU3EmcItA'](http://purl.org/np/RAMzGwLotMRSQTHRCS15B6hvuYSyEupGnxZaFU3EmcItA'), 'description': 'Inter-species interaction of Picoides villosus with Ips', 'date': '2020-12-24T10:51:43.931Z'}
{'np': '[http://purl.org/np/RAMzGwLotMRSQTHRCS15B6hvuYSyEupGnxZaFU3EmcItA'](http://purl.org/np/RAMzGwLotMRSQTHRCS15B6hvuYSyEupGnxZaFU3EmcItA'), 'description': 'Picoides villosus', 'date': '2020-12-24T10:51:43.931Z'}You can then fetch a specific nanopublication directly using its URI:

This snippet will fetch the nanopublication we discussed earlier, about the interaction of the bird and the beetle, and print the contents of its assertion. Of course, you are not limited to simple text searches. The library has several search methods, including finding nanopubs with a given triple pattern — you can find detailed documentation [here](https://nanopub.readthedocs.io/en/latest/searching.html).

## Hold on, I want to publish Nanopublications of my own!

To publish to the nanopub server you need to set up your profile. This allows the nanopub server to identify you. Run the following interactive command (on the command line):

setup_nanopub_profileIt will add and store RSA keys to sign your nanopublications, publish a nanopublication with your name and ORCID iD to declare that you are using using these RSA keys, and store your ORCID iD to automatically add as author to the provenance of any nanopublication you will publish using this library.

You can then publish a quick claim:

Published to [http://purl.org/np/RA47eJP2UBJCWuJ324c6Qw0OwtCb8wCrprwSk39am7xck](http://purl.org/np/RA47eJP2UBJCWuJ324c6Qw0OwtCb8wCrprwSk39am7xck)View the resulting nanopublication [here](http://purl.org/np/RA47eJP2UBJCWuJ324c6Qw0OwtCb8wCrprwSk39am7xck). Note that the URI of your nanopublication is a signed hash of its contents, making its authorship verifiable and enforcing its immutability — known as a [trusty URI](https://doi.org/10.1007/978-3-319-07443-6_27).

Or, to leverage the true power of semantic technologies, you can build your own RDF graph of triples and publish that:

The above builds a graph containing a single triple that states (essentially) the concept pointed to by `www.example.org/timbernerslee`is of type Person. We use the [rdflib](https://github.com/RDFLib/rdflib) library to build the graph, but this is already a dependency of nanopub. A Publication object is then created, using that graph as its assertion, and finally published using the NanopubClient as before. The code produces the following output:

Published to [http://purl.org/np/RAfk_zBYDerxd6ipfv8fAcQHEzgZcVylMTEkiLlMzsgwQ](http://purl.org/np/RAfk_zBYDerxd6ipfv8fAcQHEzgZcVylMTEkiLlMzsgwQ)You can view the resulting nanopublication [here](http://purl.org/np/RAfk_zBYDerxd6ipfv8fAcQHEzgZcVylMTEkiLlMzsgwQ).

## Outlook

`nanopub` makes interacting with nanopublications quite intuitive for those with sufficient RDF and python skills. For all others we foresee tools built around `nanopub` that make it intuitive for domain-experts (but not RDF-experts) to make use of the nanopublication network.

There are a couple of those already in the making:

* [nanotate](https://github.com/nanotate-tool/nanotate): Create nanopublications from annotations in PDF-files made with [hypothes.is](https://web.hypothes.is/)
* [fairworkflows](https://github.com/fair-workflows/fairworkflows): Support the construction, manipulation and publishing of FAIR scientific workflows using semantic technologies. This is developed as part of the wider [FAIR is as FAIR does](https://www.esciencecenter.nl/projects/fair-is-as-fair-does/) project at the eScience Center.

## Conclusion

The python `nanopub` library provides a high-level, user-friendly python interface for the nanopub server, making it easy to publish and search small scientific publications. We created this library to bring nanopublishing to python users and we’re keen to help people make use of it.

Consider how [nanopublications](http://nanopub.org/wordpress/) might fit in with your field, and feel free to [try the library out](https://github.com/fair-workflows/nanopub)!

## Acknowledgements

The quality of this text was greatly improved by the suggestions of [Patrick Bos](https://egpbos.medium.com/), Tobias Kuhn, [Arnold Kuzniar](https://orcid.org/0000-0003-1711-7961), Lars Ridder, [Pablo Rodríguez-Sánchez](https://medium.com/@pab.rod), and [Stefan Verhoeven](https://medium.com/@s.verhoeven).
