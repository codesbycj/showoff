# volt imagery

Volt is a fictional sports-betting app, rebuilt from a Google Stitch design-system
export as a UI showcase. **Every figure on every screen is invented** — balances,
stakes, odds, payouts, win rates, the "Volt Gold" tier, "Martin Butler" and his
betting history. Nothing here is a real account, a real price, or an offer. No
gambling operator is represented, and the app is not connected to anything.

## Club crests — AI-generated, shipped with the export

The seven crests are Stitch-generated approximations of real club badges —
Chelsea, Manchester City, Manchester United, FC Barcelona, Real Madrid, Paris
Saint-Germain and Bayern Munich. They are not the clubs' official marks, and they
appear only to identify the fixtures in a mock feed, as the reference design
intends. No endorsement by any club is implied.

Stitch returned them at inconsistent framing. Three came back as clean badges on
a flat field; four came back as **screenshots of an invented app** with the crest
sitting in the middle of the frame. Those four are cropped down to the badge —
shipping a picture of someone else's interface inside a card would be nonsense.

| File | Source framing | Shipped |
|---|---|---|
| `crest-madrid.jpg` | clean badge | 120x120 |
| `crest-manutd.jpg` | clean badge | 120x120 |
| `crest-chelsea.jpg` | clean badge | 120x120 |
| `crest-psg.jpg` | badge on a patterned field | 120x120 |
| `crest-barcelona.jpg` | cropped out of a mock interface | 120x120 |
| `crest-mancity.jpg` | cropped out of a mock interface | 120x120 |
| `crest-bayern.jpg` | cropped out of a mock interface | 120x120 |

## Portraits — AI-generated, shipped with the export

| File | Slot |
|---|---|
| `fan-1.jpg` … `fan-6.jpg` | the stacked 24dp bettor avatars on the feed and the scores board |
| `martin.jpg` | the 64dp profile portrait on the wallet |
| `profile-small.jpg` | the 32dp signed-in avatar in the wallet header |

None is a photograph of a real person. Each is cropped head-and-shoulders rather
than centre-square: a centre crop of a seated portrait puts the chin at the top
of a circular avatar.

## The stream still

`stream-still.jpg` is the generated match photograph the export sets as a CSS
`background-image` on its video player. It is re-pulled at full size and cropped
to the player's 4:5 box. It stands in for a live stream; nothing plays.

## The brand mark is not an image

`components/volt-mark.tsx` is the export's own SVG, carried across verbatim —
`pulsesport_logo` ships as a 299-byte `code.html` holding a circle, a path and a
dot on a 100-unit box. It is the only brand mark in these showcases that needed
neither tracing nor rasterising. Its two colours are `DESIGN.md`'s *prose* values
(`#D4FF00` on `#141716`) where the rest of the showcase follows the frontmatter;
a brand asset delivered as code is taken as drawn.

## Emoji replaced

The export sets eight emoji as UI, seven of them on the sport-category chips:
⚽ 🏀 🎾 🎮 ⚾ 👤 ⚡ ✓. Every one is replaced with a Material Symbol from this
showcase's own subset. An emoji is drawn by whichever font claims the codepoint,
so it is a different picture on Windows, Android and iOS, and the web harness
renders on one of them and cannot show the difference. The visible consequence is
that the chips carry monochrome glyphs where the reference shows colour.
