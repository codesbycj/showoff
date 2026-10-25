import { Pressable, View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

import { actions } from '../data/start';
import { ACTION_GAP, ACTION_SIZE, ACTIONS_TOP } from '../layout';
import { kt, radius, type } from '../theme';
import { T } from './text';

/**
 * The three things the wallet does, with the one you do most in white.
 *
 * The glyphs are drawn rather than taken from an emoji font: a glyph that
 * differs between Windows, Android and iOS cannot be shipped as UI. Each
 * target is 50dp across and the label sits outside it, so the press area
 * clears 44dp without the text having to be part of it.
 */
export function ActionRow({ onSend }: { onSend?: () => void }) {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: ACTIONS_TOP }}>
      {actions.map((a) => {
        const primary = 'primary' in a && a.primary;
        const tint = primary ? kt.panel : kt.ink;
        return (
          <Pressable
            key={a.id}
            onPress={a.id === 'send' ? onSend : undefined}
            accessibilityRole="button"
            accessibilityLabel={a.label}
            style={{ marginHorizontal: ACTION_GAP / 2 }}
          >
            <View style={{ alignItems: 'center' }}>
              <View
                style={{
                  width: ACTION_SIZE,
                  height: ACTION_SIZE,
                  borderRadius: radius.pill,
                  backgroundColor: primary ? kt.ink : kt.panelCard,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Svg width={20} height={20} viewBox="0 0 24 24">
                  {a.id === 'add' ? (
                    <Path
                      d="M12 5.4v13.2M5.4 12h13.2"
                      stroke={tint}
                      strokeWidth={1.9}
                      strokeLinecap="round"
                    />
                  ) : null}
                  {a.id === 'send' ? (
                    <Path
                      d="M7.6 16.4 16.4 7.6M9.4 7.6h7v7"
                      stroke={tint}
                      strokeWidth={1.9}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    />
                  ) : null}
                  {a.id === 'more' ? (
                    <>
                      <Circle cx={12} cy={5.8} r={1.6} fill={tint} />
                      <Circle cx={12} cy={12} r={1.6} fill={tint} />
                      <Circle cx={12} cy={18.2} r={1.6} fill={tint} />
                    </>
                  ) : null}
                </Svg>
              </View>
              <T
                variant="actionLabel"
                color={kt.dim}
                style={{ marginTop: 8, height: type.actionLabel.line }}
              >
                {a.label}
              </T>
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}
