import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// STEP 3.18 the pill that files the entry
// import { PrimaryCta } from '@/features/mindful/components/bits';
// STEP 3.01 everything the check-in is made of
// import { CheckinHeader, EnergyTile, IntensityCard, JournalCard, MoodHero, RestTile, TriggerChips, } from '@/features/mindful/components/checkin-parts';
import { CHECKIN, MOODS, TRIGGERS, type CheckinMood } from '@/features/mindful/data/checkin';
import { SP, TYPE, mindfulTheme, mp } from '@/features/mindful/theme';

/**
 * Screen 3 — logging a check-in.
 *
 * A pinned header over one scrolling column. Two things here are live, because
 * they are what the screen is for: the mood picker drives the hero's face, fill
 * and name, and the context chips toggle.
 *
 * Completing the check-in goes to the calendar, which is where the entry would
 * land.
 */
export default function MindfulCheckin() {
  const insets = useSafeAreaInsets();
  const [mood, setMood] = useState<CheckinMood>(MOODS[0]);
  const [picked, setPicked] = useState<string[]>(TRIGGERS.filter((t) => t.on).map((t) => t.key));

  return (
    <View style={[mindfulTheme, { flex: 1, backgroundColor: mp.bg, paddingTop: insets.top }]}>
      <StatusBar style="dark" />

{/* STEP 3.02 title the screen
      <CheckinHeader
        title={CHECKIN.title}
        onBack={() => router.back()}
        onAccount={() => router.push('/mindful/profile')}
      />
*/}

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: SP.marginSm,
          paddingBottom: Math.max(insets.bottom, SP.md) + SP.lg,
          gap: SP.md,
        }}
      >
{/* STEP 3.03 the face they are feeling
        <View
          style={{
            // MISTAKE 3.04 the hero came in tipped over
            transform: [{ rotate: '-5deg' }],
          }}
        >
          <MoodHero moods={MOODS} active={mood} onSelect={setMood} />
        </View>
*/}

{/* STEP 3.05 how strongly
        <IntensityCard
          label={CHECKIN.intensityLabel}
          value={CHECKIN.intensity}
          min={CHECKIN.intensityMin}
          max={CHECKIN.intensityMax}
          scale={CHECKIN.intensityScale}
        />
*/}

{/* STEP 3.06 ask what caused it
        <View style={{ gap: SP.xs }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 4,
            }}
          >
            <Text style={[TYPE.headlineMd, { color: mp.ink }]}>{CHECKIN.triggersTitle}</Text>
            <Text style={[TYPE.labelSmMedium, { color: mp.variant }]}>{CHECKIN.triggersHint}</Text>
          </View>

          <TriggerChips
            triggers={TRIGGERS}
            selected={picked}
            onToggle={(key) =>
              setPicked((p) => (p.includes(key) ? p.filter((k) => k !== key) : [...p, key]))
            }
          />
        </View>
*/}

{/* STEP 3.16 last night and today's energy
        <View style={{ flexDirection: 'row', gap: SP.gutterSm }}>
          <EnergyTile />
          <RestTile />
        </View>
*/}

{/* STEP 3.17 somewhere to write it down
        <JournalCard
          title={CHECKIN.journalTitle}
          dictate={CHECKIN.dictate}
          body={CHECKIN.journalBody}
          attachment={CHECKIN.attachment}
          thumb={require('../../../assets/images/mindful/morning-sun.jpg')}
        />
*/}

{/* STEP 3.19 file it
        <View style={{ paddingTop: SP.sm }}>
          <PrimaryCta
            label={CHECKIN.cta}
            centered
            height={58}
            discSize={32}
            discFill="rgba(229,226,224,0.2)"
            onPress={() => router.push('/mindful/calendar')}
          />
        </View>
*/}
      </ScrollView>
    </View>
  );
}
