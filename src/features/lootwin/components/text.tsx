import { Text as RNText, type StyleProp, type TextProps, type TextStyle } from 'react-native';

import { type } from '../theme';

type Variant = keyof typeof type;

/**
 * Every string on the screen goes through here, so a size is chosen once in
 * `theme.ts` and never typed into a component.
 *
 * The face is set by family name, not by `fontWeight`: React Native resolves
 * a weight by picking a *file*, and a numeric weight against a single
 * registered family silently renders the one face it has.
 */
export function T({
  variant,
  color,
  style,
  ...rest
}: TextProps & { variant: Variant; color: string; style?: StyleProp<TextStyle> }) {
  const t = type[variant];
  return (
    <RNText
      {...rest}
      style={[
        {
          fontFamily: t.weight,
          fontSize: t.size,
          lineHeight: t.line,
          letterSpacing: t.track,
          color,
        },
        style,
      ]}
    />
  );
}
