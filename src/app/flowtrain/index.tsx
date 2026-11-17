import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

// STEP 1.01 import exercise hero
// import { ExerciseHero } from '@/features/flowtrain/components/exercise-hero';
// STEP 1.14 import glyph
// import { Glyph } from '@/features/flowtrain/components/glyph';
// STEP 1.08 import set clock
// import { SetClock } from '@/features/flowtrain/components/set-clock';
// STEP 1.06 import text
// import { T } from '@/features/flowtrain/components/text';
// STEP 1.19 import transport
// import { Transport } from '@/features/flowtrain/components/transport';
import { session, tip } from '@/features/flowtrain/data/train';
import { useLayout } from '@/features/flowtrain/layout';
import { ct } from '@/features/flowtrain/theme';

/**
 * Flowan — the set.
 *
 * Assembly, never markup: a list of imports and the blocks they mount, in the
 * order they appear, because `stage.js` reads this file as the description of
 * its own reveal.
 *
 * The photograph is the remainder and the sheet is sized, so the transport row
 * always sits on the foot with no band under it (I3).
 */
export default function FlowtrainScreen() {
  const L = useLayout();

  return (
    <View style={{ flex: 1, backgroundColor: ct.page }}>
      <StatusBar style="light" />

      {/* STEP 1.01 exercise hero
      <ExerciseHero
        width={L.W}
        height={L.hero.h}
        insetTop={L.insets.top}
        margin={L.margin}
        onClose={() => router.push('/flowhome')}
      />
      */}

      <View
        style={{
          flex: 1,
          marginTop: -30,
          backgroundColor: ct.page,
          borderTopLeftRadius: L.sheet.radius,
          borderTopRightRadius: L.sheet.radius,
        }}
      >
        <View style={{ height: 26 }} />

        {/* STEP 1.06 name
        <View style={{ marginHorizontal: L.margin, height: L.nameH, justifyContent: 'center' }}>
          <T variant="name" numberOfLines={1}>
            {session.name}
          </T>
        </View>
        */}

        <View style={{ height: L.gapName }} />
        {/* STEP 1.07 view
        <View style={{ marginHorizontal: L.margin, height: L.metaH }}>
          <T variant="meta">
            Set {session.setAt} of {session.setCount} · {session.reps} reps · {session.weight}
          </T>
        </View>
        */}

        <View style={{ height: L.gapMeta }} />
        {/* STEP 1.11 a stray gap above it | FIX 1.12 take the gap back out
        <View style={{ width: 11, height: 11 }} />
        */}
        {/* STEP 1.08 set clock
        <SetClock margin={L.margin} clockH={L.clockH} barH={L.barH} gap={L.gapClock} />
        */}

        <View style={{ height: L.gapBar }} />
        <View
          style={{
            marginHorizontal: L.margin,
            height: L.tip.h,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 14,
            gap: 12,
          }}
        >
          {/* STEP 1.13 view
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              borderRadius: L.tip.radius,
              backgroundColor: ct.lilacSoft,
            }}
          />
          */}

          {/* STEP 1.15 a stray gap above it | FIX 1.16 take the gap back out
          <View style={{ width: 17, height: 17 }} />
          */}
          {/* STEP 1.14 glyph
          <View
            style={{
              width: 34,
              height: 34,
              borderRadius: 17,
              backgroundColor: ct.white,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Glyph name="spark" size={18} color={ct.lilac} />
          </View>
          */}

          <View style={{ flex: 1 }}>
            {/* STEP 1.17 label
            <T variant="tipLabel">{tip.label}</T>
            */}
            {/* STEP 1.18 body
            <T variant="tipBody">{tip.body}</T>
            */}
          </View>
        </View>

        <View style={{ height: L.gapTip }} />
        {/* STEP 1.22 a stray gap above it | FIX 1.23 take the gap back out
        <View style={{ width: 23, height: 23 }} />
        */}
        {/* STEP 1.19 transport
        <Transport height={L.transportH} onPause={() => router.push('/flowhome')} />
        */}
      </View>
    </View>
  );
}
