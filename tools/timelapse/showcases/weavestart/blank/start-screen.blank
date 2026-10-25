import { StatusBar } from 'expo-status-bar';
import { Pressable, View } from 'react-native';

// STEP 1.13 the ways in
// import { SignInButton } from '@/features/weavestart/components/sign-in-button';
// STEP 1.01 the throw
// import { TagCluster } from '@/features/weavestart/components/tag-cluster';
import { T } from '@/features/weavestart/components/text';
import { copy } from '@/features/weavestart/data/signin';
import {
  BUTTON_GAP,
  BUTTONS_TOP,
  CLUSTER_TOP,
  DISPLAY_TOP,
  FOOT_BOTTOM,
  FOOT_TOP,
  MARGIN,
} from '@/features/weavestart/layout';
import { wv } from '@/features/weavestart/theme';
import { useInsets } from '@/features/weavestart/use-insets';

/**
 * Weave — sign in.
 *
 * Assembly only: a throw of category pills, what the app is for, the two ways
 * in, and a line for people who have not been here before.
 *
 * The cluster takes whatever height is left between the status bar and the
 * headline, which is why it is given a height rather than measuring itself:
 * everything else on this screen is a fixed number of dp, so the artwork's
 * share is arithmetic, and the pills can never push the headline off the page.
 *
 * Every handler is empty on purpose — the rest of this design is not in scope,
 * and what matters is that the destination is decided here.
 *
 * The three display lines are written out rather than mapped, so the reveal
 * can set them one at a time - on a screen with four elements that is most
 * of the build.
 *
 * The cluster takes the whole of what is left rather than a fixed height:
 * at 280 the throw finished a third of the way down and left a band of
 * empty page between it and the headline.
 */
export default function WeaveStart() {
  const insets = useInsets();

  return (
    <View style={{ flex: 1, backgroundColor: wv.canvas }}>
      <StatusBar style="light" />

      <View
        style={{
          flex: 1,
          paddingTop: insets.top + CLUSTER_TOP,
          paddingBottom: insets.bottom + FOOT_BOTTOM,
          paddingHorizontal: MARGIN,
        }}
      >
{/* STEP 1.02 onto the page
        <View
          style={{
            flex: 1,
            // MISTAKE 1.09 the throw came in half-faded
            opacity: 0.45,
          }}
        >
          <TagCluster height="100%" />
        </View>
*/}

        <View style={{ marginTop: DISPLAY_TOP }}>
{/* STEP 1.10 the first line
          <T variant="display" color={wv.ink}>
            {copy.headline[0]}
          </T>
*/}
{/* STEP 1.11 the second
          <T variant="display" color={wv.ink}>
            {copy.headline[1]}
          </T>
*/}
{/* STEP 1.12 and the third
          <T variant="display" color={wv.ink}>
            {copy.headline[2]}
          </T>
*/}
        </View>

        <View style={{ marginTop: BUTTONS_TOP, gap: BUTTON_GAP }}>
{/* STEP 1.14 one way in
          <SignInButton label={copy.google} glyph="google" tone="light" />
*/}
{/* STEP 1.15 and another
          <SignInButton label={copy.apple} glyph="apple" tone="dark" />
*/}
        </View>

{/* STEP 1.18 and the way to join
        <View
          style={{
            marginTop: FOOT_TOP,
            // MISTAKE 1.19 the foot came in inset
            paddingHorizontal: 40,
            flexDirection: 'row',
            justifyContent: 'center',
            gap: 5,
          }}
        >
          <T variant="foot" color={wv.muted}>
            {copy.footLead}
          </T>
          <Pressable accessibilityRole="button" accessibilityLabel={copy.footLink}>
            <T variant="footLink" color={wv.link}>
              {copy.footLink}
            </T>
          </Pressable>
        </View>
*/}
      </View>
    </View>
  );
}
