import pay0 from '@/assets/img/pay-0.svg';
import pay1 from '@/assets/img/pay-1.svg';
import pay2 from '@/assets/img/pay-2.svg';
import pay3 from '@/assets/img/pay-3.svg';
import { BRAND, FOOTER } from '@/content/site';

/**
 * The payment marks along the foot. The reference runs ten; these four are the
 * ones it ships as standalone SVGs, so they are the four that could be bundled
 * without redrawing somebody's logo by hand.
 */
const PAY = [pay0, pay1, pay2, pay3];

/**
 * A black panel inset 30px from the page edge, 40px corners, 80px of padding at
 * the sides and top and 62 at the foot, with a 30px band of cream under it.
 *
 * The column widths are the reference's and they are the thing worth copying
 * exactly: 454 / 286 / 286 with 194px of padding on the right, so the two link
 * columns sit left of centre rather than stretching to the edge.
 *
 * Everything else here was reconstructed by making the numbers agree rather
 * than by guessing at the markup. The first column is what sets the block's
 * height: logo 31, then 32 to the social tiles (50), then 46 to the three
 * reassurances (109), then 74 to the legal note (43) -- 385, plus 143 of
 * bottom padding, which is the 528 the reference reports. The legal note is
 * 740 wide, exactly column one plus column two, so it runs out under the
 * links rather than wrapping inside its own column; that overhang is
 * deliberate and it is why this is three flex columns and not a grid.
 *
 * Measured, 7346 to 8066 at 1440: panel 1380x690, inner block 1220x528, the
 * marks row 20px tall at the foot, 30px of cream under the panel.
 *
 * Two hovers, both read off the stylesheet rather than guessed. The social
 * tiles carry `transition: transform .15s cubic-bezier(.4,0,.2,1),
 * background-color .65s cubic-bezier(.625,.05,0,1)` -- two properties on two
 * curves an order of magnitude apart, so the tile snaps under the cursor while
 * its fill takes two thirds of a second to catch up. The links carry
 * `position: relative` and a class called `link-unline` that has no CSS behind
 * it at all, which is a Webflow interaction drawing an underline; it is rebuilt
 * here as a 1px wipe from the left.
 */
