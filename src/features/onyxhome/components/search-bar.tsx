import { Pressable, View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

import { copy } from '../data/start';
import { FIELD_HEIGHT } from '../layout';
import { on, radius, type } from '../theme';
import { T } from './text';

/**
 * The search field, straddling the panel's bottom edge.
 *
 * It is a real control, not a picture of one: the whole 58dp field is the
 * press target and the filter button is its own 40dp square beside it. The
 * reference's placeholder sits in a field with no visible target at all.
 *
 * The shadow carries `shadow*` and `elevation` together in one object — a
 * `Platform.select` here is exactly what the web harness cannot check
 * (AGENTS.md).
 */
export function SearchBar({ onFilter }: { onFilter?: () => void }) {
  return (
    <View
      style={{
        height: FIELD_HEIGHT,
        borderRadius: radius.field,
        backgroundColor: on.surface,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 16,
        paddingRight: 9,
        shadowColor: '#0B0B0D',
        shadowOpacity: 0.07,
        shadowRadius: 16,
        shadowOffset: { width: 0, height: 6 },
        elevation: 4,
      }}
    >
      <Svg width={18} height={18} viewBox="0 0 24 24">
        <Circle cx={11} cy={11} r={6.6} stroke={on.muted} strokeWidth={1.8} fill="none" />
        <Path d="M15.9 15.9 20 20" stroke={on.muted} strokeWidth={1.8} strokeLinecap="round" />
      </Svg>
      <T
        variant="field"
        color={on.faint}
        style={{ flex: 1, marginLeft: 10, height: type.field.line }}
      >
        {copy.search}
      </T>
      <Pressable onPress={onFilter} accessibilityRole="button" accessibilityLabel="Filter">
        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: radius.control,
            backgroundColor: on.panel,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Svg width={17} height={17} viewBox="0 0 24 24">
            <Path
              d="M4 8h10M18 8h2M4 16h4M12 16h8"
              stroke={on.onPanel}
              strokeWidth={1.8}
              strokeLinecap="round"
            />
            <Circle cx={16} cy={8} r={2.2} fill={on.onPanel} />
            <Circle cx={10} cy={16} r={2.2} fill={on.onPanel} />
          </Svg>
        </View>
      </Pressable>
    </View>
  );
}
