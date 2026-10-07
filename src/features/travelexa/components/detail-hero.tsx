import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, View } from 'react-native';

import { ELEV, R, SP, alpha, tx } from '../theme';

import { FilledIcon } from './filled-icon';
import { Symbol } from './symbol';

/**
 * The 360dp hero on the destination screen, with its two floating controls.
 *
 * The export draws two sets of controls over this screen — a fixed top bar with
 * a back arrow and a title, and this pair of circular buttons floating over the
 * photo — and its own render stacks them. Only these are kept: the bar repeated
 * the back control and cost 64dp of a screen whose subject is the photograph.
 *
 * So the photo is full-bleed to the top edge and takes the status bar itself.
 * `topInset` is added to the height as well as to the controls, which keeps a
 * full 360dp of photo clear below the status bar rather than letting the bar
 * eat into it.
 */
export function DetailHero({
  image,
  saved,
  topInset = 0,
  onBack,
  onToggleSave,
}: {
  image: number;
  saved: boolean;
  topInset?: number;
  onBack?: () => void;
  onToggleSave?: () => void;
}) {
  return (
    <View style={{ height: 360 + topInset }}>
      <Image
        source={image}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
        contentFit="cover"
      />

      <LinearGradient
        colors={[alpha(tx.primary, 0.3), 'transparent', alpha(tx.primary, 0.4)]}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
        pointerEvents="none"
      />

      <View
        style={{
          position: 'absolute',
          top: topInset + SP.md,
          left: SP.margin,
          right: SP.margin,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <FloatingButton label="Back" onPress={onBack}>
          <Symbol name="chevronLeft" size={20} color={tx.onSurface} />
        </FloatingButton>

        <FloatingButton
          label={saved ? 'Remove from favourites' : 'Save to favourites'}
          onPress={onToggleSave}
        >
          {saved ? (
            <FilledIcon name="favorite" size={20} color={tx.secondary} />
          ) : (
            <Symbol name="favorite" size={20} color={tx.onSurface} />
          )}
        </FloatingButton>
      </View>
    </View>
  );
}

/** One 44dp frosted circle. The spec's "circular action icon" over imagery. */
function FloatingButton({
  label,
  onPress,
  children,
}: {
  label: string;
  onPress?: () => void;
  children: React.ReactNode;
}) {
  return (
    <Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel={label}>
      <View
        style={{
          width: 44,
          height: 44,
          borderRadius: R.full,
          backgroundColor: alpha(tx.surfaceContainerLowest, 0.85),
          alignItems: 'center',
          justifyContent: 'center',
          ...ELEV.card,
        }}
      >
        {children}
      </View>
    </Pressable>
  );
}
