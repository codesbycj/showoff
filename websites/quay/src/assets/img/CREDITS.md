# Credits

Every image in this folder is the **reference site's own**, taken from

> https://allinnhomeofstudents.com/

and used here under rule 0 of the series: the after is a pixel-perfect rebuild
of that page, and a rebuild that swaps the photographs is a tribute rather than
a copy — the crop, the colour and what is in frame are where the art direction
lives.

**This build is a private study.** It is not deployed, not published, and not
passed off as anyone's site. Every word on it — the brand name quay., the
address, the prices, the room names, the services, the FAQs and the legal line
— is invented, so the page cannot be mistaken for the real company's.

**The brand marks are not here, and that is deliberate.** The reference's
wordmark, its map pin and its operator's logo are the one class of asset the
series replaces rather than copies (rule 10). quay's own mark is drawn in
`src/after/Parts.tsx`, in the same idiom, at the same two sizes, in the same
places.

The icon set is also the reference's, and also not in this folder: its 17
pictograms were pulled out of the theme's `icons.woff2` as path data and live
in `src/after/Icons.tsx`. The two logo glyphs in that font were dropped.

## Re-encoding

Photographs were capped at 1,600px on the long edge and written as WebP q82.
The source set is 17.8MB of 2,560px JPEGs for slots the page paints at
439×293; nothing was re-cropped, recoloured or replaced. The SVG shapes and
masks are byte-for-byte the reference's files. The two hero clips are its own
MP4s, unmodified — including the fact that they are HEVC with the `moov` atom
after `mdat`, which is why they carry posters (see the episode README).

