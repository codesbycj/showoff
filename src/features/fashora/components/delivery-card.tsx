import { Image } from 'expo-image';
import { Pressable, Text, View } from 'react-native';

import { ELEV, FONT, R, SP, TYPE, fa } from '../theme';

import { Symbol } from './symbol';

/**
 * The one order in flight: reference, progress bar, item thumbnails, and the
 * tracking button.
 *
 * The bar is drawn at a fixed 70%, which is what the export hard-codes. There
 * is no shipment behind it to derive a fraction from, so the number is content
 * and lives in the data file with the rest of the order.
 *
 * The thumbnails overlap by 8dp (`-space-x-2`) and the "+1" counter sits on
 * top of the second one. In React Native that is a negative margin on every
 * tile after the first, which is exactly what the utility compiles to.
 */
export function DeliveryCard({
  reference,
  placed,
  from,
  to,
  progress,
  thumbs,
  extra,
  cta,
  onTrack,
}: {
  reference: string;
  placed: string;
  from: string;
  to: string;
  progress: number;
  thumbs: readonly number[];
  extra: string;
  cta: string;
  onTrack?: () => void;
}) {
  return (
    <View
      style={{
        backgroundColor: fa.surfaceContainerLowest,
        padding: SP.md,
        borderRadius: R.lg,
        gap: SP.gutterMobile,
        ...ELEV.card,
      }}
    >
      <View
        style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: SP.sm }}>
          <View
            style={{
              width: 8,
              height: 8,
              borderRadius: R.full,
              backgroundColor: fa.primaryContainer,
            }}
          />
          <Text style={{ ...TYPE.labelMd, fontFamily: FONT.bold, color: fa.onSurface }}>
            {reference}
          </Text>
        </View>
        <Text style={{ ...TYPE.bodySm, color: fa.secondary }}>{placed}</Text>
      </View>

      <View style={{ paddingVertical: SP.xs }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: SP.sm,
          }}
        >
          <Text style={{ ...TYPE.labelSm, fontFamily: FONT.semibold, color: fa.onSurface }}>
            {from}
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: SP.xs }}>
            <Symbol name="schedule" size={14} color={fa.primaryContainer} />
            <Text style={{ ...TYPE.labelSm, fontFamily: FONT.bold, color: fa.primaryContainer }}>
              {to}
            </Text>
          </View>
        </View>

        <View
          style={{
            height: 8,
            borderRadius: R.full,
            backgroundColor: fa.surfaceContainerHigh,
            overflow: 'hidden',
          }}
        >
          <View
            style={{
              width: `${progress * 100}%`,
              height: '100%',
              borderRadius: R.full,
              backgroundColor: fa.primaryContainer,
            }}
          />
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: SP.xs,
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {thumbs.map((src, i) => (
            <Image
              key={i}
              source={src}
              style={{
                width: 48,
                height: 48,
                borderRadius: R.DEFAULT,
                backgroundColor: fa.surfaceContainerHigh,
                marginLeft: i === 0 ? 0 : -SP.sm,
              }}
              contentFit="cover"
            />
          ))}
          <View
            style={{
              width: 32,
              height: 32,
              borderRadius: R.full,
              backgroundColor: fa.surfaceContainerHighest,
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: -SP.sm,
            }}
          >
            <Text
              style={{ fontFamily: FONT.bold, fontSize: 11, lineHeight: 14, color: fa.secondary }}
            >
              {extra}
            </Text>
          </View>
        </View>

        <Pressable onPress={onTrack} accessibilityRole="button">
          <View
            style={{
              height: 40,
              paddingHorizontal: 20,
              borderRadius: R.full,
              backgroundColor: fa.onSurface,
              flexDirection: 'row',
              alignItems: 'center',
              gap: SP.xs,
              ...ELEV.card,
            }}
          >
            <Text style={{ ...TYPE.labelMd, color: fa.onPrimary }}>{cta}</Text>
            <Symbol name="arrowForward" size={16} color={fa.onPrimary} />
          </View>
        </Pressable>
      </View>
    </View>
  );
}
