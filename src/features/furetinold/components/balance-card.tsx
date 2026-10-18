import ArrowDownLeft from 'lucide-react-native/icons/arrow-down-left';
import ArrowUpRight from 'lucide-react-native/icons/arrow-up-right';
import ChevronDown from 'lucide-react-native/icons/chevron-down';
import EyeOff from 'lucide-react-native/icons/eye-off';
import RefreshCw from 'lucide-react-native/icons/refresh-cw';
import { Pressable, View } from 'react-native';

import { balance, cardActions } from '../data/wallet';
import { CARD_ACTION_H, CARD_PAD } from '../layout';
import { fu, radius } from '../theme';
import { Flag } from './flag';
import { T } from './text';

const ICONS = {
  in: ArrowDownLeft,
  swap: RefreshCw,
  out: ArrowUpRight,
} as const;

type Action = (typeof cardActions)[number];

/**
 * What is in the wallet, in which currency, and the three things that can be
 * done with it.
 *
 * The three actions are inside the card rather than under it, which is what
 * this version of the design does — the redraw on the next phone takes them
 * out, and keeping both honest is the point of building the pair.
 */
export function BalanceCard({ onAction }: { onAction?: (a: Action) => void }) {
  return (
    <View style={{ borderRadius: radius.card, backgroundColor: fu.yellow, padding: CARD_PAD }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 7 }}>
        {/* STEP 1.08 what the number is
        <T variant="balanceLabel" color={fu.onYellow}>
          {balance.label}
        </T>
        */}
        <EyeOff size={15} color={fu.onYellow} strokeWidth={1.9} />
      </View>

      {/* STEP 1.09 the number, and its currency
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 2,
        }}
      >
        <T variant="balance" color={fu.onYellow}>
          {balance.value}
        </T>

        <View
          style={{
            height: 34,
            paddingHorizontal: 11,
            borderRadius: radius.pill,
            backgroundColor: fu.onCard,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 6,
          }}
        >
          <Flag country="us" size={17} />
          <T variant="currency" color={fu.onYellow}>
            {balance.currency}
          </T>
          <ChevronDown size={14} color={fu.onYellow} strokeWidth={2.2} />
        </View>
      </View>
      */}

      <View style={{ flexDirection: 'row', gap: 8, marginTop: 16 }}>
        {/* STEP 1.10 and the three things to do with it
        {cardActions.map((a) => {
          const Icon = ICONS[a.icon];
          return (
            <Pressable
              key={a.key}
              onPress={() => onAction?.(a)}
              accessibilityRole="button"
              accessibilityLabel={a.label}
              style={{ flex: 1 }}
            >
              <View
                style={{
                  height: CARD_ACTION_H,
                  borderRadius: radius.pill,
                  backgroundColor: fu.onCard,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 6,
                }}
              >
                <Icon size={15} color={fu.onYellow} strokeWidth={2} />
                <T variant="cardAction" color={fu.onYellow}>
                  {a.label}
                </T>
              </View>
            </Pressable>
          );
        })}
        */}
      </View>
    </View>
  );
}
