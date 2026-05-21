# Developer Setup (Windows) — for Kristen's machine

A checklist for setting up a Windows PC so Kristen can edit the site through Claude Desktop and push changes to GitHub, which auto-deploys to Netlify.

## What this gives her

A workflow like:

> *Open Claude Desktop → click "Code" → pick the santafehunt folder → say "change the Opening Meet date to November 15" → Claude edits the file, shows the rendered page in its Preview pane to confirm, then commits and pushes.*

No terminal. No drag-and-drop. No file uploads. Just a chat window with a folder picker.

---

## 1. Install the software

Do these as Kristen's Windows user account, in this order:

1. **Claude Desktop** — https://claude.ai/download (pick the Windows installer).
   - Sign in with her Anthropic account. She needs to be on **Claude Pro or higher** for the Code tab to work — she is.
2. **Git for Windows** — https://git-scm.com/download/win
   - Accept defaults. **Restart Claude Desktop after installing it** — the Code tab won't appear until Git is on the system, and Desktop only checks at launch.
3. **Node.js LTS** — https://nodejs.org/ (pick the LTS button, not Current)
   - Needed so Claude can run a local dev server (`npx serve`) to preview pages. Verify with `node --version` in any terminal.
4. **GitHub CLI** — https://cli.github.com/ or `winget install GitHub.cli`
   - This is how she'll authenticate to GitHub without messing with SSH keys.

She'll rarely (maybe never) open a terminal day-to-day, but having Git Bash installed is essential — Claude uses it under the hood when she asks for git operations.

## 2. Configure git identity

Open Git Bash once and set her name/email so commits look right:

```bash
git config --global user.name "Kristen Tregar"
git config --global user.email "ktregar@gmail.com"
```

## 3. Authenticate to the three services

**Anthropic (Claude Desktop):** done when she signed in to the app in step 1. Confirm by clicking the Code tab — if it loads, auth is fine.

**GitHub:** in Git Bash, run:
```bash
gh auth login
```
Pick: GitHub.com → HTTPS → "Login with a web browser." Follow the prompts. This stores a token in the Windows credential manager, so `git push` from inside Claude will Just Work.

**Netlify (browser only, no CLI needed):**
- Add her as a team member on the Netlify site dashboard so she can see deploys and roll back if anything goes wrong. She doesn't need the Netlify CLI for this workflow.

## 4. Clone the repo

In Git Bash, somewhere she'll remember (e.g. Documents):

```bash
cd ~/Documents
gh repo clone samtregar/santafehunt
```

This puts the repo at `C:\Users\Kristen\Documents\santafehunt` (or wherever her home is).

## 5. Open the repo in Claude Desktop

1. Launch Claude Desktop.
2. Click the **Code** tab in the sidebar.
3. Click **Select folder** and point it at `Documents\santafehunt`.
4. From now on, that folder appears in her recent projects — one click to reopen.

## 6. (Optional) Add Playwright MCP for stricter visual checks

The Preview pane built into Claude Desktop is usually enough — Claude can spin up a local dev server and render the page inline. But if you want Claude to also take screenshots, assert specific text, or compare before/after, add Playwright MCP.

Edit `~/.claude.json` (or create a `.mcp.json` in the repo root) and add:

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["@playwright/mcp@latest"]
    }
  }
}
```

Restart Claude Desktop. First time Claude uses Playwright, it'll download Chromium (~150 MB), one-time.

You can skip this section and add it later if she ever needs it.

## 7. Verify the whole pipeline works

Smoke test (do this once with her watching):

1. Open Claude Desktop → Code → santafehunt folder.
2. Ask: *"Change the punch-bowl sentence in EventList.jsx to add an Oxford comma. Start a dev server and show me the homepage in the preview to confirm. Then commit and push."*
3. Claude should: edit the file → run `npx serve netlify-site` in the background → open the homepage in the Preview pane → confirm the new wording is visible → ask permission to commit and push.
4. Wait ~30 seconds, then visit the live site and confirm the change is there.
5. Revert the change the same way if it was just a test.

If all of that works on her machine, the setup is done.

---

## What to tell Kristen

Three things, that's it:

- **To start working:** open Claude Desktop → Code → click `santafehunt` in the recent folders list.
- **To make a change:** just describe it in plain English. Examples:
  - *"Pull the latest, then change the date of the Opening Meet to November 15."*
  - *"Replace the gallery photo `riders-pines.jpg` — the new one is on my desktop."*
  - *"Fix the typo in the second etiquette rule under 'The Hounds'. Show me the page in the preview before pushing."*
- **To finish:** ask Claude to *"commit and push, then check the live site."* It'll handle the git steps and confirm.

Tell her to always start with *"pull the latest"* — that way if you've made changes from your machine, hers stays in sync. (Claude will handle the actual `git pull` command.)

The `CLAUDE.md` at the repo root tells her Claude how the site is structured, so it'll mostly do the right thing without hand-holding.

## Common gotchas

- **Code tab is missing in Claude Desktop** — Git for Windows isn't installed, or wasn't installed before Desktop launched. Install Git, then fully quit and reopen Desktop.
- **`git push` asks for a password** — `gh auth login` wasn't completed, or HTTPS wasn't selected. Re-run it in Git Bash.
- **Playwright says "browser not installed"** — open Git Bash and run `npx playwright install chromium` once manually to force the download.
- **Long path errors on `git clone`** — in an admin PowerShell: `git config --system core.longpaths true`. (Git for Windows usually sets this during install.)
- **Preview pane shows a blank page for the homepage** — the React/Babel `index.html` doesn't work from `file://` because Babel fetches `.jsx` files via XHR. Claude needs to run a local dev server (`npx serve netlify-site`) and preview `http://localhost:3000`. The static pages (`about.html`, `awards.html`, etc.) don't have this issue.
- **She accidentally closes the dev server terminal** — no harm done. Claude can restart it the next time she previews. If two servers end up running, kill them in Task Manager (look for `node.exe`) or just restart the machine.
