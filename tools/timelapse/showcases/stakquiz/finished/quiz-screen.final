import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

import { AnswerRow } from '@/features/stakquiz/components/answer-row';
import { FootControl } from '@/features/stakquiz/components/foot-control';
import { ProgressBar } from '@/features/stakquiz/components/progress-bar';
import { T } from '@/features/stakquiz/components/text';
import { TopBar } from '@/features/stakquiz/components/top-bar';
import { answers, copy } from '@/features/stakquiz/data/quiz';
import {
  BAR_TOP,
  DISPLAY_TOP,
  FOOT_BOTTOM,
  HEADER_TOP,
  MARGIN,
  OPTION_GAP,
  OPTIONS_TOP,
} from '@/features/stakquiz/layout';
import { sk, type } from '@/features/stakquiz/theme';
import { useInsets } from '@/features/stakquiz/use-insets';

/**
 * Stak — the investing quiz.
 *
 * Assembly only: the way back and how far through, the question, what other
 * people answered, and the two ways on.
 *
 * Four answers rather than the reference's three. Its phone shows three and
 * then about 170dp of black above the control; four is the row it crops, it
 * is what a multiple-choice question normally offers, and it is what makes
 * the screen reach its own bottom edge.
 */
export default function StakquizScreen() {
  const insets = useInsets();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: sk.canvas,
        paddingTop: insets.top + HEADER_TOP,
        paddingHorizontal: MARGIN,
        paddingBottom: insets.bottom + FOOT_BOTTOM,
      }}
    >
      <StatusBar style="light" />

      <TopBar />

      <View style={{ marginTop: BAR_TOP }}>
        <ProgressBar />
      </View>

      <View style={{ marginTop: DISPLAY_TOP }}>
        {copy.question.map((line) => (
          <T key={line} variant="display" color={sk.ink} style={{ height: type.display.line }}>
            {line}
          </T>
        ))}
      </View>

      <View style={{ marginTop: OPTIONS_TOP }}>
        {answers.map((a, i) => (
          <View key={a.id} style={{ marginTop: i === 0 ? 0 : OPTION_GAP }}>
            <AnswerRow
              label={a.label}
              share={a.share}
              count={a.count}
              faces={a.faces}
              picked={a.picked}
            />
          </View>
        ))}
      </View>

      <View style={{ flex: 1, justifyContent: 'flex-end' }}>
        <FootControl />
      </View>
    </View>
  );
}
