import { StatusBar } from 'expo-status-bar';
import { ScrollView, View } from 'react-native';

// STEP 1.01 the header
// import { AppBar } from '@/features/crmcard/components/app-bar';
import { Avatar } from '@/features/crmcard/components/avatar';
import { Icon } from '@/features/crmcard/components/icon';
// STEP 1.05 the controls
// import { RoundButton } from '@/features/crmcard/components/round-button';
// STEP 1.13 their month
// import { ScheduleCard } from '@/features/crmcard/components/schedule-card';
import { T } from '@/features/crmcard/components/text';
import { actions, customer, header, section } from '@/features/crmcard/data/customer';
import {
  ACTION_BUTTON,
  ACTION_GAP,
  ACTIONS_TOP,
  CARD_TOP,
  FACE,
  FACE_TOP,
  HEADER_TOP,
  MARGIN,
  NAME_TOP,
  SECTION_HEIGHT,
  SECTION_TOP,
  TOOL_BUTTON,
  TOOL_GAP,
  TOOLS_TOP,
} from '@/features/crmcard/layout';
import { cc, radius } from '@/features/crmcard/theme';
import { useInsets } from '@/features/crmcard/use-insets';

/**
 * A sales CRM — one customer.
 *
 * Assembly only: a header, the two things you can do with the record itself,
 * who the customer is, the five ways to reach them, and their month.
 *
 * The customer's circle is initials rather than a photograph — see the note in
 * `data/customer.ts`.
 *
 * Every handler is empty on purpose. The other two screens of this design are
 * their own showcases with their own slugs, so there is nothing to push to
 * yet; what matters is that the decision is made here.
 */
export default function CrmCard() {
  const insets = useInsets();

  return (
    <View style={{ flex: 1, backgroundColor: cc.canvas }}>
      <StatusBar style="dark" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: MARGIN,
          paddingTop: insets.top + HEADER_TOP,
          paddingBottom: insets.bottom + 16,
        }}
      >
        {/* STEP 1.02 across the top
        <AppBar one={header.one} two={header.two} />
        */}

        {/* STEP 1.06 what you can do with the record
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: TOOLS_TOP }}>
          <RoundButton name="network" size={TOOL_BUTTON} label="Connections" dot />
          <View style={{ width: TOOL_GAP }} />
          <RoundButton name="share" size={TOOL_BUTTON} label="Share" />
          <View style={{ flex: 1 }} />
          <RoundButton name="more" size={TOOL_BUTTON} label="More" />
        </View>
        */}

        {/* STEP 1.09 the customer
        <View style={{ marginTop: FACE_TOP, alignItems: 'center' }}>
          <Avatar face={customer.face} size={FACE} />
        </View>
        */}

        {/* STEP 1.10 who they are
        <View style={{ marginTop: NAME_TOP, alignItems: 'center' }}>
          <T variant="name" color={cc.text}>
            {customer.name}
          </T>
          <T variant="role" color={cc.muted} style={{ textAlign: 'center', marginTop: 2 }}>
            {customer.role}
          </T>
        </View>
        */}

        {/* STEP 1.11 five ways to reach them
        <View
          style={{
            marginTop: ACTIONS_TOP,
            flexDirection: 'row',
            justifyContent: 'center',
            gap: ACTION_GAP,
          }}
        >
          {actions.map((a) => (
            <RoundButton key={a} name={a} size={ACTION_BUTTON} label={a} />
          ))}
        </View>
        */}

        {/* STEP 1.12 and the rest of the record
        <View
          style={{
            marginTop: SECTION_TOP,
            height: SECTION_HEIGHT,
            flexDirection: 'row',
            alignItems: 'center',
            borderBottomWidth: 1,
            borderBottomColor: cc.rule,
          }}
        >
          <T variant="section" color={cc.text} style={{ flex: 1 }}>
            {section.label}
          </T>
          <Icon name="edit" size={15} color={cc.muted} />
          <View style={{ width: 14 }} />
          <Icon name="open" size={15} color={cc.muted} />
        </View>
        */}

        {/* STEP 1.14 at the foot
        <View style={{ marginTop: CARD_TOP }}>
          <ScheduleCard />
        </View>
        */}
      </ScrollView>
    </View>
  );
}
