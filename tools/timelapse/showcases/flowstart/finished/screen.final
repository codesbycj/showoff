import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

import { AccountLink } from '@/features/flowstart/components/account-link';
import { HeroPhoto } from '@/features/flowstart/components/hero-photo';
import { PageDots } from '@/features/flowstart/components/page-dots';
import { SheetGround } from '@/features/flowstart/components/sheet-ground';
import { StartButton } from '@/features/flowstart/components/start-button';
import { WelcomeCopy } from '@/features/flowstart/components/welcome-copy';
import { useLayout } from '@/features/flowstart/layout';
import { ct } from '@/features/flowstart/theme';

/**
 * Flowan — welcome.
 *
 * Assembly, never markup: a list of imports and the blocks they mount, in the
 * order they appear, because `stage.js` reads this file as the description of
 * its own reveal.
 *
 * Every block here is a component rather than inline JSX, which is what I5
 * means by extraction — as markup this screen staged to twelve steps, under
 * the floor, because there was nothing for the stager to descend into.
 *
 * The photograph is the remainder and the sheet is sized, so the screen always
 * ends on its action with no band under it (I3).
 */
export default function FlowstartScreen() {
  const L = useLayout();

  return (
    <View style={{ flex: 1, backgroundColor: ct.page }}>
      <StatusBar style="light" />

      <HeroPhoto width={L.W} height={L.hero.h} />

      <View style={{ flex: 1, marginTop: -34 }}>
        <SheetGround radius={L.sheet.radius} />

        <View style={{ height: 28 }} />
        <WelcomeCopy margin={L.margin} displayH={L.displayH} gap={L.gapDisplay} bodyH={L.bodyH} />

        <View style={{ height: L.gapBody }} />
        <PageDots height={L.dotsH} />

        <View style={{ height: L.gapDots }} />
        <StartButton margin={L.margin} height={L.cta.h} onPress={() => router.push('/flowhome')} />

        <View style={{ height: L.gapCta }} />
        <AccountLink height={L.linkH} onPress={() => router.push('/flowhome')} />
      </View>
    </View>
  );
}
