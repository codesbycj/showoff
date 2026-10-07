import { Pressable, ScrollView, Text, View } from 'react-native';

import { type Sport } from '../data/home';
import { R, SP, TYPE, alpha, vt } from '../theme';

import { Symbol } from './symbol';

/**
 * The sport filter rail.
 *
 * Each chip's leading mark is a Material Symbol, not the emoji the export sets.
 * That is a visible change — the reference shows full-colour ⚽🏀🎾🎮⚾ and this
 * shows monochrome glyphs — and it is the right one: an emoji is resolved by
 * whichever font owns the codepoint, so it is a different picture on Windows,
 * Android and iOS, and the harness renders on one of them and cannot show it.
 *
 * The active chip takes a lime glow rather than a lime fill, which is the
 * design system's "electric bounding ring with illuminated inner fill" state.
 * Android reads that glow from `elevation`, not from `shadowColor`, so the
 * coloured halo is iOS-and-web only; the chip still reads as active from its
 * raised surface and lime type.
 */
export function SportChips({
  sports,
  selected,
  onSelect,
}: {
  sports: readonly Sport[];
  selected: string;
  onSelect?: (key: string) => void;
}) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{ marginHorizontal: -SP.margin }}
      contentContainerStyle={{
        paddingHorizontal: SP.margin,
        gap: SP.sm,
        alignItems: 'center',
        paddingVertical: SP.sm,
      }}
    >
      {sports.map((s) => {
        const on = s.key === selected;
        return (
          <Pressable key={s.key} onPress={() => onSelect?.(s.key)}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: SP.sm,
                paddingHorizontal: SP.gutter,
                paddingVertical: 10,
                borderRadius: R.full,
                backgroundColor: on ? vt.surfaceContainerHigh : vt.surfaceContainer,
                shadowColor: vt.primaryFixed,
                shadowOpacity: on ? 0.25 : 0,
                shadowRadius: 16,
                shadowOffset: { width: 0, height: 0 },
              }}
            >
              <Symbol name={s.icon} size={18} color={on ? vt.primaryFixed : vt.secondary} />
              <Text
                style={{
                  ...TYPE.labelMd,
                  fontFamily: on ? TYPE.labelLg.fontFamily : TYPE.labelMd.fontFamily,
                  color: on ? vt.primaryFixed : vt.secondary,
                }}
              >
                {s.label}
              </Text>

              {s.count ? (
                <View
                  style={{
                    paddingHorizontal: SP.sm,
                    paddingVertical: 2,
                    borderRadius: R.full,
                    backgroundColor: alpha(vt.primaryFixed, 0.2),
                  }}
                >
                  <Text style={{ ...TYPE.labelSm, color: vt.primaryFixed }}>{s.count}</Text>
                </View>
              ) : null}

              {s.pip ? (
                <View
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: R.full,
                    backgroundColor: vt.error,
                  }}
                />
              ) : null}
            </View>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}
