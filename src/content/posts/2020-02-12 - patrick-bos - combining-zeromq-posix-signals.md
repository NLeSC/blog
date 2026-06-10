---
title: "Combining ZeroMQ & POSIX signals"
date: 2020-02-12
author: Patrick Bos
published: true
source: medium
tags:
  - uncategorized
---

## Use ppoll to handle EINTR once and for all

[image]

What my first experience trying to send out signals was like. Can anybody hear me? Photo by Jason Rosewell on Unsplash

I have been dabbling in using and mixing these two well known interprocess communication techniques for a few months now. Dabbling may not be the right word. More like desperately trying to find my way out of a dark room without a flash light.

Speaking of which, if you’re ever in [Nijmegen](https://en.wikipedia.org/wiki/Nijmegen), be sure to visit the [muZIEum](https://muzieum.nl/) and experience what it’s like to be blind. In their basement, they recreated everyday scenes and then made it completely, absolutely dark. It’s really a magnificent experience.

Anyway, once you’ve done that, you’ll know how I have been feeling lately trying to get ZeroMQ to play nice with POSIX signals… I hope that after reading this, you won’t have to feel the same way, if you don’t want to (if you do, visit Nijmegen, or stop reading now).

Specifically, I present here some **pitfalls and problems** of using **ZeroMQ** calls `send`, `receive` and `poll`, which are blocking calls (they pause the program until they get what they were waiting for), in **combination** with **POSIX** signals that interrupt these calls. In my case, initially, these calls were external, but eventually, I also wanted to actively trigger them myself. Both situations require different approaches.

Luckily, there is a **solution to the problems**, which I’ll also come to at the end of this article after a long winded description of the process of me wrapping my head around all of this. Long story short: I implemented a `ppoll` ZeroMQ call (yes, with double p).

But let's first set the scene before diving into details.

## Backstory

Our story takes place in the [ROOT C++ data analysis framework](https://root.cern/) for particle physics experiments, specifically in the RooFit package. (For the short, technical essentials of the following chronicle, skip down to the next header Technical overview.)

I’m building a system to run RooFit calculations in parallel on multiple processes. To do that, I need interprocess communication. For this, I chose ZeroMQ, because of its [really funny manual](http://zguide.zeromq.org/page:all) (and because other people seemed to like it, particularly Roel Aaij, who helped me get started with it).

At this point, you may wonder why we didn’t use an existing task execution framework like [TBB](https://en.wikipedia.org/wiki/Threading_Building_Blocks) or [Cilk](https://en.wikipedia.org/wiki/Cilk), but we had some specific design constaints that made this impossible (integration with the current RooFit C++ code and performance requirements), so we had to whip up our own thing.

Everything was coming along nicely. With lots of valuable input from the team, Inti Pelupessy and I designed and built the MultiProcess system, it was working just fine, we benchmarked it, presented it and published a bit and things seemed to be hunky-dory. Matter of packing it up and shipping it. Or so we thought.

The first version had some, let’s say, [sub-optimal implementation choices](https://en.wikipedia.org/wiki/Spaghetti_code) (which I take full responsibility for). Also, in our final version, we wanted to make a few user-facing design changes. So we got together, made a better design and I started coding version two.

[image]

The redesign team at CERN past summer. So young. So naive (speaking for myself at least).

To make the MultiProcess framework more maintainable, I split it into several conceptual classes. Most importantly, the so-called `TaskManager` was taken apart. The `TaskManager` did hardly anything to manage tasks. Instead it managed a task queue, interprocess communication and forking into multiple processes, i.e. everything needed behind the scenes to get workers (processes) to calculate their parts of the total calculation and then send the results back to the master process. Workers don't need management, they just need someone to take all the red tape away from them so they can focus on what they do best! There is no political message here!

So, now we have a `JobManager` which keeps a list of `Job` s, and explicitly spawns objects for the other previously bunched together tasks of the `TaskManager` (are you confused yet?): a `Queue`, a `Messenger` and a `ProcessManager`. The queue also runs an event loop on the queue process (which the master process talks to) and the worker processes (which talk to the queue as well) run a `worker_loop` which is just a free function, yay C++, free the functions from their classist masters! Still no politics, I assure you.

Now, one of the nice things of having monolithic classes is that you don’t have to worry too much about, say, separating your concerns. This means for instance that the old `TaskManager` could use its messaging parts to tell its process management parts to shut down children after the Job was done.

In the new situation, the `JobManager` instantiates its `ProcessManager` member to spawn child processes and after that instantiates its `Messenger` member to setup our means of communication. In C++ it would be most natural to let the destructor of these classes clean up all connections and processes. However, when we do this after our Job is done, we can no longer use the `Messenger` to communicate between processes, because there is a recursive dependency. We would need the `Messenger` to tell the `ProcessManager` to terminate the processes, but the processes cannot die before they killed the `Messenger`, because through ZeroMQ it keeps alive an I/O thread that waits for messages from the ZeroMQ sockets that we haven't killed yet because we needed them to kill the processes!

In principle, you can do it by sending a terminate signal over the messenger, which triggers the destruction of the `JobManager`, which then destroys all its component members. This has its own issues, not the least of which is that it creates an external dependency for destruction, which seems like a bad design choice.

To get out of this swamp, there are several other possibilities, like making the messenger a singleton class like the `JobManager` or the ZeroMQ context (yeah, now the skeletons come popping out of the closet), but I just couldn't bear making yet another one of those.

[image]

Honestly, my closet isn’t big enough to hold all the skeletons…

In any case, I thought it would be nice to make the classes independent (even though the `Messenger` still needs the `ProcessManager` instance at creation time to tell it which process it is running on, but this can easily be passed on via the constructor, a feat which destructors unfortunately cannot perform).

To this end, I decided to have the `ProcessManager` just use POSIX signals to signal all its kids to die.

## Technical overview

So, long story short: I have a master process, which spawns 1 + N children:

1. a queue process, running a loop to wait for messages and then act on them;
2. N worker processes, also running a messaging loop.

The `ProcessManager` takes care of forking child processes in the constructor and killing them off by sending POSIX signals from the destructor.

The `Messenger` sends around job descriptions and results from the master to the queue and from queue to workers. It uses ZeroMQ sockets for this. At the end of its life, it just shuts down all sockets, closes the ZeroMQ context and that's that.

Note that these instances are cloned to all forked children, but on each child there is only one instance, owned by the singleton `JobManager`.

All good so far.

Now, the issue is this: since we can no longer use our messenger to send a termination message, the loop will run indefinitely. This is why we use the `SIGTERM` signal to stop the process. To do this, we must install a signal handler using the POSIX `signal` call. We use the signal handler to flip some globally accessible flag variable, which we check for in the message loops and exit the loops once it's flipped.

Again, seems simple enough.

Unfortunately, it caused me a week or two of headaches.

## First try: tying knots

The complication arises because ZeroMQ operations `send`, `recv` and `poll`, which we use to wait for messages in the loops, are blocking functions that only exit when they have some data incoming or outgoing **or** when they encounter some error, like **a POSIX signal interrupting them**.

When such an interrupt happens, the operation exits with an `EINTR` exit code, which you can (and should!) check for. The thing is that it can happen for all kinds of signals and some may be harmless. For instance, profilers also use signals to measure a program's time spent in certain functions. For those you may want the `recv` / `send` / `poll` to just retry. Also, on other errors, you may want to just raise an exception and get the hell out of there, back to where the `recv` was called from.

In any case, when we get a POSIX signal while inside `send` / `recv` / `poll`, first the signal handler will flip our flag switch, then, back inside the blocking `send` / `recv` / `poll`, the `send` / `recv` / `poll` will return with an `EINTR` exit code. We check the exit code and the flag switch and either start shutting down when we received our kill signal or continue when we didn't:

```hs
while (true) {                  // send/recv/poll retry loop
  try {
    int timeout = -1;           // infinite/no timeout, i.e. block
    socket.recv(timeout);       // or send, or poll
  } except (zmq::error_t &e) {
    if (e.num() != EINTR) {
      throw;
    } else {
      if (my_global_flag_is_switched) {
        std::exit(1);           // or some fancier way of exiting
      }  // tip
    }  // toe
  }  // down
}  // the stairs
```

This will often go well. It also often goes wrong, as my tests were showing. About half of the time one of the terminated children would hang…!@\*$%&

The problem here is that the `SIGTERM` signal is not guaranteed to be received inside the blocking ZeroMQ call. In fact, it will often be received when in some other function, because it may still be busy handling a previous message. When this happens, the flag will be flipped, but it is not checked! At some point the message loop returns to the `recv` call and will just block there.

An obvious looking solution to this specific problem is to put another switch-check in front of the `recv`, i.e.:

```hs
...
  if (my_global_flag_is_switched) {
    std::exit(1);             // or some fancier way of exiting
  }  // hello darkness, my old friend  socket.recv(timeout);       // or send, or poll
...
```

While this will certainly reduce the odds of going into a blocking call when `SIGTERM` has been received, it still doesn't guarantee anything. There is still soom innocent looking room in between the check and the blocking call. The signal could still be received just before the `recv` call has been entered. Or, maybe more precisely, before one of the actually blocking system calls inside `recv` has been entered; but also the process could simply have been put on hold by the OS exactly at the moment after the flag check. In any case, this setup will still hang indefinitely every now and then.

So this way of interleaving POSIX and ZeroMQ calls and checks will never be enough, there will always be a possibility that your blocking call will hang.

[image]

Haaaaaaaaaang. Haaaaaaaaaaaaang.

## Second try: queue it all

I was Googling for alternative solutions and honestly found it really hard to find good resources on this (which is the main reason I’m now writing it all down for you in this article).

Eventually, I found [this article on EINTR in ZeroMQ](http://250bpm.com/blog:12) by Martin Sustrik (ZeroMQ creator) himself. More precisely, in the comment section [Ambroz Bizjak suggested a solution](http://250bpm.com/blog:12/comments/show#post-1608507) to my problem which after some discussion even Sustrik seemed to be unaware of. The solution wasn’t completely fleshed out in the comments, so there was still some filling out for me to do. Luckily for you, you won’t have to repeat this exercise.

The solution is that when going into the blocking ZeroMQ calls, you temporarily block the POSIX signals you want to listen for; `SIGTERM` in our case. This can be done using `sigprocmask`.

Then, instead of using your regular blocking ZeroMQ call, you use `pselect` or `ppoll` to wait for something to happen on your sockets **and your signal queue.** Because, as it turns out, when you temporarily block signals using `sigprocmask`, they are put in a queue by the OS. You can then handle them at your earliest convenience.

The `pselect` and `ppoll` functions can monitor lists of sockets **and** you can give them a **signal mask** like the one you gave `sigprocmask`, but then without the signal that you specifically wanted to block outside of the `pselect` / `ppoll` call. This will make `pselect` and `ppoll` listen to those signals that you blocked earlier. When a signal came in (or a socket is ready for reading/writing) they will return. If you put the flag check after `pselect` or `ppoll`, the signal will always be handled properly.

One other critical modification is that in this case you should no longer use blocking ZeroMQ calls. This has also become unnecessary, because you already checked whether some data is incoming on the socket using `pselect` or `ppoll`!

Finally, note that also right after you blocked the signal with `sigprocmask`, you should put one additional check for the signal flag, because the signal may yet have triggered somewhere just before you blocked it.

All in all, the code would then become something like that of Ambroz Bizjak:

```hs
set file descriptor to non-blocking;
sigprocmask() to block SIGINT;
if (stop) { // handle it }
while (true) {
  pselect() with sigmask argument which doesn't block SIGINT;
  if (stop) { // handle it }
  recv();
}
sigprocmask(old) to put back the old mask in use before we replaced it;
```

## Integrating into ZeroMQ

This is great in theory, but as already mentioned in the reply by Sustrik: this means we would need a `pselect` or `ppoll` in ZeroMQ. I was originally using `zmq::poll`, which internally uses regular POSIX `poll`. We can in principle modify this fairly easily to take the additional argument necessary for `ppoll`, namely the signal mask.

However, then we need to decide on how to handle this internally in ZMQ. I cannot do this on my own, but decided to write a first implementation anyway. However, when I started thinking about actually doing this, a few new problems raised their ugly heads.

The first idea I had was to again use a global flag that can be flipped from the signal handler when a signal is received… At this point I finally realized what Sustrik was talking about when he said we can’t use signal handlers in libraries. First of all: we don’t know which signals the user will want to actually mask. Maybe they want to act on several signals and so will need several global flags. So, long story short: this cannot be done generically inside a `zmq::ppoll` or `zmq::pselect`.

So then we only have two possible tools left to let the user know we caught a signal: the return value and the error code.

The return value is constrained; the API should conform to existing APIs like those of POSIX `ppoll` and `zmq::poll`. We can only use return values of `-1` and `0`, where `-1` means an error occurred. So probably the only sensible option is to modify `zmq_poll` (now I'm talking about the libzmq implementation; `zmq::poll` is merely a C++ wrapper around `zmq_poll`) to return `-1` and set the `errno` to `EINTR` when the signal is received.

So this sounds a bit like we’d be back at square one… Except that this time the `ppoll` function would be **the only place where the signal is unblocked**, so we know exactly where it will occur and, more importantly, where it will not. Problem solved!

Now I just had to write it…

## Ppoll, pselect or self-pipe?

After a two week hiatus, I came back, tried to implement `zmq_ppoll` by simply copy-pasting `zmq_poll` and replacing `poll` with `ppoll`, but was unpleasantly surprised by the fact that `ppoll` apparently doesn't exist on macOS. `[pselect](<https://stackoverflow.com/a/46047380/1199693>)` does exist, so we'll have to go with that.

Luckily, the `zmq_poll` implementation is really flexible, and already includes a `select` -based path next to the `poll` -based one. We modify that to take a `sigmask` and Bob's your uncle.

[image]

I’m your uncle! https://itkonekt.com/2018/12/17/robert-c-martin-uncle-bob/

So indeed, let’s try out `pselect`. I did have some reservations, because the web is rather full of reports of it not being implemented properly on macOS / FreeBSD... see [here](https://stackoverflow.com/questions/14045801/different-pselect-behaviour-on-osx-vs-linux), [here](https://news.ycombinator.com/item?id=12857275), [here](https://news.ycombinator.com/item?id=16321529)... Hopefully, as also reported [here](https://news.ycombinator.com/item?id=12904883), in recent versions this is fixed. It seems like they could have taken inspiration by now from many existing, reportedly correct, implementations, like [this one](http://lua-users.org/lists/lua-l/2015-01/msg00697.html). This does mean our implementation will only be really 100% robust on recent macOS versions, but so be it.

At this point, under all these doubts about the stability of it all, I almost gave up on `ppoll` / `pselect` to try out the so-called " [self-pipe trick](http://cr.yp.to/docs/selfpipe.html) " that is also [floating around](https://lwn.net/Articles/176911/) in these discussions. This could be a good alternative in some ways.

The problem with the self-pipe trick is that you can’t fully implement it in all its gory details in a library. The trick involves sending a byte over a pipe *from a signal handler*. As [Sustrik mentions](http://250bpm.com/blog:12/comments/show#post-1654888), we cannot rely on signal handlers at all. We have to assume they can be overridden by users of our libraries. In fact, ROOT might install its own signal handlers, indeed invalidating the entire approach we’d be going for here. Though, in fact, the last signal handler that is set is the one that trumps others. When we only set the `SIGTERM` handler when doing all this stuff and then set the handler back to its original value afterwards, we should be safe, except that we might be interfering with other signal handlers, but that will be necessary in most cases anyway, because also the `ppoll` / `pselect` route will at some point need to install a signal handler. The cleaner alternative (when setting signal handlers are really out of the question) is to let the user of your library implement their own self-pipe signal handler. In my opinion, this is way too heavy a burden on the user.

So in the end, I chose to go with `ppoll` / `pselect`, because it puts most of the code on the library side and avoids having to setup and maintain an extra pipe. The only thing you need with the `ppoll` / `pselect` option is a simple signal handler and a flag to check. It seems like a simpler and more user-friendly option.

Whatever you choose, some handling of POSIX signals will be necessary in a robust multi-process application. For instance, if a child process dies for some reason, a `SIGCHLD` signal is sent to the parent, which could also interrupt blocking reads, sends and polls (if `SIG_IGN` is not set for this signal). These must be handled either by using `ppoll` / `pselect` or by using the self-pipe trick.

## The result

So, I implemented the `zmq::ppoll` via `pselect` route. And finally, after a lot of debugging, it seems to be working well!

Its low level implementation (`zmq_ppoll`) depends on many libzmq macros, defines and functions. Trying to build against this creates a giant string of dependency files. The problem with this is that libzmq does not expose all these internal headers, so for the time being I just copy pasted over all the necessary libzmq files. Amazingly, this just seems to work after a few tweaks. My compliments to the libzmq devs for creating such modular code!

Regarding the few tweaks: there are a lot of precompiler variables which are used to configure the compiled libzmq code. It seems that for macOS, this configuration is perfectly comfortable basing `zmq_poll` on `poll`. This makes sense, but for our purposes it is really annoying, because we need all the stuff that would be compiled in the case `zmq_poll` would be based on `select`. A lot of necessary classes and typedefs are therefore not at all fed to the compiler from all the lazily copy-pasted headers and source files.

This would become an issue if I was to submit all this `ppoll` work to libzmq as a pull request. My need for `select` would inflate the library a bit. This is a trade-off that the libzmq devs will have to decide on.

If they don’t see this happening, I can still publish `zmq::ppoll` as a separate library. I just need to flip the switch on all the `select` vs `poll` configured code. This can be done from `platform.hpp`. And this is exactly what I've done in [the current RooFitZMQ implementation that you can find in this hidden away corner of GitHub](https://github.com/roofit-dev/root/tree/MP_ZeroMQ-new_multiprocess/roofit/roofitZMQ).

## Even more details

For the really technically interested reader (as if you would be anything else if you’ve reached this far down into the article), some final implementation details that may trip you up (as they did for me):

- Use a `volatile sig_atomic_t` value type for any values you set from within a signal handler. Changing other types is undefined behavior. It will usually work, but I guess in some rare cases it may not and you'll be scrambling for explanations and will never sleep well again, knowing the mysterious bug that has eluded you for years and that you have heard whispered rumors about from your users is still lurking in the shadows.
- Handle errors (exceptions in the C++ case) wisely. That’s the short version, see the rest of this article for the long version.
- Make sure to set both your receives and your sends to non-blocking with the `ZMQ_DONTWAIT` flag.

A practical problem with the latter point is that at the beginning of your run, the connections may not have been made between the sockets. This can lead to the non-blocking send to drop out with an EAGAIN error. Now, you may think (like I did): fine, I’ll handle that error and retry the send. However, the same error will occur at the end of your program when you disconnected the other end of your socket on purpose (as I found out the hard way). At this time, you won’t want to retry infinitely, which would hang your program (which happened to me), so just covering up all your sends in retry loops that trigger on EAGAIN will be too coarse a solution (believe me, I tried).

What I went with in the end is to define a `send_flag` in my Messenger class which I pass as the `flag` option to all send calls. Initially, `send_flag` is zero, so the send calls will block. I then call a `test_connections` method and after this completes successfully, I set `send_flag` to `ZMQ_DONTWAIT`. Now, once the connection drops out, send calls will give the EAGAIN error. But this time, the start-of-the-program cause of EAGAIN is ruled out, so I can assume that the program has ended. I catch the EAGAIN in my event loops and continue the loop when I get an EAGAIN. This means the code will first come across my `ppoll` again before it comes back to the send that caused the EAGAIN. Inside `ppoll`, it will handle the `SIGTERM` signal that I expect has been sent from the master process and the event loop will be exited properly.

Lol, you thought that would be it, but no, it’s still not that simple (I’m talking to my innocent, naive, past self here). There are still three other reasons EAGAIN could trigger!

1. Calls to receive (`recv`) can also trigger an EAGAIN. To distinguish between send and receive EAGAIN triggers, we could throw different typed exceptions (remember, we're doing C++ here, so every time I'm talking about error codes, what actually happened was a `zmq::error_t` type exception was thrown... which also happens to carry along the traditional C style error code). As far as I can tell, the only reason `recv` would trigger EAGAIN after a `ppoll` (which I now call before every `recv` call) is if `ppoll` initially gets a read-ready signal for the socket, but the received data does not pass a ZMQ internal checksum test, so the socket becomes unreadable again when you actually try to read from it. In this case, which I hope is rare, things will probably break unless you try really hard to fix them, i.e. send a signal to the sender that something went wrong, or otherwise implementing a really robust messenging protocol. This therefore goes far beyond the scope of just combining ZMQ with POSIX signals and is described very well elsewhere (like in [the awesome ZMQ guide](http://zguide.zeromq.org/) I mentioned at the beginning of this article; in case you forgot, which I myself did, because it took me three weeks to get to the end of writing this post).
2. A `send` call may have two other legitimate reasons for crapping out with EAGAIN. The first is that its receiving end may have hit its “high-water mark”, a ZMQ setting which you can look up in the ZMQ guide or elsewhere.
3. The second reason `send` could throw an EAGAIN is that the connection may have been severed unexpectedly. In my case, this would mean that in the following `ppoll` call, no `SIGTERM` signal will be received and so the code will just try to go on, probably hitting the same connection error again and again ad infinitum. This should also be handled properly, but I'm hoping it's rare enough to not have to worry about it too much. Obviously, I will worry about it for the rest of my waking days. Will probably write another huge blog post about it at some point. Oh well!

We leave the latter problems to be solved as an exercise for the reader.

[image]

The reader.

## To be continued

So stay tuned for the release of `zmq_ppoll`!

*Update Oct 2021:* `*zmq_ppoll*` *is now included in* [*libzmq*](https://github.com/zeromq/libzmq/pull/4255)*!*

If you have any questions or other thoughts, let me know in the comments or on [Twitter](https://twitter.com/egpbos) or [Reddit](https://www.reddit.com/r/cpp/comments/f2r1i6/combining_zeromq_posix_signals_use_ppoll_to/)! Having spent so much time on this stuff, I guess sunk cost fallacy demands of me that I spend even more time on it by discussing it with as many people as possible;) Also, I guess I’m kind of a mental masochist. Figuring out this stuff has been extremely frustrating, but also extremely satisfying. So throw your problems at me, I’m hungry for more!

[image]

My happy face (not mine, but close enough), thinking about solving even more complex messaging problems.

Thanks to Inti Pelupessy and for reviewing this article.