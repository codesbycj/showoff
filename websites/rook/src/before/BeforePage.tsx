import { Catalogue } from '@/before/Catalogue';
import { Chrome } from '@/before/Chrome';
import { Footer } from '@/before/Footer';
import { LeftRail } from '@/before/LeftRail';
import { RightRail } from '@/before/RightRail';
import '@/before/before.css';

/**
 * The before: the same studio, as a catalogue.
 *
 * **This episode's angle is the congested directory.** Not a dated design --
 * nothing here would have looked out of place last year, and several shops
 * selling furniture today look exactly like this. It is what happens when a
 * small manufacturer starts selling online and the page grows a module a month
 * for a decade: five bars of chrome, three columns, thirty-one category links
 * for a range of two, faceted filters that mostly return nothing, a countdown
 * that resets at midnight, and nine hundred words of keywords at 10px.
 *
 * It is crowded, not broken. Every module works, every link goes somewhere,
 * the prices are right and the page would pass a client review — which is the
 * point. A caricature proves nothing; a page that is genuinely like this, and
 * genuinely hard to use, proves the whole argument of the episode.
 *
 * **It carries every piece of content the modern design has**, which is the
 * rule that makes the comparison worth anything: both chairs, both prices, all
 * six colourways, the guarantee, the take-back scheme, the four making claims,
 * the full FAQ, the awards, the journal, the testimonials and the address. None
 * of it is missing. It is 10px, justified, and below the fold.
 *
 * One width, 1000px, no media queries at all: on a 390px phone this is 2.6
 * screens wide and you pan sideways to read a price.
 */
export function BeforePage() {
  return (
    <div className="b">
      <Chrome />

      <div className="b-body b-cf">
        <LeftRail />
        <Catalogue />
        <RightRail />
      </div>

      <Footer />
    </div>
  );
}
