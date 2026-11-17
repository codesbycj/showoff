import { View } from 'react-native';

import { stages } from '../data/order';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

type Props = { margin: number; height: number; disc: number };

/**
 * How far along the order is.
 *
 * The connector between two stages is drawn by the **gap**, not by a line that
 * has to know how many stages there are: each entry after the first carries a
 * flexible dotted rule, so the rail stays even however many rows the reveal has
 * uncommented (I7).
 */
export function StageRail({ margin, height, disc }: Props) {
  return (
    <View
      style={{ marginHorizontal: margin, height, flexDirection: 'row', alignItems: 'flex-start' }}
    >
      {stages.map((stage, i) => (
        <View
          key={stage.id}
          style={{ flex: 1, flexDirection: 'row', alignItems: 'flex-start', gap: 0 }}
        >
          {i > 0 ? (
            <View
              style={{
                flex: 1,
                height: 2,
                marginTop: disc / 2 - 1,
                borderRadius: 1,
                borderTopWidth: 2,
                borderStyle: 'dotted',
                borderColor: ct.line,
              }}
            />
          ) : null}

          <View style={{ alignItems: 'center', gap: 6, width: disc + 26 }}>
            <View
              style={{
                width: disc,
                height: disc,
                borderRadius: disc / 2,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: stage.done ? ct.dark : ct.white,
                borderWidth: stage.done ? 0 : 1.4,
                borderColor: ct.line,
              }}
            >
              <Glyph
                name={stage.icon}
                size={17}
                color={stage.done ? ct.onDark : ct.muted}
                strokeWidth={1.8}
              />
            </View>
            <T variant="stepLabel" numberOfLines={1}>
              {stage.label}
            </T>
          </View>
        </View>
      ))}
    </View>
  );
}
