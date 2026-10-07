import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Star } from 'lucide-react-native';
import { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// STEP 3.05 the location capsules
// import { Capsule } from '@/features/jobfinder/components/capsule';
// STEP 3.03 the paired discs
// import { DoubleBadge } from '@/features/jobfinder/components/double-badge';
import { IconButton } from '@/features/jobfinder/components/icon-button';
// STEP 3.09 a numbered line
// import { NumberedItem } from '@/features/jobfinder/components/numbered-item';
// STEP 3.07 a block you read rather than tap
// import { Panel } from '@/features/jobfinder/components/panel';
// STEP 3.12 the thing you came here to press
// import { PillButton } from '@/features/jobfinder/components/pill-button';
// STEP 3.01 back, title, star
// import { ScreenHead } from '@/features/jobfinder/components/screen-head';
import { DETAIL, JOB_DETAILS } from '@/features/jobfinder/data/job-detail';
import { JOBS } from '@/features/jobfinder/data/jobs';
import { FONT, SP, TYPE, jf, jobfinderTheme } from '@/features/jobfinder/theme';

/**
 * Screen 3 — the job detail.
 *
 * Which job it shows comes in as a route param, defaulting to the listing the
 * reference writes this page for. That keeps the feed's navigation honest: every
 * card opens the page for the job it names, rather than four cards opening one
 * hard-coded page.
 *
 * The CTA floats over the scroll behind a gradient that fades the page out under
 * it, which is what lets the last responsibility run beneath the button instead
 * of stopping short of it.
 */
export default function JobFinderJobDetail() {
  const insets = useSafeAreaInsets();
  const { key } = useLocalSearchParams<{ key?: string }>();
  const [starred, setStarred] = useState(true);

  const job = JOBS.find((j) => j.key === key) ?? JOBS[0];
  const detail = JOB_DETAILS[job.key];

  return (
    <View style={[jobfinderTheme, { flex: 1, backgroundColor: jf.bg }]}>
      <StatusBar style="dark" />

      <View style={{ paddingTop: insets.top + SP.md, paddingHorizontal: SP.gutter }}>
{/* STEP 3.02 name the role
        <ScreenHead
          title={job.title}
          bare
          onBack={() => router.back()}
          right={
            <IconButton
              icon={Star}
              size={40}
              glyph={20}
              tone="transparent"
              inkTone={starred ? jf.ink : jf.muted}
              fill={starred ? jf.ink : undefined}
              strokeWidth={2}
              onPress={() => setStarred((s) => !s)}
              accessibilityLabel="Bookmark job"
            />
          }
        />
*/}
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: SP.gutter,
          paddingTop: SP.sm,
          paddingBottom: 112 + insets.bottom,
        }}
      >
        <View style={{ alignItems: 'center', paddingTop: SP.sm, paddingBottom: SP.xl }}>
{/* STEP 3.04 who is hiring
          <DoubleBadge brand={job.brand} fill={job.brandBg} size={80} />
*/}

{/* STEP 3.11 what it pays
          <Text style={[TYPE.salaryHero, { color: jf.ink, marginTop: 20, marginBottom: 14 }]}>
            {detail.salary}
          </Text>
*/}

{/* STEP 3.06 where, and how
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: 8,
              // MISTAKE 3.14 the capsules lined up against the left edge
              alignSelf: 'stretch',
            }}
          >
            {detail.tags.map((t) => (
              <Capsule key={t} label={t} />
            ))}
          </View>
*/}
        </View>

{/* STEP 3.08 what the job is
        <Panel title={DETAIL.descriptionTitle}>
          <Text
            style={{
              fontFamily: FONT.regular,
              fontSize: 13.5,
              lineHeight: 21,
              color: 'rgba(25,26,30,0.9)',
              marginBottom: 12,
            }}
          >
            {detail.description}
          </Text>
          <Text
            style={{
              fontFamily: FONT.regular,
              fontSize: 12.5,
              lineHeight: 20,
              color: jf.dim,
            }}
          >
            {detail.note}
            <Text
              style={{
                fontFamily: FONT.medium,
                color: jf.ink,
                textDecorationLine: 'underline',
              }}
            >
              {detail.link}
            </Text>
          </Text>
        </Panel>
*/}

{/* STEP 3.10 and what you would be doing
        <View style={{ marginTop: SP.lg }}>
          <Panel title={DETAIL.responsibilitiesTitle} gap={16}>
            <View style={{ gap: 14 }}>
              {detail.responsibilities.map((line, i) => (
                <NumberedItem key={line} n={i + 1}>
                  {line}
                </NumberedItem>
              ))}
            </View>
          </Panel>
        </View>
*/}
      </ScrollView>

{/* STEP 3.13 fade the page out under a button
      <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0 }} pointerEvents="box-none">
        <LinearGradient
          colors={['rgba(238,241,235,0)', 'rgba(238,241,235,0.9)', jf.bg]}
          locations={[0, 0.45, 1]}
          style={{ paddingTop: 32, paddingBottom: Math.max(insets.bottom, 16) + 12 }}
        >
          <View style={{ alignItems: 'center' }}>
            <PillButton label={DETAIL.cta} width={210} onPress={() => router.back()} />
          </View>
        </LinearGradient>
      </View>
*/}
    </View>
  );
}
