import { Pressable, View } from 'react-native';

import { actions } from '../data/start';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

import { ActionProps } from './_start-parts-shared';

/**
 * The two ways in.
 *
 * Both 54dp, so each clears R7 on its own. Each fill and shadow sit in one
 * style object — a `Platform.select` for a shadow is exactly what the web
 * render cannot check (§4.4).
 */
export function StartActions({ margin, height, radius, gap, onPress }: ActionProps) {
  return (
    <View style={{ marginHorizontal: margin, gap }}>
      {/* STEP 1.14 label
      {actions.map((a) => {
        const solid = a.tone === 'solid';
        return (
          <Pressable
            key={a.id}
            onPress={onPress}
            accessibilityRole="button"
            accessibilityLabel={a.label}
          >
            {({ pressed }) => (
              <View
                style={{
                  height,
                  borderRadius: radius,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 10,
                  backgroundColor: solid ? ct.cta : 'transparent',
                  borderWidth: solid ? 0 : 1.5,
                  borderColor: ct.outline,
                  opacity: pressed ? 0.85 : 1,
                  shadowColor: '#5C0A04',
                  shadowOpacity: solid ? 0.3 : 0,
                  shadowRadius: 14,
                  shadowOffset: { width: 0, height: 6 },
                  elevation: solid ? 5 : 0,
                }}
              >
                <Glyph name={a.glyph} size={19} color={solid ? ct.ctaInk : ct.ink} />
                <T variant={solid ? 'action' : 'actionOutline'}>{a.label}</T>
              </View>
            )}
          </Pressable>
        );
      })}
      */}
    </View>
  );
}
