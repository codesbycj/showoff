import { Swoosh } from '@/after/Swoosh';
import { SCHEMES } from '@/content/site';

/**
 * The three schemes, as three tall cards.
 *
 * The decision that shapes this section is putting the **price on the card**.
 * Most B2B pages of this kind hide pricing behind a form, which is defensible
 * commercially and expensive editorially: it turns every other section into
 * marketing for a number you will not show. With the price on the card, the
 * rest of the page can be about how the thing works.
 *
 * Each card is a photograph, a price, a paragraph and four facts, in that
 * order — and the order is the argument. The photograph says what it is
 * faster than the name does, and the four facts are the objections a
 * facilities manager raises in the first two minutes, answered before they are
 * asked.
 *
 * `Pool` is given the accent treatment rather than the middle card, because
 * the middle card being highlighted is a pricing-table convention and this is
 * not a pricing table: Pool is simply the one most buildings should start with.
 */
export function Schemes() {
  return (
    <section id="schemes" className="py-20 lg:py-28">
      <div className="cc">
        <div className="wipe flex max-w-[640px] flex-col gap-5">
          <span className="t-label text-slate">{SCHEMES.label}</span>
          <h2 className="t-h2">{SCHEMES.title}</h2>
        </div>

        <ul className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {SCHEMES.items.map((item) => {
            const lead = item.id === 'pool';
            return (
              <li
                key={item.id}
                id={item.id}
                className={`wipe flex flex-col overflow-hidden rounded-[3px] ${
                  lead ? 'bg-ink text-bone' : 'bg-mist/60 text-ink'
                }`}
              >
                <img
                  src={item.image}
                  alt={item.alt}
                  width={900}
                  height={1100}
                  loading="lazy"
                  className="block aspect-[9/7] w-full object-cover"
                />

                <div className="flex flex-1 flex-col gap-6 p-7">
                  <div className="flex flex-col gap-1.5">
                    <span className={`t-label ${lead ? 'text-hivis' : 'text-slate'}`}>
                      {item.kicker}
                    </span>
                    <h3 className="t-h3">{item.name}</h3>
                  </div>

                  <p className={`t-body ${lead ? 'text-bone/70' : 'text-slate'}`}>{item.body}</p>

                  <ul className="flex flex-col gap-2.5">
                    {item.points.map((point) => (
                      <li key={point} className="t-small flex items-start gap-2.5">
                        <span
                          aria-hidden="true"
                          className={`mt-[6px] block size-1.5 shrink-0 rotate-45 ${
                            lead ? 'bg-hivis' : 'bg-ink/40'
                          }`}
                        />
                        <span className={lead ? 'text-bone/75' : 'text-slate'}>{point}</span>
                      </li>
                    ))}
                  </ul>

                  <div
                    className={`mt-auto flex items-end justify-between gap-4 border-t pt-6 ${
                      lead ? 'border-bone/15' : 'border-ink/10'
                    }`}
                  >
                    <span className="flex flex-col gap-1">
                      <span className="font-display text-[30px] font-bold leading-none tracking-[-0.03em]">
                        {item.price}
                      </span>
                      <span className={`t-small ${lead ? 'text-bone/55' : 'text-slate'}`}>
                        {item.per}
                      </span>
                    </span>
                    <Swoosh
                      href="#pricing"
                      variant={lead ? 'ghost' : 'solid'}
                      className="text-[13px]"
                    >
                      Details
                    </Swoosh>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
