import { Pressable, Text, View } from 'react-native';

import { R, TYPE, au } from '../theme';

/**
 * The period switch.
 *
 * Options are `flex: 1` so the four land on even widths — unlike the dock, where
 * the active item grows. Here they are all the same kind of thing and an
 * uneven row would read as one of them being more important.
 *
 * Colours are passed in because this sits on the purple hero on one screen and
 * could sit on the page on another; the control has no opinion about its ground.
 */
export function Segmented({
  options,
  active,
  track,
  thumb,
  ink,
  activeInk,
  onSelect,
}: {
  options: readonly string[];
  active: string;
  track: string;
  thumb: string;
  ink: string;
  activeInk: string;
  onSelect?: (o: string) => void;
}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: track,
        borderRadius: R.full,
        padding: 4,
      }}
    >
      {options.map((o) => {
        const on = o === active;
        return (
          <Pressable key={o} style={{ flex: 1 }} onPress={() => onSelect?.(o)}>
            <View
              style={{
                borderRadius: R.full,
                paddingVertical: 8,
                alignItems: 'center',
                backgroundColor: on ? thumb : 'transparent',
              }}
            >
              <Text style={[TYPE.labelMd, { color: on ? activeInk : ink }]}>{o}</Text>
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}
