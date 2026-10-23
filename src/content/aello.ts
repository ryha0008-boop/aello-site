// Everything the site shows, in one place. Compiled from `aello --help`, every
// subcommand's help, the hook table, the TUI key hints and the status line of
// Compiled from aello's help, hooks, skills and status line; `version` is the released one. Update here, not in the pages.

export const version = "0.3.20";

export const site = {
  name: "aello",
  tagline: "Isolated Claude Code environments, like venvs for AI agents.",
  summary:
    "You define blueprints once: a name, a model, a persona and a role. aello run <name> places one in the current project as its own Claude Code config dir and launches Claude in it. Several agents work in the same repo without sharing config, and each one's commits are authored as the blueprint.",
  install:
    "gh api repos/ryha0008-boop/aello3/contents/install.sh -H 'Accept: application/vnd.github.raw' | sh",
  repo: "https://github.com/ryha0008-boop/aello3",
};

export type Feature = { title: string; body: string; since?: string };
export type FeatureGroup = {
  slug: string;
  title: string;
  lead: string;
  features: Feature[];
};

export const groups: FeatureGroup[] = [
  {
    slug: "blueprints",
    title: "Blueprints, envs and launching",
    lead: "Define an agent once, place it in any project, launch it from the CLI or the TUI.",
    features: [
      {
        title: "Blueprints",
        body: "A name, a model (opus, sonnet, haiku, fable, default, or a full claude id), a persona (coder, none, or a CLAUDE.md path), a role and an effort from low to max. add, list, edit and remove manage them; edit can rename a blueprint along with its env dir and mirror, or send the mirror to a private repo checkout.",
      },
      {
        title: "aello run",
        body: "Places the blueprint as .claude-env-<name>/ in the current directory and launches Claude in it. Resume the latest session or one by id, run a single headless prompt, or pass flags through to claude. With one blueprint the name is optional.",
      },
      {
        title: "TUI",
        body: "aello with no arguments: enter runs, r resumes from a session picker, a adds, e edits, d deletes, F toggles all blueprints or the ones placed here, p pulls, L logs in, u updates and restarts into the new version, ? shows the docs.",
      },
      {
        title: "Shared login",
        body: "aello init logs in, asks the plan and creates a first blueprint, re-asking a bad answer instead of failing at the end. aello login runs claude setup-token and stores the token owner-only. aello plan tells the status line which limits to show.",
      },
      {
        title: "Compatible with 0.2",
        body: "Same env dir name, .aello.toml, config keys, hook names, mirror layout and contextdb layout. A real 0.2 settings.json migrates in place. User keys, persona and memory are never clobbered; unparseable files are left alone.",
      },
    ],
  },
  {
    slug: "env",
    title: "What every env gets",
    lead: "Rewritten on every run, so a change reaches every env on its next launch.",
    features: [
      {
        title: "settings.json reconciled",
        body: "Bypass permissions, the blueprint's model and effort, a 99-day cleanup, the co-author trailer off and the aello status line. Only aello's own hook groups are replaced; retired 0.2 hooks are removed.",
      },
      {
        title: "Persona",
        body: "Written once and never overwritten. The bundled coder persona asks for minimal correct changes, a reproduction before a fix and no skipped checks. aello persona <name> shows which generation an env has; --from replaces it and marks the blueprint custom.",
      },
      {
        title: "Seeded memory",
        body: "A working-style note and a review-style note, only when the env has no memory yet.",
      },
      {
        title: "Seven hooks",
        body: "Session start, per-prompt response rules, plan mode denied, a guard on dangerous git commands and hand edits, a handoff checker, a tmux bell when a pane waits for you, and a session-end archive to contextdb.",
      },
      {
        title: "Four skills",
        body: "/sync, /handoff, /note and /note-read. An .aello-keep file protects your own version of a skill; .aello-nomirror keeps one out of the mirror. sync, handoff and note-read run on Opus at high effort and the session model returns on the next prompt.",
        since: "0.3.17",
      },
      {
        title: "Launch environment",
        body: "CLAUDE_CONFIG_DIR, the shared OAuth token, subscription type and rate-limit tier from the plan, idle compaction from 100k tokens, and AELLO_CONTEXTDB for the archive.",
      },
      {
        title: "Status line",
        body: "Model, effort, context percent, 5-hour and 7-day plan limits with reset times, amber at 70 and red at 90 percent, a cache-cold warning, and a notes row with sent, received, waiting and read notes plus handoff waiting.",
      },
    ],
  },
  {
    slug: "fleet",
    title: "Roles, sync, mirror and the fleet",
    lead: "How several envs, and several desks, work on the same repo without stepping on each other.",
    features: [
      {
        title: "Four roles",
        body: "Maintainer owns the docs and GitHub. Contributor logs its change and commits, pushing when the project has an origin. Local is a maintainer without a remote. Standalone has no sync and no scaffold.",
        since: "0.3.17",
      },
      {
        title: "Scaffold",
        body: "Written only when absent: .gitignore lines, CHANGELOG, README, CLAUDE.md, docs/, VERSION, .gitattributes, the version and CI workflows, renovate config, a pre-commit hook that refuses API keys, OpenRouter keys, private keys and .env files, and a pre-push hook that refuses a push to a public repo while the tree holds private IPs, email addresses, home paths, credentials or keys; both upgraded in place when aello ships a newer one.",
      },
      {
        title: "/sync",
        body: "Memory, docs checked against the project itself, aello mirror, a sensitive-content read of everything staged, a repo visibility check, explicit-path staging, a commit with an Env: trailer, rebase, push, deploy per ## Deploy and a seven-line report. The maintainer's first sync creates the GitHub repo private when there is no origin and finishes in one run.",
        since: "0.3.17",
      },
      {
        title: "Mirror",
        body: "claude-internal/<name>/ holds skills (pruned), memory and commands (merged, so another desk's notes survive), persona, handoff note and blueprint.toml. A fresh clone seeds the env from it; aello pull pulls, creates the blueprints the mirrors describe and places them; aello restore adopts a pulled mirror into an existing env and takes the mirror's name casing.",
      },
      {
        title: "Notes between envs",
        body: "aello note <Env> appends to each target's inbox at that env's project root, resolving names case-insensitively through the placement registry or a home search, never overwriting. aello note <Env>@<machine> sends it along the route config.toml names for that machine (a command such as ssh, the note on its stdin), signed <env>@<this machine>; every env's /note skill lists the machines it can reach. --take moves the inbox aside for /note-read. Every delivery is logged for the status line.",
        since: "0.3.19",
      },
      {
        title: "Handoff",
        body: "/handoff writes <name>.HANDOFF.md capped at 400 words. The next fresh session gets it at boot and the file is removed.",
      },
      {
        title: "Self-maintenance",
        body: "aello update installs the newest release verified against SHA256SUMS, aello docs prints the bundled guide, reference, skills, troubleshooting and upgrading pages, aello completions covers five shells. Every push to aello's main releases a new version.",
      },
    ],
  },
];

