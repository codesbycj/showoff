import Svg, { Circle, G, Path, Rect } from 'react-native-svg';

/**
 * The company marks, as inline SVG rather than bitmaps.
 *
 * Every one of these sits inside a coloured disc somewhere — a 40dp badge on a
 * job card, a 62dp tile in the onboarding collage — so they have to stay sharp
 * across a 3x range. Drawing them also gets the brands' own colours for free,
 * which a downscaled PNG of a logo does not.
 *
 * Each path is normalised to a 24-unit box so a caller only ever passes a size.
 * `tone` is the ink; marks that carry their own colours (Slack, Figma) ignore
 * it, which is why they are separate cases rather than one tinted component.
 */
export type BrandKey =
  'dropbox' | 'poker' | 'apple' | 'nikitin' | 'figma' | 'slack' | 'skype' | 'ghost';

function Dropbox({ size, tone }: { size: number; tone: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        fill={tone}
        d="M7.06 2.5L1.87 6.47l5.19 3.97 5.19-3.97-5.19-3.97zm9.88 0l-5.19 3.97 5.19 3.97 5.19-3.97-5.19-3.97zM1.87 14.41l5.19 3.97 5.19-3.97-5.19-3.97-5.19 3.97zm15.07-3.97l-5.19 3.97 5.19 3.97 5.19-3.97-5.19-3.97zM7.06 19.88l5.19-3.97-5.19-3.97-5.19 3.97 5.19 3.97z"
      />
    </Svg>
  );
}

function Spade({ size, tone }: { size: number; tone: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        fill={tone}
        d="M12 2C8.5 7 4 9.5 4 13.5c0 3 2.5 5 5 4.8 1.4-.1 2.5-.9 3-1.8.5.9 1.6 1.7 3 1.8 2.5.2 5-1.8 5-4.8 0-4-4.5-6.5-8-11.5zm1 16.5c-.3.8-.9 2-2 3.5h2c-1.1-1.5-1.7-2.7-2-3.5z"
      />
    </Svg>
  );
}

function Apple({ size, tone }: { size: number; tone: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        fill={tone}
        d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.61-.75 1.04-1.8.92-2.87-.92.04-2.01.62-2.65 1.37-.56.65-1.05 1.7-.92 2.74 1.02.08 2.05-.51 2.65-1.24z"
      />
    </Svg>
  );
}

/**
 * Figma's five lobes. The two right-hand shapes are a half-capsule and a circle,
 * which is why this is four paths and a circle rather than one path with an
 * even-odd rule — the lobes are separate colours, not counters in one glyph.
 */
function Figma({ size }: { size: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path fill="#F24E1E" d="M8.5 2h3.5v5H8.5a2.5 2.5 0 010-5z" />
      <Path fill="#FF7262" d="M12 2h3.5a2.5 2.5 0 010 5H12V2z" />
      <Path fill="#A259FF" d="M12 7h3.5a2.5 2.5 0 010 5H12V7z" />
      <Path fill="#F24E1E" d="M8.5 7H12v5H8.5a2.5 2.5 0 010-5z" />
      <Path fill="#0ACF83" d="M8.5 12H12v2.5A2.5 2.5 0 118.5 12z" />
      <Circle cx="15.5" cy="9.5" r="2.5" fill="#1ABCFE" />
    </Svg>
  );
}

/** Slack's four-colour hash. Six rounded bars, two per arm plus the crossbars. */
function Slack({ size }: { size: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <G>
        <Rect x="3" y="10" width="3.5" height="7" rx="1.75" fill="#E01E5A" />
        <Rect x="7.5" y="13.5" width="7" height="3.5" rx="1.75" fill="#E01E5A" />
        <Rect x="10" y="3" width="7" height="3.5" rx="1.75" fill="#36C5F0" />
        <Rect x="13.5" y="7.5" width="3.5" height="7" rx="1.75" fill="#36C5F0" />
        <Rect x="13.5" y="13.5" width="7" height="3.5" rx="1.75" fill="#2EB67D" />
        <Rect x="10" y="10" width="3.5" height="7" rx="1.75" fill="#ECB22E" />
      </G>
    </Svg>
  );
}

function Skype({ size, tone }: { size: number; tone: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        fill={tone}
        d="M15.17 14.83c-.76.76-1.78 1.17-2.92 1.17-1.42 0-2.65-.63-3.23-1.66l1.52-.9c.35.61 1.05 1 1.71 1 .63 0 1.25-.27 1.25-.79 0-.46-.35-.69-1.2-.9l-1.02-.26c-1.37-.34-2.14-1.12-2.14-2.28 0-1.38 1.17-2.21 2.8-2.21 1.19 0 2.24.47 2.84 1.37l-1.38.94c-.31-.49-.83-.75-1.46-.75-.6 0-1.08.28-1.08.68 0 .42.34.62 1.13.82l1.02.26c1.47.37 2.29 1.13 2.29 2.37.01 1.17-.46 1.95-1.13 2.38z"
      />
    </Svg>
  );
}

/** The ghost on the lime tile — Snapchat's silhouette, as the collage draws it. */
function Ghost({ size, tone }: { size: number; tone: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        fill={tone}
        d="M12.004 3c-3.714 0-5.467 2.45-5.467 5.097 0 1.258.465 2.502.946 3.16.14.192.176.386.108.572-.087.236-.372.483-.872.695-.494.21-.869.458-.87.828-.002.434.428.673 1.05.748.156.02.263.109.317.228.107.236-.073.682-.716.993-.418.204-.627.469-.62.787.012.51.58.795 1.547.886.175.016.29.117.33.243.104.327-.37.94-1.289 1.488-.239.142-.387.35-.386.58.003.585.875.922 2.392.922.428 0 .884-.038 1.348-.112.502-.08 1.139-.234 1.765-.015.485.17 1.01.205 1.517.205.518 0 1.057-.037 1.55-.213.626-.223 1.261-.067 1.76.012.463.074.92.112 1.348.112 1.517 0 2.39-.337 2.392-.922.002-.23-.146-.438-.385-.58-.919-.548-1.393-1.161-1.29-1.488.04-.126.155-.227.33-.243.967-.091 1.535-.376 1.547-.886.007-.318-.202-.583-.62-.787-.643-.311-.823-.757-.716-.993.054-.119.161-.208.317-.228.622-.075 1.052-.314 1.05-.748-.001-.37-.376-.618-.87-.828-.5-.212-.785-.459-.872-.695-.068-.186-.032-.38.108-.572.481-.658.946-1.902.946-3.16C17.472 5.45 15.719 3 12.004 3z"
      />
    </Svg>
  );
}

/**
 * NIKITIN Agency's wordmark reduces to an italic serif N in the reference. It is
 * the one mark here that is type rather than a drawing, so it renders as type —
 * a real serif face, not a path traced off a screenshot at 20dp.
 */
export { NikitinN } from './nikitin-n';

export function BrandMark({
  brand,
  size = 20,
  tone = '#FFFFFF',
}: {
  brand: Exclude<BrandKey, 'nikitin'>;
  size?: number;
  tone?: string;
}) {
  switch (brand) {
    case 'dropbox':
      return <Dropbox size={size} tone={tone} />;
    case 'poker':
      return <Spade size={size} tone={tone} />;
    case 'apple':
      return <Apple size={size} tone={tone} />;
    case 'figma':
      return <Figma size={size} />;
    case 'slack':
      return <Slack size={size} />;
    case 'skype':
      return <Skype size={size} tone={tone} />;
    case 'ghost':
      return <Ghost size={size} tone={tone} />;
  }
}
