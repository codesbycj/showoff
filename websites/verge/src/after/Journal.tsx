import { JOURNAL } from '@/content/site';
import { DUR, EASE } from '@/motion/motion';

/**
 * Three pieces of writing, with no stock photography attached.
 *
 * A journal card with an image on top is 200kB saying nothing; a date, a
 * title and the first real sentence say what it is. The read time is there
 * because it is the thing people decide on.
 *
 * The whole card is the link and it marks itself as one the same way every
 * other link on the page does — a rule that retracts to the right on hover.
 * Reusing the page's one link idiom at card scale is what keeps a section of
 * three boxes from needing a button in each.
 */
export function Journal() {
  return (
    <section id="journal" className="py-20 lg:py-28">
      <div className="cc">
        <div className="wipe flex max-w-[640px] flex-col gap-5">
          <span className="t-label text-slate">{JOURNAL.label}</span>
          <h2 className="t-h2">{JOURNAL.title}</h2>
        </div>

        <ul className="mt-12 grid grid-cols-1 gap-px lg:mt-16">
          {JOURNAL.items.map((post) => (
            <li key={post.title} className="wipe border-ink/12 border-t last:border-b">
              <a
                href="#journal"
                className="group grid grid-cols-1 gap-3 py-7 lg:grid-cols-[140px_minmax(0,1fr)_120px] lg:items-baseline lg:gap-10"
              >
                <span className="t-label text-slate">{post.date}</span>

                <span className="flex flex-col gap-2">
                  <span className="t-h3 u-link max-w-[40ch]">{post.title}</span>
                  <span className="t-body text-slate max-w-[62ch]">{post.excerpt}</span>
                </span>

                <span className="t-small text-slate lg:text-right">
                  {post.read}
                  <span
                    aria-hidden="true"
                    className="ml-3 inline-block"
                    style={{
                      transition: `translate ${DUR.part}s ${EASE.snap}`,
                      translate: '0 0',
                    }}
                  >
                    →
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
