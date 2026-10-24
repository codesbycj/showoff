import { useState } from 'react';

import tplBlog1 from '@/assets/img/tpl-blog1.webp';
import tplBlog2 from '@/assets/img/tpl-blog2.webp';
import tplBlog3 from '@/assets/img/tpl-blog3.webp';
import tplParallax from '@/assets/img/tpl-parallax.webp';
import tplTeam from '@/assets/img/tpl-team.webp';
import {
  AUDIENCE,
  ESTIMATOR,
  FAQ,
  JOURNAL,
  PROBLEM,
  PROCESS,
  SCHEMES,
  VOICES,
} from '@/content/site';

const BLOG_IMAGES = [tplBlog1, tplBlog2, tplBlog3];

/**
 * The middle of the page: eleven theme blocks in a row.
 *
 * Features in circles, a fixed-attachment parallax quote, a numbered process,
 * animated counters, a three-column pricing table with a "most popular"
 * ribbon, a testimonial slider with dots, a team grid, a blog teaser and a
 * newsletter bar. Every one of them is a good component. Together they are
 * nine different ideas of what a section looks like.
 *
 * The giveaway is the rhythm: 80px, then 110, then 60, then 90, then 45. No
 * two consecutive blocks share a padding, because each one brought its own and
 * nobody has ever opened the stylesheet to reconcile them.
 *
 * **It carries the whole content deck** — the three schemes and their real
 * prices, the four process steps, the problem statistics, all three
 * testimonials, the journal and the FAQ. Nothing is missing. It is spread over
 * eleven blocks in three typefaces, which is a different way of saying nothing.
 */
