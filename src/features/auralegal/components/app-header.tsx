import { Image } from 'expo-image';
import { Pressable, Text, View } from 'react-native';

import { R, SP, TYPE, al } from '../theme';

import { AuraMark } from './aura-mark';
import { Symbol } from './symbol';

/**
 * The fixed top bar the profile and booking screens share.
 *
 * Both set it identically — back, mark, title on the left; overflow and the
 * signed-in avatar on the right — and differ only in the title, so it is one
 * component taking a string rather than two near-identical headers.
 *
 * The mark is the traced SVG, not the hot-linked raster the export uses. At
 * 28dp a 1024px plate would be resampled down through a dark backdrop it brings
 * with it; the path has no backdrop and no resampling.
 *
 * The title is allowed two lines. "Book Consultation Session" does not fit on
 * one beside both controls, and the export lets it wrap rather than truncating
 * — its own render breaks it after "Consultation". Two lines of `title-md` come
 * to 44dp, which still sits inside the 64dp bar.
 */
export function AppHeader({
  title,
  avatar,
  onBack,
  onMore,
}: {
  title: string;
  avatar: number;
  onBack?: () => void;
  onMore?: () => void;
}) {
  return (
    <View
      style={{
        height: 64,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: SP.margin,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: SP.sm, flexShrink: 1 }}>
        <Pressable onPress={onBack} accessibilityRole="button" accessibilityLabel="Go back">
          <View
            style={{
              width: 44,
              height: 44,
              borderRadius: R.full,
              backgroundColor: al.surfaceContainer,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Symbol name="arrowBackIosNew" size={20} color={al.onSurface} />
          </View>
        </Pressable>

        <AuraMark size={28} />

        <Text
          numberOfLines={2}
          style={{ ...TYPE.titleMd, letterSpacing: -0.32, color: al.onSurface, flexShrink: 1 }}
        >
          {title}
        </Text>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', gap: SP.sm }}>
        <Pressable onPress={onMore} accessibilityRole="button" accessibilityLabel="Options">
          <View
            style={{
              width: 44,
              height: 44,
              borderRadius: R.full,
              backgroundColor: al.surfaceContainer,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Symbol name="moreVert" size={20} color={al.onSurfaceVariant} />
          </View>
        </Pressable>

        <Image
          source={avatar}
          style={{ width: 32, height: 32, borderRadius: R.full }}
          contentFit="cover"
        />
      </View>
    </View>
  );
}
