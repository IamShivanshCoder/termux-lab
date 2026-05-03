# TermuxLab — Orchestrator

This is the master workflow file. Read this first on every session.
It tells you exactly what to do based on what the user wants.

On session start, always:
1. Read CLAUDE.md for full project context
2. Read this file completely
3. Wait for the user's instruction
4. Follow the matching workflow below

---

## AVAILABLE WORKFLOWS

Tell the orchestrator what you want using these trigger phrases:

| What you say              | What happens                          |
|---------------------------|---------------------------------------|
| "new article: [topic]"    | Full article creation + push          |
| "fix: [description]"      | Bug fix + push                        |
| "update site: [change]"   | Feature/content update + push         |
| "check site"              | Run production checklist only         |
| "push"                    | Production check + git push only      |
| "update context"          | Refresh CLAUDE.md with current state  |

---

## WORKFLOW 1 — NEW ARTICLE

Triggered by: "new article: [topic or bullet points]"

Step 1 — CLARIFY (skip if topic is detailed enough)
  Ask at most 3 questions from ARTICLE.md clarification protocol.
  If topic is clear, go straight to Step 2.

Step 2 — WRITE
  Read ARTICLE.md fully.
  Generate the complete article file content.
  Show it to the user and ask:
  "Looks good? Reply 'yes' to save and publish or tell me what to change."

Step 3 — SAVE (only after user confirms)
  Create the file: articles/[slug].js
  Open articles/index.js
  Add '[slug]' to ARTICLE_REGISTRY array
  If user said featured: true:
    - Update the new article file with featured: true
    - Find current featured article and set its featured: false
    - Update FEATURED_SLUG in articles/index.js

Step 4 — PRODUCTION CHECK
  Run through every item in PRODUCTION.md silently.
  Report only failures, not every passing check.
  If any failure found: fix it before proceeding.
  If all clear: report "All checks passed."

Step 5 — PUSH
  Run these commands:
  cd ~/termuxlab
  git add .
  git status
  git commit -m "add: [article title in lowercase]"
  git push origin main

Step 6 — CONFIRM
  Report:
  - Article slug
  - Files changed
  - Commit message used
  - Reminder: "Live in ~2 min. New article visible within 10 minutes."

---

## WORKFLOW 2 — FIX

Triggered by: "fix: [description of the problem]"

Step 1 — DIAGNOSE
  Read only the files relevant to the problem.
  Do not read unrelated files.
  Identify root cause before touching anything.

Step 2 — FIX
  Make the minimal change needed.
  Never modify style.css unless the fix is visual.
  Never rewrite files that are not broken.
  Show the user what changed and why.

Step 3 — PRODUCTION CHECK
  Run only the relevant section of PRODUCTION.md for what was changed.
  Example: if article.html was fixed, only run the Article Page section.

Step 4 — PUSH
  cd ~/termuxlab
  git add .
  git commit -m "fix: [one line description]"
  git push origin main

Step 5 — CONFIRM
  Report what was fixed and which files changed.

---

## WORKFLOW 3 — UPDATE SITE

Triggered by: "update site: [description]"

Step 1 — PLAN
  Read CLAUDE.md and relevant files.
  State what you will change and what you will not touch.
  Wait for user to confirm the plan before writing any code.

Step 2 — IMPLEMENT
  Make changes.
  Follow all constraints in CLAUDE.md.
  Output only changed files.

Step 3 — PRODUCTION CHECK
  Run full PRODUCTION.md checklist.
  Report failures only.

Step 4 — PUSH
  cd ~/termuxlab
  git add .
  git commit -m "update: [description]"
  git push origin main

Step 5 — UPDATE CLAUDE.md
  If the update changed the file structure, added new pages, changed
  how articles work, or changed any constraint:
  Update CLAUDE.md to reflect the new state of the project.
  Report what was updated in CLAUDE.md.

---

## WORKFLOW 4 — CHECK SITE

Triggered by: "check site"

Run every item in PRODUCTION.md.
Report a clean summary:

  PASSED: 24 checks
  FAILED:
    - [ ] article.html?id=fake shows JS error instead of 404
    - [ ] Mobile hamburger not closing after link tap

Fix all failures before reporting done.
Do not push unless user says "push" after.

---

## WORKFLOW 5 — PUSH ONLY

Triggered by: "push"

Step 1 — Run full PRODUCTION.md checklist
Step 2 — Fix any failures found
Step 3 — Push:
  cd ~/termuxlab
  git add .
  git commit -m "chore: production push [date]"
  git push origin main
Step 4 — Confirm push with files changed list

---

## WORKFLOW 6 — UPDATE CONTEXT

Triggered by: "update context"

Read the current state of all files in the project.
Compare against what CLAUDE.md currently says.
Update CLAUDE.md to reflect:
  - Any new files added
  - Any removed files
  - Any new categories used in articles
  - Any new pages
  - Any changed constraints
  - Current article count
  - Current featured article slug

Report a diff of what changed in CLAUDE.md.

---

## GENERAL RULES FOR ALL WORKFLOWS

- Read before writing — always read the relevant file before editing it
- Minimum touch — only modify files the task actually requires
- No unrequested changes — never "improve" something the user did not ask about
- No verbose output — skip explaining what you are about to do, just do it
- Confirm before destructive actions — deleting or overwriting always needs a yes
- Failed push — if git push fails, report the exact error and stop
- Never invent — if unsure about a file path or variable name, read the file first

---

## COMMIT MESSAGE FORMAT

add:    new article or new page
fix:    bug fix
update: change to existing feature or content
chore:  production push, dependency update, housekeeping
style:  visual/CSS only change
docs:   changes to md files only

---

## SESSION START CHECKLIST

Every new OpenCode session:
- [ ] CLAUDE.md read and understood
- [ ] ORCHESTRATOR.md read and understood
- [ ] Waiting for user trigger phrase
- [ ] No unrequested changes made
Save as ORCHESTRATOR.md in project root. Your complete ops stack:
termuxlab/
├── CLAUDE.md           ← project context
├── ARTICLE.md          ← article writing rules  
├── PRODUCTION.md       ← pre-push checklist
└── ORCHESTRATOR.md     ← master workflow manager
