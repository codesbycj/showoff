import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Pressable, View } from 'react-native';

// STEP 1.01 import dock
// import { Dock } from '@/features/bytehome/components/dock';
// STEP 1.02 import glyph
// import { Glyph } from '@/features/bytehome/components/glyph';
// STEP 1.03 import ledger
// import { Ledger } from '@/features/bytehome/components/ledger';
// STEP 1.04 import quick send
// import { QuickSend } from '@/features/bytehome/components/quick-send';
import { T } from '@/features/bytehome/components/text';
import { actions, copy, transactions } from '@/features/bytehome/data/home';
import {
  ACTION,
  GAP_ACTIONS_SHEET,
  GAP_BALANCE_ACTIONS,
  GAP_HEAD_LABEL,
  GAP_PEOPLE_SECTION,
  GAP_SECTION_BODY,
  HEAD_H,
  MARGIN,
  PAD_TOP,
  SECTION_H,
  SHEET_PAD,
  useByteHomeLayout,
} from '@/features/bytehome/layout';
import { ct, radius, sheet, type } from '@/features/bytehome/theme';
import { useInsets } from '@/features/bytehome/use-insets';

function SectionHead({ title, onPress }: { title: string; onPress?: () => void }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', height: SECTION_H }}>
      <T variant="section" color={sheet.ink} style={{ flex: 1, height: type.section.line }}>
        {title}
      </T>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`${copy.viewAll}: ${title}`}
        onPress={onPress}
        style={{ paddingVertical: 13, paddingLeft: 12 }}
      >
        <T variant="viewAll" color={ct.teal} style={{ height: type.viewAll.line }}>
          {copy.viewAll}
        </T>
      </Pressable>
    </View>
  );
}

/**
 * Byte — the account.
 *
 * Assembly only: the brand, what you have, the four things you do, who you
 * send to, and what happened.
 *
 * A dark head and a white sheet, with the sheet's height taken from the
 * window and the ledger's rows taken from the sheet. Nothing is centred in a
 * flexible band and nothing sits in a vertical scroller, which between them
 * are the two ways the batch before this one grew holes.
 */
export default function BytehomeScreen() {
  const insets = useInsets();
  const { sheetH, rowH } = useByteHomeLayout(insets, transactions.length);

  return (
    <View style={{ flex: 1, backgroundColor: ct.deeper }}>
      <StatusBar style="light" />

      <View style={{ paddingTop: insets.top + PAD_TOP, paddingHorizontal: MARGIN }}>
        {/* STEP 1.05 "Search"
        <View style={{ height: HEAD_H, flexDirection: 'row', alignItems: 'center' }}>
          <T variant="wordmark" color={ct.onDeep} style={{ height: type.wordmark.line }}>
            {copy.brand}
          </T>
          <View style={{ marginLeft: 7, marginTop: 2 }}>
            <Glyph name="wordmark" size={22} tint={ct.tealLit} />
          </View>
          <View style={{ flex: 1 }} />
          <Pressable accessibilityRole="button" accessibilityLabel="Search">
            <View
              style={{
                width: 44,
                height: 44,
                borderRadius: 22,
                backgroundColor: 'rgba(255,255,255,0.09)',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Glyph name="search" size={20} tint={ct.onDeep} />
            </View>
          </Pressable>
        </View>
        */}

        {/* STEP 1.06 balance label
        <T
          variant="label"
          color={ct.dim}
          style={{ height: type.label.line, marginTop: GAP_HEAD_LABEL }}
        >
          {copy.balanceLabel}
        </T>
        */}
        {/* STEP 1.07 balance
        <T variant="balance" color={ct.onDeep} style={{ height: type.balance.line }}>
          {copy.balance}
        </T>
        */}

        {/* STEP 1.08 label
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: GAP_BALANCE_ACTIONS,
          }}
        >
          {actions.map((a) => (
            <Pressable key={a.id} accessibilityRole="button" accessibilityLabel={a.label}>
              <View style={{ alignItems: 'center' }}>
                <View
                  style={{
                    width: ACTION,
                    height: ACTION,
                    borderRadius: ACTION / 2,
                    backgroundColor: 'rgba(255,255,255,0.09)',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Glyph name={a.icon} size={23} tint={ct.onDeep} strokeWidth={1.6} />
                </View>
                <T
                  variant="action"
                  color={ct.dim}
                  style={{ height: type.action.line, marginTop: 7 }}
                >
                  {a.label}
                </T>
              </View>
            </Pressable>
          ))}
        </View>
        */}
      </View>

      {/* STEP 1.09 section head
      <View
        style={{
          marginTop: GAP_ACTIONS_SHEET,
          height: sheetH,
          backgroundColor: sheet.page,
          borderTopLeftRadius: radius.sheet,
          borderTopRightRadius: radius.sheet,
          paddingTop: SHEET_PAD,
        }}
      >
        <View style={{ paddingHorizontal: MARGIN }}>
          <SectionHead title={copy.quickSend} />
        </View>

        <View style={{ marginTop: GAP_SECTION_BODY }}>
          <QuickSend />
        </View>

        <View style={{ marginTop: GAP_PEOPLE_SECTION, paddingHorizontal: MARGIN }}>
          <SectionHead title={copy.recent} onPress={() => router.push('/byteactivity')} />
        </View>

        <View style={{ marginTop: GAP_SECTION_BODY, paddingHorizontal: MARGIN }}>
          <Ledger rowH={rowH} />
        </View>

        <View style={{ flex: 1 }} />

        <Dock active={0} bottom={insets.bottom} />
      </View>
      */}
      {/* STEP 1.10 a stray gap under it | FIX 1.11 take the gap back out
      <View style={{ height: 23 }} />
      */}
    </View>
  );
}
