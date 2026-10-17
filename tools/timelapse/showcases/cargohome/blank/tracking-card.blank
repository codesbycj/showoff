import { View } from 'react-native';

import { FastBadge } from './fast-badge';
import { Icon } from './icon';
import { ParcelStack } from './parcel-stack';
import { ProgressTrack } from './progress-track';
import { T } from './text';
import { TRACKING_CARD_H, TRACKING_PARCEL } from '../layout';
import { radius, cg } from '../theme';

/** One label with its value under it. Used three times down the left column. */
function Field({ label, value, icon }: { label: string; value: string; icon?: 'pin' | 'status' }) {
  return (
    <View>
      <T variant="caption" color={cg.label}>
        {label}
      </T>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 2 }}>
        {icon ? <Icon name={icon} size={14} color={cg.ink} strokeWidth={2.2} /> : null}
        <T variant="value" color={cg.ink}>
          {value}
        </T>
      </View>
    </View>
  );
}

/**
 * The consignment being tracked right now.
 *
 * The parcels are **drawn**, not photographed — the reference's are flat
 * isometric renders and a stock photo would need cutting out of its
 * background. See `parcel-stack.tsx`.
 *
 * The card clips, and carries no `elevation`: the two together are unreliable
 * on Android, and the clip is what lets the parcel and the pale disc run past
 * the card's edge and be cut by its radius.
 */
export function TrackingCard({
  caption,
  code,
  locationLabel,
  location,
  statusLabel,
  status,
  badge,
  progress,
}: {
  caption: string;
  code: string;
  locationLabel: string;
  location: string;
  statusLabel: string;
  status: string;
  badge: string;
  progress: number;
}) {
  return (
    <View
      style={{
        height: TRACKING_CARD_H,
        borderRadius: radius.card,
        backgroundColor: cg.yellow,
        overflow: 'hidden',
        padding: 18,
      }}
    >
      {/* STEP 1.12 a paler disc, run off the corner and cut by the radius
      <View
        style={{
          position: 'absolute',
          right: -46,
          top: -40,
          width: 150,
          height: 150,
          borderRadius: radius.full,
          backgroundColor: 'rgba(255, 255, 255, 0.22)',
        }}
      />
      */}

      <View
        style={{
          width: '62%',
          // MISTAKE 1.14 the column came out centred
          alignItems: 'center',
          gap: 14,
        }}
      >
        {/* STEP 1.13 which consignment this is
        <View>
          <T variant="caption" color={cg.label}>
            {caption}
          </T>
          <T variant="code" color={cg.ink} style={{ marginTop: 1 }}>
            {code}
          </T>
        </View>
        */}

        {/* STEP 1.15 where it is, and what it is doing
        <Field label={locationLabel} value={location} icon="pin" />
        <Field label={statusLabel} value={status} icon="status" />
        */}
      </View>

      {/* STEP 1.16 the promise, in the corner
      <View style={{ position: 'absolute', right: 16, top: 12 }} pointerEvents="none">
        <FastBadge label={badge} size={62} />
      </View>
      */}

      {/* STEP 1.17 the route, drawn before the freight so it runs behind it
      <View style={{ position: 'absolute', left: 18, right: 18, bottom: 14 }}>
        <ProgressTrack progress={progress} tone="onYellow" />
      </View>
      */}

      {/* STEP 1.18 and the freight itself
      <View style={{ position: 'absolute', right: -4, top: 70 }} pointerEvents="none">
        <ParcelStack size={TRACKING_PARCEL} />
      </View>
      */}
    </View>
  );
}
