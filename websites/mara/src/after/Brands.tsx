import { BRANDS } from '@/content/site';

/**
 * The stockist list, measured off the reference.
 *
 *   section  y7787  h518, sage
 *   heading  32,7867  Clash 32/44.8 500, bark
 *   names    Clash **48/67.2 500**, flowing inline across three lines
 *   meta     Clash 14/19.6 400, bark — a category and a product count, set in
 *            a tiny two-line stack hard against the name it belongs to
 *
 * The names **wrap as a paragraph**, not as a grid: x32 / x292 / x803 on the
 * first line, x32 / x390 / x751 on the second, x32 on the third. So the list
 * sets like running text at 48px, and the 14px meta tucked beside each name is
 * what stops it reading as one long sentence.
 *
 * The reference's seven are real cosmetics houses. An invented shop cannot
 * print those — a brand name on a stockist list is a factual claim about that
 * company — so these are invented at the same name lengths and the README
 * lists it as a declared departure.
 */
export function Brands() {
  return (
    <section className="bg-sage gut py-[80px]">
      <h2 className="t-32 text-bark rise m-0 uppercase">{BRANDS.heading}</h2>

      {/* A dotted rule above the list, the same hairline as the hero's. */}
      <div className="mt-[34px] border-t border-dotted border-black/35" />

      <ul className="m-0 mt-[21px] flex list-none flex-wrap items-start gap-x-[24px] gap-y-[8px] p-0">
        {BRANDS.items.map((item) => (
          <li key={item.name} className="rise flex items-start gap-[12px]">
            <span className="t-48 uppercase">{item.name}</span>
            <span className="text-bark mt-[14px] block">
              <span className="t-14n block">{item.kind}</span>
              <span className="t-14n block">
                {item.count ? `${item.count} ` : ''}
                Products
              </span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
