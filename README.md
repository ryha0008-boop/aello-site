# aello-site

The feature site for [aello](https://github.com/ryha0008-boop/aello3), published
to GitHub Pages at https://ryha0008-boop.github.io/aello-site/ on every push to
main, with an internal copy served from a private address. Four pages: features, commands, roles and sync,
inside an env. All content lives in `src/content/aello.ts`; the pages render it.

Stack: Next.js 16 (app router, static export), Tailwind 4 via Turbopack,
shadcn/ui on Base UI, Motion for the scroll-in reveals. Node 20.9 or newer.

```sh
npm ci
HOST=<address> npm run dev   # http://<address>:3041/; 127.0.0.1 when HOST is unset, never 0.0.0.0
npm run build      # writes the static site to out/
npm run lint
```

## Deploy

GitHub Pages: every push to `main` runs `.github/workflows/pages.yml`, which
builds with `BASE_PATH=/aello-site` and publishes `out/` to
https://ryha0008-boop.github.io/aello-site/.

Internal copy: `bash deploy/deploy-internal.sh` builds `out/` and installs a
user unit that serves it with `python3 -m http.server` bound to one address,
so the port is never public. Settings live in `deploy/local.env` (gitignored):
copy `deploy/local.env.example` and set `BIND_ADDR`, `PORT` and `UNIT`. The
script stops if `version` in `src/content/aello.ts` differs from
`../aello3/VERSION`: update the content first. aello3's `/sync` does both.

Check: `ss -ltn | grep <PORT>` shows only `<BIND_ADDR>:<PORT>`, never `0.0.0.0`
or `*`. Logs: `journalctl --user -u <UNIT> -n 50`.

The repo is public and the pre-push hook in `.githooks/` refuses a push whose
tree holds a private IP, an email address, a home path with a username, a
credential or a key: keep machine details in `deploy/local.env`.

The look is a terminal, from design-thief: IBM Plex Sans and Mono, square
corners, a tmux status bar as the nav, the commands page as a man page, and
rows that print in with opacity only. Colours are CSS variables in
`src/app/globals.css`; no icons or glyphs anywhere.
