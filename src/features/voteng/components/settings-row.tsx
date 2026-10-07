import {
  Archive,
  CalendarDays,
  ChevronRight,
  Database,
  Flag,
  Info,
  LogOut,
  MapPin,
  Scale,
} from 'lucide-react-native';
import { type ReactNode } from 'react';
import { Pressable, Text, View } from 'react-native';

import type { MoreRow } from '../data/more';
import { FONT, R, SP, vt } from '../theme';

/**
 * One line of a settings group.
 *
 * Rows share a single card and are separated by a hairline rather than each
 * getting its own card, which is the one place this screen departs from the
 * card-per-item language the rest of the app uses. Four tool cards stacked with
 * 12dp gaps read as four unrelated destinations; one card with four lines reads
 * as a menu, which is what it is.
 *
 * The divider starts at the label rather than the card edge, so it separates the
 * rows without cutting through the column of icon tiles.
 *
 * The icon is optional, which is what lets the alerts group reuse this row. Its
 * three lines all say "send me a thing", so tinted tiles beside them would be
 * three near-identical bells carrying no information — the switch on the right
 * is the whole content of the row. Without an icon the label starts at the
 * card's own edge and the rule runs the full width.
 */
const ICONS = {
  pin: MapPin,
  flag: Flag,
  calendar: CalendarDays,
  archive: Archive,
  info: Info,
  database: Database,
  scale: Scale,
  exit: LogOut,
} as const;

/** What a row needs to draw. Both `MoreRow` and a preference satisfy it. */
export type RowLike = {
  label: string;
  note?: string;
  icon?: MoreRow['icon'];
  tint?: string;
  ink?: string;
  danger?: boolean;
};

export function SettingsRow({
  row,
  divided,
  right,
  onPress,
}: {
  row: RowLike;
  /** False on the first row of a group, which has the card's own edge above it. */
  divided?: boolean;
  /** Replaces the chevron — a switch, for the rows that toggle something. */
  right?: ReactNode;
  onPress?: () => void;
}) {
  const Icon = row.icon ? ICONS[row.icon] : null;

  return (
    <Pressable onPress={onPress}>
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}>
        {Icon ? (
          <View
            style={{
              width: 32,
              height: 32,
              borderRadius: R.DEFAULT,
              backgroundColor: row.tint,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Icon size={16} color={row.ink} strokeWidth={2.2} />
          </View>
        ) : null}

        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: Icon ? 12 : 0,
            paddingVertical: 2,
            borderTopWidth: divided ? 1 : 0,
            borderTopColor: vt.line,
          }}
        >
          <View style={{ flex: 1, paddingTop: divided ? SP.sm : 0 }}>
            <Text
              style={{
                fontFamily: FONT.bold,
                fontSize: 13,
                lineHeight: 18,
                letterSpacing: -0.2,
                color: row.danger ? vt.liveDeep : vt.ink,
              }}
            >
              {row.label}
            </Text>
            {row.note ? (
              <Text
                style={{
                  marginTop: 1,
                  fontFamily: FONT.medium,
                  fontSize: 11,
                  lineHeight: 15,
                  color: vt.faint,
                }}
              >
                {row.note}
              </Text>
            ) : null}
          </View>

          <View style={{ paddingTop: divided ? SP.sm : 0, marginLeft: SP.sm }}>
            {right ??
              (row.danger ? null : <ChevronRight size={16} color={vt.ghost} strokeWidth={2.4} />)}
          </View>
        </View>
      </View>
    </Pressable>
  );
}

/** The card a group of rows sits in. */
export function SettingsGroup({ children }: { children: ReactNode }) {
  return (
    <View
      style={{
        backgroundColor: vt.card,
        borderRadius: R.lg,
        borderWidth: 1,
        borderColor: vt.line,
        paddingHorizontal: 14,
        paddingVertical: 4,
        shadowColor: '#000000',
        shadowOpacity: 0.03,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 2 },
        elevation: 1,
      }}
    >
      {children}
    </View>
  );
}
