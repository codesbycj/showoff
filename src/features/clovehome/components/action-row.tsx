import { Pressable, View } from 'react-native';

import { ACTION_H } from '../layout';
import { ct, radius, type } from '../theme';
import { copy } from '../data/home';
import { Glyph, type GlyphName } from './glyph';
import { T } from './text';

/**
 * Send, Request, and everything else.
 *
 * Two pills and a disc, sized by flex rather than by fixed widths so the row
 * holds at another screen width. The visual box is an inner `View` in each
 * case — a function style on a `Pressable` is dropped in a static render and
 * takes the height and the fill with it.
 */
function Pill({
  label,
  icon,
  fill,
  ink,
  flex,
  onPress,
}: {
  label: string;
  icon: GlyphName;
  fill: string;
  ink: string;
  flex: number;
  onPress?: () => void;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      style={{ flex }}
    >
      {({ pressed }) => (
        <View
          style={{
            height: ACTION_H,
            borderRadius: radius.pill,
            backgroundColor: fill,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: pressed ? 0.9 : 1,
          }}
        >
          <Glyph name={icon} size={21} tint={ink} strokeWidth={1.6} />
          <T variant="pill" color={ink} style={{ height: type.pill.line, marginLeft: 9 }}>
            {label}
          </T>
        </View>
      )}
    </Pressable>
  );
}

export function ActionRow({ onSend, onRequest }: { onSend?: () => void; onRequest?: () => void }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Pill
        label={copy.send}
        icon="send"
        fill={ct.forest}
        ink={ct.onForest}
        flex={1.08}
        onPress={onSend}
      />
      <View style={{ width: 12 }} />
      <Pill
        label={copy.request}
        icon="request"
        fill={ct.lime}
        ink={ct.onLime}
        flex={1}
        onPress={onRequest}
      />
      <View style={{ width: 12 }} />
      <Pressable accessibilityRole="button" accessibilityLabel="More actions">
        <View
          style={{
            width: ACTION_H,
            height: ACTION_H,
            borderRadius: radius.pill,
            backgroundColor: ct.limeSoft,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Glyph name="grid" size={22} tint={ct.forest} />
        </View>
      </Pressable>
    </View>
  );
}
