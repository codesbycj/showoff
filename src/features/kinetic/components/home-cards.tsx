import { type ReactNode } from 'react';
import { Pressable, Text, View } from 'react-native';

import { Card, StatusBadge } from './bits';
import { ThumbWell } from './parcel-art';
import { Stepper } from './stepper';
import { Symbol } from './symbol';
import type { Recent } from '../data/home';
import type { SymbolName } from '../symbols';
import { FONT, LEVEL, R, TYPE, kc } from '../theme';

/** The search field and the charcoal scanner button beside it. */
export function SearchRow({
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
      <Pressable style={{ flex: 1 }} onPress={onSearch} accessibilityRole="search">
        <View
          style={[
            {
              height: 52,
              borderRadius: R.lg,
              backgroundColor: kc.surface,
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 16,
              gap: 12,
            },
            LEVEL.card,
          ]}
        >
          <Symbol name="search" size={22} color={kc.secondary} />
          <Text style={[TYPE.bodyMd, { color: kc.secondary }]} numberOfLines={1}>
            {placeholder}
          </Text>
        </View>
      </Pressable>

      <Pressable onPress={onScan} accessibilityRole="button" accessibilityLabel="Scan barcode">
        <View
          style={[
            {
              width: 52,
              height: 52,
              borderRadius: R.lg,
              backgroundColor: kc.charcoal,
              alignItems: 'center',
              justifyContent: 'center',
            },
            LEVEL.dock,
          ]}
        >
          <Symbol name="qrCodeScanner" size={22} color={kc.surface} />
        </View>
      </Pressable>
    </View>
  );
}

/**
 * One of the two quick-action cards.
 *
 * The illustration bleeds off the bottom-right corner, so the card clips — and
 * therefore carries no elevation of its own. The drop lives on the wrapper,
 * because a clip and an elevation on one View is the pairing Android renders
 * unreliably.
 */
export function QuickCard({
  title,
  action,
  actionIcon,
  actionTone = kc.coral,
  art,
  onPress,
}: {
  title: string;
  action: string;
  actionIcon: SymbolName;
  actionTone?: string;
  art: ReactNode;
  onPress?: () => void;
}) {
  return (
    <Pressable style={{ flex: 1 }} onPress={onPress} accessibilityRole="button">
      <View style={[{ borderRadius: R.lg }, LEVEL.card]}>
        <View
          style={{
            height: 144,
            borderRadius: R.lg,
            backgroundColor: kc.surface,
            padding: 16,
            justifyContent: 'space-between',
            overflow: 'hidden',
          }}
        >
          <Text style={[TYPE.headlineSm, { color: kc.ink }]}>{title}</Text>

          <View style={{ position: 'absolute', right: -8, bottom: -8 }}>{art}</View>

          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
            <Text style={[TYPE.labelMd, { color: actionTone }]}>{action}</Text>
            <Symbol name={actionIcon} size={14} color={actionTone} />
          </View>
        </View>
      </View>
    </Pressable>
  );
}

/**
 * The hero current-shipment card.
 *
 * Its middle band is a two-column grid: the stepper and its date pair take the
 * left eight columns, the parcel render the right four. The stepper gets extra
 * top room because the "4h Away" badge floats above the active node and would
 * otherwise be clipped by the row above.
 */
