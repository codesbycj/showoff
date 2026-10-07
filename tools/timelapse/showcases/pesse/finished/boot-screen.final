import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AssuranceTile } from '@/features/pesse/components/assurance-tile';
import { BootProgress } from '@/features/pesse/components/boot-progress';
import { PesseMark, Wordmark } from '@/features/pesse/components/pesse-mark';
import { Symbol } from '@/features/pesse/components/symbol';
import { BOOT } from '@/features/pesse/data/boot';
import { R, SP, TYPE, ps, pesseTheme } from '@/features/pesse/theme';

/**
 * Screen 1 — boot.
 *
 * It advances itself: five status lines on a 700ms beat, then it replaces
 * itself with the home screen. `router.replace`, not `push`, so the back
 * gesture from home does not land on a splash that has already finished.
 *
 * The interval is cleared on unmount. Without that, a reveal that navigates
 * away mid-sequence leaves a timer running against a screen that is gone, and
 * it fires a `replace` back onto whatever the recording moved to.
 */
export default function PesseBoot() {
  const insets = useSafeAreaInsets();
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (step >= BOOT.sequence.length - 1) {
      const done = setTimeout(() => router.replace('/pesse/home'), BOOT.stepMs * 2);
      return () => clearTimeout(done);
    }
    const next = setTimeout(() => setStep((s) => s + 1), BOOT.stepMs);
    return () => clearTimeout(next);
  }, [step]);

  const { progress, status } = BOOT.sequence[step];

  return (
    <View style={[pesseTheme, { flex: 1, backgroundColor: ps.surface }]}>
      <StatusBar style="dark" />

      {/* The lime wash across the top-right, behind everything. */}
      <LinearGradient
        colors={['rgba(196,240,0,0.26)', 'rgba(196,240,0,0.10)', 'rgba(196,240,0,0)']}
        locations={[0, 0.34, 0.62]}
        start={{ x: 1, y: 0 }}
        end={{ x: 0.05, y: 0.9 }}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
      />

      <View
        style={{
          flex: 1,
          paddingHorizontal: SP.margin,
          paddingTop: insets.top + SP.md,
          paddingBottom: Math.max(insets.bottom, 12) + SP.sm,
        }}
      >
        <View
          style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 6,
              paddingHorizontal: 12,
              paddingVertical: 6,
              borderRadius: R.full,
              backgroundColor: ps.surfaceContainer,
            }}
          >
            <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: ps.limeDim }} />
            <Text style={[TYPE.labelSm, { color: ps.secondary }]}>{BOOT.mainnet}</Text>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <Symbol name="lock" size={18} color={ps.secondary} />
            <Text style={[TYPE.labelSm, { color: ps.secondary }]}>{BOOT.tls}</Text>
          </View>
        </View>

        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <PesseMark size={96} />

          <View style={{ marginTop: SP.lg }}>
            <Wordmark size={30} />
          </View>

          <Text
            style={[
              TYPE.bodyMd,
              { color: ps.secondary, textAlign: 'center', maxWidth: 280, marginTop: SP.xs },
            ]}
          >
            {BOOT.tagline}
          </Text>

          <View style={{ marginTop: SP.xl, width: '100%', alignItems: 'center' }}>
            <BootProgress progress={progress} status={status} />
          </View>

          <View
            style={{ flexDirection: 'row', gap: 8, maxWidth: 310, width: '100%', marginTop: SP.lg }}
          >
            {BOOT.assurances.map((a) => (
              <AssuranceTile key={a.key} icon={a.icon} label={a.label} />
            ))}
          </View>
        </View>

        <View style={{ alignItems: 'center', gap: 12 }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 8,
              paddingHorizontal: 12,
              paddingVertical: 6,
              borderRadius: R.full,
              backgroundColor: ps.surfaceLowest,
            }}
          >
            <Symbol name="security" size={16} color={ps.olive} />
            <Text style={[TYPE.labelSm, { color: ps.onSurface }]}>{BOOT.encryption}</Text>
          </View>

          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: ps.lime }} />
              <Text style={[TYPE.labelSm, { color: ps.secondary }]}>{BOOT.version}</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
              <Text style={[TYPE.labelSm, { color: ps.secondary }]}>{BOOT.issuer}</Text>
              <Symbol name="verified" size={14} color={ps.secondary} />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
