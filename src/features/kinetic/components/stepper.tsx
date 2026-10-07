import { Text, View } from 'react-native';

import { Symbol } from './symbol';
import type { SymbolName } from '../symbols';
import { FONT, kc } from '../theme';

export type Milestone =
  | { state: 'done' }
  | { state: 'active'; badge?: string; badgeWidth?: number }
  | { state: 'pending' }
  | { state: 'icon'; icon: SymbolName; active?: boolean };

/**
 * The tracking stepper — milestone nodes on a dashed path.
 *
 * The dashes are drawn as a row of small bars rather than a `borderStyle:
 * 'dashed'` line. React Native's dashed border is rendered by the platform and
 * the two do not agree on dash length, so the one thing the design is precise
 * about — an evenly dotted coral run up to the active node, grey after it —
 * would differ between the harness and the device with no way to see it.
 *
 * The segment before the active node takes the coral dashes and the rest goes
 * grey, so progress reads off the line itself and not only off the nodes.
 *
 * `onDark` swaps the pending tones for the charcoal sheet, where the same
 * stepper appears over a dark surface.
 */
export function Stepper({
  steps,
  onDark = false,
  nodeSize = 20,
}: {
  steps: Milestone[];
  onDark?: boolean;
  nodeSize?: number;
}) {
  const activeIndex = steps.findIndex(
    (s) => s.state === 'active' || (s.state === 'icon' && s.active),
  );

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      {steps.map((step, i) => (
        <View key={i} style={i === 0 ? undefined : { flex: 1, flexDirection: 'row' }}>
          {i === 0 ? null : (
            <DashRun done={activeIndex === -1 ? true : i <= activeIndex} onDark={onDark} />
          )}
          <Node step={step} size={nodeSize} onDark={onDark} />
        </View>
      ))}
    </View>
  );
}

/** The run of dashes between two nodes. */
function DashRun({ done, onDark }: { done: boolean; onDark: boolean }) {
  const color = done ? kc.coral : onDark ? kc.handle : kc.outlineVariant;

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 5,
      }}
    >
      {Array.from({ length: 9 }).map((_, i) => (
        <View key={i} style={{ width: 4, height: 2, borderRadius: 1, backgroundColor: color }} />
      ))}
    </View>
  );
}

function Node({ step, size, onDark }: { step: Milestone; size: number; onDark: boolean }) {
  if (step.state === 'done') {
    return (
      <View
        style={{
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: kc.coral,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Symbol name="check" size={size * 0.65} color={kc.onCoral} />
      </View>
    );
  }

  if (step.state === 'icon') {
    return (
      <View
        style={{
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: step.active ? kc.coral : onDark ? kc.charcoalEdge : kc.surfaceHigh,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Symbol
          name={step.icon}
          size={size * 0.6}
          color={step.active ? kc.onCoral : onDark ? kc.onDarkMuted : kc.secondary}
        />
      </View>
    );
  }

  if (step.state === 'active') {
    return (
      <View style={{ alignItems: 'center' }}>
        {step.badge ? (
          /* An absolutely positioned child is laid out against its parent's
             box, and the parent here is one 20dp node — so the badge needs an
             explicit width or its two words wrap onto separate lines. It is
             centred on the node by half that width. */
          <View
            style={{
              position: 'absolute',
              bottom: size + 6,
              left: (size - (step.badgeWidth ?? 78)) / 2,
              width: step.badgeWidth ?? 78,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 5,
              backgroundColor: kc.charcoal,
              paddingVertical: 4,
              borderRadius: 999,
            }}
          >
            <View style={{ width: 5, height: 5, borderRadius: 2.5, backgroundColor: kc.coral }} />
            <Text
              numberOfLines={1}
              style={{
                fontFamily: FONT.semibold,
                fontSize: 10,
                lineHeight: 14,
                color: kc.surface,
              }}
            >
              {step.badge}
            </Text>
          </View>
        ) : null}

        {/* A solid coral disc inside a pale coral ring — the design's
            "solid concentric ring" for the step currently in progress. */}
        <View
          style={{
            width: size,
            height: size,
            borderRadius: size / 2,
            borderWidth: 3,
            borderColor: kc.coralTint,
            backgroundColor: kc.coral,
          }}
        />
      </View>
    );
  }

  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        borderWidth: 2,
        borderColor: onDark ? kc.handle : kc.outlineVariant,
        backgroundColor: 'transparent',
      }}
    />
  );
}
