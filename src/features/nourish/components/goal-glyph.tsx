import Droplet from 'lucide-react-native/icons/droplet';
import Target from 'lucide-react-native/icons/target';
import { View } from 'react-native';

import type { GoalGlyph as GlyphName } from '../data/home';
import { nr } from '../theme';
import { T } from './text';

/**
 * The mark in the corner of a Today card.
 *
 * Two of the three are Lucide's, because the reference's are the shapes Lucide
 * draws — a thin open target, a thin droplet. The sleep one is not a glyph at
 * all in the reference: it is the letters z, z, z stepping up and getting
 * smaller, which is lettering, not an icon. It is set here in the screen's own
 * face rather than reached for as an emoji — platforms disagree about emoji,
 * and this project has shipped that mistake before.
 */
export function GoalGlyph({ name, size = 17 }: { name: GlyphName; size?: number }) {
  if (name === 'target') {
    return <Target size={size} color={nr.muted} strokeWidth={1.8} />;
  }
  if (name === 'water') {
    return <Droplet size={size} color={nr.muted} strokeWidth={1.8} />;
  }

  return (
    <View style={{ width: size, height: size, justifyContent: 'center' }}>
      <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
        <T
          variant="cardMeta"
          color={nr.muted}
          style={{ fontSize: size * 0.42, lineHeight: size * 0.5 }}
        >
          z
        </T>
        <T
          variant="cardMeta"
          color={nr.muted}
          style={{ fontSize: size * 0.55, lineHeight: size * 0.62 }}
        >
          z
        </T>
        <T
          variant="cardMeta"
          color={nr.muted}
          style={{ fontSize: size * 0.72, lineHeight: size * 0.8 }}
        >
          Z
        </T>
      </View>
    </View>
  );
}
