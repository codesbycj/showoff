import { PROCESS } from '@/content/site';

/**
 * How setup works, as four numbered steps on a single rule.
 *
 * The honest version of a "how it works" section: four steps, a week count in
 * the heading, and no icons. Icons here are always the same four shapes —
 * a phone, a document, a rocket, a chart — and they add nothing a number does
 * not. The step number *is* the graphic, set at display size.
 *
 * On desktop the four sit in a row under one hairline, which makes the whole
 * thing read as a timeline without drawing one; on a phone they stack and the
 * rule runs down the left instead.
 */
export function Process() {
  return (
    <section id="process" className="py-20 lg:py-28">
      <div className="cc">
        <div className="wipe flex max-w-[640px] flex-col gap-5">
          <span className="t-label text-slate">{PROCESS.label}</span>
          <h2 className="t-h2">{PROCESS.title}</h2>
        </div>

        <ol className="mt-12 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {PROCESS.steps.map((step) => (
            <li key={step.n} className="wipe border-ink/15 flex flex-col gap-4 border-t pt-6">
              <span className="font-display text-hivis text-[34px] font-bold leading-none tracking-[-0.03em]">
                {step.n}
              </span>
              <h3 className="t-h3 max-w-[16ch]">{step.title}</h3>
              <p className="t-small text-slate max-w-[34ch]">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
