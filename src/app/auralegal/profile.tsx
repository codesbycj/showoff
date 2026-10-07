import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AmbientGlow } from '@/features/auralegal/components/ambient-glow';
import { AppHeader } from '@/features/auralegal/components/app-header';
import { BioCard } from '@/features/auralegal/components/bio-card';
import { EndorsementCard } from '@/features/auralegal/components/endorsement-card';
import { MetricsTray } from '@/features/auralegal/components/metrics-tray';
import { PortraitCard } from '@/features/auralegal/components/portrait-card';
import { PrimaryButton } from '@/features/auralegal/components/primary-button';
import { ProfileMeta } from '@/features/auralegal/components/profile-meta';
import {
  BIO,
  CTA,
  ENDORSEMENT,
  HEADER,
  LAWYER,
  METRICS,
  SPECIALTIES,
} from '@/features/auralegal/data/profile';
import { SP, al, auralegalTheme } from '@/features/auralegal/theme';

/**
 * Screen 3 — the attorney profile.
 *
 * The header is outside the scroll view and the content is padded under it,
 * which is what the export's `fixed` header plus `pt-16` on `main` amounts to.
 *
 * The CTA sits at the end of the content rather than floating. The export marks
 * it `sticky bottom-4`, but its own render puts it below the endorsement card
 * at the foot of the page — on a screen this length there is nothing for it to
 * stick to — so it is built where the reference draws it.
 */
export default function AuralegalProfile() {
  const insets = useSafeAreaInsets();
  const [expanded, setExpanded] = useState(false);

  return (
    <View style={[auralegalTheme, { flex: 1, backgroundColor: al.surface }]}>
      <StatusBar style="light" />

      <AmbientGlow color={al.primaryContainer} size={400} opacity={0.15} top={-110} left={-20} />
      <AmbientGlow color={al.secondary} size={330} opacity={0.1} top={420} right={-120} />

      <View style={{ paddingTop: insets.top }}>
        <AppHeader title={HEADER.title} avatar={HEADER.avatar} onBack={() => router.back()} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: SP.margin,
          paddingBottom: insets.bottom + 48,
        }}
      >
        <ProfileMeta name={LAWYER.name} place={LAWYER.place} />

        <PortraitCard portrait={LAWYER.portrait} specialty={LAWYER.specialty} />

        <View style={{ height: SP.lg }} />

        <MetricsTray metrics={METRICS} />

        <BioCard
          pill={BIO.pill}
          credential={BIO.credential}
          summary={BIO.summary}
          rest={BIO.rest}
          more={BIO.more}
          less={BIO.less}
          specialties={SPECIALTIES}
          expanded={expanded}
          onToggle={() => setExpanded((v) => !v)}
        />

        <EndorsementCard
          title={ENDORSEMENT.title}
          subtitle={ENDORSEMENT.subtitle}
          badge={ENDORSEMENT.badge}
        />

        <View style={{ marginTop: SP.md + 8 }}>
          <PrimaryButton label={CTA} onPress={() => router.push('/auralegal/booking')} />
        </View>
      </ScrollView>
    </View>
  );
}
