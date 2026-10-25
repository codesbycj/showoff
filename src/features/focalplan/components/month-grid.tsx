import { useId } from 'react';
import { Pressable, View } from 'react-native';
import Svg, { Defs, Line, Mask, Rect } from 'react-native-svg';

import { copy, kindOf, kinds, month, pencilled, today } from '../data/start';
import { CELL_HEIGHT, GRID_TOP, LEGEND_TOP, ROW_GAP, SECTION_TOP } from '../layout';
import { fc, radius, type } from '../theme';
import { T } from './text';

const TONES: Record<string, string> = {
  blue: fc.blue,
  lime: fc.lime,
  lilac: fc.lilac,
  violet: fc.violet,
};

/**
 * A run names a *kind*, and a kind names a tone. Indexing `TONES` by the kind
 * straight off the run is what made every pill paint transparent with white
 * ink on it — invisible, and the sort of mistake a screenshot catches and a
 * typecheck never will.
 */
const TONE_OF = Object.fromEntries(kinds.map((k) => [k.id, TONES[k.tone]])) as Record<
  string,
  string
>;

/** Which kinds are light enough to want dark ink on them. */
const DARK_INK = new Set<string>(
  kinds.filter((k) => k.tone === 'lime' || k.tone === 'lilac').map((k) => k.id),
);

/**
 * A day with something pencilled in: a hatched disc.
 *
 * The hatching is drawn as explicit lines inside a `Mask` rather than as an
 * SVG `<Pattern>`, and the mask's id comes from `useId`: pattern and `Defs`
 * ids are document-global on web, so three discs sharing a name would all
 * render whichever mounted first.
 */
function Pencilled({ size }: { size: number }) {
  const maskId = useId();
  const lines = [];
  for (let x = -size; x < size * 2; x += 5) {
    lines.push(
      <Line key={x} x1={x} y1={size} x2={x + size} y2={0} stroke="#FFFFFF" strokeWidth={2} />,
    );
  }

  return (
    <Svg width={size} height={size}>
      <Defs>
        <Mask id={maskId}>
          <Rect x={0} y={0} width={size} height={size} fill="#000000" />
          {lines}
        </Mask>
      </Defs>
      <Rect
        x={0}
        y={0}
        width={size}
        height={size}
        rx={size / 2}
        fill={fc.violet}
        opacity={0.55}
        mask={`url(#${maskId})`}
      />
    </Svg>
  );
}

/**
 * The month, with each run of booked days joined into one pill.
 *
 * A run is one background across several cells rather than several
 * separate pills: the first cell of a run rounds its left edge, the last
 * rounds its right, and the ones between round nothing. That is what makes
 * 18–21 read as a block of days rather than four unrelated squares, and it
 * falls out of the data instead of being drawn per month.
 *
 * The grid starts on the month's real first weekday — `month.offset` — so
 * the 1st sits under the right column. The reference puts its 01 in the
 * first column of a month that did not begin on a Monday.
 *
 * The legend is generated from the same `kinds` list the runs refer to, so
 * it cannot name a colour the grid does not use.
 */
export function MonthGrid({ onPick }: { onPick?: (day: number) => void }) {
  const cells: (number | null)[] = [
    ...Array.from({ length: month.offset }, () => null),
    ...Array.from({ length: month.length }, (_, i) => i + 1),
  ];
  while (cells.length % 7 !== 0) cells.push(null);

  const rows: (number | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) rows.push(cells.slice(i, i + 7));

  return (
    <View style={{ flex: 1, marginTop: SECTION_TOP }}>
      <T variant="sectionTitle" color={fc.ink} style={{ height: type.sectionTitle.line }}>
        {copy.calendar}
      </T>

      {/*
        The rows are spread through whatever the strip and the legend leave,
        rather than stacked at the top of a flex:1 box. A calendar that stops
        two thirds of the way down its own card reads as a month that ended
        early.
      */}
      <View style={{ flex: 1, marginTop: GRID_TOP, justifyContent: 'space-between' }}>
        {rows.map((row, r) => (
          <View key={r} style={{ flexDirection: 'row', paddingVertical: ROW_GAP / 2 }}>
            {row.map((day, c) => {
              if (day === null) {
                return <View key={c} style={{ flex: 1, height: CELL_HEIGHT }} />;
              }

              const kind = kindOf(day);
              const tone = kind ? TONE_OF[kind] : 'transparent';
              const first = !kind || kindOf(day - 1) !== kind || c === 0;
              const last = !kind || kindOf(day + 1) !== kind || c === 6;
              const dark = kind ? DARK_INK.has(kind) : true;
              const pencil = pencilled.includes(day);
              const isToday = day === today.getDate();

              return (
                <Pressable key={c} onPress={() => onPick?.(day)} style={{ flex: 1 }}>
                  <View
                    style={{
                      height: CELL_HEIGHT,
                      backgroundColor: tone,
                      borderTopLeftRadius: first ? radius.pill : 0,
                      borderBottomLeftRadius: first ? radius.pill : 0,
                      borderTopRightRadius: last ? radius.pill : 0,
                      borderBottomRightRadius: last ? radius.pill : 0,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {pencil ? (
                      <View style={{ position: 'absolute' }}>
                        <Pencilled size={CELL_HEIGHT} />
                      </View>
                    ) : null}
                    <T
                      variant="day"
                      color={kind ? (dark ? fc.ink : fc.onBlue) : isToday ? fc.ink : fc.muted}
                      style={{ height: type.day.line }}
                    >
                      {String(day).padStart(2, '0')}
                    </T>
                  </View>
                </Pressable>
              );
            })}
          </View>
        ))}
      </View>

      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          marginTop: LEGEND_TOP,
        }}
      >
        {kinds.map((k) => (
          <View
            key={k.id}
            style={{ width: '50%', flexDirection: 'row', alignItems: 'center', paddingVertical: 4 }}
          >
            <View
              style={{
                width: 8,
                height: 8,
                borderRadius: radius.pill,
                backgroundColor: TONES[k.tone],
              }}
            />
            <T
              variant="legend"
              color={fc.muted}
              style={{ marginLeft: 8, height: type.legend.line }}
            >
              {k.label}
            </T>
          </View>
        ))}
      </View>
    </View>
  );
}
