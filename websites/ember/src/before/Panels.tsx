import { PANELS, PRODUCT } from '@/content/site';

/**
 * The price list, as a table with a border.
 *
 * `border-collapse` on, 1px #ddd7c8 cell borders, a bevelled header row,
 * alternating row fills and a hover highlight -- a `<table>` doing exactly the
 * job tables are for, which makes it the one block on this page that has aged
 * perfectly well. The modern page replaced it with a single photograph and no
 * price, and anybody who arrives wanting to know what a panel costs is worse
 * off than they were in 2012.
 *
 * The render is 210px wide in a bevelled frame, floated right out of the same
 * cutout the modern page runs at 1056.
 */
export function Panels() {
  return (
    <div id="panels">
      <h2>Our Range &amp; Prices</h2>

      <img
        src={PRODUCT.render}
        alt={PRODUCT.alt}
        width={210}
        height={158}
        className="b-thumb"
        style={{ float: 'right', margin: '0 0 9px 12px' }}
      />

      <p style={{ textAlign: 'justify' }}>
        {PRODUCT.titleLead}
        {PRODUCT.titleRest} All prices include VAT at 20% and free delivery to UK mainland
        addresses. Please telephone for a quotation for the Scottish Highlands, Northern Ireland and
        the Channel Islands.
      </p>

      <table className="b-table" cellPadding={0} cellSpacing={0}>
        <thead>
          <tr>
            <th>Product</th>
            <th>Code</th>
            <th>Output</th>
            <th>RRP</th>
            <th>Our Price</th>
            <th>Availability</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {PANELS.map((panel) => (
            <tr key={panel.code}>
              <td>
                <a href={`#${panel.code}`}>{panel.name}</a>
              </td>
              <td>{panel.code}</td>
              <td>{panel.output}</td>
              <td className="b-was">{panel.rrp}</td>
              <td className="b-price">{panel.price}</td>
              <td style={{ color: panel.stock === 'In stock' ? '#2d7a2d' : '#cc7a00' }}>
                {panel.stock}
              </td>
              <td>
                <a href="#basket" className="b-btn b-btn-sm">
                  Add&nbsp;to&nbsp;Basket
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <p style={{ fontSize: '11px', color: '#8a8270' }}>
        Prices correct as of 1st March 2012 and are subject to change without notice. Ember Health
        reserves the right to withdraw any offer at any time. E&amp;OE.
      </p>
    </div>
  );
}
