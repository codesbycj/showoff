import { Image } from 'expo-image';
import { Pressable, Text, View } from 'react-native';

import { Card } from './bits';
import { Symbol } from './symbol';
import { PRODUCT, type Size } from '../data/product';
import { FONT, LEVEL, R, TYPE, rb } from '../theme';

/**
 * The product hero — the cup photograph on a warm plate, with a temperature
 * chip above it and an extraction note below.
 *
 * The plate is a tinted rounded block rather than a cut-out: the photograph
 * ships with its own café background, and masking a cup out of it would leave
 * the halo `AGENTS.md` warns about. Letting the photo fill a rounded frame is
 * both honest and what the reference does.
 */
export function ProductHero() {
  return (
    <View
      style={{
        backgroundColor: rb.surfaceLow,
        borderRadius: R.xl,
        padding: 16,
        alignItems: 'center',
      }}
    >
      <View
        style={{
          alignSelf: 'flex-start',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 5,
          backgroundColor: rb.crimsonTint,
          paddingHorizontal: 10,
          paddingVertical: 5,
          borderRadius: 999,
        }}
      >
        <Symbol name="localFireDepartment" size={15} color={rb.crimson} />
        <Text style={[TYPE.labelLg, { color: rb.crimsonDeep }]}>{PRODUCT.temperature}</Text>
      </View>

      <Image
        source={require('../../../../assets/images/redbrew/cup-hero.jpg')}
        style={{ width: 224, height: 224, borderRadius: R.lg, marginVertical: 12 }}
        contentFit="cover"
      />

      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
        <Symbol name="verified" size={17} color={rb.mint} />
        <Text style={[TYPE.labelLg, { color: rb.secondary }]}>{PRODUCT.extraction}</Text>
      </View>
    </View>
  );
}

/** The three cup-size buttons. The selected one goes solid crimson. */
export function SizePicker({
  sizes,
  selected,
  onSelect,
}: {
  sizes: Size[];
  selected: string;
  onSelect?: (key: string) => void;
}) {
  return (
    <View style={{ flexDirection: 'row', gap: 10 }}>
      {sizes.map((s) => {
        const on = s.key === selected;

        return (
          <Pressable key={s.key} style={{ flex: 1 }} onPress={() => onSelect?.(s.key)}>
            <View
              style={{
                paddingVertical: 12,
                borderRadius: R.md,
                alignItems: 'center',
                gap: 2,
                backgroundColor: on ? rb.crimson : rb.surfaceLow,
              }}
            >
              <Text
                style={{
                  fontFamily: FONT.displayBold,
                  fontSize: 18,
                  lineHeight: 24,
                  color: on ? rb.onCrimson : rb.ink,
                }}
              >
                {s.short}
              </Text>
              <Text style={[TYPE.labelSm, { color: on ? 'rgba(255,255,255,0.8)' : rb.secondary }]}>
                {s.label}
              </Text>
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}

/** The milk options — same selected treatment, one line of text each. */
export function MilkPicker({
  milks,
  selected,
  onSelect,
}: {
  milks: readonly string[];
  selected: string;
  onSelect?: (m: string) => void;
}) {
  return (
    <View style={{ flexDirection: 'row', gap: 10 }}>
      {milks.map((m) => {
        const on = m === selected;

        return (
          <Pressable key={m} style={{ flex: 1 }} onPress={() => onSelect?.(m)}>
            <View
              style={{
                paddingVertical: 11,
                borderRadius: R.md,
                alignItems: 'center',
                backgroundColor: on ? rb.crimson : rb.surfaceLow,
              }}
            >
              <Text style={[TYPE.labelMd, { color: on ? rb.onCrimson : rb.ink }]}>{m}</Text>
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}

/** The roast-strength row, with its four-bar meter. */
export function RoastRow() {
  return (
    <Card padding={12}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 }}>
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: R.md,
              backgroundColor: rb.surfaceLow,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Symbol name="coffeeMaker" size={21} color={rb.ink} />
          </View>

          <View style={{ flex: 1 }}>
            <Text style={[TYPE.titleMd, { color: rb.ink }]}>{PRODUCT.roastTitle}</Text>
            <Text style={[TYPE.bodyMd, { color: rb.secondary }]} numberOfLines={1}>
              {PRODUCT.roastSub}
            </Text>
          </View>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 3 }}>
          {[0, 1, 2, 3].map((i) => (
            <View
              key={i}
              style={{
                width: 5,
                height: 10 + i * 4,
                borderRadius: 2.5,
                backgroundColor: i < PRODUCT.roastLevel ? rb.crimson : rb.surfaceHigh,
              }}
            />
          ))}
        </View>
      </View>
    </Card>
  );
}

/** The express-delivery strip above the CTA. */
export function DeliveryRow() {
  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: rb.mintTint,
          borderRadius: R.md,
          paddingHorizontal: 12,
          paddingVertical: 10,
        },
      ]}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
        <Symbol name="bolt" size={17} color="#047857" />
        <Text style={[TYPE.labelLg, { color: '#047857' }]}>{PRODUCT.deliveryLabel}</Text>
      </View>
      <Text style={[TYPE.labelLg, { color: '#047857' }]}>{PRODUCT.deliveryTime}</Text>
    </View>
  );
}

/** The screen title bar — back, title, overflow, avatar. */
export function DetailHeader({
  title,
  avatar,
  onBack,
  onMore,
  onAvatar,
}: {
  title: string;
  avatar: number;
  onBack?: () => void;
  onMore?: () => void;
  onAvatar?: () => void;
}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 10,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, flex: 1 }}>
        <Pressable onPress={onBack} accessibilityRole="button" accessibilityLabel="Go back">
          <View
            style={[
              {
                width: 38,
                height: 38,
                borderRadius: 19,
                backgroundColor: rb.surface,
                alignItems: 'center',
                justifyContent: 'center',
              },
              LEVEL.card,
            ]}
          >
            <Symbol name="arrowBack" size={20} color={rb.ink} />
          </View>
        </Pressable>

        <Text style={[TYPE.titleLg, { color: rb.ink }]} numberOfLines={1}>
          {title}
        </Text>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
        <Pressable onPress={onMore} accessibilityRole="button" accessibilityLabel="More">
          <Symbol name="moreHoriz" size={24} color={rb.ink} />
        </Pressable>

        <Pressable onPress={onAvatar} accessibilityRole="button" accessibilityLabel="Account">
          <Image
            source={avatar}
            style={{
              width: 36,
              height: 36,
              borderRadius: 18,
              borderWidth: 2,
              borderColor: rb.surfaceHigh,
            }}
            contentFit="cover"
          />
        </Pressable>
      </View>
    </View>
  );
}
