// articles/ani-cli-anime.js
const ARTICLE_ani_cli_anime = {
  id: "ani-cli-anime",
  title: "Watch Anime in Termux with ani-cli",
  subtitle: "Turn your Android phone into an anime streaming powerhouse using nothing but a terminal",
  category: "Tools",
  author: "Shivansh Bansal",
  date: "May 2026",
  readTime: "5 min read",
  featured: false,
  cover: "https://images.unsplash.com/photo-1578632292335-df3abbb0d586?w=1200&auto=format&fit=crop",
  content: `
<p>ani-cli transforms your Termux terminal into a fully functional anime streaming app. No browser, no ads, no tracking — just type a search query and start watching. It scrapes anime sites and pipes episodes directly into mpv, giving you a clean viewing experience right in your terminal.</p>

<h2>What is ani-cli</h2>
<p>ani-cli is a command-line tool that lets you search, stream, and download anime episodes directly from your terminal. It works by scraping popular anime sites and using mpv as the media player. The interface is entirely text-based, showing episode lists, quality options, and download progress right in your terminal window.</p>

<p>You get reliable access to anime without dealing with invasive ads or bloated web players. Since it runs in Termux, you can watch on your Android phone wherever you are, as long as you have an internet connection.</p>

<h2>Installing Dependencies</h2>
<p>Before installing ani-cli itself, you need to set up the tools it depends on. These include a media player (mpv), video downloader (yt-dlp), and a few utilities for handling streams.</p>

<pre><code>pkg update && pkg upgrade
pkg install mpv yt-dlp curl grep sed
pkg install fzf</code></pre>

<p>mpv handles video playback, yt-dlp fetches the video streams, and fzf provides the interactive menu system. Without these, ani-cli simply will not work.</p>

<blockquote>Always keep yt-dlp updated. Anime sites change their video delivery frequently, and an outdated yt-dlp breaks playback. Update it with: <code>yt-dlp -U</code></blockquote>

<h2>Installing ani-cli</h2>
<p>The installation is straightforward. Clone the repository and run the install script, or manually place the script in your PATH.</p>

<pre><code>cd ~
git clone https://github.com/pystardust/ani-cli.git
cd ani-cli
chmod +x ani-cli
cp ani-cli ~/../usr/bin/</code></pre>

<p>After copying to <code>~/../usr/bin/</code>, you can run <code>ani-cli</code> from anywhere in Termux. The command should now be available globally.</p>

<p>If the official repo is down or you prefer a fork with additional features, several community forks exist. The original pystardust version remains the most stable for basic use.</p>

<h2>Searching and Watching</h2>
<p>Launch ani-cli by typing the command. You will see a prompt asking for an anime name. Type your search query and press enter.</p>

<pre><code>ani-cli</code></pre>

<p>Use the arrow keys to navigate search results, then press enter to select an anime. You will then see a list of episodes. Select an episode and ani-cli opens it in mpv automatically. The video plays directly in your terminal or opens a separate mpv window depending on your setup.</p>

<p>To watch specific episodes, you can pass the anime name directly as an argument:</p>

<pre><code>ani-cli "Attack on Titan"</code></pre>

<h2>Quality and Player Settings</h2>
<p>ani-cli defaults to 1080p when available, but you can control quality by setting the <code>QUALITY</code> environment variable before running the command.</p>

<pre><code>QUALITY=720p ani-cli "One Piece"</code></pre>

<p>Lower quality helps if you are on a slow connection or want to save data. The available options depend on what the source site provides, but 480p, 720p, and 1080p are commonly available.</p>

<p>mpv handles playback controls. Use the spacebar to pause, arrow keys to seek, and <code>q</code> to quit. These are standard mpv shortcuts that work the same way in Termux.</p>

<h2>Downloading Episodes</h2>
<p>Streaming is not your only option. ani-cli can download episodes for offline viewing. This is useful when you know you will be without internet but still want to watch.</p>

<pre><code>ani-cli -d "Naruto"</code></pre>

<p>The <code>-d</code> flag triggers download mode. Instead of playing the episode, ani-cli saves it to your current directory. Downloads can take a while depending on the file size and your connection speed.</p>

<p>Episodes download as <code>.mp4</code> files with the episode number in the filename. You can watch them later with mpv directly:</p>

<pre><code>mpv ./episode_filename.mp4</code></pre>

<h2>Syncing Your Progress</h2>
<p>ani-cli includes a sync feature that tracks which episodes you have watched. This is stored locally in your Termux home directory and helps you resume where you left off.</p>

<p>The sync file lives at <code>~/.ani-cli/history</code>. You can view it manually or let ani-cli handle it automatically. When you select an anime you have watched before, it prompts you to continue from your last watched episode.</p>

<blockquote>Back up your sync history if you switch devices or reinstall Termux. Copy the <code>~/.ani-cli/</code> folder to a safe location.</blockquote>

<h2>Troubleshooting Common Issues</h2>
<p>Sometimes ani-cli cannot find episodes or fails to play them. Most issues come from outdated dependencies or site changes.</p>

<p>If episodes will not play, update yt-dlp first. The majority of playback issues resolve with a simple update. If the problem persists, try a different anime site by setting the <code>SITE</code> variable:</p>

<pre><code>SITE=gogoanime ani-cli "Bleach"</code></pre>

<p>When the search returns no results, check your internet connection and verify the anime name spelling. ani-cli searches external sites, so a typo can cause it to come up empty.</p>

<p>If Termux crashes during playback, your device might be running low on memory. Close other apps and try again with a lower quality setting.</p>

<h2>Which Setup Should You Use</h2>
<p>For casual watching on a good connection, stick with the default 1080p streaming. It gives the best visual quality without any extra configuration. Use this if you watch primarily over Wi-Fi.</p>

<p>On mobile data or slower connections, force 720p or 480p. The difference in quality is noticeable but the playback stays smooth. This prevents constant buffering and reduces data usage significantly.</p>

<p>Download episodes when you know you will be offline. A single 20-minute episode at 720p takes roughly 300-500MB. Plan your storage accordingly and clean up downloaded files after watching.</p>

<p>Keep yt-dlp updated monthly at minimum. The anime streaming sites change their backend frequently, and ani-cli depends entirely on yt-dlp to understand those changes.</p>
  `
};
