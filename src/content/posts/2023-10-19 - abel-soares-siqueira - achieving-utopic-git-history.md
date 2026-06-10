---
layout: post
title: "Achieving Utopic Git History"
date: 2023-10-19
author: Abel Soares Siqueira
published: true
source: medium
source_url: https://blog.esciencecenter.nl/achieving-utopic-git-history-4cc2a1fd3107
tags:
  - uncategorized

---

## AKA being UGHly

In a previous blog post, we defined [The Utopic Git History](/the-utopic-git-history-d44b81c09593) (UGH). To refresh our memory, a simple definition of a UGH is

* Atomic git commits (smallest commit that completes the task)
* Passing tests
* Linear Git history

In that post, I mentioned that the easiest way to achieve UGH is to squash a self-contained pull request into a single commit. Otherwise, you have to use more advanced git commands to achieve UGH. This blog post deals with that.

The target audience for this post is Git users who want to learn intermediate and advanced commands that splice, merge, and fix commits. If you need a refresher on some of the concepts used, please take a look at the [animations in my previous blog post](/the-utopic-git-history-d44b81c09593).

## Introduction

The ideal way of achieving UGH is to write exactly what you have to write, and then commit that. This kind of insight is hard to come by when your task is large, so instead let’s focus on what happens in practice, which involves getting our hands dirty.

