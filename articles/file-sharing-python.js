var ARTICLE_file_sharing_python = {
  id: "file-sharing-python",
  title: "Share Files Instantly from Termux Using Python",
  subtitle: "Turn your Android into a file server in one command — no apps, no accounts, no cloud.",
  category: "Tools",
  author: "Shivansh Bansal",
  date: "May 2025",
  readTime: "5 min read",
  featured: false,
  cover: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1200&auto=format&fit=crop",
  content: `
<p>You have a file on your phone. Someone nearby needs it. No USB cable, no Bluetooth fumbling, no "send via WhatsApp and lose quality." Just Termux and one command.</p>

<p>Python ships with a built-in HTTP server. It requires zero setup, zero accounts, and works on any network. Here is how to use it.</p>

<h2>What You Need</h2>
<p>Just Termux with Python installed. If you haven't installed it yet:</p>
<pre><code>pkg update && pkg install python</code></pre>

<h2>Start the File Server</h2>
<p>Navigate to the folder containing the file you want to share:</p>
<pre><code>cd /sdcard/Downloads</code></pre>

<p>Then start the server:</p>
<pre><code>python -m http.server 8080</code></pre>

<p>That's it. Your phone is now a file server.</p>

<h2>How the Other Person Downloads It</h2>
<p>You need to tell them your phone's IP address on the local network. Find it with:</p>
<pre><code>ifconfig | grep inet</code></pre>

<p>Look for a number like <code>192.168.1.x</code>. Now tell the other person to open their browser and go to:</p>
<pre><code>http://192.168.1.x:8080</code></pre>

<p>They will see a list of all files in that folder. They click, it downloads. Done.</p>

<blockquote>Both devices must be on the same Wi-Fi network for this to work. This is the local sharing method — for internet sharing across different networks, see our guide on sharing files over the internet.</blockquote>

<h2>Share a Specific File Only</h2>
<p>If you don't want to expose the entire folder, move just that file to a temporary empty folder first:</p>
<pre><code>mkdir ~/share_temp
cp /sdcard/Downloads/myfile.zip ~/share_temp
cd ~/share_temp
python -m http.server 8080</code></pre>

<h2>Stop the Server</h2>
<p>When you're done, press <code>Ctrl + C</code> in Termux. The server stops instantly and no one can access the files anymore.</p>

<h2>Change the Port</h2>
<p>8080 is the default in this guide but you can use any number above 1024:</p>
<pre><code>python -m http.server 9090</code></pre>

<p>Just make sure the person accessing uses the same port number in their browser.</p>

<h2>Why This Is Underrated</h2>
<p>Most people reach for Google Drive or WhatsApp without thinking. But those services compress images, have size limits, require accounts, and upload your file to a third-party server first. The Python method is direct device-to-device, instant, and leaves no copy anywhere in the cloud. For local transfers it is genuinely the fastest option available.</p>
`
};
