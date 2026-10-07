import { Building2, MapPin, PieChart, Users } from 'lucide-react-native';
import { Pressable, Text, View } from 'react-native';

import type { QuickTile as Tile } from '../data/home';
import { FONT, R, vt } from '../theme';

/**
 * One cell of the 2x2 explore grid.
 *
 * Each cell's icon carries its own pale tint — emerald, blue, red, violet —
 * which is the only colour on this part of the page. The tints come from the
 * data rather than from a lookup here, because they are content: they are how
 * the design separates four destinations that are otherwise identical rows of
 * two lines of text.
 */
const ICONS = { pin: MapPin, pie: PieChart, people: Users, building: Building2 } as const;

export function QuickTile({ tile, onPress }: { tile: Tile; onPress?: () => void }) {
  const Icon = ICONS[tile.icon];
  return (
    <Pressable onPress={onPress} style={{ flex: 1 }}>
      <View
        style={{
          backgroundColor: vt.card,
          borderRadius: R.lg,
          padding: 14,
          borderWidth: 1,
          borderColor: vt.line,
          shadowColor: '#000000',
          shadowOpacity: 0.03,
          shadowRadius: 8,
          shadowOffset: { width: 0, height: 2 },
          elevation: 1,
        }}
      >
        <View
          style={{
            width: 32,
            height: 32,
            borderRadius: R.full,
            backgroundColor: tile.tint,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 12,
          }}
        >
          <Icon size={16} color={tile.ink} strokeWidth={2.2} />
        </View>

        <Text style={{ fontFamily: FONT.bold, fontSize: 12, lineHeight: 15, color: vt.ink }}>
          {tile.title}
        </Text>
        <Text
          style={{
            marginTop: 2,
            fontFamily: FONT.medium,
            fontSize: 10,
            lineHeight: 14,
            color: vt.faint,
          }}
        >
          {tile.note}
        </Text>
      </View>
    </Pressable>
  );
}
