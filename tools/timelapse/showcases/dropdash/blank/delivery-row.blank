import { Pressable, View } from 'react-native';

import { ROW_HEIGHT, ROW_THUMB } from '../layout';
import { dd, radius } from '../theme';
import { TileGlyph } from './tile-glyph';
import { T } from './text';

/**
 * One recent delivery.
 *
 * The thumbnail is the parcel object from the stat tiles rather than a
 * photograph of the goods: the reference crops product shots in here, and a
 * stand-in set of stock groceries would be four more bitmaps doing nothing the
 * drawn parcel does not already say.
 */
export function DeliveryRow({
  title,
  meta,
  onPress,
}: {
  title: string;
  meta: string;
  onPress?: () => void;
}) {
  return (
    <Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel={title}>
      <View style={{ height: ROW_HEIGHT, flexDirection: 'row', alignItems: 'center' }}>
        {/* STEP 1.25 a thumbnail
        <View
          style={{
            width: ROW_THUMB,
            height: ROW_THUMB,
            borderRadius: radius.full,
            backgroundColor: dd.surface,
            borderWidth: 1,
            borderColor: dd.edge,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <TileGlyph name="box" size={20} />
        </View>
        */}

        {/* STEP 1.26 and what it was
        <View style={{ flex: 1, marginLeft: 11 }}>
          <T variant="rowTitle" color={dd.ink} numberOfLines={1}>
            {title}
          </T>
          <T variant="rowMeta" color={dd.muted} numberOfLines={1}>
            {meta}
          </T>
        </View>
        */}
      </View>
    </Pressable>
  );
}
