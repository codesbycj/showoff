import { View } from 'react-native';
import Svg, { Circle, Path, Rect } from 'react-native-svg';

import { copy, services } from '../data/start';
import { SYNC_DISC, SYNC_TOP } from '../layout';
import { fc, radius, type } from '../theme';
import { T } from './text';

/**
 * A service's mark, drawn: a link, a page, a call bubble.
 *
 * The reference wears two real products' logos here. A mark belongs to its
 * owner, so these are invented services with shapes that say what they do —
 * which is all the row needs them to say.
 */
function ServiceMark({ kind }: { kind: 'link' | 'page' | 'call' }) {
  const tint = kind === 'call' ? fc.onBlue : fc.ink;
  const face = kind === 'call' ? fc.blue : fc.surface;

  return (
    <View
      style={{
        width: SYNC_DISC,
        height: SYNC_DISC,
        marginRight: 6,
        borderRadius: radius.pill,
        backgroundColor: face,
        borderWidth: kind === 'call' ? 0 : 1,
        borderColor: fc.hairline,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Svg width={15} height={15} viewBox="0 0 24 24">
        {kind === 'link' ? (
          <Path
            d="M10 14a4 4 0 0 0 5.7 0l2.6-2.6a4 4 0 0 0-5.7-5.7l-1.3 1.3M14 10a4 4 0 0 0-5.7 0l-2.6 2.6a4 4 0 0 0 5.7 5.7l1.3-1.3"
            stroke={tint}
            strokeWidth={1.8}
            strokeLinecap="round"
            fill="none"
          />
        ) : null}
        {kind === 'page' ? (
          <>
            <Rect
              x={5}
              y={3.4}
              width={14}
              height={17.2}
              rx={2.6}
              stroke={tint}
              strokeWidth={1.8}
              fill="none"
            />
            <Path
              d="M8.6 9h6.8M8.6 13h6.8M8.6 17h4"
              stroke={tint}
              strokeWidth={1.8}
              strokeLinecap="round"
            />
          </>
        ) : null}
        {kind === 'call' ? (
          <>
            <Rect x={3} y={6.4} width={12.6} height={11.2} rx={3} fill={tint} />
            <Path d="M16.6 11.2 21 8.4v7.2l-4.4-2.8Z" fill={tint} />
            <Circle cx={9.3} cy={12} r={0} fill={face} />
          </>
        ) : null}
      </Svg>
    </View>
  );
}

/**
 * What the schedule is pulling from.
 *
 * The service names are two runs rather than one string, so the bold part is
 * a property of the copy. React Native resolves a face by family name and
 * not by numeric weight, so the bold run names its own family.
 */
export function SyncRow() {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: SYNC_TOP }}>
      <ServiceMark kind="link" />
      <ServiceMark kind="page" />
      <ServiceMark kind="call" />

      <T variant="sync" color={fc.muted} style={{ marginLeft: 6, height: type.sync.line }}>
        {copy.syncedWith + ' '}
      </T>
      <T variant="syncBold" color={fc.ink} style={{ height: type.syncBold.line }}>
        {services.join(' & ')}
      </T>
    </View>
  );
}
