import { View } from 'react-native';
import Svg, { Circle, Path, Rect } from 'react-native-svg';

import { lineFigures, projects } from '../data/work';
import { PROJECT_H } from '../layout';
import { radius, sl } from '../theme';
import { T } from './text';

type Project = (typeof projects)[number];

/**
 * One project: a chart, what it is, and how far along it is.
 *
 * Both charts are drawn. A column chart and a two-stop line are small flat
 * marks — the kind AGENTS.md puts squarely in drawing range — and a chart
 * library would ship a dependency for six rectangles.
 */
export function ProjectCard({ project }: { project: Project }) {
  return (
    <View
      style={{
        flex: 1,
        height: PROJECT_H,
        borderRadius: radius.card,
        backgroundColor: sl.surface,
        padding: 12,
      }}
    >
      {/* STEP 1.12 the chart
      <View style={{ flex: 1 }}>{project.chart === 'line' ? <LineChart /> : <IconChart />}</View>
      */}

      {/* STEP 1.13 what the project is
      <T variant="card" color={sl.ink} style={{ marginTop: 8 }}>
        {project.title}
      </T>
      */}
      {/* STEP 1.14 what it covers
      <T variant="cardMeta" color={sl.muted} numberOfLines={2}>
        {project.meta}
      </T>
      */}

      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 8 }}>
        {/* STEP 1.15 and how far along
        <View
          style={{
            flex: 1,
            height: 4,
            borderRadius: radius.pill,
            backgroundColor: sl.track,
            overflow: 'hidden',
          }}
        >
          <View
            style={{
              width: `${project.progress * 100}%`,
              height: '100%',
              borderRadius: radius.pill,
              backgroundColor: sl.ink,
            }}
          />
        </View>
        */}
        <T variant="figure" color={sl.muted}>
          {project.figure}
        </T>
      </View>
    </View>
  );
}

/** Columns with a line walked over them, and three figures printed on it. */
function LineChart() {
  return (
    <View style={{ flex: 1 }}>
      <Svg width="100%" height="100%" viewBox="0 0 120 80" preserveAspectRatio="none">
        <Rect x={10} y={30} width={18} height={50} rx={4} fill={sl.column} />
        <Rect x={38} y={16} width={18} height={64} rx={4} fill={sl.columnDark} />
        <Rect x={66} y={38} width={18} height={42} rx={4} fill={sl.column} />
        <Rect x={94} y={26} width={18} height={54} rx={4} fill={sl.column} />
        <Path
          d="M10 44 L47 22 L75 50 L103 32"
          stroke={sl.line}
          strokeWidth={2.6}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <Circle cx={10} cy={44} r={3.4} fill={sl.line} />
        <Circle cx={103} cy={32} r={3.4} fill={sl.line} />
      </Svg>

      {lineFigures.map((f) => (
        <View
          key={f.key}
          style={{ position: 'absolute', left: `${f.x * 100}%`, top: `${f.y * 100}%` }}
        >
          <T variant="figure" color={sl.ink}>
            {f.label}
          </T>
        </View>
      ))}
    </View>
  );
}

/**
 * Two discs with a leaf and an apple in them, which is what the reference puts
 * on its second card.
 *
 * Drawn rather than set as emoji: a leaf and an apple are different glyphs on
 * Windows, Android and iOS, and the harness renders whichever the build
 * machine has — exactly the difference a web render cannot catch.
 */
function IconChart() {
  return (
    <View
      style={{
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
      }}
    >
      <Disc>
        <Svg width={20} height={20} viewBox="0 0 20 20">
          <Path d="M17 3 C9 3 3 7 3 13 C3 15 4 17 6 17 C12 17 17 11 17 3 Z" fill="#4f9a4a" />
          <Path d="M14 6 C10 9 8 12 7 16" stroke="#ffffff" strokeWidth={1.2} fill="none" />
        </Svg>
      </Disc>
      <Disc>
        <Svg width={20} height={20} viewBox="0 0 20 20">
          <Path
            d="M10 5 C6 5 3 8 3 12 C3 16 6 18 8 18 C9 18 9.5 17.4 10 17.4 C10.5 17.4 11 18 12 18 C14 18 17 16 17 12 C17 8 14 5 10 5 Z"
            fill="#d94a3d"
          />
          <Path d="M10 5 C10 3 11 1.6 13 1.4" stroke="#4f9a4a" strokeWidth={1.6} fill="none" />
        </Svg>
      </Disc>
    </View>
  );
}

function Disc({ children }: { children: React.ReactNode }) {
  return (
    <View
      style={{
        width: 40,
        height: 40,
        borderRadius: radius.full,
        backgroundColor: sl.canvas,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {children}
    </View>
  );
}
