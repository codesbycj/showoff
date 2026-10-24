import { STATEMENT } from '@/content/site';

/**
 * The statement, measured off the reference.
 *
 *   section   y1009  h865
 *   heading   y1129  1376x67   Clash 48/67.2 500, centred
 *   lead      y1200  1376x45   **Inter Light italic** 32/44.8, centred
 *   row       y1277  1376x400, gap 24, the pair centred
 *   frames    320x487 — 87px taller than the row that holds them
 *   captions  y1445 / y1489 — inside the frame, and clipped away with it
 *   tail      y1709  1376x45, a 400x1 rule between the two phrases
 *
 * The frames are **taller than their row**, and the captions sit under them at
 * y1445 and y1489 — which is 232px past the row's bottom edge. So the
 * reference ships "Velvet Citrus / fresh, radiant, uplifting" in its markup
 * and then clips it off. That is almost certainly a slot height somebody
 * tightened and never re-checked, and it is reproduced here rather than
 * tidied: a rebuild that quietly fixes the reference's bugs is not a rebuild.
 * The names survive in each image's `alt`, where a screen reader still gets
 * them.
 *
 * The sentence runs **through** the pictures — "offering formulas people love
 * to keep," above, "best skin for ——— and live in." below — and setting both
 * halves in Inter Light italic against the Clash heading is what makes it one
 * interrupted sentence rather than two captions.
 */
export function Statement() {
  return (
    <section className="relative h-[865px] w-full">
      <div className="absolute inset-x-[32px] top-[120px]">
        <h2 className="t-48 rise m-0 text-center uppercase">{STATEMENT.heading}</h2>
        <p className="t-it-32 rise m-0 mt-[4px] text-center">{STATEMENT.lead}</p>
      </div>

      <div className="absolute inset-x-[32px] top-[268px] h-[400px] overflow-hidden">
        <ul className="m-0 flex list-none justify-center gap-[24px] p-0">
          {STATEMENT.items.map((item) => (
            <li key={item.name} className="rise w-[320px] shrink-0">
              <div className="frame h-[487px] w-full">
                <img
                  className="size-full object-cover"
                  src={item.image}
                  alt={`${item.name} — ${item.note}`}
                  width={760}
                  height={1150}
                  loading="lazy"
                />
              </div>
              <h3 className="t-24 m-0 mt-[12px] text-center">{item.name}</h3>
              <p className="t-14n m-0 mt-[11px] text-center normal-case">{item.note}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="absolute inset-x-[32px] top-[700px] flex items-center gap-[16px]">
        <p className="t-it-32 rise m-0 shrink-0">{STATEMENT.tailLeft}</p>
        <span className="h-px flex-1 bg-black" aria-hidden="true" />
        <p className="t-it-32 rise m-0 shrink-0">{STATEMENT.tailRight}</p>
      </div>
    </section>
  );
}
