import { Pressable, View } from 'react-native';

import { hero } from '../data/home';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

type Props = { margin: number; height: number; radius: number; bottom: number };

/**
 * The search control, hanging off the bottom of the hero as the board draws
 * it.
 *
 * The visual box is an inner `View`, not a `Pressable` style function: a
 * `style={({pressed}) => …}` is dropped in a static render and the control
 * silently loses its height and fill (§7).
 */
export function SearchPill({ margin, height, radius, bottom }: Props) {
  return (
    <View style={{ position: 'absolute', left: margin, right: margin, bottom }}>
      <Pressable accessibilityRole="search" accessibilityLabel={hero.searchTitle}>
        <View
          style={{
            height,
            borderRadius: radius,
            backgroundColor: ct.glass,
            borderWidth: 1,
            borderColor: ct.glassLine,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 20,
            gap: 12,
          }}
        >
          {/* STEP 1.08 glyph
          <Glyph name="search" size={20} color={ct.white} strokeWidth={2} />
          */}
          {/* STEP 1.09 search title
          <View>
            <T variant="pillTitle">{hero.searchTitle}</T>
            <T variant="pillMeta">{hero.searchMeta}</T>
          </View>
          */}
        </View>
      </Pressable>
    </View>
  );
}
