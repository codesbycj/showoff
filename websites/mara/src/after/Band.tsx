import { BAND } from '@/content/site';

/**
 * Six words over one photograph, measured off the reference.
 *
 *   section  y6281  h762, the image bled past both edges at 1920 wide
 *   rows     y6441 / y6629 / y6816 — 188px apart
 *   left     x32 every time; right flush to x1408
 *   type     Clash 48/67.2 500, lime
 *
 * Six words, three lines, nothing in the middle: CURATED — GRACE / DAILY LIFE —
 * FOR / THE — SIMPLICITY. Read across it is a sentence, read down each side it
 * is two lists, and the photograph in the gap is what makes you do both.
 *
 * The image is 1920 wide in a 1440 viewport and positioned at x-25, so it is
 * cropped by 240 on each side. That is not a cover-fit accident — the bottle
 * sits dead centre of the visible crop because the frame was chosen for the
 * overhang.
 */
export function Band() {
  return (
    <section className="relative isolate h-[762px] w-full overflow-hidden">
      <img
        className="absolute left-1/2 top-0 h-full w-[1920px] max-w-none -translate-x-1/2 object-cover"
        src={BAND.image}
        alt={BAND.alt}
        width={2880}
        height={1143}
        loading="lazy"
      />

      <div className="gut relative flex h-full flex-col justify-center gap-[121px]">
        {BAND.rows.map((row) => (
          <div key={row.join()} className="flex items-baseline justify-between gap-8">
            <h2 className="t-48 text-lime rise m-0 uppercase">{row[0]}</h2>
            <h2 className="t-48 text-lime rise m-0 text-right uppercase">{row[1]}</h2>
          </div>
        ))}
      </div>
    </section>
  );
}
