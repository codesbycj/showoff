# FlexRounded

Static, Latin-only cuts of **Google Sans Flex**
(<https://github.com/googlefonts/googlesans-flex>, SIL Open Font License 1.1 — see
`OFL.txt`), used as the free stand-in for SF Pro Rounded.

| File | wght | opsz | wdth | ROND | GRAD | slnt |
|---|---|---|---|---|---|---|
| `FlexRounded_400Regular.ttf` | 400 | 18 | 100 | 100 | 0 | 0 |
| `FlexRounded_500Medium.ttf` | 500 | 18 | 100 | 100 | 0 | 0 |
| `FlexRounded_600SemiBold.ttf` | 600 | 18 | 100 | 100 | 0 | 0 |
| `FlexRounded_660Bold.ttf` | 660 | 18 | 100 | 100 | 0 | 0 |

React Native cannot set variation axes, so each weight is its own file.

Bold is cut at 660 rather than 700: SF Pro Rounded Bold measures 0.200-0.209 stem
to cap height on Jomo's large glyphs; FlexRounded reaches 0.204 at 660 and 0.215 at
700.

The family is renamed: the upstream `TRADEMARKS.md` does not allow "Google" in the
name of a derived font. The OFL itself declares no Reserved Font Names.

Kept outside `assets/images/<slug>` on purpose — `src/theme/fonts.ts` is shared,
so these must survive `showcase.js wipe`.

To regenerate, download the variable font from
`https://raw.githubusercontent.com/google/fonts/main/ofl/googlesansflex/` and run
`python make_fonts.py <variable-font.ttf> <out-dir>` (needs `fontTools`).
