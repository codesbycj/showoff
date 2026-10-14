import { Text, View } from 'react-native';

import { HeroWash } from './hero-wash';
import { IntakeBadge } from './intake-badge';
import { ProgressRing } from './progress-ring';
import { LEVEL, R, TYPE, pf } from '../theme';

/**
 * The weekly-progress hero.
 *
 * 24dp of padding round a row that is as tall as its left column — badge, two
 * lines of 24/30 heading, and a 13dp subtitle — which is 113dp, taller than
 * the 96dp ring beside it and what makes the card 161 rather than a round
 * number.
 *
 * The heading's column is capped at 58% of the content width, so "Your Weekly
 * Progress" breaks after "Weekly" rather than running under the ring. That cap
 * is the only thing deciding the break, so it is set in percent and not in dp.
 *
 * The card is two views deep on purpose. `overflow: 'hidden'` and `elevation`
 * on one Android view is unreliable, and this card needs both — the clip for
 * the wash and the glow that runs off its corner, the elevation for its
 * lime-tinted lift. So the outer view casts the shadow and the inner one does
 * the clipping.
 */
export function WeeklyHero({
  badge,
  title,
  subtitle,
  value,
  unit,
  progress,
}: {
  badge: string;
  title: string;
  subtitle: string;
  value: string;
  unit: string;
  progress: number;
}) {
  return (
    <View style={[{ borderRadius: R.card, backgroundColor: pf.heroVia }, LEVEL.hero]}>
      <View style={{ borderRadius: R.card, overflow: 'hidden' }}>
{/* STEP 1.14 the ramp, and the glow hung off its corner
        <View style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}>
          <HeroWash />
        </View>
*/}

        <View
          style={{
            padding: 24,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <View style={{ maxWidth: '58%' }}>
{/* STEP 1.15 what the card is counting
            <IntakeBadge label={badge} />
*/}

{/* STEP 1.16 how the week went
            <Text style={[TYPE.hero, { color: pf.ink, marginTop: 8 }]}>{title}</Text>
            <Text style={[TYPE.body, { color: 'rgba(66,73,54,0.9)', marginTop: 4 }]}>
              {subtitle}
            </Text>
*/}
          </View>

{/* STEP 1.17 six of the seven days, as a ring
          <ProgressRing progress={progress} value={value} unit={unit} />
*/}
        </View>
      </View>
    </View>
  );
}
