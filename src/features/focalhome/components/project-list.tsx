import { Image, Pressable, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { copy, projectCount, projects, stack } from '../data/start';
import { PROJECTS_TOP, ROW_DISC } from '../layout';
import { fc, radius, type } from '../theme';
import { T } from './text';

/**
 * The projects, each with who is on it and how far through it is.
 *
 * The count beside the heading is `projects.length`, not a typed "(16)" —
 * the reference's number matches nothing on its own screen.
 *
 * Every row's progress rail is `flex: done` against `flex: total - done`, not
 * a percentage width: a percentage needs a definite parent and a `flex: 1`
 * row is not one on web.
 *
 * The faces are photographs, per AGENTS.md, and each row takes an equal share
 * of the page's slack so the list reaches the bottom inset.
 */
export function ProjectList({ onAdd }: { onAdd?: () => void }) {
  return (
    <View style={{ flex: 1, marginTop: PROJECTS_TOP }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ flex: 1 }}>
          {copy.manage.map((line) => (
            <T key={line} variant="display" color={fc.ink} style={{ height: type.display.line }}>
              {line}
            </T>
          ))}
        </View>
        <View
          style={{
            width: 44,
            height: 44,
            borderRadius: radius.pill,
            backgroundColor: fc.violetSoft,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <T variant="count" color={fc.violet} style={{ height: type.count.line }}>
            {'(' + projectCount + ')'}
          </T>
        </View>
      </View>

      {projects.map((p) => (
        <Pressable
          key={p.id}
          style={{ flex: 1 }}
          accessibilityRole="button"
          accessibilityLabel={p.title + ', ' + p.done + ' of ' + p.total + ' done'}
        >
          <View style={{ flex: 1, minHeight: 62, flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ flexDirection: 'row' }}>
              {p.people.map((idx, k) => (
                <Image
                  key={idx}
                  source={stack[idx]}
                  style={{
                    width: ROW_DISC,
                    height: ROW_DISC,
                    marginLeft: k === 0 ? 0 : -11,
                    borderRadius: radius.pill,
                    borderWidth: 2,
                    borderColor: fc.canvas,
                  }}
                  accessibilityIgnoresInvertColors
                />
              ))}
            </View>

            <View style={{ flex: 1, marginLeft: 12 }}>
              <T variant="rowTitle" color={fc.ink} style={{ height: type.rowTitle.line }}>
                {p.title}
              </T>
              <View
                style={{
                  height: 6,
                  marginTop: 7,
                  borderRadius: radius.pill,
                  backgroundColor: fc.hairline,
                  flexDirection: 'row',
                  overflow: 'hidden',
                }}
              >
                <View style={{ flex: p.done, backgroundColor: fc.violet }} />
                <View style={{ flex: p.total - p.done }} />
              </View>
            </View>

            <T variant="statSub" color={fc.muted} style={{ marginLeft: 10 }}>
              {p.done + '/' + p.total}
            </T>
          </View>
        </Pressable>
      ))}

      <Pressable onPress={onAdd} accessibilityRole="button" accessibilityLabel="New project">
        <View
          style={{
            width: 52,
            height: 52,
            borderRadius: radius.pill,
            backgroundColor: fc.lime,
            alignSelf: 'flex-end',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Svg width={20} height={20} viewBox="0 0 24 24">
            <Path
              d="M12 5.6v12.8M5.6 12h12.8"
              stroke={fc.onLime}
              strokeWidth={2.2}
              strokeLinecap="round"
            />
          </Svg>
        </View>
      </Pressable>
    </View>
  );
}
