---
layout: post
title: "Use-after-free? No more with Valgrind"
author: Lourens Veen
published: true
source: medium
source_url: https://blog.esciencecenter.nl/use-after-free-no-more-with-valgrind-7f8e50938236
tags:
  - Research Software
---

In my long career as a code detective, I have seen it all. I have travelled the high Cs, found Rubies and wrestled Pythons, and walked the alleyways of Fortran at night. Of course, as with any job most cases are run-of-the-mill, but some of them are not. Those are the ones you remember. The ones you tell your grandchildren about, if you live to tell the tale.

This is the story of a programming mistake that caused a C++ program to crash, and how it was fixed using [Valgrind](https://valgrind.org/). It features mysterious artefacts, C++ memory management, and fixing and avoiding mistakes in (scientific) software. I hope it will teach you something about use-after-free issues, and inspire you to try Valgrind for memory debugging next time you have a similar problem. Let’s dive right in, shall we?

## The Curious Case of the Crashing Simulation

It was a dark and stormy ni…no wait, it was actually a sunny afternoon in spring, when I received an email from a scientist named Pavel. Pavel is a postdoc at the University of Amsterdam and the Erasmus University Medical Center in Rotterdam, and he was working on porting a rather complicated computer simulation of something called an [In-Stent Restenosis](https://en.wikipedia.org/wiki/Restenosis) to [MUSCLE3](https://github.com/multiscale/muscle3). His program was crashing. And he suspected the problem was with MUSCLE3. Which I created and currently maintain. Which would mean… *DUH-DUH-DUUUUUH* (organ sound effect) *THERE WAS A MISTAKE IN MY CODE*!

By the way, why can’t you include sound effects in blog posts? I think blog posts are much better with sound effects. Someone should fix this. Meanwhile, here’s an image depicting the horror:

![An ink drawing of a face with its eyes and mouth wide open in horror. It is flanked by raised arms on both sides.](/assets/0_g4Uw0OcyPSJMyeKP-89e7e8c7.jpg)

“The Scream” Undated drawing by Edvard Munch (via Wikipedia )

Anyway, yes, there was a mistake in MUSCLE3. But to explain the problem, I need to explain what MUSCLE3 does first. MUSCLE3 is a coupling system for multiscale simulations. In a multiscale simulation, a part of the world is simulated in which multiple processes take place, and where some of those processes are much smaller and/or faster than others.

In this particular simulation, there are some slow-growing cells (simulated using agents), and some fast-moving blood (simulated using computational fluid dynamics). This is not that relevant, but it is fortunate, because what’s a hard-boiled detective story without some fast-moving blood? Anyway, each process is simulated by a separate computer program, and the programs exchange information by sending messages back and forth. This communication is one of the things MUSCLE3 helps with. And now Pavel was saying that whenever he received a large message, his simulation crashed.

Messages in MUSCLE3 contain data, and that data can be of a range of types, including the standard built-in types such as strings and integers, but also lists, dictionaries, and grids (arrays) of numbers. You don’t need to tell MUSCLE3 what you’re going to send, you just build a `Message` object containing whatever kind of data you want to send, and pass it to MUSCLE3, and on the other side the receiver receives a `Message` object containing the same data.

For a dynamic language like Python, this is all simple enough, but, dear reader, this case would prove to be much more complicated. Pavel’s model was not written in Python. It was written in… *DUH-DUH-DUUUUUH* C++!

See? I told you, sound effects. They make things better.

Anyway, C++ is a statically typed language. C++ programs are *compiled* into an executable file, which is then run in a second step. In C++, each variable can only store values of a particular type (e.g. strings, or integers), and that type must be known when the program is compiled. Of course, we don’t know the type of the data in a message until we receive that message, which happens when the program is running, which comes *after* it is compiled. So there is a problem.

To solve this, the C++ API of MUSCLE3 has a `Data` class. Variables of type `Data` can contain an object of any type that MUSCLE3 can send and receive. In your C++ code, you can ask the `Data` object which type of data it contains, and extract an object of that type. If the data is a grid (for instance because the sender is a Python program that sent you a NumPy array), then you can obtain a pointer to the raw array of elements using the `elements()` member function of `Data` (C++ doesn’t have a standard multi-dimensional array class, so this is the best we can do).

That is exactly what Pavel did: he called that function, then copied the elements into another data structure. And then his program crashed. At least, it crashed if the grid was large, a test program receiving a small test grid with only a handful of elements worked fine. Which makes no sense, because MUSCLE3 treats large and small grids exactly the same.

And thus, our mystery. Why did it crash? Why only for large grids? How should it be fixed? How do we keep this from happening again in the future?

## Detective. It’s what you are, not what you do.

It was time to get to work. I collected my hat and put on my trench coat, then dialled in the combination on my wall safe. This job would require some tools. My gaze swept across my collection, carefully assembled over the years. On the left, there were two boxes of print statements. One contained a large pile of cheap plastic mass-produced ones, the other was a velvet-lined display case showcasing a set of two exquisite hand-made examples, made in Japan during the Kamakura period and razor-sharp. While the pride of my collection, and the pinnacle of debugging tools in their time, I would need something more modern for this.

Next were the linters. They would only protect me from Python formatting issues however. Useless, in this case. A debugger then, maybe? My safe contained a perfectly good copy of gdb, but the truth is that it’s kind of uncomfortable to use. Also, it’s more suited to logic problems than to finding the cause of crashes. I put it aside for now.

I moved on to a shiny white box. AddressSanitizer it said on the top, in colourful letters. That could work. I’d never liked the sterility of it however. It was too neat, too perfect. A tool of the Empire. No. No, for this job, I would need the final box. A steel chest rather, decorated with ancient runic symbols and adorned with the word *Valgrind* in large, Gothic script. Gateway to Valhalla, the great hall where brave programmers go after they retire to await Ragnarök, the end of times when hardware issues and compiler bugs arise for one final epic debugging session before the Great Simulation is rebooted. Yes, Valgrind. I took the chest, put it on my desk, opened it. Removed the gleaming artefact, and put it in my pocket. I was ready to go.

(If the above procedure sounds a bit over-the-top, `apt-get install valgrind` will work just fine as well.)

It was only a short walk to the site of the crime, a [large building](https://github.com/multiscale/muscle3) with the word `git` on a sign at the entrance. I walked in and asked the receptionist to see MUSCLE3. She gave me a nasty look. Understandable, given the fact that I look ridiculous in a hat, and that no one has worn a beige trench coat since the 1980’s unless they were a dirty old man. But, having explained that I was in fact a detective, I was waved on and soon found myself in a room with a series of filing cabinets. It was time to start my investigation.

First, I looked at a cabinet labelled `libmuscle/cpp/src/libmuscle/tests`. I knew that there had to be a test which tested that grids could be sent and received. In fact there was; a file conveniently named `test_data.cpp` contained a large number of tests for `Data` objects, including ones for various aspects of using grids. One of those did exactly what Pavel did. I ran the tests to be sure, and they passed just fine.

```hs
[ RUN ] libmuscle_mcp_data.grid
[ OK ] libmuscle_mcp_data.grid (120 ms)
[ RUN ] libmuscle_mcp_data.grid_serialisation
[ OK ] libmuscle_mcp_data.grid_serialisation (55 ms)
```

However, the test only used a small grid. I modified it to use a larger grid. Re-ran the tests. And sure enough…

```hs
[ RUN ] libmuscle_mcp_data.grid
Segmentation fault (core dumped)
```

So, I had verified that indeed there had been a crime, erm, that there was a mistake in my code. But where? It was time to deploy Valgrind. I modified the `Makefile` that runs the tests to run `valgrind <test_executable>` instead of just `<test_executable>`. Having thus installed the Valgrind onto the filing cabinet, I took cover behind another cabinet filled with Fortran code (heavy, voluminous, and in this case auto-generated and therefore expendable) and restarted the test suite.

![An arch-shaped angular metal object with a letter V and two viking heads on it sits on top of a wooden cabinet.](/assets/1_oGKL4SYDYiHd9ggSmp_mpw-7c311286.jpeg)

Valgrind in action

As the first tests ran, a bluish light filled the room and the ancient artefact started vibrating, emitting a faint hum of approval. Then, suddenly, a horrifying screech emanated from it.

```hs
[ RUN ] libmuscle_mcp_data.grid
==19383== Invalid read of size 4
==19383== at 0x13F848: testing::AssertionResult testing::internal::CmpHelperEQ<int, int>(char const*, char const*, int const&, int const&) (gtest.h:1444)
==19383== by 0x1368DF: testing::AssertionResult testing::internal::EqHelper<false>::Compare<int, int>(char const*, char const*, int const&, int const&) (gtest.h:1472)
==19383== by 0x1288B1: libmuscle_mcp_data_grid_Test::TestBody() (test_data.cpp:526)
==19383== by 0x1A21E6: void testing::internal::HandleSehExceptionsInMethodIfSupported<testing::Test, void>(testing::Test*, void (testing::Test::*)(), char const*) (in muscle3/libmuscle/cpp/build/libmuscle/tests/test_data)
==19383== by 0x19C810: void testing::internal::HandleExceptionsInMethodIfSupported<testing::Test, void>(testing::Test*, void (testing::Test::*)(), char const*) (in muscle3/libmuscle/cpp/build/libmuscle/tests/test_data)
==19383== by 0x17BBBB: testing::Test::Run() (in muscle3/libmuscle/cpp/build/libmuscle/tests/test_data)
==19383== by 0x17C518: testing::TestInfo::Run() (in muscle3/libmuscle/cpp/build/libmuscle/tests/test_data)
==19383== by 0x17CB9B: testing::TestCase::Run() (in muscle3/libmuscle/cpp/build/libmuscle/tests/test_data)
==19383== by 0x187987: testing::internal::UnitTestImpl::RunAllTests() (in muscle3/libmuscle/cpp/build/libmuscle/tests/test_data)
==19383== by 0x1A32F8: bool testing::internal::HandleSehExceptionsInMethodIfSupported<testing::internal::UnitTestImpl, bool>(testing::internal::UnitTestImpl*, bool (testing::internal::UnitTestImpl::*)(), char const*) (in muscle3/libmuscle/cpp/build/libmuscle/tests/test_data)
==19383== by 0x19D576: bool testing::internal::HandleExceptionsInMethodIfSupported<testing::internal::UnitTestImpl, bool>(testing::internal::UnitTestImpl*, bool (testing::internal::UnitTestImpl::*)(), char const*) (in muscle3/libmuscle/cpp/build/libmuscle/tests/test_data)
==19383== by 0x18640F: testing::UnitTest::Run() (in muscle3/libmuscle/cpp/build/libmuscle/tests/test_data)
==19383== Address 0x6488628 is 8 bytes inside a block of size 262,152 free’d
==19383== at 0x4C30D3B: free (in /usr/lib/valgrind/vgpreload_memcheck-amd64-linux.so)
==19383== by 0x13317B: msgpack::v1::zone::chunk_list::~chunk_list() (cpp11_zone.hpp:127)
==19383== by 0x13554D: msgpack::v1::zone::~zone() (cpp11_zone.hpp:27)
==19383== by 0x152D7D: void __gnu_cxx::new_allocator<msgpack::v1::zone>::destroy<msgpack::v1::zone>(msgpack::v1::zone*) (new_allocator.h:140)
==19383== by 0x152D50: void std::allocator_traits<std::allocator<msgpack::v1::zone> >::destroy<msgpack::v1::zone>(std::allocator<msgpack::v1::zone>&, msgpack::v1::zone*) (alloc_traits.h:487)
==19383== by 0x1520AA: std::_Sp_counted_ptr_inplace<msgpack::v1::zone, std::allocator<msgpack::v1::zone>, (__gnu_cxx::_Lock_policy)2>::_M_dispose() (shared_ptr_base.h:535)
==19383== by 0x13A385: std::_Sp_counted_base<(__gnu_cxx::_Lock_policy)2>::_M_release() (shared_ptr_base.h:154)
==19383== by 0x135CCC: std::__shared_count<(__gnu_cxx::_Lock_policy)2>::~__shared_count() (shared_ptr_base.h:684)
==19383== by 0x1345AF: std::__shared_ptr<msgpack::v1::zone, (__gnu_cxx::_Lock_policy)2>::~__shared_ptr() (shared_ptr_base.h:1123)
==19383== by 0x1345CB: std::shared_ptr<msgpack::v1::zone>::~shared_ptr() (shared_ptr.h:93)
==19383== by 0x14E99D: void std::_Destroy<std::shared_ptr<msgpack::v1::zone> >(std::shared_ptr<msgpack::v1::zone>*) (stl_construct.h:98)
==19383== by 0x14DE43: void std::_Destroy_aux<false>::__destroy<std::shared_ptr<msgpack::v1::zone>*>(std::shared_ptr<msgpack::v1::zone>*, std::shared_ptr<msgpack::v1::zone>*) (stl_construct.h:108)
==19383== Block was alloc’d at
==19383== at 0x4C2FB0F: malloc (in /usr/lib/valgrind/vgpreload_memcheck-amd64-linux.so)
==19383== by 0x13335A: msgpack::v1::zone::allocate_expand(unsigned long) (cpp11_zone.hpp:281)
==19383== by 0x133280: msgpack::v1::zone::allocate_align(unsigned long, unsigned long) (cpp11_zone.hpp:245)
==19383== by 0x157F74: msgpack::v2::detail::create_object_visitor::visit_bin(char const*, unsigned int) (create_object_visitor.hpp:133)
==19383== by 0x165DC3: msgpack::v2::detail::context<msgpack::v2::detail::parse_helper<msgpack::v2::detail::create_object_visitor> >::execute(char const*, unsigned long, unsigned long&) (parse.hpp:584)
==19383== by 0x162A3D: msgpack::v2::detail::parse_helper<msgpack::v2::detail::create_object_visitor>::execute(char const*, unsigned long, unsigned long&) (parse.hpp:1027)
==19383== by 0x160F33: msgpack::v2::parse_return msgpack::v2::detail::parse_imp<msgpack::v2::detail::create_object_visitor>(char const*, unsigned long, unsigned long&, msgpack::v2::detail::create_object_visitor&) (parse.hpp:1044)
==19383== by 0x1587F5: msgpack::v2::detail::unpack_imp(char const*, unsigned long, unsigned long&, msgpack::v1::zone&, msgpack::v2::object&, bool&, bool (*)(msgpack::v1::type::object_type, unsigned long, void*), void*, msgpack::v1::unpack_limit const&) (unpack.hpp:331)
==19383== by 0x16C6BE: msgpack::v3::unpack(msgpack::v1::zone&, char const*, unsigned long, unsigned long&, bool&, bool (*)(msgpack::v1::type::object_type, unsigned long, void*), void*, msgpack::v1::unpack_limit const&) (unpack.hpp:141)
==19383== by 0x16C766: msgpack::v3::unpack(msgpack::v1::zone&, char const*, unsigned long, bool (*)(msgpack::v1::type::object_type, unsigned long, void*), void*, msgpack::v1::unpack_limit const&) (unpack.hpp:182)
==19383== by 0x16C5D8: libmuscle::impl::mcp::unpack_data(std::shared_ptr<msgpack::v1::zone> const&, char const*, unsigned long) (data_pack.cpp:13)
==19383== by 0x1563C4: libmuscle::impl::DataConstRef::grid_dict_() const (data.cpp:722)
==19383==
```

It ended quickly, fortunately, and was replaced again by the soothing hum. When that too had faded away, I emerged from my shelter and approached the filing cabinet. The Valgrind felt warm to the touch, but it appeared to be intact. I took out my magnifying glass and inspected the symbols on its side.

```hs
[ RUN ] libmuscle_mcp_data.grid
==19383== Invalid read of size 4
==19383== at 0x13F848: testing::AssertionResult testing::internal::CmpHelperEQ<int, int>(char const*, char const*, int const&, int const&) (gtest.h:1444)
==19383== by 0x1368DF: testing::AssertionResult testing::internal::EqHelper<false>::Compare<int, int>(char const*, char const*, int const&, int const&) (gtest.h:1472)
==19383== by 0x1288B1: libmuscle_mcp_data_grid_Test::TestBody() (test_data.cpp:526)
```

Invalid read of size 4. Apparently, the test had attempted to read a 4-byte variable in a memory location where there was none. I followed the backtrace, through some Google Test-related functions to my `test_data.cpp`. Line 526 was where the invalid read had occurred. I checked the test’s code. Bingo. Exactly the place where the grid elements were accessed. I seemed to be on to something.

At this point, there were several possible causes of the crash. Clearly, the pointer returned by the call to `elements()` was bad, pointing to some memory that did not contain the requested elements. I read on.

```hs
==19383== Address 0x6488628 is 8 bytes inside a block of size 262,152 free’d
…
==19383== Block was alloc’d at
…
==19383== by 0x1563C4: libmuscle::impl::DataConstRef::grid_dict_() const (data.cpp:722)
==19383==
```

That, in fact, told me enough to find the problem. But to understand what went wrong, we need to dive into the implementation of the `Data` class for a bit.

## How to lose your users’ data

To send objects from one program to another, MUSCLE3 uses a binary data format called MessagePack. A MessagePack-encoded object is an array of bytes, which can be decoded to determine the type and value of the encoded value. For example, a message consisting of a single byte with value `33` represents an integer with value 33. A single byte with value `195` represents the Boolean value True, and `167 77 85 83 67 76 69 51` encodes the string MUSCLE3 (167 starts a 7-byte string, and then there are the 7 characters’ ASCII values).

MessagePack has fixed ways of encoding all the common basic types, as well as dictionaries and lists, but it doesn’t do (multidimensional) arrays. Fortunately, it has an extension mechanism, which lets you send an array of bytes accompanied by a one-byte tag that specifies what kind of object it represents. You are then free to represent your object as an array of bytes in any way you like. A common trick is to simply use MessagePack again to encode a dictionary or list containing some values which together represent the object. This is how MUSCLE3 sends grids.

When MUSCLE3 receives a message, it calls an internal function to decode the received array of bytes. This function in turn calls the MessagePack library, which returns a library-specific object that represents the decoded value. This object is wrapped in a `Data` object, and eventually returned to the user. When the user then asks this `Data` object whether it contains a `Grid`, it inspects its MessagePack-object to see whether it represents an extension type with the correct tag. If you ask for the elements, it has to actually decode the bytes still. It uses MessagePack to do that, creating another `Data` object containing a dictionary that has the shape of the array and the elements (the difference between `Data` and `DataConstRef` is beyond the scope of this blog, you can consider them the same here).

```hs
DataConstRef DataConstRef::grid_dict_() const {
    auto ext = mp_obj_->as<msgpack::type::ext>();
    auto oh = msgpack::unpack(ext.data(), ext.size());    if (oh.get().type != msgpack::type::MAP)
        throw std::runtime_error(
            "Invalid grid format. Bug in MUSCLE 3?");    auto zone = std::make_shared<msgpack::zone>();
    return DataConstRef(
        mcp::unpack_data(zone, ext.data(), ext.size()));
}
```

Once it has this `Data` object, `elements()` can extract the location of the elements from it and return the location to the user as a pointer of the appropriate type:

```hs
Element const * DataConstRef::elements() const {
    if (!is_a_grid_of<Element>())
        throw std::runtime_error(
            "Tried to get grid data, but this object is not"
            " a grid or not of the correct type.");
    char const * data_bytes = grid_dict_()["data"].as_byte_array();
    return reinterpret_cast<Element const *>(data_bytes);
}
```

Valgrind said the following about this:

```hs
==19383== Address 0x6488628 is 8 bytes inside a block of size 262,152 free’d
…
==19383== Block was alloc’d at
…
==19383== by 0x1563C4: libmuscle::impl::DataConstRef::grid_dict_() const (data.cpp:722)
==19383==
```

This means that the pointer returned by `elements()` points to a variable that used to exist, but that had been deleted by the time the pointer was used by the test case. It also says that the deleted variable was created on the last line of the `grid_dict_()` function.

That makes it clear what happened: `elements()` calls `grid_dict_()`, which creates (as noted by Valgrind) and returns a `Data` object containing the elements. A pointer to the elements is extracted (the `["data"].as_byte_array()` part in `elements()`), and then, since it’s a temporary value and it’s not assigned to anything, the `Data` object returned by `grid_dict_()` is cleaned up. This deletes the dictionary including the elements from memory, leaving the pointer to point to something which no longer exists. The pointer is then returned to the user, who tries to access the nonexistent data, causing the program to crash (or not, sometimes).

Accessing a variable which no longer exists is called a *use after free* error and it can, but doesn’t have to, crash your program. Here’s why. The memory in your computer is divided up into blocks called segments, and each running program is assigned a data segment to work with. If it needs more memory, it can [ask the operating system to increase the size of its data segment](https://linux.die.net/man/2/sbrk), and if it doesn’t need the extra memory any more, it can ask to shrink its data segment again so that other running programs can use the memory. If a program tries to read or write to memory outside of a segment assigned to it, the CPU will block the operation and then the operating system will shut down the program, citing a *segmentation fault* or *segmentation violation* (colloquially, a *segfault*). It does this to protect other running programs, which would get messed up if their data is overwritten by their errant colleague.

![](/assets/1_8SlZc56wbJqiw0AZmh0o_A-e222a716.jpeg)

An errant colleague trying to overwrite your data. At this point you may want to call a detective! Photo by Andrea Piacquadio from Pexels.

Resizing the data segment is done by the C++ standard library behind the scenes, so you don’t have to do it by hand, you can just `new` and `delete` variables (or better, use `std::make_unique()` and `std::make_shared()`). The standard library typically doesn’t change the size of the data segment every time you create or delete a variable, as it’s quite expensive to do so. It’s quite common for programs to create and delete small variables all the time, so it makes sense to hold on to a bit of spare memory. However, if a large enough amount is freed, it should be given back to the operating system for use by someone else, so that’s what the standard library typically does.

This is probably the explanation for why the test only crashes if the test grid is large: the small grid is still inside our data segment, and although its memory has been marked as available, it hasn’t been overwritten or returned to the OS, so that the pointer returned by `elements()` still works even if it’s technically invalid. The segment checking system is not intended to detect mistakes inside a program like this, it’s just there to protect programs from each other. So we get away with it, and the test passes. For the larger grid, the memory has been returned to the OS, so it does trigger a segfault, but it’s somewhat accidental.

When you run a program with Valgrind’s memcheck (which is what we did here), it actually redirects the calls to create, delete and access variables that the program makes away from the standard library, and to its memcheck tool. This does a lot of extra checking and bookkeeping, allowing it to detect invalid accesses within the program and tell you what happened. All these extra checks do slow down your program a lot, so you don’t want to run under Valgrind all the time, but when you have an issue like this, it’s well worth a bit of a wait if needed. As we saw above, it does a pretty good job showing what’s going wrong, and it’s not so easy to find these kinds of mistakes with other tools.

## Fixing the problem

Satisfied with these results, I removed the Valgrind from the test cabinet and returned it to my coat pocket. It had proven its worth once again. I wasn’t done however, as the mistake still needed to be rectified. I pulled up a chair to another filing cabinet, this one labeled `libmuscle/cpp/src/libmuscle`, and pulled up the `data.cpp` file to consider my options.

A `Data` object actually contains two things: the MessagePack object representing the data, and a MessagePack *zone* object. Zones are used by MessagePack to manage memory. If you decode, say, a dictionary, then you get MessagePack objects for the dictionary itself, and also for each key and value, recursively. That’s a lot of objects, so MessagePack puts them all together into a zone. When you’re done with the data, you just delete the zone, cleaning them all up in one go. This is not as easy as automatic memory management, but it is much more efficient.

Now, our problem is that we create a second `Data` object containing the grid dictionary, and that we need to put it somewhere where it will continue to exist for as long as the user accesses the pointer returned by `elements()`. MUSCLE3 promises the user that that pointer is valid for as long as the `Data` object representing the grid exists, so we need to somehow attach the decoded elements to the grid’s `Data` object.

One option is to put the elements in the main `Data` object’s zone. That will keep them around, but it becomes an issue if the user calls `elements()` multiple times, maybe in a loop. On every call, a new `Data` object will be created for the dictionary and added to the zone, so we keep using more and more memory. It’ll eventually be freed again, but if it’s a large grid, then we may run out of memory before that. So that’s not great.

A second option would be to add a pointer-to- `Data` to the `Data` class, which could be used to store the dictionary `Data` object if the `Data` object represents a grid. That way, we would only have to decode once, and any subsequent calls to `elements()` or `shape()` could used the cached object. And using a smart pointer would automatically delete the dictionary `Data` object when the grid `Data` object is deleted. The downside to this is that it makes `Data` objects larger, which could cost some performance even for `Data` objects that don’t contain a grid.

Finally, since the MessagePack format is not so complicated, it would also be possible to make custom decoding routines which decode the grid in one stage, so that there is no need for a second `Data` object at all. This could also help to reduce copying, thus improving performance further. That’s a lot of work however.

At the moment, the focus for MUSCLE3 is on making things work, and on making the life of the users easy. Performance is not crucial, because in multiscale models (unlike in scale-overlapping multiphysics models) communication performance is rarely the bottleneck. I want to spend my time on solving problems for users, but not problems they don’t have. Since the first option could actually make things worse, and the third option is expensive, [I chose the second option](https://github.com/multiscale/muscle3/commit/281c75b8907da5b2d5150c36472705e0916cc2bd). It’s not the prettiest solution, but it will do. If performance does become an issue in the future, then I can always come back and revisit.

Having fixed the problem, there was one more thing to do: keep similar problems from appearing in the future. Mistakes in software are inevitable, as it’s made by humans and nobody’s perfect. But whenever we discover a mistake, it helps to see if there’s an easy way to avoid doing the same thing in the future, so that over time the software gets better and better. In this case, I added a check for Valgrind to the build system, and it will now run all the tests under Valgrind if it is installed. I also modified the continuous integration container to install Valgrind. This didn’t uncover any other memory management issues in MUSCLE3, but if I make another mistake like this in the future, then there’s a good chance that the tooling will catch it before it ends up with the users.

## Epilogue

My job done, it was time to go home. I grabbed my coat and my hat, verified that the Valgrind was still securely in my pocket, turned off the lights, and carefully closed the door behind me. It was late. The hallways were deserted, the reception desk downstairs vacant. I opened the after-hours side door and stepped out onto the street, into the golden light of a beautiful spring evening. Life was good. I turned towards home, pulled my hat a bit deeper over my eyes to keep the sun out, and started walking, detective-at-ease. I ignored the funny looks.

![](/assets/1_nAya0dMSUBd58C_5c8ML_g-e8f5424d.jpeg)

Photo by Dewang Gupta on Unsplash
