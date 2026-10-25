# showoff

Three series of UI rebuilds, recorded as videos. One repository, three sets of rules.

| Series | What an episode is | How it is filmed | Rules |
|---|---|---|---|
| **apps** — this project's root | One app screen in Expo + NativeWind, one showcase per screen | A speed-build reveal: the UI appears a component at a time | [AGENTS.md](AGENTS.md) |
| **[websites/](websites)** — closed at episode 10 | One business's site, shown bad and rebuilt, with a crossfade | A toggle between Before CJ and After CJ | [websites/README.md](websites/README.md) |
| **[dashboards/](dashboards)** — current | One dashboard design, three working tabs, the rest inert | No reveal: a cursor using the finished thing | [dashboards/README.md](dashboards/README.md) |

```bash
npm start            # the Expo dev server, for the apps series
npm run typecheck

npm run dev:twisty   # a dashboard episode (or: cd dashboards/twisty && npm run dev)
```

Install a `websites/` or `dashboards/` episode **from inside its own folder**. A plain
`npm --prefix <dir> install` from here writes `"showoff": "file:../.."` into that episode's
`package.json` and symlinks the Expo project into its `node_modules`.
