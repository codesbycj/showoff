import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, Text, View } from 'react-native';

import { Card, Chip } from './bits';
import { Symbol } from './symbol';
import { HOME, type Pick } from '../data/home';
import { FONT, LEVEL, R, SP, TYPE, rb } from '../theme';

/** The search field and the filter button beside it. */
export function SearchRow({
  placeholder,
  onSearch,
  onFilter,
}: {
  placeholder: string;
  onSearch?: () => void;
  onFilter?: () => void;
}) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
      <Pressable style={{ flex: 1 }} onPress={onSearch} accessibilityRole="search">
        <View
          style={[
            {
              height: 50,
              borderRadius: R.md,
              backgroundColor: rb.surface,
              borderWidth: 1,
              borderColor: rb.hairline,
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 14,
              gap: 10,
            },
            LEVEL.card,
          ]}
        >
          <Symbol name="search" size={20} color={rb.secondary} />
          <Text style={[TYPE.bodyLg, { color: rb.secondary }]} numberOfLines={1}>
            {placeholder}
          </Text>
        </View>
      </Pressable>

      <Pressable onPress={onFilter} accessibilityRole="button" accessibilityLabel="Filters">
        <View
          style={{
            width: 50,
            height: 50,
            borderRadius: R.md,
            backgroundColor: rb.surfaceHigh,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Symbol name="tune" size={22} color={rb.ink} />
        </View>
      </Pressable>
    </View>
  );
}

/**
 * The pickup / delivery segmented toggle.
 *
 * The spec is precise about this one: the active half takes a 1.5dp crimson
 * border and a warm tint, the inactive half stays flush in the track. Both
 * halves are equal width so the capsule cannot shift when the selection moves.
 */
