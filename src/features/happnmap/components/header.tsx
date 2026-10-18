import ArrowLeft from 'lucide-react-native/icons/arrow-left';
import Bell from 'lucide-react-native/icons/bell';
import { Pressable, View } from 'react-native';

import { header } from '../data/map';
import { HEADER_DISC } from '../layout';
import { hp, radius } from '../theme';
import { T } from './text';

/**
 * The way back, what the screen is, and what is waiting.
 *
 * The title is centred on the screen rather than between the two discs: they
 * are different widths in other states of this design, and a title that moves
 * when a badge appears reads as a bug.
 */
export function Header({ onBack, onAlerts }: { onBack?: () => void; onAlerts?: () => void }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
      {/* STEP 1.03 the way back
      <Pressable onPress={onBack} accessibilityRole="button" accessibilityLabel="Back">
        <View
          style={{
            width: HEADER_DISC,
            height: HEADER_DISC,
            borderRadius: radius.full,
            backgroundColor: hp.action,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <ArrowLeft size={18} color={hp.onDark} strokeWidth={2.1} />
        </View>
      </Pressable>
      */}

      {/* STEP 1.04 what this is
      <T variant="title" color={hp.ink}>
        {header.title}
      </T>
      */}

      {/* STEP 1.05 and what is waiting
      <Pressable onPress={onAlerts} accessibilityRole="button" accessibilityLabel="Alerts">
        <View
          style={{
            width: HEADER_DISC,
            height: HEADER_DISC,
            borderRadius: radius.full,
            backgroundColor: hp.surface,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Bell size={18} color={hp.ink} strokeWidth={1.9} />
        </View>
      </Pressable>
      */}
    </View>
  );
}
