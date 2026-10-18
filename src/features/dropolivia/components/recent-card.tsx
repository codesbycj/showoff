import Headphones from 'lucide-react-native/icons/headphones';
import Shirt from 'lucide-react-native/icons/shirt';
import { Pressable, View } from 'react-native';

import { recent } from '../data/track';
import { RECENT_H } from '../layout';
import { dl, radius } from '../theme';
import { T } from './text';

/**
 * The last thing that was tracked.
 *
 * The garment is an icon-set glyph, not a photograph: a shirt reduced to an
 * outline is a *mark*, and the reference prints it at 40dp where a photograph
 * would read as a smudge. The lorry on the sheet above is the opposite call,
 * for the opposite reason.
 */
const ICONS = {
  shirt: Shirt,
  headphones: Headphones,
} as const;

type Recent = (typeof recent)[number];

export function RecentCard({ item, onPress }: { item: Recent; onPress?: () => void }) {
  const Icon = ICONS[item.icon];

  return (
    <Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel={item.item}>
      <View
        style={{
          height: RECENT_H,
          borderRadius: radius.card,
          backgroundColor: dl.dark,
          padding: 14,
          justifyContent: 'space-between',
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View
            style={{
              width: 44,
              height: 44,
              borderRadius: radius.tile,
              backgroundColor: dl.darkWell,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Icon size={22} color="#9fc0f5" strokeWidth={1.8} />
          </View>

          <View style={{ flex: 1, marginLeft: 12 }}>
            <T variant="item" color={dl.onDark}>
              {item.item}
            </T>
            <T variant="itemId" color={dl.onDarkSoft}>
              {item.tracking}
            </T>
          </View>

          <View
            style={{
              height: 28,
              paddingHorizontal: 12,
              borderRadius: radius.pill,
              backgroundColor: dl.chipDark,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <T variant="chip" color={dl.onDark}>
              {item.chip}
            </T>
          </View>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View>
            <T variant="metaLabel" color={dl.onDarkSoft}>
              {item.window.label}
            </T>
            <T variant="metaValue" color={dl.onDark}>
              {item.window.value}
            </T>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <T variant="metaLabel" color={dl.onDarkSoft}>
              {item.from.label}
            </T>
            <T variant="metaValue" color={dl.onDark}>
              {item.from.value}
            </T>
          </View>
        </View>
      </View>
    </Pressable>
  );
}
