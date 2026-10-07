import { Text, View } from 'react-native';

import { ActionButton, Card, RoundButton, StatusBadge } from './bits';
import { ThumbWell } from './parcel-art';
import { Stepper } from './stepper';
import { Symbol } from './symbol';
import type { Parcel } from '../data/parcels';
import { R, TYPE, kc } from '../theme';

/**
 * One shipment card on the parcels screen.
 *
 * Every card is the same header over a body that varies by state. The body is
 * a tagged union in the data, so this is a switch over five shapes rather than
 * one component juggling fifteen optional props — and a delivered parcel
 * cannot end up rendering a live stepper.
 */
export function ParcelCard({
  parcel,
  onPrimary,
  onSecondary,
}: {
  parcel: Parcel;
  onPrimary?: () => void;
  onSecondary?: () => void;
}) {
  return (
    <Card padding={16}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: 12,
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 }}>
          <ThumbWell product={parcel.product} size={48} />
          <View style={{ flex: 1 }}>
            <Text style={[TYPE.headlineSm, { color: kc.ink }]} numberOfLines={1}>
              {parcel.id}
            </Text>
            <Text style={[TYPE.bodySm, { color: kc.secondary }]} numberOfLines={1}>
              {parcel.item}
            </Text>
          </View>
        </View>

        <StatusBadge label={parcel.status} tone={parcel.tone} caps />
      </View>

      <Body parcel={parcel} onPrimary={onPrimary} onSecondary={onSecondary} />
    </Card>
  );
}

function Body({
  parcel,
  onPrimary,
  onSecondary,
}: {
  parcel: Parcel;
  onPrimary?: () => void;
  onSecondary?: () => void;
}) {
  const b = parcel.body;

  if (b.kind === 'tracking') {
    return (
      <View style={{ marginTop: 26 }}>
        <Stepper
          steps={[
            { state: 'done' },
            { state: 'active', badge: b.badge },
            { state: 'pending' },
            { state: 'pending' },
          ]}
        />

        <Endpoints
          leftLabel={b.fromDate}
          leftPlace={b.fromPlace}
          rightLabel={b.toDate}
          rightPlace={b.toPlace}
          arrow
        />

        <View style={{ flexDirection: 'row', gap: 10, marginTop: 16 }}>
          <ActionButton label={b.primary} icon="nearMe" tone="coral" flex={1} onPress={onPrimary} />
          <ActionButton label={b.secondary} tone="muted" onPress={onSecondary} />
        </View>
      </View>
    );
  }

  if (b.kind === 'courier') {
    return (
      <View style={{ marginTop: 14 }}>
        <Note
          icon="twoWheeler"
          iconFill={kc.coral}
          iconInk={kc.onCoral}
          title={b.noteTitle}
          body={b.noteBody}
        />

        <Endpoints
          leftLabel={b.fromLabel}
          leftPlace={b.fromPlace}
          rightLabel={b.toLabel}
          rightPlace={b.toPlace}
          arrow
        />

        <View style={{ flexDirection: 'row', gap: 10, marginTop: 16, alignItems: 'center' }}>
          <ActionButton
            label={b.primary}
            icon="call"
            tone="charcoal"
            flex={1}
            onPress={onPrimary}
          />
          <RoundButton
            icon="filterCenterFocus"
            size={48}
            iconSize={22}
            fill={kc.surfaceLow}
            onPress={onSecondary}
            label="Locate"
          />
        </View>
      </View>
    );
  }

  if (b.kind === 'delivered') {
    return (
      <View style={{ marginTop: 14 }}>
        <Note
          icon="taskAlt"
          iconFill="transparent"
          iconInk={kc.secondary}
          title={b.noteTitle}
          body={b.noteBody}
          tag={b.noteTag}
        />

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 14,
            gap: 12,
          }}
        >
          <Text style={[TYPE.bodyMd, { color: kc.secondary }]} numberOfLines={1}>
            {b.place}
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
            <Text style={[TYPE.labelMd, { color: kc.coral }]}>{b.action}</Text>
            <Symbol name="arrowForward" size={16} color={kc.coral} />
          </View>
        </View>
      </View>
    );
  }

  if (b.kind === 'progress') {
    return (
      <View style={{ marginTop: 16 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 12 }}>
          <Text style={[TYPE.bodySm, { color: kc.secondary }]} numberOfLines={1}>
            {b.leftLabel}
          </Text>
          <Text style={[TYPE.labelMd, { color: kc.ink }]} numberOfLines={1}>
            {b.rightLabel}
          </Text>
        </View>

        <View
          style={{
            height: 8,
            borderRadius: 4,
            backgroundColor: kc.surfaceHigh,
            marginTop: 8,
            overflow: 'hidden',
          }}
        >
          <View
            style={{
              width: `${b.progress * 100}%`,
              height: 8,
              borderRadius: 4,
              backgroundColor: kc.coral,
            }}
          />
        </View>

        <Endpoints
          leftLabel={b.fromLabel}
          leftPlace={b.fromPlace}
          rightLabel={b.toLabel}
          rightPlace={b.toPlace}
          arrow
        />
      </View>
    );
  }

  return (
    <View style={{ marginTop: 14 }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: kc.surfaceLow,
          borderRadius: R.md,
          padding: 12,
          gap: 12,
        }}
      >
        <Text style={[TYPE.bodySm, { color: kc.secondary, flex: 1 }]}>{b.note}</Text>
        <Text style={[TYPE.labelMd, { color: kc.coral }]}>{b.action}</Text>
      </View>
    </View>
  );
}

