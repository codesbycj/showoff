# travelexa imagery

Travelexa is a fictional travel app. The tours, prices, review counts, booking
reference, "Andrew Collins" and his trip history are invented content for a UI
showcase. No tour operator is represented and nothing here is bookable.

## Photography — AI-generated, shipped with the export

Every `.jpg` here comes from the Google Stitch export this showcase rebuilds.
Stitch generated the images and hot-linked them from `lh3.googleusercontent.com`,
so none is a photograph of a place as it is, and none survives offline. Each was
pulled once at the largest size the host serves and cropped to the slot it fills.

| Group | Files | Slot |
|---|---|---|
| Home | `andrew-avatar`, `hero-bali`, `tour-treehouse`, `tour-ubud`, `tour-komodo` | 48dp avatar, the 4:5 hero, three 4:3 carousel cards |
| Discovery | `exp-*` (4), `col-*` (4), `dis-*` (3) | 280x288 expedition cards, 169x192 collection tiles, 188x176 dispatch photos |
| Destination | `dest-hero`, `dt-*` (3) | the full-bleed 360dp hero, three 240x148 tour cards |
| Saved | `sv-bali`, `sv-kyoto`, `sv-amalfi` | three 16:11 collection cards |
| Profile | `andrew-portrait`, `booking-bali`, `dd-*` (3) | the 80dp portrait, the 190dp booking photo, three 140x110 tiles |

## Many of these are screenshots, not photographs

This is the export's distinguishing problem. A large share of the images Stitch
returned are not pictures — they are **renders of an invented web page**: a white
browser bar across the top, often a headline and a location line burned onto the
photo beneath, and sometimes a caption bar across the bottom too.

Stitch's own renders inherit the artifact. The reference home screen shows a
stray `ke` floating over the hero card — the tail of "BALI: Serenity on the Lake",
baked into the source image. The reference saved screen shows "Bamboo Grove &
Pagoda" colliding with the Kyoto card's title for the same reason.

So every crop here starts below the chrome and, where there is one, stops above
the caption bar. A browser bar is flat across its width where a photograph is
not, which locates most of them automatically; burned-in *headline* text sits on
the photo and has to be given explicitly. `sv-kyoto.jpg` needed both ends
trimmed. None of the burned-in text reaches the rebuilt screens.

## No emoji, and one image that does not exist

Unlike every other Stitch export rebuilt here, this one sets **no emoji as UI** —
every small mark is a Material Symbol — so nothing had to be substituted for
platform independence.

The discovery screen's world-map banner ships no image at all: the export points
it at `stitch-placeholder-300x300.svg`, Stitch's own "image goes here" tile. The
banner is rebuilt as the flat dark card and its gradient, which is what the
reference renders. Inventing a map texture would be adding something the design
never specified.
