import ChartNoAxesCombined from 'lucide-react-native/icons/chart-no-axes-combined';
import Coins from 'lucide-react-native/icons/coins';
import Gift from 'lucide-react-native/icons/gift';
import ReceiptText from 'lucide-react-native/icons/receipt-text';
import { Pressable, View } from 'react-native';

import { services } from '../data/wallet';
import { PANEL_PAD, TILE } from '../layout';
import { fu, radius } from '../theme';
import { T } from './text';

const ICONS = {
  coins: Coins,
  gift: Gift,
  bill: ReceiptText,
  chart: ChartNoAxesCombined,
} as const;

type Service = (typeof services)[number];

/**
 * The four things the wallet does, in one row.
 *
 * Round tiles rather than the rounded squares on the other phone, and four
 * across rather than three — the redraw's own choice, kept because the pair is
 * only worth building if both are honest.
 */
export function ServicePanel({ onSelect }: { onSelect?: (s: Service) => void }) {
  return (
    <View
      style={{
        borderRadius: radius.card,
        backgroundColor: fu.surface,
        padding: PANEL_PAD,
        flexDirection: 'row',
      }}
    >
      {/* STEP 1.16 four of them
      {services.map((s) => {
        const Icon = ICONS[s.icon];
        return (
          <Pressable
            key={s.key}
            onPress={() => onSelect?.(s)}
            accessibilityRole="button"
            accessibilityLabel={s.label}
            style={{ flex: 1 }}
          >
            <View style={{ alignItems: 'center', gap: 7 }}>
              <View
                style={{
                  width: TILE,
                  height: TILE,
                  borderRadius: radius.full,
                  backgroundColor: fu.tile[s.tile],
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Icon size={21} color={fu.tileInk[s.tile]} strokeWidth={1.9} />
              </View>
              <T variant="tile" color={fu.ink}>
                {s.label}
              </T>
            </View>
          </Pressable>
        );
      })}
      */}
    </View>
  );
}
