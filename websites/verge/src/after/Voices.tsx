import { VOICES } from '@/content/site';

/**
 * Three people who had to make the scheme work, with their job titles doing
 * the heavy lifting.
 *
 * "Head of People", "Facilities", "Finance Director" are not decoration —
 * they are the three people who have to agree before anything is signed, and
 * naming all three is the quiet argument of the section: whoever is reading
 * this, somebody with your job has already said yes.
 *
 * Quotation marks are set as real typographic quotes and the attribution sits
 * under a hairline, so a card reads as a statement with a source rather than
 * as a testimonial in a box. No star ratings: nobody rates a payroll scheme.
 */
export function Voices() {
  return (
    <section id="riders" className="bg-ink text-bone py-20 lg:py-28">
      <div className="cc">
        <div className="wipe flex max-w-[640px] flex-col gap-5">
          <span className="t-label text-hivis">{VOICES.label}</span>
          <h2 className="t-h2">{VOICES.title}</h2>
        </div>

        <ul className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3 lg:mt-16 lg:gap-10">
          {VOICES.items.map((voice) => (
            <li key={voice.name} className="wipe flex flex-col gap-7">
              <p className="t-lead text-bone max-w-[34ch]">
                <span aria-hidden="true" className="text-hivis">
                  &ldquo;
                </span>
                {voice.quote}
                <span aria-hidden="true" className="text-hivis">
                  &rdquo;
                </span>
              </p>

              <div className="border-bone/15 mt-auto flex items-center gap-3 border-t pt-5">
                <img
                  src={voice.photo}
                  alt=""
                  width={240}
                  height={240}
                  loading="lazy"
                  className="size-11 rounded-full object-cover"
                />
                <span className="flex flex-col gap-0.5">
                  <span className="t-small font-semibold">{voice.name}</span>
                  <span className="t-small text-bone/55">{voice.role}</span>
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
