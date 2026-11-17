import { Pressable, ScrollView, View } from 'react-native';

import { signed, transfers } from '../data/activity';
import { ct } from '../theme';
import { Folder } from './folder';
import { Glyph } from './glyph';
import { T } from './text';

type Props = { margin: number; height: number; rowH: number; gap: number };

/**
 * What moved today.
 *
 * **The list runs under the bottom edge** rather than stopping above it, which
 * is how the board ends - a row crossing the frame, never a band of empty
 * canvas (I3). The sign decides the colour, so a received amount cannot be
 * typed in the outgoing style by mistake (R9).
 */
export function TransferList({ margin, height, rowH, gap }: Props) {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ height }}
      contentContainerStyle={{ paddingHorizontal: margin, gap }}
    >
      {transfers.map((transfer) => (
        <Pressable
          key={transfer.id}
          accessibilityRole="button"
          accessibilityLabel={`${transfer.name}, ${transfer.kind}`}
        >
          <View
            style={{
              height: rowH,
              borderRadius: 18,
              backgroundColor: ct.card,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 12,
              paddingHorizontal: 12,
            }}
          >
            <Folder width={40} height={40} fill={ct.tile} radius={13}>
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Glyph name={transfer.icon} size={17} color={ct.ink} strokeWidth={1.9} />
              </View>
            </Folder>

            <View style={{ flex: 1 }}>
              <T variant="txName" numberOfLines={1}>
                {transfer.name}
              </T>
              <T variant="txKind">{transfer.kind}</T>
            </View>

            <T variant={transfer.amount < 0 ? 'txOut' : 'txIn'}>{signed(transfer.amount)}</T>
          </View>
        </Pressable>
      ))}
    </ScrollView>
  );
}
