import ArrowDownLeft from 'lucide-react-native/icons/arrow-down-left';
import ArrowUpRight from 'lucide-react-native/icons/arrow-up-right';
import RefreshCw from 'lucide-react-native/icons/refresh-cw';
import { Pressable, View } from 'react-native';

import { actions } from '../data/wallet';
import { ACTION_H } from '../layout';
import { fu, radius } from '../theme';
import { T } from './text';

const ICONS = {
  in: ArrowDownLeft,
  swap: RefreshCw,
  out: ArrowUpRight,
} as const;

type Action = (typeof actions)[number];

/**
 * The three things that can be done with the balance.
 *
 * Under the card rather than inside it, which is the redraw's main move: the
 * card is then only the number, and the actions read as actions.
 */
export function ActionRow({ onAction }: { onAction?: (a: Action) => void }) {
  return (
    <View style={{ flexDirection: 'row', gap: 8 }}>
      {/* STEP 1.13 three of them
      {actions.map((a) => {
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
                // MISTAKE 1.30 the actions came in squeezed
                paddingVertical: 10,
                height: ACTION_H,
                borderRadius: radius.pill,
                backgroundColor: fu.surface,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 7,
              }}
            >
              <View
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: radius.full,
                  borderWidth: 1.6,
                  borderColor: fu.yellowDeep,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Icon size={12} color={fu.yellowDeep} strokeWidth={2.4} />
              </View>
              <T variant="cardAction" color={fu.ink}>
                {a.label}
              </T>
            </View>
          </Pressable>
        );
      })}
      */}
    </View>
  );
}
