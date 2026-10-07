# kinetic imagery

**No image files.** Like Nova, Kinetic ships none — every picture on all five
screens is drawn in code.

The export references sixteen images, all pointing at `lh3.googleusercontent.com`
URLs that no longer resolve. The one file the bundle does contain
(`image.png/screen.png`) is the original Dribbble-style presentation board the
design was worked up from — an "Orbix Studio" portfolio shot of two phone
mockups, not an app asset. So there was nothing to bundle and nothing to fetch.

| What | How |
|---|---|
| The cardboard parcel, on the home hero card and the tracking sheet | Isometric SVG polygons (`components/parcel-art.tsx`). The export's own alt text asks for "isometric delivery illustration style", and an axonometric box has no foreshortening to get wrong. |
| The red delivery van, on the "New Delivery" card | Same file — cargo box, cab, windscreen, two parcels in the bed, and wheels. |
| Five product thumbnails: Mac mini, Sonos Move, DJI Mini, Studio Display, Keychron Q1 | Flat silhouettes on a 48-unit box. They render at 40–48dp, where a silhouette carries as much as a studio photograph would. |
| The city map on the tracking and fleet screens | `components/map-canvas.tsx`, carried across from the export's own SVG: a tiled `pattern` of rounded blocks, four white arterials, and the charcoal route with a dashed overlay. The fleet screen's reference screenshots a *real* Google map instead — that is a difference between two Stitch passes rather than a design decision, and a live map would need a network key the recording cannot depend on. One vector map, both screens. |
| Three figures: the courier, the fleet driver, the account holder | Plain `View`s — head, shoulders, and the coral cap the reference gives the courier. |

Icons are not drawn: they come from Material Symbols Outlined, which is the set
the design specifies, subset to the 57 glyphs this app uses
(`assets/fonts/kinetic-symbols`, 9.8KB from 944KB).
