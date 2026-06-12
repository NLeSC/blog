---
layout: post
title: "How to manage your IP address in Python"
date: 2024-02-27
author: Flavio Hafner
published: true
source: medium
source_url: https://blog.esciencecenter.nl/how-to-manage-your-ip-address-in-python-75a2c9eda648
tags:
  - API
  - Collaboration
  - Community
  - Data Science
  - Linux
  - Python
---

> 

This post is the first of a series of blog posts arising from a collaboration between the eScience Center and the ODISSEI Social Data Science Team. You can find this text also at [https://odissei-soda.nl/tutorials/](https://odissei-soda.nl/tutorials/).

Research often relies on accessing novel data, for instance by collecting them from the internet through web scraping. If you have ever tried this, you may have run into your IP address being blocked by the website you scrape. Websites do this with a good reason — to protect themselves against malicious acts, such as [denial-of-service attacks](https://en.wikipedia.org/wiki/Denial-of-service_attack) or large-scale scraping by parties with ill intent. This makes sense from the websites’ perspective, but prevents you from answering your research question.

But this problem can be solved. In this tutorial, we show how you as a researcher can use IP rotation to circumvent certain scraping protections with the `sirup` package, which works on Linux operating systems.

Before we jump into it, it is important to highlight that web scraping and IP rotation need to respect the law and should only be a last resort. For instance, before you scrape data from a website, you should ask the data owner whether they are willing to make them available to you through a data sharing agreement. If you nevertheless decide to scrape the data, you should get approval from the ethical review board at your university. Moreover, do only scrape data that are publicly available on the web and do not send excessive number of requests to the website in a given time.

![How to manage your IP address in Python](/assets/how-to-manage-your-ip-address-in-python-00102567.jpg)

Photo by [Glenn Carstens-Peters](https://unsplash.com/@glenncarstenspeters?utm_source=medium&amp;utm_medium=referral) on [Unsplash](https://unsplash.com/?utm_source=medium&amp;utm_medium=referral)

For rotating the IP address, we will use a VPN service. [Here](https://azure.microsoft.com/en-us/resources/cloud-computing-dictionary/what-is-vpn#:~:text=A%20VPN%2C%20which%20stands%20for,and%20firewalls%20on%20the%20internet.) you can read more about what a VPN service is—in short, the service has a bunch of remote servers, and connecting your computer to one of these servers changes your IP address.

## What you need

## 1. `OpenVPN`

[OpenVPN](https://en.wikipedia.org/wiki/OpenVPN) is a system that allows you to create secure VPN connections. You can install it by following [these instructions](https://community.openvpn.net/openvpn/wiki/OpenvpnSoftwareRepos).

## 2. Root access to your computer

Because internet connections are an important security concern, OpenVPN requires root access — this is the equivalent to administrator rights on a Windows computer. If you have root access, you can for instance run the following command on your terminal:

sudo ls -lh # will ask you for your root password

## Installing and setting up `sirup`

You can install `sirup` as follows:

python -m pip install sirupTo use the package and change your IP address, you need an account with a VPN service provider that offers OpenVPN configuration files for your account. At the time of writing, for instance ProtonVPN and Surfshark offer this option — note that these services are not for free. We will use ProtonVPN in this tutorial.

After creating an account, you need to download two sets of files.

First, you download credentials that identify your Proton account when using OpenVPN. On the ProtonVPN website, click on “Account” and then you see something like this:

![How to manage your IP address in Python](/assets/how-to-manage-your-ip-address-in-python-0efd650a.jpg)
Copy and paste the username and the password into a `txt` file that looks like this:

username
passwordThen, save the file as “proton_credentials.txt”. Remember where it is stored — we will need it later.

> 

A first warning on security. **Storing account credentials like this makes it easy for you to use the sirup package. But it also increases the risk that unauthorized persons get a hold on these credentials. Thus, be careful to store the credentials in a safe place on your laptop and to not share them with anyone.

Second, to use OpenVPN we need configuration files, whose names end with `.ovpn`. The files allow OpenVPN to connect to a server from the VPN service provider. In ProtonVPN, go to the "Download" section of your account. Select the options as follows:

![How to manage your IP address in Python](/assets/how-to-manage-your-ip-address-in-python-1c18ffaf.jpg)
And download the configuration file(s) you want to use. Store the downloaded files on your computer, and remember the location.

## Using `sirup`

We start by defining the path to the `proton_credentials.txt` file. When you execute the code below, you will be asked to enter the root password, which is necessary to make the connection.

import getpass
auth_file = "proton_credentials.txt"
pwd = getpass.getpass("Please enter your root password:")
> A second warning on security.** The code above stores your root password during the Python session without encrypting it. This is OK to do on your laptop — if someone gets access to your Python session, your security has already been compromised — but not recommended on a shared computer such as a cluster or a cloud service.

### Changing the IP address with `sirup`

Now you can use the `VPNConnector` to change our IP address. We will use the `"my_config_file.ovpn"` configuration file.

from sirup.VPNConnector import VPNConnector
config_file = "my_config_file.ovpn"The code below first connects to the server associated with `"my_config_file.ovpn"` and then disconnects.

connector = VPNConnector(auth_file, config_file)

# Let's see the current IP address when no VPN tunnel is active
print(connector.base_ip) 

connector.connect(pwd=pwd)

# Now the IP address should differ
print(connector.current_ip)

connector.disconnect(pwd=pwd)

# Now current_ip should be the same as base_ip above
print(connector.current_ip)

### Rotating the IP address with `sirup`

Instead of connecting to a single server, you can also rotate across many different servers — which means you rotate your IP address across a set of potential addresses. Doing so is useful for larger scraping jobs because it will spread your requests across more servers.

To do this, you need to download multiple configuration files as described above. Store all of the `.ovpn` configuration files together in a separate directory. Let's say you store them in the `"/path/to/config/files/"` directory. You need to define this path in your Python script:

config_path = "/path/to/config/files/"The following code connects to two different servers before disconnecting again:

from sirup.IPRotator import IPRotator

rotator = IPRotator(auth_file=my_auth_file, config_location=config_path, seed=seed) # this will ask for the root password

print(rotator.connector.base_ip) 

rotator.connect()
print(rotator.connector.current_ip) 

rotator.rotate()
print(rotator.connector.current_ip) 

rotator.disconnect()

print(rotator.connector.current_ip)

## Conclusion

This tutorial has walked you through the steps to manage your IP address in Python, using the `sirup` package. We hope it makes your scraping workflows easier!

> 

`sirup` is an open-source package developed by the Netherlands eScience Center. If you use the tool, you can cite [this zenodo repository](https://zenodo.org/records/10261949) with the DOI: [https://doi.org/10.5281/zenodo.10261949](https://doi.org/10.5281/zenodo.10261949).

The source code of the package is [here](https://github.com/ivory-tower-private-power/sirup?tab=readme-ov-file), where you can contribute to it, build on it and submit issues.

Thanks to Patrick Bos, Peter Kalverla, Kody Moodley and Carlos Gonzalez Poses for comments.
