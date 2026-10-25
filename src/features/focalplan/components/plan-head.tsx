import { Pressable, View } from 'react-native';
import Svg, { Path, Rect } from 'react-native-svg';

import { copy, dateLabel } from '../data/start';
import { HEAD_DISC, HEAD_TOP, TITLE_TOP } from '../layout';
import { fc, radius, type } from '../theme';
import { T } from './text';

/**
 * Which day is open, and what the screen is.
 *
 * The label is formatted from the same `Date` the calendar is built from, so
 * the weekday it names is the weekday that day actually is — the reference's
 * is not.
 */
export function PlanHead({ onBack }: { onBack?: () => void }) {
  return (
    <View>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: HEAD_TOP }}>
        <Pressable onPress={onBack} accessibilityRole="button" accessibilityLabel="Go back">
          <View
            style={{
              width: HEAD_DISC,
              height: HEAD_DISC,
              borderRadius: radius.pill,
              borderWidth: 1,
              borderColor: fc.hairline,
              backgroundColor: fc.surface,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Svg width={16} height={16} viewBox="0 0 24 24">
              <Path
                d="M14.4 5.6 8 12l6.4 6.4"
                stroke={fc.ink}
                strokeWidth={2.2}
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </Svg>
          </View>
        </Pressable>

        <View
          style={{
            width: HEAD_DISC,
            height: HEAD_DISC,
            marginLeft: 10,
            borderRadius: radius.control,
            backgroundColor: fc.violetSoft,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Svg width={17} height={17} viewBox="0 0 24 24">
            <Rect
              x={3.6}
              y={5}
              width={16.8}
              height={15}
              rx={3}
              stroke={fc.violet}
              strokeWidth={1.7}
              fill="none"
            />
            <Path
              d="M3.6 9.6h16.8M8.4 3.4v3.2M15.6 3.4v3.2"
              stroke={fc.violet}
              strokeWidth={1.7}
              strokeLinecap="round"
            />
          </Svg>
        </View>

        <T
          variant="dateLabel"
          color={fc.ink}
          style={{ flex: 1, marginLeft: 10, height: type.dateLabel.line }}
        >
          {dateLabel}
        </T>
      </View>

      <T variant="title" color={fc.ink} style={{ marginTop: TITLE_TOP, height: type.title.line }}>
        {copy.title}
      </T>
    </View>
  );
}
