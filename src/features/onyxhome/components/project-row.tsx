import { Pressable, ScrollView, View } from 'react-native';
import Svg, { Circle, Path, Rect } from 'react-native-svg';

import { copy, projects } from '../data/start';
import { MARGIN, PROJECT_GAP, PROJECT_HEIGHT, PROJECT_TOP, PROJECT_WIDTH } from '../layout';
import { on, radius, type } from '../theme';
import { T } from './text';

/** A project's mark, drawn — a gamepad, a pie, a box: small flat shapes, in range. */
function Mark({ kind, tint }: { kind: string; tint: string }) {
  if (kind === 'joystick') {
    return (
      <Svg width={19} height={19} viewBox="0 0 24 24">
        <Rect x={2.4} y={7.6} width={19.2} height={10.4} rx={5.2} fill={tint} />
        <Path
          d="M7 12.8h3.2M8.6 11.2v3.2"
          stroke={on.panel}
          strokeWidth={1.6}
          strokeLinecap="round"
        />
        <Circle cx={15.4} cy={11.6} r={1.3} fill={on.panel} />
        <Circle cx={17.8} cy={14} r={1.3} fill={on.panel} />
      </Svg>
    );
  }
  if (kind === 'pie') {
    return (
      <Svg width={19} height={19} viewBox="0 0 24 24">
        <Path d="M12 3.4A8.6 8.6 0 1 0 20.6 12H12Z" fill={tint} />
        <Path d="M13.6 2.6A8.6 8.6 0 0 1 21.4 10.4h-7.8Z" fill={tint} opacity={0.5} />
      </Svg>
    );
  }
  return (
    <Svg width={19} height={19} viewBox="0 0 24 24">
      <Path d="M3.6 8.4 12 4.2l8.4 4.2-8.4 4.2Z" fill={tint} opacity={0.55} />
      <Path
        d="M3.6 8.4v7.2L12 19.8l8.4-4.2V8.4"
        stroke={tint}
        strokeWidth={1.7}
        strokeLinejoin="round"
        fill="none"
      />
    </Svg>
  );
}

/**
 * The projects, in a row that runs off the right edge.
 *
 * A horizontal `ScrollView`, not a wrap. The reference shows its second card
 * clipped by the screen's edge, and a wrap layout physically cannot reproduce
 * that (AGENTS.md, "A row that runs off the screen edge is a scrolling row").
 *
 * The row's padding is the page margin, so the first card lines up with the
 * heading above it and the last one can still scroll clear of the edge.
 */
export function ProjectRow({ onOpen }: { onOpen?: (id: string) => void }) {
  return (
    <View>
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: MARGIN }}>
        <T
          variant="sectionTitle"
          color={on.ink}
          style={{ flex: 1, height: type.sectionTitle.line }}
        >
          {copy.projects}
        </T>
        <Pressable accessibilityRole="button" accessibilityLabel={copy.allTasks}>
          <T variant="sectionLink" color={on.muted} style={{ height: type.sectionLink.line }}>
            {copy.allTasks}
          </T>
        </Pressable>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: MARGIN, paddingTop: PROJECT_TOP }}
      >
        {projects.map((p, i) => {
          const dark = p.tone === 'dark';
          const face = dark ? on.panel : p.tone === 'blue' ? on.blue : on.surface;
          const ink = dark ? on.onPanel : on.ink;
          const body = dark ? on.onPanelDim : on.muted;

          return (
            <Pressable
              key={p.id}
              onPress={() => onOpen?.(p.id)}
              accessibilityRole="button"
              accessibilityLabel={p.title}
            >
              <View
                style={{
                  width: PROJECT_WIDTH,
                  height: PROJECT_HEIGHT,
                  marginLeft: i === 0 ? 0 : PROJECT_GAP,
                  borderRadius: radius.card,
                  backgroundColor: face,
                  padding: 18,
                }}
              >
                <View
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: radius.pill,
                    backgroundColor: dark ? on.surface : on.panel,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Mark kind={p.mark} tint={dark ? on.panel : on.onPanel} />
                </View>

                <T
                  variant="cardTitle"
                  color={ink}
                  style={{ marginTop: 14, height: type.cardTitle.line }}
                >
                  {p.title}
                </T>
                <T variant="cardBody" color={body} style={{ flex: 1, marginTop: 6 }}>
                  {p.body}
                </T>

                <View style={{ alignItems: 'flex-end' }}>
                  <View
                    style={{
                      width: 34,
                      height: 34,
                      borderRadius: radius.pill,
                      backgroundColor: dark ? on.surface : on.panel,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Svg width={15} height={15} viewBox="0 0 24 24">
                      <Path
                        d="m9.6 5.6 6.4 6.4-6.4 6.4"
                        stroke={dark ? on.panel : on.onPanel}
                        strokeWidth={2.2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                      />
                    </Svg>
                  </View>
                </View>
              </View>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}
