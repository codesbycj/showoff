import { Pressable, View } from 'react-native';

import { sheet, type } from '../theme';
import { categories } from '../data/activity';
import { Glyph } from './glyph';
import { T } from './text';

/**
 * Where the week went, each with its budget behind it.
 *
 * **The bar is the ratio.** Its width is `spent / budget`, so a category
 * that is nearly spent reads as nearly full — a progress bar drawn to a
 * pleasing length is the same defect as a tooltip on the wrong peak.
 *
 * The reference shows one of these rows and the dock covers the rest. Three
 * fit here, sized from what is left between the chart and the dock.
 */
export function OverviewList({ rowH }: { rowH: number }) {
  return (
    <View>
      {categories.map((c) => {
        const share = Math.min(1, c.spent / c.budget);
        return (
          <Pressable
            key={c.id}
            accessibilityRole="button"
            accessibilityLabel={`${c.name}, ${c.spent} of ${c.budget}`}
          >
            <View style={{ height: rowH, justifyContent: 'center' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ width: 28, alignItems: 'center' }}>
                  <Glyph name={c.icon} size={21} tint={c.tint} strokeWidth={1.7} />
                </View>
                <T
                  variant="catName"
                  color={sheet.ink}
                  style={{ flex: 1, height: type.catName.line, marginLeft: 10 }}
                >
                  {c.name}
                </T>
                <T variant="catSpent" color={sheet.ink} style={{ height: type.catSpent.line }}>
                  {`$${c.spent}`}
                </T>
                <T variant="catBudget" color={sheet.muted} style={{ height: type.catBudget.line }}>
                  {` / $${c.budget}`}
                </T>
              </View>

              <View
                style={{
                  height: 5,
                  borderRadius: 3,
                  backgroundColor: sheet.hairline,
                  marginTop: 10,
                  marginLeft: 38,
                  overflow: 'hidden',
                }}
              >
                <View
                  style={{
                    width: `${share * 100}%`,
                    height: 5,
                    borderRadius: 3,
                    backgroundColor: c.tint,
                  }}
                />
              </View>
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}
