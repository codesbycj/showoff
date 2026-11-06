import { Image } from 'expo-image';
import { useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';

import { HEADER_H, MARGIN, TAB_H } from '../layout';
import { ct, type } from '../theme';
import { avatar, copy, daysToGo, tabs } from '../data/trips';
import { Glyph } from './glyph';
import { T } from './text';

/** Who, what screen, and the overflow. */
export function TripHeader() {
  return (
    <View style={{ height: HEADER_H, flexDirection: 'row', alignItems: 'center' }}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Your profile"
        style={{ width: 44, height: 44, justifyContent: 'center' }}
      >
        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            overflow: 'hidden',
            backgroundColor: ct.field,
          }}
        >
          <Image source={avatar} style={{ width: 40, height: 40 }} contentFit="cover" />
        </View>
      </Pressable>

      <T
        variant="screenTitle"
        color={ct.onPage}
        style={{ flex: 1, textAlign: 'center', height: type.screenTitle.line }}
      >
        {copy.title}
      </T>

      <Pressable accessibilityRole="button" accessibilityLabel="More">
        <View
          style={{
            width: 44,
            height: 44,
            borderRadius: 14,
            backgroundColor: ct.field,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Glyph name="dots" size={20} tint={ct.onPage} />
        </View>
      </Pressable>
    </View>
  );
}

/**
 * Upcoming / Past / Saved / Wishlist.
 *
 * A rail, because the reference clips "Wishlist" against the screen edge —
 * which is always a horizontal scroller, never a wrap.
 */
export function TabRail() {
  const [active, setActive] = useState(0);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{ height: TAB_H, flexGrow: 0 }}
      contentContainerStyle={{ paddingHorizontal: MARGIN, alignItems: 'center' }}
    >
      {tabs.map((label, i) => {
        const on = i === active;
        return (
          <Pressable
            key={label}
            accessibilityRole="button"
            accessibilityLabel={label}
            accessibilityState={{ selected: on }}
            onPress={() => setActive(i)}
          >
            <View
              style={{
                height: TAB_H,
                paddingHorizontal: 20,
                borderRadius: 12,
                marginRight: 8,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: on ? ct.sheet : ct.field,
              }}
            >
              <T
                variant={on ? 'tabOn' : 'tab'}
                color={on ? ct.ink : ct.dim}
                style={{ height: type.tab.line }}
              >
                {label}
              </T>
            </View>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

/** "Next trip", and how long until it. */
export function NextTripRow() {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <T variant="next" color={ct.onPage} style={{ flex: 1, height: type.next.line }}>
        {copy.next}
      </T>
      <T variant="togo" color={ct.blueOnDark} style={{ height: type.togo.line }}>
        {`${daysToGo} days to go`}
      </T>
    </View>
  );
}
