import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// STEP 2.01 a way back out
// import { ChatHeader } from '@/features/lumina/components/chat-header';
// STEP 2.03 the face of the thing
// import { MascotOrb } from '@/features/lumina/components/mascot-orb';
// STEP 2.13 somewhere to type
// import { PromptDock } from '@/features/lumina/components/prompt-dock';
// STEP 2.06 pick a subject
// import { SubjectChip } from '@/features/lumina/components/subject-chip';
import { CHAT, SUBJECTS } from '@/features/lumina/data/chat';
import { FONT, SP, ll, luminaTheme } from '@/features/lumina/theme';

/**
 * Screen 2 — the AI Study Buddy.
 *
 * Three bands stacked by `justify-content: space-between`, which is the
 * reference's own structure: a header, a hero that takes whatever is left, and
 * a dock pinned to the bottom. The hero centres itself in the space the other
 * two leave, so the mascot stays on the optical centre line whatever the
 * device height.
 *
 * There is no tab dock on this screen. The reference does not draw one — the
 * composer occupies that space — so the back button is the way out.
 */
export default function LuminaChat() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[luminaTheme, { flex: 1, backgroundColor: ll.bg }]}>
      <StatusBar style="dark" />

      <View style={{ paddingTop: insets.top + 8, paddingHorizontal: SP.md }}>
{/* STEP 2.02 name the assistant
        <ChatHeader badge={CHAT.badge} onBack={() => router.back()} />
*/}
      </View>

      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: SP.lg,
          marginTop: -32,
        }}
      >
{/* STEP 2.04 wake it up
        <MascotOrb />
*/}

{/* STEP 2.05 ask the question back
        <Text
          style={{
            fontFamily: FONT.medium,
            fontSize: 34,
            lineHeight: 40,
            letterSpacing: -0.68,
            color: '#232b2b',
            textAlign: 'center',
            marginTop: SP.xl,
          }}
        >
          {CHAT.headlineTop}
          {'\n'}
          {CHAT.headlineBottom}
        </Text>
*/}
      </View>

      <View style={{ paddingBottom: Math.max(insets.bottom, 16) + 8 }}>
        {/* The rail bleeds to both edges so a chip can be clipped by the right
            edge the way the reference shows — the tell that it scrolls. */}
{/* STEP 2.07 a rail for the subjects
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: SP.margin,
            gap: SP.sm,
            paddingVertical: 2,
            // MISTAKE 2.08 the rail came in indented like a pull quote
            paddingLeft: 90,
          }}
          style={{ marginBottom: 14 }}
        >
          {SUBJECTS.map((subject) => (
            <SubjectChip key={subject.key} subject={subject} />
          ))}
        </ScrollView>
*/}

        <View style={{ paddingHorizontal: SP.md }}>
{/* STEP 2.14 the composer
          <PromptDock
            placeholder={CHAT.placeholder}
            mode={CHAT.mode}
            onSend={() => router.push('/lumina/saved')}
          />
*/}
        </View>
      </View>
    </View>
  );
}
