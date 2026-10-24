import { FAQ, GALLERY, MAKING, PRODUCTS, STUDIO, SUSTAIN } from '@/content/site';

/** The two real products, plus the spares and bundles a shop page lists beside them. */
const LISTINGS = [
  {
    name: `${PRODUCTS[0].name} stacking chair — four colourways`,
    price: PRODUCTS[0].price.replace('From ', ''),
    was: '£289.00',
    image: PRODUCTS[0].image,
    alt: PRODUCTS[0].alt,
    flag: 'SALE',
    stars: '★★★★★',
    reviews: 41,
  },
  {
    name: `${PRODUCTS[1].name} lounge chair — wool or canvas`,
    price: PRODUCTS[1].price.replace('From ', ''),
    was: '£445.00',
    image: PRODUCTS[1].image,
    alt: PRODUCTS[1].alt,
    flag: 'ONLY 2 LEFT',
    stars: '★★★★☆',
    reviews: 17,
  },
  {
    name: 'Perch — set of 6 (cafe bundle, save £120)',
    price: '£1,320.00',
    was: '£1,440.00',
    image: GALLERY.items[1].image,
    alt: GALLERY.items[1].alt,
    flag: 'BULK',
    stars: '★★★★★',
    reviews: 9,
  },
  {
    name: 'Replacement feet & glides (set of 4)',
    price: '£8.50',
    was: '£11.00',
    image: GALLERY.items[4].image,
    alt: GALLERY.items[4].alt,
    flag: '',
    stars: '★★★★☆',
    reviews: 63,
  },
  {
    name: 'Seat pad — wool, fits Perch and Nest',
    price: '£34.00',
    was: '£39.00',
    image: GALLERY.items[2].image,
    alt: GALLERY.items[2].alt,
    flag: 'NEW',
    stars: '★★★☆☆',
    reviews: 4,
  },
  {
    name: 'Nest — ex-display, chalk, small mark',
    price: '£299.00',
    was: '£390.00',
    image: GALLERY.items[0].image,
    alt: GALLERY.items[0].alt,
    flag: 'CLEARANCE',
    stars: '★★★★☆',
    reviews: 2,
  },
];

/**
 * The middle column: breadcrumbs, an SEO headline, a sort bar, a six-up grid
 * of 178px products, pagination for a catalogue of two, a spec table and nine
 * hundred words of keyword text at 10px.
 *
 * The thing to notice is that **all of the content is here**. Both chairs,
 * both prices, the colourways, the guarantee, the take-back scheme, the specs
 * and every answer from the FAQ are on this page — the same deck the modern
 * design reads. None of it has been left out. It has been made 10px, justified,
 * and put below a product grid, which is a different way of losing it.
 *
 * The headline is the other tell: "Chairs & Seating | Buy Chairs Online UK |
 * Free Delivery" is written for a search engine from 2014 and reads as a
 * sentence to nobody.
 */
