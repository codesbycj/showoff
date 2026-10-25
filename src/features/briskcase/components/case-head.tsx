import { View } from 'react-native';

import { copy, timeSpent } from '../data/start';
import { CHIP_HEIGHT, CHIPS_TOP, HEAD_TOP } from '../layout';
import { br, radius, type } from '../theme';
import { T } from './text';

/**
 * What the task is, how it is classified, and how long it has taken.
 *
 * The title's runs are data, so a weight change is a property of the copy
 * rather than something this component hard-codes. React Native resolves a
 * face by family name and not by numeric weight, so each run names its own
 * family.
 *
 * "2h 14 min" is formatted from `minutesSpent` rather than typed beside the
 * label.
 */
export function CaseHead() {
  return (
    <View style={{ marginTop: HEAD_TOP }}>
      {copy.titleLines.map((line, i) => (
        <View key={i} style={{ flexDirection: 'row' }}>
          {line.map((run) => (
            <T
              key={run.text}
              variant={run.weight === 'bold' ? 'displayBold' : 'displayLight'}
              color={br.ink}
              style={{ height: type.displayBold.line }}
            >
              {run.text}
            </T>
          ))}
        </View>
      ))}

      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: CHIPS_TOP }}>
        {copy.tags.map((tag) => (
          <View
            key={tag}
            style={{
              height: CHIP_HEIGHT,
              marginRight: 8,
              paddingHorizontal: 14,
              borderRadius: radius.chip,
              backgroundColor: br.surface,
              borderWidth: 1,
              borderColor: br.hairline,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <T variant="chip" color={br.ink} style={{ height: type.chip.line }}>
              {tag}
            </T>
          </View>
        ))}

        <View style={{ flex: 1 }} />

        <View style={{ alignItems: 'flex-end' }}>
          <T variant="metaLabel" color={br.muted} style={{ height: type.metaLabel.line }}>
            {copy.timeLabel}
          </T>
          <T variant="metaValue" color={br.ink} style={{ height: type.metaValue.line }}>
            {timeSpent}
          </T>
        </View>
      </View>
    </View>
  );
}
