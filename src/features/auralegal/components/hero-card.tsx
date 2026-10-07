import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, Text, View } from 'react-native';

import { R, SP, TYPE, al, alpha } from '../theme';

import { AmbientGlow } from './ambient-glow';
import { StatusDot } from './status-dot';
import { Symbol } from './symbol';

/**
 * The lavender profile card at the front of the deck.
 *
 * Three things here are not what they look like:
 *
 * The name and location are set in `on-surface` — a near-white meant for the
 * dark canvas — on a lavender card, which is why they read washed out rather
 * than crisp. That is the export's own choice and the renders agree, so it is
 * kept; correcting it to `on-primary-container` would be a different design.
 *
 * The portrait is not a cutout. It is a plain `object-cover object-top` photo
 * filling the right 56% of the card from 24dp below the top, carrying its own
 * studio backdrop. The soft left edge in the reference is the photograph's own
 * blur, not a mask.
 *
 * The footer sits over a gradient that fades the card colour up into
 * transparency, so the text stays legible where it crosses the photo. That is a
 * real `LinearGradient` rather than a baked image: the card beneath it is a flat
 * fill, so nothing needs compositing.
 */
export function HeroCard({
  name,
  casesLabel,
  cases,
  place,
  availability,
  portrait,
  width,
  onMessage,
  onCall,
  onOpen,
}: {
  name: string;
  casesLabel: string;
  cases: string;
  place: string;
  availability: string;
  portrait: number;
  width: number;
  onMessage?: () => void;
  onCall?: () => void;
  onOpen?: () => void;
}) {
  return (
    <View
      style={{
        borderRadius: 28,
        shadowColor: '#000000',
        shadowOpacity: 0.65,
        shadowRadius: 22,
        shadowOffset: { width: 0, height: 22 },
        elevation: 14,
      }}
    >
      <View
        style={{
          width,
          height: 375,
          borderRadius: 28,
          overflow: 'hidden',
          backgroundColor: al.primaryContainer,
          justifyContent: 'space-between',
        }}
      >
        <AmbientGlow color={al.white} size={192} opacity={0.2} top={-48} right={-48} />

        <View style={{ padding: SP.md + 4, maxWidth: '62%' }}>
          <View
            style={{
              alignSelf: 'flex-start',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 6,
              paddingHorizontal: SP.md - 4,
              paddingVertical: 6,
              borderRadius: R.full,
              backgroundColor: al.surface,
              marginBottom: SP.md - 4,
            }}
          >
            <Text style={{ ...TYPE.labelSm, color: al.onSurface }}>{casesLabel}</Text>
            <Text style={{ ...TYPE.labelSm, color: al.secondary }}>{cases}</Text>
          </View>

          <Text style={{ ...TYPE.headlineXlMobile, letterSpacing: -0.52, color: al.onSurface }}>
            {name}
          </Text>

          <View
            style={{ flexDirection: 'row', alignItems: 'center', gap: SP.xs, marginTop: SP.xs }}
          >
            <Symbol name="locationOn" size={15} color={alpha(al.onSurface, 0.8)} />
            <Text style={{ ...TYPE.labelMd, color: alpha(al.onSurface, 0.8) }}>{place}</Text>
          </View>

          <View style={{ flexDirection: 'row', gap: 10, marginTop: SP.md + 4 }}>
            <QuickAction
              icon="forum"
              label={`Chat with ${name.replace('\n', ' ')}`}
              onPress={onMessage}
            />
            <QuickAction icon="call" label={`Call ${name.replace('\n', ' ')}`} onPress={onCall} />
          </View>
        </View>

        <View
          style={{
            position: 'absolute',
            right: 0,
            top: SP.lg,
            bottom: 0,
            width: '56%',
          }}
        >
          <Image
            source={portrait}
            style={{ width: '100%', height: '100%' }}
            contentFit="cover"
            contentPosition="top"
          />
        </View>

        <LinearGradient
          colors={[
            alpha(al.primaryContainer, 0),
            alpha(al.primaryContainer, 0.8),
            al.primaryContainer,
          ]}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: SP.md + 4,
            paddingTop: SP.sm,
            paddingBottom: SP.md,
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <StatusDot size={8} />
            <Text style={{ ...TYPE.labelSm, color: al.onPrimaryContainer }}>{availability}</Text>
          </View>

          <Pressable onPress={onOpen} accessibilityRole="button" accessibilityLabel="Open profile">
            <View
              style={{
                width: 32,
                height: 32,
                borderRadius: R.full,
                backgroundColor: alpha(al.surface, 0.3),
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Symbol name="arrowForward" size={18} color={al.onSurface} />
            </View>
          </Pressable>
        </LinearGradient>
      </View>
    </View>
  );
}

/** One of the two 44dp contact buttons on the card. */
function QuickAction({
  icon,
  label,
  onPress,
}: {
  icon: 'forum' | 'call';
  label: string;
  onPress?: () => void;
}) {
  return (
    <Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel={label}>
      <View
        style={{
          width: 44,
          height: 44,
          borderRadius: R.full,
          backgroundColor: al.surface,
          alignItems: 'center',
          justifyContent: 'center',
          shadowColor: '#000000',
          shadowOpacity: 0.3,
          shadowRadius: 8,
          shadowOffset: { width: 0, height: 4 },
          elevation: 5,
        }}
      >
        <Symbol name={icon} size={20} color={al.onSurface} />
      </View>
    </Pressable>
  );
}
