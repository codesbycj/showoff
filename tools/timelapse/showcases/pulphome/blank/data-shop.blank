import type { ImageSourcePropType } from 'react-native';

import type { GlyphName } from '../components/glyph';

/**
 * Everything pulphome says, so the components stay presentational.
 *
 * **Every array is annotated** (I7): a reveal fills them one entry at a time,
 * and a type inferred from whichever rows happen to be uncommented loses every
 * property that only appears on a later row.
 */
export const header = {
  hello: 'Hello, Natalie!',
  display: 'Ready for\nsomething fresh?',
  sub: 'Choose what you want to boost your day.',
};

export type Kind = { id: string; label: string; icon: GlyphName; on?: boolean };

export const kinds: Kind[] = [
  { id: 'greens', label: 'Greens & Fruits', icon: 'leaf', on: true },
  // STEP 1.11 "Vegan"
  // { id: 'vegan', label: 'Vegan', icon: 'sprout' },
  // STEP 1.12 "Smoothies"
  // { id: 'smoothies', label: 'Smoothies', icon: 'bottle' },
];

export type Bottle = {
  id: string;
  name: string;
  size: string;
  price: number;
  image: ImageSourcePropType;
  saved?: boolean;
};

/** Named for what the photograph actually shows, never for the board's copy. */
export const bottles: Bottle[] = [
  {
    id: 'green',
    name: 'Green Energy Smoothie',
    size: '500 ml',
    price: 6.5,
    image: require('../../../../assets/images/pulphome/b1.jpg'),
    saved: true,
  },
  // STEP 1.16 "Dragon Fruit & Berry"
  // {
  //   id: 'dragon',
  //   name: 'Dragon Fruit & Berry',
  //   size: '500 ml',
  //   price: 7.2,
  //   image: require('../../../../assets/images/pulphome/b2.jpg'),
  // },
  // STEP 1.17 "Sunrise Fruit Flight"
  // {
  //   id: 'sunrise',
  //   name: 'Sunrise Fruit Flight',
  //   size: '4 x 250 ml',
  //   price: 12.9,
  //   image: require('../../../../assets/images/pulphome/b3.jpg'),
  // },
];

export const avatar = require('../../../../assets/images/pulphome/me.jpg');

export type Tab = { id: string; icon: GlyphName; label: string; on?: boolean };

export const tabs: Tab[] = [
  { id: 'home', icon: 'home', label: 'Home', on: true },
  // STEP 1.21 "Cart"
  // { id: 'cart', icon: 'cart', label: 'Cart' },
  // STEP 1.22 "Orders"
  // { id: 'orders', icon: 'receipt', label: 'Orders' },
  // STEP 1.23 "Settings"
  // { id: 'settings', icon: 'gear', label: 'Settings' },
];

export const money = (n: number) => `$${n.toFixed(2)}`;
