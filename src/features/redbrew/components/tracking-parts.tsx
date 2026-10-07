import { Image } from 'expo-image';
import { Pressable, Text, View } from 'react-native';

import { Card, Chip } from './bits';
import { Symbol } from './symbol';
import { STEPS, TRACKING, type Step } from '../data/tracking';
import { FONT, LEVEL, R, TYPE, rb } from '../theme';

/** The order card at the top — thumbnail, two promo chips, name and price. */
export function OrderCard() {
  const o = TRACKING.order;

  return (
    <Card padding={12}>
      <View style={{ flexDirection: 'row', gap: 12 }}>
        <Image
          source={require('../../../../assets/images/redbrew/cup-thumb.jpg')}
          style={{ width: 74, height: 82, borderRadius: R.md }}
          contentFit="cover"
        />

        <View style={{ flex: 1, gap: 6 }}>
          <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 8 }}>
            <View style={{ flex: 1, gap: 6 }}>
              <Chip label={o.deal} tone="mint" caps />
              <Chip label={o.delivery} tone="neutral" />
            </View>

            <View style={{ alignItems: 'flex-end' }}>
              <Text
                style={{
                  fontFamily: FONT.displayBold,
                  fontSize: 22,
                  lineHeight: 28,
                  color: rb.crimson,
                }}
              >
                {o.price}
              </Text>
              <Text style={[TYPE.bodyMd, { color: rb.secondary }]}>{o.paid}</Text>
            </View>
          </View>

          <View>
            <Text style={[TYPE.titleLg, { color: rb.ink }]} numberOfLines={1}>
              {o.name}
            </Text>
            <Text style={[TYPE.bodyMd, { color: rb.secondary }]}>{o.sub}</Text>
          </View>
        </View>
      </View>
    </Card>
  );
}

/** The dispatch banner — order number on the left, live status pill on the right. */
export function DispatchCard() {
  return (
    <Card padding={16}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <View>
          <Text
            style={[
              TYPE.labelMd,
              { color: rb.secondary, textTransform: 'uppercase', letterSpacing: 0.6 },
            ]}
          >
            {TRACKING.dispatchLabel}
          </Text>
          <Text style={[TYPE.headlineMd, { color: rb.ink, marginTop: 2 }]}>{TRACKING.orderNo}</Text>
        </View>

        <Chip label={TRACKING.status} tone="crimsonSoft" dot />
      </View>
    </Card>
  );
}

/**
 * The vertical progress timeline.
 *
 * The connector is drawn as a bar between each node rather than as a border on
 * the node itself, so its colour can follow the *lower* step's state — which is
 * what makes the run go crimson up to the active node and grey after it.
 *
 * The last step has no connector below it, so the row renders one only when
 * there is a step after it.
 */
export function ProgressCard() {
  return (
    <Card padding={16}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 16,
        }}
      >
        <Text style={[TYPE.headlineMd, { color: rb.ink }]}>{TRACKING.progressTitle}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
          <Symbol name="bolt" size={16} color="#047857" />
          <Text
            style={[
              TYPE.labelMd,
              { color: '#047857', textTransform: 'uppercase', letterSpacing: 0.5 },
            ]}
          >
            {TRACKING.fast}
          </Text>
        </View>
      </View>

      {STEPS.map((s, i) => (
        <StepRow key={s.key} step={s} last={i === STEPS.length - 1} next={STEPS[i + 1]} />
      ))}
    </Card>
  );
}

function StepRow({ step, last, next }: { step: Step; last: boolean; next?: Step }) {
  const crimson = step.state !== 'upcoming';
  const label = step.state === 'active' ? rb.crimson : rb.ink;

  return (
    <View style={{ flexDirection: 'row', gap: 14 }}>
      <View style={{ alignItems: 'center' }}>
        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: crimson ? rb.crimson : rb.surfaceHigh,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Symbol
            name={step.state === 'done' ? 'check' : step.icon!}
            size={21}
            color={crimson ? rb.onCrimson : rb.secondary}
          />
        </View>

        {last ? null : (
          <View
            style={{
              width: 2,
              flex: 1,
              minHeight: 26,
              backgroundColor: next && next.state !== 'upcoming' ? rb.crimson : rb.surfaceHigh,
            }}
          />
        )}
      </View>

      <View style={{ flex: 1, paddingBottom: last ? 0 : 18 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <Text
            style={[TYPE.titleMd, { color: step.state === 'active' ? rb.crimson : rb.secondary }]}
          >
            {step.time}
          </Text>
          <Text style={[TYPE.titleLg, { color: label }]}>{step.title}</Text>
        </View>
        <Text style={[TYPE.bodyLg, { color: rb.secondary, marginTop: 1 }]}>{step.sub}</Text>
      </View>
    </View>
  );
}

/** The delivery address strip. */
export function AddressRow({ onEdit }: { onEdit?: () => void }) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        backgroundColor: rb.surfaceHigh,
        borderRadius: R.lg,
        padding: 14,
      }}
    >
      <Symbol name="locationOn" size={24} color={rb.crimson} />

      <View style={{ flex: 1 }}>
        <Text style={[TYPE.titleLg, { color: rb.ink }]} numberOfLines={1}>
          {TRACKING.address}
        </Text>
        <Text style={[TYPE.bodyLg, { color: rb.secondary }]}>{TRACKING.addressNote}</Text>
      </View>

      <Pressable onPress={onEdit} accessibilityRole="button">
        <View
          style={[
            {
              backgroundColor: rb.surface,
              paddingHorizontal: 16,
              paddingVertical: 8,
              borderRadius: 999,
            },
            LEVEL.card,
          ]}
        >
          <Text style={[TYPE.labelLg, { color: rb.ink }]}>{TRACKING.edit}</Text>
        </View>
      </Pressable>
    </View>
  );
}

/** The crimson customer-service bar pinned to the bottom. */
export function SupportBar({ onChat, onCall }: { onChat?: () => void; onCall?: () => void }) {
  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: 12,
          backgroundColor: rb.crimson,
          borderRadius: R.xl,
          padding: 12,
        },
        LEVEL.cta,
      ]}
    >
      <View
        style={{
          width: 44,
          height: 44,
          borderRadius: 22,
          backgroundColor: 'rgba(255,255,255,0.2)',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Symbol name="supportAgent" size={23} color={rb.onCrimson} />
      </View>

      <View style={{ flex: 1 }}>
        <Text
          style={[
            TYPE.labelMd,
            {
              color: 'rgba(255,255,255,0.8)',
              textTransform: 'uppercase',
              letterSpacing: 0.6,
            },
          ]}
        >
          {TRACKING.supportLabel}
        </Text>
        <Text style={[TYPE.titleLg, { color: rb.onCrimson }]} numberOfLines={1}>
          {TRACKING.supportName}
        </Text>
      </View>

      <Pressable onPress={onChat} accessibilityRole="button" accessibilityLabel="Chat">
        <View
          style={{
            width: 44,
            height: 44,
            borderRadius: 22,
            backgroundColor: 'rgba(255,255,255,0.2)',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Symbol name="chat" size={22} color={rb.onCrimson} />
        </View>
      </Pressable>

      <Pressable onPress={onCall} accessibilityRole="button" accessibilityLabel="Call">
        <View
          style={{
            width: 44,
            height: 44,
            borderRadius: 22,
            backgroundColor: rb.surface,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Symbol name="call" size={22} color={rb.crimson} />
        </View>
      </Pressable>
    </View>
  );
}
