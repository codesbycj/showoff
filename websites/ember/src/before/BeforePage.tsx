import { FaqList } from '@/before/FaqList';
import { Footer } from '@/before/Footer';
import { Masthead } from '@/before/Masthead';
import { Offer } from '@/before/Offer';
import { Panels } from '@/before/Panels';
import { Praise } from '@/before/Praise';
import { Rotator } from '@/before/Rotator';
import { Sidebar } from '@/before/Sidebar';
import { Welcome } from '@/before/Welcome';
import '@/before/before.css';

/**
 * The before: the same business, as its website looked in 2012.
 *
 * It is bootstrapped rather than found -- there is no archived version of a
 * brand I invented -- and the angle this episode takes is **the 2012 brochure**:
 * a 960px fixed layout, floats, a Cycle banner, a bevelled nav, a price table,
 * a sidebar of boxes and a hit counter. Every convention in it was the
 * professional default for a small UK business site of the period, which is
 * what keeps it plausible; later episodes take other angles on being bad, and
 * some of them are much uglier than this.
 *
 * Plausible is the one bar that does not move. A joke in the copy or a layout
 * nobody ever shipped breaks the spell, and the viewer stops believing the
 * before -- and then stops crediting the after.
 *
 * The structure, top to bottom: four header bars, a 930px rotating banner, then
 * the 620/290 split -- welcome text, offer, price list, testimonials, FAQ down
 * the left; six boxes down the right -- and a three-column footer. Everything
 * sits inside one 960px column that does not move at any viewport width, which
 * is the single difference a phone notices first.
 *
 * What it has that the rebuild does not: a price, a phone number above the
 * fold, opening hours, a postal address, a named person to ask, and a date
 * saying when it was last touched. Worth saying out loud in the episode, because
 * the interesting half of a redesign is never the half that got better.
 */
export function BeforePage() {
  return (
    <div className="b">
      <Masthead />

      <div className="b-shell">
        <div className="b-crumbs">
          <a href="#home">Home</a> &raquo; Welcome
        </div>

        <div className="b-pad">
          <Rotator />

          <div className="b-cf">
            <div className="b-main">
              <Welcome />
              <Offer />
              <Panels />
              <Praise />
              <FaqList />
            </div>

            <div className="b-side">
              <Sidebar />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
