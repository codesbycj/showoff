import { Text, View } from 'react-native';

import { FONT, R, SP, vy } from '../theme';

import { Barcode } from './barcode';
import { PlaneGlyph } from './plane-glyph';
import { TicketDivider } from './ticket-divider';

/** The 10dp all-caps grey captions above each field in the dark half. */
function FieldLabel({ children, align }: { children: string; align?: 'right' }) {
  return (
    <Text
      style={{
        textAlign: align,
        fontFamily: FONT.semibold,
        fontSize: 10,
        lineHeight: 14,
        letterSpacing: align ? 1 : 0.5,
        color: vy.gray400,
      }}
    >
      {children.toUpperCase()}
    </Text>
  );
}

/**
 * The boarding pass — three bands and the perforation between the first two.
 *
 * It is one component rather than three because the bands are not independent:
 * they share a single 32dp clip, and the perforation's notches are cut by that
 * same clip. Splitting them would mean clipping each band separately, and the
 * notches would stop working.
 *
 * Shadow and clip are split across two views, as on every card in this
 * showcase — `overflow: 'hidden'` with `elevation` on one node is unreliable on
 * Android, and this card needs the clip for the notches and the shadow for
 * `shadow-2xl`.
 */
export function BoardingPass({
  pass,
  route,
  barcode,
}: {
  pass: {
    seat: { label: string; value: string };
    flight: { label: string; value: string };
    class: { label: string; value: string };
    date: string;
  };
  route: { code: string; place: string };
  barcode: { bars: readonly number[]; digits: string };
}) {
  return (
    <View
      style={{
        borderRadius: R.card,
        shadowColor: vy.ink,
        shadowOpacity: 0.25,
        shadowRadius: 25,
        shadowOffset: { width: 0, height: 15 },
        elevation: 12,
      }}
    >
      <View style={{ borderRadius: R.card, overflow: 'hidden' }}>
        <View
          style={{
            backgroundColor: vy.night,
            paddingHorizontal: SP['3xl'],
            paddingTop: SP['3xl'],
            paddingBottom: SP['2xl'],
          }}
        >
{/* STEP 3.05 where you are sitting, and what you are on
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              marginBottom: SP['2xl'],
            }}
          >
            <View>
              <Text
                style={{
                  fontFamily: FONT.bold,
                  fontSize: 30,
                  lineHeight: 30,
                  letterSpacing: -0.75,
                  color: vy.white,
                }}
              >
                {pass.seat.value}
              </Text>
              <View style={{ marginTop: SP.xs }}>
                <FieldLabel>{pass.seat.label}</FieldLabel>
              </View>
            </View>

            <View>
              <FieldLabel align="right">{pass.flight.label}</FieldLabel>
              <Text
                style={{
                  textAlign: 'right',
                  fontFamily: FONT.bold,
                  fontSize: 24,
                  lineHeight: 30,
                  letterSpacing: 1.2,
                  color: vy.white,
                }}
              >
                {pass.flight.value}
              </Text>
            </View>
          </View>
*/}

{/* STEP 3.06 how you are travelling
          <View style={{ marginBottom: SP['4xl'] }}>
            <FieldLabel>{pass.class.label}</FieldLabel>
            <Text
              style={{
                marginTop: 2,
                fontFamily: FONT.semibold,
                fontSize: 24,
                lineHeight: 30,
                letterSpacing: -0.6,
                color: vy.gray100,
              }}
            >
              {pass.class.value}
            </Text>
          </View>
*/}

{/* STEP 3.07 and when
          <Text
            style={{
              paddingTop: SP.sm,
              fontFamily: FONT.medium,
              fontSize: 12,
              lineHeight: 16,
              color: vy.gray400,
            }}
          >
            {pass.date}
          </Text>
*/}
        </View>

{/* STEP 3.08 tear here
        <TicketDivider />
*/}

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: vy.white,
            paddingHorizontal: SP['3xl'],
            paddingTop: SP.sm,
            paddingBottom: SP['2xl'],
          }}
        >
{/* STEP 3.09 where it is going
          <View>
            <Text
              style={{
                fontFamily: FONT.black,
                fontSize: 30,
                lineHeight: 37.5,
                letterSpacing: -0.75,
                color: vy.ink,
              }}
            >
              {route.code}
            </Text>
            <Text
              style={{
                fontFamily: FONT.semibold,
                fontSize: 10,
                lineHeight: 14,
                letterSpacing: 0.25,
                color: vy.gray400,
              }}
            >
              {route.place.toUpperCase()}
            </Text>
          </View>
*/}

{/* STEP 3.10 the badge
          <View
            style={{
              width: 48,
              height: 48,
              borderRadius: R.full,
              backgroundColor: vy.orange,
              alignItems: 'center',
              justifyContent: 'center',
              shadowColor: vy.ink,
              shadowOpacity: 0.1,
              shadowRadius: 3,
              shadowOffset: { width: 0, height: 1 },
              elevation: 2,
            }}
          >
            <PlaneGlyph size={24} color={vy.ink} />
          </View>
*/}
        </View>

        <View
          style={{
            backgroundColor: vy.orange,
            paddingHorizontal: SP['3xl'],
            paddingTop: SP['3xl'],
            paddingBottom: SP['2xl'],
          }}
        >
{/* STEP 3.11 the part the gate reads
          <Barcode bars={barcode.bars} digits={barcode.digits} />
*/}
        </View>
      </View>
    </View>
  );
}
