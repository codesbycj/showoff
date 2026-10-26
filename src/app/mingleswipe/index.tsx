import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

// STEP 1.18 and what to do about it
// import { ActionRow } from '@/features/mingleswipe/components/action-row';
// STEP 1.01 the photograph
// import { HeroPhoto } from '@/features/mingleswipe/components/hero-photo';
// STEP 1.05 who is looking
// import { LikedBar } from '@/features/mingleswipe/components/liked-bar';
// STEP 1.10 who this is
// import { ProfileBlock } from '@/features/mingleswipe/components/profile-block';
import { MARGIN } from '@/features/mingleswipe/layout';
import { mg } from '@/features/mingleswipe/theme';
import { useInsets } from '@/features/mingleswipe/use-insets';

/**
 * Mingle — a profile.
 *
 * Assembly only: the photograph, who is looking, who this is, and the two
 * things that can be done about it.
 *
 * The photograph is full-bleed and the interface is laid over it, so the
 * column is a header, one `flex: 1` spacer and the profile block — the header
 * sits on the top inset and the buttons on the bottom one. There is no canvas
 * here to leave dead.
 */
export default function MingleswipeScreen() {
  const insets = useInsets();

  return (
    <View style={{ flex: 1, backgroundColor: mg.ink }}>
      <StatusBar style="light" />

{/* STEP 1.02 full bleed
      <HeroPhoto />
*/}

      <View
        style={{
          flex: 1,
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingHorizontal: MARGIN,
        }}
      >
{/* STEP 1.06 a bar over it
        <LikedBar onOpen={() => router.push('/minglestart')} />
*/}

        <View style={{ flex: 1 }} />

{/* STEP 1.11 the profile
        <ProfileBlock />
*/}

{/* STEP 1.19 and two buttons
        <ActionRow
          onPass={() => router.push('/minglestart')}
          onLike={() => router.push('/minglestart')}
        />
*/}
      </View>
    </View>
  );
}
