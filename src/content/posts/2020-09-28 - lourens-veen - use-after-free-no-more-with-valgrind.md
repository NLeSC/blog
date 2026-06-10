---
layout: post
title: "Use-after-free? No more with Valgrind"
date: 2020-09-28
author: Lourens Veen
published: true
source: medium
source_url: https://blog.esciencecenter.nl/use-after-free-no-more-with-valgrind-7f8e50938236
tags:
  - Research Software
---

Subscribe*Remember me for faster sign in

At this point, there were several possible causes of the crash. Clearly, the pointer returned by the call to `elements()` was bad, pointing to some memory that did not contain the requested elements. I read on.

==19383== Address 0x6488628 is 8 bytes inside a block of size 262,152 free’d
…
==19383== Block was alloc’d at
…
==19383== by 0x1563C4: libmuscle::impl::DataConstRef::grid_dict_() const (data.cpp:722)
==19383==That, in fact, told me enough to find the problem. But to understand what went wrong, we need to dive into the implementation of the `Data` class for a bit.

## How to lose your users’ data

To send objects from one program to another, MUSCLE3 uses a binary data format called MessagePack. A MessagePack-encoded object is an array of bytes, which can be decoded to determine the type and value of the encoded value. For example, a message consisting of a single byte with value `33` represents an integer with value 33. A single byte with value `195` represents the Boolean value True, and `167 77 85 83 67 76 69 51` encodes the string MUSCLE3 (167 starts a 7-byte string, and then there are the 7 characters’ ASCII values).

MessagePack has fixed ways of encoding all the common basic types, as well as dictionaries and lists, but it doesn’t do (multidimensional) arrays. Fortunately, it has an extension mechanism, which lets you send an array of bytes accompanied by a one-byte tag that specifies what kind of object it represents. You are then free to represent your object as an array of bytes in any way you like. A common trick is to simply use MessagePack again to encode a dictionary or list containing some values which together represent the object. This is how MUSCLE3 sends grids.

When MUSCLE3 receives a message, it calls an internal function to decode the received array of bytes. This function in turn calls the MessagePack library, which returns a library-specific object that represents the decoded value. This object is wrapped in a `Data` object, and eventually returned to the user. When the user then asks this `Data` object whether it contains a `Grid`, it inspects its MessagePack-object to see whether it represents an extension type with the correct tag. If you ask for the elements, it has to actually decode the bytes still. It uses MessagePack to do that, creating another `Data` object containing a dictionary that has the shape of the array and the elements (the difference between `Data` and `DataConstRef` is beyond the scope of this blog, you can consider them the same here).

DataConstRef DataConstRef::grid_dict_() const {
    auto ext = mp_obj_-&gt;as&lt;msgpack::type::ext&gt;();
    auto oh = msgpack::unpack(ext.data(), ext.size());    if (oh.get().type != msgpack::type::MAP)
        throw std::runtime_error(
            "Invalid grid format. Bug in MUSCLE 3?");    auto zone = std::make_shared&lt;msgpack::zone&gt;();
    return DataConstRef(
        mcp::unpack_data(zone, ext.data(), ext.size()));
}Once it has this `Data` object, `elements()` can extract the location of the elements from it and return the location to the user as a pointer of the appropriate type:

Element const * DataConstRef::elements() const {
    if (!is_a_grid_of&lt;Element&gt;())
        throw std::runtime_error(
            "Tried to get grid data, but this object is not"
            " a grid or not of the correct type.");
    char const * data_bytes = grid_dict_()["data"].as_byte_array();
    return reinterpret_cast&lt;Element const *&gt;(data_bytes);
}Valgrind said the following about this:

==19383== Address 0x6488628 is 8 bytes inside a block of size 262,152 free’d
…
==19383== Block was alloc’d at
…
==19383== by 0x1563C4: libmuscle::impl::DataConstRef::grid_dict_() const (data.cpp:722)
==19383==This means that the pointer returned by `elements()` points to a variable that used to exist, but that had been deleted by the time the pointer was used by the test case. It also says that the deleted variable was created on the last line of the `grid_dict_()` function.

That makes it clear what happened: `elements()` calls `grid_dict_()`, which creates (as noted by Valgrind) and returns a `Data` object containing the elements. A pointer to the elements is extracted (the `["data"].as_byte_array()` part in `elements()`), and then, since it’s a temporary value and it’s not assigned to anything, the `Data` object returned by `grid_dict_()` is cleaned up. This deletes the dictionary including the elements from memory, leaving the pointer to point to something which no longer exists. The pointer is then returned to the user, who tries to access the nonexistent data, causing the program to crash (or not, sometimes).

