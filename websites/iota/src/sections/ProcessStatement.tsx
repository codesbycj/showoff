import { ArrowLink } from '@/components/ui/ArrowLink';
import { Reveal } from '@/components/ui/Reveal';
import { PROCESS } from '@/data/home';

/** The studio's statement, and the page's one stretch of plain white. */
export function ProcessStatement() {
  return (
    <section className="px-5 py-24 md:px-10 md:py-40" aria-labelledby="process-title">
      <div className="mx-auto grid max-w-[1600px] gap-12 md:grid-cols-12 md:gap-8">
        <h2
          id="process-title"
          className="text-[clamp(1.5rem,3.4vw,2.75rem)] leading-[1.12] font-light tracking-[-0.03em] md:col-span-6"
        >
          {PROCESS.title.map((line, i) => (
            <Reveal key={line} as="span" variant="text-wipe" delay={i * 0.12} className="block">
              {line}
            </Reveal>
          ))}
        </h2>

        <div className="md:col-span-2 md:col-start-8">
          <Reveal>
            <ul className="text-ink-faint space-y-0.5 text-sm">
              {PROCESS.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div className="md:col-span-3 md:col-start-10">
          <Reveal delay={0.1}>
            <p className="text-ink-soft max-w-[46ch] text-sm leading-relaxed">{PROCESS.body}</p>
            <ArrowLink className="mt-8">{PROCESS.cta}</ArrowLink>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