export type Command = { name: string; summary: string; usage: string };

export const commands: Command[] = [
  {
    name: "add",
    summary: "Add a blueprint.",
    usage:
      "aello add <name> --model M [--claude-md coder|none|PATH] [--role maintainer|contributor|local|standalone] [--effort low|medium|high|xhigh|max]",
  },
  { name: "list", summary: "List blueprints.", usage: "aello list [--json]" },
  {
    name: "edit",
    summary: "Edit a blueprint. Changes reach an env on its next run.",
    usage:
      "aello edit <name> [--rename N] [--model M] [--claude-md P] [--role R] [--effort E] [--mirror-dir PATH|-]",
  },
  {
    name: "remove",
    summary: "Remove a blueprint. --purge also deletes its env dir and mirror here.",
    usage: "aello remove <name> [--yes] [--purge]",
  },
  {
    name: "archive",
    summary: "Retire a blueprint: its env, notes and transcripts move to ~/archive/aello-envs/<name>/ with a copy of the mirror. No name lists the archive.",
    usage: "aello archive [name] [--project DIR] [--yes]",
  },
  {
    name: "unarchive",
    summary: "Bring an archived env back: the blueprint, env dir, notes and transcripts.",
    usage: "aello unarchive <name> [--project DIR]",
  },
  {
    name: "run",
    summary: "Place a blueprint in the current directory and launch Claude.",
    usage: "aello run [name] [--resume [id]] [-p PROMPT] [-- <claude args>]",
  },
  {
    name: "init",
    summary: "First-run setup: login, plan, then a first blueprint.",
    usage: "aello init",
  },
  {
    name: "login",
    summary: "Store the shared Claude login (runs claude setup-token), then ask the plan.",
    usage: "aello login",
  },
  {
    name: "plan",
    summary: "Show or set the plan behind the login.",
    usage: "aello plan [pro|max-5x|max-20x|team|enterprise|unknown]",
  },
  {
    name: "note",
    summary: "Leave a note from stdin in other envs' inboxes, on this machine or another, or take this env's inbox.",
    usage: "aello note <Env>[@machine]... [--from NAME] [--project DIR]   |   aello note --take",
  },
  {
    name: "mirror",
    summary: "Snapshot this env into its tracked mirror. Used by /sync.",
    usage: "aello mirror",
  },
  {
    name: "pull",
    summary: "git pull, then create the blueprints this project's mirrors describe and place their envs.",
    usage: "aello pull [--project DIR]",
  },
  {
    name: "restore",
    summary: "Adopt the tracked mirror into an existing env after pulling another machine's work.",
    usage: "aello restore <name> [--project DIR]",
  },
  {
    name: "persona",
    summary: "Show a placed env's persona generation, or replace the persona with --from; the blueprint becomes custom.",
    usage: "aello persona <name> [--from FILE] [--project DIR]",
  },
  {
    name: "docs",
    summary: "Print bundled docs; no name lists them.",
    usage: "aello docs [guide|reference|skills|troubleshooting|upgrading]",
  },
  {
    name: "update",
    summary: "Self-update from GitHub releases, verified against SHA256SUMS.",
    usage: "aello update [--force]",
  },
  {
    name: "completions",
    summary: "Print a shell completion script.",
    usage: "aello completions bash|elvish|fish|powershell|zsh",
  },
  {
    name: "statusline",
    summary: "The in-session status line, run by Claude Code.",
    usage: "aello statusline",
  },
];