export function Footer() {
  return (
    <div className="px-[30px] pb-[30px]">
      <div className="reveal bg-ink text-paper rounded-[40px] px-8 pb-[62px] pt-20 lg:px-20">
        <div className="flex flex-col pb-[143px] lg:flex-row lg:items-start lg:pr-[194px]">
          {/* Column one, and the one that sets the height. */}
          <div className="flex flex-col lg:w-[454px]">
            <a href="#top" className="flex w-fit items-center gap-2.5" aria-label={BRAND.name}>
              <svg viewBox="0 0 22 16" className="w-[26px]" fill="currentColor" aria-hidden="true">
                <circle cx="4" cy="5" r="3.1" />
                <circle cx="11.6" cy="4" r="2.3" />
                <circle cx="4.6" cy="12.4" r="2.3" />
                <circle cx="11" cy="11" r="1.6" />
              </svg>
              <span className="text-[24px] font-medium leading-[31px] tracking-[-0.01em]">
                {BRAND.name}
              </span>
            </a>

            <ul className="mt-8 flex gap-1.5">
              {(['instagram', 'linkedin', 'facebook', 'youtube'] as const).map((net) => (
                <li key={net}>
                  <a
                    href="#social"
                    aria-label={net}
                    className="flex size-[50px] items-center justify-center rounded-[10px] bg-white/10 transition-[background-color,transform] hover:scale-[1.06] hover:bg-white/20"
                    style={{
                      transitionDuration: '650ms, 150ms',
                      transitionTimingFunction:
                        'cubic-bezier(0.625, 0.05, 0, 1), cubic-bezier(0.4, 0, 0.2, 1)',
                    }}
                  >
                    <Social net={net} />
                  </a>
                </li>
              ))}
            </ul>

            <ul className="mt-[46px] flex w-[260px] flex-col gap-4">
              {FOOTER.badges.map((badge) => (
                <li key={badge} className="flex items-center gap-2.5">
                  <Tick />
                  <span className="text-[12px] leading-[120%]">{badge}</span>
                </li>
              ))}
            </ul>

            <p className="text-paper/40 mt-[74px] max-w-full text-[12px] leading-[120%] lg:w-[740px] lg:max-w-none">
              {FOOTER.legal}
            </p>
          </div>

          {FOOTER.columns.map((col, i) => (
            <ul
              key={i}
              className="mt-10 flex flex-col items-start gap-4 lg:mt-0 lg:w-[286px] lg:shrink-0"
            >
              {col.links.map((link) => (
                <li key={link}>
                  <a
                    href="#footer"
                    className={`group/link relative inline-block text-[14px] leading-5 ${
                      i === 1 ? 'text-sand/50' : ''
                    }`}
                  >
                    {link}
                    <span
                      aria-hidden="true"
                      className="absolute -bottom-0.5 left-0 h-px w-0 bg-current transition-[width] duration-300 ease-out group-hover/link:w-full"
                    />
                  </a>
                </li>
              ))}
            </ul>
          ))}
        </div>

        <ul className="flex flex-wrap items-center gap-3">
          {PAY.map((mark, i) => (
            <li key={i} className="flex h-[25px] items-center">
              <img src={mark} alt="" aria-hidden="true" width={34} height={25} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/**
 * The tick beside a reassurance. 24px, which is what sets those rows' height in
 * the reference -- the text beside it is only 14.4px tall, so the icon is what
 * you are actually measuring when you measure that column.
 */
function Tick() {
  return (
    <svg viewBox="0 0 20 20" className="size-6 shrink-0" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="9" stroke="currentColor" strokeOpacity={0.25} />
      <path
        d="M6 10.3l2.6 2.6L14 7.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * The four social marks, drawn rather than pulled from an icon font.
 *
 * All four are inside drawing range at 20px -- they are glyphs, not pictures --
 * and drawing them keeps a second webfont out of the bundle for four shapes.
 */
function Social({ net }: { net: 'instagram' | 'linkedin' | 'facebook' | 'youtube' }) {
  const common = { className: 'size-5', viewBox: '0 0 20 20', 'aria-hidden': true } as const;

  if (net === 'instagram') {
    return (
      <svg {...common} fill="none">
        <rect x="3" y="3" width="14" height="14" rx="4.2" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="10" cy="10" r="3.2" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="14.1" cy="5.9" r="1" fill="currentColor" />
      </svg>
    );
  }

  if (net === 'linkedin') {
    return (
      <svg {...common} fill="currentColor">
        <rect x="3" y="7.6" width="2.6" height="9.4" rx="0.5" />
        <circle cx="4.3" cy="4.4" r="1.5" />
        <path d="M7.6 17V7.6h2.5v1.3a3.2 3.2 0 0 1 2.8-1.5c2 0 3.1 1.3 3.1 3.7V17h-2.6v-5.3c0-1.3-.5-2-1.5-2s-1.7.7-1.7 2V17H7.6z" />
      </svg>
    );
  }

  if (net === 'facebook') {
    return (
      <svg {...common} fill="currentColor">
        <path d="M11.4 17v-6h2l.3-2.4h-2.3V7.1c0-.7.2-1.1 1.2-1.1h1.2V3.8c-.2 0-.9-.1-1.8-.1-1.8 0-3 1.1-3 3.1v1.8H7v2.4h2V17h2.4z" />
      </svg>
    );
  }

  return (
    <svg {...common} fill="currentColor">
      <path d="M17.2 6.6a2 2 0 0 0-1.4-1.4C14.5 4.9 10 4.9 10 4.9s-4.5 0-5.8.3a2 2 0 0 0-1.4 1.4A21 21 0 0 0 2.5 10c0 1.2.1 2.3.3 3.4a2 2 0 0 0 1.4 1.4c1.3.3 5.8.3 5.8.3s4.5 0 5.8-.3a2 2 0 0 0 1.4-1.4c.2-1.1.3-2.2.3-3.4 0-1.2-.1-2.3-.3-3.4zM8.6 12.3V7.7L12.4 10l-3.8 2.3z" />
    </svg>
  );
}
