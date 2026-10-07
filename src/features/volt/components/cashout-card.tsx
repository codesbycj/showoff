import { Pressable, Text, View } from 'react-native';

import { type Preset } from '../data/wallet';
import { R, SP, TYPE, alpha, vt } from '../theme';

import { FilledIcon } from './filled-icon';
import { Symbol } from './symbol';

/**
 * The cashout module: presets, amount, destination and the transfer button.
 *
 * The amount is a `Text` rather than a `TextInput`, as everywhere else here — a
 * live field would raise the keyboard over the panel mid-take. The presets
 * select rather than type into it.
 *
 * `shadow-inner` on the amount cavity has no React Native equivalent; the
 * design system describes the intent as a recessed track, so it is drawn as the
 * deepest surface against a lighter card, which reads as sunken without a
 * shadow.
 */
export function CashoutCard({
  title,
  blurb,
  eta,
  amountLabel,
  max,
  amount,
  presets,
  selectedPreset,
  destinationLabel,
  change,
  card,
  cardNumber,
  bank,
  cta,
  security,
  onPreset,
  onTransfer,
}: {
  title: string;
  blurb: string;
  eta: string;
  amountLabel: string;
  max: string;
  amount: string;
  presets: readonly Preset[];
  selectedPreset: string;
  destinationLabel: string;
  change: string;
  card: string;
  cardNumber: string;
  bank: string;
  cta: string;
  security: string;
  onPreset?: (key: string) => void;
  onTransfer?: () => void;
}) {
  return (
    <View
      style={{
        borderRadius: R.lg,
        backgroundColor: vt.surfaceContainerLow,
        padding: SP.lg,
        gap: SP.lg,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, flexShrink: 1 }}>
          <View
            style={{
              width: 36,
              height: 36,
              borderRadius: R.full,
              backgroundColor: alpha(vt.primaryFixed, 0.2),
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <FilledIcon name="electricBolt" size={20} color={vt.primaryFixed} />
          </View>
          <View style={{ flexShrink: 1 }}>
            <Text style={{ ...TYPE.headlineMd, color: vt.primary }}>{title}</Text>
            <Text numberOfLines={1} style={{ ...TYPE.bodySm, color: vt.primaryFixed }}>
              {blurb}
            </Text>
          </View>
        </View>

        <View
          style={{
            paddingHorizontal: 10,
            paddingVertical: SP.xs,
            borderRadius: R.full,
            backgroundColor: vt.surfaceContainerHigh,
          }}
        >
          <Text style={{ ...TYPE.labelSm, color: vt.secondary }}>{eta}</Text>
        </View>
      </View>

      <View style={{ gap: SP.sm }}>
        <View
          style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
        >
          <Text style={{ ...TYPE.labelMd, color: vt.secondary }}>{amountLabel}</Text>
          <Text style={{ ...TYPE.labelSm, color: vt.onSurfaceVariant }}>{max}</Text>
        </View>

        <View style={{ flexDirection: 'row', gap: SP.sm }}>
          {presets.map((p) => {
            const on = p.key === selectedPreset;
            return (
              <Pressable key={p.key} style={{ flex: 1 }} onPress={() => onPreset?.(p.key)}>
                <View
                  style={{
                    alignItems: 'center',
                    paddingVertical: 10,
                    borderRadius: R.full,
                    backgroundColor: on ? vt.primaryFixed : vt.surfaceContainer,
                    shadowColor: vt.primaryFixed,
                    shadowOpacity: on ? 0.35 : 0,
                    shadowRadius: 12,
                    shadowOffset: { width: 0, height: 0 },
                  }}
                >
                  <Text style={{ ...TYPE.labelMd, color: on ? vt.onPrimaryFixed : vt.secondary }}>
                    {p.label}
                  </Text>
                </View>
              </Pressable>
            );
          })}
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          borderRadius: R.full,
          backgroundColor: vt.surfaceContainerLowest,
          paddingHorizontal: SP.md,
          paddingVertical: SP.md,
        }}
      >
        <Text style={{ ...TYPE.headlineMd, marginRight: SP.xs, color: vt.primaryFixed }}>$</Text>
        <Text style={{ ...TYPE.headlineMd, flex: 1, color: vt.primary }}>{amount}</Text>
        <Symbol name="cancel" size={18} color={vt.secondary} />
      </View>

      <View
        style={{
          borderRadius: R.lg,
          backgroundColor: vt.surfaceContainer,
          padding: SP.md,
          gap: SP.sm,
        }}
      >
        <View
          style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
        >
          <Text style={{ ...TYPE.labelSm, letterSpacing: 0.8, color: vt.secondary }}>
            {destinationLabel.toUpperCase()}
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
            <Text style={{ ...TYPE.labelSm, color: vt.primaryFixed }}>{change}</Text>
            <Symbol name="expandMore" size={14} color={vt.primaryFixed} />
          </View>
        </View>

        <View
          style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: SP.md, flexShrink: 1 }}>
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: R.full,
                backgroundColor: vt.surfaceContainerHighest,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Symbol name="creditCard" size={20} color={vt.primary} />
            </View>

            <View style={{ flexShrink: 1 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: SP.sm }}>
                <Text style={{ ...TYPE.labelLg, color: vt.primary }}>{card}</Text>
                <View
                  style={{
                    paddingHorizontal: 6,
                    paddingVertical: 1,
                    borderRadius: R.sm,
                    backgroundColor: vt.surfaceContainerHigh,
                  }}
                >
                  <Text style={{ ...TYPE.labelSm, color: vt.onSurface }}>{cardNumber}</Text>
                </View>
              </View>
              <View
                style={{ flexDirection: 'row', alignItems: 'center', gap: SP.xs, marginTop: 2 }}
              >
                <View
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: R.full,
                    backgroundColor: vt.primaryFixed,
                  }}
                />
                <Text numberOfLines={1} style={{ ...TYPE.bodySm, color: vt.onSurfaceVariant }}>
                  {bank}
                </Text>
              </View>
            </View>
          </View>

          <FilledIcon name="checkCircle" size={20} color={vt.primaryFixed} />
        </View>
      </View>

      <View style={{ gap: SP.md }}>
        <Pressable onPress={onTransfer}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: SP.sm,
              paddingVertical: SP.gutter,
              borderRadius: R.full,
              backgroundColor: vt.primaryFixed,
              shadowColor: vt.primaryFixed,
              shadowOpacity: 0.5,
              shadowRadius: 24,
              shadowOffset: { width: 0, height: 0 },
              elevation: 8,
            }}
          >
            <FilledIcon name="bolt" size={22} color={vt.onPrimaryFixed} />
            <Text numberOfLines={1} style={{ ...TYPE.headlineMd, color: vt.onPrimaryFixed }}>
              {cta}
            </Text>
          </View>
        </Pressable>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: SP.sm,
          }}
        >
          <Symbol name="lock" size={14} color={vt.primaryFixed} />
          <Text style={{ ...TYPE.labelSm, color: vt.secondary }}>{security}</Text>
        </View>
      </View>
    </View>
  );
}
