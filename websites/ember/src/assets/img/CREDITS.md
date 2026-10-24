# Credits

**This project uses its reference site's own imagery, and it is a private study that is
not to be deployed.** That is the same declared exception that `switchblade/`, `bulwark/`
and `pennant/` carry, and the reason is the same each time: the build is checked against
the reference by measuring one against the other, and you cannot measure a layout that is
holding different pictures.

It matters more here than in those three. This is a before/after episode, so the whole
claim of the project is *the same business, the same words, the same photographs, two
designs*. Swap the photographs for stand-ins and the comparison stops being a comparison
of design and starts being a comparison of photography — which is exactly the confound
the format exists to remove.

Everything that is not a photograph is invented: the brand, the mark, the product names,
the prices, every line of copy, both page designs. Ember Health does not exist.

## Files

| File | What it is | Where it came from |
|---|---|---|
| `hero.webp`, `hero-gradient.avif` | The hero photograph and the gradient laid over it at `mix-blend-mode: overlay` | reference site |
| `banner-strip.webp` | The image lit across the announcement bar at `mix-blend-mode: lighten` | reference site |
| `intro-chip-1..3.webp` | The three 39x26 chips set into the opening sentence | reference site |
| `card-man.webp`, `card-woman.webp`, `card-glasses.webp` | The three application cards | reference site |
| `product-panel.webp` | The red mesh the panel is shown against | reference site |
| `product-render.webp` | The panel itself, cut out | reference site |
| `benefit-sleep.webp`, `benefit-female.webp`, `benefit-skin.webp`, `benefit-longevity.webp`, `benefit-resilience.webp` | The five benefit photographs | reference site |
| `voice-*.webp` (10) | The testimonial portraits | reference site |
| `cta-bg.webp`, `cta-dots.webp` | The two layers over the red panel | reference site |
| `pay-0..3.svg` | Payment marks | reference site |

The portraits are of real people, published by the reference as customer testimonials. The
quotes beside them here are **invented and attributed to first names only**; none of the
words in this build are theirs. If this were ever to go anywhere other than a private
study, every one of these files would have to be replaced with free-licensed stock first,
and the portraits replaced with portraits of people who had agreed to be in it.

## Fonts

| Font | Licence | Why |
|---|---|---|
| Geist Variable | SIL OFL 1.1, via `@fontsource-variable/geist` | Stands in for Saans, which the reference licenses as a trial and cannot be redistributed. Same large x-height, same flat terminals, same unfussy digits. |
| IBM Plex Mono | SIL OFL 1.1, via `@fontsource/ibm-plex-mono` | The reference's own mono, so this one matches exactly rather than approximately. It is used at one size, 8px, on the readout plates. |

The 2012 page uses no webfont at all — Arial, Trebuchet MS, Georgia and Arial Black, which
is what a site of that decade had. That is a design decision rather than an oversight and
it is the honest one: `@font-face` in 2012 meant four files and a licence the client did
not have.
