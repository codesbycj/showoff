import { Pressable, Text, View } from 'react-native';

import { FONT, R, SP, TYPE, alpha, fa } from '../theme';

import { Symbol } from './symbol';

/**
 * The "code applied" confirmation pill under the promo field.
 *
 * `verified` appears outlined here and filled beside the profile name, which is
 * why one comes from the icon subset and the other from `filled-icon.tsx`.
 *
 * The content row is held at 24dp, which is measured rather than derived. In
 * the browser the row is as tall as its tallest inline box, and that is the
 * icon span: Material Symbols carries a far larger ascent and descent than the
 * 18dp type beside it, so the pill comes out 40dp. `Symbol` deliberately
 * collapses that line box to the glyph size — which is what keeps an icon
 * centred in a circular well everywhere else — so here the row asks for the
 * height back explicitly.
 */
export function AppliedPromo({
  code,
  note,
  onDismiss,
}: {
  code: string;
  note: string;
  onDismiss?: () => void;
}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: alpha(fa.primaryContainer, 0.1),
        paddingHorizontal: 14,
        paddingVertical: SP.sm,
        borderRadius: R.full,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: SP.sm,
          flexShrink: 1,
          minHeight: 24,
        }}
      >
        <Symbol name="verified" size={18} color={fa.primary} />
        <Text style={{ ...TYPE.labelMd, fontFamily: FONT.bold, color: fa.primary }}>{code}</Text>
        <Text
          numberOfLines={1}
          style={{ ...TYPE.bodySm, fontFamily: FONT.medium, color: fa.onSurfaceVariant }}
        >
          {note}
        </Text>
      </View>

      <Pressable onPress={onDismiss} accessibilityRole="button" accessibilityLabel="Remove promo">
        <Symbol name="close" size={16} color={fa.onSurfaceVariant} />
      </Pressable>
    </View>
  );
}