export function Body() {
  const [slide, setSlide] = useState(0);
  const voice = VOICES.items[slide];

  return (
    <>
      {/* 1. Features, in circles, because the theme had circles. */}
      <section className="b-sec" id="schemes">
        <div className="b-wrap">
          <h2 className="b-center">Our Comprehensive Solutions</h2>
          <p className="b-lead">
            We offer a full suite of sustainable mobility services designed to meet the evolving
            needs of today&rsquo;s forward-thinking organisations.
          </p>
          <div className="b-row">
            {SCHEMES.items.map((item) => (
              <div className="b-col3" key={item.id}>
                <div className="b-icon">
                  {item.id === 'lease' ? '✓' : item.id === 'pool' ? '★' : '◆'}
                </div>
                <h3>{item.name}</h3>
                <p style={{ fontSize: '14px' }}>{item.body}</p>
                <a href={`#${item.id}`} className="b-btn b-btn--text">
                  Learn more →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. A parallax quote in the brand green over an unrelated skyline. */}
      <section className="b-parallax" style={{ backgroundImage: `url(${tplParallax})` }}>
        <div className="b-wrap b-parallax-in">
          <p>&ldquo;{PROBLEM.title}&rdquo;</p>
          <p
            style={{
              fontSize: '14px',
              fontStyle: 'normal',
              fontFamily: 'inherit',
              marginTop: '18px',
            }}
          >
            — Our mission, since day one
          </p>
        </div>
      </section>

      {/* 3. Process, numbered, with the counters bolted to the bottom. */}
      <section className="b-sec--loose">
        <div className="b-wrap">
          <h2 className="b-center">How It Works</h2>
          <p className="b-lead">{PROCESS.title}</p>
          <div className="b-row">
            {PROCESS.steps.map((step) => (
              <div className="b-col4" key={step.n}>
                <div className="b-icon" style={{ fontFamily: 'Georgia, serif', fontSize: '26px' }}>
                  {step.n}
                </div>
                <h4>{step.title}</h4>
                <p style={{ fontSize: '13px' }}>{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Counters, in the third typeface and the third accent colour. */}
      <section className="b-sec--alt">
        <div className="b-wrap b-row b-center">
          {PROBLEM.stats.map((stat) => (
            <div className="b-col3" key={stat.label}>
              <div className="b-counter">
                {stat.figure}
                {stat.unit}
              </div>
              <div className="b-counter-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. The pricing table, with a ribbon on the middle one. */}
      <section className="b-sec" id="pricing">
        <div className="b-wrap">
          <h2 className="b-center">Flexible Pricing Plans</h2>
          <p className="b-lead">{ESTIMATOR.body}</p>
          <div className="b-row">
            {SCHEMES.items.map((item, i) => (
              <div className="b-col3" key={item.id}>
                <div
                  className={['b-card', 'b-price-box', i === 1 ? 'b-price-box--pop' : '']
                    .join(' ')
                    .trim()}
                >
                  {i === 1 ? <div className="b-ribbon">Most popular</div> : null}
                  <div className="b-card-b" style={{ paddingBottom: 0 }}>
                    <h3>{item.name}</h3>
                    <div className="b-price">{item.price.replace('From ', '')}</div>
                    <div className="b-price-per">{item.per}</div>
                  </div>
                  <ul className="b-price-list" style={{ margin: '18px 0' }}>
                    {item.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                  <a
                    href="#contact"
                    className={i === 1 ? 'b-btn b-btn--green' : 'b-btn b-btn--blue'}
                  >
                    {i === 1 ? 'Get started' : 'Choose plan'}
                  </a>
                </div>
              </div>
            ))}
          </div>
          <p className="b-center" style={{ fontSize: '12px', color: '#95a5a6', marginTop: '10px' }}>
            {ESTIMATOR.note}
          </p>
        </div>
      </section>

      {/* 6. A testimonial slider, centred, with dots nobody can hit. */}
      <section className="b-sec--dark">
        <div className="b-wrap b-quote">
          <div className="b-quote-mark">&ldquo;</div>
          <p>{voice.quote}</p>
          <img src={voice.photo} alt={voice.name} className="b-avatar" />
          <div style={{ color: '#ffffff', fontWeight: 'bold' }}>{voice.name}</div>
          <div style={{ fontSize: '13px' }}>{voice.role}</div>
          <div className="b-dots">
            {VOICES.items.map((v, i) => (
              <button
                key={v.name}
                type="button"
                aria-label={`Testimonial ${i + 1}`}
                className={i === slide ? 'on' : undefined}
                onClick={() => setSlide(i)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 7. Two columns of benefits, as an image and a tick list. */}
      <section className="b-sec--tight" id="employers">
        <div className="b-wrap b-row">
          <div style={{ float: 'left', width: '50%', padding: '0 15px' }}>
            <img src={tplTeam} alt="A team meeting" style={{ borderRadius: '4px' }} />
          </div>
          <div style={{ float: 'left', width: '50%', padding: '0 15px' }}>
            <h2>Why Choose Us?</h2>
            {AUDIENCE.tabs[0].points.map((point) => (
              <p key={point.title} style={{ fontSize: '14px' }}>
                <strong style={{ color: '#27ae60' }}>✓ {point.title}.</strong> {point.body}
              </p>
            ))}
            <a href="#contact" className="b-btn b-btn--orange">
              Download our brochure
            </a>
          </div>
        </div>
      </section>

      {/* 8. The blog teaser, with stock images that are not of the posts. */}
      <section className="b-sec--alt" id="blog">
        <div className="b-wrap">
          <h2 className="b-center">Latest From Our Blog</h2>
          <div className="b-row" style={{ marginTop: '36px' }}>
            {JOURNAL.items.map((post, i) => (
              <div className="b-col3" key={post.title} style={{ textAlign: 'left' }}>
                <div className="b-card">
                  <img src={BLOG_IMAGES[i]} alt="" />
                  <div className="b-card-b">
                    <div style={{ fontSize: '12px', color: '#95a5a6' }}>
                      {post.date} &nbsp;·&nbsp; {post.read}
                    </div>
                    <h3 style={{ fontSize: '17px', margin: '8px 0' }}>{post.title}</h3>
                    <p style={{ fontSize: '13px' }}>{post.excerpt}</p>
                    <a href="#blog" className="b-btn b-btn--text">
                      Read more →
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. The FAQ, as an accordion that is open by default. */}
      <section className="b-sec" id="faq">
        <div className="b-wrap">
          <h2 className="b-center">Frequently Asked Questions</h2>
          <div style={{ maxWidth: '820px', margin: '36px auto 0' }}>
            {FAQ.items.map((item) => (
              <div className="b-card" key={item.q} style={{ marginBottom: '12px' }}>
                <div
                  className="b-card-b"
                  style={{ borderBottom: '1px solid #f0f3f5', background: '#fbfcfd' }}
                >
                  <strong style={{ color: '#2c3e50' }}>{item.q}</strong>
                </div>
                <div className="b-card-b" style={{ fontSize: '14px' }}>
                  {item.a}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. The newsletter bar, in the fourth accent colour. */}
      <section className="b-newsletter">
        <div className="b-wrap">
          <h3>Subscribe To Our Newsletter</h3>
          <p style={{ color: '#ffe8d5' }}>
            Monthly insights on sustainable mobility, straight to your inbox.
          </p>
          <form onSubmit={(e) => e.preventDefault()} style={{ margin: 0 }}>
            <input type="text" aria-label="Email address" placeholder="Enter your email address" />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </section>
    </>
  );
}
