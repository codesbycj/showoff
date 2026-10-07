import { Search } from 'lucide-react-native';
import { TextInput, View } from 'react-native';

import { FONT, R, jf } from '../theme';

/**
 * The conversations search box.
 *
 * It is a real `TextInput`, not a styled row that looks like one. The screen it
 * sits on is a messages list, and a search box you cannot type into is the first
 * thing anyone tries during a recording.
 *
 * The icon is absolutely positioned rather than a sibling in a row, because the
 * input has to own the whole width for its own tap target — a row would make
 * only the text area tappable.
 */
export function SearchField({ placeholder }: { placeholder: string }) {
  return (
    <View style={{ justifyContent: 'center' }}>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#A3A3A3"
        style={{
          height: 44,
          paddingLeft: 40,
          paddingRight: 16,
          borderRadius: R.full,
          backgroundColor: jf.card,
          fontFamily: FONT.medium,
          fontSize: 12,
          color: '#262626',
        }}
      />
      <View style={{ position: 'absolute', left: 16 }} pointerEvents="none">
        <Search size={16} color="#A3A3A3" strokeWidth={2.4} />
      </View>
    </View>
  );
}
