/* ============================================================
   TermuxLab — Articles Database (CMS)
   ============================================================

   HOW TO ADD A NEW ARTICLE:
   1. Add a new object to the ARTICLES array below.
   2. Copy the structure from an existing article as a template.
   3. Field descriptions:
      - id:        Unique slug for the URL (e.g. "my-new-guide").
                   Used as: article.html?id=my-new-guide
      - title:     Headline shown on cards and the article page.
      - subtitle:  One-line description shown beneath the title.
      - category:  Tag label (e.g. "Setup", "Networking", "Dev", "Tools").
      - author:    Display name of the writer.
      - date:      Publication date string (e.g. "May 2025").
      - readTime:  Estimated reading time (e.g. "7 min read").
      - featured:  Set to true for the hero article on the homepage.
                   ONLY ONE article should have featured: true at a time.
                   Set all others to false.
      - cover:     URL of the cover image (any valid image URL works).
      - content:   Full HTML string of the article body. Use <h2>, <p>,
                   <pre><code>, <ul>, <ol>, <blockquote>, etc.
   4. Save the file and reload the browser — that's it.
   ============================================================ */

const ARTICLES = [
  {
    id: "arch-linux-proot-distro",
    title: "Running Full Arch Linux Inside Termux with proot-distro",
    subtitle: "A complete step-by-step guide to installing and configuring Arch Linux in your Android terminal without rooting your device.",
    category: "Setup",
    author: "Aditya K.",
    date: "May 2025",
    readTime: "8 min read",
    featured: true,
    cover: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=1200&q=80",
    content: `<h2>Why Run Arch Linux on Android?</h2>
<p>Termux has long been the gateway to a real Linux environment on Android. But if you have ever felt limited by the default package repository or wanted access to the vast Arch User Repository, running a full Arch Linux instance inside Termux is the answer. Thanks to <code>proot-distro</code>, you can do this without root access — no custom kernel, no Magisk, no risk of bricking your phone.</p>
<p>proot-distro uses PRoot, a user-space implementation of <code>chroot</code> and <code>mount --bind</code>, to create a full Linux filesystem isolation layer. It is not a virtual machine, so there is virtually no performance overhead. Your phone's CPU runs the Arch binaries natively through the Android kernel.</p>

<h2>Prerequisites</h2>
<p>Before we begin, make sure you have:</p>
<ul>
<li>Termux installed from <a href="https://f-droid.org/packages/com.termux/">F-Droid</a> (the Play Store version is outdated)</li>
<li>At least 2 GB of free storage</li>
<li>A stable internet connection for downloading the rootfs</li>
<li>Basic familiarity with Linux commands</li>
</ul>

<h2>Step 1: Install proot-distro</h2>
<p>Open Termux and update your package list, then install proot-distro:</p>
<pre><code>pkg update && pkg upgrade
pkg install proot-distro</code></pre>
<p>This pulls in PRoot and the distro management scripts. The package is maintained by the Termux community and receives regular updates.</p>

<h2>Step 2: Install Arch Linux</h2>
<p>With proot-distro installed, listing available distributions is straightforward:</p>
<pre><code>proot-distro list</code></pre>
<p>You should see <code>archlinux</code> in the output. To install it:</p>
<pre><code>proot-distro install archlinux</code></pre>
<p>This downloads the Arch Linux rootfs tarball (approximately 150 MB) and extracts it into Termux's data directory. The process takes about 2-3 minutes on a decent connection.</p>

<blockquote>Tip: If the download fails midway, run <code>proot-distro reset archlinux</code> to clean up the partial installation and try again. A stable Wi-Fi connection is recommended.</blockquote>

<h2>Step 3: Log In and Initialize</h2>
<p>Once installed, log into your Arch environment:</p>
<pre><code>proot-distro login archlinux</code></pre>
<p>You will be dropped into a root shell. The first thing to do is initialize the pacman keyring and update the system:</p>
<pre><code>pacman-key --init
pacman-key --populate archlinux
pacman -Syu</code></pre>
<p>This synchronizes the package database and upgrades all base packages. It may take a few minutes depending on your connection speed.</p>

<h2>Step 4: Create a Non-Root User</h2>
<p>Running everything as root is bad practice. Let's create a regular user:</p>
<pre><code>pacman -S sudo
useradd -m -G wheel -s /bin/bash termux
passwd termux
</code></pre>
<p>Edit the sudoers file to allow wheel group members to use sudo:</p>
<pre><code>EDITOR=nano visudo</code></pre>
<p>Uncomment the line <code>%wheel ALL=(ALL:ALL) ALL</code> by removing the leading <code>#</code>, then save and exit.</p>

<h2>Step 5: Install Your Tools</h2>
<p>Now you have a full Arch Linux environment. Install whatever you need:</p>
<pre><code>sudo pacman -S neovim git python nodejs gcc make curl wget</code></pre>
<p>The Arch User Repository (AUR) is also accessible through helpers like <code>yay</code> or <code>paru</code>, though building AUR packages on ARM devices may require patching some PKGBUILDs.</p>

<h2>Performance Notes</h2>
<p>Since proot-distro runs through a syscall translation layer, some operations are slower than native Linux. Disk I/O and process spawning see the most noticeable impact. However, CPU-bound tasks like compilation run at near-native speed. For daily development, scripting, and even running servers, the performance is more than adequate.</p>

<blockquote>Remember: proot-distro does not give you a custom kernel. You are still bound by the Android kernel's capabilities. Features like Docker, custom iptables rules, or raw socket access require root and will not work in this setup.</blockquote>

<h2>Making It Persistent</h2>
<p>Your Arch installation persists across Termux sessions. You can create a simple alias in your <code>~/.bashrc</code> for quick access:</p>
<pre><code>alias arch='proot-distro login archlinux -- termux-user termux'</code></pre>
<p>Now just type <code>arch</code> in Termux and you are inside your Arch environment as your regular user.</p>`
  },
  {
    id: "neovim-ide-termux",
    title: "Setting Up Neovim as a Full IDE in Termux",
    subtitle: "Configure clangd, LSP, and essential plugins to turn Neovim into a powerful development environment — no Mason required.",
    category: "Dev",
    author: "Aditya K.",
    date: "Apr 2025",
    readTime: "10 min read",
    featured: false,
    cover: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&q=80",
    content: `<h2>Why Neovim on Termux?</h2>
<p>Termux gives you a real terminal on Android, and Neovim is the most capable editor you can run inside it. With the right configuration, Neovim transforms from a text editor into a full IDE with autocompletion, linting, symbol navigation, and integrated terminal — all running directly on your phone.</p>
<p>The challenge on Termux is that some popular plugin managers and tools like <code>mason.nvim</code> can be finicky on ARM Linux. This guide shows you how to set up a robust Neovim configuration using manually installed LSP servers and carefully chosen plugins that work reliably on Termux.</p>

<h2>Step 1: Install Neovim and Dependencies</h2>
<p>Start by installing Neovim and the tools we will need:</p>
<pre><code>pkg install neovim git nodejs clang ripgrep fd
</code></pre>
<p>This gives us Neovim 0.9+, Node.js (for some LSP servers), clang (for the C/C++ language server), ripgrep (for telescope file searching), and fd (for fast file discovery).</p>

<h2>Step 2: Install LSP Servers Manually</h2>
<p>Instead of relying on Mason, we install language servers directly through package managers or npm:</p>
<pre><code># Python LSP
pkg install python
pip install python-lsp-server

# TypeScript/JavaScript LSP
npm install -g typescript-language-server typescript

# Bash LSP
npm install -g bash-language-server

# Lua LSP
pkg install lua-language-server
</code></pre>
<p>The clangd server comes with the <code>clang</code> package we already installed. Verify it works:</p>
<pre><code>clangd --version</code></pre>

<h2>Step 3: Bootstrap Your Config</h2>
<p>Create the Neovim configuration directory and your init file:</p>
<pre><code>mkdir -p ~/.config/nvim
nvim ~/.config/nvim/init.lua</code></pre>

<h2>Step 4: Plugin Manager — lazy.nvim</h2>
<p>We use lazy.nvim as our plugin manager. Add this bootstrap code to <code>init.lua</code>:</p>
<pre><code>local lazypath = vim.fn.stdpath("data") .. "/lazy/lazy.nvim"
if not vim.loop.fs_stat(lazypath) then
  vim.fn.system({
    "git", "clone", "--filter=blob:none",
    "https://github.com/folke/lazy.nvim.git",
    "--branch=stable", lazypath,
  })
end
vim.opt.rtp:prepend(lazypath)

require("lazy").setup({
  -- Plugins go here
})</code></pre>

<h2>Step 5: Essential Plugins</h2>
<p>Add these plugins to your <code>lazy.setup</code> block:</p>
<pre><code>{ "nvim-treesitter/nvim-treesitter", build = ":TSUpdate" },
{ "neovim/nvim-lspconfig" },
{ "hrsh7th/nvim-cmp" },
{ "hrsh7th/cmp-nvim-lsp" },
{ "L3MON4D3/LuaSnip" },
{ "hrsh7th/cmp-luasnip" },
{ "nvim-telescope/telescope.nvim" },
{ "tpope/vim-fugitive" },
{ "marko-cerovac/material.nvim" },</code></pre>
<p>Run <code>:Lazy</code> inside Neovim to install everything. Then configure Treesitter:</p>
<pre><code>require("nvim-treesitter.configs").setup({
  ensure_installed = { "c", "lua", "python", "javascript", "bash" },
  highlight = { enable = true },
})</code></pre>

<h2>Step 6: LSP Configuration</h2>
<p>Configure each LSP server in your init.lua:</p>
<pre><code>local lspconfig = require("lspconfig")

lspconfig.clangd.setup({})
lspconfig.pyright.setup({})
lspconfig.lua_ls.setup({})
lspconfig.ts_ls.setup({})
lspconfig.bashls.setup({})</code></pre>

<blockquote>Tip: If an LSP server fails to start, check <code>:LspInfo</code> for diagnostics. On Termux, the most common issue is a missing binary in your PATH. Use <code>which clangd</code> to verify the server is accessible.</blockquote>

<h2>Step 7: Autocompletion with nvim-cmp</h2>
<p>Tie together the completion sources:</p>
<pre><code>local cmp = require("cmp")
cmp.setup({
  sources = cmp.config.sources({
    { name = "nvim_lsp" },
    { name = "luasnip" },
    { name = "buffer" },
    { name = "path" },
  }),
  mapping = cmp.mapping.preset.insert({
    ["<C-Space>"] = cmp.mapping.complete(),
    ["<C-e>"] = cmp.mapping.abort(),
    ["<CR>"] = cmp.mapping.confirm({ select = true }),
  }),
})</code></pre>

<h2>Step 8: Keymaps and Quality of Life</h2>
<p>Set up practical keymaps for your phone workflow:</p>
<pre><code>vim.keymap.set("n", "&lt;leader&gt;ff", "&lt;cmd&gt;Telescope find_files&lt;cr&gt;")
vim.keymap.set("n", "&lt;leader&gt;fg", "&lt;cmd&gt;Telescope live_grep&lt;cr&gt;")
vim.keymap.set("n", "&lt;leader&gt;e", "&lt;cmd&gt;Neotree&lt;cr&gt;")
vim.keymap.set("n", "gd", vim.lsp.buf.definition)
vim.keymap.set("n", "K", vim.lsp.buf.hover)</code></pre>

<h2>Final Thoughts</h2>
<p>This setup gives you syntax highlighting, intelligent autocompletion, go-to-definition, hover documentation, and fuzzy file search — all running on your Android device. The configuration is lightweight enough to run smoothly on mid-range phones and scales up nicely on more powerful devices.</p>
<p>Once you are comfortable, explore adding linters, formatters, and a file explorer plugin like <code>nvim-tree.lua</code> to round out the experience.</p>`
  },
  {
    id: "c-programs-termux",
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
  },
  {
    id: "termux-networking-toolkit",
    title: "Termux Networking Toolkit: nmap, curl, wget and Beyond",
    subtitle: "Turn your Android device into a portable network reconnaissance and analysis workstation.",
    category: "Networking",
    author: "Aditya K.",
    date: "Feb 2025",
    readTime: "9 min read",
    featured: false,
    cover: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&q=80",
    content: `<h2>Networking from Your Pocket</h2>
<p>Termux gives you access to the same networking tools that security professionals and system administrators use on desktop Linux. Whether you are scanning your home network for unknown devices, testing API endpoints, or downloading files from the command line, Termux has you covered. The best part: most of these tools work without root access.</p>

<h2>Essential Tools Installation</h2>
<p>Install the core networking toolkit:</p>
<pre><code>pkg install nmap curl wget netcat-openbsd tcpdump ssh openssh traceroute
</code></pre>
<p>This single command gives you a remarkably powerful set of utilities. Let's go through each one.</p>

<h2>nmap — Network Discovery and Security Auditing</h2>
<p>nmap is the gold standard for network scanning. On Termux, it works fully for non-privileged scans (which do not require raw sockets):</p>
<pre><code># Scan your local network for live hosts
nmap -sn 192.168.1.0/24

# Scan a specific host for open ports
nmap -sT -p 1-1000 192.168.1.1

# Service version detection
nmap -sT -sV -p 80,443,8080 target.com

# Export results to XML
nmap -sT -oX scan.xml 192.168.1.1</code></pre>

<blockquote>Important: Without root, nmap cannot perform SYN scans (<code>-sS</code>) or OS detection (<code>-O</code>). Use <code>-sT</code> (TCP connect scan) instead, which works without privileges and is equally effective for port discovery.</blockquote>

<h2>curl — The Swiss Army Knife of HTTP</h2>
<p>curl in Termux is the full version, identical to desktop Linux. Here are the most useful patterns:</p>
<pre><code># GET request with headers displayed
curl -v https://api.example.com/data

# POST JSON data
curl -X POST -H "Content-Type: application/json" \\
  -d '{"name":"test","value":42}' \\
  https://api.example.com/endpoint

# Download with progress bar
curl -O https://example.com/file.tar.gz

# Follow redirects and save with original name
curl -OL https://example.com/latest.tar.gz

# Measure response time
curl -o /dev/null -s -w "Time: %{time_total}s\\n" \\
  https://example.com</code></pre>

<h2>wget — Reliable File Downloading</h2>
<p>While curl is great for APIs, wget excels at downloading files, especially with resume support and recursive downloads:</p>
<pre><code># Download with resume support
wget -c https://example.com/large-file.iso

# Recursive download (mirror a directory)
wget -r -np -nH --cut-dirs=2 \\
  https://example.com/pub/docs/

# Download in background
wget -b https://example.com/archive.zip</code></pre>

<h2>netcat (nc) — Raw Network Communication</h2>
<p>Netcat is the "read/write anything over TCP/UDP" tool. Common uses on Termux:</p>
<pre><code># Simple TCP server on port 8080
nc -l -p 8080

# Connect to a remote host
nc 192.168.1.100 8080

# Port scan (quick and dirty)
for port in $(seq 1 1000); do
  nc -z -w1 192.168.1.1 $port && echo "Port $port open"
done

# Transfer a file between devices
# On receiving device:
nc -l -p 9999 > received_file
# On sending device:
nc 192.168.1.50 9999 &lt; file_to_send</code></pre>

<h2>tcpdump — Packet Capture</h2>
<p>Packet capture on Termux requires root access for raw socket operations. However, if you do have a rooted device, tcpdump works identically to desktop:</p>
<pre><code># Capture all traffic on wlan0
tcpdump -i wlan0

# Capture HTTP traffic only
tcpdump -i wlan0 port 80

# Save to file for later analysis
tcpdump -i wlan0 -w capture.pcap

# Read a saved capture
tcpdump -r capture.pcap</code></pre>
<p>Without root, you can still analyze pcap files downloaded from other sources using <code>tcpdump -r</code>.</p>

<h2>ssh — Remote Access</h2>
<p>Termux includes a full OpenSSH client. Connect to remote servers just like on any Linux machine:</p>
<pre><code># Connect to a remote server
ssh user@server.com

# Use a specific identity file
ssh -i ~/.ssh/id_ed25519 user@server.com

# Port forwarding (local to remote)
ssh -L 8080:localhost:80 user@server.com

# Run a single command remotely
ssh user@server.com "uptime &amp;&amp; free -h"</code></pre>
<p>You can also run an SSH server on your Termux device with <code>pkg install openssh</code> and <code>sshd</code>, allowing you to access your phone from your desktop.</p>

<h2>traceroute — Network Path Analysis</h2>
<p>Trace the route packets take to a destination:</p>
<pre><code># Basic traceroute
traceroute google.com

# Use TCP instead of ICMP (works through more firewalls)
traceroute -T -p 443 google.com

# Set max hops
traceroute -m 15 target.com</code></pre>

<blockquote>Security note: Only scan networks and devices you own or have explicit permission to test. Unauthorized network scanning may violate local laws and terms of service. These tools are for educational and authorized administrative use.</blockquote>

<h2>Putting It All Together</h2>
<p>With these tools installed, your Android device becomes a legitimate portable networking workstation. You can diagnose connectivity issues, audit your home network, test APIs on the go, and securely access remote servers — all from the same terminal you use for everything else. The convergence of mobile hardware and Linux tooling means there is genuinely no reason to leave your phone at home for most networking tasks.</p>`
  }
];
