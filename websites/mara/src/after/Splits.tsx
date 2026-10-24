import { SPLITS } from '@/content/site';

/**
 * Three category splits, measured off the reference.
 *
 *   each      830 tall, exactly half image and half panel at 720 each
 *   image     864x996 — **wider and taller than its half**, positioned at
 *             x-72 or x648 and y-83 relative to the section, so it bleeds past
 *             the panel on both sides and is cropped by the section
 *   title     y+207 inside the panel, Clash 32/44.8 500
 *   note      y+256, Inter Light italic 16/22.4
 *   thumb     200x120, centred in the panel at y+462
 *   explore   y+600, Clash 14/16.8 500 uppercase, with a plus
 *
 * The oversized bleeding image is the whole trick. A 720x830 photograph cropped
 * to its box would sit in the layout; a 864x996 one hanging past it on three
 * sides reads as a window cut into the page. It is also why the three sections
 * can alternate sides without the rhythm going flat — the overhang changes
 * which edge the eye is pulled towards.
 */
export function Splits() {
  return (
    <section>
      {SPLITS.map((split) => (
        <div
          key={split.id}
          className="relative grid h-[830px] w-full overflow-hidden lg:grid-cols-2"
        >
          <div
            className={[
              'relative h-full overflow-hidden',
              split.side === 'left' ? 'lg:order-1' : 'lg:order-2',
            ].join(' ')}
          >
            <img
              className="absolute left-1/2 top-1/2 h-[996px] w-[864px] max-w-none -translate-x-1/2 -translate-y-1/2 object-cover"
              src={split.image}
              alt={split.alt}
              width={1760}
              height={2028}
              loading="lazy"
            />
          </div>

          <div
            className={[
              'flex h-full flex-col items-center px-8 pt-[207px] text-center',
              split.side === 'left' ? 'lg:order-2' : 'lg:order-1',
            ].join(' ')}
            style={{ background: split.tint }}
          >
            <h2 className="t-32 rise m-0 uppercase">{split.title}</h2>
            <p className="t-it-16 rise m-0 mt-[4px]">{split.note}</p>

            <a
              className="rise group mt-[206px] inline-block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
              href="#featured"
            >
              <span className="frame block h-[120px] w-[200px]">
                <img
                  className="size-full object-cover"
                  src={split.thumb}
                  alt=""
                  width={420}
                  height={252}
                  loading="lazy"
                />
              </span>
              <span className="t-14 mt-[18px] inline-flex items-center gap-[10px]">
                Explore
                <span aria-hidden="true">+</span>
              </span>
            </a>
          </div>
        </div>
      ))}
    </section>
  );
}
