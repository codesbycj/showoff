import { Image, useWindowDimensions, View } from 'react-native';

import { avatar, copy } from '../data/start';
import { AVATAR, MARGIN, PANEL_HEIGHT, PANEL_PAD } from '../layout';
import { on, radius, type } from '../theme';
import { T } from './text';
import { Wave } from './wave';

/**
 * The black panel: who is signed in, what the app is for, and the wave.
 *
 * The wave is clipped by the panel's own radius. `overflow: 'hidden'` and
 * `elevation` on one View is unreliable on Android (AGENTS.md), so the panel
 * carries no elevation — it is the only black thing on a near-white page and
 * does not need a shadow to separate.
 *
 * The avatar is a photograph, per AGENTS.md, with numeric width and height.
 */
export function Hero() {
  const { width } = useWindowDimensions();
  const w = width - MARGIN * 2;

  return (
    <View
      style={{
        height: PANEL_HEIGHT,
        borderRadius: radius.panel,
        backgroundColor: on.panel,
        overflow: 'hidden',
      }}
    >
      <View style={{ position: 'absolute', right: 0, top: 0, bottom: 0 }}>
        <Wave w={w} h={PANEL_HEIGHT} tint={on.wave} />
      </View>

      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: PANEL_PAD,
          paddingBottom: 18,
        }}
      >
        <View style={{ flex: 1 }}>
          <T variant="greeting" color={on.onPanelDim} style={{ height: type.greeting.line }}>
            {copy.greeting}
          </T>
          <View style={{ marginTop: 6 }}>
            {copy.display.map((line) => (
              <T
                key={line}
                variant="display"
                color={on.onPanel}
                style={{ height: type.display.line }}
              >
                {line}
              </T>
            ))}
          </View>
        </View>

        <Image
          source={avatar}
          style={{
            width: AVATAR,
            height: AVATAR,
            borderRadius: radius.pill,
            borderWidth: 2,
            borderColor: on.onPanel,
          }}
          accessibilityIgnoresInvertColors
        />
      </View>
    </View>
  );
}
