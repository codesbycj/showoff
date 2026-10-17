import { View } from 'react-native';

import { log } from '../data/home';
import { nr } from '../theme';
import { LogRow } from './log-row';

/**
 * The day's meals, hairline-separated.
 *
 * The rule is drawn under every row but the last rather than above every row
 * but the first — the same number of lines either way, but this way the list
 * can grow at the bottom without the first row ever gaining a line it should
 * not have.
 */
export function FoodLog({ onSelect }: { onSelect?: (key: string) => void }) {
  return (
    <View>
      {log.map((entry, i) => (
        <View
          key={entry.key}
          style={{
            borderBottomWidth: i === log.length - 1 ? 0 : 1,
            borderBottomColor: nr.rule,
          }}
        >
          <LogRow
            title={entry.title}
            cal={entry.cal}
            grams={entry.macros}
            onPress={() => onSelect?.(entry.key)}
          />
        </View>
      ))}
    </View>
  );
}
