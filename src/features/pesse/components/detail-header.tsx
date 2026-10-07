import { Image } from 'expo-image';
import { type ReactNode } from 'react';
import { Pressable, Text, View } from 'react-native';

import { type SymbolName } from '../symbols';
import { FONT, R, TYPE, ps } from '../theme';
import { Symbol } from './symbol';

/**
 * The header the two detail screens wear: a back button, the small Pesse
 * lockup, a title, and actions on the right.
 *
 * The title is left-aligned beside the back button rather than centred on the
 * screen — that is the reference's own arrangement here, and it is the
 * difference between this header and the tabbed screens' `AppHeader`.
 */
export function DetailHeader({
  title,
  onBack,
  action,
  onAction,
  photo,
  onProfile,
  right,
}: {
  title: string;
  onBack?: () => void;
  action?: SymbolName;
  onAction?: () => void;
  photo?: number;
  onProfile?: () => void;
  right?: ReactNode;
}) {
  return (
    <View
      style={{
        height: 64,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        <Pressable onPress={onBack} accessibilityRole="button" accessibilityLabel="Go back">
          <View
            style={{
              width: 44,
              height: 44,
              borderRadius: R.full,
              backgroundColor: ps.surfaceContainer,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Symbol name="arrowBack" size={20} color={ps.onSurface} />
          </View>
        </Pressable>

        <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 2 }}>
          <Text
            style={{
              fontFamily: FONT.extrabold,
              fontSize: 10,
              lineHeight: 13,
              letterSpacing: -0.2,
              color: ps.onSurface,
            }}
          >
            Pesse
          </Text>
          <View
            style={{
              width: 3,
              height: 3,
              borderRadius: 1.5,
              backgroundColor: ps.lime,
              marginBottom: 2,
            }}
          />
        </View>

        <Text style={[TYPE.headlineSm, { color: ps.onSurface }]} numberOfLines={1}>
          {title}
        </Text>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        {right}
        {action ? (
          <Pressable onPress={onAction} accessibilityRole="button">
            <View
              style={{
                width: 44,
                height: 44,
                borderRadius: R.full,
                backgroundColor: ps.surfaceContainer,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Symbol name={action} size={20} color={ps.onSurface} />
            </View>
          </Pressable>
        ) : null}
        {photo ? (
          <Pressable onPress={onProfile} accessibilityRole="button" accessibilityLabel="Profile">
            <Image
              source={photo}
              style={{
                width: 32,
                height: 32,
                borderRadius: 16,
                borderWidth: 1,
                borderColor: ps.outlineVariant,
              }}
              contentFit="cover"
              transition={0}
            />
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}
