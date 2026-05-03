var ARTICLE_file_sharing_internet = {
  id: "file-sharing-internet",
  title: "Every Way to Share Files Over the Internet from Termux",
  subtitle: "Local network, public internet, large files, quick links — all methods explained simply.",
  category: "Networking",
  author: "Shivansh Bansal",
  date: "May 2025",
  readTime: "8 min read",
  featured: true,
  cover: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&auto=format&fit=crop",
  content: `
<p>Sharing a file sounds simple until you actually need to do it fast, without an account, without size limits, and without your file sitting on someone else's server forever. This guide covers every practical method — from same-room transfers to sending a file to someone on the other side of the world.</p>

<h2>Method 1 — Same Network (Fastest, Zero Setup)</h2>
<p>If both people are on the same Wi-Fi, this is always the best option. Start a Python server:</p>
<pre><code>cd /sdcard/Downloads
python -m http.server 8080</code></pre>

<p>Find your local IP:</p>
<pre><code>ifconfig | grep inet</code></pre>

<p>Share the address <code>http://YOUR_IP:8080</code> and they open it in any browser. No internet required at all — works even if your router has no internet connection.</p>

<blockquote>Best for: transferring files between your own devices, sharing with someone in the same room or house.</blockquote>

<h2>Method 2 — Cloudflare Tunnel (Best for Internet Sharing)</h2>
<p>This is the cleanest way to share over the internet. It creates a temporary public URL that tunnels directly to your Termux server. No port forwarding, no router settings.</p>

<p>Install cloudflared:</p>
<pre><code>pkg install cloudflared</code></pre>

<p>Start your Python server in one Termux session:</p>
<pre><code>cd /sdcard/Downloads
python -m http.server 8080</code></pre>

<p>Open a new Termux session and run:</p>
<pre><code>cloudflared tunnel --url http://localhost:8080</code></pre>

<p>You get a link like <code>https://random-name.trycloudflare.com</code>. Send that to anyone, anywhere. They open it in a browser and download directly from your phone.</p>

<blockquote>Best for: sharing with someone far away, temporary public links, no account needed. Link dies when you close Termux.</blockquote>

<h2>Method 3 — Transfer.sh (One Command Upload)</h2>
<p>Transfer.sh is a free public file hosting service usable entirely from the terminal. Upload a file with curl:</p>
<pre><code>curl --upload-file ./myfile.zip https://transfer.sh/myfile.zip</code></pre>

<p>It prints back a URL. Share that URL. The file stays available for 14 days then auto-deletes.</p>

<p>Download limit and file size limit apply on the free tier but for most files under 10GB it works fine.</p>

<blockquote>Best for: quick one-off shares where you want a permanent-ish link without running your own server.</blockquote>

<h2>Method 4 — Netcat (Geek Mode, Zero Internet Needed)</h2>
<p>Netcat is raw TCP. On the receiving device:</p>
<pre><code>nc -l -p 9999 > received_file.zip</code></pre>

<p>On your Termux (sender):</p>
<pre><code>nc RECEIVER_IP 9999 < myfile.zip</code></pre>

<p>The file transfers directly. No server, no URL, no browser. Install netcat with:</p>
<pre><code>pkg install netcat-openbsd</code></pre>

<blockquote>Best for: two Linux/Termux users on the same network who want maximum speed and zero overhead.</blockquote>

<h2>Which Method Should You Use?</h2>
<p>Here is the simple decision tree:</p>
<ul>
  <li>Same Wi-Fi network → <strong>Python HTTP server</strong></li>
  <li>Different networks, want a browser link → <strong>Cloudflare tunnel</strong></li>
  <li>Want a shareable link without keeping Termux open → <strong>Transfer.sh</strong></li>
  <li>Both sides are on Linux/Termux → <strong>Netcat</strong></li>
</ul>

<p>For most everyday situations, the Cloudflare tunnel method wins. It works across the internet, requires no account, generates a real HTTPS link, and your file never touches a third-party server — it streams directly from your phone to the downloader.</p>
`
};
