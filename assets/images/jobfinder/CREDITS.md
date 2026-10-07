# jobfinder imagery

Job Finder is a fictional app. The job listings, salaries, recruiters,
conversations, case studies and the profile belonging to "George Miller" are
invented content written for a UI showcase. No real person, employer or agency
is described here, and the company marks on the cards — Dropbox, Apple, Figma,
PokerStars, Slack — are drawn from the brands' own published logos purely to
identify them in a mock feed.

## Portraits — AI-generated, shipped with the Stitch export

Every `.jpg` here comes from the Google Stitch export this showcase rebuilds.
Stitch generated them and hot-linked them from `lh3.googleusercontent.com`, so
they are not photographs of anyone, and none of them survive offline. They were
pulled once at `=s1024`, centre-square cropped — which is what the reference's
`object-cover` on a square box does — and downscaled to 320x320, 3x the largest
slot any of them fills. Nothing else was altered.

| File | Slot in the reference |
|---|---|
| `coll-hero.jpg` | onboarding collage, 98dp hero avatar |
| `coll-hoodie-man.jpg` | onboarding collage, 70dp top-left |
| `coll-grey-man.jpg` | onboarding collage, 64dp centre |
| `coll-curly-man.jpg` | onboarding collage, 36dp top-right |
| `coll-blonde.jpg` | onboarding collage, 32dp lower-left |
| `coll-senior-woman.jpg` | onboarding collage, 28dp top-middle |
| `coll-young-woman.jpg` | onboarding collage, 26dp upper-middle |
| `coll-micro-man.jpg` | onboarding collage, 24dp right |
| `coll-side-woman.jpg` | onboarding collage, 22dp left |
| `george-feed.jpg` | home feed greeting, 44dp |
| `george-profile.jpg` | profile header, 76dp |
| `msg-me.jpg` | messages header, 40dp |
| `msg-sarah.jpg`, `msg-marcus.jpg`, `msg-elena.jpg`, `msg-alex.jpg` | conversation rows, 48dp |

### Two substitutions

For the two smallest collage slots — the 24dp and 22dp avatars — Stitch
generated a 3D cartoon character rather than a portrait, while the render it
shipped alongside shows photographs there. `coll-micro-man.jpg` and
`coll-side-woman.jpg` are therefore crops of `msg-marcus` and `msg-sarah` from
the same export. At 24dp and 22dp the substitution is not resolvable; a cartoon
elf would have been.

`george-home-alt.jpg` was downloaded and dropped. The two home-screen exports
disagree about which portrait sits beside "Hi, George!", and the higher-fidelity
render — the one this rebuild follows — uses `george-feed`.

### A known inconsistency, carried over deliberately

The reference uses a different man for George on the feed than on the profile
screen. Both are bearded and in a dark suit, and at 44dp against 76dp they read
as one person, so each screen keeps the portrait its own reference shows rather
than being unified against the design.

## Brand marks — drawn, not bitmaps

The Dropbox, Apple, Figma, Slack, Skype and PokerStars marks are inline SVG
paths in `src/features/jobfinder/components/brand-mark.tsx`, so they stay sharp
at any size and carry the brands' own colours. Nothing here is a downloaded
logo file.