export function Catalogue() {
  return (
    <div className="b-mid">
      <div className="b-crumbs">
        <a href="#home">Home</a> &gt; <a href="#c">Chairs &amp; Seating</a> &gt;{' '}
        <a href="#c">Dining &amp; Lounge</a> &gt; <strong>All products (2)</strong>
      </div>

      <h1>Chairs &amp; Seating | Buy Chairs Online UK | Free Delivery Over £50</h1>
      <p style={{ fontSize: '10px', color: '#666' }}>
        Showing <strong>1&ndash;6</strong> of <strong>6</strong> results (2 products, 4 related
        items) &mdash; <a href="#list">list view</a> | <a href="#grid">grid view</a> |{' '}
        <a href="#compare">compare (0)</a>
      </p>

      <div className="b-sort b-cf">
        <div style={{ float: 'left' }}>
          <strong>Sort by:</strong>{' '}
          <select style={{ fontSize: '10px' }}>
            <option>Most popular</option>
            <option>Price: low to high</option>
            <option>Price: high to low</option>
            <option>Newest first</option>
            <option>Customer rating</option>
          </select>{' '}
          <strong>Show:</strong>{' '}
          <select style={{ fontSize: '10px' }}>
            <option>12 per page</option>
            <option>24 per page</option>
            <option>48 per page</option>
          </select>
        </div>
        <div style={{ float: 'right' }}>
          <a href="#filter">Filter results</a> | <a href="#clear">Clear filters</a>
        </div>
      </div>

      <ul className="b-grid b-cf">
        {LISTINGS.map((item, i) => (
          <li key={item.name} className={i % 3 === 2 ? 'last' : undefined}>
            {item.flag ? (
              <span className={['b-flag', item.flag === 'NEW' ? 'green' : ''].join(' ').trim()}>
                {item.flag}
              </span>
            ) : null}
            <a href="#product">
              <img src={item.image} alt={item.alt} className="b-thumb" loading="lazy" />
            </a>
            <h3>
              <a href="#product">{item.name}</a>
            </h3>
            <div className="b-stars">
              {item.stars} <span style={{ color: '#777' }}>({item.reviews})</span>
            </div>
            <div className="b-price">{item.price}</div>
            <div className="b-was">RRP {item.was}</div>
            <a href="#basket" className="b-btn buy">
              ADD TO BASKET
            </a>
          </li>
        ))}
      </ul>

      <div className="b-pager b-cf">
        <strong>1</strong>
        {['2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'].map((n) => (
          <a href="#page" key={n}>
            {n}
          </a>
        ))}
        <a href="#next">Next &gt;</a>
        <span style={{ color: '#777', paddingLeft: '6px' }}>Page 1 of 12</span>
      </div>

      <h2>Full specification</h2>
      <table className="b-table">
        <thead>
          <tr>
            <th>Model</th>
            <th>Weight</th>
            <th>Stacks</th>
            <th>Material</th>
            <th>Indoor / out</th>
            <th>Guarantee</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {PRODUCTS.map((p) => (
            <tr key={p.id}>
              <td>
                <a href="#product">{p.name}</a>
              </td>
              <td>{p.spec[2]}</td>
              <td>{p.spec[0]}</td>
              <td>{p.spec[1]}</td>
              <td>{p.spec[3]}</td>
              <td>10 years</td>
              <td className="b-was" style={{ textDecoration: 'none', color: '#cc0000' }}>
                <strong>{p.price}</strong>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Frequently asked questions</h2>
      <table className="b-table">
        <tbody>
          {FAQ.items.map((item) => (
            <tr key={item.q}>
              <td style={{ width: '32%', verticalAlign: 'top' }}>
                <strong>{item.q}</strong>
              </td>
              <td>{item.a}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="b-seo">
        <h2>Chairs &amp; seating from {STUDIO.title.toLowerCase()} in Hebden Bridge</h2>
        <p>
          {STUDIO.body[0]} {STUDIO.body[1]} {MAKING.body} We stock dining chairs, stacking chairs,
          cafe chairs, contract seating, lounge chairs, armchairs, reading chairs, outdoor chairs,
          garden chairs, kitchen chairs, breakfast bar seating and replacement chair parts, with
          free UK delivery on orders over £50 and a ten year frame guarantee on every chair we
          press.
        </p>
        <p>
          {SUSTAIN.body} Looking for cheap chairs online, discount dining chairs, chairs for cafes,
          bulk chair orders, trade chair prices, stacking chairs UK, yellow chairs, green chairs,
          blue chairs, black chairs, chalk chairs, chairs under £250 or chairs with free delivery?
          You have come to the right place. {MAKING.points.map((p) => p.body).join(' ')}
        </p>
        <p>
          Buy chairs online from the factory. Chairs Yorkshire, chairs Leeds, chairs Manchester,
          chairs Sheffield, chairs Hebden Bridge, chairs delivered UK wide. Call{' '}
          <strong>01422 843 115</strong> for trade prices.
        </p>
      </div>
    </div>
  );
}
