import { Eyebrow } from '@/components/ui/Eyebrow';
import { Reveal } from '@/components/ui/Reveal';
import { RevealImage } from '@/components/ui/RevealImage';
import { FOCUS } from '@/data/home';

/** The closing block: the five markets listed once more, over a photograph. */
export function FocusCta() {
  return (
    <section className="bg-backdrop relative isolate overflow-hidden" aria-labelledby="focus-title">
      <RevealImage
        src={FOCUS.image}
        alt={FOCUS.alt}
        variant="image-soft"
        className="absolute inset-0 -z-10"
        imgClassName="h-full w-full object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-black/55" />

      <div className="text-paper mx-auto grid max-w-[1600px] gap-10 px-5 py-24 md:grid-cols-2 md:px-10 md:py-36">
        <div>
          <Reveal>
            <Eyebrow className="opacity-70">{FOCUS.eyebrow}</Eyebrow>
          </Reveal>
          <ul
            id="focus-title"
            className="mt-6 space-y-1 text-[clamp(1.5rem,3.2vw,2.75rem)] leading-[1.15] font-light tracking-[-0.03em]"
          >
            {FOCUS.items.map((item, i) => (
              <Reveal as="li" key={item} variant="text-wipe" delay={i * 0.07}>
                {item}
              </Reveal>
            ))}
          </ul>
        </div>

        <Reveal delay={0.15} className="flex items-start justify-end">
          <button type="button" className="group text-right">
            <span className="block text-sm opacity-70">{FOCUS.cta}</span>
            <span className="link-underline mt-1 inline-block text-[clamp(1.75rem,3.6vw,3rem)] leading-none font-light tracking-[-0.03em]">
              {FOCUS.ctaEmphasis}
            </span>
          </button>
        </Reveal>
      </div>
    </section>
  );
}
