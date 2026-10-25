import { Pressable, View } from 'react-native';

import { copy, week } from '../data/start';
import { BAR_MIN, BAR_WIDTH, CARD_PAD, PANEL_GAP, PANEL_HEIGHT } from '../layout';
import { br, radius, type } from '../theme';
import { T } from './text';

/**
 * The week, and the thing the app is selling.
 *
 * The bars are sized from `week` and the two best days run lime — computed
 * from the data rather than coloured by index, so the highlight follows the
 * numbers when they change. The reference's chart has no scale at all.
 *
 * The plot's height is a constant rather than a percentage: a percentage
 * height needs a definite parent, and a `flex: 1` box is not one on web.
 */
export function Panels({ onUpgrade }: { onUpgrade?: () => void }) {
  const max = Math.max(...week.map((d) => d.hours));
  const best = [...week]
    .sort((a, b) => b.hours - a.hours)
    .slice(0, 2)
    .map((d) => d.key);
  const plot = PANEL_HEIGHT - CARD_PAD * 2 - type.panelTitle.line * 2 - type.axis.line - 12;

  return (
    <View style={{ flexDirection: 'row', height: PANEL_HEIGHT }}>
      <View
        style={{
          flex: 1,
          borderRadius: radius.card,
          backgroundColor: br.surface,
          padding: CARD_PAD,
        }}
      >
        {copy.productivity.map((line) => (
          <T
            key={line}
            variant="panelTitle"
            color={br.ink}
            style={{ height: type.panelTitle.line }}
          >
            {line}
          </T>
        ))}

        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'flex-end',
            marginTop: 10,
          }}
        >
          {week.map((d) => {
            const h = Math.round(BAR_MIN + (plot - BAR_MIN) * (d.hours / max));
            const lime = best.includes(d.key);
            return (
              <View key={d.key} style={{ flex: 1, alignItems: 'center' }}>
                <View style={{ height: plot, justifyContent: 'flex-end' }}>
                  <View
                    style={{
                      width: BAR_WIDTH,
                      height: h,
                      borderRadius: BAR_WIDTH / 2,
                      backgroundColor: lime ? br.lime : br.blue,
                    }}
                  />
                </View>
                <T variant="axis" color={br.faint} style={{ marginTop: 6, height: type.axis.line }}>
                  {d.key.slice(0, 1)}
                </T>
              </View>
            );
          })}
        </View>
      </View>

      <Pressable
        onPress={onUpgrade}
        style={{ flex: 1, marginLeft: PANEL_GAP }}
        accessibilityRole="button"
        accessibilityLabel={copy.promo.lines.join(' ')}
      >
        <View
          style={{
            flex: 1,
            borderRadius: radius.card,
            backgroundColor: br.blue,
            padding: CARD_PAD,
            justifyContent: 'space-between',
          }}
        >
          <T variant="promoTitle" color={br.onBlue} style={{ height: type.promoTitle.line }}>
            {copy.promo.brand}
          </T>

          <View>
            {copy.promo.lines.map((line) => (
              <T
                key={line}
                variant="promoLine"
                color={br.onBlue}
                style={{ height: type.promoLine.line }}
              >
                {line}
              </T>
            ))}
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
            <T variant="price" color={br.onBlue} style={{ height: type.price.line }}>
              {copy.promo.price}
            </T>
            <T
              variant="priceOff"
              color={br.blueSoft}
              style={{ marginLeft: 6, marginBottom: 5, height: type.priceOff.line }}
            >
              {copy.promo.off}
            </T>
          </View>

          <T variant="promoFoot" color={br.blueSoft}>
            {copy.promo.foot}
          </T>
        </View>
      </Pressable>
    </View>
  );
}
