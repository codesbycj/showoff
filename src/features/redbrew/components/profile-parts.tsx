import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, Text, View } from 'react-native';

import { Card, Chip } from './bits';
import { Symbol } from './symbol';
import { PREFS, PROFILE, STATS, type Perk, type PrefRow } from '../data/profile';
import { FONT, LEVEL, R, TYPE, rb } from '../theme';

/** The identity card — avatar, name, tier, contact, and the VIP strip. */
export function IdentityCard({ onEdit }: { onEdit?: () => void }) {
  return (
    <Card padding={14}>
      <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 14 }}>
        <View style={{ width: 64, height: 64 }}>
          <Image
            source={require('../../../../assets/images/redbrew/alex.jpg')}
            style={{ width: 64, height: 64, borderRadius: 32 }}
            contentFit="cover"
          />
          <View
            style={{
              position: 'absolute',
              right: -2,
              bottom: -2,
              width: 24,
              height: 24,
              borderRadius: 12,
              backgroundColor: rb.crimson,
              borderWidth: 2,
              borderColor: rb.surface,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Symbol name="localFireDepartment" size={13} color={rb.onCrimson} />
          </View>
        </View>

        <View style={{ flex: 1 }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 8,
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, flex: 1 }}>
              <Text style={[TYPE.headlineMd, { color: rb.ink }]} numberOfLines={1}>
                {PROFILE.name}
              </Text>
              <Chip label={PROFILE.tier} tone="crimsonSoft" caps />
            </View>

            <Pressable onPress={onEdit} accessibilityRole="button">
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 4,
                  backgroundColor: rb.surfaceLow,
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                  borderRadius: 999,
                }}
              >
                <Symbol name="edit" size={15} color={rb.ink} />
                <Text style={[TYPE.labelMd, { color: rb.ink }]}>{PROFILE.edit}</Text>
              </View>
            </Pressable>
          </View>

          <Text style={[TYPE.bodyMd, { color: rb.secondary, marginTop: 2 }]} numberOfLines={1}>
            {PROFILE.email}
          </Text>
          <Text style={[TYPE.labelLg, { color: rb.ink, marginTop: 2 }]}>{PROFILE.phone}</Text>
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 10,
          backgroundColor: rb.surfaceLow,
          borderRadius: R.md,
          padding: 12,
          marginTop: 14,
        }}
      >
        <Symbol name="workspacePremium" size={22} color={rb.crimson} />

        <View style={{ flex: 1 }}>
          <Text
            style={[
              TYPE.labelSm,
              { color: rb.crimson, textTransform: 'uppercase', letterSpacing: 0.5 },
            ]}
          >
            {PROFILE.vipLabel}
          </Text>
          <Text style={[TYPE.bodyLg, { color: rb.ink }]} numberOfLines={1}>
            {PROFILE.vipStatus}
          </Text>
        </View>

        <Text style={[TYPE.labelLg, { color: rb.crimson }]}>{PROFILE.vipRank}</Text>
      </View>
    </Card>
  );
}

/**
 * The crimson balance card.
 *
 * A gradient rather than a flat fill: the reference runs it lighter at the top
 * left and deeper at the bottom right, which is what stops a block this large
 * from flattening the screen. The points tray inside is a darkened panel, not a
 * separate card, so it reads as recessed into the crimson.
 */
