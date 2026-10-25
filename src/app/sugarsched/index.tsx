import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Image, ScrollView, View } from 'react-native';

import { AppBar } from '@/features/sugarsched/components/app-bar';
import { AssignmentRow } from '@/features/sugarsched/components/assignment-row';
import { FACES } from '@/features/sugarsched/components/faces';
import { RangeCard } from '@/features/sugarsched/components/range-card';
import { T } from '@/features/sugarsched/components/text';
import { assignments, header } from '@/features/sugarsched/data/schedule';
import {
  HEADER_TOP,
  MARGIN,
  ROW_GAP,
  ROWS_TOP,
  TITLE_AVATAR,
  TITLE_TOP,
} from '@/features/sugarsched/layout';
import { radius, ss } from '@/features/sugarsched/theme';
import { useInsets } from '@/features/sugarsched/use-insets';

/**
 * Sugar CRM — Scheduled Assignments.
 *
 * Assembly only: the chrome, what the screen is, and the assignments with the
 * date picker open between them.
 *
 * The picker sits *in* the list rather than over it, which is the reference's
 * own arrangement and the better one: the rows above and below stay readable,
 * so the dates are chosen in the context of what else is booked.
 *
 * Every handler is empty except the back arrow. The other two screens of this
 * design are their own showcases with their own slugs.
 */
export default function SugarSched() {
  const insets = useInsets();

  return (
    <View style={{ flex: 1, backgroundColor: ss.canvas }}>
      <StatusBar style="dark" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: MARGIN,
          paddingTop: insets.top + HEADER_TOP,
          paddingBottom: insets.bottom + 16,
        }}
      >
        <AppBar onBack={() => router.back()} />

        <View style={{ marginTop: TITLE_TOP, flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ flex: 1 }}>
            <T variant="title" color={ss.ink}>
              {header.one}
            </T>
            <T variant="title" color={ss.ink}>
              {header.two}
            </T>
          </View>
          <Image
            source={FACES[header.face % FACES.length]}
            style={{ width: TITLE_AVATAR, height: TITLE_AVATAR, borderRadius: radius.full }}
            resizeMode="cover"
            accessibilityIgnoresInvertColors
          />
        </View>

        <View style={{ marginTop: ROWS_TOP, gap: ROW_GAP }}>
          <AssignmentRow
            title={assignments[0].title}
            status={assignments[0].status}
            color={assignments[0].color}
            face={assignments[0].face}
          />

          <RangeCard />

          {assignments.slice(1).map((a) => (
            <AssignmentRow
              key={a.key}
              title={a.title}
              status={a.status}
              color={a.color}
              face={a.face}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
