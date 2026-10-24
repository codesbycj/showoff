import ctaDots from '@/assets/img/cta-dots.webp';
import ctaBg from '@/assets/img/cta-bg.webp';
import { EXPLORE } from '@/content/site';

/**
 * The full-width red panel: 1280x600 at a 40px radius, flat #ee4949 under two
 * photographs and two gradients.
 *
 * The stack is the thing to copy exactly, bottom to top: the flat red, a
 * photograph of light, a layer of pink dots, then a gradient from the same red
 * down the top 180px and another up the bottom 120px. Those last two are what
 * let an image with its own edges sit inside a panel without ever showing one —
 * the picture simply becomes the panel again before it reaches the corner.
 */
export function Explore() {
  return (
    <section id="company" className="px-10">
      <div className="mx-auto w-full max-w-[1280px]">
        <div className="reveal relative flex items-center overflow-hidden rounded-[40px] bg-[#ee4949] px-8 lg:h-[600px] lg:pl-[60px] lg:pr-0">
          <img
            src={ctaBg}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <img
            src={ctaDots}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-[180px]"
            style={{ backgroundImage: 'linear-gradient(#ee4949, rgba(238,73,73,0))' }}
          />
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-[120px]"
            style={{ backgroundImage: 'linear-gradient(rgba(238,73,73,0), #ee4949)' }}
          />

          <div className="relative flex w-full max-w-[560px] flex-col gap-[120px] py-20 lg:py-0">
            <h2 className="text-[clamp(22px,2.5vw,36px)] font-medium leading-[110%] tracking-[-0.01em] text-white/50">
              <span className="text-white">{EXPLORE.title.split('. ')[0]}.</span>{' '}
              {EXPLORE.title.split('. ').slice(1).join('. ')}
            </h2>
            <a
              href="#technology"
              className="bg-paper text-ink inline-flex h-[60px] w-fit items-center gap-2.5 rounded-full px-10 text-[15.2px] font-medium leading-[16.72px] transition-opacity duration-[400ms] hover:opacity-85"
            >
              {EXPLORE.cta}
              <svg viewBox="0 0 24 12" className="w-4" fill="none" aria-hidden="true">
                <path
                  d="M0 6h21M16 1l5 5-5 5"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
