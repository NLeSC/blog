---
layout: post
title: "c++ compile-time exceptions"
author: Patrick Bos
published: true
source: medium
tags:
  - C++
  - RSE
---

## Debugging C++ templates should be less surreal and horrible

![](./1_TExYOrq8ehGu-dpzBiD0sQ-453b61e8.jpeg)

C++ programmers in their natural habitat, building awesome things and staring at walls of error text.

A C++ template error can be pages long, really dense and basically horrible. Often, they are not at all helpful for users of a library and you have to ==ask the developers for help==. Developers will often be able to filter or modify the error message to be far more productive to their users. In this post, I propose adding *compile-time exceptions* to C++ that will allow the developer to implement custom compiler errors for these cases.

For those unfamiliar with C++ templates: these allow you to do [generic programming](https://en.wikipedia.org/wiki/Generic_programming), meaning you can write functions without immediately specifying types, for instance a mathematical function that you want to be able to use with regular floats, double precision or even integers.

## Implicit failure through implementation

Reading through Scott Meyers’ timeless classic *Effective C++*, I was struck by the following template in Item 45, especially the templated constructor:

```hs
template<typename T>
class SmartPtr {
public:
  explicit SmartPtr(T *realPtr);  …  template<typename U>
  SmartPtr(const SmartPtr<U>& other)
  : heldPtr(other.get()) { … }  T* get() const { return heldPtr; }  …private:
  T *heldPtr;
}
```

This piece of code will allow you to initialize a `SmartPtr` by any “compatible type”. This for instance means derived types, as Meyers illustrates:

```hs
class Top {…};
class Middle: public Top {…};
class Bottom: public Middle {…};
```

With regular pointers you can do:

```hs
Top *pt1 = new Middle;
Top *pt2 = new Bottom;
const Top *pct2 = pt1;
```

The `SmartPtr` from the template above thus emulates the behavior of regular pointers, because thanks to the templated constructor you can do

```hs
SmartPtr<Top> spt1 = SmartPtr<Middle>(new Middle);
SmartPtr<Top> spt2 = SmartPtr<Bottom>(new Bottom);
SmartPtr<const Top> spct2 = spt1;
```

The trick is that this will compile only if the implicit conversion from e.g. a `Middle` pointer to a `Top` pointer is allowed. This is, of course, the case, since a `Middle` pointer **is** a `Top` pointer (plus extra `Middle` stuff).

However, if the implicit conversion is not allowed, say if you try to initialize a child class object by a parent class one like this:

```hs
SmartPtr<Bottom> spt1 = SmartPtr<Middle>(new Middle);
```

the compiler will complain as follows:

```hs
compile_fail.cpp:8:5: error: cannot initialize a member subobject of type ‘Bottom *’ with an rvalue of type ‘Middle *’
 : heldPtr(other.get()) {}
 ^ ~~~~~~~~~~~
compile_fail.cpp:22:27: note: in instantiation of function template specialization ‘SmartPtr<Bottom>::SmartPtr<Middle>’ requested here
 SmartPtr<Bottom> spt2 = SmartPtr<Middle>(new Middle); // compileth not
 ^
1 error generated.
```

Welcome to C++ templates! What the hell am I seeing here? Bytecode?!

![](./1_F5Z9hOuRxMz3C9jktqZPhw-58556d0e.jpeg)

Looks perfectly normal to me…. ( © wardyboy400, CC BY 2.0 )

Debug messages should not be this ridiculously hard to read, should they? I honestly sometimes laugh hysterically at these kinds of errors, especially when they go on for many more lines, as they often do. **It’s just too surreal**.

Now, to be honest, once you succeeded in cutting through the clutter, this is a more or less clear message:

```hs
error: cannot initialize a member subobject of type ‘Bottom *’ with an rvalue of type ‘Middle *’note: [obtuse hint that the error was caused by the template specialization of the constructor]
```

Or, to make it maybe a bit more understandable to an English speaker:

```hs
You cannot construct a SmartPtr<Bottom> using a SmartPtr<Bottom>::SmartPtr<Middle> constructor, because this will lead to an error, namely: cannot initialize a member subobject of type ‘Bottom *’ with an rvalue of type ‘Middle *’.
```

## Compile-time exceptions: make intent explicit

The above “English” exception still does not convey one crucial fact: that the developer meant for this error to happen.

And for a specific reason: they want to emulate the behavior of regular pointers. A user of the `SmartPtr` should not be able to use this class in other ways.

But this fact is hidden from sight by the compiler messages that — while maybe helpful to developers and certainly very complete— are not at all helpful to end-users (not to mention the fact that the developer probably is an end-user themselves as well).

To help the end-user, a far better compiler error message would therefore be very similar to the one used for the normal pointers, for instance:

```hs
error: cannot initialize an object of type ‘SmartPtr<Bottom>’ with an rvalue of type ‘SmartPtr<Middle>’
```

Or a bit more explicit:

```hs
error: cannot initialize an object of type ‘SmartPtr<Bottom>’ with an rvalue of type ‘SmartPtr<Middle>’, because Middle is not implicitly convertible to Bottom
```

If the compiler can detect these errors, which apparently it can, as evidenced by the error message, then why not allow the programmer to make use of this?

This would make the generic error message **context specific**, as in the above example: the developer adds their **intention**, the way the developer meant for the class to be used. This way, the user of the template does not have to browse documentation, nor parse huge template-error messages. Rather, they can fix the error and get back to work, as I must assume error messages were meant.

This line of thinking lead me to my eureka-moment: ***C++ should have compile-time exceptions***! Consider the following (bold face) modification of our constructor:

```hs
template<typename T>
class SmartPtr {
 …  template<typename U>
  compile_except(E2064) {
    compile_cerr << "error: cannot initialize a 'SmartPtr<" << T << ">' with an rvalue of type 'SmartPtr<" << U << ">', because " << U << " is not implicitly convertible to " << T << "\n";
    compile_fail;
  }
  SmartPtr(const SmartPtr<U>& other) …
 
 …
};
```

This syntax would mean that if a specific exception occurs during compilation of the template — specifically in this case error `E2064`, a code which comes from [this list of errors](http://docs.embarcadero.com/products/rad_studio/radstudio2007/RS2007_helpupdates/HUpdate4/EN/html/devwin32/cppcompmessagespart_xml.html) — the compiler enters the block, where it is met by some compiler specific syntax that allows for the developer to specifically express their intent.

Ok, so maybe we don’t need a special compile time output stream (it should rather be [fmt](http://fmtlib.net/) based!), but you get the point. For brevity, I stream-print the types `T` and `U` directly, by which I mean their names should be printed.

This whole approach assumes the developer will know the pitfalls of their API and can provide such an improved error message. In the example given above, I think this is indeed a better message and I’m sure developers can come up with many other good examples of error messages that keep frustrating their users. **Please let me know if you do, I’d love to make a follow-up post with the most interesting examples.**

So, almost immediately after I came up with this, I was already enjoying (in my mind) the fame and riches that making this proposal would obviously bring me. I had never heard of this idea before, and indeed some Google searching (no further than page 1, of course, it’s still just a blog post…) did not lead to comparable ideas (I welcome your scorn, derison and ridicule if I missed something obvious).

However, while writing this post, I suddenly realized to my dismay that maybe we don’t need compile-time exceptions, at least for this use case.

We have Concepts now.

![](./1_zFlz1mv04ReyHwp41ZfRkA-f646b13f.jpeg)

Why, Concepts, why? I thought we were friends…

## Well defined failure: Concepts to the rescue?

In C++20, the same class behavior can be programmed with a [Concept](https://en.cppreference.com/w/cpp/language/constraints), which also makes the code’s intent more explicit. It makes the compilation fail at an earlier point: at the first line of the template, where the template argument is immediately tested for compatibility with the template class, instead of relying on the implementation (the incompatible pointer assignment) to fail compilation.

For instance, in our example, one could add a [Derived concept, as found on the cppreference page on Concepts](https://en.cppreference.com/w/cpp/language/constraints):

```hs
template <typename T, typename U>
concept Derived = std::is_base_of<U, T>::value;
```

This concept can then be used to constrain the allowed template types of our constructor by replacing `typename` with our Concept:

```hs
template<Derived<T> U>
SmartPtr(const SmartPtr<U>& other):
: heldPtr(other.get()) { … }
```

Really nice, expressive syntax. I don’t want any old type `U`, I only want those that are derived from `T`.

The template now only compiles for types `U` that are derived from `T` (as it did before, but now because I say so, not because the language happens to). When you try to do otherwise, you get an error message that should be able to make this crystal clear for you! And all will be well.

[The experimental Concepts-enabled clang on Compiler Explorer outputs this](https://godbolt.org/z/Syth7G):

```hs
<source>:27:20: error: no viable conversion from ‘SmartPtr<Middle>’ to ‘SmartPtr<Bottom>’
 SmartPtr<Bottom> spt2 = SmartPtr<Middle>(new Middle); // compileth not
 ^ ~~~~~~~~~~~~~~~~~~~~~~~~~~~~
<source>:7:7: note: candidate constructor (the implicit copy constructor) not viable: no known conversion from ‘SmartPtr<Middle>’ to ‘const SmartPtr<Bottom> &’ for 1st argument
class SmartPtr {
 ^
<source>:7:7: note: candidate constructor (the implicit move constructor) not viable: no known conversion from ‘SmartPtr<Middle>’ to ‘SmartPtr<Bottom> &&’ for 1st argument
class SmartPtr {
 ^
<source>:12:3: note: candidate template ignored: constraints not satisfied [with U = Middle]
 SmartPtr(const SmartPtr<U>& other) // initialize this held ptr
 ^
<source>:11:12: note: because ‘Derived<Middle, Bottom>’ evaluated to false
 template<Derived<T> U>
 ^
<source>:4:19: note: because ‘std::is_base_of<Bottom, Middle>::value’ evaluated to false
concept Derived = std::is_base_of<U, T>::value;
 ^
1 error generated.Compiler returned: 1
```

Wait a minute… this isn’t crystal clear at all. Concepts, why do you pain me so?!

![](./1_o9zM89M99LDuS5zbd3a8kw-57dba38c.jpeg)

Halt! Definitely something’s off here…

Granted, it gives a nice subtle reminder that I forgot to add a templated move constructor and that there’s also a non-templated implicit copy constructor (which, by the way, Scott Meyers also reminds you of in Item 45).

But honestly, this was not the feedback I was hoping for as a user. That feedback arrives only in the fourth note… of five!

```hs
<source>:11:12: note: because ‘Derived<Middle, Bottom>’ evaluated to false
 template<Derived<T> U>
 ^
```

I do like this sentence, especially that it starts with “because” (even though the “evaluated to false” is a bit awkward, but I’m nitpicking). But there is still too much noise in here, at least for an end user.

## What about static\_assert?

[Lourens Veen]

reminded me that `static_assert` should not go unmentioned here. Indeed, this specific case can also be made more explicit using `static_assert`:

```hs
template<typename U>
SmartPtr(const SmartPtr<U>& other)
: heldPtr(other.get()) {
  static_assert(std::is_base_of<T, U>::value, "U is not derived from T!");
}
```

This approach has a number of its own issues though:

1. It still gives us two error messages ([see this implementation on Compiler Explorer](https://godbolt.org/z/1GzJ-8)): first the one about the pointer, which is triggered by the `heldPtr` initialization, and then the `static_assert` message.
2. I don’t know how this could be combined with Concepts. If I understand correctly, neither Concepts nor the related Constraints have a body where a `static_assert` could go.
3. We still cannot use it exactly the way we want, since the message of a static\_assert must be a string literal, so we can’t dynamically display the types that are being passed as `U` and `T`.

More importantly, in general: not all errors can be represented by a boolean condition, which is necessary for the `static_assert`. Syntax errors for instance, by definition cannot be used, since we cannot define the correct syntax for them! If we could, they wouldn’t be syntax errors anymore…

## The case for compile-time exceptions

![](./1_82PZb6UjPKU4PeckpD0yiA-38a32103.jpeg)

I’m not by far a C++ guru, and also not a computer scientist, so it would take me a long time to come up with more examples and corner cases of what compile-time exceptions would mean. I’m hoping other C++ experts can chime in here.

Also, probably the name won’t stick. I guess what I’m describing here aren’t really exceptions (you can’t reasonably recover from them, for instance), but rather customized error messages. However, triggering them feels like catching an exception. Perhaps there is a different name for this hybrid thing.

Nevertheless, I do know that debugging C++, especially the templated kind, can be hell. There is just too much noise to wade through in the general case.

A library developer will often have a very good idea of the kind of things that are expected and that can go wrong. Why not use this knowledge to make life easier for library users?

Why can’t I just get a compile error that simply says “ `Error: argument to copy ctor for SmartPtr<T> can only be SmartPtr<U> when U is derived from T, but it’s not` ”? Or something like that.

For this to work, compiler errors would need to be properly classified, named, detectable with not too much effort, etcetera. I have no idea whether this is currently the case. So another question to you (especially if you’re a compiler expert): ***are compile errors defined in such a way (i.e. strict enough, in the language itself) that they could be implemented as specific exceptions?*** Could they even be defined like that?

Be sure to leave your comments below or on [Reddit](https://www.reddit.com/r/cpp/comments/aj3ayo/c_compiletime_exceptions_debugging_templates/) or [Twitter](https://twitter.com/egpbos/status/1088152720740110342)!