export function ShipmentCard({
  id,
  item,
  product,
  status,
  tone,
  badge,
  fromDate,
  fromPlace,
  toDate,
  toPlace,
  carrierLabel,
  carrier,
  details,
  art,
  onCopy,
  onDetails,
}: {
  id: string;
  item: string;
  product: Parameters<typeof ThumbWell>[0]['product'];
  status: string;
  tone: Parameters<typeof StatusBadge>[0]['tone'];
  badge: string;
  fromDate: string;
  fromPlace: string;
  toDate: string;
  toPlace: string;
  carrierLabel: string;
  carrier: string;
  details: string;
  art: ReactNode;
  onCopy?: () => void;
  onDetails?: () => void;
}) {
  return (
    <Card padding={20}>
      <View
        style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, flex: 1 }}>
          <ThumbWell product={product} size={48} />

          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
              <Text style={[TYPE.headlineSm, { color: kc.ink }]} numberOfLines={1}>
                {id}
              </Text>
              <Pressable onPress={onCopy} accessibilityRole="button" accessibilityLabel="Copy ID">
                <Symbol name="contentCopy" size={16} color={kc.secondary} />
              </Pressable>
            </View>
            <Text style={[TYPE.bodySm, { color: kc.secondary }]} numberOfLines={1}>
              {item}
            </Text>
          </View>
        </View>

        <StatusBadge label={status} tone={tone} />
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 24 }}>
        <View style={{ flex: 1 }}>
          <Stepper
            steps={[
              { state: 'done' },
              { state: 'active', badge },
              { state: 'pending' },
              { state: 'pending' },
            ]}
          />

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 20,
              gap: 8,
            }}
          >
            <View>
              <Text style={[TYPE.bodySm, { color: kc.secondary }]}>{fromDate}</Text>
              <Text style={[TYPE.labelLg, { color: kc.ink }]}>{fromPlace}</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={[TYPE.bodySm, { color: kc.secondary }]}>{toDate}</Text>
              <Text style={[TYPE.labelLg, { color: kc.ink }]}>{toPlace}</Text>
            </View>
          </View>
        </View>

        <View style={{ width: 96, alignItems: 'center' }}>{art}</View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 16,
          paddingTop: 16,
          borderTopWidth: 1,
          borderTopColor: kc.surfaceHigh,
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, flex: 1 }}>
          <View
            style={{
              width: 28,
              height: 28,
              borderRadius: 14,
              backgroundColor: kc.coralTint,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Symbol name="localShipping" size={15} color={kc.rust} />
          </View>
          <Text style={[TYPE.bodySm, { color: kc.secondary }]} numberOfLines={1}>
            {carrierLabel} <Text style={[TYPE.labelMd, { color: kc.ink }]}>{carrier}</Text>
          </Text>
        </View>

        <Pressable onPress={onDetails} accessibilityRole="button">
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
            <Text style={[TYPE.labelMd, { color: kc.coral }]}>{details}</Text>
            <Symbol name="chevronRight" size={16} color={kc.coral} />
          </View>
        </Pressable>
      </View>
    </Card>
  );
}

/** One row on the recent-shipments list. */
export function RecentRow({ recent, onPress }: { recent: Recent; onPress?: () => void }) {
  return (
    <Pressable onPress={onPress} accessibilityRole="button">
      <Card>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 12,
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 }}>
            <ThumbWell product={recent.product} size={48} />

            <View style={{ flex: 1 }}>
              <Text style={[TYPE.headlineSm, { color: kc.ink }]} numberOfLines={1}>
                {recent.id}
              </Text>
              <Text style={[TYPE.bodySm, { color: kc.secondary }]} numberOfLines={1}>
                {recent.item}
              </Text>
            </View>
          </View>

          <StatusBadge label={recent.status} tone={recent.tone} />
        </View>
      </Card>
    </Pressable>
  );
}

/** The address strip and notification bell above the search row. */
export function AddressBar({
  label,
  address,
  unread,
  onAddress,
  onBell,
}: {
  label: string;
  address: string;
  unread: string;
  onAddress?: () => void;
  onBell?: () => void;
}) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, flex: 1 }}>
        <View
          style={[
            {
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: kc.surface,
              alignItems: 'center',
              justifyContent: 'center',
            },
            LEVEL.card,
          ]}
        >
          <Symbol name="localShipping" size={20} color={kc.ink} />
        </View>

        <View style={{ flex: 1 }}>
          <Text style={[TYPE.labelSm, { color: kc.secondary }]}>{label}</Text>
          <Pressable onPress={onAddress} accessibilityRole="button">
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
              <Text style={[TYPE.headlineSm, { color: kc.ink }]} numberOfLines={1}>
                {address}
              </Text>
              <Symbol name="keyboardArrowDown" size={18} color={kc.variant} />
            </View>
          </Pressable>
        </View>
      </View>

      <Pressable onPress={onBell} accessibilityRole="button" accessibilityLabel="Notifications">
        <View
          style={[
            {
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: kc.surface,
              alignItems: 'center',
              justifyContent: 'center',
            },
            LEVEL.card,
          ]}
        >
          <Symbol name="notifications" size={20} color={kc.ink} />
          <View
            style={{
              position: 'absolute',
              top: 6,
              right: 6,
              minWidth: 16,
              height: 16,
              borderRadius: 8,
              backgroundColor: kc.coral,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text style={{ fontFamily: FONT.bold, fontSize: 9, color: kc.onCoral }}>{unread}</Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
}
