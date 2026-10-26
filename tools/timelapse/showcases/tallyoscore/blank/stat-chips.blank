import { Pressable, View } from 'react-native';

import { copy, growth, tasksDone, tasksTotal } from '../data/start';
import { CHIPS_TOP, CHIP_HEIGHT } from '../layout';
import { radius, ty, type } from '../theme';
import { Arrow, Growth, Trophy } from './glyphs';
import { T } from './text';

/** One outline chip: a glyph, a label and the figure it carries. */
function Chip({
  glyph,
  label,
  value,
  tint,
}: {
  glyph: 'growth' | 'trophy';
  label: string;
  value: string;
  tint: string;
}) {
  return (
    <View
      style={{
        height: CHIP_HEIGHT,
        paddingHorizontal: 12,
        marginRight: 8,
        borderRadius: radius.chip,
        borderWidth: 1,
        borderColor: ty.hairline,
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      {glyph === 'growth' ? <Growth tint={tint} /> : <Trophy tint={tint} />}
      <T variant="chip" color={ty.muted} style={{ marginLeft: 7, height: type.chip.line }}>
        {label}
      </T>
      <T variant="chipValue" color={ty.ink} style={{ height: type.chipValue.line }}>
        {value}
      </T>
    </View>
  );
}

/**
 * The two figures under the sentence, and a way into the detail.
 *
 * Both are arithmetic rather than copy: growth is this period against the
 * last, and the best result is the tasks that were actually finished.
 */
export function StatChips({ onOpen }: { onOpen?: () => void }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: CHIPS_TOP }}>
{/* STEP 1.14 how much it grew
      <Chip
        glyph="growth"
        label={copy.growthLabel}
        value={`${growth > 0 ? '+' : ''}${growth}%`}
        tint={ty.green}
      />
*/}

{/* STEP 1.15 the best run so far
      <Chip
        glyph="trophy"
        label={copy.bestLabel}
        value={`${tasksDone}/${tasksTotal}${copy.tasksWord}`}
        tint={ty.amber}
      />
*/}

      <View style={{ flex: 1 }} />

{/* STEP 1.16 and a way into it
      <Pressable onPress={onOpen} accessibilityRole="button" accessibilityLabel="Open the detail">
        <View
          style={{
            width: CHIP_HEIGHT,
            height: CHIP_HEIGHT,
            borderRadius: radius.pill,
            borderWidth: 1,
            borderColor: ty.hairline,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Arrow tint={ty.ink} />
        </View>
      </Pressable>
*/}
    </View>
  );
}
