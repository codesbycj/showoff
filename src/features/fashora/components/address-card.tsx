import { Pressable, Text, View } from 'react-native';

import { ELEV, FONT, R, SP, TYPE, alpha, fa } from '../theme';

import { Symbol } from './symbol';

/**
 * The delivery address row.
 *
 * The pin's well is a 10% `primary-container` wash with `primary` ink in it —
 * the same two-orange pairing as the item-count chip, and the same trap.
 *
 * The "Default" chip is the one piece of type on this screen that is not from
 * the scale: the export writes `text-[10px] font-label-sm`, which takes the
 * family from `label-sm` and the size from nowhere, so it is Plus Jakarta Sans
 * 600 at 10 with the scale's own 11 overridden.
 *
 * `rounded-sm` here is Tailwind's stock 2dp, not the frontmatter's 8: the
 * export's shipped config overrides `DEFAULT`, `lg`, `xl` and `full` and leaves
 * `sm` alone, so the chip is near-square.
 */
export function AddressCard({
  label,
  badge,
  address,
  action,
  onChange,
}: {
  label: string;
  badge: string;
  address: string;
  action: string;
  onChange?: () => void;
}) {
  return (
    <View
      style={{
        backgroundColor: fa.surfaceContainerLowest,
        borderRadius: R.lg,
        padding: SP.md,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: SP.gutterMobile,
        ...ELEV.card,
      }}
    >
      <View
        style={{ flexDirection: 'row', alignItems: 'center', gap: SP.gutterMobile, flexShrink: 1 }}
      >
        <View
          style={{
            width: 44,
            height: 44,
            borderRadius: R.full,
            backgroundColor: alpha(fa.primaryContainer, 0.1),
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Symbol name="locationOn" size={22} color={fa.primary} />
        </View>

        <View style={{ flexShrink: 1 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <Text style={{ ...TYPE.labelLg, color: fa.onSurface }}>{label}</Text>
            <View
              style={{
                paddingHorizontal: 6,
                borderRadius: R.sm,
                backgroundColor: fa.surfaceContainerHigh,
              }}
            >
              <Text
                style={{
                  fontFamily: FONT.semibold,
                  fontSize: 10,
                  lineHeight: 16,
                  color: fa.secondary,
                }}
              >
                {badge}
              </Text>
            </View>
          </View>

          <Text
            numberOfLines={1}
            style={{ ...TYPE.bodySm, color: fa.secondary, marginTop: 2 }}
          >
            {address}
          </Text>
        </View>
      </View>

      <Pressable onPress={onChange} accessibilityRole="button">
        <View style={{ paddingHorizontal: SP.sm, paddingVertical: SP.xs }}>
          <Text style={{ ...TYPE.labelMd, color: fa.primary }}>{action}</Text>
        </View>
      </Pressable>
    </View>
  );
}
