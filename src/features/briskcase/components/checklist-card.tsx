import { Pressable, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { checklist, copy } from '../data/start';
import { CARD_PAD, CHECK_MIN } from '../layout';
import { br, radius, type } from '../theme';
import { T } from './text';

/**
 * The subtasks, with the finished one struck through.
 *
 * The strike is a `lineThroughColor`-less `textDecorationLine` plus a muted
 * colour, which is how React Native draws one: there is no separate rule to
 * position, so it cannot drift off the text the way a hand-drawn line does
 * when the copy wraps.
 *
 * Each row shares the card's slack, so the list fills the card at any height
 * rather than stacking at the top of it.
 */
export function ChecklistCard({ onToggle }: { onToggle?: (id: string) => void }) {
  return (
    <View
      style={{
        flex: 1,
        minHeight: CHECK_MIN,
        borderRadius: radius.card,
        backgroundColor: br.surface,
        padding: CARD_PAD,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <T variant="panelTitle" color={br.ink} style={{ flex: 1, height: type.panelTitle.line }}>
          {copy.checklist}
        </T>
        <Pressable accessibilityRole="button" accessibilityLabel={copy.addSubtask}>
          <View
            style={{
              height: 32,
              paddingHorizontal: 12,
              borderRadius: radius.chip,
              backgroundColor: br.canvas,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <T variant="file" color={br.ink} style={{ height: type.file.line }}>
              {copy.addSubtask}
            </T>
          </View>
        </Pressable>
      </View>

      {checklist.map((c) => (
        <Pressable
          key={c.id}
          onPress={() => onToggle?.(c.id)}
          style={{ flex: 1 }}
          accessibilityRole="checkbox"
          accessibilityState={{ checked: c.done }}
          accessibilityLabel={c.text}
        >
          <View style={{ flex: 1, minHeight: 34, flexDirection: 'row', alignItems: 'center' }}>
            <View
              style={{
                width: 20,
                height: 20,
                borderRadius: radius.pill,
                backgroundColor: c.done ? br.faint : 'transparent',
                borderWidth: c.done ? 0 : 1.5,
                borderColor: br.hairline,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {c.done ? (
                <Svg width={11} height={11} viewBox="0 0 24 24">
                  <Path
                    d="m5.6 12.4 4.2 4.4 8.6-9.6"
                    stroke={br.surface}
                    strokeWidth={3}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                </Svg>
              ) : null}
            </View>

            <T
              variant="check"
              color={c.done ? br.faint : br.ink}
              style={{
                flex: 1,
                marginLeft: 10,
                textDecorationLine: c.done ? 'line-through' : 'none',
              }}
            >
              {c.text}
            </T>
          </View>
        </Pressable>
      ))}
    </View>
  );
}
