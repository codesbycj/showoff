import { View } from 'react-native';
import Svg, { Rect } from 'react-native-svg';

import { brand } from '../data/start';
import { ct } from '../theme';
import { T } from './text';

type Props = { margin: number; height: number };

/**
 * The app's name.
 *
 * The board's splash names the app nowhere; a splash that does not say what it
 * is a splash for is the row it crops, and inventing that row is the
 * sanctioned fix for a short screen (I3).
 *
 * The mark is three stacked bars - a shelf, which is an idea rather than a
 * picture of one (I4). **Centred tracking** is cancelled with `paddingRight`,
 * because trailing `letterSpacing` otherwise pushes the word off its own
 * centre (RULES SS6.2).
 */
export function BrandRow({ margin, height }: Props) {
  return (
    <View
      style={{
        marginHorizontal: margin,
        height,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
      }}
    >
      <Svg width={20} height={20} viewBox="0 0 24 24">
        <Rect x={3} y={4.4} width={18} height={3.6} rx={1.2} fill={ct.ink} />
        <Rect x={3} y={10.2} width={18} height={3.6} rx={1.2} fill={ct.ink} />
        <Rect x={3} y={16} width={11} height={3.6} rx={1.2} fill={ct.ink} />
      </Svg>

      <T variant="wordmark">{brand.name.toUpperCase()}</T>
    </View>
  );
}
