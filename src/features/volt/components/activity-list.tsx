import { Pressable, Text, View } from 'react-native';

import { type Transaction } from '../data/wallet';
import { R, SP, TYPE, alpha, vt } from '../theme';

import { FilledIcon } from './filled-icon';
import { Symbol } from './symbol';

/**
 * The wallet's transaction list.
 *
 * Three rows, three different tones, and the differences are all flags on the
 * datum: a settled win takes a lime icon well, a lime amount and a lime glow; a
 * deposit takes a sage status dot instead of a lime one; a cashout takes
 * neither. The export writes each row out longhand, which is how its second row
 * ended up with a glow the other two do not have.
 *
 * Only the win's icon is filled — `sports_soccer` at FILL 1 — so it comes from
 * the path set while the two arrows come from the icon font.
 */
export function ActivityList({
  title,
  action,
  items,
  onSeeAll,
}: {
  title: string;
  action: string;
  items: readonly Transaction[];
  onSeeAll?: () => void;
}) {
  return (
    <View
      style={{
        borderRadius: R.lg,
        backgroundColor: vt.surfaceContainerLow,
        padding: SP.lg,
        gap: SP.md,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: SP.sm }}>
          <Symbol name="receiptLong" size={20} color={vt.primaryFixed} />
          <Text style={{ ...TYPE.headlineMd, color: vt.primary }}>{title}</Text>
        </View>
        <Pressable onPress={onSeeAll} hitSlop={8}>
          <Text style={{ ...TYPE.labelSm, color: vt.secondary }}>{action}</Text>
        </Pressable>
      </View>

      <View style={{ gap: SP.md }}>
        {items.map((t) => (
          <View
            key={t.key}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderRadius: R.DEFAULT,
              backgroundColor: vt.surfaceContainer,
              paddingVertical: 14,
              paddingHorizontal: SP.md,
              gap: SP.sm,
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: SP.md, flexShrink: 1 }}>
              <View
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: R.full,
                  backgroundColor: vt.surfaceContainerLowest,
                  alignItems: 'center',
                  justifyContent: 'center',
                  shadowColor: vt.primaryFixed,
                  shadowOpacity: t.accent ? 0.2 : 0,
                  shadowRadius: 8,
                  shadowOffset: { width: 0, height: 0 },
                }}
              >
                {t.accent ? (
                  <FilledIcon name="sportsSoccer" size={18} color={vt.primaryFixed} />
                ) : (
                  <Symbol name={t.icon} size={18} color={vt.secondary} />
                )}
              </View>

              <View style={{ flexShrink: 1 }}>
                <Text numberOfLines={1} style={{ ...TYPE.labelLg, color: vt.primary }}>
                  {t.title}
                </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 2 }}>
                  <Text style={{ ...TYPE.bodySm, color: vt.onSurfaceVariant }}>{t.when}</Text>
                  <View
                    style={{
                      width: 4,
                      height: 4,
                      borderRadius: R.full,
                      backgroundColor: t.muted ? vt.secondary : vt.primaryFixed,
                    }}
                  />
                  <Text
                    style={{ ...TYPE.labelSm, color: t.muted ? vt.secondary : vt.primaryFixed }}
                  >
                    {t.status}
                  </Text>
                </View>
              </View>
            </View>

            <Text style={{ ...TYPE.headlineMd, color: t.accent ? vt.primaryFixed : vt.primary }}>
              {t.amount}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}
