# deltrack imagery

Nothing is bundled here, and that is deliberate.

Every mark on the screen is drawn in `react-native-svg` under
`src/features/deltrack/components`:

| what | where |
|---|---|
| the account avatar | `user-avatar.tsx` |
| the taped carton and its pin | `parcel-art.tsx` |
| the carton on a dark disc, with its tick | `parcel-disc.tsx` |
| every line icon, and the dock's five tabs | `icons.tsx` |

The reference's own art is a set of 3D renders and a stock illustration, neither
of which is redistributable. Each is rebuilt here to the same read at the size
it is used — the carton as an isometric cube with a tape band, the avatar as a
flat figure on a yellow disc — rather than substituted with a photograph.

Drawing them also keeps the showcase off an icon font. Two subsets cut from one
source face keep the family name written *inside* the file, Android resolves a
face by that name rather than by the key it was registered under, and the second
showcase to ship one renders out of the first one's glyphs — invisible on web,
which is the only thing this workflow can see. There is no font here to collide.

The reference itself is in `ref/deltrack/`: `home-source.png` as it arrived, and
`home-dp.png` resampled so one pixel is one dp.