export function OrderToggle({
  mode,
  onSelect,
}: {
  mode: 'pickup' | 'delivery';
  onSelect?: (m: 'pickup' | 'delivery') => void;
}) {
  const halves = [
    {
      key: 'pickup' as const,
      icon: 'storefront' as const,
      title: HOME.pickupTitle,
      sub: HOME.pickupSub,
    },
    {
      key: 'delivery' as const,
      icon: 'moped' as const,
      title: HOME.deliveryTitle,
      sub: HOME.deliverySub,
    },
  ];

  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: rb.surfaceHigh,
        borderRadius: R.md,
        padding: 4,
        gap: 4,
      }}
    >
      {halves.map((h) => {
        const on = h.key === mode;

        return (
          <Pressable key={h.key} style={{ flex: 1 }} onPress={() => onSelect?.(h.key)}>
            <View
              style={{
                borderRadius: R.md - 2,
                paddingVertical: 10,
                paddingHorizontal: 12,
                alignItems: 'center',
                backgroundColor: on ? rb.surface : 'transparent',
                borderWidth: on ? 1.5 : 0,
                borderColor: on ? rb.crimson : 'transparent',
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                <Symbol name={h.icon} size={18} color={on ? rb.crimson : rb.secondary} />
                <Text style={[TYPE.titleMd, { color: on ? rb.crimson : rb.secondary }]}>
                  {h.title}
                </Text>
              </View>
              <Text style={[TYPE.labelMd, { color: on ? rb.crimson : rb.secondary, marginTop: 2 }]}>
                {h.sub}
              </Text>
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}

/**
 * The hero card — a café photograph under a dark scrim, with the headline and
 * an order button over it.
 *
 * The scrim is a gradient rather than a flat overlay: the reference darkens the
 * bottom two-thirds so the copy reads while the top stays open enough to see
 * the room. A flat wash at that opacity would flatten the photograph.
 */
export function HeroCard({ onOrder }: { onOrder?: () => void }) {
  const h = HOME.hero;

  return (
    <View style={[{ borderRadius: R.lg }, LEVEL.card]}>
      <View style={{ borderRadius: R.lg, overflow: 'hidden' }}>
        <Image
          source={require('../../../../assets/images/redbrew/hero-cafe.jpg')}
          style={{ width: '100%', height: 216 }}
          contentFit="cover"
        />

        <LinearGradient
          colors={['rgba(20,18,16,0.45)', 'rgba(20,18,16,0.82)', 'rgba(20,18,16,0.94)']}
          locations={[0, 0.45, 1]}
          style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
        />

        <View style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, padding: 16 }}>
          <View
            style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
          >
            <Chip label={h.tag} tone="crimson" caps dot />
            <View
              style={{
                backgroundColor: 'rgba(255,255,255,0.18)',
                paddingHorizontal: 10,
                paddingVertical: 4,
                borderRadius: 999,
              }}
            >
              <Text style={[TYPE.labelMd, { color: '#ffffff' }]}>{h.batch}</Text>
            </View>
          </View>

          <View style={{ flex: 1, justifyContent: 'flex-end' }}>
            <Text style={[TYPE.headlineXlMobile, { color: '#ffffff' }]} numberOfLines={1}>
              {h.title}
            </Text>
            <Text
              style={[TYPE.bodyLg, { color: 'rgba(255,255,255,0.85)', marginTop: 4 }]}
              numberOfLines={1}
            >
              {h.sub}
            </Text>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'flex-end',
                justifyContent: 'space-between',
                marginTop: 12,
              }}
            >
              <View>
                <Text
                  style={[
                    TYPE.labelSm,
                    { color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase' },
                  ]}
                >
                  {h.readyLabel}
                </Text>
                <Text
                  style={{
                    fontFamily: FONT.displayBold,
                    fontSize: 26,
                    lineHeight: 32,
                    color: '#ffffff',
                  }}
                >
                  {h.price}
                </Text>
              </View>

              <Pressable onPress={onOrder} accessibilityRole="button">
                <View
                  style={[
                    {
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 8,
                      backgroundColor: rb.crimson,
                      paddingHorizontal: 18,
                      paddingVertical: 12,
                      borderRadius: 999,
                    },
                    LEVEL.cta,
                  ]}
                >
                  <Text style={[TYPE.labelLg, { color: rb.onCrimson, textTransform: 'uppercase' }]}>
                    {h.cta}
                  </Text>
                  <Symbol name="arrowForward" size={17} color={rb.onCrimson} />
                </View>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

/** The loyalty strip, with its progress bar. */
export function ClubCard({ onPress }: { onPress?: () => void }) {
  const c = HOME.club;

  return (
    <Pressable onPress={onPress} accessibilityRole="button">
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 12,
          backgroundColor: rb.surfaceHigh,
          borderRadius: R.lg,
          padding: 12,
        }}
      >
        <View
          style={{
            width: 42,
            height: 42,
            borderRadius: 21,
            backgroundColor: rb.crimsonTint,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Symbol name="loyalty" size={21} color={rb.crimson} />
        </View>

        <View style={{ flex: 1 }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Text style={[TYPE.titleMd, { color: rb.ink }]}>{c.title}</Text>
            <Text style={[TYPE.labelLg, { color: rb.crimson }]}>{c.points}</Text>
          </View>

          <Text style={[TYPE.bodyMd, { color: rb.secondary, marginTop: 1 }]} numberOfLines={1}>
            {c.sub}
          </Text>

          <View
            style={{
              height: 5,
              borderRadius: 3,
              backgroundColor: rb.surfaceDim,
              marginTop: 8,
              overflow: 'hidden',
            }}
          >
            <View
              style={{
                width: `${c.progress * 100}%`,
                height: 5,
                borderRadius: 3,
                backgroundColor: rb.crimson,
              }}
            />
          </View>
        </View>

        <View
          style={{
            width: 30,
            height: 30,
            borderRadius: 15,
            backgroundColor: rb.surface,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Symbol name="chevronRight" size={18} color={rb.ink} />
        </View>
      </View>
    </Pressable>
  );
}

/** One product card in the two-up Popular Picks grid. */
export function PickCard({ pick, onPress }: { pick: Pick; onPress?: () => void }) {
  return (
    <Pressable style={{ flex: 1 }} onPress={onPress} accessibilityRole="button">
      <View
        style={[
          {
            borderRadius: R.lg,
            backgroundColor: rb.surface,
            borderWidth: 1,
            borderColor: rb.hairline,
            overflow: 'hidden',
          },
          LEVEL.card,
        ]}
      >
        <View>
          <Image source={pick.photo} style={{ width: '100%', height: 132 }} contentFit="cover" />

          <View
            style={{
              position: 'absolute',
              top: 8,
              left: 8,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 3,
              backgroundColor: 'rgba(255,255,255,0.92)',
              paddingHorizontal: 8,
              paddingVertical: 3,
              borderRadius: 999,
            }}
          >
            <Symbol name="star" size={12} color={rb.crimson} />
            <Text style={[TYPE.labelMd, { color: rb.ink }]}>{pick.rating}</Text>
          </View>

          <View
            style={{
              position: 'absolute',
              bottom: 8,
              left: 8,
              backgroundColor: 'rgba(20,18,16,0.62)',
              paddingHorizontal: 8,
              paddingVertical: 3,
              borderRadius: R.sm,
            }}
          >
            <Text style={[TYPE.labelSm, { color: '#ffffff' }]}>{pick.tag}</Text>
          </View>
        </View>

        <View style={{ padding: 12 }}>
          <Text style={[TYPE.titleMd, { color: rb.ink }]} numberOfLines={1}>
            {pick.name}
          </Text>
          <Text style={[TYPE.bodyMd, { color: rb.secondary, marginTop: 2 }]} numberOfLines={1}>
            {pick.sub}
          </Text>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 10,
            }}
          >
            <Text
              style={{
                fontFamily: FONT.displayBold,
                fontSize: 20,
                lineHeight: 26,
                color: rb.crimson,
              }}
            >
              {pick.price}
            </Text>

            <View
              style={[
                {
                  width: 32,
                  height: 32,
                  borderRadius: 16,
                  backgroundColor: rb.crimson,
                  alignItems: 'center',
                  justifyContent: 'center',
                },
                LEVEL.cta,
              ]}
            >
              <Symbol name="add" size={19} color={rb.onCrimson} />
            </View>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

/** The reorder block — a saved order plus a one-tap CTA. */
export function ReorderCard({ onReorder }: { onReorder?: () => void }) {
  const r = HOME.reorder;

  return (
    <View style={{ backgroundColor: rb.surfaceHigh, borderRadius: R.lg, padding: 12, gap: 10 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
          <Symbol name="history" size={19} color={rb.crimson} />
          <Text style={[TYPE.titleMd, { color: rb.ink }]}>{HOME.reorderTitle}</Text>
        </View>
        <Text style={[TYPE.labelMd, { color: rb.secondary }]}>{HOME.reorderWhen}</Text>
      </View>

      <Card padding={10}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          <Image
            source={require('../../../../assets/images/redbrew/cortado.jpg')}
            style={{ width: 46, height: 46, borderRadius: R.base }}
            contentFit="cover"
          />
          <View style={{ flex: 1 }}>
            <Text style={[TYPE.titleMd, { color: rb.ink }]} numberOfLines={1}>
              {r.title}
            </Text>
            <Text style={[TYPE.bodyMd, { color: rb.secondary }]} numberOfLines={1}>
              {r.sub}
            </Text>
          </View>
          <Text
            style={{
              fontFamily: FONT.displayBold,
              fontSize: 18,
              lineHeight: 24,
              color: rb.ink,
            }}
          >
            {r.price}
          </Text>
        </View>
      </Card>

      <Pressable onPress={onReorder} accessibilityRole="button">
        <View
          style={[
            {
              height: 48,
              borderRadius: 999,
              backgroundColor: rb.crimson,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
            },
            LEVEL.cta,
          ]}
        >
          <Symbol name="bolt" size={18} color={rb.onCrimson} />
          <Text style={[TYPE.labelLg, { color: rb.onCrimson, textTransform: 'uppercase' }]}>
            {r.cta}
          </Text>
        </View>
      </Pressable>
    </View>
  );
}

/** The closing note about today's roast. */
export function RoastNote() {
  return (
    <View
      style={{
        flexDirection: 'row',
        gap: 12,
        backgroundColor: rb.surfaceHigh,
        borderRadius: R.lg,
        padding: SP.gutter,
      }}
    >
      <View
        style={{
          width: 34,
          height: 34,
          borderRadius: 17,
          backgroundColor: rb.surface,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Symbol name="localFireDepartment" size={19} color={rb.crimson} />
      </View>

      <View style={{ flex: 1 }}>
        <Text style={[TYPE.titleMd, { color: rb.ink }]}>{HOME.roastTitle}</Text>
        <Text style={[TYPE.bodyMd, { color: rb.secondary, marginTop: 2 }]}>{HOME.roastBody}</Text>
      </View>
    </View>
  );
}
