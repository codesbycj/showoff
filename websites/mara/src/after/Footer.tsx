import { Wordmark } from '@/after/Wordmark';
import { BRAND, FOOTER } from '@/content/site';

/**
 * The footer, measured off the reference.
 *
 *   section    y8305  h860, black
 *   statement  32,8385  680x134  Clash 32/44.8 500, lime
 *   columns    x728 / x960 / x1192 — 216 wide, title 16/22.4 500 white,
 *              lines 16/22.4 400 white
 *   meta row   y8743  four items at x32 / x403 / x728 / x1073, lime, 16/22.4
 *   wordmark   64,8870  1312x271 — the same 195.6px as the hero, in white
 *
 * The wordmark appears **twice on the page** at the same enormous size: once at
 * the bottom of the first screen and once at the bottom of the last. Nothing
 * between them is bigger than 48px. That bracket is the whole typographic
 * structure of the page, and it is why the middle can be as quiet as it is.
 */
export function Footer() {
  return (
    <footer className="bg-black pt-[80px] text-white">
      <div className="gut grid gap-12 lg:grid-cols-[680px_1fr]">
        <h2 className="t-32 text-lime rise m-0 max-w-[680px] uppercase">{FOOTER.statement}</h2>

        <div className="grid gap-8 sm:grid-cols-3">
          {FOOTER.columns.map((col) => (
            <div key={col.title} className="rise">
              <p className="t-16 m-0">{col.title}</p>
              {col.lines.map((line) => (
                <p key={line} className="t-16n m-0 normal-case">
                  {line}
                </p>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="gut text-lime mt-[192px] flex flex-wrap gap-x-[24px] gap-y-2">
        {FOOTER.meta.map((m) => (
          <p key={m} className="t-16n m-0 min-w-[150px] flex-1 uppercase">
            {m}
          </p>
        ))}
      </div>

      <p className="t-16n gut mt-[18px] max-w-[900px] normal-case text-white/45">{FOOTER.legal}</p>

      <div className="px-[64px] pb-[40px] pt-[62px]">
        <Wordmark text={BRAND.name} className="text-white" />
      </div>
    </footer>
  );
}
