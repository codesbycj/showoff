import bannerStrip from '@/assets/img/banner-strip.webp';
import { BRAND, NAV } from '@/content/site';

/**
 * The strip above the page, and the navigation that floats over the hero.
 *
 * The strip is not a gradient. It is flat wine (#431616) with a photograph of
 * coloured light laid over it at `mix-blend-mode: lighten` — which is why the
 * colour runs warm in the middle and dark at both ends in a way no two-stop
 * gradient does. Lighten keeps the dark base wherever the photograph is darker
 * than it, so the bar can carry an image without ever looking like one.
 *
 * Closing it is not decorative either: the hero is `100svh` *minus the strip*,
 * so dismissing it has to give the hero its height back. That is why
 * `onDismiss` lives here rather than the strip hiding itself.
 *
 * The nav sits *inside* the hero card, over the photograph, in the page's cream
 * rather than in white. It is not fixed and it does not follow the scroll: it
 * leaves with the hero, which is what lets the hero card be a card.
 *
 * It is also one of the few blocks the reference genuinely redesigns at each
 * breakpoint rather than reflowing: 72px tall at 1440, 68 and tighter padding
 * at 992, and below 768 a 20px-cornered column with 24px of padding and
 * 25vw kept clear on the right so the strip's light still reads behind the
 * copy. That is why this is four sets of classes and not a wrap.
 *
 * Measured off the reference's own DOM at 1440:
 *   strip      0,0,1440,72     padding 0 30, bg rgb(67,22,22)
 *   nav        30,102,1380,102 absolute, padding 30, justify-between
 *   nav link   16px/20.8px, padding 0 20, radius 100px, gap 4
 *   right      EN 13.5px . gap 24 . Cart 13.5px . gap 11.2 . 37px disc
 */
export function Banner({ onDismiss }: { onDismiss: () => void }) {
  return (
    <div className="bg-wine relative flex w-full flex-col items-start justify-between gap-5 overflow-clip rounded-[20px] p-6 pr-[25vw] md:h-[68px] md:flex-row md:items-center md:gap-6 md:rounded-none md:p-0 md:px-5 lg:h-[72px] lg:px-[30px]">
      <img
        src={bannerStrip}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover mix-blend-lighten"
      />
      <p className="text-paper relative text-[15.2px] font-medium leading-[16.72px]">
        {BRAND.banner}
      </p>
      <div className="relative flex items-center gap-[7px]">
        <a
          href="#panels"
          className="bg-ink text-paper flex h-12 items-center rounded-full px-8 text-[15.2px] font-medium leading-[16.72px] transition-opacity duration-[400ms] hover:opacity-85"
        >
          {BRAND.bannerCta}
        </a>
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss announcement"
          className="text-paper/90 flex size-10 items-center justify-center transition-opacity duration-300 hover:opacity-70"
        >
          <svg viewBox="0 0 16 16" className="size-4" fill="none" aria-hidden="true">
            <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export function Nav() {
  return (
    <nav className="text-paper absolute inset-x-0 top-0 z-20 flex items-center justify-between p-[30px]">
      <a href="#top" className="flex items-center gap-2.5" aria-label={BRAND.name}>
        <Mark />
        <span className="text-[19px] font-medium leading-5 tracking-[-0.01em]">{BRAND.name}</span>
      </a>

      <ul className="hidden items-center gap-1 lg:flex">
        {NAV.map((item, i) => (
          <li key={item.label}>
            <NavLink href={item.href} hover={NAV_HOVER[i]}>
              {item.label}
            </NavLink>
          </li>
        ))}
        <li>
          <NavLink href="#panels" hover={NAV_HOVER[4]}>
            Shop
          </NavLink>
        </li>
      </ul>

      <div className="flex items-center gap-6">
        <button
          type="button"
          className="flex items-center gap-1 text-[13.5px] leading-[17.55px]"
          aria-label="Language: English"
        >
          EN
          <svg viewBox="0 0 12 8" className="w-2.5" fill="none" aria-hidden="true">
            <path d="M1 1l5 5 5-5" stroke="currentColor" strokeWidth="1.4" />
          </svg>
        </button>

        <a href="#cart" className="flex items-center gap-[11px]">
          <span className="hidden text-[13.5px] leading-[17.55px] sm:inline">Cart</span>
          <span className="border-paper/60 relative flex size-[37px] items-center justify-center rounded-full border">
            <svg viewBox="0 0 24 24" className="size-[15px]" fill="none" aria-hidden="true">
              <path
                d="M6 8h12l-1 12H7L6 8zM9 8V6a3 3 0 0 1 6 0v2"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinejoin="round"
              />
            </svg>
            <span className="bg-paper text-ink absolute -right-1 -top-1 flex size-[19px] items-center justify-center rounded-full text-[12px] font-semibold leading-[12px]">
              0
            </span>
          </span>
        </a>
      </div>
    </nav>
  );
}

/**
 * The nav's hover is a *border*, not a fill -- and a different colour per item.
 *
 * `.nav-link{border:1px solid transparent; transition:border-color .4s}` with
 * `.is-1:hover{border-color:#ff8c69cc}` through `.is-4`, and the sand 30% for
 * anything else. Four warm colours across five items, so hovering the nav runs
 * a small spectrum left to right. The border exists at rest in transparent, so
 * nothing shifts by a pixel when it appears.
 */
const NAV_HOVER = [
  'rgba(255, 140, 105, 0.8)',
  'rgba(255, 162, 204, 0.8)',
  'rgba(255, 131, 131, 0.8)',
  'rgba(255, 216, 171, 0.8)',
  'rgba(242, 236, 226, 0.3)',
] as const;

function NavLink({
  href,
  hover,
  children,
}: {
  href: string;
  hover: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = hover)}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'transparent')}
      onFocus={(e) => (e.currentTarget.style.borderColor = hover)}
      onBlur={(e) => (e.currentTarget.style.borderColor = 'transparent')}
      className="flex h-[42px] items-center rounded-full border border-transparent px-5 text-[16px] leading-[20.8px] transition-[border-color] duration-[400ms]"
    >
      {children}
    </a>
  );
}

/** Four discs, the way a cluster of LEDs reads at logo size. */
function Mark() {
  return (
    <svg viewBox="0 0 22 16" className="w-[22px]" fill="currentColor" aria-hidden="true">
      <circle cx="4" cy="5" r="3.1" />
      <circle cx="11.6" cy="4" r="2.3" />
      <circle cx="4.6" cy="12.4" r="2.3" />
      <circle cx="11" cy="11" r="1.6" />
    </svg>
  );
}
