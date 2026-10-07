import { ScrollView } from 'react-native';

import { type Chip } from '../data/home';
import { SP } from '../theme';

import { CountryChip } from './country-chip';

/**
 * The horizontal destination selector.
 *
 * `overflow-x-auto` in the export, so it is a real horizontal `ScrollView` and
 * not a wrap: three chips fit at 393dp, but the row is built to run past the
 * edge, which a wrap layout cannot reproduce.
 *
 * It bleeds to both screen edges rather than sitting inside the 20dp gutter —
 * negative margins cancel the screen's padding, and the scroll content puts the
 * gutter back as padding, so the first chip still lines up with the title above
 * it while the last one can scroll out under the edge.
 */
export function CountryChips({
  chips,
  selected,
  onSelect,
}: {
  chips: readonly Chip[];
  selected: string;
  onSelect?: (key: string) => void;
}) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{ marginHorizontal: -SP.gutterHome }}
      contentContainerStyle={{
        paddingHorizontal: SP.gutterHome,
        gap: 10,
        alignItems: 'center',
        paddingVertical: 2,
      }}
    >
      {chips.map((c) => (
        <CountryChip
          key={c.key}
          label={c.label}
          image={c.image}
          selected={c.key === selected}
          onPress={() => onSelect?.(c.key)}
        />
      ))}
    </ScrollView>
  );
}
