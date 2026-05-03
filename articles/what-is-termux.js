// articles/what-is-termux.js
const ARTICLE_what_is_termux = {
  id: "what-is-termux",
  title: "What Is Termux and Why Should You Care",
  subtitle: "A terminal emulator and Linux environment that turns your Android phone into a real development machine — no root required.",
  category: "Setup",
  author: "Shivansh Bansal",
  date: "May 2026",
  readTime: "5 min read",
  featured: false,
  cover: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&auto=format&fit=crop",
  content: `<p>Your phone runs Linux underneath Android. Termux gives you direct access to it. No root, no custom ROM, no warranty-voiding tricks. Just a single APK that turns your Android device into a pocket-sized Linux machine.</p>

<p>Termux is a terminal emulator app paired with its own Linux environment. It ships a package manager, giving you access to hundreds of tools you would normally only find on a desktop Linux system. Python, Node.js, Git, Neovim, SSH, curl — all installable with a single command.</p>

<h2>What Termux Actually Is</h2>

<p>Termux is not an SSH client to some remote server. It is not a simulated terminal with fake commands. It runs real compiled binaries against the Android kernel using its own prefix at <code>$PREFIX</code> (which resolves to <code>/data/data/com.termux/files/usr</code>).</p>

<p>Think of it as a self-contained Linux distribution that lives inside your app data directory. It does not modify your system partition. It does not need root. It coexists with every other app on your phone.</p>

<p>The key difference between Termux and other terminal apps is the package manager. Apps like Termux:Boot or Terminal Emulator give you a shell, but Termux gives you <code>pkg</code> — a wrapper around APT that lets you install, update, and manage software just like you would on Debian or Ubuntu.</p>

<h2>What You Can Do With It</h2>

<p>Here is where people usually get surprised. Termux is not just for running <code>ls</code> and feeling like a hacker. Here are real things people use it for:</p>

<ul>
<li><strong>Programming on the go</strong> — Python, Ruby, Node.js, C/C++, Rust, Go. Install compilers and interpreters directly and write code anywhere.</li>
<li><strong>Server testing</strong> — Spin up a local HTTP server, test APIs, or run a database like PostgreSQL or MariaDB right on your phone.</li>
<li><strong>System administration</strong> — SSH into remote servers, run Ansible playbooks, manage Git repositories.</li>
<li><strong>Learning Linux</strong> — If you want to practice Linux commands without installing a VM or dual-booting, Termux is the fastest path.</li>
<li><strong>Automation</strong> — Write scripts that interact with your phone through the Termux:API addon. Access your camera, clipboard, battery status, and notification log from the command line.</li>
</ul>

<h2>Getting Started</h2>

<p>First, install Termux. Get it from <a href="https://f-droid.org/packages/com.termux/" target="_blank" rel="noopener">F-Droid</a>, not the Google Play Store. The Play Store version is outdated and no longer maintained due to Android policy changes around target SDK requirements.</p>

<p>Once installed, open it and update your package list:</p>

<pre><code>pkg update && pkg upgrade</code></pre>

<p>This is the first command you will run often. It fetches the latest package information and upgrades everything to the newest versions. You will see a prompt asking about modified configuration files — just press Enter to keep the default.</p>

<p>Now install something useful:</p>

<pre><code>pkg install git python neovim</code></pre>

<p>That single command installs Git, Python 3, and Neovim. On a desktop, you would need to configure repositories, resolve dependencies, and possibly compile from source. In Termux, it just works.</p>

<h2>How Termux Handles File Storage</h2>

<p>Termux has its own isolated filesystem. Your home directory lives at <code>~</code> (which is <code>/data/data/com.termux/files/home</code>). This is sandboxed — other apps cannot read it, and Termux cannot access your phone's storage by default.</p>

<p>To bridge this gap, Termux provides <code>termux-setup-storage</code>. Run it once and Termux gains access to your shared storage through <code>~/storage</code>:</p>

<pre><code>termux-setup-storage
ls ~/storage</code></pre>

<p>You will see directories like <code>dcim</code>, <code>downloads</code>, and <code>shared</code> mapped to your phone's actual folders. This is how you move files between Termux and the rest of your device.</p>

<blockquote>Important: Never run <code>rm -rf</code> inside <code>~/storage</code> unless you understand what you are deleting. Those symlinks point to real files on your phone, not copies. Deleting <code>~/storage/shared/somefile</code> removes it from your actual shared storage.</blockquote>

<h2>Termux Is Not a Full Linux Desktop</h2>

<p>Let us be honest about the limitations. Termux runs on the Android kernel, which means you do not have root access to modify kernel parameters. Some things will not work:</p>

<ul>
<li>Docker requires kernel features that Android disables by default</li>
<li>Raw socket access and certain networking tools need root</li>
<li>Systemd is not available — Termux uses its own service management</li>
<li>GUI applications require X11 forwarding through Termux:X11 or a VNC server</li>
</ul>

<p>But for programming, scripting, server management, and learning Linux, none of these matter. You can write and deploy production code from Termux. You can manage cloud infrastructure. You can run a full development workflow.</p>

<h2>What Should You Do Next</h2>

<p>If you are new to Termux, here is a sensible learning path:</p>

<ol>
<li>Install Termux from F-Droid and run <code>pkg update && pkg upgrade</code></li>
<li>Install your preferred tools — <code>pkg install git python</code> is a good start</li>
<li>Run <code>termux-setup-storage</code> to access your files</li>
<li>Try writing a simple Python script and running it</li>
<li>Explore our other guides for deeper setups like Arch Linux, Neovim configuration, and networking tools</li>
</ol>

<p>Termux turns dead time — commutes, waiting rooms, power outages — into productive sessions. Your phone is a computer. Termux makes it act like one.</p>`
};
