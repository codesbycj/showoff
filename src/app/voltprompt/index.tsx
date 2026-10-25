import { StatusBar } from 'expo-status-bar';
import { Pressable, ScrollView, View } from 'react-native';

// STEP 1.09 and the box for the next one
// import { AskBar } from '@/features/voltprompt/components/ask-bar';
import { Glyph } from '@/features/voltprompt/components/glyph';
// STEP 1.05 its answer, hour by hour
// import { HourChart } from '@/features/voltprompt/components/hour-chart';
// STEP 1.03 the first saved prompt
// import { PromptHead } from '@/features/voltprompt/components/prompt-head';
import { T } from '@/features/voltprompt/components/text';
// STEP 1.07 how to read it
// import { ToolRail } from '@/features/voltprompt/components/tool-rail';
import { copy, leads, prompts, savedCount } from '@/features/voltprompt/data/data';
import {
  COUNT_SIZE,
  HEAD_TOP,
  HEADER_SIZE,
  HEADER_TOP,
  INPUT_TOP,
  MARGIN,
  PROMPT_TOP,
} from '@/features/voltprompt/layout';
import { radius, vt, type } from '@/features/voltprompt/theme';
import { useInsets } from '@/features/voltprompt/use-insets';

/**
 * Volt — saved prompts.
 *
 * Assembly only: the way back, how many prompts there are, each one with its
 * answer under it, and the box for the next question.
 *
 * The list scrolls and the ask bar is pinned to the foot, so the screen is
 * full whatever the list is doing.
 */
export default function VoltpromptScreen() {
  const insets = useInsets();

  const disc = {
    width: HEADER_SIZE,
    height: HEADER_SIZE,
    borderRadius: radius.control,
    backgroundColor: '#F2F2F3',
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  };

  return (
    <View style={{ flex: 1, backgroundColor: vt.canvas, paddingTop: insets.top + HEADER_TOP }}>
      <StatusBar style="dark" />

      <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: MARGIN }}>
        <Pressable accessibilityRole="button" accessibilityLabel="Go back">
          <View style={disc}>
            <Glyph name="back" size={19} tint={vt.onCanvas} />
          </View>
        </Pressable>
        <T
          variant="section"
          color={vt.onCanvas}
          style={{ flex: 1, textAlign: 'center', height: type.section.line }}
        >
          {copy.title}
        </T>
        <Pressable accessibilityRole="button" accessibilityLabel="Messages">
          <View style={disc}>
            <Glyph name="inbox" size={19} tint={vt.onCanvas} />
          </View>
        </Pressable>
      </View>

{/* STEP 1.01 how many there are
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: HEAD_TOP,
          paddingHorizontal: MARGIN,
        }}
      >
        <T variant="rowTitle" color={vt.onCanvas} style={{ flex: 1, height: type.rowTitle.line }}>
          {copy.prompts}
        </T>
        <View
          style={{
            width: COUNT_SIZE,
            height: COUNT_SIZE,
            borderRadius: radius.control,
            backgroundColor: vt.acid,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <T variant="caption" color={vt.onAcid} style={{ height: type.caption.line }}>
            {String(savedCount)}
          </T>
        </View>
      </View>
      */}

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: MARGIN, paddingBottom: 12 }}
      >
{/* STEP 1.06 with its chart under it
        <View style={{ marginTop: PROMPT_TOP }}>
          <PromptHead label={prompts[0].label} />
          <View style={{ marginTop: 14 }}>
            <HourChart />
            <ToolRail />
          </View>
        </View>
*/}

{/* STEP 1.08 and the second
        <View
          style={{
            marginTop: PROMPT_TOP + 8,
            // MISTAKE 1.10 the second prompt came in half-faded
            opacity: 0.4,
          }}
        >
          <PromptHead label={prompts[1].label} />
          <View style={{ flexDirection: 'row', marginTop: 16 }}>
            {leads.map((l) => (
              <View key={l.id} style={{ flex: 1 }}>
                <T variant="figure" color={vt.onCanvas} style={{ height: type.figure.line }}>
                  {l.value}
                </T>
                <T variant="caption" color={vt.muted} style={{ height: type.caption.line }}>
                  {l.label}
                </T>
              </View>
            ))}
          </View>
        </View>
*/}
      </ScrollView>

{/* STEP 1.11 across the foot
      <View
        style={{
          marginTop: INPUT_TOP,
          marginHorizontal: MARGIN,
          marginBottom: insets.bottom + 8,
        }}
      >
        <AskBar />
      </View>
*/}
    </View>
  );
}
