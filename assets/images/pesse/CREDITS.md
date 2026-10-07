# pesse imagery

Pesse is a fictional app. "Linda Srikandi", her $521,098.31 balance, the card
numbers, the contacts on the Send-again rail, the transaction history, the
referral code and the spending analytics are invented content written for a UI
showcase. No real person, bank or payment network is described here. The VISA
emblem on the cards is drawn as type, to identify a mock card scheme in the way
the reference does.

## Portraits — AI-generated, shipped with the Stitch export

Every `.jpg` here comes from the Google Stitch export this showcase rebuilds.
Stitch generated them and hot-linked them from `lh3.googleusercontent.com`, so
they are not photographs of anyone and none of them survive offline. They were
pulled once at `=s1024`, centre-square cropped — which is what the reference's
`object-cover` on a square box does — and downscaled to 3x the largest slot each
one fills. Nothing else was altered.

| File | Slot in the reference |
|---|---|
| `linda.jpg` | the account holder, 40dp, in every screen's header |
| `linda-settings.jpg` | the settings profile card, 80dp |
| `coin.jpg` | the 3D coin on the home screen's promo banner, 72dp |
| `rijal.jpg`, `ferina.jpg`, `daffa.jpg`, `bayu.jpg`, `christian.jpg` | Send-again rail, 56dp |
| `ferina-row.jpg` | history transaction row, 48dp |
| `rijal-send.jpg` | the recipient card on Send Money, 48dp |

### Two files downloaded and dropped

`logo.jpg` was the Pesse wordmark as a bitmap. The export also ships the mark as
SVG (`pesse_logo/code.html`), so it is drawn rather than pasted — see
`src/features/pesse/components/pesse-mark.tsx`. Sharp at any size, and it is the
brand's own geometry.

`rijal-row.jpg` was meant to be a close-up avatar for the history list, but
Stitch generated a screenshot of an app UI inside a circle rather than a
portrait. The history row reuses `rijal.jpg`, which is the same person at the
same crop.

## Icons — Material Symbols Outlined, subset

The design sets every icon in Material Symbols Outlined. The real face is used,
cut down to the 57 glyphs this showcase draws: 944KB to 9.7KB. See
`tools/subset-symbols.py` and `assets/fonts/pesse-symbols/`. Licensed under the
Apache License 2.0, the same as the upstream font.

Two of the reference's icon names are legacy Material *Icons* that Symbols does
not carry. `help_outline` became `help`. There is no phone-with-a-lock in
Symbols, so the two-factor row takes `encrypted`.
