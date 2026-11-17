import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

// STEP 1.15 import bottle list
// import { BottleList } from '@/features/pulphome/components/bottle-list';
// STEP 1.20 import dock
// import { Dock } from '@/features/pulphome/components/dock';
// STEP 1.01 import greet bar
// import { GreetBar } from '@/features/pulphome/components/greet-bar';
// STEP 1.10 import kind chips
// import { KindChips } from '@/features/pulphome/components/kind-chips';
// STEP 1.04 import text
// import { T } from '@/features/pulphome/components/text';
import { header } from '@/features/pulphome/data/shop';
import { useLayout } from '@/features/pulphome/layout';
import { ct } from '@/features/pulphome/theme';

/**
 * Pulp - the shop.
 *
 * Assembly, never markup: a list of imports and the blocks they mount, in the
 * order they appear, because `stage.js` reads this file as the description of
 * its own reveal.
 *
 * The bottle list is the remainder and it runs under the dock, so the screen
 * ends on a card crossing the bottom edge with no band under it (I3).
 */
export default function PulphomeScreen() {
  const L = useLayout();

  return (
    <View style={{ flex: 1, backgroundColor: ct.page }}>
      <StatusBar style="dark" />

      <View style={{ paddingTop: L.insets.top }} />
      {/* STEP 1.01 greet bar
      <GreetBar margin={L.margin} height={L.greetH} />
      */}

      <View style={{ height: L.gapGreet }} />
      {/* STEP 1.04 display
      <View style={{ marginHorizontal: L.margin, height: L.displayH }}>
        <T variant="display">{header.display}</T>
      </View>
      */}

      {/* STEP 1.07 sub
      <View style={{ marginHorizontal: L.margin, height: L.subH }}>
        <T variant="sub">{header.sub}</T>
      </View>
      */}

      <View style={{ height: L.gapSub }} />
      {/* STEP 1.10 kind chips
      <KindChips margin={L.margin} height={L.chip.h} radius={L.chip.radius} />
      */}

      <View style={{ height: L.gapChips }} />
      {/* STEP 1.15 bottle list
      <BottleList
        margin={L.margin}
        height={L.listH}
        cardH={L.card.h}
        radius={L.card.radius}
        padBottom={L.dock.h + L.dock.bottom + 12}
        onOpen={() => router.push('/pulpitem')}
      />
      */}

      {/* STEP 1.20 dock
      <Dock
        width={L.dock.w}
        height={L.dock.h}
        radius={L.dock.radius}
        bottom={L.dock.bottom}
        disc={L.dock.disc}
      />
      */}

      {/* STEP 1.05 a stray rule | FIX 1.06 take the rule back out
      <View style={{ position: 'absolute', left: 14, top: 162, width: 120, height: 7, backgroundColor: '#8F8F8F', zIndex: 9 }} />
      */}
      {/* STEP 1.08 a stray rule | FIX 1.09 take the rule back out
      <View style={{ position: 'absolute', left: 22, top: 186, width: 120, height: 11, backgroundColor: '#8F8F8F', zIndex: 9 }} />
      */}
      {/* STEP 1.13 a stray rule | FIX 1.14 take the rule back out
      <View style={{ position: 'absolute', left: 18, top: 174, width: 120, height: 9, backgroundColor: '#8F8F8F', zIndex: 9 }} />
      */}
      {/* STEP 1.18 a stray rule | FIX 1.19 take the rule back out
      <View style={{ position: 'absolute', left: 26, top: 198, width: 120, height: 13, backgroundColor: '#8F8F8F', zIndex: 9 }} />
      */}
    </View>
  );
}
