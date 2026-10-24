import { FEATURED } from '@/content/site';

/**
 * Three product cards, measured off the reference.
 *
 *   section  y7043  h744, pale green
 *   heading  32,7163  Clash 32/44.8 500, bark
 *   cards    x32 / x496 / x960 — 448x360 images at y7240, 16px apart
 *   badge    41,20 inside the card — Clash 14/19.6 500, a discount, on two of three
 *   name     y7616  Clash 16/22.4 500
 *   price    y7644  Clash 16/22.4 500, indented 14px
 *
 * The price sits **under** the name and indented, not beside it — so the two
 * read as one block rather than as a row with a number pushed to the right.
 * It costs the scannability of a price column and buys a quieter card, which
 * for a shop selling three things at a time is the right trade.
 *
 * Two of three cards carry a badge. A grid where every card has one is a sale;
 * a grid where some do is a shop.
 */
export function Featured() {
  return (
    <section className="bg-pale gut py-[120px]" id="featured">
      <h2 className="t-32 text-bark rise m-0 uppercase">{FEATURED.heading}</h2>

      <ul className="m-0 mt-[77px] grid list-none gap-[16px] p-0 md:grid-cols-3">
        {FEATURED.items.map((item) => (
          <li key={item.name} className="rise">
            <a
              className="block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
              href="#featured"
            >
              <span className="frame relative block h-[360px] w-full">
                <img
                  className="size-full object-cover"
                  src={item.image}
                  alt={item.name}
                  width={900}
                  height={720}
                  loading="lazy"
                />
                {item.badge ? (
                  /* The reference writes the sign first: "%30", not "30%". */
                  <span className="t-14 absolute left-[41px] top-[20px] bg-white px-[8px] py-[2px]">
                    %{item.badge}
                  </span>
                ) : null}
              </span>
              <span className="t-16 mt-[16px] block">{item.name}</span>
              <span className="t-16 mt-[6px] block pl-[14px]">$ {item.price}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