export type Role = {
  name: string;
  owns: string;
  scaffolds: string;
  sync: string;
  pushes: string;
};

export const roles: Role[] = [
  {
    name: "maintainer",
    owns: "CLAUDE.md, README, CHANGELOG, docs/ and the GitHub repo",
    scaffolds:
      "CHANGELOG.md, CLAUDE.md, README.md, docs/, VERSION, .gitattributes, the version and CI workflows, .github/renovate.json, .githooks/pre-commit and pre-push",
    sync: "memory, all docs against a checklist, mirror, sensitive-content check, commit, push, deploy per ## Deploy",
    pushes: "yes; the first sync creates the repo private when there is no origin",
  },
  {
    name: "contributor",
    owns: "its own CHANGELOG entry",
    scaffolds:
      "CHANGELOG.md, .githooks/pre-commit and pre-push, and the GitHub files only when the project has an origin",
    sync: "memory, CHANGELOG, mirror, sensitive-content check, commit, push",
    pushes: "with an origin; without one it commits and reports local only",
  },
  {
    name: "local",
    owns: "CLAUDE.md, README, CHANGELOG, docs/; no remote",
    scaffolds:
      "CHANGELOG.md, CLAUDE.md, README.md, docs/, and .githooks/pre-commit and pre-push when there is a .git",
    sync: "the maintainer's list without fetch, pull or push; the commit is skipped without a .git",
    pushes: "never",
  },
  {
    name: "standalone",
    owns: "nothing in the repo",
    scaffolds: "only the .gitignore lines every role gets",
    sync: "none, and no mirror",
    pushes: "never",
  },
];