/** The from / to pair, with the arrow the reference sets between them. */
function Endpoints({
  leftLabel,
  leftPlace,
  rightLabel,
  rightPlace,
  arrow,
}: {
  leftLabel: string;
  leftPlace: string;
  rightLabel: string;
  rightPlace: string;
  arrow?: boolean;
}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 18,
        gap: 8,
      }}
    >
      <View style={{ flex: 1 }}>
        <Text style={[TYPE.bodySm, { color: kc.secondary }]} numberOfLines={1}>
          {leftLabel}
        </Text>
        <Text style={[TYPE.labelLg, { color: kc.ink }]} numberOfLines={1}>
          {leftPlace}
        </Text>
      </View>

      {arrow ? <Symbol name="trendingFlat" size={22} color={kc.secondary} /> : null}

      <View style={{ flex: 1, alignItems: 'flex-end' }}>
        <Text style={[TYPE.bodySm, { color: kc.secondary }]} numberOfLines={1}>
          {rightLabel}
        </Text>
        <Text style={[TYPE.labelLg, { color: kc.ink }]} numberOfLines={1}>
          {rightPlace}
        </Text>
      </View>
    </View>
  );
}

/** The inset note strip — courier status, delivery confirmation. */
function Note({
  icon,
  iconFill,
  iconInk,
  title,
  body,
  tag,
}: {
  icon: Parameters<typeof Symbol>[0]['name'];
  iconFill: string;
  iconInk: string;
  title: string;
  body: string;
  tag?: string;
}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        backgroundColor: kc.surfaceLow,
        borderRadius: R.md,
        padding: 12,
      }}
    >
      <View
        style={{
          width: 36,
          height: 36,
          borderRadius: R.md,
          backgroundColor: iconFill,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Symbol name={icon} size={22} color={iconInk} />
      </View>

      <View style={{ flex: 1 }}>
        <Text style={[TYPE.labelLg, { color: kc.ink }]} numberOfLines={1}>
          {title}
        </Text>
        <Text style={[TYPE.bodySm, { color: kc.secondary }]} numberOfLines={1}>
          {body}
        </Text>
      </View>

      {tag ? <Text style={[TYPE.bodySm, { color: kc.secondary }]}>{tag}</Text> : null}
    </View>
  );
}

/** One of the two glanceable counters above the filter rail. */
export function StatChip({
  icon,
  value,
  label,
  accent,
}: {
  icon: Parameters<typeof Symbol>[0]['name'];
  value: string;
  label: string;
  accent?: boolean;
}) {
  return (
    <View style={{ flex: 1 }}>
      <Card padding={16}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <View
            style={{
              width: 44,
              height: 44,
              borderRadius: R.md,
              backgroundColor: accent ? kc.coralTint : kc.surfaceHigh,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Symbol name={icon} size={22} color={accent ? kc.coral : kc.ink} />
          </View>

          <View>
            <Text style={[TYPE.headlineMd, { color: kc.ink }]}>{value}</Text>
            <Text style={[TYPE.labelMd, { color: kc.secondary }]}>{label}</Text>
          </View>
        </View>
      </Card>
    </View>
  );
}

/** The parcels screen's search row — a mic in the field, a scanner beside it. */
export function ParcelSearch({
  placeholder,
  onSearch,
  onScan,
}: {
  placeholder: string;
  onSearch?: () => void;
  onScan?: () => void;
}) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
      <View style={{ flex: 1 }}>
        <Card padding={0} radius={R.lg}>
          <View
            style={{
              height: 48,
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 14,
              gap: 10,
            }}
            onTouchEnd={onSearch}
          >
            <Symbol name="search" size={20} color={kc.secondary} />
            <Text style={[TYPE.bodyMd, { color: kc.secondary, flex: 1 }]} numberOfLines={1}>
              {placeholder}
            </Text>
            <Symbol name="mic" size={20} color={kc.secondary} />
          </View>
        </Card>
      </View>

      <View
        style={{
          width: 48,
          height: 48,
          borderRadius: R.lg,
          backgroundColor: kc.inverseSurface,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        accessibilityRole="button"
        accessibilityLabel="Scan barcode"
        onTouchEnd={onScan}
      >
        <Symbol name="barcodeScanner" size={22} color={kc.surface} />
      </View>
    </View>
  );
}
