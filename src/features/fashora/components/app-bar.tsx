import { Image } from 'expo-image';
import { Pressable, Text, View } from 'react-native';

import { BRAND } from '../data/chrome';
import { ELEV, R, SP, TYPE, fa } from '../theme';

import { Symbol } from './symbol';
import type { SymbolName } from '../symbols';

/**
 * The fixed top bar, shared by all four screens.
 *
 * Two shapes in the export, and they differ by exactly two things: the feed
 * screens open with the brand lockup, the pushed screens open with a back
 * button and name themselves; the feed screens carry a bell on the right, the
 * pushed screens a share. Everything else — the 64dp bar, the 16dp inset, the
 * 44dp circular wells, the 32dp avatar — is identical, so this is one
 * component with an optional `onBack` and an optional `title`.
 *
 * The bar sits in flow above the scroll view rather than being `fixed` over it.
 * The export's header is translucent and the content scrolls under it, which
 * matters on a live page and not at all in a reference frame captured at scroll
 * zero — and in flow the safe-area inset is simply the bar's top padding.
 *
 * The lockup is the export's own 480x120 artwork at its natural ratio, 128x32.
 * Most of that width is the transparent tail after the wordmark, which is what
 * opens the gap before a screen title; that is the reference's spacing and it
 * is kept. What is *not* kept is the export's second wordmark: the feed screens
 * follow the lockup — which already reads "Fashora" — with a text span saying
 * "Fashora" again, and both render. One of them is a bug, so `title` is simply
 * left off those two screens.
 */
export function AppBar({
  title,
  action,
  onBack,
  onAction,
  onAvatar,
  inset,
}: {
  title?: string;
  action: SymbolName;
  onBack?: () => void;
  onAction?: () => void;
  onAvatar?: () => void;
  inset: number;
}) {
  return (
    <View
      style={{
        paddingTop: inset,
        backgroundColor: fa.surface,
        ...ELEV.card,
        shadowOpacity: 0.03,
        shadowRadius: 8,
        elevation: 2,
        zIndex: 50,
      }}
    >
      <View
        style={{
          height: 64,
          paddingHorizontal: SP.marginMobile,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: SP.sm,
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: SP.sm, flex: 1 }}>
          {onBack ? (
            <Pressable onPress={onBack} accessibilityRole="button" accessibilityLabel="Back">
              <View
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: R.full,
                  backgroundColor: fa.surfaceContainerLow,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Symbol name="arrowBack" size={20} />
              </View>
            </Pressable>
          ) : null}

          <Image
            source={BRAND.logo}
            style={{ width: 128, height: 32 }}
            contentFit="contain"
            accessibilityLabel="Fashora"
          />

          {title ? (
            <Text
              numberOfLines={1}
              style={{ ...TYPE.headlineSm, color: fa.onSurface, letterSpacing: -0.45, flexShrink: 1 }}
            >
              {title}
            </Text>
          ) : null}
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', gap: SP.sm }}>
          <Pressable onPress={onAction} accessibilityRole="button" accessibilityLabel={action}>
            <View
              style={{
                width: 44,
                height: 44,
                borderRadius: R.full,
                backgroundColor: fa.surfaceContainerLow,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Symbol name={action} size={action === 'notifications' ? 22 : 20} />
            </View>
          </Pressable>

          <Pressable onPress={onAvatar} accessibilityRole="button" accessibilityLabel="Profile">
            <View
              style={{
                width: 44,
                height: 44,
                borderRadius: R.full,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Image
                source={BRAND.avatar}
                style={{ width: 32, height: 32, borderRadius: R.full }}
              />
            </View>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
