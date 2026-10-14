import { Image, Pressable, Text, View } from 'react-native';

import { APP_BAR } from '../data/product';
import { HEADER_HEIGHT, MARGIN } from '../layout';
import { alpha, bt, type as t } from '../theme';
import { useBotanicInsets } from '../use-insets';
import { Symbol } from './symbol';

const logo = require('../../../../assets/images/botanic/logo.png');
const avatar = require('../../../../assets/images/botanic/avatar.jpg');

/**
 * The bar across the top: back, wordmark, title, profile.
 *
 * The title is **not** centred on the screen, and that is worth not
 * "correcting". The row is a plain `justify-between` over three children, so
 * where the title lands is whatever the free space leaves it: the left group
 * runs 102dp (a 44dp button, an 8dp gap, a 50dp mark) against the right
 * button's 44, which pushes the title 28dp right of the screen's middle. The
 * DOM dump puts it at x=155 in a 390 frame — centred would be x=126.5.
 *
 * Over the showcase panel the bar is `bg-surface/80` with a `backdrop-blur-xl`.
 * React Native has no backdrop filter, so the alpha carries alone; see the note
 * on `alpha` in theme.ts for why that costs almost nothing here.
 */
export function AppBar({ onBack }: { onBack?: () => void }) {
  const { top } = useBotanicInsets();

  return (
    <View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        paddingTop: top,
        backgroundColor: alpha.header,
      }}
    >
      <View
        style={{
          height: HEADER_HEIGHT,
          paddingHorizontal: MARGIN,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          {/* The visual box is on the inner View: a Pressable's function style
              is dropped in a static render, which silently loses its size. */}
          <Pressable onPress={onBack} accessibilityRole="button" accessibilityLabel="Go back">
            <View
              style={{
                width: 44,
                height: 44,
                borderRadius: 9999,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Symbol name="arrowBack" size={24} color={bt.ink} />
            </View>
          </Pressable>

          {/* `h-7 w-auto object-contain` — 28dp tall, and the mark's own
              aspect gives it 50dp of width. */}
          <Image
            source={logo}
            style={{ height: 28, width: 50 }}
            resizeMode="contain"
            accessibilityLabel="Sprouts"
          />
        </View>

        <Text
          numberOfLines={1}
          style={{
            maxWidth: 160,
            textAlign: 'center',
            fontFamily: t.headlineSm.family,
            fontSize: t.headlineSm.size,
            lineHeight: t.headlineSm.line,
            letterSpacing: t.headlineSm.tracking,
            color: bt.ink,
          }}
        >
          {APP_BAR.title.toUpperCase()}
        </Text>

        <Pressable accessibilityRole="button" accessibilityLabel="Profile">
          <View
            style={{
              width: 44,
              height: 44,
              borderRadius: 9999,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Image source={avatar} style={{ width: 32, height: 32, borderRadius: 9999 }} />
          </View>
        </Pressable>
      </View>
    </View>
  );
}
