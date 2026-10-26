import { Image, Pressable, View } from 'react-native';
import Svg, { Path, Rect } from 'react-native-svg';

import { faces } from '../data/start';
import { CARD_PAD, DOT, RAIL } from '../layout';
import { ms, radius, type } from '../theme';
import { T } from './text';

const TINT: Record<string, string> = {
  'In progress': ms.orange,
  Completed: ms.green,
  Delayed: ms.red,
};

/** The small mark each trade carries, drawn. */
function Mark({ kind, tint }: { kind: string; tint: string }) {
  return (
    <Svg width={16} height={16} viewBox="0 0 24 24">
      {kind === 'pour' ? (
        <Path
          d="M4 9h11l5 4v4H4Zm3 8.8a1.8 1.8 0 1 0 0 .1M16 17.8a1.8 1.8 0 1 0 0 .1"
          stroke={tint}
          strokeWidth={1.8}
          strokeLinejoin="round"
          fill="none"
        />
      ) : null}
      {kind === 'frame' ? (
        <>
          <Rect
            x={4}
            y={4}
            width={16}
            height={16}
            rx={2}
            stroke={tint}
            strokeWidth={1.8}
            fill="none"
          />
          <Path d="M4 12h16M12 4v16" stroke={tint} strokeWidth={1.6} />
        </>
      ) : null}
      {kind === 'spark' ? <Path d="M13.4 2.6 5.6 13.4h5l-.8 8 8-10.8h-5Z" fill={tint} /> : null}
    </Svg>
  );
}

/**
 * One task, with its place on the rail.
 *
 * The rail dot takes the state's colour and the line under it continues to
 * the next card, so the column reads as one timeline rather than as a dot per
 * card. The line is omitted on the last card, which is what stops the rail
 * running on into the dock.
 *
 * The progress bar is `flex: progress` against `flex: 1 - progress`, not a
 * percentage width: a percentage needs a definite parent and a `flex: 1` row
 * is not one on web.
 */
export function TaskCard({
  title,
  where,
  state,
  due,
  crew,
  progress,
  mark,
  last,
  onPress,
}: {
  title: string;
  where: string;
  state: string;
  due: string;
  crew: number;
  progress: number;
  mark: string;
  last?: boolean;
  onPress?: () => void;
}) {
  const tint = TINT[state] ?? ms.muted;
  const shown = Math.min(3, crew);

  return (
    <View style={{ flexDirection: 'row' }}>
      <View style={{ width: RAIL, alignItems: 'center', paddingTop: 18 }}>
        <View
          style={{
            width: DOT,
            height: DOT,
            borderRadius: radius.pill,
            borderWidth: 3,
            borderColor: tint,
            backgroundColor: ms.card,
          }}
        />
        {last ? null : <View style={{ flex: 1, width: 2, backgroundColor: tint, opacity: 0.35 }} />}
      </View>

      <Pressable
        onPress={onPress}
        style={{ flex: 1, paddingBottom: 12 }}
        accessibilityRole="button"
        accessibilityLabel={title}
      >
        <View
          style={{
            borderRadius: radius.card,
            backgroundColor: ms.card,
            padding: CARD_PAD,
            // MISTAKE 1.26 the cards came in square on one corner
            borderTopRightRadius: 0,
            shadowColor: '#2A1B12',
            shadowOpacity: 0.07,
            shadowRadius: 14,
            shadowOffset: { width: 0, height: 6 },
            elevation: 3,
          }}
        >
{/* STEP 1.17 what and where
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View
              style={{
                width: 32,
                height: 32,
                borderRadius: radius.pill,
                backgroundColor: tint + '1A',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Mark kind={mark} tint={tint} />
            </View>
            <View style={{ flex: 1, marginLeft: 10 }}>
              <T variant="rowTitle" color={ms.ink} style={{ height: type.rowTitle.line }}>
                {title}
              </T>
              <T variant="meta" color={ms.muted} style={{ height: type.meta.line }}>
                {where}
              </T>
            </View>
            <View
              style={{
                paddingHorizontal: 9,
                paddingVertical: 4,
                borderRadius: radius.chip,
                backgroundColor: tint + '1A',
              }}
            >
              <T variant="chip" color={tint} style={{ height: type.chip.line }}>
                {state}
              </T>
            </View>
          </View>
*/}

{/* STEP 1.18 when, and who is on it
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 12 }}>
            <Svg width={15} height={15} viewBox="0 0 24 24">
              <Rect
                x={3.6}
                y={5}
                width={16.8}
                height={15}
                rx={3}
                stroke={ms.muted}
                strokeWidth={1.7}
                fill="none"
              />
              <Path
                d="M3.6 9.6h16.8M8.4 3.4v3.2M15.6 3.4v3.2"
                stroke={ms.muted}
                strokeWidth={1.7}
                strokeLinecap="round"
              />
            </Svg>
            <T
              variant="meta"
              color={ms.muted}
              style={{ flex: 1, marginLeft: 7, height: type.meta.line }}
            >
              {due}
            </T>

            {Array.from({ length: shown }, (_, i) => (
              <Image
                key={i}
                source={faces[i]}
                style={{
                  width: 24,
                  height: 24,
                  marginLeft: i === 0 ? 0 : -8,
                  borderRadius: radius.pill,
                  borderWidth: 1.6,
                  borderColor: ms.card,
                }}
                accessibilityIgnoresInvertColors
              />
            ))}
            {crew > shown ? (
              <T variant="meta" color={ms.muted} style={{ marginLeft: 5, height: type.meta.line }}>
                {'+' + (crew - shown)}
              </T>
            ) : null}
          </View>
*/}

{/* STEP 1.19 and how far through
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 12 }}>
            <View
              style={{
                flex: 1,
                height: 6,
                borderRadius: radius.pill,
                backgroundColor: ms.hairline,
                flexDirection: 'row',
                overflow: 'hidden',
              }}
            >
              <View style={{ flex: progress, backgroundColor: tint }} />
              <View style={{ flex: 1 - progress }} />
            </View>
            <T variant="pct" color={ms.ink} style={{ marginLeft: 9, height: type.pct.line }}>
              {Math.round(progress * 100) + '%'}
            </T>
          </View>
*/}
        </View>
      </Pressable>
    </View>
  );
}
