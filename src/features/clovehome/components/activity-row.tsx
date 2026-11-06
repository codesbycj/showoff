import { Image } from 'expo-image';
import { Pressable, View } from 'react-native';

import { AVATAR } from '../layout';
import { ct, type } from '../theme';
import type { Activity } from '../data/home';
import { Glyph } from './glyph';
import { T } from './text';

/**
 * One line of the ledger: who, when, how much, what kind.
 *
 * Three ways of standing for the other party, in the order the rules put
 * them: a photograph of a person where there is a person, a drawn mark where
 * the other party is a company, and initials on a disc only as the fallback
 * the reference itself uses for one row.
 */
export function ActivityRow({
  item,
  height,
  onPress,
}: {
  item: Activity;
  height: number;
  onPress?: () => void;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${item.name}, ${item.amount}`}
      onPress={onPress}
    >
      <View style={{ height, flexDirection: 'row', alignItems: 'center' }}>
        <View
          style={{
            width: AVATAR,
            height: AVATAR,
            borderRadius: AVATAR / 2,
            backgroundColor: item.mark ? '#FDEAF3' : ct.limeSoft,
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          {item.photo ? (
            <Image
              source={item.photo}
              style={{ width: AVATAR, height: AVATAR }}
              contentFit="cover"
            />
          ) : item.mark ? (
            <Glyph name="dribbble" size={25} tint="#E8459A" />
          ) : (
            <T variant="initials" color={ct.forest} style={{ height: type.initials.line }}>
              {item.initials}
            </T>
          )}
        </View>

        <View style={{ flex: 1, marginLeft: 14 }}>
          <T variant="rowTitle" color={ct.ink} style={{ height: type.rowTitle.line }}>
            {item.name}
          </T>
          <T variant="rowMeta" color={ct.muted} style={{ height: type.rowMeta.line, marginTop: 3 }}>
            {item.when}
          </T>
        </View>

        <View style={{ alignItems: 'flex-end' }}>
          <T
            variant="amount"
            color={item.credit ? ct.credit : ct.ink}
            style={{ height: type.amount.line }}
          >
            {item.amount}
          </T>
          <T variant="rowMeta" color={ct.muted} style={{ height: type.rowMeta.line, marginTop: 3 }}>
            {item.kind}
          </T>
        </View>
      </View>
    </Pressable>
  );
}
