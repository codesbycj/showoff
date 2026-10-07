import { Pressable, Text, View } from 'react-native';

import { type CardFace } from '../data/cards';
import { FONT, LEVEL, R, TYPE, ps } from '../theme';
import { Symbol } from './symbol';

/**
 * A debit card face.
 *
 * The debossed `Pesse` watermark runs off the card's bottom-right corner, so
 * the card clips — and therefore carries no elevation itself; the shadow sits on
 * a wrapper. A clip and an elevation on one View is the pairing Android renders
 * unreliably, and this component is the one most likely to show it, because the
 * watermark is 78dp of type hanging over the edge.
 *
 * The watermark is set as type rather than traced, because it is the wordmark
 * at 78dp in the same family the rest of the card uses — there is nothing to
 * trace that the font does not already draw.
 */
export function PaymentCard({
  card,
  onPress,
  compact = false,
  selected = false,
}: {
  card: CardFace;
  onPress?: () => void;
  /** The analytics screen draws the same face shorter, with no expiry line. */
  compact?: boolean;
  /** Ringed when chosen on the selector. The frost card needs it most — on a
   *  white page it is otherwise the one face with no edge of its own. */
  selected?: boolean;
}) {
  return (
    <Pressable onPress={onPress} accessibilityRole="button">
      <View style={[{ borderRadius: 28 }, LEVEL.card]}>
        <View
          style={{
            borderRadius: 28,
            backgroundColor: card.fill,
            padding: 24,
            overflow: 'hidden',
            borderWidth: selected ? 2 : 0,
            borderColor: selected ? ps.olive : 'transparent',
          }}
        >
          <Text
            style={{
              position: 'absolute',
              right: -16,
              bottom: -30,
              fontFamily: FONT.extrabold,
              fontSize: 78,
              lineHeight: 92,
              letterSpacing: -3,
              color: card.watermark,
            }}
          >
            Pesse
          </Text>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
            }}
          >
            <View>
              <Text style={[TYPE.labelMd, { color: card.inkSoft }]}>{card.holder}</Text>
              <Text style={[TYPE.headlineLgMobile, { color: card.ink, marginTop: 4 }]}>
                {card.balance}
              </Text>
            </View>
            <Visa tone={card.ink} />
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              marginTop: compact ? 24 : 48,
            }}
          >
            <View
              style={{
                flexShrink: 1,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 8,
                marginRight: 8,
              }}
            >
              {/* One string, not two expressions with literal spaces between
                  them \u2014 JSX collapses whitespace between expressions, and the
                  gap between the dots and the digits is the whole look. The
                  masked group and the expiry have to clear the status pill at
                  390dp, which is why the dots are spaced with a thin space
                  rather than a full one. */}
              <Text
                style={[TYPE.headlineSm, { color: card.ink, letterSpacing: 1.2, flexShrink: 0 }]}
                numberOfLines={1}
              >
                {`\u2022\u2009\u2022\u2009\u2022\u2009\u2022\u2002${card.last4}`}
              </Text>
              {compact ? null : (
                <>
                  <View
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: card.inkSoft,
                      opacity: 0.4,
                    }}
                  />
                  <Text
                    style={[TYPE.bodySm, { color: card.inkSoft, flexShrink: 0 }]}
                    numberOfLines={1}
                  >
                    {card.exp}
                  </Text>
                </>
              )}
            </View>

            <View
              style={{
                // At 390dp the masked digits, the expiry and this pill do not
                // all fit on one line. The reference resolves it by letting the
                // pill's label wrap to two lines rather than truncating the
                // card number or the expiry, so that is what shrinks here.
                flexShrink: 1,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 6,
                paddingHorizontal: 12,
                paddingVertical: 6,
                borderRadius: R.full,
                backgroundColor: card.pillFill,
              }}
            >
              {card.checked ? <Symbol name="checkCircle" size={15} color={ps.lime} /> : null}
              <Text style={[TYPE.labelSm, { color: card.pillInk }]}>{card.status}</Text>
            </View>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

/**
 * The VISA emblem. The reference sets it as heavy italic type rather than
 * placing the real logotype, so it is set as type here too.
 */
function Visa({ tone }: { tone: string }) {
  return (
    <Text
      style={{
        fontFamily: FONT.extrabold,
        fontStyle: 'italic',
        fontSize: 22,
        lineHeight: 26,
        letterSpacing: -1,
        color: tone,
      }}
    >
      VISA
    </Text>
  );
}
