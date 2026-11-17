import { Image, Pressable, View } from 'react-native';

import { money, pieces } from '../data/shop';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

type Props = { margin: number; width: number; height: number; radius: number; onOpen: () => void };

/**
 * The two pieces on offer.
 *
 * **Each card is a cut-out photograph on a tinted ground** (I4), as the board
 * poses them. The tint lives on an absolutely-filled child so an emptied card
 * paints nothing during a reveal (§5.5).
 *
 * The `+` is a **sibling** of the card's `Pressable`, not a child: a
 * `role="button"` inside another is torn apart by the static web build's HTML
 * parser (§7).
 */
export function PieceGrid({ margin, width, height, radius, onOpen }: Props) {
  const tints = { card: ct.card, sand: ct.sand } as const;
  const imageH = Math.max(80, height - 56);

  return (
    <View style={{ marginHorizontal: margin, flexDirection: 'row', gap: 12 }}>
      {pieces.map((piece) => (
        <View key={piece.id} style={{ width }}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`${piece.name}, ${money(piece.price)}`}
            onPress={onOpen}
          >
            <View style={{ width, height: imageH, borderRadius: radius, overflow: 'hidden' }}>
              <View
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: tints[piece.tint],
                }}
              />

              <Image source={piece.image} style={{ width, height: imageH }} resizeMode="contain" />

              {piece.frames ? (
                <View
                  style={{
                    position: 'absolute',
                    left: 12,
                    bottom: 10,
                    flexDirection: 'row',
                    gap: 5,
                  }}
                >
                  {Array.from({ length: Math.max(piece.frames, 1) }, (_, i) => (
                    <View
                      key={i}
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: 3,
                        backgroundColor: i === 0 ? ct.ink : ct.line,
                      }}
                    />
                  ))}
                </View>
              ) : null}
            </View>
          </Pressable>

          <View
            style={{
              height: 56,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingTop: 8,
            }}
          >
            <View>
              <T variant="cardName" numberOfLines={1}>
                {piece.name}
              </T>
              <T variant="price">{money(piece.price)}</T>
            </View>

            <Pressable
              accessibilityRole="button"
              accessibilityLabel={`Add ${piece.name}`}
              hitSlop={{ top: 13, bottom: 13, left: 13, right: 13 }}
            >
              <View
                style={{ width: 44, height: 44, alignItems: 'center', justifyContent: 'center' }}
              >
                <Glyph name="plus" size={18} color={ct.ink} strokeWidth={2} />
              </View>
            </Pressable>
          </View>
        </View>
      ))}
    </View>
  );
}
