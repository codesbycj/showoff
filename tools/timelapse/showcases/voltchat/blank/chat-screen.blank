import { StatusBar } from 'expo-status-bar';
import { Pressable, View } from 'react-native';

// STEP 1.09 and what you are about to ask
// import { AskBar } from '@/features/voltchat/components/ask-bar';
// STEP 1.07 what it offers next
// import { ChipRail } from '@/features/voltchat/components/chip-rail';
import { Glyph } from '@/features/voltchat/components/glyph';
// STEP 1.05 the figures it has to hand
// import { ReadingRow } from '@/features/voltchat/components/reading-row';
import { T } from '@/features/voltchat/components/text';
import { copy, readings } from '@/features/voltchat/data/data';
import {
  ASK_TOP,
  BOLT_SIZE,
  BOLT_TOP,
  CHIPS_TOP,
  HEADER_SIZE,
  HEADER_TOP,
  INPUT_TOP,
  MARGIN,
  ROW_GAP,
  ROWS_TOP,
  SHEET_PAD,
  SHEET_TOP,
} from '@/features/voltchat/layout';
import { radius, vt, type } from '@/features/voltchat/theme';
import { useInsets } from '@/features/voltchat/use-insets';

/**
 * Volt — the assistant.
 *
 * Assembly only: the way back and what this is, the bolt and the question,
 * the figures it has to hand, what it offers to do next, and what you are
 * about to ask.
 *
 * The black sheet runs off the bottom edge rather than stopping above it: it
 * is the conversation, and one that ends in a band of paper looks finished
 * when it is not. The input sits inside the sheet, above the home indicator.
 */
export default function VoltchatScreen() {
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
    <View style={{ flex: 1, backgroundColor: vt.canvas }}>
      <StatusBar style="dark" />

{/* STEP 1.01 the way back and what this is
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingTop: insets.top + HEADER_TOP,
          paddingHorizontal: MARGIN,
        }}
      >
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
      */}

      <View
        style={{
          flex: 1,
          marginTop: SHEET_TOP,
          marginHorizontal: MARGIN,
          borderTopLeftRadius: 28,
          borderTopRightRadius: 28,
          backgroundColor: vt.sheet,
          padding: SHEET_PAD,
        }}
      >
{/* STEP 1.03 the bolt and the question
        <View style={{ alignItems: 'center', marginTop: BOLT_TOP }}>
          <View
            style={{
              width: BOLT_SIZE,
              height: BOLT_SIZE,
              borderRadius: radius.control,
              backgroundColor: vt.acid,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Glyph name="bolt" size={28} tint={vt.onAcid} />
          </View>
          <T variant="ask" color={vt.ink} style={{ marginTop: ASK_TOP, height: type.ask.line }}>
            {copy.ask}
          </T>
        </View>
*/}

{/* STEP 1.06 three of them
        <View style={{ marginTop: ROWS_TOP }}>
          {readings.map((r, i) => (
            <View
              key={r.id}
              style={{
                marginTop: i === 0 ? 0 : ROW_GAP,
                // MISTAKE 1.10 the rows came in half-faded
                opacity: 0.4,
              }}
            >
              <ReadingRow
                label={r.label}
                value={r.value}
                change={r.change}
                up={r.up}
                mark={r.mark}
              />
            </View>
          ))}
        </View>
*/}

        <View style={{ flex: 1 }} />

{/* STEP 1.08 as a rail you push
        <View style={{ marginTop: CHIPS_TOP }}>
          <ChipRail />
        </View>
*/}

{/* STEP 1.11 across the foot
        <View style={{ marginTop: INPUT_TOP, marginBottom: insets.bottom }}>
          <AskBar />
        </View>
*/}
      </View>
    </View>
  );
}
