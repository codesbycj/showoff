import { Image } from 'expo-image';
import { Pressable, ScrollView, View } from 'react-native';

import { ADD_SIZE, CARD_H, CARD_W, MARGIN } from '../layout';
import { ct, radius, type } from '../theme';
import { cards, copy } from '../data/home';
import { Glyph } from './glyph';
import { T } from './text';

/**
 * The label, the way to add one, and the cards themselves.
 *
 * The cards sit in a horizontal `ScrollView` rather than a wrapping row,
 * because the reference clips the second card at the screen edge — and an
 * item clipped by the edge is always a scrolling rail. A wrap physically
 * cannot reproduce it.
 *
 * The rail is pinned to its own height. A `ScrollView` carries `flexGrow: 1`
 * and will otherwise eat every spare dp in the column it sits in.
 */
export function CardRail({ onAdd }: { onAdd?: () => void }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', height: CARD_H }}>
      <T variant="label" color={ct.ink} style={{ height: type.label.line, marginRight: 14 }}>
        {copy.cards}
      </T>

      <Pressable accessibilityRole="button" accessibilityLabel="Add a card" onPress={onAdd}>
        <View
          style={{
            width: ADD_SIZE,
            height: ADD_SIZE,
            borderRadius: ADD_SIZE / 2,
            backgroundColor: ct.limeSoft,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Glyph name="plus" size={20} tint={ct.forest} />
        </View>
      </Pressable>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ height: CARD_H, flexGrow: 0 }}
        contentContainerStyle={{ alignItems: 'center', paddingLeft: 12, paddingRight: MARGIN }}
      >
        {cards.map((c, i) => (
          <Pressable
            key={c.id}
            accessibilityRole="button"
            accessibilityLabel={`Card ending ${c.digits.slice(-4)}`}
          >
            <View
              style={{
                width: CARD_W,
                height: CARD_H,
                borderRadius: radius.card,
                overflow: 'hidden',
                marginLeft: i === 0 ? 0 : 10,
                justifyContent: 'flex-end',
              }}
            >
              <Image
                source={c.art}
                style={{ position: 'absolute', width: CARD_W, height: CARD_H }}
                contentFit="cover"
              />
              {/* No fixed height here: the bullet glyph sits low in its em
                  box and a line-height-tall box clips its underside against
                  the card's bottom edge. Padding instead. */}
              <T
                variant="cardDigits"
                color="#FFFFFF"
                style={{ paddingBottom: 9, paddingLeft: 10, zIndex: 1 }}
              >
                {c.digits}
              </T>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}
