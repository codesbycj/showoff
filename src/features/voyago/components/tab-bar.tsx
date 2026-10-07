import { Pressable, Text, View } from 'react-native';

import { FONT, R, SP, alpha, vy } from '../theme';

import { PlaneGlyph } from './plane-glyph';

type Item = { key: string; label: string };

/**
 * Home's floating navigation pill.
 *
 * The active tab is not a highlighted version of the other two — it is a
 * different control: an orange 32dp disc carrying a plane, with its label
 * beside it, where the inactive tabs are plain centred captions that share the
 * leftover width. So the active one is drawn out of the `map` rather than
 * branching inside it.
 *
 * The export anchors the pill `bottom-5` and then draws an iOS home indicator
 * below it, putting the pill's lower edge 36dp off the screen. Here the device
 * draws its own gesture bar, so the pill is anchored to the bottom safe-area
 * inset instead — on the reference device that is 34dp, which lands the pill
 * within 2dp of where the export puts it, without drawing a second indicator
 * under the real one.
 */
export function TabBar({
  items,
  active,
  inset,
  onSelect,
}: {
  items: readonly Item[];
  active: string;
  inset: number;
  onSelect?: (key: string) => void;
}) {
  return (
    <View
      style={{
        position: 'absolute',
        left: SP.xl,
        right: SP.xl,
        bottom: inset,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: vy.ink,
          borderRadius: R.full,
          borderWidth: 1,
          borderColor: alpha(vy.white, 0.05),
          paddingHorizontal: SP.md,
          paddingVertical: 6,
          shadowColor: vy.ink,
          shadowOpacity: 0.3,
          shadowRadius: 20,
          shadowOffset: { width: 0, height: 10 },
          elevation: 12,
        }}
      >
        {items.map((item) =>
          item.key === active ? (
            <Pressable key={item.key} onPress={() => onSelect?.(item.key)}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: SP.sm,
                  borderRadius: R.full,
                  paddingLeft: 4,
                  paddingRight: SP.md,
                  paddingVertical: 4,
                }}
              >
                <View
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: R.full,
                    backgroundColor: vy.orange,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <PlaneGlyph size={14} color={vy.ink} />
                </View>
                <Text
                  style={{
                    fontFamily: FONT.black,
                    fontSize: 10,
                    lineHeight: 14,
                    letterSpacing: 0.5,
                    color: vy.white,
                  }}
                >
                  {item.label.toUpperCase()}
                </Text>
              </View>
            </Pressable>
          ) : (
            <Pressable key={item.key} style={{ flex: 1 }} onPress={() => onSelect?.(item.key)}>
              <Text
                style={{
                  textAlign: 'center',
                  paddingVertical: SP.sm,
                  fontFamily: FONT.bold,
                  fontSize: 10,
                  lineHeight: 14,
                  letterSpacing: 1,
                  color: alpha(vy.white, 0.75),
                }}
              >
                {item.label.toUpperCase()}
              </Text>
            </Pressable>
          ),
        )}
      </View>
    </View>
  );
}
