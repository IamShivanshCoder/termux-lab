// articles/language-interop.js
const ARTICLE_language_interop = {
  id: "language-interop",
  title: "How Different Programming Languages Work Together",
  subtitle: "FFI, bindings, and the bridges that let Python call C, Rust talk to JavaScript, and more",
  category: "Dev",
  author: "Shivansh Bansal",
  date: "May 2026",
  readTime: "6 min read",
  featured: false,
  cover: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&auto=format&fit=crop",
  content: `
<p>You don't need to rewrite everything in one language just because you picked a stack. Most real systems mix languages on purpose — Python for quick logic, C for speed, JavaScript for the web, Rust for safety. The trick is knowing how they talk to each other.</p>

<h2>Why Languages Need to Talk</h2>

<p>No single language wins at everything. Python is great for scripting but slow for heavy computation. C is fast but dangerous and tedious for high-level logic. JavaScript dominates the web but can't touch system internals directly.</p>

<p>Instead of choosing one, you combine them. A game might use C++ for the engine, Lua for modding, and Python for build scripts. A web backend might be Node.js with critical parts written in Rust. This isn't unusual — it's the norm once projects grow past toy size.</p>

<h2>Foreign Function Interface (FFI)</h2>

<p>FFI is the most common way languages call each other. It lets one language load and call functions written in another, usually at the native machine code level.</p>

<p>The key idea: compile the "other" language to a shared library (like a .so or .dll), then declare the function signatures in your host language so the compiler or runtime knows what to expect.</p>

<p>Here's Python calling a C function through ctypes:</p>

<pre><code>// Compile: gcc -shared -o libmath.so -fPIC mathlib.c
// mathlib.c
int add(int a, int b) {
    return a + b;
}

# Python side
import ctypes
lib = ctypes.CDLL("./libmath.so")
result = lib.add(10, 20)
print(result)  # 30</code></pre>

<p>The C code gets compiled to a shared object. Python's ctypes loads it at runtime and calls add() like it was a Python function. Same pattern works across many language pairs.</p>

<h2>Rust and JavaScript via WASM</h2>

<p>WebAssembly changed the game for web-based interop. You can compile Rust to WASM and call it from JavaScript with near-native speed.</p>

<pre><code>// Rust: compile with wasm-pack build --target web
#[no_mangle]
pub extern "C" fn double_value(x: i32) -> i32 {
    x * 2
}

// JavaScript
import init, { double_value } from './pkg/my_lib.js';
await init();
console.log(double_value(21));  // 42</code></pre>

<p>This works because WASM defines a clean boundary. Rust manages memory on its side, JavaScript on its. They exchange values through a defined interface, not shared state.</p>

<blockquote>WASM isn't just for the web. Runtimes like Wasmer and Wasmtime let you run WASM modules server-side, so you can use the same Rust-compiled module in Node.js, Python, or Go.</blockquote>

<h2>Language Bindings and Wrappers</h2>

<p>Sometimes FFI is too low-level. Bindings are hand-written or generated code that wraps one language's library in another's syntax, giving you a natural API in the host language.</p>

<p>Consider using TensorFlow:</p>

<ul>
<li>Core library: C++</li>
<li>Python users: pip install tensorflow (bindings handle the translation)</li>
<li>JavaScript users: @tensorflow/tfjs (rewritten, but same idea)</li>
<li>Go users: use the C bindings via cgo</li>
</ul>

<p>Each binding layer translates types, handles memory ownership, and maps errors. It's glue code, but it's what makes multi-language development practical.</p>

<h2>Inter-Process Communication (IPC)</h2>

<p>Not every language pair can link directly. When they run as separate processes, they talk over pipes, sockets, or shared memory.</p>

<p>Common IPC patterns:</p>

<ul>
<li>Stdin/stdout pipes — simple, parent-child only</li>
<li>Unix sockets — fast, local machine only</li>
<li>HTTP APIs — language agnostic, network ready</li>
<li>Message queues (Redis, RabbitMQ) — async, scalable</li>
</ul>

<p>A typical setup: a Python script spawns a Go binary to handle heavy processing, reads results over stdout.</p>

<pre><code>import subprocess

result = subprocess.run(
    ["./go_processor", "--mode", "fast"],
    capture_output=True,
    text=True
)
print(result.stdout)</code></pre>

<p>This avoids linking entirely. Each language runs in its own runtime, and they coordinate through data exchange.</p>

<h2>Memory and Type Boundaries</h2>

<p>The hardest part of interop isn't calling the function — it's managing what happens to memory and types at the boundary.</p>

<p>Each language has its own allocator, string format, and type system. C strings are null-terminated byte arrays. Python strings are Unicode objects with reference counting. Rust strings are UTF-8 with ownership semantics. They don't map cleanly.</p>

<p>Good interop layers define a neutral format at the boundary:</p>

<ul>
<li>C integers, floats, and pointers (the common ground)</li>
<li>Plain byte buffers with length prefixes</li>
<li>JSON or protobuf for complex data</li>
</ul>

<p>If you're writing the bridge yourself, keep the interface narrow. Pass simple types, serialize complex ones, and let each side manage its own memory.</p>

<h2>Which Approach Should You Use</h2>

<p>Pick FFI when you need speed and tight coupling — a C library called from Python, or Rust code in a Node.js app. The overhead is minimal but you take on memory safety risks at the boundary.</p>

<p>Pick IPC when you want isolation — separate runtimes, independent deployment, fault tolerance. A crashed helper process shouldn't bring down your main app.</p>

<p>Pick WASM when targeting the web or when you want a sandboxed, portable module that runs anywhere a WASM runtime exists.</p>

<p>Most projects end up using more than one. A single system might use FFI for its math library, IPC for its database connection, and HTTP for third-party services. That's not over-engineering — that's using the right tool for each job.</p>
`
};
