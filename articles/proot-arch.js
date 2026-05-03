var ARTICLE_proot_arch = {
  id: "proot-arch",
  title: "Running Full Arch Linux Inside Termux with proot-distro",
  subtitle: "A complete step-by-step guide to installing and configuring Arch Linux in your Android terminal without rooting your device.",
  category: "Setup",
  author: "Aditya K.",
  date: "May 2025",
  readTime: "8 min read",
  featured: false,
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
};