Getting your hands dirty. Left photo by [Jeremy Bishop](https://unsplash.com/photos/KFIjzXYg1RM) on [Unsplash](https://unsplash.com/). Modifications by me.

## Before committing

The first thing that we can control is what to commit. So let’s assume that we got to a point where we have a lot of modifications because task A turned out to be too large and now we’re thinking of splitting it into A1 and A2 (maybe more).

Here, `git add -p` comes into play. `git add -p` lets us add patches **of code separately. So if our file has modifications for tasks A1 and A2, we can add only the first one.

**Tip: **If there is an untracked file that we want to selectively add, it can be included using `git add -N FILE` . This will tell git to track the file, but it doesn’t stage it.

When we run `git add -p FILES`, we see something like

diff ...**...
- Something
+ Something else
...
(1/n) Stage this hunk [y,n,q,a,d,s,e,?]?Pressing `?` will show the help. There are four commands that matter a lot to us. The first two are y and n, for yes and no. If we say yes, the “hunk” (a piece of code shown in this diff) will be staged. Remember, when we `git commit` (no `-a` flag), the staged part of the code will be added to the commit. If we say no, then it just moves on to the next hunk.

The third command is the best: s, for split. If the hunk that we see on the screen is too large, or if it involves parts A1 and A2, then we want to split it. Git will try to find a place to split this code and give you smaller hunks. Then we can decide whether to add or not those new smaller hunks individually.

Split doesn’t always work, so what we can do instead is use the command e, for edit. Editing will open an editor, so if you don’t like Vim (the default), you can change it with

git config --local core.editor "code --wait"In the command above, `code --wait` will open VSCode. Change it to your preference. Also, you can configure it globally using `--global` instead of `--local` .

After running `git add -p` and selecting the command e, we will get to the editor with the same diff open and some additional information.

The first column of the hunk can be empty, to indicate that the code doesn’t change, `#` to indicate a comment that will be ignored by git add, a `-` to indicate that the line should be removed, and a `+` to indicate a new line replacing the old one.

Now, we can manually decide on each individual addition. Let’s look at an example:

Our initial code is

x = 1
y = 2
z = x + y
w = x + 1Now, our task A1 is to rename y to p, and task A2 is to change all additions to subtractions.

The resulting code after doing both tasks is

x = 1
p = 2
z = x - p
w = x - 1The diff, which we will see when we enter edit mode, is the following:

# Manual hunk edit mode
 x = 1
-y = 2
-z = x + y
-w = x + 1
+p = 2
+z = x - p
+w = x - 1Clearly, tasks A1 and A2 are mixed and can’t be split. So instead, we manually change the diff. Since we want only A1 applied, we change the diff to

 x = 1
-y = 2
-z = x + y
+p = 2
+z = x + p
 w = x + 1In other words,

* Change `-w = x + 1` to `[space]w = x + 1`
* Remove line `+w = x - 1`
* Move the two + lines one line up
* Change `+z = x - p` to `+z = x + p`

Please notice that the lines starting with a minus sign can’t be modified, because they must match with the current code. If you want to make modifications to a line that has a minus, look for the corresponding plus and change that instead. If there is no corresponding plus, it means that the line is simply being removed, so you can add a line with a plus yourself.

Now, if we look at your git status, we will see the same file appearing in and out of the staged section. We can use `git diff --staged` to check the result.

## Oops, too late (one commit with multiple tasks)

Let’s say that we have one commit with multiple tasks, i.e., one commit that should be split into more than one.

For instance, we might have spent 10 minutes meticulously editing what should be staged using the `git add -p` command, when by mistake we use `git commit -a` and add every unstaged modification in the commit as well, wasting all this work. Completely hypothetical, mind you.

There is a quick way to “fix” this which is to run `git reset HEAD~1`. This will remove the commit and go back to the modified state. To be clear, we don’t lose the modifications made in the commit, as they will be back into the modified state, but we lose the previously staged information in those 10 minutes of work.

The `git reset HEAD~1`command assumes that the latest commit is the one that we are fixing. If that is not the case, check the next session.

As a rule, always back up your branch** whenever you run reset and rebase until you are confident that you can get yourself out of tricky situations. Backup, in this case, means creating a new branch, e.g., `git branch backup-some-name`.

## Too many commits

Let’s say that we ended up making too many commits. For instance, we were trying to follow the idea above, but noticed some bugs that should be part of task A1, and ended up creating another commit to fix that. Or that we realized that we introduced a bug that had no test when doing A2.

As an example, consider the following initial state of a file `main.py` :

def foo():**    x = 1
    y = 2
    z = x + y
    w = x + 1

    return w

def bar():
    y = 1
    return y + foo()And the following git history:

* hash00: Older stuff *← Where we are right now*
* hash01: Rename variable y to p
* hash02: Change + to -
* hash03: Rename y to p and change + to — in function `bar` also
* hash04: Fix linting issue (add spaces around operators)

The `hash01` and `hash02` commits are the ones we did in the previous sections. The `hash03` commit is

 def bar():
-    y = 1
-    return y + foo()
+    p = 1
+    return p -foo()And the `hash04` commit is

 def bar():
     p = 1
-    return p -foo()
+    return p - foo()This git history is not great. We still only have two tasks (A1 and A2), but 4 commits. What we want to do is redistribute the work done in these 4 commits into 2 commits. For that, we use `git rebase -i`, i.e., interactive rebase.

> 

Note**: There is an alternative to rebasing here, which is to run `reset hash00`, so that we remove all the commits but none of the modifications. From there we will have to manually add the changes using `git add -p` and then make individual commits. I prefer the rebase strategy. What are your thoughts about these two strategies?

The interactive rebase command allows us to reorder and squash commits, change the commit messages, and stop during rebasing to make additional changes (such as splitting older commits).

The first thing that we need to do is find that git history. If you use a visual tool, you can just look at the graph. Otherwise, we can issue the command

git log --graph --onelineThis will produce a graph of the commits, one per line, which should be easy to read. It should be something like

* hash04: (feat_br) Fix linting issue (add spaces around operators)*** hash03: Rename y to p and change + to - in function bar also
* hash02: Change + to -
* hash01: Rename y to p
* hash00: (main) Older stuffThis assumes that we branched out of `main` into a branch called `feat_br`. Now, to start rebasing, we can issue

git rebase -i main feat_brIn other words, it is just the normal rebase command, but now we add the `-i` flag to have more options on how to rebase.

This command should open an editor with the list of commits preceded by a keyword `pick`:

pick hash01 Rename y to p
pick hash02 Change + to -
pick hash03 Rename y to p and change + to - in function bar also
pick hash04 Fix linting issue (add spaces around operators)Notice that the commit at `main` is not included, as expected.

What we can do now is change the order of these commits as we see fit and change the keyword to the action that we want. Notice that the order of the commits is top-to-bottom.

The main options are:

* pick: Use this commit. It will be applied, and the message will be used.
* drop: Don’t use the commit. It will be lost.
* reword: Use this commit, but open the editor to modify the commit message.
* squash: Merge the contents of this commit in the previous commit and then open the editor for editing the commit message. By default, it appends the commit messages of squashed commits.
* fixup: Like squash, merge the contents into the previous commit, but ignore the message.
* edit: Use this commit and the message, but after the commit is done, stop so we can make edits.
* break: Use by itself in a new line. It will drop us in the terminal to do whatever we want.
* exec: Use by itself followed by a command. It will run the command, and if there is an error, drops us in the terminal to do whatever we want.

Whenever we are dropped in the terminal during rebase, we can always issue `git rebase --abort` to stop the rebase completely and go back to where we were.

If we were dropped in the terminal because there is a problem, for instance, a conflict, then we must fix it.

After fixing whatever caused us to be dropped into the terminal (check with `git status` ) we have to use `git rebase --continue` to continue rebasing.

Going back to our example, the first thing that we’ll do is split the `hash03` commit. To do that, we simply change we `pick` to `edit` , save and close.

pick hash01 Rename y to p
pick hash02 Change + to -
edit hash03 Rename y to p and change + to - in function bar also
pick hash04 Fix linting issue (add spaces around operators)This will drop us in the terminal with

Stopped at hash03...  Rename y to p and change + to - in function bar also
You can amend the commit now, with

  git commit --amend 

Once you are satisfied with your changes, run

  git rebase --continueNow, we will use `reset` to undo this single commit and add only the change for task A1.

git reset HEAD~1
git add -pMake the first commit diff look like

 def bar():
-    y = 1
-    return y + foo()
+    p = 1
+    return p + foo()And the second looks like

 def bar():
     p = 1
-    return p + foo()
+    return p -foo()Now we can run `git rebase --continue` and `git log --graph --oneline` again to obtain:

* newh03: (feat_br) Fix linting issue (add spaces around operators)
* newh02: Fixing task A2
* newh01: Fixing task A1
* hash02: Change + to -
* hash01: Rename y to p
* hash00: (main) Older stuffNotice that the hashes changed only after we effectively rebased.

Now, we will use `git rebase -i main feat_br` again, but this time we will move things around and change `pick` to `fixup` .

We start with

pick hash01 Rename y to p
pick hash02 Change + to -
pick newh01 Fixing task A1
pick newh02 Fixing task A2
pick newh03 Fix linting issue (add spaces around operators)And change to

pick hash01 Rename y to p
fixup newh01 Fixing task A1
pick hash02 Change + to -
fixup newh02 Fixing task A2
fixup newh03 Fix linting issue (add spaces around operators)This will apply the first commit and then fix it, leaving only a single commit. Then, it will apply the second commit and fix it twice. None of these changes led to conflicts.

At the end of this process, our log is

* more02: (feat_br) Change + to -
* more01: Rename y to p
* hash00: (main) Older stuffIn other words, we have achieved UGH for this branch.

## Splitting a branch into many branches

Now that we have two commits, one for each task, it makes sense to actually have two branches: one for each commit.

Since the commits are atomic, this is actually very easy to do unless **the branches depend on each other.

The first task is just the first commit in our case, so we only need to give it a branch name:

git branch feature_taskA more01In other words, we are creating a branch called `feature_taskA` at the commit with hash `more01`. Push this branch

git push -u origin feature_taskAIt can be reviewed and rebased.

Now, let’s split into two situations.

### Splitting independent branches

If the commits are independent, we just have so now where they start and rebase rooted there.

Normally, we are rooted in main, as in our example above. So we can issue

git rebase --onto=main feature_taskA feat_brHere, we are saying “Take all commits after `feature_taskA` (exclusive) that are part of branch `feat_br`, and reapply them on top of the branch `main`.” We can use a hash instead of `main` , if necessary.

This can lead to conflicts, even if there is no real dependency between the commits. If the conflicts are significant, then it is better to treat them as dependents. The conflicts that appear here will reappear when we try to merge these two branches into main.

### Splitting dependent branches

If the branches are dependent, then we should actually wait until the first part is merged before rebasing.

When the first part is merged (let’s assume with GitHub’s rebase), then we now have a new `main`, with other commit hashes. In that case, we can simply issue a rebase and the commits that already appeared on the merged branch will be skipped, by default.

However, this depends on configuration values, so it is safer to just use exactly the same commands as before, but don’t forget to update your main branch.

git switch main**git fetch --all
git merge --ff-only upstream/main
git rebase --onto=main feature_taskA feat_brIn other words, the only difference between the independent and dependent cases is when** to rebase. If the branches are independent, you can split and push both, since they can be reviewed and merged independently. If the branches are dependent, then we wait until the first branch is merged and rebase after updating main.

## Remote changes

The last thing to discuss is the changes that could be happening in the remotes while we’re making changes.

Let’s assume in this section that we have two remotes:

* `upstream`: Points to the main repo, e.g., the organization’s repo.
* `origin`: Points to our fork.

First of all, my preferred way to work is to make sure that my atomic commit is up to date with the remote branch. So first of all, I fetch everything, update `main` with the fast-forward option, and **branch from main**.

git fetch --all
git switch main
git merge --ff-only upstream/main
git switch -c featureXIf the merge had conflicts, it means that we made commits to `main`, and we shouldn’t. We fix this by creating the branch now and resetting main:

git switch main
git branch featureX # just creates, does not switch
git reset --hard upstream/mainNow, after working on branch `featureX`, we check for updates on `main `again, using `fetch` and `merge --ff-only`. If there were any changes to main, we rebase after pushing:

git rebase main featureXWe might have conflicts, but since our branch is atomic, they should be few and far between.

After rebasing, we push:

git push -u origin featureXNow, let’s say that we had to make changes because of the review. After making our changes, we use interactive rebase to make sure that the commits are atomic again. Our branch will not be in sync with the remote branch anymore, because the commits have changed (either in content or in hash).

That means that we now have to force-push our branch:

git push --force featureXThis should be enough to update the pull request.

### Final remarks

These commands should help you handle most git situations. They are not easy to master, so I hope that this post serves as a quick way to remember what each command does. Let us know what other Git needs you have.

Be UGHly, my friend.

Many thanks to our proofreaders and reviewers *[*Barbara Vreede*](https://www.esciencecenter.nl/team/dr-barbara-veede/)* and *[*Pablo Rodríguez-Sánchez*](https://www.esciencecenter.nl/team/dr-pablo-rodriguez-sanchez/)*.*
