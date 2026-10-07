import { Image } from 'expo-image';
import { Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { SETTINGS } from '../data/settings';
import { LEVEL, R, TYPE, ps } from '../theme';
import { Symbol } from './symbol';

/**
 * The account card at the top of settings.
 *
 * Its fill is a very pale lime wash rather than flat white — the reference
 * tints this one card to mark it as the account itself. That is a gradient
 * across the whole card, not a corner glow, so it is a `LinearGradient` in its
 * own right rather than the shared `Glow`.
 *
 * The edit badge overhangs the portrait, so the portrait is clipped by its own
 * radius and the badge is a sibling — an `overflow: 'hidden'` wrapper would
 * cut it in half.
 */
export function ProfileCard({ photo }: { photo: number }) {
  return (
    <View style={[{ borderRadius: R.lg }, LEVEL.container]}>
      <LinearGradient
        colors={['rgba(196,240,0,0.10)', 'rgba(255,255,255,1)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ borderRadius: R.lg, padding: 16 }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
          <View>
            <Image
              source={photo}
              style={{ width: 72, height: 72, borderRadius: 36 }}
              contentFit="cover"
              transition={0}
            />
            <View
              style={{
                position: 'absolute',
                right: -2,
                bottom: -2,
                width: 26,
                height: 26,
                borderRadius: 13,
                backgroundColor: ps.inverse,
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 2,
                borderColor: ps.surfaceLowest,
              }}
            >
{/* STEP 6.03 an edit badge
              <Symbol name="edit" size={13} color={ps.onInverse} />
*/}
            </View>
          </View>

          <View style={{ flex: 1, minWidth: 0 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              <Text style={[TYPE.headlineMd, { color: ps.onSurface }]} numberOfLines={1}>
                {SETTINGS.profile.name}
              </Text>
              <View
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: 9,
                  backgroundColor: ps.lime,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Symbol name="check" size={12} color={ps.onLime} />
              </View>
            </View>

            <Text style={[TYPE.bodySm, { color: ps.secondary, marginTop: 2 }]} numberOfLines={1}>
              {SETTINGS.profile.handle} {'•'} {SETTINGS.profile.role}
            </Text>

            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 }}>
              <Symbol name="bolt" size={14} color={ps.olive} />
{/* STEP 6.04 what tier she is on
              <Text style={[TYPE.labelSm, { color: ps.olive }]}>{SETTINGS.profile.tier}</Text>
*/}
            </View>
          </View>
        </View>

        <View style={{ flexDirection: 'row', gap: 10, marginTop: 16 }}>
{/* STEP 6.05 two credentials
          {SETTINGS.profile.credentials.map((c) => (
            <View
              key={c.key}
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 8,
                paddingHorizontal: 12,
                paddingVertical: 10,
                borderRadius: R.base,
                backgroundColor: ps.surfaceLow,
              }}
            >
              <Symbol name={c.icon} size={18} color={ps.secondary} />
              <View style={{ flex: 1, minWidth: 0 }}>
                <Text style={[TYPE.labelSm, { color: ps.onSurface }]} numberOfLines={1}>
                  {c.title}
                </Text>
                <Text style={[TYPE.bodySm, { color: ps.secondary }]} numberOfLines={1}>
                  {c.subtitle}
                </Text>
              </View>
            </View>
          ))}
*/}
        </View>
      </LinearGradient>
    </View>
  );
}
