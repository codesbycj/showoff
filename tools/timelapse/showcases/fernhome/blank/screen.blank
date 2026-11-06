import { Image } from 'expo-image';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useId, useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import Svg, { Defs, Path, RadialGradient, Rect, Stop } from 'react-native-svg';

// STEP 1.01 import glyph
// import { Glyph } from '@/features/fernhome/components/glyph';
// STEP 1.02 import promo card
// import { PromoCard } from '@/features/fernhome/components/promo-card';
// STEP 1.03 import text
// import { T } from '@/features/fernhome/components/text';
import { actions, avatar, copy, people, tabs } from '@/features/fernhome/data/home';
import {
  ACTION,
  AVATAR,
  CHIP_H,
  DOCK_H,
  GAP_ACTIONS_SHEET,
  GAP_BALANCE_CHIPS,
  GAP_CHIPS_ACTIONS,
  GAP_HEAD_LABEL,
  GAP_PROMO_SECTION,
  GAP_SECTION_PEOPLE,
  HEAD_H,
  MARGIN,
  PAD_TOP,
  PERSON,
  SECTION_H,
  SHEET_PAD,
  useFernHomeLayout,
} from '@/features/fernhome/layout';
import { ct, type } from '@/features/fernhome/theme';
import { useInsets } from '@/features/fernhome/use-insets';

/**
 * Fern — the account.
 *
 * Assembly only: who you are, what you have, the four things you do with it,
 * the reward on offer, and who you send to.
 *
 * The dark head carries a huge translucent "$" exactly as the reference does
 * — drawn as SVG text rather than set in a Text, so it cannot be selected,
 * cannot be read by a screen reader, and cannot wrap.
 *
 * The promo card takes the sheet's spare height, which is what stops a band
 * of white appearing between it and Quick Send.
 */
