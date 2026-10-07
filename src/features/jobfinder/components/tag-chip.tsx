import { Text, View } from 'react-native';

import { R, TAG, TYPE, type TagTone } from '../theme';

/**
 * A tag on a job card — "Canada", "Frontend", "Part-time".
 *
 * The tone names a fill/ink pair rather than a hue, because the reference gives
 * each pair explicitly and none of them is derivable from the other: `green` is
 * `#E5EFE9` behind `#2C6B4F`, which is not that fill darkened.
 */
export function TagChip({ label, tone }: { label: string; tone: TagTone }) {
  const { bg, fg } = TAG[tone];
  return (
    <View
      style={{
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: R.full,
        backgroundColor: bg,
      }}
    >
      <Text style={[TYPE.tag, { color: fg }]}>{label}</Text>
    </View>
  );
}
