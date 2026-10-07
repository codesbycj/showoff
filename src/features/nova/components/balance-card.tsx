import { type ReactNode } from 'react';
import { Pressable, Text, View } from 'react-native';

import { DeltaPill } from './bits';
import { Icon } from './icon';
import { FONT, LEVEL, R, TYPE, nv } from '../theme';

/**
 * The royal-blue balance card the dashboard and the wallet both open with.
 *
 * Two details make it: a lime sliver peeking out from behind the top edge, and
 * a blurred lighter-blue orb bleeding off the top-right corner inside it.
 *
 * The sliver is a separate View *behind* the card rather than part of it, and
 * is inset 24dp on each side so it reads as a second card stacked underneath —
 * which is what the reference is drawing. The orb is inside, so the card clips;
 * that means the card cannot also carry elevation, because a clip and an
 * elevation on one View is the pairing Android renders unreliably. The blue
 * glow therefore lives on an outer wrapper.
 *
 * `children` is the action row, which differs between the two screens — three
 * buttons inside the card on the dashboard, four outside it on the wallet.
 */
export function BalanceCard({
  scope,
  label,
  amount,
  cents,
  delta,
  deltaAmount,
  deltaNote,
  avatar,
  children,
  onScope,
}: {
  scope: string;
  label: string;
  /** The whole-dollar part, set large. */
  amount: string;
  /** The decimal part, set smaller and dimmer. */
  cents: string;
  delta: string;
  deltaAmount?: string;
  deltaNote?: string;
  avatar: ReactNode;
  children?: ReactNode;
  onScope?: () => void;
}) {
  return (
    <View>
      {/* The lime layer peeking out from behind the top edge. */}
      <View
        style={{
          position: 'absolute',
          top: -6,
          left: 24,
          right: 24,
          height: 28,
          borderTopLeftRadius: R.lg,
          borderTopRightRadius: R.lg,
          backgroundColor: nv.lime,
          opacity: 0.9,
        }}
      />

      <View style={[{ borderRadius: R.xl }, LEVEL.blue]}>
        <View
          style={{
            borderRadius: R.xl,
            backgroundColor: nv.blue,
            padding: 20,
            overflow: 'hidden',
          }}
        >
          {/* The lighter-blue bloom bleeding off the top-right corner. */}
          <View
            style={{
              position: 'absolute',
              top: -48,
              right: -48,
              width: 160,
              height: 160,
              borderRadius: 80,
              backgroundColor: nv.blueGlow,
              opacity: 0.5,
            }}
          />

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 16,
            }}
          >
            <Pressable
              onPress={onScope}
              accessibilityRole="button"
              style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}
            >
              <View
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 14,
                  backgroundColor: 'rgba(255,255,255,0.15)',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Icon name="wallet" size={14} color="#ffffff" strokeWidth={2.2} />
              </View>

              <Text
                style={{
                  fontFamily: FONT.semibold,
                  fontSize: 13,
                  lineHeight: 18,
                  color: 'rgba(255,255,255,0.92)',
                }}
              >
                {scope}
              </Text>

              <Icon name="chevronDown" size={13} color="rgba(255,255,255,0.7)" />
            </Pressable>

            {avatar}
          </View>

          <Text
            style={{
              fontFamily: FONT.medium,
              fontSize: 12,
              lineHeight: 16,
              letterSpacing: 0.2,
              color: 'rgba(219,234,254,0.8)',
              marginBottom: 2,
            }}
          >
            {label}
          </Text>

          <Text style={[TYPE.balance, { color: '#ffffff', marginBottom: 12 }]}>
            {amount}
            <Text
              style={{
                fontFamily: FONT.bold,
                fontSize: 20,
                color: 'rgba(255,255,255,0.8)',
              }}
            >
              {cents}
            </Text>
          </Text>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingTop: 4,
              borderTopWidth: 1,
              borderTopColor: 'rgba(255,255,255,0.1)',
              marginBottom: children ? 16 : 0,
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              <DeltaPill value={delta} up onDark />
              {deltaAmount ? (
                <Text
                  style={{
                    fontFamily: FONT.regular,
                    fontSize: 11,
                    lineHeight: 15,
                    color: 'rgba(255,255,255,0.75)',
                  }}
                >
                  {deltaAmount}
                </Text>
              ) : null}
            </View>

            {deltaNote ? (
              <Text
                style={{
                  fontFamily: FONT.medium,
                  fontSize: 11,
                  lineHeight: 15,
                  color: 'rgba(255,255,255,0.6)',
                }}
              >
                {deltaNote}
              </Text>
            ) : null}
          </View>

          {children}
        </View>
      </View>
    </View>
  );
}

/** The initials disc in the card's top-right, on the dashboard. */
export function InitialsAvatar({ initials }: { initials: string }) {
  return (
    <View
      style={{
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: nv.lime,
        borderWidth: 2,
        borderColor: 'rgba(255,255,255,0.3)',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text style={{ fontFamily: FONT.bold, fontSize: 11, color: nv.ink }}>{initials}</Text>
    </View>
  );
}

/** One of the three buttons inside the dashboard's card. */
export function CardAction({
  icon,
  label,
  solid,
  limeIcon,
  onPress,
}: {
  icon: 'deposit' | 'trade' | 'earn';
  label: string;
  /** The first button is solid white; the others are translucent. */
  solid?: boolean;
  limeIcon?: boolean;
  onPress?: () => void;
}) {
  return (
    <Pressable style={{ flex: 1 }} onPress={onPress} accessibilityRole="button">
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 5,
          paddingVertical: 10,
          paddingHorizontal: 8,
          borderRadius: R.base,
          backgroundColor: solid ? '#ffffff' : 'rgba(255,255,255,0.15)',
        }}
      >
        <Icon
          name={icon}
          size={14}
          color={limeIcon ? nv.lime : solid ? nv.ink : '#ffffff'}
          strokeWidth={2.2}
        />
        <Text
          style={{
            fontFamily: FONT.bold,
            fontSize: 12,
            lineHeight: 16,
            letterSpacing: -0.12,
            color: solid ? nv.ink : '#ffffff',
          }}
        >
          {label}
        </Text>
      </View>
    </Pressable>
  );
}
