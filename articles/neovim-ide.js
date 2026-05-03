var ARTICLE_neovim_ide = {
  id: "neovim-ide",
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
};
