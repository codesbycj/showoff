import { View } from 'react-native';
import Svg, { Circle, Path, Polygon } from 'react-native-svg';

import { COIN } from '../layout';
import { ne, radius } from '../theme';

const FILL: Record<string, string> = {
  btc: '#F3C14C',
  eth: '#E7E4F6',
  ada: '#15160F',
  dot: '#F0D3E4',
  sol: '#DCE9E4',
  ltc: '#D8DBE2',
};

const INK: Record<string, string> = {
  btc: '#7A5706',
  eth: '#4A3E8C',
  ada: '#FFFFFF',
  dot: '#8C2B63',
  sol: '#1F5A49',
  ltc: '#4A5160',
};

/**
 * The mark beside a row.
 *
 * **These are shapes, not logos.** Each is a letterform or a simple device
 * drawn for this showcase — real coin marks belong to real projects and are
 * not copied (AGENTS.md, "Sourcing assets"). They sit on tinted discs so the
 * rows are distinguishable at a glance, which is the job the reference's
 * marks are doing.
 */
export function CoinMark({ id }: { id: string }) {
  const tint = INK[id] ?? ne.ink;

  return (
    <View
      style={{
        width: COIN,
        height: COIN,
        borderRadius: radius.pill,
        backgroundColor: FILL[id] ?? ne.well,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Svg width={18} height={18} viewBox="0 0 24 24">
        {id === 'btc' ? (
          <>
            <Path
              d="M8.4 5.6h5.2a3 3 0 0 1 0 6H8.4Zm0 6h5.8a3.2 3.2 0 0 1 0 6.4H8.4Z"
              stroke={tint}
              strokeWidth={1.8}
              strokeLinejoin="round"
              fill="none"
            />
            <Path
              d="M10.6 3.6v2M13.6 3.6v2M10.6 18v2.4M13.6 18v2.4"
              stroke={tint}
              strokeWidth={1.8}
              strokeLinecap="round"
            />
          </>
        ) : null}
        {id === 'eth' ? (
          <>
            <Polygon points="12,3 18.4,12.2 12,15.8 5.6,12.2" fill={tint} />
            <Polygon points="12,17.2 18.4,13.6 12,21.4 5.6,13.6" fill={tint} opacity={0.6} />
          </>
        ) : null}
        {id === 'ada' ? (
          <>
            <Circle cx={12} cy={12} r={2.6} fill={tint} />
            <Circle cx={12} cy={5} r={1.5} fill={tint} />
            <Circle cx={12} cy={19} r={1.5} fill={tint} />
            <Circle cx={5.8} cy={8.5} r={1.5} fill={tint} />
            <Circle cx={18.2} cy={8.5} r={1.5} fill={tint} />
            <Circle cx={5.8} cy={15.5} r={1.5} fill={tint} />
            <Circle cx={18.2} cy={15.5} r={1.5} fill={tint} />
          </>
        ) : null}
        {id === 'dot' ? (
          <>
            <Circle cx={12} cy={6.4} r={2.6} fill={tint} />
            <Circle cx={12} cy={17.6} r={2.6} fill={tint} />
            <Circle cx={12} cy={12} r={1.6} fill={tint} opacity={0.5} />
          </>
        ) : null}
        {id === 'sol' ? (
          <>
            <Path d="M6 7.4h12l-2.6 2.6H3.4Z" fill={tint} />
            <Path d="M6 11.2h12L15.4 13.8H3.4Z" fill={tint} opacity={0.75} />
            <Path d="M6 15h12l-2.6 2.6H3.4Z" fill={tint} opacity={0.5} />
          </>
        ) : null}
        {id === 'ltc' ? (
          <>
            <Path d="M13.6 4.4 11 15.4l-2.6.9 0.5-2 2.6-.9 2-9Z" fill={tint} />
            <Path d="M9.6 17.2h8.2l-.6 2.4H9Z" fill={tint} />
          </>
        ) : null}
      </Svg>
    </View>
  );
}
