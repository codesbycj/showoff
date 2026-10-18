import ArrowLeft from 'lucide-react-native/icons/arrow-left';
import Heart from 'lucide-react-native/icons/heart';
import { Image, Pressable, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { header, pack } from '../data/product';
import { HEADER_DISC, HEADER_TOP, MARGIN } from '../layout';
import { ec, radius } from '../theme';
import { T } from './text';

const PACK = require('../../../../assets/images/ecodetail/pack.jpg');
const BITES = require('../../../../assets/images/ecodetail/bites.png');

/**
 * The lime panel the product stands on, with the screen's controls over it.
 *
 * The pouch and the bites are photographs — a pack and a snack are specific
 * objects and out of drawing range (AGENTS.md). The wordmark over them is
 * drawn, which is how the brand gets onto a blank pouch.
 *
 * `overflow: 'hidden'` crops the picture to the panel's rounded foot, and
 * nothing here carries `elevation` — the two together are unreliable on
 * Android.
 */
export function ProductStage({
  height,
  topInset,
  onBack,
  onLike,
}: {
  height: number;
  topInset: number;
  onBack?: () => void;
  onLike?: () => void;
}) {
  return (
    <View
      style={{
        height,
        backgroundColor: ec.canvasDeep,
        borderBottomLeftRadius: radius.stage,
        borderBottomRightRadius: radius.stage,
        overflow: 'hidden',
      }}
    >
      <Image
        source={PACK}
        // Inset and rounded rather than bled to the edge: the duotone's
        // highlight is lighter than the panel's lime, so a flush photograph
        // reads as a seam. A tile reads as a tile.
        style={{
          position: 'absolute',
          right: 14,
          bottom: 14,
          width: '58%',
          height: height * 0.8,
          borderRadius: radius.stage,
        }}
        resizeMode="cover"
        accessibilityIgnoresInvertColors
      />

      <Image
        source={BITES}
        style={{
          position: 'absolute',
          left: '32%',
          bottom: 10,
          width: 126,
          height: 118,
        }}
        resizeMode="contain"
        accessibilityIgnoresInvertColors
      />

      <View
        style={{
          marginTop: topInset + HEADER_TOP,
          paddingHorizontal: MARGIN,
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <Disc label="Back" onPress={onBack}>
          <ArrowLeft size={18} color={ec.ink} strokeWidth={2.1} />
        </Disc>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <T variant="title" color={ec.ink}>
            {header.title}
          </T>
        </View>
        <Disc label="Save" onPress={onLike}>
          <Heart size={18} color={ec.ink} strokeWidth={2} />
        </Disc>
      </View>

      <View style={{ paddingHorizontal: MARGIN, marginTop: 22 }}>
        <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 5 }}>
          <T variant="display" color={ec.packInk} style={{ fontSize: 30, lineHeight: 34 }}>
            {pack.top}
          </T>
          <View style={{ marginTop: 5 }}>
            <Leaf size={19} />
          </View>
        </View>
        <T variant="display" color={ec.onLime} style={{ fontSize: 30, lineHeight: 34 }}>
          {pack.bottom}
        </T>
      </View>
    </View>
  );
}

function Disc({
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
          width: HEADER_DISC,
          height: HEADER_DISC,
          borderRadius: radius.full,
          backgroundColor: ec.glass,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {children}
      </View>
    </Pressable>
  );
}

/** The leaf in the wordmark. A leaf is a flat mark — drawing range. */
function Leaf({ size }: { size: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20">
      <Path
        d="M18 2 C10 2 3 6 3 12 C3 15 4.6 17.4 7 17.4 C13 17.4 18 11 18 2 Z"
        fill={ec.packInk}
      />
      <Path
        d="M15 5 C11 8 8 11.6 6.6 16"
        stroke={ec.canvasDeep}
        strokeWidth={1.2}
        strokeLinecap="round"
        fill="none"
      />
    </Svg>
  );
}
