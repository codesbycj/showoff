# mindful imagery

Mindful Pop is almost entirely drawn rather than photographed — the seven
onboarding characters, every mood face and every calendar day cell are vector,
so the export references only three photographs. All three pointed at
`lh3.googleusercontent.com` URLs that do not survive offline, and the recording
must not depend on the network, so both files below are bundled.

## Free-licensed stock (Pexels)

All under the [Pexels licence](https://www.pexels.com/license/): free to use,
no attribution required. Credited here anyway.

| File | Pexels photo | Stands in for | Used on |
|---|---|---|---|
| `alex.jpg` | 2379004 | "Close-up lifestyle portrait of a young man named Alex with warm friendly smile" | Dashboard header avatar, profile header avatar |
| `morning-sun.jpg` | 30567393 | "A soft golden morning sunlight streaming through green leafy house plants ... on a warm wooden breakfast table" | The `morning_sun.jpg attached` thumbnail on the check-in journal |

`alex.jpg` is the same file the Red Brew showcase uses for its own Alex. The two
briefs describe the same person — a young man, warm smile, soft natural light —
and the file is 12KB, so it is copied rather than shared: a showcase that
reaches into another one's assets breaks the moment either is wiped.

The export's third image is the profile screen's "playful vibrant 3D stylized
avatar portrait of Alex with modern spectacles". No free-licensed 3D render
matches that brief, and the app names the same person on both screens, so the
profile reuses `alex.jpg`. The deviation is the render style, not the subject.

Both files are cropped and re-encoded to the size they render at —
`morning-sun.jpg` is 120px square for a 28dp circle — and together they are
17KB.

## Not photographed

The seven onboarding characters are `components/mood-faces.tsx`, ported from the
export's own inline SVG: gradient fills, white rim strokes and drawn features,
so they are true vector at any size.

Icons come from Material Symbols Outlined, the set the design specifies, subset
to the 59 glyphs this app uses (`assets/fonts/mindful-symbols`, 9.9KB from
944KB). `card_giftcard` is a Material *Icons* name the Symbols set does not
carry; the gifting row takes `redeem`, which is the same gift-with-a-bow.

The check-in screen's mood chips ship `U+263A`, `U+26A1` and `U+2639` as literal
text in the export. Those are drawn instead — see `components/checkin-parts.tsx`.
A dingbat is resolved by whichever font on the device happens to carry it, which
is not the same font on Windows, Android and iOS, and the web harness cannot
see the difference.
