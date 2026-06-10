---
layout: post
title: "10 examples of embedding Julia in C/C++"
date: 2022-11-03
author: Abel Soares Siqueira
published: true
source: medium
source_url: https://blog.esciencecenter.nl/10-examples-of-embedding-julia-in-c-c-66282477e62c
tags:
  - uncategorized

---

Subscribe*Remember me for faster sign in

The `trapezoid` function has 4 arguments, therefore we have to use the general `jl_call` that we mentioned before. The arguments of `jl_call` are the function, an array of `jl_value_t *` arguments, and the number of arguments.

### 4: C function from Julia from C

How about computing the integral of a C function? We will need to access it through Julia to be able to pass it to a Julia function. First, we must create the function in C. Create a file `my_c_func.cpp` with the following contents:

It is important that we use `extern "C"` here, otherwise, C++ will [mangle the function name](https://en.wikipedia.org/wiki/Name_mangling). If you use C instead of C++, then this will not be an issue, but we intend to use C++ down the road. We will compile this code to a shared library, not only a `.o` object. Therefore, add the following to your Makefile:

lib%.so: %.o
    ld -shared $&lt; -o $@`ld` is the linker and `-shared` is because we want a shared library. Furthermore, you should modify the following:

main.exe: main.cpp aux.o libmy_c_func.soNow, when you run `make main.exe`, the `libmy_c_func.so` library will be compiled.

Finally, to call this function, we use the same string evaluator and Julia’s `ccall`.

Snippt of integration2.cpp

The `ccall` function has 4+ arguments:

* `(:my_c_func, "libmy_c_func.so")`: A tuple with the function name and the library;
* `Cdouble`: Return type;
* `(Cdouble,)`: Tuple with the types of the arguments;
* Then, all the arguments. In this case, only `x`.

That is it. This change is enough to make the code run. Notice that the function is `x^3`, so the integral result should be `1 / 4`. Those are the only differences in the code.

### 5: Using a package

Instead of implementing our own integration method, we can use some existing one. One option is [QuadGK.jl](https://github.com/JuliaMath/QuadGK.jl). To install it, open `julia`, press `]`, and enter `add QuadGK`.

An important note here is that I have not investigated much into maintaining a separate environment for these packages. If you know more about this subject, don’t hesitate to leave a comment.

Here is the code:

handle_eval_string("using QuadGK");
jl_value_t *integrator = handle_eval_string(
    "(f, a, b, n) -&gt; quadgk(f, a, b, maxevals=n)[1]"
);Just like that we can compute the integral, and compare it with our implementation. Let’s use a harder integral to make things more interesting:

![10 examples of embedding Julia in C/C++](/assets/10-examples-of-embedding-julia-in-cc-d7ee2d4d.png)
The integral of 1 over 1 plus x squared from 0 to 1 is Pi over 4. LaTeX: \int_0^1 \frac{1}{1 + x^2} \text{d}x = \frac{\pi}{4}.Here is the complete code for this example:

File integration3.cpp

The results you should see are

Integral of 1 / (1 + x^2) is approx: 0.785394
  Error: 4.16667e-06
Integral of 1 / (1 + x^2) is approx: 0.785398
  Error: -1.11022e-16

### 6: Using the Distributions package

The package Distributions contains various probability-related tools. We are going to use the Normal distributions’ PDF (Probability Density Function) and CDF (Cumulative Density Function) in this example. Don’t worry if you don’t know what these mean, we won’t need to understand the concept, only the formulas.

The Normal distribution with mean Mu (µ) and standard deviation Sigma (σ) has PDF given by

![10 examples of embedding Julia in C/C++](/assets/10-examples-of-embedding-julia-in-cc-6e86df9d.png)
Normal probability density function. LaTeX: f(x) = \frac*{1}{\sigma*\sqrt*{2\pi}} e^{-*\frac*{1}{2}\left(*\frac*{x - \mu}{\sigma}\right)^2}And the CDF of a PDF is

![10 examples of embedding Julia in C/C++](/assets/10-examples-of-embedding-julia-in-cc-894567de.png)
Cumulative density function definition. LaTeX: F(x) = \int_{-\infty}^x f(t) \text{d}tWhat we will do is use the Distributions package to access the PDF and compute the CDF integral using QuadGK. We will then compare it to the existing CDF function in Distributions.

Once more there is not much secret. You only have to create the Normal structure on the Julia side and use Julia closures to define PDF and CDF `jl_function_t` with one argument. This is the code:

handle_eval_string("normal = Normal()");
jl_function_t *pdf = handle_eval_string("x -&gt; pdf(normal, x)");
jl_function_t *cdf = handle_eval_string("x -&gt; cdf(normal, x)");The full code is below

File integration4.cpp

### 7: Creating a class to wrap the Distributions package

To complicate it a little bit more, let’s create a class wrapping the Distributions package. The basic idea will be a constructor to call `Normal` , and C++ functions wrapping `pdf` and `cdf`. This can be done simply by having a call to `handle_eval_string` or by creating the function with `jl_get_function` and calling `jl_call_X`.

However, to make it more efficient, we want to avoid frequent calls to the functions that deal with strings. One solution is to store the functions returned by `jl_get_function` and just use them when necessary. To do that, we will use `static` members in C++.

The two files below show the implementation of our class:

File Normal.hFile Normal.cpp

As you can see, we keep a `distributions_loaded` flag to let the constructor know that the static variables can be used. In the initialization function, we define the necessary functions. The actual implementation of the constructor and the PDF and CDF functions is straightforward.

We can use this new class in our main file easily:

File integration5.cpp

Don’t forget to update your Makefile by replacing `aux.o` by `aux.o Normal.o`, i.e., add `Normal.o` next to`aux.o`. The result of this execution is

x: -4.00e+00  pdf: +4.97e-08  cdf: +1.12e-08
x: -3.00e+00  pdf: +2.73e-06  cdf: +7.07e-07
x: -2.00e+00  pdf: +8.29e-05  cdf: +2.52e-05
x: -1.00e+00  pdf: +1.39e-03  cdf: +5.11e-04
x: +0.00e+00  pdf: +1.30e-02  cdf: +5.95e-03
x: +1.00e+00  pdf: +6.68e-02  cdf: +4.04e-02
x: +2.00e+00  pdf: +1.90e-01  cdf: +1.64e-01
x: +3.00e+00  pdf: +3.00e-01  cdf: +4.18e-01
x: +4.00e+00  pdf: +2.62e-01  cdf: +7.13e-01

### 8: Linear algebra: Arrays, Vectors, and Matrices

Let’s start our linear algebra exploration with a matrix-vector multiplication and solving a linear system. We will define the following:

![10 examples of embedding Julia in C/C++](/assets/10-examples-of-embedding-julia-in-cc-cb02c815.png)
x is a vector of ones and A is a matrix with n in the diagonal, 1 below the diagonal and -1 above the diagonal. LaTeX: x = \begin{bmatrix} 1 \\ 1 \\ 1 \\ \vdots \\ 1 \end{bmatrix}, A = \begin{bmatrix} n &amp; -1 &amp; -1 &amp; \cdots &amp; -1 \\ 1 &amp; n &amp; -1 &amp; \cdots &amp; -1 \\ 1 &amp; 1 &amp; n &amp; \cdots &amp; -1 \\ \vdots &amp; \vdots &amp; \vdots &amp; \ddots &amp; \vdots \\ 1 &amp; 1 &amp; 1 &amp; \cdots &amp; n \end{bmatrix}Let’s start with some code:

Snippet from linear-algebra1.cpp

The first two statements define the vectors and matrices types. Notice that we make explicit that the first has 1 dimension and the second has 2 dimensions.

The next 3 statements allocate the memory for the two vectors `x` and `y`, and the matrix `A`, using the array types we previously defined.

Finally, we have a `JL_GC_PUSH3`, which informs Julia’s Garbage Collector to not touch this memory. Naturally, we will have to pop these eventually.

Lastly, we declare C arrays pointing to the Julia data. You will notice that `AData` is a 1-dimensional array because Julia implements dense matrices as a linearized array by columns. That means that the element`(i,j)` will be at the linearized position `i + j * nrows` — using 0-based indexing.

To fill the values of the vector `x` and the matrix `A` , we can use the code below:

Snippet from linear-algebra1.cpp

The product of `A` and `x` is pretty much the same as any function we had so far.

Snippet from linear-algebra1.cpp

The noteworthy part of this code is that we have to cast the arrays for `jl_value_t *` to use them as arguments to `jl_call2` , and the output is cast to `jl_array_t *`. Similarly, we can use `jl_array_data(Ax)` to access the content of the product.

We can also use `mul!` to compute the product in place, i.e., without allocating more memory:

Snippet from linear-algebra1.cpp

Notice that we use `jl_main_module` because `mul!` is part of `LinearAlgebra` .

Finally, we move on to solving the linear system. To do that, let’s use the [LU factorization](https://en.wikipedia.org/wiki/LU_decomposition) and the `ldiv!` function. The `\` [(backslash) operator](https://docs.julialang.org/en/v1/stdlib/LinearAlgebra/#Base.:\\-Tuple{AbstractMatrix,%20AbstractVecOrMat}) is usually used here, but we choose `ldiv!` to solve the linear system in place.

jl_function_t *lu_fact = jl_get_function(jl_main_module, "lu");
jl_value_t *LU = jl_call1(lu_fact, (jl_value_t *) A);
jl_function_t *ldiv = jl_get_function(jl_main_module, "ldiv!");
jl_call3(ldiv, (jl_value_t *) y, LU, (jl_value_t *) Ax);The last call defines `y` as the solution of the linear system `Ay = (Ax)` . Since `A` is non-singular, we expect `y` and `x` to be sufficiently close (numerical errors could appear here). We can verify this using

double *yData = (double *) jl_array_data(y);
double norm2 = 0.0;
for (size_t i = 0; i &lt; n; i++) {
    double dif = yData[i] - xData[i];
    norm2 += dif * dif;
}
cout &lt;&lt; "|x - y|² = " &lt;&lt; norm2 &lt;&lt; endl;My result was `6.48394e-26` .

To finalize this code, we have to run

JL_GC_POP();This allows the Julia Garbage Collector to collect the allocated memory. The complete code can be seen below:

File linear-algebra1.cpp

### 9: Sparse matrices

For our next example, we will solve a heat-equation on 1 spatial dimension, using a discretization of time and space called Backward Time Centered Space (BTCS), which is not quick to explain. Check [these notes](https://john-s-butler-dit.github.io/NumericalAnalysisBook/Chapter%2008%20-%20Heat%20Equations/802_Heat%20Equation-%20BTCS.html#the-implicit-backward-time-centered-space-btcs-difference-equation) for a thorough explanation.

For our interests, it suffices to say that we will be solving a sparse linear system multiple times, where the matrix is the one below:

![10 examples of embedding Julia in C/C++](/assets/10-examples-of-embedding-julia-in-cc-8f6c1ad9.png)
Tridiagonal matrix, where the diagonal stores 1 plus 2 times kappa, and the off-diagonal values are -kappa. LaTeX: A = \begin{bmatrix} 1 + 2\kappa &amp; -\kappa \\ -\kappa &amp; 1 + 2\kappa &amp; \kappa \\ &amp; \ddots &amp; \ddots &amp; \ddots \\ &amp; &amp; -\kappa &amp; 1 + 2\kappa &amp; -\kappa \\ &amp; &amp; &amp; -\kappa &amp; 1 + 2\kappa \end{bmatrix}We don’t have to store this matrix as a dense matrix (like in the previous example). Instead, we want to store only the relevant elements. To do that, we will create three vectors for the rows and columns indexes, and for the values corresponding to these indexes.

The code is below:

long int rows[3 * n - 2], cols[3 * n - 2];
double vals[3 * n - 2];for (size_t i = 0; i &lt; n; i++) {
    rows[i] = i + 1;
    cols[i] = i + 1;
    vals[i] = (1 + 2 * kappa);
    if (i &lt; n - 1) {
        rows[n + i] = i + 1;
        cols[n + i] = i + 2;
        vals[n + i] = -kappa;
        rows[2 * n + i - 1] = i + 2;
        cols[2 * n + i - 1] = i + 1;
        vals[2 * n + i - 1] = -kappa;
    }
}Now, we will create a sparse matrix using the `sparse` function from the `SparseArrays` module in Julia. For that, we allocate two array types, one for the integers, and one for the floating point numbers.

Snippet from linear-algebra3.cpp

On the `jl_call3` , we also call `jl_ptr_to_array_1d` to directly create and return a Julia vector wrapping the data we give it.

The `A_sparse`matrix is a Julia sparse matrix. Many of the matrix operations that work with dense matrices will work with sparse matrices. To test a different factorization, let’s use the function `ldl` from the `LDLFactorizations` package.

Snippet from linear-algebra3.cpp

Now, we can use `ldiv!` with `ldlObj` instead of the LU factorization that we used in the previous example. There is one catch, though. Since we are using the `ldlObj` “for a while”, we need to prevent the Garbage collector to clean it. But the `JL_GC_PUSHX` function can only be called once per scope. Therefore, to use it we have to create an internal scope. So something like the following:

Scope your second JL_GC_PUSH

The complete code is below:

File linear-algebra3.cpp

In the algorithm, we define `u` as the initial vector, then solve the linear system right `u` as the right-hand side to obtain `unew`. Then we assign `unew` to `u` and repeat. Each `u` is an approximation to the solution of the heat equation for a specific moment in time.

You will notice that, in addition to computing the solution, we also plot it using the `Plots` package. We plot the initial solution at different times. This makes the code much slower, unfortunately. The result can be seen below:

![10 examples of embedding Julia in C/C++](/assets/10-examples-of-embedding-julia-in-cc-a6a7c60e.png)
Plot of heat equation solution at different moments in time.

### Finalizing and open questions

I hope these 10 examples are helpful to get you started with embedding Julia in C. There are many more things not covered here, in particular things I do not know. Some of them are:

* How to deal with strings?
* How to deal with keyword arguments?
* How to deal with installing packages and environments?
* How to make it faster (e.g., using precompiled images)?

I will be on the lookout for future projects to investigate these. In the meantime, like and follow for more Julia and C/C++ content.

### References and extra material

* [Embedding Julia in the Julia documentation](https://docs.julialang.org/en/v1/manual/embedding/)
* [Embedding Julia libraries in C++ by Matthijs Cox](https://forem.julialang.org/matthijscox/embedding-julia-libraries-in-c-1n12)
* [https://discourse.julialang.org/t/calling-jl-gc-push1-multiple-times/18666](https://discourse.julialang.org/t/calling-jl-gc-push1-multiple-times/18666)