| File | From |
|---|---|
| `apply/banner.webp` | `https://allinnhomeofstudents.com/wp-content/uploads/apply-now-banner-photo-1.webp` |
| `apply/student.webp` | `https://allinnhomeofstudents.com/wp-content/uploads/apply-sticky-no-bg.png` |
| `extras/bikes.webp` | `https://allinnhomeofstudents.com/wp-content/uploads/16c269c3-a351-4f0b-8811-6e0390b0f4bd_.webp` |
| `extras/cleaning.webp` | `https://allinnhomeofstudents.com/wp-content/uploads/getty-images-7oj7r468p5u-unsplash_.webp` |
| `extras/english-1.webp` | `https://allinnhomeofstudents.com/wp-content/uploads/pexels-tima-miroshnichenko-5407218_.webp` |
| `extras/english-2.webp` | `https://allinnhomeofstudents.com/wp-content/uploads/chatgpt-image-7-maj-2026-22_34_51_.webp` |
| `extras/signing.webp` | `https://allinnhomeofstudents.com/wp-content/uploads/young-attractive-colleagues-sitting-office-coworking_.webp` |
| `extras/weekend.webp` | `https://allinnhomeofstudents.com/wp-content/uploads/ahmet-kurt-brgoe-qvb8e-unsplash_.webp` |
| `hero/building.webp` | `https://allinnhomeofstudents.com/wp-content/uploads/hero-img.webp` |
| `hero/room.webp` | `https://allinnhomeofstudents.com/wp-content/uploads/loop-2.webp` |
| `location/map.webp` | `https://allinnhomeofstudents.com/wp-content/uploads/google-maps-minimal.jpg` |
| `location/street.webp` | `https://allinnhomeofstudents.com/wp-content/uploads/be49eec4454b81f854d898b7d67e84a01e778380.webp` |
| `rooms/double-a-1.webp` | `https://allinnhomeofstudents.com/wp-content/uploads/torus_all_inn_kroniki_17_3000.jpg` |
| `rooms/double-a-2.webp` | `https://allinnhomeofstudents.com/wp-content/uploads/torus_all_inn_kroniki_20_3000.jpg` |
| `rooms/double-a-3.webp` | `https://allinnhomeofstudents.com/wp-content/uploads/torus_all_inn_kroniki_21_3000.jpg` |
| `rooms/double-b-1.webp` | `https://allinnhomeofstudents.com/wp-content/uploads/torus_all_inn_kroniki_13_3000.jpg` |
| `rooms/double-b-2.webp` | `https://allinnhomeofstudents.com/wp-content/uploads/torus_all_inn_kroniki_15_3000.jpg` |
| `rooms/double-b-3.webp` | `https://allinnhomeofstudents.com/wp-content/uploads/torus_all_inn_kroniki_14_3000.jpg` |
| `rooms/double-c-1.webp` | `https://allinnhomeofstudents.com/wp-content/uploads/torus_all_inn_kroniki_27_3000.jpg` |
| `rooms/double-c-2.webp` | `https://allinnhomeofstudents.com/wp-content/uploads/torus_all_inn_kroniki_25_3000.jpg` |
| `rooms/double-c-3.webp` | `https://allinnhomeofstudents.com/wp-content/uploads/torus_all_inn_kroniki_26_3000.jpg` |
| `rooms/plan-double.webp` | `https://allinnhomeofstudents.com/wp-content/uploads/double-floor-plan_.webp` |
| `rooms/plan-double-top.webp` | `https://allinnhomeofstudents.com/wp-content/uploads/double-4th_.webp` |
| `rooms/plan-single.webp` | `https://allinnhomeofstudents.com/wp-content/uploads/single-floor-plan_.webp` |
| `rooms/plan-single-top.webp` | `https://allinnhomeofstudents.com/wp-content/uploads/single-4th_.webp` |
| `rooms/plan-step-free.webp` | `https://allinnhomeofstudents.com/wp-content/uploads/single-accessible-floor-plan_.webp` |
| `rooms/plan-twin.webp` | `https://allinnhomeofstudents.com/wp-content/uploads/twin-floor-plan_.webp` |
| `rooms/single-1.webp` | `https://allinnhomeofstudents.com/wp-content/uploads/all.inn-single-i-ii-iii-3.jpg` |
| `rooms/single-2.webp` | `https://allinnhomeofstudents.com/wp-content/uploads/all.inn-single-i-ii-iii.jpg` |
| `rooms/single-3.webp` | `https://allinnhomeofstudents.com/wp-content/uploads/all.inn-single-i-ii-iii-2.jpg` |
| `rooms/single-4.webp` | `https://allinnhomeofstudents.com/wp-content/uploads/all.inn_kuchnia.jpg` |
| `rooms/single-5.webp` | `https://allinnhomeofstudents.com/wp-content/uploads/all.inn-single-i-ii-iii-4.jpg` |
| `rooms/single-6.webp` | `https://allinnhomeofstudents.com/wp-content/uploads/all.inn_lazienka.jpg` |
| `rooms/single-top-1.webp` | `https://allinnhomeofstudents.com/wp-content/uploads/all.inn_single-iv.jpg` |
| `rooms/single-top-2.webp` | `https://allinnhomeofstudents.com/wp-content/uploads/all.inn_single-iv-2.jpg` |
| `rooms/single-top-3.webp` | `https://allinnhomeofstudents.com/wp-content/uploads/all.inn_single-iv-3.jpg` |
| `rooms/step-free-1.webp` | `https://allinnhomeofstudents.com/wp-content/uploads/all.inn_nps_i-2.jpg` |
| `rooms/step-free-2.webp` | `https://allinnhomeofstudents.com/wp-content/uploads/all.inn_nps_i.jpg` |
| `rooms/step-free-3.webp` | `https://allinnhomeofstudents.com/wp-content/uploads/all.inn_nps_i-3.jpg` |
| `rooms/step-free-4.webp` | `https://allinnhomeofstudents.com/wp-content/uploads/single-accessible-02_.webp` |
| `rooms/twin-a-1.webp` | `https://allinnhomeofstudents.com/wp-content/uploads/torus_all_inn_kroniki_19_3000.jpg` |
| `rooms/twin-a-2.webp` | `https://allinnhomeofstudents.com/wp-content/uploads/torus_all_inn_kroniki_29_3000.jpg` |
| `rooms/twin-b-1.webp` | `https://allinnhomeofstudents.com/wp-content/uploads/torus_all_inn_kroniki_28_3000.jpg` |
| `rooms/twin-b-2.webp` | `https://allinnhomeofstudents.com/wp-content/uploads/torus_all_inn_kroniki_18_3000.jpg` |
| `services/theirs.webp` | `https://allinnhomeofstudents.com/wp-content/uploads/services-1-2.webp` |
| `services/yours.webp` | `https://allinnhomeofstudents.com/wp-content/uploads/services-1.webp` |
| `shared/bikes-1.webp` | `https://allinnhomeofstudents.com/wp-content/uploads/bicycle-parking_.webp` |
| `shared/calm-1.webp` | `https://allinnhomeofstudents.com/wp-content/uploads/torus_all_inn_kroniki_42_3000.jpg` |
| `shared/calm-2.webp` | `https://allinnhomeofstudents.com/wp-content/uploads/torus_all_inn_kroniki_41_3000.jpg` |
| `shared/calm-3.webp` | `https://allinnhomeofstudents.com/wp-content/uploads/torus_all_inn_kroniki_44_3000.jpg` |
| `shared/calm-4.webp` | `https://allinnhomeofstudents.com/wp-content/uploads/torus_all_inn_kroniki_43_3000.jpg` |
| `shared/garden-1.webp` | `https://allinnhomeofstudents.com/wp-content/uploads/01-two-girls-sitting-in-a-hammock-in-the-grass_-1.webp` |
| `shared/garden-2.webp` | `https://allinnhomeofstudents.com/wp-content/uploads/02-a-man-taking-a-picture-of-a-woman-laying-on-the-grass_-1.webp` |
| `shared/kitchen-1.webp` | `https://allinnhomeofstudents.com/wp-content/uploads/torus_all_inn_kroniki_32_3000.jpg` |
| `shared/kitchen-2.webp` | `https://allinnhomeofstudents.com/wp-content/uploads/dsc7546.jpg` |
| `shared/kitchen-3.webp` | `https://allinnhomeofstudents.com/wp-content/uploads/torus_all_inn_kroniki_34_3000.jpg` |
| `shared/laundry-1.webp` | `https://allinnhomeofstudents.com/wp-content/uploads/loundry-room_.webp` |
| `shared/lounge-1.webp` | `https://allinnhomeofstudents.com/wp-content/uploads/torus_all_inn_kroniki_35_3000.jpg` |
| `shared/lounge-2.webp` | `https://allinnhomeofstudents.com/wp-content/uploads/torus_all_inn_kroniki_36_3000.jpg` |
| `shared/lounge-3.webp` | `https://allinnhomeofstudents.com/wp-content/uploads/torus_all_inn_kroniki_37_3000.jpg` |
| `shared/lounge-4.webp` | `https://allinnhomeofstudents.com/wp-content/uploads/torus_all_inn_kroniki_38_3000.jpg` |
| `shared/marquee-1.webp` | `https://allinnhomeofstudents.com/wp-content/uploads/slogan-photo-1.webp` |
| `shared/marquee-2.webp` | `https://allinnhomeofstudents.com/wp-content/uploads/slogan-photo-2.webp` |
| `shared/study-1.webp` | `https://allinnhomeofstudents.com/wp-content/uploads/torus_all_inn_kroniki_40_3000.jpg` |
| `shared/study-2.webp` | `https://allinnhomeofstudents.com/wp-content/uploads/torus_all_inn_kroniki_39_3000.jpg` |
| `slogan/one.webp` | `https://allinnhomeofstudents.com/wp-content/uploads/slogan-1.webp` |
| `slogan/two.webp` | `https://allinnhomeofstudents.com/wp-content/uploads/slogan-2.webp` |
| `tiles/city-1.webp` | `https://allinnhomeofstudents.com/wp-content/uploads/gdansk-city.webp` |
| `tiles/city-2.webp` | `https://allinnhomeofstudents.com/wp-content/uploads/4-all.inn-gdansk.jpg_.webp` |
| `tiles/city-3.webp` | `https://allinnhomeofstudents.com/wp-content/uploads/3-all.inn-gdansk.jpg_.webp` |
| `tiles/city-4.webp` | `https://allinnhomeofstudents.com/wp-content/uploads/all-inn-gdansk-city.webp` |
| `tiles/community-1.webp` | `https://allinnhomeofstudents.com/wp-content/uploads/05f2fc39e58810d751c8c50dbfdab30e0f405882.webp` |
| `tiles/home-1.webp` | `https://allinnhomeofstudents.com/wp-content/uploads/foto.png` |
| `tiles/home-2.webp` | `https://allinnhomeofstudents.com/wp-content/uploads/dsc7532.jpg` |
| `tiles/home-3.webp` | `https://allinnhomeofstudents.com/wp-content/uploads/dsc7638.jpg` |
| `tiles/home-4.webp` | `https://allinnhomeofstudents.com/wp-content/uploads/dji_0530.jpg` |
| `tiles/study-1.webp` | `https://allinnhomeofstudents.com/wp-content/uploads/all.inn-study_.webp` |
| `tiles/study-2.webp` | `https://allinnhomeofstudents.com/wp-content/uploads/2.-all.inn-study-gumed_.webp` |
| `tiles/study-3.webp` | `https://allinnhomeofstudents.com/wp-content/uploads/dji_0535-poprawione-nr.jpg` |
| `hero/clip-1.mp4` | `https://allinnhomeofstudents.com/wp-content/uploads/hero-video-1.mp4` |
| `hero/clip-2.mp4` | `https://allinnhomeofstudents.com/wp-content/uploads/hero-video-2.mp4` |
| `hero/poster-1.webp` | `https://allinnhomeofstudents.com/wp-content/uploads/foto.png` |
| `hero/poster-2.webp` | `https://allinnhomeofstudents.com/wp-content/uploads/TORUS_all_inn_kroniki_08_3000_.webp` |
| `shapes/apply-banner-shape-1.svg` | `https://allinnhomeofstudents.com/wp-content/themes/allinn/assets/build/images/apply-banner-shape-1.svg` |
| `shapes/apply-banner-shape-2.svg` | `https://allinnhomeofstudents.com/wp-content/themes/allinn/assets/build/images/apply-banner-shape-2.svg` |
| `shapes/apply-banner-shape-3.svg` | `https://allinnhomeofstudents.com/wp-content/themes/allinn/assets/build/images/apply-banner-shape-3.svg` |
| `shapes/apply-now-mask.svg` | `https://allinnhomeofstudents.com/wp-content/themes/allinn/assets/build/images/apply-now-mask.svg` |
| `shapes/bar-location-mask.svg` | `https://allinnhomeofstudents.com/wp-content/themes/allinn/assets/build/images/bar-location-mask.svg` |
| `shapes/bar-location-mask-desktop.svg` | `https://allinnhomeofstudents.com/wp-content/themes/allinn/assets/build/images/bar-location-mask-desktop.svg` |
| `shapes/border-location.svg` | `https://allinnhomeofstudents.com/wp-content/themes/allinn/assets/build/images/border-location.svg` |
| `shapes/feature-item-mask.svg` | `https://allinnhomeofstudents.com/wp-content/themes/allinn/assets/build/images/feature-item-mask.svg` |
| `shapes/hero-mask-1.svg` | `https://allinnhomeofstudents.com/wp-content/themes/allinn/assets/build/images/hero-mask-1.svg` |
| `shapes/hero-mask-2.svg` | `https://allinnhomeofstudents.com/wp-content/themes/allinn/assets/build/images/hero-mask-2.svg` |
| `shapes/hero-mask-3.svg` | `https://allinnhomeofstudents.com/wp-content/themes/allinn/assets/build/images/hero-mask-3.svg` |
| `shapes/hero-mask-5.svg` | `https://allinnhomeofstudents.com/wp-content/themes/allinn/assets/build/images/hero-mask-5.svg` |
| `shapes/hero-shape-1.svg` | `https://allinnhomeofstudents.com/wp-content/themes/allinn/assets/build/images/hero-shape-1.svg` |
| `shapes/hero-shape-2.svg` | `https://allinnhomeofstudents.com/wp-content/themes/allinn/assets/build/images/hero-shape-2.svg` |
| `shapes/hero-shape-3.svg` | `https://allinnhomeofstudents.com/wp-content/themes/allinn/assets/build/images/hero-shape-3.svg` |
| `shapes/icon-arrow-select.svg` | `https://allinnhomeofstudents.com/wp-content/themes/allinn/assets/build/images/icon-arrow-select.svg` |
| `shapes/nav-shape-blue.svg` | `https://allinnhomeofstudents.com/wp-content/themes/allinn/assets/build/images/nav-shape-blue.svg` |
| `shapes/nav-shape-cream.svg` | `https://allinnhomeofstudents.com/wp-content/themes/allinn/assets/build/images/nav-shape-cream.svg` |
| `shapes/nav-shape-green.svg` | `https://allinnhomeofstudents.com/wp-content/themes/allinn/assets/build/images/nav-shape-green.svg` |
| `shapes/nav-shape-pink.svg` | `https://allinnhomeofstudents.com/wp-content/themes/allinn/assets/build/images/nav-shape-pink.svg` |
| `shapes/nav-shape-yellow.svg` | `https://allinnhomeofstudents.com/wp-content/themes/allinn/assets/build/images/nav-shape-yellow.svg` |
| `shapes/slogan-mask-1.svg` | `https://allinnhomeofstudents.com/wp-content/themes/allinn/assets/build/images/slogan-mask-1.svg` |
| `shapes/slogan-mask-2.svg` | `https://allinnhomeofstudents.com/wp-content/themes/allinn/assets/build/images/slogan-mask-2.svg` |
| `shapes/slogan-shape-1.svg` | `https://allinnhomeofstudents.com/wp-content/themes/allinn/assets/build/images/slogan-shape-1.svg` |
| `shapes/slogan-shape-2.svg` | `https://allinnhomeofstudents.com/wp-content/themes/allinn/assets/build/images/slogan-shape-2.svg` |
| `shapes/slogan-shape-3.svg` | `https://allinnhomeofstudents.com/wp-content/themes/allinn/assets/build/images/slogan-shape-3.svg` |
| `shapes/slogan-shape-mobile-1.svg` | `https://allinnhomeofstudents.com/wp-content/themes/allinn/assets/build/images/slogan-shape-mobile-1.svg` |
| `shapes/slogan-shape-mobile-2.svg` | `https://allinnhomeofstudents.com/wp-content/themes/allinn/assets/build/images/slogan-shape-mobile-2.svg` |
| `shapes/slogan-shape-mobile-3.svg` | `https://allinnhomeofstudents.com/wp-content/themes/allinn/assets/build/images/slogan-shape-mobile-3.svg` |
| `shapes/slogan-shape-mobile-4.svg` | `https://allinnhomeofstudents.com/wp-content/themes/allinn/assets/build/images/slogan-shape-mobile-4.svg` |
| `shapes/slogan-shape-mobile-5.svg` | `https://allinnhomeofstudents.com/wp-content/themes/allinn/assets/build/images/slogan-shape-mobile-5.svg` |
| `shapes/tiles-slogan-shape-1.svg` | `https://allinnhomeofstudents.com/wp-content/themes/allinn/assets/build/images/tiles-slogan-shape-1.svg` |
| `shapes/tiles-slogan-shape-2.svg` | `https://allinnhomeofstudents.com/wp-content/themes/allinn/assets/build/images/tiles-slogan-shape-2.svg` |
| `shapes/banner-mask-desktop.svg` | `https://allinnhomeofstudents.com/wp-content/themes/allinn/assets/build/blocks/images/banner-mask-desktop.svg` |
| `shapes/banner-mask-mobile.svg` | `https://allinnhomeofstudents.com/wp-content/themes/allinn/assets/build/blocks/images/banner-mask-mobile.svg` |

## What the photographs actually show

A handful of them are of the reference's own city rather than the invented
brand's, because rule 0 does not allow swapping them: the small masked shape in
the slogan and the four slides behind the city tile. The alt text for those
describes what is in the frame — a harbour crane, brick terraces from the air —
and does not claim a place the picture does not support. This is listed in the
episode README under Declared departures.

Filenames beginning `torus_all_inn_kroniki_` are the reference's own upload
names and are kept only so that each row above can be checked against the
source. They name the reference's operator, not quay's.
