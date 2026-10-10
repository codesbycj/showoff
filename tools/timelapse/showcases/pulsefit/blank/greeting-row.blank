import { Image, Pressable, Text, View, type ImageSourcePropType } from 'react-native';

import { Symbol } from './symbol';
import { LEVEL, R, TYPE, pf } from '../theme';

/** A 40dp white disc with a 20dp glyph — the calendar and reminder controls. */
function RoundButton({
  icon,
  label,
  badge,
  onPress,
}: {
  icon: 'calendarToday' | 'notificationsNone';
  label: string;
  badge?: boolean;
  onPress?: () => void;
}) {
  return (
    <Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel={label}>
      <View
        style={[
          {
            width: 40,
            height: 40,
            borderRadius: R.full,
            backgroundColor: pf.surface,
            alignItems: 'center',
            justifyContent: 'center',
          },
          LEVEL.button,
        ]}
      >
        <Symbol name={icon} size={20} color={pf.inkVariant} />

        {badge ? (
          <View
            style={{
              position: 'absolute',
              top: 10,
              right: 10,
              width: 8,
              height: 8,
              borderRadius: R.full,
              backgroundColor: pf.dot,
            }}
          />
        ) : null}
      </View>
    </Pressable>
  );
}

/**
 * The greeting: avatar, name, and the two quick controls.
 *
 * 48dp tall, so the whole row is the avatar's height and everything else
 * centres on it.
 *
 * Both rings on this row — the white one round the avatar and the canvas one
 * round its online dot — are CSS `ring-*`, which draws *outside* the border
 * box and takes no layout space. A `borderWidth` would eat into the image
 * instead and leave the avatar 44dp of photograph where the reference has 48,
 * so each ring is a circle of its own sitting 2dp proud behind the thing it
 * rings.
 */
export function GreetingRow({
  avatar,
  greeting,
  name,
  onCalendar,
  onReminders,
}: {
  avatar: ImageSourcePropType;
  greeting: string;
  name: string;
  onCalendar?: () => void;
  onReminders?: () => void;
}) {
  return (
    <View
      style={{
        height: 48,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <View style={{ width: 48, height: 48 }}>
{/* STEP 1.08 the face, on the ring that holds it off the page
          <View
            style={{
              position: 'absolute',
              left: -2,
              top: -2,
              width: 52,
              height: 52,
              borderRadius: R.full,
              backgroundColor: pf.ring,
            }}
          />

          <Image
            source={avatar}
            style={[{ width: 48, height: 48, borderRadius: R.full }, LEVEL.avatar]}
          />
*/}

{/* STEP 1.09 and the dot that says you are here
          <View
            style={{
              position: 'absolute',
              right: -2,
              bottom: -2,
              width: 16,
              height: 16,
              borderRadius: R.full,
              backgroundColor: pf.canvas,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <View
              style={{ width: 12, height: 12, borderRadius: R.full, backgroundColor: pf.lime }}
            />
          </View>
*/}
        </View>

{/* STEP 1.10 and who you are
        <View>
          <Text style={[TYPE.overline, { color: pf.muted }]}>{greeting}</Text>
          <Text style={[TYPE.name, { color: pf.ink }]}>{name}</Text>
        </View>
*/}
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
{/* STEP 1.11 the day's plan, and what is waiting
        <RoundButton icon="calendarToday" label="Daily plan" onPress={onCalendar} />
        <RoundButton icon="notificationsNone" label="Reminders" badge onPress={onReminders} />
*/}
      </View>
    </View>
  );
}
