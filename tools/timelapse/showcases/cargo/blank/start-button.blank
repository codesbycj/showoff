import Package from 'lucide-react-native/icons/package';
import ChevronRight from 'lucide-react-native/icons/chevron-right';
import { Pressable, View } from 'react-native';

import { T } from './text';
import { BUTTON_HEIGHT, DISC, DISC_INSET } from '../layout';
import { radius, shadow, cg } from '../theme';

/**
 * The call to action: a white pill with a dark disc at one end and a run of
 * chevrons at the other.
 *
 * **The label is centred on the button, not between the two ornaments.** The
 * disc and the chevrons are different widths, so laying all three out in a row
 * would push "Get Started" off-centre by the difference.
 */
export function StartButton({ label, onPress }: { label: string; onPress?: () => void }) {
  return (
    <Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel={label}>
      <View
        style={{
          height: BUTTON_HEIGHT,
          borderRadius: radius.full,
          backgroundColor: cg.surface,
          alignItems: 'center',
          justifyContent: 'center',
          // MISTAKE 1.15 the label came out shoved off centre
          paddingLeft: 90,
          ...shadow.button,
        }}
      >
        {/* STEP 1.14 say what it does
        <T variant="cta" color={cg.onSurface}>
          {label}
        </T>
        */}

        {/* STEP 1.16 the parcel on its left
        <View
          style={{
            position: 'absolute',
            left: DISC_INSET,
            width: DISC,
            height: DISC,
            borderRadius: radius.full,
            backgroundColor: cg.onSurface,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Package size={21} color={cg.discGlyph} strokeWidth={1.9} />
        </View>
        */}

        {/* STEP 1.17 and three chevrons pulling it along
        <View style={{ position: 'absolute', right: 18, flexDirection: 'row' }}>
          {[1, 0.55, 0.28].map((opacity, i) => (
            <View key={opacity} style={{ marginLeft: i === 0 ? 0 : -7, opacity }}>
              <ChevronRight size={20} color={cg.onSurface} strokeWidth={2.4} />
            </View>
          ))}
        </View>
        */}
      </View>
    </Pressable>
  );
}
