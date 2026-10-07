/**
 * Screen 3 content — the shopping bag and checkout.
 *
 * The money is fixed copy, not arithmetic. The export recalculates a subtotal
 * as quantities change; nothing in the recording changes a quantity, and the
 * reference frame shows one set of figures. Deriving them would mean carrying a
 * tax rate and a rounding rule that only ever produce the strings already here.
 *
 * `ITEMS`, `PAYMENTS` and `SUMMARY` carry explicit element types rather than
 * leaning on `as const`: each is emptied one entry at a time for the timelapse,
 * and an array literal with nothing in it infers `never[]`, which typechecks
 * here and then fails at every call site.
 */
import { fa } from '../theme';

export const BAG = {
  title: 'Shopping Bag Checkout',
  heading: 'My Bag',
  count: '3 Items',
  shipping: 'Free standard shipping over $150',
  promoCode: 'FASHORA20',
  apply: 'Apply',
  appliedNote: 'applied (20% off)',
  addressLabel: 'Deliver to: Home',
  addressDefault: 'Default',
  address: '742 Evergreen Terrace, Brooklyn NY',
  change: 'Change',
  paymentLabel: 'Payment Option',
  summaryTitle: 'Order Summary',
  totalLabel: 'Total',
  totalNote: 'Including VAT & customs',
  total: '$266.98',
  checkout: 'Proceed to Checkout',
} as const;

export type BagItem = {
  key: string;
  name: string;
  color: string;
  dot: string;
  size: string;
  price: string;
  qty: number;
  image: number;
};

export const ITEMS: readonly BagItem[] = [
  // STEP 3.07 the jacket from the detail screen
  // {
  //   key: 'bomber',
  //   name: 'Bomber Jacket',
  //   color: 'Orange',
  //   dot: fa.primaryContainer,
  //   size: 'M',
  //   price: '$108.00',
  //   qty: 1,
  //   image: require('../../../../assets/images/fashora/cart-bomber.jpg'),
  // },
  // STEP 3.08 two of the hoodie
  // {
  //   key: 'hoodie',
  //   name: 'Urban Graphic Hoodie',
  //   color: 'Warm Orange',
  //   dot: fa.tertiaryContainer,
  //   size: 'L',
  //   price: '$78.00',
  //   qty: 2,
  //   image: require('../../../../assets/images/fashora/cart-hoodie.jpg'),
  // },
  // STEP 3.09 and the striped tee
  // {
  //   key: 'tee',
  //   name: 'Minimal Striped Tee',
  //   color: 'Grey',
  //   dot: fa.secondary,
  //   size: 'M',
  //   price: '$45.00',
  //   qty: 1,
  //   image: require('../../../../assets/images/fashora/cart-tee.jpg'),
  // },
];

export type Payment = {
  key: string;
  icon: 'mobile' | 'creditCard' | 'accountBalanceWallet';
  label: string;
};

/**
 * The phone glyph is `mobile`. The export asks for `smartphone`, which is a
 * Material *Icons* name that Symbols does not carry.
 */
export const PAYMENTS: readonly Payment[] = [
  // STEP 3.18 the one that is selected
  // { key: 'apple', icon: 'mobile', label: 'Apple Pay' },
  // STEP 3.19 the card on file
  // { key: 'visa', icon: 'creditCard', label: 'Visa •• 4242' },
  // STEP 3.20 and the wallet
  // { key: 'paypal', icon: 'accountBalanceWallet', label: 'PayPal' },
];

/** A summary line. `tone` picks the ink: accent lines are the discount and the
 *  free shipping, which the export sets in `primary` on both label and value. */
export type SummaryLine = {
  key: string;
  label: string;
  value: string;
  accent?: boolean;
  /** Set on "Shipping", whose "(Express)" runs in accent inside a muted label. */
  labelSuffix?: string;
};

export const SUMMARY: readonly SummaryLine[] = [
  // STEP 3.23 what the three items come to
  // { key: 'subtotal', label: 'Subtotal', value: '$309.00' },
  // STEP 3.24 what the code takes off
  // { key: 'discount', label: 'Promo Discount (20%)', value: '-$61.80', accent: true },
  // STEP 3.25 the shipping that costs nothing
  // { key: 'shipping', label: 'Shipping', labelSuffix: '(Express)', value: 'Free ($0.00)' },
  // STEP 3.26 and the tax
  // { key: 'tax', label: 'Estimated Tax', value: '$19.78' },
];
