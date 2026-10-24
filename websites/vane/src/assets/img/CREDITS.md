# Credits

## What is in this folder

Eight free-licensed photographs from **Pexels**, used under the Pexels licence,
standing in for the reference's own people photography.

| File | Pexels photo |
|---|---|
| `people/expert.webp` | <https://www.pexels.com/photo/27015641/> |
| `people/partner.webp` | <https://www.pexels.com/photo/40079124/> |
| `people/featured.webp` | <https://www.pexels.com/photo/27086922/> |
| `people/t-1.webp` | <https://www.pexels.com/photo/8278977/> |
| `people/t-2.webp` | <https://www.pexels.com/photo/10577611/> |
| `people/t-3.webp` | <https://www.pexels.com/photo/36619715/> |
| `people/t-4.webp` | <https://www.pexels.com/photo/26820703/> |
| `people/media.webp` | <https://www.pexels.com/photo/8475171/> |

Each was cover-cropped to the box the page paints it in and written as WebP
q84. Nothing else was changed. The eight files come to 250KB in total.

**The people in these photographs are not the people named beside them.** The
names, roles, companies and quotations on both designs are invented, and the
portraits are stock standing in for a company's own. Nothing on either page is
a real person's testimonial.

## What is deliberately *not* in this folder

This is the episode where rule 10 does most of the work, because the
reference's home page is — by surface area — mostly other organisations'
trademarks:

- **fourteen client logos** in its wall (AXA, Veolia, Motorola, KFC, BNP
  Paribas, Hertz, Schneider Electric and so on);
- **twelve certification and framework marks**;
- **six advisory partner logos**;
- **four testimonial companies' logos**;
- **nine screenshots of its own application**, each carrying its wordmark, its
  navigation and its French interface copy.

None of it is carried over. Rule 10 replaces brand marks, and a screenshot of a
real company's software under an invented product's name is a brand mark with
the whole application attached to it.

So instead:

- every client, partner and testimonial company is **invented**, and its
  wordmark is **drawn** in `src/after/Marks.tsx` — four treatments cycled
  through the wall, so fourteen cells read as fourteen design departments
  rather than one list in one face;
- every product visual is **rebuilt in the DOM** in `src/after/Visuals.tsx`, at
  the box the reference paints it in, with the same information architecture: a
  rail, a header, a figure, a chart, a table. They are live text, they reflow
  at 390, and they cost no raster bytes;
- the brand mark is vane's own — a word and a pointer, at the reference's two
  sizes and in its two places.

### The standards row, and where the line is

The reference's badge row mixes two different kinds of thing, and they are
treated differently here:

- **Public instruments keep their real names.** CSRD, SBTi, TCFD, SFDR, the ISO
  numbers and the Digital Product Passport are laws and open standards. A
  carbon tool naming them is the same kind of statement as a payments tool
  naming PCI DSS, and the badges are drawn here rather than copied.
- **Certification marks are invented.** The three that would be a claim that a
  third party has audited *the company* — a B-Corp-style mark, a disclosure
  index, a standards-body membership — are replaced with invented equivalents,
  flagged `invented: true` in the content deck. Claiming one would be a claim.

## The build

This is a **private study**. It is not deployed, not published and not passed
off as anyone's site. Every word on both designs — the brand name vane, the
prices, the figures, the customer names, the quotations, the awards and the
legal line — is invented.