Accessing a variable which no longer exists is called a use after free* error and it can, but doesn’t have to, crash your program. Here’s why. The memory in your computer is divided up into blocks called segments, and each running program is assigned a data segment to work with. If it needs more memory, it can [ask the operating system to increase the size of its data segment](https://linux.die.net/man/2/sbrk), and if it doesn’t need the extra memory any more, it can ask to shrink its data segment again so that other running programs can use the memory. If a program tries to read or write to memory outside of a segment assigned to it, the CPU will block the operation and then the operating system will shut down the program, citing a *segmentation fault* or *segmentation violation* (colloquially, a *segfault*). It does this to protect other running programs, which would get messed up if their data is overwritten by their errant colleague.

![Use-after-free? No more with Valgrind](/assets/use-after-free-no-more-with-valgrind-a5a64219.jpeg)
An errant colleague trying to overwrite your data. At this point you may want to call a detective! Photo by [Andrea Piacquadio](https://www.pexels.com/@olly?utm_content=attributionCopyText&amp;utm_medium=referral&amp;utm_source=pexels) from [Pexels](https://www.pexels.com/photo/mad-formal-executive-man-yelling-at-camera-3760790/?utm_content=attributionCopyText&amp;utm_medium=referral&amp;utm_source=pexels).Resizing the data segment is done by the C++ standard library behind the scenes, so you don’t have to do it by hand, you can just `new` and `delete` variables (or better, use `std::make_unique()` and `std::make_shared()`). The standard library typically doesn’t change the size of the data segment every time you create or delete a variable, as it’s quite expensive to do so. It’s quite common for programs to create and delete small variables all the time, so it makes sense to hold on to a bit of spare memory. However, if a large enough amount is freed, it should be given back to the operating system for use by someone else, so that’s what the standard library typically does.

This is probably the explanation for why the test only crashes if the test grid is large: the small grid is still inside our data segment, and although its memory has been marked as available, it hasn’t been overwritten or returned to the OS, so that the pointer returned by `elements()` still works even if it’s technically invalid. The segment checking system is not intended to detect mistakes inside a program like this, it’s just there to protect programs from each other. So we get away with it, and the test passes. For the larger grid, the memory has been returned to the OS, so it does trigger a segfault, but it’s somewhat accidental.

When you run a program with Valgrind’s memcheck (which is what we did here), it actually redirects the calls to create, delete and access variables that the program makes away from the standard library, and to its memcheck tool. This does a lot of extra checking and bookkeeping, allowing it to detect invalid accesses within the program and tell you what happened. All these extra checks do slow down your program a lot, so you don’t want to run under Valgrind all the time, but when you have an issue like this, it’s well worth a bit of a wait if needed. As we saw above, it does a pretty good job showing what’s going wrong, and it’s not so easy to find these kinds of mistakes with other tools.

## Fixing the problem

Satisfied with these results, I removed the Valgrind from the test cabinet and returned it to my coat pocket. It had proven its worth once again. I wasn’t done however, as the mistake still needed to be rectified. I pulled up a chair to another filing cabinet, this one labeled `libmuscle/cpp/src/libmuscle`, and pulled up the `data.cpp` file to consider my options.

A `Data` object actually contains two things: the MessagePack object representing the data, and a MessagePack *zone* object. Zones are used by MessagePack to manage memory. If you decode, say, a dictionary, then you get MessagePack objects for the dictionary itself, and also for each key and value, recursively. That’s a lot of objects, so MessagePack puts them all together into a zone. When you’re done with the data, you just delete the zone, cleaning them all up in one go. This is not as easy as automatic memory management, but it is much more efficient.

Now, our problem is that we create a second `Data` object containing the grid dictionary, and that we need to put it somewhere where it will continue to exist for as long as the user accesses the pointer returned by `elements()`. MUSCLE3 promises the user that that pointer is valid for as long as the `Data` object representing the grid exists, so we need to somehow attach the decoded elements to the grid’s `Data` object.

One option is to put the elements in the main `Data` object’s zone. That will keep them around, but it becomes an issue if the user calls `elements()` multiple times, maybe in a loop. On every call, a new `Data` object will be created for the dictionary and added to the zone, so we keep using more and more memory. It’ll eventually be freed again, but if it’s a large grid, then we may run out of memory before that. So that’s not great.

A second option would be to add a pointer-to-`Data` to the `Data` class, which could be used to store the dictionary `Data` object if the `Data` object represents a grid. That way, we would only have to decode once, and any subsequent calls to `elements()` or `shape()` could used the cached object. And using a smart pointer would automatically delete the dictionary `Data` object when the grid `Data` object is deleted. The downside to this is that it makes `Data` objects larger, which could cost some performance even for `Data` objects that don’t contain a grid.

Finally, since the MessagePack format is not so complicated, it would also be possible to make custom decoding routines which decode the grid in one stage, so that there is no need for a second `Data` object at all. This could also help to reduce copying, thus improving performance further. That’s a lot of work however.

At the moment, the focus for MUSCLE3 is on making things work, and on making the life of the users easy. Performance is not crucial, because in multiscale models (unlike in scale-overlapping multiphysics models) communication performance is rarely the bottleneck. I want to spend my time on solving problems for users, but not problems they don’t have. Since the first option could actually make things worse, and the third option is expensive, [I chose the second option](https://github.com/multiscale/muscle3/commit/281c75b8907da5b2d5150c36472705e0916cc2bd). It’s not the prettiest solution, but it will do. If performance does become an issue in the future, then I can always come back and revisit.

Having fixed the problem, there was one more thing to do: keep similar problems from appearing in the future. Mistakes in software are inevitable, as it’s made by humans and nobody’s perfect. But whenever we discover a mistake, it helps to see if there’s an easy way to avoid doing the same thing in the future, so that over time the software gets better and better. In this case, I added a check for Valgrind to the build system, and it will now run all the tests under Valgrind if it is installed. I also modified the continuous integration container to install Valgrind. This didn’t uncover any other memory management issues in MUSCLE3, but if I make another mistake like this in the future, then there’s a good chance that the tooling will catch it before it ends up with the users.

## Epilogue

My job done, it was time to go home. I grabbed my coat and my hat, verified that the Valgrind was still securely in my pocket, turned off the lights, and carefully closed the door behind me. It was late. The hallways were deserted, the reception desk downstairs vacant. I opened the after-hours side door and stepped out onto the street, into the golden light of a beautiful spring evening. Life was good. I turned towards home, pulled my hat a bit deeper over my eyes to keep the sun out, and started walking, detective-at-ease. I ignored the funny looks.

![Use-after-free? No more with Valgrind](/assets/use-after-free-no-more-with-valgrind-0aa63f76.jpeg)
Photo by [Dewang Gupta](https://unsplash.com/@dewang?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText) on [Unsplash](https://unsplash.com/?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText)
