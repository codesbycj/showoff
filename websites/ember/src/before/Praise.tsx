import { VOICES } from '@/content/site';

/**
 * Three testimonials in bordered boxes, Georgia italic, with a 54px photograph
 * and a big grey quote mark set behind the first line.
 *
 * The era's conventions are all here: the serif italic that marks text as a
 * quotation, the initial-and-surname attribution, the town after it, and the
 * "verified customer" that nothing verifies. They are stacked rather than put
 * on a rail -- the modern page runs the same people past you at 800ms a slide
 * and shows one at a time, where this shows three and lets you read them.
 *
 * Only three of the ten, because that is what fits a 620px column, and the
 * "read all" link goes to a page that was never built.
 */
export function Praise() {
  return (
    <div id="praise">
      <h2>What Our Customers Say</h2>

      {VOICES.items.slice(0, 3).map((voice) => (
        <div key={voice.name} className="b-quote b-cf">
          <img
            src={voice.photo}
            alt={voice.name}
            width={54}
            height={54}
            className="b-thumb"
            style={{ float: 'right', margin: '0 0 6px 10px' }}
          />
          <p>{voice.quote}</p>
          <cite>
            &mdash; {voice.name} {voice.handle.replace('@', '').slice(0, 1).toUpperCase()}.,{' '}
            {voice.note} (verified customer)
          </cite>
        </div>
      ))}

      <p className="b-more">
        <a href="#testimonials">
          Click here to read all {VOICES.items.length} testimonials &raquo;
        </a>
      </p>
    </div>
  );
}
