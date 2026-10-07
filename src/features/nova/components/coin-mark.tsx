import { View } from 'react-native';
import Svg, { Path, G } from 'react-native-svg';

import { COIN, type CoinKey, R } from '../theme';

/**
 * A crypto asset's logo, in its tinted rounded well.
 *
 * The export is inconsistent about these: Ethereum and Solana get real inline
 * SVG, Bitcoin and Uniswap get a text glyph (`₿`, and the unicorn emoji), and
 * the activity screen falls back to a coloured letter. A `₿` is a font
 * character rather than the Bitcoin mark — it renders in whatever face is
 * loaded, at whatever weight, and the real logo is a tilted `B` with two bars
 * on a disc. So all six are drawn here as paths instead, which is the same rule
 * `AGENTS.md` applies to emoji: if the platform decides what it looks like, it
 * is not a logo.
 *
 * Each path is drawn on a 32-unit box so the set shares one coordinate space.
 */
const PATHS: Record<CoinKey, { d: string; opacity?: number }[]> = {
  // Bitcoin — the tilted double-bar B.
  BTC: [
    {
      d: 'M21.6 14.2c.3-2-1.2-3-3.3-3.7l.7-2.7-1.7-.4-.7 2.6c-.4-.1-.9-.2-1.4-.3l.7-2.7-1.7-.4-.7 2.7-1.1-.3-2.3-.6-.4 1.8s1.2.3 1.2.3c.7.2.8.6.8 1l-.8 3.1v.1l-1.1 4.4c-.1.2-.3.5-.8.4 0 0-1.2-.3-1.2-.3l-.8 1.9 2.2.5 1.2.3-.7 2.8 1.7.4.7-2.7 1.3.3-.7 2.7 1.7.4.7-2.8c2.8.5 5 .3 5.9-2.3.7-2-.1-3.2-1.5-4 1.1-.2 1.9-1 2.1-2.5zm-3.7 5.3c-.5 2.1-4 1-5.1.7l.9-3.7c1.1.3 4.8.8 4.2 3zm.5-5.4c-.5 1.9-3.4.9-4.4.7l.8-3.3c1 .2 4.1.7 3.6 2.6z',
    },
  ],
  // Ethereum — the faceted diamond, four planes.
  ETH: [
    { d: 'M16 3L15.6 4.3V21.6L16 22L23.9 17.3L16 3Z', opacity: 0.75 },
    { d: 'M16 3L8 17.3L16 22V12.7V3Z' },
    { d: 'M16 23.9L15.8 24.2V29.7L16 30L24 18.9L16 23.9Z', opacity: 0.75 },
    { d: 'M16 30V23.9L8 18.9L16 30Z' },
  ],
  // Solana — three slanted bars.
  SOL: [
    {
      d: 'M7.4 20.6c.2-.2.5-.3.8-.3h17.2c.5 0 .7.6.4 1l-3.2 3.2c-.2.2-.5.3-.8.3H4.6c-.5 0-.7-.6-.4-1l3.2-3.2zM7.4 7.5c.2-.2.5-.3.8-.3h17.2c.5 0 .7.6.4 1l-3.2 3.2c-.2.2-.5.3-.8.3H4.6c-.5 0-.7-.6-.4-1l3.2-3.2zM22.6 14c-.2-.2-.5-.3-.8-.3H4.6c-.5 0-.7.6-.4 1l3.2 3.2c.2.2.5.3.8.3h17.2c.5 0 .7-.6.4-1L22.6 14z',
    },
  ],
  // Uniswap — the unicorn head, cut down to the silhouette that still reads
  // at 20dp: muzzle, jaw, ear and horn, with the eye punched out.
  UNI: [
    {
      d: 'M20.9 6.1c1.1.5 1.5 1.6 1.2 2.7-.2.7-.7 1.2-1.4 1.5.5.9.8 1.9.9 3 .2 2.3-.6 4.3-2.2 6-1.6 1.7-3.6 2.7-6 3-.6.1-.7 0-.5-.4.2-.4.2-.4-.2-.5-2.3-.5-4-1.8-5-3.8-.9-1.8-1-3.7-.2-5.6.7-1.7 2-2.9 3.8-3.6l.5-.2-1-1.6c-.6-1-.6-1.1-.4-1.2.3-.1 1.2.3 2.1.9l.8.6 1.1-.3c1.3-.3 2.8-.3 4 0l.7.2.4-.5c.4-.6 1-.8 1.4-.2zm-2.6 4.4c-.6 0-1.1.5-1.1 1.1s.5 1.1 1.1 1.1 1.1-.5 1.1-1.1-.5-1.1-1.1-1.1z',
    },
    {
      d: 'M11.4 17.6c1 1.3 2.6 2 4.5 2 .5 0 .6.1.4.4-.5.7-1.7 1.2-2.9 1.2-2 0-3.6-1.2-4-3-.2-.7-.1-.9.2-.9.2 0 .4.1.6.3z',
      opacity: 0.75,
    },
  ],
  // Dogecoin — the Ð.
  DOGE: [
    {
      d: 'M12.3 7.2h5.4c2.6 0 4.6.8 6 2.3 1.4 1.5 2.1 3.6 2.1 6.4 0 2.8-.7 5-2.1 6.5-1.4 1.5-3.4 2.3-6 2.3h-5.4v-6.4H9.6v-2.9h2.7V7.2zm3.4 3v4.2h3v2.9h-3v4.3h1.7c1.5 0 2.7-.5 3.4-1.4.8-.9 1.2-2.3 1.2-4s-.4-3-1.2-3.9c-.7-.9-1.9-1.4-3.4-1.4h-1.7z',
    },
  ],
  // Cardano — the central node with its two rings of satellites.
  ADA: [
    {
      d: 'M16 13.4a2.6 2.6 0 100 5.2 2.6 2.6 0 000-5.2zM9.1 14.5a1.6 1.6 0 100 3.2 1.6 1.6 0 000-3.2zM22.9 14.5a1.6 1.6 0 100 3.2 1.6 1.6 0 000-3.2zM12.5 8.6a1.6 1.6 0 100 3.2 1.6 1.6 0 000-3.2zM19.5 8.6a1.6 1.6 0 100 3.2 1.6 1.6 0 000-3.2zM12.5 20.2a1.6 1.6 0 100 3.2 1.6 1.6 0 000-3.2zM19.5 20.2a1.6 1.6 0 100 3.2 1.6 1.6 0 000-3.2zM16 5.1a1.2 1.2 0 100 2.4 1.2 1.2 0 000-2.4zM16 24.5a1.2 1.2 0 100 2.4 1.2 1.2 0 000-2.4zM6.2 9.8a1.2 1.2 0 100 2.4 1.2 1.2 0 000-2.4zM25.8 9.8a1.2 1.2 0 100 2.4 1.2 1.2 0 000-2.4zM6.2 19.8a1.2 1.2 0 100 2.4 1.2 1.2 0 000-2.4zM25.8 19.8a1.2 1.2 0 100 2.4 1.2 1.2 0 000-2.4z',
    },
  ],
};

/** Just the logo, no well — for a row that tints its own container. */
export function CoinGlyph({ coin, size = 20 }: { coin: CoinKey; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 32 32">
      <G fill={COIN[coin].ink}>
        {PATHS[coin].map((p, i) => (
          <Path key={i} d={p.d} fillOpacity={p.opacity ?? 1} />
        ))}
      </G>
    </Svg>
  );
}

/** The logo in its tinted, hairlined, rounded well — the list-row treatment. */
export function CoinMark({
  coin,
  size = 40,
  radius = R.base,
}: {
  coin: CoinKey;
  size?: number;
  radius?: number;
}) {
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: radius,
        backgroundColor: COIN[coin].tint,
        borderWidth: 1,
        borderColor: COIN[coin].edge,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <CoinGlyph coin={coin} size={size * 0.52} />
    </View>
  );
}
