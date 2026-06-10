---
layout: post
title: "Automate chores with GitHub Actions"
date: 2021-03-05
author: Patrick Bos
published: true
source: medium
source_url: https://blog.esciencecenter.nl/automate-chores-with-github-actions-73153a6c85d3
tags:
  - uncategorized

---

## How I keep my Heroku web-app’s data up-to-date automatically

This can all be done with a shell script that looks roughly like this:

#!/usr/bin/env sh
set -e                    # make the script end on errors****python update_numbers.py  # download new data and dump to files****git add [the updated files]*****git commit -m "updated data"The Python script does the actual data downloading and mangling and dumps the results into files that the web-app uses. These are then committed to the repo.

To run this script (in particular the `git commit`), you do need to configure the git client on the GitHub Actions runner. You can do this with a workflow step at any time before running the commit command. Add this to your workflow job in the yml file:

- name: configure git user
  run: |
    git config --local user.email "${{ github.actor }}@users.noreply.github.com"
    git config --local user.name "${{ github.actor }}"This commits under your own GitHub user name (or, in general, the username of the one that triggers the workflow to run), so it’ll identify the commits to be yours. It won’t do certification unless you also somehow configure that (perhaps using GitHub secrets, see the Heroku section below). You can fill in any name you want, though, so you could also put something like “Actions bot”.

## Push back to your GitHub repo

One of the beauties of GitHub Actions is the great availability of … well, Actions. These are pre-baked recipes for steps that you can very conveniently plug and play. To be precise, you can add such a step to your job, which is part of your Actions pipeline.

For the next step, I needed to push the commit made above into the GitHub repo from within the GitHub (Actions) infrastructure itself. I was a bit anxious about whether I would find an Action which allowed me to do this. It feels like a potential security leak. Luckily, it turns out [there is already an Action for this very task](https://github.com/marketplace/actions/github-push#example-workflow-file). Hurray! The [Action’s source](https://github.com/ad-m/github-push-action) can easily be checked if you’re worried about security.

Just add the following step to your job after running the update script:

- name: Push changes
  uses: ad-m/github-push-action@v0.6.0
  with:
    github_token: ${{ secrets.GITHUB_TOKEN }}
    branch: ${{ github.ref }}For this to work, one more step is necessary. You also need to add two options to your checkout step (at least, this is what I figure from the [Action docs](https://github.com/marketplace/actions/github-push#usage)):

- uses: actions/checkout@v2
  with:
    persist-credentials: false
    fetch-depth: 0That’s it!

## Deploying to Heroku

Finally, after the data has been updated in the Git repo, the Coalitiewijzer app can be deployed back onto Heroku (which runs [the app, live here](http://coalitiewijzer.herokuapp.com)). Heroku deployment can be done by just pushing your repo directly to the Heroku servers. Really convenient!

So, since this is again just a git push, albeit to a different repo, this should not be a problem. And, indeed, a [Deploy to Heroku Action already exists](https://github.com/marketplace/actions/deploy-to-heroku) for this very purpose!

To make this work, you need to add your Heroku API key [to your GitHub repo’s secrets (instructions here)](https://docs.github.com/en/actions/reference/encrypted-secrets#creating-encrypted-secrets-for-a-repository). You can find the Heroku API key in your [Heroku account](https://dashboard.heroku.com/account). Call it `HEROKU_API_KEY` if you want the snippet below to work.

After that, you just add the action to your workflow job, like described in the action’s documentation (replace the boldfaced parts):

- uses: akhileshns/heroku-deploy@v3.10.9 # This is the action
  with:
      heroku_api_key: ${{secrets.HEROKU_API_KEY}}
      heroku_app_name: your_app_name_on_heroku****      heroku_email: your@email.address**Be careful with this key, because it gives access to your full Heroku account.

And that’s it! From now on, your updates will be pushed back to the GitHub repo and deployed on Heroku.

Of course, this is just one of many things you could automate using GitHub Actions. The combination with running actual servers on Heroku for free is icing on the cake. Of course, if you want more performance, more MBs, more connections, etcetera, you can pay them for that. But for low profile web-apps, the free package is really a great deal.

Let me know if you have any comments or questions. I’m happy to help!
