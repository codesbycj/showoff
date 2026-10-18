import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, View } from 'react-native';

import { AppBar } from '@/features/sugarcase/components/app-bar';
import { ChromeBar } from '@/features/sugarcase/components/chrome-bar';
import { FlowNode } from '@/features/sugarcase/components/flow-node';
import { T } from '@/features/sugarcase/components/text';
import { ToolRail } from '@/features/sugarcase/components/tool-rail';
import { Wire } from '@/features/sugarcase/components/wire';
import { flow, header } from '@/features/sugarcase/data/flow';
import {
  FLOW_TOP,
  FOOT_BOTTOM,
  FOOT_BUTTON,
  HEADER_TOP,
  MARGIN,
  RAIL_RIGHT,
  TITLE_TOP,
} from '@/features/sugarcase/layout';
import { sc } from '@/features/sugarcase/theme';
import { useInsets } from '@/features/sugarcase/use-insets';

/**
 * Sugar CRM — New Case Management.
 *
 * Assembly only: the chrome, what the screen is, the case as a flow of steps,
 * a rail of tools floating over it, and three controls at the foot.
 *
 * The wires are siblings between the nodes rather than borders on them, so a
 * step knows nothing about what it is connected to — which is what lets the
 * whole flow come from `data/flow.ts`.
 *
 * Every handler is empty except the back arrow. The other two screens of this
 * design are their own showcases with their own slugs, so there is nothing
 * else to push to yet.
 */
export default function SugarCase() {
  const insets = useInsets();

  return (
    <View style={{ flex: 1, backgroundColor: sc.canvas }}>
      <StatusBar style="dark" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: MARGIN,
          paddingTop: insets.top + HEADER_TOP,
          paddingBottom: FOOT_BUTTON + FOOT_BOTTOM + insets.bottom + 16,
        }}
      >
        <AppBar onBack={() => router.back()} />

        <View style={{ marginTop: TITLE_TOP }}>
          <T variant="title" color={sc.ink}>
            {header.one}
          </T>
          <T variant="title" color={sc.ink}>
            {header.two}
          </T>
        </View>

        <View style={{ marginTop: FLOW_TOP, paddingRight: 56 }}>
          {flow.map((node, i) => (
            <View key={node.key}>
              {i === 0 ? null : <Wire />}
              <FlowNode text={node.text} face={node.face} kind={node.kind} done={node.done} />
            </View>
          ))}
        </View>
      </ScrollView>

      <View
        style={{
          position: 'absolute',
          right: RAIL_RIGHT,
          top: insets.top + 150,
        }}
        pointerEvents="box-none"
      >
        <ToolRail />
      </View>

      <View
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: insets.bottom + FOOT_BOTTOM,
          alignItems: 'center',
        }}
        pointerEvents="box-none"
      >
        <ChromeBar />
      </View>
    </View>
  );
}