export type Step = { title: string; body: string };

export const syncSteps: Step[] = [
  {
    title: "Preflight",
    body: "Confirm a git repo, report the branch and a short git status. With an origin: fetch and show ahead/behind. A maintainer without one checks gh auth status now and names the command to run if gh is missing or logged out.",
  },
  {
    title: "Memory",
    body: "Find this project's memory dir under the env, add what the session taught, fix what is stale, delete what is wrong, keep the MEMORY.md index in sync.",
  },
  {
    title: "Docs",
    body: "Build the ground truth from the project itself: every subcommand's help, the files it ships and writes, the keys a UI binds, the tools it shells out to. Then check both ways against CLAUDE.md, README, CHANGELOG, docs/ and any other doc CLAUDE.md names as the maintainer's, such as this site.",
  },
  {
    title: "Mirror",
    body: "aello mirror copies skills, commands, memory, persona and the resume note into claude-internal/<name>/ or the private mirror repo.",
  },
  {
    title: "Sensitive-content check",
    body: "Read everything about to be staged, mirror included. Keys, tokens, passwords, logins, account names, email addresses and links to private resources stop the sync. With an origin, gh repo view confirms the repo is private before the mirror is staged.",
  },
  {
    title: "Stage by explicit path",
    body: "Never git add -A or git add . Files changed this session, the docs, the mirror and aello's own scaffold. On a repo's first commit, the project's existing files too. Never inboxes, handoff notes, .env files, build output or caches.",
  },
  {
    title: "Commit and push",
    body: "A plain message ending with an Env: <name> trailer. With an origin: pull with rebase, then push. A maintainer without one creates the repo private with gh repo create and pushes with an upstream. Never --no-verify, never force-push, never resolve a rebase conflict inside the sync.",
  },
  {
    title: "Live",
    body: "Read ## Deploy in CLAUDE.md and run exactly what it says. If it says nothing is live yet, report not live and finish. If there is no such section, find how the project goes live, or ask once and write the answer down for the next sync.",
  },
  {
    title: "Report",
    body: "At most seven lines: branch, commit, push result, live result, docs touched, memory changes, and anything found but not fixed.",
  },
];

export type Hook = { event: string; matcher: string; script: string; does: string };

export const hooks: Hook[] = [
  {
    event: "SessionStart",
    matcher: "",
    script: "session-start.py",
    does: "Tells the session it runs under aello, delivers the handoff note on a fresh start and consumes the file, and lists unread notes without touching them.",
  },
  {
    event: "UserPromptSubmit",
    matcher: "",
    script: "user-prompt-submit.py",
    does: "Injects the response rules on every prompt: lead with the answer, no plans, a small reversible fix is made rather than proposed, a TL;DR block with numbered steps.",
  },
  {
    event: "PreToolUse",
    matcher: "EnterPlanMode|ExitPlanMode",
    script: "pre-tool-use.py",
    does: "Plan mode is denied in every aello env.",
  },
  {
    event: "PreToolUse",
    matcher: "Bash|Write|Edit",
    script: "guard.py",
    does: "Refuses git add -A, commit -a, --no-verify, force-push, rebase --continue, and hand edits of an inbox or the env dir, with a reason the model can act on.",
  },
  {
    event: "PostToolUse",
    matcher: "Write|Edit",
    script: "handoff-check.py",
    does: "Checks a just-written HANDOFF.md for the 400-word cap and the required sections, and tells the model what to fix before it replies.",
  },
  {
    event: "Notification",
    matcher: "idle_prompt|permission_prompt",
    script: "attention.py",
    does: "Rings the bell in the pane's tty so tmux flags the window that waits for you. Does nothing outside tmux.",
  },
  {
    event: "SessionEnd",
    matcher: "",
    script: "session-end.py",
    does: "Archives the transcript and any subagent transcripts to contextdb, sha256-verified, with one end record per session.",
  },
];

