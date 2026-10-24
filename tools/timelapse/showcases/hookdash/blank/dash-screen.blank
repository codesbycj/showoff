import { StatusBar } from 'expo-status-bar';
import X from 'lucide-react-native/icons/x';
import { Pressable, View } from 'react-native';

// STEP 1.17 what has been happening
// import { ActivityCard } from '@/features/hookdash/components/activity-card';
// STEP 1.07 and how to meet people
// import { FindTile } from '@/features/hookdash/components/find-tile';
// STEP 1.11 where they stand
// import { LeaderboardCard } from '@/features/hookdash/components/leaderboard-card';
// STEP 1.22 and a picture from last year
// import { MemoriesCard } from '@/features/hookdash/components/memories-card';
// STEP 1.02 who this is
// import { ProfileTile } from '@/features/hookdash/components/profile-tile';
import { CLOSE, CLOSE_TOP, GRID_GAP, GRID_TOP, MARGIN } from '@/features/hookdash/layout';
import { hk } from '@/features/hookdash/theme';
import { useInsets } from '@/features/hookdash/use-insets';

/**
 * Hook — the profile dashboard.
 *
 * Assembly only: who this is, how to meet people, where they stand, what has
 * been happening, and a picture from last year.
 *
 * The memories card is taller than it needs to be and runs off the foot of
 * the page, which is what the reference shows. A spacer above it instead would
 * leave a band of flat black between the stack and the card on a tall phone.
 */
export default function HookDash() {
  const insets = useInsets();

  return (
    <View style={{ flex: 1, backgroundColor: hk.canvas }}>
      <StatusBar style="light" />

      <View style={{ flex: 1, paddingTop: insets.top + CLOSE_TOP }}>
        <View style={{ alignItems: 'center' }}>
          {/* STEP 1.01 the way out
          <Pressable accessibilityRole="button" accessibilityLabel="Close">
            <X size={CLOSE} color={hk.muted} strokeWidth={2} />
          </Pressable>
          */}
        </View>

        <View style={{ marginTop: GRID_TOP, paddingHorizontal: MARGIN, gap: GRID_GAP }}>
          <View style={{ flexDirection: 'row', gap: GRID_GAP }}>
            <View style={{ flex: 1 }}>
              {/* STEP 1.03 top left
              <ProfileTile />
              */}
            </View>
            <View style={{ flex: 1 }}>
              {/* STEP 1.08 beside it
              <FindTile />
              */}
            </View>
          </View>

          {/* STEP 1.12 under the two tiles
          <LeaderboardCard />
          */}
          {/* STEP 1.18 under the board
          <ActivityCard />
          */}
        </View>

        <View style={{ marginTop: GRID_GAP, paddingHorizontal: MARGIN }}>
          {/* STEP 1.23 running off the foot
          <MemoriesCard />
          */}
        </View>
      </View>
    </View>
  );
}