export function CashCard({
  onTopUp,
  onTransfer,
}: {
  onTopUp?: () => void;
  onTransfer?: () => void;
}) {
  return (
    <View style={[{ borderRadius: R.lg }, LEVEL.cta]}>
      <LinearGradient
        colors={[rb.crimson, rb.crimsonDeep]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ borderRadius: R.lg, padding: 16 }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <Symbol name="wallet" size={20} color={rb.onCrimson} />
            <Text
              style={[
                TYPE.labelLg,
                { color: rb.onCrimson, textTransform: 'uppercase', letterSpacing: 0.6 },
              ]}
            >
              {PROFILE.cashLabel}
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 5,
              backgroundColor: 'rgba(255,255,255,0.2)',
              paddingHorizontal: 10,
              paddingVertical: 5,
              borderRadius: 999,
            }}
          >
            <Symbol name="qrCodeScanner" size={14} color={rb.onCrimson} />
            <Text style={[TYPE.labelMd, { color: rb.onCrimson }]}>{PROFILE.payInStore}</Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            marginTop: 14,
            gap: 12,
          }}
        >
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontFamily: FONT.displayBold,
                fontSize: 34,
                lineHeight: 40,
                letterSpacing: -0.6,
                color: rb.onCrimson,
              }}
            >
              {PROFILE.balance}
            </Text>
            <Text style={[TYPE.bodyMd, { color: 'rgba(255,255,255,0.8)' }]} numberOfLines={2}>
              {PROFILE.balanceNote}
            </Text>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <Pressable onPress={onTopUp} accessibilityRole="button">
              <View
                style={{
                  backgroundColor: rb.surface,
                  paddingHorizontal: 16,
                  paddingVertical: 10,
                  borderRadius: 999,
                }}
              >
                <Text style={[TYPE.labelLg, { color: rb.crimson }]}>{PROFILE.topUp}</Text>
              </View>
            </Pressable>

            <Pressable onPress={onTransfer} accessibilityRole="button">
              <View
                style={{
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  paddingHorizontal: 16,
                  paddingVertical: 10,
                  borderRadius: 999,
                }}
              >
                <Text style={[TYPE.labelLg, { color: rb.onCrimson }]}>{PROFILE.transfer}</Text>
              </View>
            </Pressable>
          </View>
        </View>

        <View
          style={{
            backgroundColor: 'rgba(0,0,0,0.18)',
            borderRadius: R.md,
            padding: 12,
            marginTop: 14,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              <Symbol name="bolt" size={17} color={rb.onCrimson} />
              <Text style={[TYPE.labelLg, { color: rb.onCrimson }]}>{PROFILE.pointsLabel}</Text>
            </View>

            <Text style={[TYPE.titleLg, { color: rb.onCrimson }]}>
              {PROFILE.points}
              <Text style={[TYPE.labelMd, { color: 'rgba(255,255,255,0.7)' }]}>
                {' '}
                {PROFILE.pointsMax}
              </Text>
            </Text>
          </View>

          <View
            style={{
              height: 7,
              borderRadius: 4,
              backgroundColor: 'rgba(0,0,0,0.25)',
              marginTop: 10,
              overflow: 'hidden',
            }}
          >
            <View
              style={{
                width: `${PROFILE.pointsProgress * 100}%`,
                height: 7,
                borderRadius: 4,
                backgroundColor: rb.mint,
              }}
            />
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 8,
              gap: 8,
            }}
          >
            <Text style={[TYPE.labelMd, { color: 'rgba(255,255,255,0.85)' }]} numberOfLines={1}>
              {PROFILE.pointsNote}
            </Text>
            <Text style={[TYPE.labelMd, { color: rb.mint }]}>{PROFILE.pointsReady}</Text>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}

/** The three stat tiles. */
export function StatTiles() {
  return (
    <View style={{ flexDirection: 'row', gap: 10 }}>
      {STATS.map((s) => (
        <View key={s.key} style={{ flex: 1 }}>
          <Card padding={12}>
            <View style={{ alignItems: 'center', gap: 4 }}>
              <Symbol name={s.icon} size={22} color={rb.crimson} />
              <Text
                style={{
                  fontFamily: FONT.displayBold,
                  fontSize: 20,
                  lineHeight: 26,
                  color: rb.ink,
                }}
              >
                {s.value}
              </Text>
              <Text style={[TYPE.bodyMd, { color: rb.secondary }]} numberOfLines={1}>
                {s.label}
              </Text>
            </View>
          </Card>
        </View>
      ))}
    </View>
  );
}

/** One card on the perks rail. */
export function PerkCard({ perk, onApply }: { perk: Perk; onApply?: () => void }) {
  return (
    <View style={{ width: 252 }}>
      <Card padding={14}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 8,
          }}
        >
          <Chip label={perk.tag} tone={perk.tone} caps />
          <Text style={[TYPE.labelMd, { color: rb.secondary }]}>{perk.expiry}</Text>
        </View>

        <Text style={[TYPE.titleLg, { color: rb.ink, marginTop: 10 }]} numberOfLines={1}>
          {perk.title}
        </Text>
        <Text style={[TYPE.bodyMd, { color: rb.secondary, marginTop: 2 }]} numberOfLines={2}>
          {perk.body}
        </Text>

        <Pressable onPress={onApply} accessibilityRole="button">
          <View
            style={{
              backgroundColor: rb.surfaceLow,
              borderRadius: 999,
              paddingVertical: 10,
              alignItems: 'center',
              marginTop: 12,
            }}
          >
            <Text style={[TYPE.labelLg, { color: rb.crimson }]}>{perk.cta}</Text>
          </View>
        </Pressable>
      </Card>
    </View>
  );
}

