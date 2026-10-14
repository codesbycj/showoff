import { Text, View } from 'react-native';

import { INGREDIENTS } from '../data/product';
import { bt, radius, type as t } from '../theme';
import { SectionHeading } from './section-heading';

/**
 * The four signature ingredients, as dotted pills that wrap.
 *
 * Each dot is a different token — `primary`, `secondary`, `primary-fixed`,
 * `tertiary-container` — which is the only place on the screen all four accents
 * appear together, so they are carried in the data rather than cycled from a
 * list.
 *
 * The pills are sized by their text and wrap at the column's edge, which makes
 * this the one block on the screen whose *shape* depends on the viewport.
 */
export function IngredientChips() {
  return (
    <View style={{ gap: 10 }}>
{/* STEP 1.36 call the list
      <SectionHeading>{INGREDIENTS.heading}</SectionHeading>
*/}
{/* STEP 1.37 and fill it, one pill at a time
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: 8,
          // MISTAKE 1.38 the pills bunched into the middle
          justifyContent: 'center',
        }}
      >
        {INGREDIENTS.items.map((item) => (
          <View
            key={item.label}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 6,
              paddingHorizontal: 12,
              paddingVertical: 6,
              borderRadius: radius.full,
              backgroundColor: bt.containerHigh,
            }}
          >
            <View
              style={{ width: 8, height: 8, borderRadius: radius.full, backgroundColor: item.dot }}
            />
            <Text
              style={{
                fontFamily: t.labelMd.family,
                fontSize: t.labelMd.size,
                lineHeight: t.labelMd.line,
                color: bt.ink,
              }}
            >
              {item.label}
            </Text>
          </View>
        ))}
      </View>
*/}
    </View>
  );
}
