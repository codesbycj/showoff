import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AmbientGlow } from '@/features/auralegal/components/ambient-glow';
// STEP 4.01 import the top bar
// import { AppHeader } from '@/features/auralegal/components/app-header';
// STEP 4.26 import the toast
// import { BookingToast } from '@/features/auralegal/components/booking-toast';
// STEP 4.24 import the confirm pod
// import { ConfirmPod } from '@/features/auralegal/components/confirm-pod';
// STEP 4.05 import the mode row
// import { ConsultOption } from '@/features/auralegal/components/consult-option';
// STEP 4.11 import the date fan
// import { DateFan } from '@/features/auralegal/components/date-fan';
// STEP 4.03 import the subject banner
// import { SubjectBanner } from '@/features/auralegal/components/subject-banner';
import { Symbol } from '@/features/auralegal/components/symbol';
// STEP 4.18 import the time dial
// import { TimeDial } from '@/features/auralegal/components/time-dial';
import {
  CONFIRM,
  DATES,
  HEADER,
  OPTIONS,
  SECTIONS,
  SUBJECT,
  TIMES,
  TOAST,
} from '@/features/auralegal/data/booking';
import { R, SP, TYPE, al, auralegalTheme } from '@/features/auralegal/theme';

/**
 * Screen 4 — booking a consultation.
 *
 * Three selections live here rather than inside their components, so the
 * screen stays the only place that knows what is chosen: the consultation mode,
 * the date, and the time. The confirm pod turns that into the toast, which is
 * the one piece of this showcase that appears in no reference render — the
 * export parks it off-screen until its own script fires.
 */
export default function AuralegalBooking() {
  const insets = useSafeAreaInsets();
  const [mode, setMode] = useState<string>('online');
  const [date, setDate] = useState<string>('11');
  const [time, setTime] = useState<string>('t11');
  const [confirmed, setConfirmed] = useState(false);

  return (
    <View style={[auralegalTheme, { flex: 1, backgroundColor: al.surface }]}>
      <StatusBar style="light" />

      <AmbientGlow color={al.primaryContainer} size={330} opacity={0.1} top={60} left={30} />
      <AmbientGlow color={al.secondary} size={330} opacity={0.1} top={400} right={-130} />

      <View style={{ paddingTop: insets.top }}>
{/* STEP 4.02 the top bar
        <AppHeader title={HEADER.title} avatar={HEADER.avatar} onBack={() => router.back()} />
*/}
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: SP.margin,
          paddingBottom: insets.bottom + 40,
        }}
      >
{/* STEP 4.04 who is being booked
        <SubjectBanner
          name={SUBJECT.name}
          place={SUBJECT.place}
          specialty={SUBJECT.specialty}
          avatar={SUBJECT.avatar}
        />
*/}

        <View style={{ marginBottom: SP.lg }}>
{/* STEP 4.06 name the step
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: SP.sm,
            }}
          >
            <Text style={{ ...TYPE.titleMd, color: al.onSurface }}>{SECTIONS.typeTitle}</Text>
            <Text style={{ ...TYPE.labelSm, color: al.onSurfaceVariant }}>{SECTIONS.step}</Text>
          </View>
*/}

{/* STEP 4.07 room for the three modes
          <View style={{ gap: SP.sm }}>
            {OPTIONS.map((o) => (
              <ConsultOption
                key={o.key}
                option={o}
                selected={o.key === mode}
                onPress={() => setMode(o.key)}
              />
            ))}
          </View>
*/}
        </View>

{/* STEP 4.10 name the calendar
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: SP.md,
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: SP.sm }}>
            <Text style={{ ...TYPE.titleMd, color: al.onSurface }}>{SECTIONS.whenTitle}</Text>
            <Symbol name="eventAvailable" size={18} color={al.secondary} />
          </View>
          <Text style={{ ...TYPE.labelMd, color: al.primary }}>{SECTIONS.month}</Text>
        </View>
*/}

        <View
          style={{
            height: 320,
            borderRadius: R.lg,
            backgroundColor: al.surfaceContainerLowest,
            overflow: 'hidden',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: SP.lg,
            paddingBottom: SP.md + 4,
          }}
        >
{/* STEP 4.12 room for the dates
          <DateFan dates={DATES} selected={date} onSelect={setDate} />
*/}

{/* STEP 4.19 room for the times
          <TimeDial times={TIMES} selected={time} onSelect={setTime} />
*/}

{/* STEP 4.25 the way on
          <ConfirmPod caption={CONFIRM.caption} onPress={() => setConfirmed(true)} />
*/}
        </View>
      </ScrollView>

{/* STEP 4.27 confirmation, once there is something to confirm
      {confirmed ? (
        <BookingToast
          title={TOAST.title}
          detail={TOAST.detail}
          inset={insets.bottom}
          onClose={() => setConfirmed(false)}
        />
      ) : null}
*/}
    </View>
  );
}