export default function FernhomeScreen() {
  const insets = useInsets();
  const [hidden, setHidden] = useState(false);
  const { sheetH, promoH, actionW } = useFernHomeLayout(insets);
  const glow = `fernHomeGlow-${useId()}`;

  return (
    <View style={{ flex: 1, backgroundColor: ct.groundDeep }}>
      <StatusBar style="light" />

      {/* STEP 1.04 view
      <View style={{ height: sheetH ? undefined : 0 }} />
      */}

      <View style={{ paddingTop: insets.top + PAD_TOP, paddingHorizontal: MARGIN }}>
        {/* STEP 1.05 radial gradient
        <Svg width="100%" height={320} style={{ position: 'absolute', top: 0, left: 0 }}>
          <Defs>
            <RadialGradient id={glow} cx="0.5" cy="0.1" r="0.9">
              <Stop offset="0" stopColor="#2A4C2D" />
              <Stop offset="1" stopColor={ct.groundDeep} />
            </RadialGradient>
          </Defs>
          <Rect x="0" y="0" width="100%" height="320" fill={`url(#${glow})`} />
          <Path
            d="M196 44v192M150 86c0-20 20-32 46-32s46 12 46 32-20 30-46 36-46 16-46 36 20 32 46 32 46-12 46-32"
            stroke="rgba(160,224,150,0.08)"
            strokeWidth="26"
            strokeLinecap="round"
            fill="none"
          />
        </Svg>
        */}

        {/* STEP 1.06 "Messages"
        <View style={{ height: HEAD_H, flexDirection: 'row', alignItems: 'center', zIndex: 1 }}>
          <View
            style={{
              width: AVATAR,
              height: AVATAR,
              borderRadius: AVATAR / 2,
              overflow: 'hidden',
              backgroundColor: ct.panel,
            }}
          >
            <Image source={avatar} style={{ width: AVATAR, height: AVATAR }} contentFit="cover" />
          </View>
          <View style={{ flex: 1, marginLeft: 12 }}>
            <T variant="hello" color={ct.dim} style={{ height: type.hello.line }}>
              {copy.hello}
            </T>
            <T variant="name" color={ct.onGround} style={{ height: type.name.line }}>
              {copy.name}
            </T>
          </View>
          <Pressable accessibilityRole="button" accessibilityLabel="Messages">
            <View
              style={{
                width: 46,
                height: 46,
                borderRadius: 23,
                borderWidth: 1,
                borderColor: 'rgba(255,255,255,0.22)',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Glyph name="inbox" size={21} tint={ct.onGround} />
            </View>
          </Pressable>
        </View>
        */}

        {/* STEP 1.07 balance label
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: GAP_HEAD_LABEL,
            zIndex: 1,
          }}
        >
          <T variant="label" color={ct.dim} style={{ flex: 1, height: type.label.line }}>
            {copy.balanceLabel}
          </T>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={hidden ? 'Show balance' : 'Hide balance'}
            onPress={() => setHidden((v) => !v)}
            style={{ width: 44, height: 44, alignItems: 'flex-end', justifyContent: 'center' }}
          >
            <Glyph name="eyeOff" size={20} tint={ct.dim} />
          </Pressable>
        </View>
        */}

        {/* STEP 1.08 delta
        <View style={{ flexDirection: 'row', alignItems: 'center', zIndex: 1 }}>
          <T variant="balance" color={ct.onGround} style={{ height: type.balance.line }}>
            {hidden ? '$ ••••••' : copy.balance}
          </T>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              height: 28,
              paddingHorizontal: 10,
              borderRadius: 14,
              backgroundColor: ct.leaf,
              marginLeft: 12,
            }}
          >
            <Glyph name="trend" size={13} tint={ct.onLeaf} strokeWidth={2.2} />
            <T variant="delta" color={ct.onLeaf} style={{ height: type.delta.line, marginLeft: 4 }}>
              {copy.delta}
            </T>
          </View>
        </View>
        */}

        {/* STEP 1.09 status
        <View style={{ flexDirection: 'row', marginTop: GAP_BALANCE_CHIPS, zIndex: 1 }}>
          <View
            style={{
              height: CHIP_H,
              paddingHorizontal: 14,
              borderRadius: CHIP_H / 2,
              backgroundColor: 'rgba(255,255,255,0.09)',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <T variant="chip" color={ct.dim} style={{ height: type.chip.line }}>
              {copy.status}
            </T>
            <T variant="chipOn" color={ct.leaf} style={{ height: type.chipOn.line, marginLeft: 5 }}>
              {copy.statusValue}
            </T>
          </View>

          <View style={{ flex: 1 }} />

          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`Copy account ID ${copy.id}`}
            style={{ paddingVertical: 4 }}
          >
            <View
              style={{
                height: CHIP_H,
                paddingHorizontal: 14,
                borderRadius: CHIP_H / 2,
                backgroundColor: 'rgba(255,255,255,0.09)',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <T variant="chip" color={ct.dim} style={{ height: type.chip.line }}>
                {copy.idLabel}
              </T>
              <T
                variant="chipOn"
                color={ct.onGround}
                style={{ height: type.chipOn.line, marginLeft: 5 }}
              >
                {copy.id}
              </T>
              <View style={{ marginLeft: 8 }}>
                <Glyph name="copy" size={15} tint={ct.dim} />
              </View>
            </View>
          </Pressable>
        </View>
        */}

        {/* STEP 1.10 glyph
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: GAP_CHIPS_ACTIONS,
            zIndex: 1,
          }}
        >
          {actions.map((a) => (
            <Pressable key={a.id} accessibilityRole="button" accessibilityLabel={a.label}>
              <View
                style={{
                  width: actionW,
                  height: ACTION,
                  borderRadius: 20,
                  backgroundColor: a.tint,
                  borderWidth: a.id === 'more' ? 0 : 1,
                  borderColor: 'rgba(255,255,255,0.12)',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Glyph
                  name={a.icon}
                  size={23}
                  tint={a.id === 'more' ? ct.ink : ct.onGround}
                  strokeWidth={1.7}
                />
              </View>
            </Pressable>
          ))}
        </View>
        */}
      </View>

      {/* STEP 1.11 "Send to someone new"
      <View
        style={{
          marginTop: GAP_ACTIONS_SHEET,
          flex: 1,
          backgroundColor: ct.sheet,
          borderTopLeftRadius: 28,
          borderTopRightRadius: 28,
          paddingTop: SHEET_PAD,
        }}
      >
        <View style={{ paddingHorizontal: MARGIN }}>
          <PromoCard height={promoH} />
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            height: SECTION_H,
            marginTop: GAP_PROMO_SECTION,
            paddingHorizontal: MARGIN,
          }}
        >
          <T variant="section" color={ct.ink} style={{ flex: 1, height: type.section.line }}>
            {copy.quickSend}
          </T>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`${copy.seeAll}: ${copy.quickSend}`}
            style={{ paddingVertical: 13, paddingLeft: 12 }}
          >
            <T variant="seeAll" color={ct.leafDeep} style={{ height: type.seeAll.line }}>
              {copy.seeAll}
            </T>
          </Pressable>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ height: PERSON + 22, flexGrow: 0, marginTop: GAP_SECTION_PEOPLE }}
          contentContainerStyle={{ paddingHorizontal: MARGIN, alignItems: 'center' }}
        >
          {people.map((p) => (
            <Pressable
              key={p.id}
              accessibilityRole="button"
              accessibilityLabel={`Send to ${p.name}`}
            >
              <View style={{ alignItems: 'center', marginRight: 16 }}>
                <View
                  style={{
                    width: PERSON,
                    height: PERSON,
                    borderRadius: PERSON / 2,
                    overflow: 'hidden',
                    backgroundColor: ct.hairline,
                  }}
                >
                  <Image
                    source={p.photo}
                    style={{ width: PERSON, height: PERSON }}
                    contentFit="cover"
                  />
                </View>
                <T
                  variant="person"
                  color={ct.ink}
                  style={{ height: type.person.line, marginTop: 6 }}
                >
                  {p.name}
                </T>
              </View>
            </Pressable>
          ))}

          <Pressable accessibilityRole="button" accessibilityLabel="Send to someone new">
            <View style={{ alignItems: 'center', marginRight: 16 }}>
              <View
                style={{
                  width: PERSON,
                  height: PERSON,
                  borderRadius: PERSON / 2,
                  backgroundColor: ct.leafDeep,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Glyph name="plus" size={22} tint="#FFFFFF" />
              </View>
              <T variant="person" color={ct.ink} style={{ height: type.person.line, marginTop: 6 }}>
                {copy.newPerson}
              </T>
            </View>
          </Pressable>
        </ScrollView>

        <View style={{ height: DOCK_H + insets.bottom }} />

        <View
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            height: DOCK_H + insets.bottom,
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#F4F6F3',
          }}
        >
          {tabs.map((tab, i) => (
            <Pressable
              key={tab.id}
              accessibilityRole="button"
              accessibilityLabel={tab.label}
              accessibilityState={{ selected: i === 0 }}
              onPress={i === 1 ? () => router.push('/fernreport') : undefined}
              style={{ flex: 1, height: '100%', alignItems: 'center', justifyContent: 'center' }}
            >
              <View
                style={{
                  width: 46,
                  height: 46,
                  borderRadius: 23,
                  backgroundColor: i === 0 ? ct.ink : 'transparent',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Glyph
                  name={tab.icon}
                  size={22}
                  tint={i === 0 ? ct.leaf : ct.muted}
                  filled={i === 0 && tab.icon === 'home'}
                />
              </View>
            </Pressable>
          ))}
        </View>
      </View>
      */}
      {/* STEP 1.12 a stray gap under it | FIX 1.13 take the gap back out
      <View style={{ height: 23 }} />
      */}
    </View>
  );
}
