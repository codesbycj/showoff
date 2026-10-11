import { img } from '@/assets/images';
import { BandWord } from '@/components/ui/BandWord';
import { MEDIA } from '@/data/home';

/** Press cuttings, over an outlined word that is clipped by the band itself. */
export function Media() {
  return (
    <section id="media" className="bg-ink text-paper relative overflow-hidden py-28">
      <BandWord>{MEDIA.title}</BandWord>

      <div className="px-gutter relative z-10">
        <h2 data-reveal="words" className="text-h3 mb-14">
          {MEDIA.title}
        </h2>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {MEDIA.items.map((item, i) => (
            <article key={item.title} data-reveal="fade" data-reveal-delay={i * 0.08}>
              <div className="mb-5 aspect-16/10 overflow-hidden">
                <img
                  src={img(item.image)}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover grayscale transition-[filter,scale] duration-700 hover:scale-105 hover:grayscale-0"
                />
              </div>
              <p className="text-body-sm text-signal mb-2 tracking-[0.16em] uppercase">
                {item.source}
              </p>
              <h3 className="text-h4 mb-3">{item.title}</h3>
              <p className="text-body-sm opacity-70">{item.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
