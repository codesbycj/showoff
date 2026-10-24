# Credits

## What is in this folder

Thirty-two images, all of them **the reference's own** (rule 0: the images do not
change), downloaded from `reasonal.co/assets/`.

They are re-encoded, and only to save bytes: WebP at quality 82, each capped at the
width the page actually paints it — 320px for a lesson chip, 360px for a "why"
object, 1600–1800px for the two cloud plates, 900–1600px for the phone photographs.
Nothing is cropped, recoloured or retouched, and nothing is upscaled. The whole
folder is 1453KB.

| Folder | Files | What they are |
|---|---|---|
| `lessons/` | 19 | The lesson thumbnails: collage illustrations, one per topic |
| `why/` | 7 | The objects scattered through the "why" panel — scales, thinker, microphone, calculator, face, pencil-hand, tape machine |
| `hero/` | 2 | `cloud.webp` and `cloud-2.webp`, the two drifting cloud plates |
| `phone/` | 3 | `hand.webp` (the phone in a hand), `chair.webp` and `chair-narrow.webp` (the phone on a chair, wide and portrait crops) |
| `figure/` | 1 | `human.webp`, the figure in the "made by humans" panel |

Source, for every one of them: <https://reasonal.co/>.

## What is deliberately *not* in this folder

Eight of the reference's assets were not taken, and each one is a rule rather than
an oversight. Every one of them is rebuilt in the DOM instead, which is why
`src/content/site.ts` carries `lesson`, `caseStudy` and the topic list as **data**
rather than as image imports.

| Not taken | Why | What the build does instead |
|---|---|---|
| `Reasonal_New_Logo_Orange_web.svg`, `Reasonal_New_Logo_White_web.svg`, `Reasonal_Logo_Square_Icon.webp` | Rule 10: the reference's wordmark comes out. A page carrying a real company's mark over invented prices is the one thing this series must never produce. | The `crux` wordmark, drawn: the word plus a plumb line, in the same place at the same size |
| `tagcloud.webp` | It is a **picture of text** — eight topic names rasterised. Keeping it would put a picture of words on a page about reading carefully. | Eight real chips, selectable, searchable, and legible at 390 |
| `milgram-experiment.png` | A screenshot of the reference's own application. | The same lesson card as live markup: a title, three paragraphs and three asides, every word selectable |
| `23andme-case.png` | It names a real company and a real data breach, and the claims printed on it are the lesson's deliberately *wrong* answers. Attaching those to a real company under invented copy is not something a private study gets to do. | The same card, re-subjected to an invented company — "Northvale Genomics" — and labelled as invented in its own body text |
| `lessons/DunningKruger.webp` | A pixelated photograph of a named living person. | A drawn mark for that one chip; the other nineteen thumbnails are the reference's own |
| `download-button.svg` | Apple's App Store badge is Apple's mark. | The badge drawn at the same 220×74, with the reference's own hover (a `backdrop-blur` veil, not a colour change) |
| `logo-social-instagram.svg`, `logo-social-threads.svg`, `logo-social-linkedin.svg`, `logo-social-x.svg` | Platform marks. | Three 24px glyphs, drawn |

## Fonts

Nothing is substituted. The reference sets everything in **Archivo** and
**Gabarito**, both SIL Open Font Licence 1.1, both on fontsource, so the
letterforms in the after are not close to the reference's — they are the same
ones, from the same source files.

The *before* is set in **Geist** (OFL 1.1) and **IBM Plex Mono** (OFL 1.1). Those
are its own choice and have nothing to do with the reference.

## The standing statement

This build is a **private study**. It is not deployed, not published and not
passed off as anyone's site. Every word on both designs — the brand name, the
lesson titles, the case study, the four reviews, the prices and the eight
answers — is invented for `crux`, an app that does not exist. The reviews are
not real people's reviews; the company in the case study is not a real company.
Using the reference's own photography is the right call *because* the study is
private, and the invented copy is what keeps either page from being able to
masquerade as the real one.