/** The preferences list — one card holding four rows. */
export function PrefsCard({ onRow }: { onRow?: (key: string) => void }) {
  return (
    <Card padding={4}>
      {PREFS.map((row, i) => (
        <PrefRowView key={row.key} row={row} first={i === 0} onPress={() => onRow?.(row.key)} />
      ))}
    </Card>
  );
}

function PrefRowView({
  row,
  first,
  onPress,
}: {
  row: PrefRow;
  first?: boolean;
  onPress?: () => void;
}) {
  return (
    <Pressable onPress={onPress} accessibilityRole="button">
      <View
        style={[
          {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 12,
            padding: 12,
          },
          !first && { borderTopWidth: 1, borderTopColor: rb.surfaceLow },
        ]}
      >
        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: rb.surfaceLow,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Symbol name={row.icon} size={20} color={rb.crimson} />
        </View>

        <View style={{ flex: 1 }}>
          <Text style={[TYPE.titleMd, { color: rb.ink }]}>{row.title}</Text>
          <Text style={[TYPE.bodyMd, { color: rb.secondary }]} numberOfLines={1}>
            {row.sub}
          </Text>
        </View>

        <Symbol name="chevronRight" size={20} color={rb.secondary} />
      </View>
    </Pressable>
  );
}

/** The concierge row, with its online pip and chat button. */
export function ConciergeRow({ onChat }: { onChat?: () => void }) {
  return (
    <Card padding={12}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <View style={{ width: 44, height: 44 }}>
          <Image
            source={require('../../../../assets/images/redbrew/dianna.jpg')}
            style={{ width: 44, height: 44, borderRadius: 22 }}
            contentFit="cover"
          />
          <View
            style={{
              position: 'absolute',
              right: 0,
              bottom: 0,
              width: 12,
              height: 12,
              borderRadius: 6,
              backgroundColor: rb.mint,
              borderWidth: 2,
              borderColor: rb.surface,
            }}
          />
        </View>

        <View style={{ flex: 1 }}>
          <Text style={[TYPE.titleMd, { color: rb.ink }]}>{PROFILE.conciergeTitle}</Text>
          <Text style={[TYPE.bodyMd, { color: rb.secondary }]} numberOfLines={1}>
            {PROFILE.conciergeSub}
          </Text>
        </View>

        <Pressable onPress={onChat} accessibilityRole="button">
          <View
            style={{
              backgroundColor: rb.crimson,
              paddingHorizontal: 18,
              paddingVertical: 9,
              borderRadius: 999,
            }}
          >
            <Text style={[TYPE.labelLg, { color: rb.onCrimson }]}>{PROFILE.conciergeCta}</Text>
          </View>
        </Pressable>
      </View>
    </Card>
  );
}

/** The log-out card and the version lines under it. */
export function LogoutBlock({ onPress }: { onPress?: () => void }) {
  return (
    <View style={{ gap: 10 }}>
      <Pressable onPress={onPress} accessibilityRole="button">
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            backgroundColor: rb.surfaceHigh,
            borderRadius: R.lg,
            paddingVertical: 16,
          }}
        >
          <Symbol name="logout" size={20} color={rb.crimson} />
          <Text style={[TYPE.titleMd, { color: rb.crimson }]}>{PROFILE.logout}</Text>
        </View>
      </Pressable>

      <View style={{ alignItems: 'center', gap: 2 }}>
        <Text style={[TYPE.labelMd, { color: rb.secondary }]}>{PROFILE.version}</Text>
        <Text style={[TYPE.bodyMd, { color: rb.surfaceDim }]}>{PROFILE.rights}</Text>
      </View>
    </View>
  );
}
