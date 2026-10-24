import { Swoosh } from '@/after/Swoosh';
import { CTA } from '@/content/site';

/**
 * The last ask, in a wedge.
 *
 * Same shape language as the hero and for the same reason: the page opened on
 * an angled ink field and closes on one, so the whole thing reads as bracketed
 * rather than as a scroll that stops. The wedge runs the other way here —
 * rising left to right instead of falling — which is the only difference, and
 * it is enough to keep it from looking like the hero repeated.
 *
 * One primary action and one plain-text alternative. A section whose job is to
 * produce a booking should not offer four things.
 */
export function CtaBand() {
  return (
    <section id="contact" className="relative overflow-hidden">
      <img
        src={CTA.image}
        alt={CTA.alt}
        width={1200}
        height={800}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div
        className="bg-ink absolute inset-0"
        style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 72%)' }}
      />

      <div className="cc relative flex flex-col items-start gap-7 pb-20 pt-36 lg:pb-28 lg:pt-48">
        <h2 className="t-h2 text-bone wipe max-w-[18ch]">{CTA.title}</h2>
        <p className="t-lead text-bone/70 wipe max-w-[50ch]">{CTA.body}</p>
        <div className="wipe flex flex-wrap items-center gap-5">
          <Swoosh variant="ghost">{CTA.button}</Swoosh>
          <a href="#contact" className="u-link text-bone text-[15px] font-medium">
            {CTA.secondary}
          </a>
        </div>
      </div>
    </section>
  );
}
