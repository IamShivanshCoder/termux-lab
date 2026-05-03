var ARTICLE_networking = {
  id: "networking",
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
};
