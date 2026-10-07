import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowRight } from 'lucide-react-native';
import { Pressable, Text, View } from 'react-native';

import { FONT, R, SP, vt } from '../theme';

/**
 * The "Nigeria Decides" banner: a pale green wash with the polling-station
 * photograph bleeding in from the right.
 *
 * The photograph is absolutely positioned rather than a flex sibling, and it
 * carries a horizontal fade on its leading edge. That fade is doing real work —
 * it is what lets the headline run *under* the image's left edge instead of
 * being boxed away from it, which is how the export keeps "Nigeria Decides" on
 * one line inside a column narrower than the words.
 */
const ART_WIDTH = '42%';

export function HeroBanner({
  kicker,
  title,
  blurb,
  cta,
  art,
  onPress,
}: {
  kicker: string;
  title: string;
  blurb: string;
  cta: string;
  art: number;
  onPress?: () => void;
}) {
  return (
    <View
      style={{
        minHeight: 185,
        borderRadius: R.lg,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#D1FAE5',
        backgroundColor: vt.washVia,
      }}
    >
      <LinearGradient
        colors={[vt.washFrom, vt.washVia, vt.washTo]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ position: 'absolute', inset: 0 }}
      />

      <View
        style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: ART_WIDTH }}
        pointerEvents="none"
      >
        <Image source={art} style={{ width: '100%', height: '100%' }} contentFit="cover" />
        <LinearGradient
          colors={[vt.washVia, 'rgba(213, 242, 225, 0)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 32 }}
        />
      </View>

      <View
        style={{ padding: SP.margin, paddingRight: 0, justifyContent: 'space-between', flex: 1 }}
      >
        <View>
          <View
            style={{
              alignSelf: 'flex-start',
              backgroundColor: 'rgba(209, 250, 229, 0.9)',
              borderRadius: R.full,
              paddingHorizontal: 10,
              paddingVertical: 2,
            }}
          >
            <Text
              style={{
                fontFamily: FONT.black,
                fontSize: 10,
                lineHeight: 14,
                letterSpacing: 0.5,
                textTransform: 'uppercase',
                color: vt.forest,
              }}
            >
              {kicker}
            </Text>
          </View>

          <Text
            numberOfLines={1}
            style={{
              marginTop: SP.sm,
              fontFamily: FONT.black,
              fontSize: 24,
              lineHeight: 32,
              letterSpacing: -0.6,
              color: vt.washInk,
            }}
          >
            {title}
          </Text>

          <Text
            style={{
              marginTop: 6,
              width: '58%',
              fontFamily: FONT.medium,
              fontSize: 11,
              lineHeight: 17,
              color: vt.body,
            }}
          >
            {blurb}
          </Text>
        </View>

        <Pressable onPress={onPress} style={{ alignSelf: 'flex-start', marginTop: 14 }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 6,
              backgroundColor: vt.flag,
              borderRadius: R.full,
              paddingHorizontal: SP.md + 4,
              paddingVertical: SP.sm,
            }}
          >
            <Text style={{ fontFamily: FONT.bold, fontSize: 11, lineHeight: 15, color: vt.card }}>
              {cta}
            </Text>
            <ArrowRight size={14} color={vt.card} strokeWidth={2.5} />
          </View>
        </Pressable>
      </View>
    </View>
  );
}
