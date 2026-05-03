var ARTICLE_c_programming = {
  id: "c-programming",
  title: "Writing and Compiling C Programs in Termux",
  subtitle: "From first printf to debugging with lldb — a complete guide to C development on your Android device.",
  category: "Dev",
  author: "Aditya K.",
  date: "Mar 2025",
  readTime: "7 min read",
  featured: false,
  cover: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=1200&q=80",
  content: `<h2>C Development on Android</h2>
<p>It might sound unusual, but Termux provides a fully functional C toolchain on Android. With clang, make, and lldb available through the package manager, you can write, compile, run, and debug C programs right from your phone. This is not a toy setup — it uses the same LLVM toolchain you would find on a desktop Linux machine.</p>

<h2>Step 1: Install the Toolchain</h2>
<p>Open Termux and install the core development packages:</p>
<pre><code>pkg update && pkg upgrade
pkg install clang make lldb git
</code></pre>
<p>This installs the Clang compiler (which includes the C standard library), GNU Make for build automation, and LLDB for debugging. The entire toolchain takes about 200 MB.</p>
<p>Verify the installation:</p>
<pre><code>clang --version
make --version
lldb --version</code></pre>

<h2>Step 2: Your First Program</h2>
<p>Create a project directory and write your first program:</p>
<pre><code>mkdir ~/c-dev && cd ~/c-dev
nvim hello.c</code></pre>
<pre><code>#include &lt;stdio.h&gt;

int main(void) {
    printf("Hello from Termux!\\n");
    return 0;
}</code></pre>
<p>Compile and run:</p>
<pre><code>clang -Wall -Wextra -o hello hello.c
./hello</code></pre>
<p>The <code>-Wall -Wextra</code> flags enable comprehensive warnings. Always compile with these — they catch common mistakes before they become bugs.</p>

<h2>Step 3: Working with Makefiles</h2>
<p>For anything beyond a single file, use a Makefile. Create one in your project directory:</p>
<pre><code>nvim Makefile</code></pre>
<pre><code>CC = clang
CFLAGS = -Wall -Wextra -g
TARGET = main
SRCS = main.c utils.c
OBJS = $(SRCS:.c=.o)

$(TARGET): $(OBJS)
\t$(CC) $(CFLAGS) -o $@ $^

%.o: %.c
\t$(CC) $(CFLAGS) -c $&lt; -o $@

clean:
\trm -f $(OBJS) $(TARGET)

.PHONY: clean</code></pre>
<p>Now build with a single command:</p>
<pre><code>make</code></pre>
<p>The <code>-g</code> flag in CFLAGS includes debug symbols, which we will need for LLDB.</p>

<h2>Step 4: Debugging with LLDB</h2>
<p>LLDB is a powerful debugger that works identically to its desktop counterpart. Start by compiling with debug symbols (the <code>-g</code> flag), then launch LLDB:</p>
<pre><code>lldb ./main</code></pre>
<p>Inside the LLDB prompt:</p>
<pre><code># Set a breakpoint at main
breakpoint set --name main

# Run the program
run

# Step through code
step
next

# Inspect a variable
frame variable myVar

# Continue execution
continue

# Quit
quit</code></pre>

<blockquote>Tip: Use <code>lldb -o "breakpoint set --name main" -o run ./main</code> to set a breakpoint and immediately start the program in one command. This saves typing on a phone keyboard.</blockquote>

<h2>Step 5: Common Patterns</h2>
<p>Here are some practical patterns for Termux C development:</p>
<ul>
<li><strong>Linking libraries:</strong> Use <code>pkg-config</code> to find library flags. Install it with <code>pkg install pkg-config</code>, then compile with <code>clang main.c $(pkg-config --cflags --libs library)</code>.</li>
<li><strong>Static analysis:</strong> Run <code>scan-build make</code> to use Clang's static analyzer. It finds null pointer dereferences, memory leaks, and other issues without running your code.</li>
<li><strong>Valgrind alternative:</strong> Termux does not ship Valgrind, but you can use AddressSanitizer by compiling with <code>-fsanitize=address -g</code> for runtime memory error detection.</li>
</ul>

<h2>Step 6: Building Larger Projects</h2>
<p>For multi-directory projects, organize your code with a standard layout:</p>
<pre><code>myproject/
├── src/
│   ├── main.c
│   └── utils.c
├── include/
│   └── utils.h
├── Makefile
└── README.md</code></pre>
<p>Update your Makefile to reflect this structure:</p>
<pre><code>CC = clang
CFLAGS = -Wall -Wextra -g -Iinclude
SRCS = $(wildcard src/*.c)
OBJS = $(SRCS:.c=.o)
TARGET = myproject</code></pre>

<h2>Performance Reality Check</h2>
<p>Compiling C code on a modern Android device is surprisingly fast. A mid-range phone with a Snapdragon 7-series chip can compile a moderate-sized C project in roughly the same time as a budget laptop from 2018. The limiting factor is rarely CPU — it is usually storage I/O speed. If your phone uses eMMC storage rather than UFS, compilation will be noticeably slower.</p>

<blockquote>For learning C, systems programming, or competitive programming practice, Termux is genuinely capable. For large production codebases, you would still want a desktop — but for everything in between, your phone is enough.</blockquote>`
};
