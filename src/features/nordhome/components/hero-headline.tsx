import { View } from 'react-native';

import { hero } from '../data/home';
import { T } from './text';

type Props = { margin: number; width: number };

/**
 * The greeting — the dominant element on the screen (R8).
 *
 * It is capped at 86% of the frame so the second line breaks where the board
 * breaks it, rather than running the full width and reading as body copy.
 */
export function HeroHeadline({ margin, width }: Props) {
  return (
    <View style={{ marginHorizontal: margin, marginTop: 10, width: width * 0.86 }}>
      <T variant="hero">{hero.headline}</T>
    </View>
  );
}