export type Skill = { name: string; who: string; model: string; does: string };

export const skills: Skill[] = [
  {
    name: "/sync",
    who: "you",
    model: "Opus, high effort",
    does: "Checkpoint the project: memory, docs, mirror, sensitive-content check, commit, push and deploy, then a seven-line report. Only for maintainer, contributor and local roles.",
  },
  {
    name: "/handoff",
    who: "you",
    model: "Opus, high effort",
    does: "Writes <name>.HANDOFF.md, a resume note capped at 400 words. The next session gets it at boot.",
  },
  {
    name: "/note <Env> [brief]",
    who: "you, or Claude when another env needs to know",
    model: "the session model",
    does: "Writes a note and delivers it with aello note. Names are matched case-insensitively; an unknown name is refused with suggestions.",
  },
  {
    name: "/note-read",
    who: "you, or Claude when you ask it to read its notes",
    model: "Opus, high effort",
    does: "Moves the inbox aside, acts on each note oldest first, and deletes the copy once every note is handled.",
  },
];

export const statusLine = {
  sample: [
    "Opus 5.5 · high · ctx 16% · 5h 38% (4h12m) · 7d 41% (3d12h)",
    "aello3dev -> SysAdmin note · TechnicalDirector read   <- TechnicalDirector 2 notes",
  ],
  legend: [
    "Line one: model, effort, context used, the 5-hour and 7-day plan limits with time to reset. Amber at 70 percent, red at 90.",
    "cache cold means the next prompt re-sends the whole context at full price.",
    "Line two: the last 7 days of notes. -> sent, <- received, note or N notes still waiting, read taken by /note-read, handoff waiting when a resume note is written.",
  ],
};

export const envSettings: string[] = [
  "permissions.defaultMode = bypassPermissions",
  "model and effortLevel from the blueprint",
  "cleanupPeriodDays = 99",
  "includeCoAuthoredBy = false",
  "statusLine runs aello statusline",
  "only aello's own hook groups are replaced; yours are kept",
  "CLAUDE_CONFIG_DIR points at the env dir",
  "CLAUDE_CODE_OAUTH_TOKEN from the shared login",
  "CLAUDE_CODE_SUBSCRIPTION_TYPE and RATE_LIMIT_TIER from the plan",
  "CLAUDE_CODE_IDLE_COMPACT_MIN_TOKENS = 100000",
  "AELLO_CONTEXTDB for the session archive",
];

// The commands page prints `commands` in source order under these group labels.
export const commandGroups: { label: string; commands: string[] }[] = [
  { label: "blueprints", commands: ["add", "list", "edit", "remove", "archive", "unarchive"] },
  { label: "run", commands: ["run"] },
  { label: "login and plan", commands: ["init", "login", "plan"] },
  { label: "across envs and desks", commands: ["note", "mirror", "pull", "restore", "persona"] },
  { label: "aello itself", commands: ["docs", "update", "completions", "statusline"] },
];

// The inside page lists an env dir as `ls` output, with a note beside each entry.
export const envDir: { path: string; note?: string }[] = [
  { path: ".claude-env-coder/" },
  { path: "  settings.json", note: "reconciled; your keys are kept" },
  { path: "  CLAUDE.md", note: "the persona, written once" },
  { path: "  hooks/", note: `${hooks.length} hooks` },
  { path: "  skills/", note: skills.map((s) => s.name.split(" ")[0].slice(1)).join("  ") },
  { path: "  projects/<project>/memory/", note: "seeded once, then the env's own" },
  { path: "  inbox/", note: "notes moved aside by /note-read" },
  { path: "claude-internal/coder/", note: "the tracked mirror /sync writes" },
];
