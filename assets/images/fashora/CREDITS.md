# fashora imagery

Fashora is a fictional fashion retailer. The products, prices, review counts,
promo code, order reference, "Martin Butler" and his order history are invented
content for a UI showcase. No retailer is represented and nothing here is
purchasable.

## Photography — AI-generated, shipped with the export

Every `.jpg` here comes from the Google Stitch export this showcase rebuilds.
Stitch generated the images and hot-linked them from `lh3.googleusercontent.com`,
so none is a photograph of a real garment or person, and none survives offline.
Each was pulled once at the largest size the host serves and cropped to the slot
it fills.

`logo.png` is the export's own 480x120 lockup, shipped unchanged: it is already
vector-clean at four times the 32dp it is drawn at, and it keeps its
transparency at 8KB.

| Group | Files | Slot |
|---|---|---|
| Chrome | `logo`, `avatar` | the 128x32 lockup, the 32dp app-bar avatar |
| Home | `greeting`, `promo-model`, `pp-hoodie`, `pp-tee`, `pp-bomber`, `pp-coat` | 48dp greeting avatar, the promo's 150x172 panel, four 4:5 product cards |
| Detail | `pd-main`, `pd-zipper`, `pd-front`, `pd-cuff` | the 340x185 hero frame, three 48dp circular angle thumbnails |
| Bag | `cart-bomber`, `cart-hoodie`, `cart-tee` | three 96x112 line-item photos |
| Profile | `portrait`, `ord-bomber`, `ord-hoodie` | the 96dp portrait, two 48dp order thumbnails |

## How each crop was taken

Every slot in the export is `object-cover`, which is a centred crop to the
slot's aspect ratio — so that is what each file is, output at three times its
display size or at the source's own resolution, whichever is smaller. Upscaling
a 279px source to 648px only grows the bundle.

Two files are not plain centred crops, and both are worth stating:

- **`pd-cuff.jpg`** arrived with a white browser bar burned across its top. It
  is a render of an invented web page rather than a photograph, which is the
  same artifact the Travelexa export carried. The top 15px are trimmed before
  the crop, so no chrome reaches the rebuilt screen. The reference *does* show
  that white bar in its third thumbnail; dropping it is a deliberate deviation.
- **`promo-model.jpg`** is cropped to the promo panel's aspect *and* missing its
  top 7.5%, because the export draws the model 108% of the panel's height and
  bottom-anchors her inside a card that clips. Baking that into the crop meant
  the component needed no percentage height and no second clip. The window also
  sits 6px right of centre, measured off the reference, because the export
  right-aligns the image inside the panel.

## What was dropped from the export's own artwork

- The **second "Fashora"**. The feed and profile screens follow the logo —
  which already reads "Fashora" — with a text span saying "Fashora" again, and
  the reference renders both. One of them is a bug, so the rebuilt app bar
  carries the lockup alone on those two screens.
- The promo card's **blurred white glow disc**. It is positioned in the card's
  bottom-right corner, which is exactly where the photo panel sits, and the
  panel paints over it. It reaches no pixel of the reference.
- The detail stage's **`blur-3xl` glow pod**. A 10% orange wash behind an opaque
  photo; the reference shows no trace of it.

## No emoji

Like the Travelexa export and unlike Mindful Pop and Volt, this one sets no
emoji as UI — every small mark is a Material Symbol — so nothing had to be
substituted for platform independence.
