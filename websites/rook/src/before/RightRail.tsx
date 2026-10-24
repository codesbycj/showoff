import { useEffect, useState } from 'react';

import { AWARD_LIST, GALLERY, JOURNAL, PRODUCTS, VOICES } from '@/content/site';
import { useReducedMotion } from '@/motion/useReducedMotion';

/**
 * The right rail: a countdown, a bestseller list, recently viewed, the
 * testimonials, awards as text badges, a hit counter and a browser note.
 *
 * The countdown is the module worth looking at hardest. It is a real timer
 * counting down to midnight, and at midnight it will reset and the same offer
 * will run again -- which is how almost every one of these works. The design
 * is not lying to you by accident; urgency is the feature.
 *
 * The testimonials are the same four people the modern page gives a section
 * to, here reduced to one rotating quote in a 210px box, where nobody will
 * read any of them.
 */
export function RightRail() {
  const [clock, setClock] = useState('00:00:00');
  const [quote, setQuote] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const midnight = new Date(now);
      midnight.setHours(24, 0, 0, 0);
      const left = Math.max(0, midnight.getTime() - now.getTime());
      const h = String(Math.floor(left / 3.6e6)).padStart(2, '0');
      const m = String(Math.floor((left % 3.6e6) / 6e4)).padStart(2, '0');
      const s = String(Math.floor((left % 6e4) / 1000)).padStart(2, '0');
      setClock(`${h}:${m}:${s}`);
    };
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => setQuote((q) => (q + 1) % VOICES.items.length), 6000);
    return () => window.clearInterval(id);
  }, [reduced]);

  const voice = VOICES.items[quote];

  return (
    <div className="b-right">
      <div className="b-box">
        <div className="b-box-h alt">DEAL OF THE DAY</div>
        <div className="b-box-b b-deal">
          <img
            src={PRODUCTS[0].image}
            alt={PRODUCTS[0].alt}
            style={{ width: '120px', height: '90px', objectFit: 'cover' }}
          />
          <div style={{ fontSize: '10px', padding: '3px 0' }}>
            <strong>{PRODUCTS[0].name}</strong> in clay
          </div>
          <div className="b-price">£240.00</div>
          <div className="b-was">RRP £289.00</div>
          <div style={{ fontSize: '10px', padding: '3px 0' }}>Offer ends in:</div>
          <div className="b-countdown">{clock}</div>
          <a href="#basket" className="b-btn buy" style={{ marginTop: '5px' }}>
            BUY NOW
          </a>
        </div>
      </div>

      <div className="b-box">
        <div className="b-box-h">BESTSELLERS</div>
        <div className="b-box-b">
          <ul className="b-mini">
            {PRODUCTS.concat(PRODUCTS).map((p, i) => (
              <li key={i} className="b-cf">
                <img src={p.image} alt="" />
                <a href="#product">{p.name}</a>
                <div className="b-price" style={{ fontSize: '11px' }}>
                  {p.price.replace('From ', '')}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="b-box">
        <div className="b-box-h">WHAT PEOPLE SAY</div>
        <div className="b-box-b" style={{ minHeight: '96px' }}>
          <div style={{ fontSize: '10px', fontStyle: 'italic', color: '#444' }}>
            &ldquo;{voice.quote}&rdquo;
          </div>
          <div style={{ fontSize: '10px', paddingTop: '4px', color: '#003366' }}>
            <strong>{voice.name}</strong>, {voice.role}
          </div>
          <div className="b-stars" style={{ paddingTop: '2px' }}>
            ★★★★★
          </div>
          <div style={{ fontSize: '9px', paddingTop: '3px' }}>
            <a href="#reviews">Read all 64 reviews</a>
          </div>
        </div>
      </div>

      <div className="b-box">
        <div className="b-box-h">RECENTLY VIEWED</div>
        <div className="b-box-b">
          <ul className="b-mini">
            {GALLERY.items.slice(0, 3).map((g) => (
              <li key={g.caption} className="b-cf">
                <img src={g.image} alt="" />
                <a href="#product">{g.caption}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="b-box">
        <div className="b-box-h">AWARD WINNING</div>
        <div className="b-box-b" style={{ textAlign: 'center' }}>
          {AWARD_LIST.map((a: (typeof AWARD_LIST)[number]) => (
            <span className="b-badge" key={a.name}>
              {a.year} {a.name}
            </span>
          ))}
        </div>
      </div>

      <div className="b-box">
        <div className="b-box-h">FROM THE BLOG</div>
        <div className="b-box-b">
          <ul className="b-mini">
            {JOURNAL.items.map((post) => (
              <li key={post.title}>
                <a href="#post">{post.title}</a>
                <div style={{ color: '#888', fontSize: '9px' }}>
                  {post.date} &mdash; {post.read}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="b-box">
        <div className="b-box-h">SITE INFO</div>
        <div className="b-box-b" style={{ textAlign: 'center' }}>
          <span className="b-counter">0,214,877</span>
          <div style={{ fontSize: '9px', color: '#888', padding: '3px 0' }}>
            visitors since 2011
          </div>
          <span className="b-badge">SSL SECURED</span>
          <span className="b-badge">PCI DSS</span>
          <div style={{ fontSize: '9px', color: '#888' }}>Best viewed at 1024&times;768</div>
        </div>
      </div>
    </div>
  );
}
