import { Pressable, View } from 'react-native';

import { screen, stats } from '../data/stock';
import { ct } from '../theme';
import { T } from './text';

import { CtaProps } from './_stat-list-shared';

/**
 * The report button.
 *
 * Outlined rather than filled, as the board draws it, and 54dp so it clears R7
 * on its own. The border and the shadow sit in one style object: a
 * `Platform.select` for a shadow is exactly what the web render cannot check.
 */
export function ReportCta({ margin, height, radius }: CtaProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={screen.report}
      style={{ marginHorizontal: margin }}
    >
      {({ pressed }) => (
        <View
          style={{
            height,
            borderRadius: radius,
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 1.5,
            borderColor: ct.deep,
            backgroundColor: ct.white,
            opacity: pressed ? 0.75 : 1,
            shadowColor: '#0D2409',
            shadowOpacity: 0.08,
            shadowRadius: 12,
            shadowOffset: { width: 0, height: 4 },
            elevation: 3,
          }}
        >
          <T variant="report">{screen.report}</T>
        </View>
      )}
    </Pressable>
  );
}
