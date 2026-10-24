import { BENEFITS, CARDS, EXPLORE, STATEMENT } from '@/content/site';

/**
 * The welcome column: a breadcrumb, an exclamation, a justified wall of text
 * with a photograph floated into it, and three service columns under a rule.
 *
 * The era's homepage copy always opened by greeting you and describing the
 * website rather than the product -- "welcome to our new site", then the
 * hours, then the proposition somewhere in the third paragraph. The modern page
 * leads with the proposition in 72px and says nothing else above the fold. Same
 * business, same claim, buried at a different depth: that contrast is the whole
 * episode, so the words here are the content deck's, in the order a 2012
 * homepage would have put them.
 *
 * The photograph is 170x128 in a bevelled frame, cropped from a portrait that
 * the modern page runs 459px tall. Floated left, with justified 12px Arial
 * wrapping round it at about 95 characters a line.
 */
export function Welcome() {
  return (
    <>
      <h1>Welcome to Ember Health!</h1>

      <p className="b-lede">
        <img
          src={CARDS.items[2].image}
          alt={CARDS.items[2].alt}
          width={170}
          height={128}
          className="b-thumb b-thumb-l"
        />
        Thank you for visiting our brand new website! Ember Health is a family run supplier of red
        light therapy equipment based just outside Manchester, and we have been helping customers
        across the UK feel better every day since 2009. Our showroom is open Monday to Friday from
        9am until 5.30pm (and on Saturdays by appointment), where one of our friendly advisors will
        be more than happy to demonstrate the full range and answer any questions you may have.
      </p>

      <p className="b-lede">
        <strong>{STATEMENT.lead}</strong> {STATEMENT.rest} That is why we believe red light therapy
        should be part of everybody&rsquo;s routine, and not just something available to
        professional athletes and private clinics.
      </p>

      <p className="b-lede">
        {EXPLORE.title} Please <a href="#contact">click here to contact us</a> for a free
        no-obligation chat about which panel would be most suitable for your needs, or telephone us
        today on <strong>0161 496 0112</strong>.
      </p>

      <hr />

      <h2>What Can Red Light Therapy Do For You?</h2>

      <div className="b-cf" style={{ marginBottom: '13px' }}>
        {BENEFITS.items.slice(0, 3).map((item, i) => (
          <div key={item.id} className={i === 2 ? 'b-col3 b-col3-last' : 'b-col3'}>
            <div className="b-disc">
              <Glyph which={item.id} />
            </div>
            <h3>{item.title}</h3>
            <p style={{ textAlign: 'left' }}>{item.body}</p>
            <p className="b-more" style={{ marginBottom: 0 }}>
              <a href={`#${item.id}`}>Read more &raquo;</a>
            </p>
          </div>
        ))}
      </div>
    </>
  );
}

/**
 * The clip-art, drawn rather than sourced.
 *
 * A 2012 site of this kind bought a CD of gold-bevelled icons, or took three
 * off a free-icons site that watermarked two of them. These are the same three
 * subjects -- a moon, a heart, a sun -- at the one size the disc uses, which
 * keeps them inside drawing range and off a stock licence.
 */
function Glyph({ which }: { which: string }) {
  const paths: Record<string, string> = {
    sleep: 'M20 4a12 12 0 1 0 12 18A14 14 0 0 1 20 4z',
    female: 'M18 32C8 25 4 20 4 14.5A8.5 8.5 0 0 1 18 8a8.5 8.5 0 0 1 14 6.5C32 20 28 25 18 32z',
    skin: 'M18 7v-5m0 32v-5m11-11h5m-32 0h5m14.8-7.8 3.5-3.5M10.7 25.3l3.5-3.5m0-7.6-3.5-3.5m14.6 14.6 3.5 3.5',
  };

  return (
    <svg viewBox="0 0 36 36" width={34} height={34} aria-hidden="true">
      {which === 'skin' ? (
        <>
          <circle cx="18" cy="18" r="6.5" fill="none" stroke="#5e0f0f" strokeWidth="2.4" />
          <path
            d={paths.skin}
            fill="none"
            stroke="#5e0f0f"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
        </>
      ) : (
        <path d={paths[which]} fill="#5e0f0f" />
      )}
    </svg>
  );
}
