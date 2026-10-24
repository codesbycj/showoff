import { MARQUEE } from '@/content/site';

/**
 * The green band under the hero.
 *
 *   section  y900  h109, inner ground lime
 *   row      y932  h45, items Clash 32/44.8 500 uppercase black, 24px gap
 *   loop     the row is duplicated and translated; four copies, -25%
 *
 * 109px of band for 45px of type means 32px of air above and below, which is
 * what keeps a scrolling sale strip from feeling like a toolbar.
 */
export function Marquee() {
  return (
    <section className="w-full overflow-hidden" aria-label={MARQUEE.join(' ')}>
      {/* 109px of band for 45px of type: 32px of air above and below. */}
      <div className="bg-lime flex h-[109px] w-full items-center">
        <div
          className="flex w-max"
          data-marquee
          style={{ animation: 'mara-marquee 24s linear infinite' }}
        >
          {[0, 1, 2, 3].map((copy) => (
            <ul
              key={copy}
              className="m-0 flex list-none items-center gap-[24px] p-0 pr-[24px]"
              aria-hidden={copy > 0 || undefined}
            >
              {MARQUEE.map((w, i) => (
                <li key={`${w}-${i}`} className="t-32 whitespace-nowrap uppercase">
                  {w}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
