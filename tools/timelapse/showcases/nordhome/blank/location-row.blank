import { Pressable, View } from 'react-native';

import { hero } from '../data/home';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

type Props = { margin: number };

/**
 * The country the search is pinned to, and the account control.
 *
 * Both controls are 44dp of real box (I2/R7) — the board draws the account
 * circle at 32dp, which is a tap target nobody can hit reliably.
 */
export function LocationRow({ margin }: Props) {
  return (
    <View
      style={{
        marginHorizontal: margin,
        height: 44,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      {/* STEP 1.05 country
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Searching in ${hero.country}`}
        style={{ flexDirection: 'row', alignItems: 'center', gap: 7, height: 44 }}
      >
        <Glyph name="pin" size={15} color={ct.white} />
        <T variant="pillTitle">{hero.country}</T>
      </Pressable>
      */}

      {/* STEP 1.06 "Account"
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Account"
        style={{ width: 44, height: 44, alignItems: 'flex-end', justifyContent: 'center' }}
      >
        <Glyph name="account" size={28} color={ct.white} strokeWidth={1.5} />
      </Pressable>
      */}
    </View>
  );
}
