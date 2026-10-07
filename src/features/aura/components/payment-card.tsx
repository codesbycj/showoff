import { LinearGradient } from 'expo-linear-gradient';
import { Text, View } from 'react-native';

import { R, SP, TYPE, au } from '../theme';

/**
 * The card face.
 *
 * Home and Wallet show the same card with different furniture around the same
 * middle — a label, the balance, and the masked number — so that middle lives
 * here and everything else arrives as `topRight` and `footer` nodes. Trying to
 * cover both with flags would mean four of them.
 *
 * The masked digits are drawn as dots rather than typed bullets: a bullet's
 * size and baseline vary by family, and these have to sit on the numerals' own
 * centre line next to the four visible digits.
 */
export function PaymentCard({
  balanceLabel,
  balance,
  digits,
  topRight,
  footer,
  ramp = au.cardRamp,
}: {
  balanceLabel: string;
  balance: string;
  digits: string;
  topRight?: React.ReactNode;
  footer?: React.ReactNode;
  ramp?: readonly [string, string];
}) {
  return (
    <LinearGradient
      colors={ramp}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ borderRadius: R.lg, padding: SP.md + 4 }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
        <View style={{ flex: 1 }}>
          <Text style={[TYPE.labelMd, { color: 'rgba(255,255,255,0.78)' }]}>{balanceLabel}</Text>
          <Text style={[TYPE.numericHero, { marginTop: 6, color: au.onPrimary }]}>{balance}</Text>
        </View>
        {topRight}
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: SP.lg }}>
        {[0, 1, 2].map((group) => (
          <View key={group} style={{ flexDirection: 'row', marginRight: 14 }}>
            {[0, 1, 2, 3].map((i) => (
              <View
                key={i}
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: 3,
                  marginRight: 5,
                  backgroundColor: au.onPrimary,
                }}
              />
            ))}
          </View>
        ))}
        <Text style={[TYPE.headlineSm, { color: au.onPrimary, letterSpacing: 1.5 }]}>{digits}</Text>
      </View>

      {footer ? <View style={{ marginTop: SP.md + 2 }}>{footer}</View> : null}
    </LinearGradient>
  );
}
