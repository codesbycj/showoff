import { Pressable, View } from 'react-native';

import { macros } from '../data/home';
import { LOG_ROW, PILL_GAP } from '../layout';
import { nr } from '../theme';
import { MacroPill } from './macro-pill';
import { T } from './text';

/**
 * One logged meal: what it was, what it cost, and how it splits.
 *
 * The three pills take their colours from `macros`, by position, so the row
 * cannot disagree with the rings above it — protein, carbs, fat, in that
 * order, everywhere on the screen. A row that carried its own colours would
 * drift the first time the palette moved.
 *
 * The amount and its unit sit on a shared baseline, the same way the rings
 * set their grams.
 */
export function LogRow({
  title,
  cal,
  grams,
  onPress,
}: {
  title: string;
  cal: number;
  /** Protein, carbs, fat. */
  grams: readonly number[];
  onPress?: () => void;
}) {
  return (
    <Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel={title}>
      <View
        style={{
          height: LOG_ROW,
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <T variant="logTitle" color={nr.inkSoft} numberOfLines={1} style={{ flex: 1 }}>
          {title}
        </T>

        <View style={{ flexDirection: 'row', alignItems: 'baseline', marginRight: 10 }}>
          <T variant="logValue" color={nr.ink}>
            {String(cal)}
          </T>
          <T variant="logUnit" color={nr.mutedLight} style={{ marginLeft: 3 }}>
            Cal
          </T>
        </View>

        <View style={{ flexDirection: 'row', gap: PILL_GAP }}>
          {grams.map((g, i) => (
            <MacroPill key={macros[i].key} grams={g} color={macros[i].color} />
          ))}
        </View>
      </View>
    </Pressable>
  );
}
