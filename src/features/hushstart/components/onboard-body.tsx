import { View } from 'react-native';

import { onboarding } from '../data/onboarding';
import { T } from './text';

type Props = { margin: number; height: number };

/**
 * The line under the headline.
 *
 * 98 characters - a run of body copy over 110 is a COPY failure (R5).
 */
export function OnboardBody({ margin, height }: Props) {
  return (
    <View style={{ marginHorizontal: margin, height }}>
      <T variant="body">{onboarding.body}</T>
    </View>
  );
}
