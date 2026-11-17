import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Pressable, View } from 'react-native';

// STEP 1.08 import action row
// import { ActionRow } from '@/features/foldhome/components/action-row';
// STEP 1.03 import card stack
// import { CardStack } from '@/features/foldhome/components/card-stack';
// STEP 1.20 import glyph
// import { Glyph } from '@/features/foldhome/components/glyph';
// STEP 1.01 import greet row
// import { GreetRow } from '@/features/foldhome/components/greet-row';
// STEP 1.14 import text
// import { T } from '@/features/foldhome/components/text';
// STEP 1.23 import tx list
// import { TxList } from '@/features/foldhome/components/tx-list';
import { header } from '@/features/foldhome/data/home';
import { useLayout } from '@/features/foldhome/layout';
import { ct } from '@/features/foldhome/theme';

/**
 * Fold - the wallet.
 *
 * Assembly, never markup: a list of imports and the blocks they mount, in the
 * order they appear, because `stage.js` reads this file as the description of
 * its own reveal.
 *
 * The transaction list is the remainder and it runs under the bottom edge, so
 * the screen ends on a row crossing the frame with no band under it (I3).
 */
export default function FoldhomeScreen() {
  const L = useLayout();

  return (
    <View style={{ flex: 1, backgroundColor: ct.page }}>
      <StatusBar style="dark" />

      <View style={{ paddingTop: L.insets.top }} />
      {/* STEP 1.01 greet row
      <GreetRow margin={L.margin} height={L.greetH} />
      */}

      <View style={{ height: L.gapGreet }} />
      {/* STEP 1.03 card stack
      <CardStack
        margin={L.margin}
        width={L.card.w}
        cardH={L.card.h}
        peek={L.card.peek}
        onOpen={() => router.push('/foldcard')}
      />
      */}

      <View style={{ height: L.gapStack }} />
      {/* STEP 1.08 action row
      <ActionRow margin={L.margin} width={L.action.w} height={L.action.h} gap={L.action.gap} />
      */}

      <View style={{ height: L.gapActions }} />
      <View
        style={{
          marginHorizontal: L.margin,
          height: L.sectionH,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* STEP 1.14 section
        <T variant="section">{header.section}</T>
        */}
        <Pressable accessibilityRole="button" accessibilityLabel={`Filter: ${header.filter}`}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, height: 44 }}>
            {/* STEP 1.17 filter
            <T variant="filter">{header.filter}</T>
            */}
            {/* STEP 1.20 glyph
            <Glyph name="chevronDown" size={14} color={ct.muted} strokeWidth={1.8} />
            */}
          </View>
        </Pressable>
      </View>

      <View style={{ height: L.gapSection }} />
      {/* STEP 1.23 tx list
      <TxList margin={L.margin} height={L.list.h} rowH={L.list.rowH} gap={L.list.gap} />
      */}
      {/* STEP 1.12 a stray rule | FIX 1.13 take the rule back out
      <View style={{ position: 'absolute', left: 14, top: 162, width: 120, height: 7, backgroundColor: '#8F8F8F', zIndex: 9 }} />
      */}
        {/* STEP 1.15 a stray rule | FIX 1.16 take the rule back out
        <View style={{ position: 'absolute', left: 22, top: 186, width: 120, height: 11, backgroundColor: '#8F8F8F', zIndex: 9 }} />
        */}
            {/* STEP 1.18 a stray rule | FIX 1.19 take the rule back out
            <View style={{ position: 'absolute', left: 18, top: 174, width: 120, height: 9, backgroundColor: '#8F8F8F', zIndex: 9 }} />
            */}
            {/* STEP 1.21 a stray rule | FIX 1.22 take the rule back out
            <View style={{ position: 'absolute', left: 26, top: 198, width: 120, height: 13, backgroundColor: '#8F8F8F', zIndex: 9 }} />
            */}
    </View>
  );
}
