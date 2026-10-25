// Scaffold a dashboard episode.
//
//   node tools/new.js <slug> [port]        # from dashboards/, dev server stopped
//
// It writes the invariants and *no design*: the configs, the shell, the
// three-live-tabs rule, the token block with nothing in it yet, the chart
// maths, the formatters and a beats stub. There is deliberately no placeholder
// look to inherit. A scaffold with a style in it quietly becomes the style of
// every episode, which is the failure the websites series spent six rebuilds on.
const fs = require('fs');
const path = require('path');

const [slug, portArg] = process.argv.slice(2);
if (!slug || !/^[a-z][a-z0-9]*$/.test(slug)) {
  console.error('usage: node tools/new.js <slug> [port]   (slug: lowercase letters and digits)');
  process.exit(1);
}

const root = path.resolve(__dirname, '..');
const dir = path.join(root, slug);
if (fs.existsSync(dir)) {
  console.error(slug + ' already exists at ' + dir);
  process.exit(1);
}

// Ports four apart, starting at 5300, so starting one while another is up fails
// loudly instead of quietly moving and leaving every tool pointed elsewhere.
const used = fs
  .readdirSync(root, { withFileTypes: true })
  .filter((e) => e.isDirectory() && e.name !== 'tools')
  .map((e) => {
    try {
      const cfg = fs.readFileSync(path.join(root, e.name, 'vite.config.ts'), 'utf8');
      return +(cfg.match(/port:\s*(\d+)/) || [])[1] || 0;
    } catch {
      return 0;
    }
  });
const port = +portArg || Math.max(5296, ...used) + 4;

const F = {};

F['package.json'] = JSON.stringify(
  {
    name: slug + '-dashboard',
    private: true,
    version: '1.0.0',
    type: 'module',
    description: 'Dashboard episode: ' + slug + '.',
    scripts: {
      dev: 'vite',
      build: 'tsc -b && vite build',
      preview: 'vite preview',
      typecheck: 'tsc -b --noEmit',
      lint: 'eslint src --ext .ts,.tsx',
      format: 'prettier --write "src/**/*.{ts,tsx,css}"',
      'format:check': 'prettier --check "src/**/*.{ts,tsx,css}"',
    },
    dependencies: {
      react: '^19.3.0',
      'react-dom': '^19.3.0',
    },
    devDependencies: {
      '@eslint/js': '^10.0.1',
      '@tailwindcss/vite': '^4.3.3',
      '@types/react': '^19.3.0',
      '@types/react-dom': '^19.3.0',
      '@vitejs/plugin-react': '^6.1.2',
      eslint: '^10.12.0',
      'eslint-plugin-react-hooks': '^7.1.1',
      'eslint-plugin-react-refresh': '^0.5.7',
      globals: '^17.13.0',
      prettier: '^3.9.6',
      'prettier-plugin-tailwindcss': '^0.8.1',
      tailwindcss: '^4.3.3',
      typescript: '^5.9.3',
      'typescript-eslint': '^8.71.1',
      vite: '^8.3.4',
    },
  },
  null,
  2,
);

F['vite.config.ts'] =
  "import { defineConfig } from 'vite';\n" +
  "import react from '@vitejs/plugin-react';\n" +
  "import tailwindcss from '@tailwindcss/vite';\n" +
  "import { fileURLToPath, URL } from 'node:url';\n" +
  '\n' +
  'export default defineConfig({\n' +
  '  plugins: [react(), tailwindcss()],\n' +
  '  resolve: {\n' +
  "    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },\n" +
  '  },\n' +
  '  // strictPort: starting this while it is already up fails loudly instead of\n' +
  '  // moving to the next free port and leaving every capture tool on the wrong app.\n' +
  '  server: { port: ' +
  port +
  ', strictPort: true, open: false },\n' +
  '});\n';

F['index.html'] =
  '<!doctype html>\n' +
  '<html lang="en" class="antialiased">\n' +
  '  <head>\n' +
  '    <meta charset="UTF-8" />\n' +
  '    <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n' +
  '    <meta name="color-scheme" content="light" />\n' +
  '    <title>' +
  slug +
  '</title>\n' +
  '  </head>\n' +
  '  <body>\n' +
  '    <div id="root"></div>\n' +
  '    <script type="module" src="/src/main.tsx"></script>\n' +
  '  </body>\n' +
  '</html>\n';

F['tsconfig.json'] = JSON.stringify(
  { files: [], references: [{ path: './tsconfig.app.json' }, { path: './tsconfig.node.json' }] },
  null,
  2,
);

F['tsconfig.app.json'] = JSON.stringify(
  {
    compilerOptions: {
      target: 'ES2022',
      lib: ['ES2022', 'DOM', 'DOM.Iterable'],
      module: 'ESNext',
      moduleResolution: 'bundler',
      jsx: 'react-jsx',
      types: ['vite/client'],
      strict: true,
      noUnusedLocals: true,
      noUnusedParameters: true,
      noFallthroughCasesInSwitch: true,
      noUncheckedSideEffectImports: true,
      verbatimModuleSyntax: true,
      isolatedModules: true,
      skipLibCheck: true,
      noEmit: true,
      baseUrl: '.',
      paths: { '@/*': ['./src/*'] },
    },
    include: ['src'],
  },
  null,
  2,
);

F['tsconfig.node.json'] = JSON.stringify(
  {
    compilerOptions: {
      target: 'ES2022',
      lib: ['ES2023'],
      module: 'ESNext',
      moduleResolution: 'bundler',
      types: ['node'],
      strict: true,
      noEmit: true,
      isolatedModules: true,
      skipLibCheck: true,
    },
    include: ['vite.config.ts'],
  },
  null,
  2,
);

F['eslint.config.js'] =
  "import js from '@eslint/js';\n" +
  "import globals from 'globals';\n" +
  "import reactHooks from 'eslint-plugin-react-hooks';\n" +
  "import reactRefresh from 'eslint-plugin-react-refresh';\n" +
  "import tseslint from 'typescript-eslint';\n" +
  '\n' +
  'export default tseslint.config(\n' +
  "  { ignores: ['dist', 'node_modules'] },\n" +
  '  {\n' +
  '    extends: [js.configs.recommended, ...tseslint.configs.recommended],\n' +
  "    files: ['**/*.{ts,tsx}'],\n" +
  '    languageOptions: { ecmaVersion: 2022, globals: globals.browser },\n' +
  "    plugins: { 'react-hooks': reactHooks, 'react-refresh': reactRefresh },\n" +
  '    rules: {\n' +
  '      ...reactHooks.configs.recommended.rules,\n' +
  "      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],\n" +
  '    },\n' +
  '  },\n' +
  ');\n';

F['.prettierrc'] = JSON.stringify(
  { singleQuote: true, printWidth: 100, plugins: ['prettier-plugin-tailwindcss'] },
  null,
  2,
);

F['.gitignore'] = 'node_modules\ndist\n*.tsbuildinfo\nshots\n';

F['src/main.tsx'] =
  "import { StrictMode } from 'react';\n" +
  "import { createRoot } from 'react-dom/client';\n" +
  '\n' +
  "import { App } from '@/App';\n" +
  "import '@/styles/index.css';\n" +
  '\n' +
  "createRoot(document.getElementById('root')!).render(\n" +
  '  <StrictMode>\n' +
  '    <App />\n' +
  '  </StrictMode>,\n' +
  ');\n';

F['src/nav.ts'] =
  '/**\n' +
  ' * The nav, and which of it is real.\n' +
  ' *\n' +
  ' * Rule 1: exactly three tabs are built, and the rest stay in the nav and stay\n' +
  ' * inactive -- a nav with three items in it is a different design from the one\n' +
  ' * in the picture. Pick the three with the most to show; the reference\n' +
  ' * screen is always one of them.\n' +
  ' */\n' +
  'export type TabId = string;\n' +
  '\n' +
  'export interface Tab {\n' +
  '  id: TabId;\n' +
  '  label: string;\n' +
  '  /** Built, and switchable. Exactly three of these. */\n' +
  '  live: boolean;\n' +
  '}\n' +
  '\n' +
  'export const TABS: Tab[] = [\n' +
  "  { id: 'home', label: 'Home', live: true },\n" +
  "  { id: 'two', label: 'Second', live: true },\n" +
  "  { id: 'three', label: 'Third', live: true },\n" +
  "  { id: 'inert-a', label: 'Inert A', live: false },\n" +
  "  { id: 'inert-b', label: 'Inert B', live: false },\n" +
  '];\n' +
  '\n' +
  'export const LIVE_TABS = TABS.filter((t) => t.live);\n';

F['src/components/Nav.tsx'] =
  "import { cx } from '@/lib/cx';\n" +
  "import { TABS, type TabId } from '@/nav';\n" +
  '\n' +
  '/**\n' +
  ' * Rule 1, in one component.\n' +
  ' *\n' +
  ' * An inactive tab is *visibly* inactive and genuinely inert: dimmed, skipped\n' +
  ' * by the keyboard, not-allowed under the pointer, and a click does nothing at\n' +
  ' * all -- no route change, no empty pane, no console error. A dead link that\n' +
  ' * looks live is the one thing that cannot be in the take.\n' +
  ' */\n' +
  'export function Nav({ active, onSelect }: { active: TabId; onSelect: (id: TabId) => void }) {\n' +
  '  return (\n' +
  '    <nav aria-label="Sections">\n' +
  '      <ul>\n' +
  '        {TABS.map((tab) => (\n' +
  '          <li key={tab.id}>\n' +
  '            <button\n' +
  '              type="button"\n' +
  '              data-tab={tab.id}\n' +
  '              data-live={tab.live}\n' +
  '              aria-current={active === tab.id ? "page" : undefined}\n' +
  '              aria-disabled={tab.live ? undefined : true}\n' +
  '              tabIndex={tab.live ? undefined : -1}\n' +
  '              onClick={tab.live ? () => onSelect(tab.id) : undefined}\n' +
  '              className={cx(!tab.live && "cursor-not-allowed opacity-40")}\n' +
  '            >\n' +
  '              {tab.label}\n' +
  '            </button>\n' +
  '          </li>\n' +
  '        ))}\n' +
  '      </ul>\n' +
  '    </nav>\n' +
  '  );\n' +
  '}\n';

F['src/App.tsx'] =
  "import { useState } from 'react';\n" +
  '\n' +
  "import { Nav } from '@/components/Nav';\n" +
  "import { LIVE_TABS, type TabId } from '@/nav';\n" +
  "import { HomePane } from '@/panes/HomePane';\n" +
  "import { SecondPane } from '@/panes/SecondPane';\n" +
  "import { ThirdPane } from '@/panes/ThirdPane';\n" +
  '\n' +
  '/**\n' +
  ' * The shell. 100vh, no document scroll: anything that scrolls does it inside\n' +
  ' * its own region (rule 3), which is why probe.js treats a scrolling document\n' +
  ' * as a defect.\n' +
  ' */\n' +
  'export function App() {\n' +
  "  const [tab, setTab] = useState<TabId>(LIVE_TABS[0].id);\n" +
  '\n' +
  '  return (\n' +
  '    <div data-shell className="flex h-screen w-screen overflow-hidden">\n' +
  '      <Nav active={tab} onSelect={setTab} />\n' +
  '      <main data-region="main" className="min-w-0 flex-1 overflow-hidden">\n' +
  "        {tab === 'home' && <HomePane />}\n" +
  "        {tab === 'two' && <SecondPane />}\n" +
  "        {tab === 'three' && <ThirdPane />}\n" +
  '      </main>\n' +
  '    </div>\n' +
  '  );\n' +
  '}\n';

const pane = (name, note) =>
  '/** ' +
  note +
  ' */\n' +
  'export function ' +
  name +
  '() {\n' +
  '  return <div data-pane="' +
  name +
  '">build me</div>;\n' +
  '}\n';

F['src/panes/HomePane.tsx'] = pane('HomePane', 'The reference screen. Assembly only: imported components, never markup.');
F['src/panes/SecondPane.tsx'] = pane('SecondPane', 'Second built tab. Same design language, its own content.');
F['src/panes/ThirdPane.tsx'] = pane('ThirdPane', 'Third built tab. Same design language, its own content.');

F['src/styles/index.css'] =
  "@import 'tailwindcss';\n" +
  '\n' +
  '/*\n' +
  ' * Tokens, read off the reference with refscan.py -- never a hex scattered\n' +
  ' * through a component. Name them for what they do, not what colour they are.\n' +
  ' * The scanner\\u2019s roles line is the starting set.\n' +
  ' */\n' +
  '@theme {\n' +
  '  /* --color-ground:  ; */\n' +
  '  /* --color-surface: ; */\n' +
  '  /* --color-ink:     ; */\n' +
  '  /* --color-muted:   ; */\n' +
  '  /* --color-line:    ; */\n' +
  '  /* --color-accent:  ; */\n' +
  '}\n' +
  '\n' +
  '@layer base {\n' +
  '  html,\n' +
  '  body,\n' +
  '  #root {\n' +
  '    height: 100%;\n' +
  '  }\n' +
  '\n' +
  '  body {\n' +
  '    margin: 0;\n' +
  '    /* A dashboard is a shell: the document itself never scrolls (rule 3). */\n' +
  '    overflow: hidden;\n' +
  '    -webkit-font-smoothing: antialiased;\n' +
  '  }\n' +
  '\n' +
  '  :focus-visible {\n' +
  '    outline: 2px solid currentColor;\n' +
  '    outline-offset: 2px;\n' +
  '  }\n' +
  '}\n' +
  '\n' +
  '@media (prefers-reduced-motion: reduce) {\n' +
  '  /* Not a shorter duration: entrances do not play at all, and whatever is\n' +
  '     switched off still has to leave the dashboard usable. */\n' +
  '  *,\n' +
  '  *::before,\n' +
  '  *::after {\n' +
  '    animation-duration: 0.001ms !important;\n' +
  '    animation-iteration-count: 1 !important;\n' +
  '    transition-duration: 0.001ms !important;\n' +
  '  }\n' +
  '}\n';

F['src/lib/cx.ts'] =
  '/**\n' +
  ' * Join class names, dropping the ones that are off.\n' +
  ' *\n' +
  ' * It exists because of a real bug rather than a preference. prettier-plugin-\n' +
  ' * tailwindcss sorts class strings -- including the static part of a template\n' +
  ' * literal -- and in doing so eats the leading space in a conditional:\n' +
  ' *\n' +
  ' *     className={"card" + (on ? " -active" : "")}   // written\n' +
  ' *     className={"card" + (on ? "-active" : "")}    // after prettier\n' +
  ' *\n' +
  ' * which silently produces a class that does not exist. Every conditional class\n' +
  ' * goes through here instead, where there is no string for the plugin to touch.\n' +
  ' */\n' +
  'export function cx(...parts: Array<string | false | null | undefined>): string {\n' +
  '  return parts.filter(Boolean).join(\' \');\n' +
  '}\n';

F['src/lib/format.ts'] =
  '/** Number formatting, in one place so a figure reads the same everywhere. */\n' +
  "const money0 = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });\n" +
  "const money2 = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 });\n" +
  "const compact = new Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 1 });\n" +
  "const plain = new Intl.NumberFormat('en-US');\n" +
  '\n' +
  'export const usd = (n: number, cents = false) => (cents ? money2 : money0).format(n);\n' +
  'export const num = (n: number) => plain.format(n);\n' +
  'export const short = (n: number) => compact.format(n);\n' +
  "export const pct = (n: number, digits = 0) => (n > 0 ? '+' : '') + n.toFixed(digits) + '%';\n" +
  '\n' +
  'export const dateLong = (iso: string) =>\n' +
  "  new Date(iso + 'T00:00:00').toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });\n";

F['src/data/rng.ts'] =
  '/**\n' +
  ' * A seeded generator, because the data has to be the same every reload.\n' +
  ' *\n' +
  ' * Math.random() reshuffles between the probe, the rehearsal and the take, so\n' +
  ' * the chart that was measured is not the chart that gets filmed and every\n' +
  ' * numeric diff against an earlier shot is meaningless. mulberry32: tiny, fast,\n' +
  ' * and good enough for plausible-looking figures.\n' +
  ' */\n' +
  'export function rng(seed: number): () => number {\n' +
  '  let a = seed >>> 0;\n' +
  '  return function next() {\n' +
  '    a = (a + 0x6d2b79f5) >>> 0;\n' +
  '    let t = a;\n' +
  '    t = Math.imul(t ^ (t >>> 15), t | 1);\n' +
  '    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);\n' +
  '    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;\n' +
  '  };\n' +
  '}\n' +
  '\n' +
  '/** An integer in [min, max], from a seeded stream. */\n' +
  'export const between = (next: () => number, min: number, max: number) =>\n' +
  '  Math.round(min + next() * (max - min));\n';

F['src/lib/useMeasure.ts'] = fs.readFileSync(path.join(__dirname, 'templates', 'useMeasure.ts'), 'utf8');

F['src/charts/scale.ts'] =
  '/**\n' +
  ' * Chart maths. Shared across episodes because it is not a design decision;\n' +
  ' * everything about how a chart *looks* lives in the episode\\u2019s own component.\n' +
  ' */\n' +
  'export type Extent = [number, number];\n' +
  '\n' +
  'export const extent = (values: number[]): Extent => [Math.min(...values), Math.max(...values)];\n' +
  '\n' +
  '/** Map a value from a domain onto a range. */\n' +
  'export function scale(domain: Extent, range: Extent) {\n' +
  '  const [d0, d1] = domain;\n' +
  '  const [r0, r1] = range;\n' +
  '  const span = d1 - d0 || 1;\n' +
  '  return (v: number) => r0 + ((v - d0) / span) * (r1 - r0);\n' +
  '}\n' +
  '\n' +
  '/**\n' +
  ' * Ticks on round numbers, from the data rather than from a guess.\n' +
  ' * Four or five of them is right for a dashboard card.\n' +
  ' */\n' +
  'export function niceTicks([min, max]: Extent, count = 5): number[] {\n' +
  '  const span = max - min || 1;\n' +
  '  const rough = span / Math.max(1, count - 1);\n' +
  '  const mag = Math.pow(10, Math.floor(Math.log10(rough)));\n' +
  '  const step = [1, 2, 2.5, 5, 10].map((m) => m * mag).find((s) => s >= rough) ?? 10 * mag;\n' +
  '  const start = Math.floor(min / step) * step;\n' +
  '  const out: number[] = [];\n' +
  '  // Past max, not up to it: stopping at max can leave the top tick below\n' +
  '  // the largest value, and every chart maps its plot onto the last tick.\n' +
  '  for (let v = start; v < max + step; v += step) out.push(Math.round(v * 1e6) / 1e6);\n' +
  '  return out;\n' +
  '}\n' +
  '\n' +
  '/** Round for SVG: three decimals keeps paths short without visible drift. */\n' +
  'export const r3 = (n: number) => Math.round(n * 1000) / 1000;\n';

F['src/charts/path.ts'] =
  "import { r3 } from '@/charts/scale';\n" +
  '\n' +
  'export interface Pt {\n' +
  '  x: number;\n' +
  '  y: number;\n' +
  '}\n' +
  '\n' +
  'export const linePath = (pts: Pt[]) =>\n' +
  "  pts.map((p, i) => (i ? 'L' : 'M') + r3(p.x) + ' ' + r3(p.y)).join(' ');\n" +
  '\n' +
  '/**\n' +
  ' * A monotone cubic through the points: smooth, and it never overshoots into a\n' +
  ' * value the data does not contain -- which a plain cardinal spline does, and\n' +
  ' * which puts a revenue curve below zero between two positive weeks.\n' +
  ' */\n' +
  'export function smoothPath(pts: Pt[], tension = 0.35): string {\n' +
  "  if (pts.length < 2) return pts.length ? 'M' + r3(pts[0].x) + ' ' + r3(pts[0].y) : '';\n" +
  "  let d = 'M' + r3(pts[0].x) + ' ' + r3(pts[0].y);\n" +
  '  for (let i = 0; i < pts.length - 1; i++) {\n' +
  '    const p0 = pts[i - 1] ?? pts[i];\n' +
  '    const p1 = pts[i];\n' +
  '    const p2 = pts[i + 1];\n' +
  '    const p3 = pts[i + 2] ?? p2;\n' +
  '    const c1 = { x: p1.x + ((p2.x - p0.x) / 6) * tension * 2, y: p1.y + ((p2.y - p0.y) / 6) * tension * 2 };\n' +
  '    const c2 = { x: p2.x - ((p3.x - p1.x) / 6) * tension * 2, y: p2.y - ((p3.y - p1.y) / 6) * tension * 2 };\n' +
  "    d += ' C' + r3(c1.x) + ' ' + r3(c1.y) + ',' + r3(c2.x) + ' ' + r3(c2.y) + ',' + r3(p2.x) + ' ' + r3(p2.y);\n" +
  '  }\n' +
  '  return d;\n' +
  '}\n' +
  '\n' +
  '/** Close a line down to a baseline to make an area. */\n' +
  'export const areaPath = (d: string, x0: number, x1: number, baseline: number) =>\n' +
  "  d + ' L' + r3(x1) + ' ' + r3(baseline) + ' L' + r3(x0) + ' ' + r3(baseline) + ' Z';\n" +
  '\n' +
  '/** A donut/arc segment, angles in degrees clockwise from 12 o\\u2019clock. */\n' +
  'export function arcPath(cx: number, cy: number, rOuter: number, rInner: number, a0: number, a1: number): string {\n' +
  '  const rad = (a: number) => ((a - 90) * Math.PI) / 180;\n' +
  '  const large = Math.abs(a1 - a0) > 180 ? 1 : 0;\n' +
  '  const p = (r: number, a: number) => r3(cx + r * Math.cos(rad(a))) + \' \' + r3(cy + r * Math.sin(rad(a)));\n' +
  "  return 'M' + p(rOuter, a0) + ' A' + r3(rOuter) + ' ' + r3(rOuter) + ' 0 ' + large + ' 1 ' + p(rOuter, a1) +\n" +
  "    ' L' + p(rInner, a1) + ' A' + r3(rInner) + ' ' + r3(rInner) + ' 0 ' + large + ' 0 ' + p(rInner, a0) + ' Z';\n" +
  '}\n';

F['src/charts/ids.ts'] =
  "import { useId } from 'react';\n" +
  '\n' +
  '/**\n' +
  ' * Unique ids for SVG defs.\n' +
  ' *\n' +
  ' * A gradient, mask, clipPath or filter id is *document*-global, not scoped to\n' +
  ' * the svg that declares it. Two chart instances that both define id="fade"\n' +
  ' * collapse into one and every chart after the first paints in the first one\\u2019s\n' +
  ' * colour -- with no error anywhere. probe.js reports duplicates; this prevents\n' +
  ' * them.\n' +
  ' */\n' +
  'export function useDefIds<K extends string>(...names: K[]): Record<K, string> {\n' +
  '  const base = useId().replace(/:/g, \'\');\n' +
  '  return Object.fromEntries(names.map((n) => [n, n + \'-\' + base])) as Record<K, string>;\n' +
  '}\n' +
  '\n' +
  "/** url(#id), for a fill or a mask attribute. */\n" +
  "export const ref = (id: string) => 'url(#' + id + ')';\n";

F['drive/home.json'] = JSON.stringify(
  {
    url: 'http://localhost:' + port + '/',
    w: 1440,
    h: 900,
    settle: 600,
    beats: [
      { name: 'rest' },
      { name: 'inert-tab', click: '[data-tab][data-live=false]', expectUnchanged: true },
    ],
  },
  null,
  2,
);

F['README.md'] =
  '# ' +
  slug +
  '\n\n' +
  'Dashboard episode. Port ' +
  port +
  '.\n\n' +
  '```bash\n' +
  'npm install && npm run dev\n' +
  'python ../tools/refscan.py ref/<shot>.png\n' +
  'node ../tools/probe.js http://localhost:' +
  port +
  '/ --beats drive/hovers.json\n' +
  'node ../tools/drive.js drive/home.json\n' +
  '```\n\n' +
  '## The reference\n\n' +
  '_Which picture, and which kind it is (flat export = spec, posed board = inspo brief).\n' +
  "What refscan said: density, palette, grid. What the scanner got wrong._\n\n" +
  '## The three tabs\n\n' +
  '_Which three are built, and why those three. Which two are inert._\n\n' +
  '## Type\n\n' +
  '_The reference’s face, the free substitute, and what it cost._\n\n' +
  '## Interactions\n\n' +
  '| Control | What happens | Beat |\n|---|---|---|\n\n' +
  '## What the probe found\n\n' +
  '_In my own build. Contrast, targets, dead space, grid._\n\n' +
  '## Declared departures\n\n' +
  '_Every place this differs from the picture, with the reason._\n';

// ---- write ---------------------------------------------------------------

for (const [rel, content] of Object.entries(F)) {
  const file = path.join(dir, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content.replace(/\\u2019/g, '’'), 'utf8');
}
fs.mkdirSync(path.join(dir, 'ref'), { recursive: true });
fs.writeFileSync(path.join(dir, 'ref', '.gitkeep'), '');
fs.mkdirSync(path.join(dir, 'src', 'assets', 'img'), { recursive: true });
fs.writeFileSync(
  path.join(dir, 'src', 'assets', 'img', 'CREDITS.md'),
  '# Credits\n\nEvery bundled image: the file, where it came from, and its licence.\n' +
    'Faces are free-licensed photographs of real people (rule 8).\n',
);

// Register the passthroughs in the repository root package.json.
const rootPkgPath = path.resolve(root, '..', 'package.json');
try {
  const pkg = JSON.parse(fs.readFileSync(rootPkgPath, 'utf8'));
  pkg.scripts['dev:' + slug] = 'npm --prefix dashboards/' + slug + ' run dev';
  pkg.scripts['build:' + slug] = 'npm --prefix dashboards/' + slug + ' run build';
  fs.writeFileSync(rootPkgPath, JSON.stringify(pkg, null, 2) + '\n');
  console.log('registered dev:' + slug + ' and build:' + slug + ' in the root package.json');
} catch (e) {
  console.log('could not register scripts in the root package.json: ' + e.message);
}

console.log('');
console.log('scaffolded dashboards/' + slug + ' on port ' + port);
console.log('');
console.log('  cd dashboards/' + slug + ' && npm install && npm run dev');
console.log('  python ../tools/refscan.py ref/<shot>.png');
console.log('');
console.log('Install from inside the folder: --prefix from the root writes a self-dependency.');
console.log('Then: name the three live tabs in src/nav.ts, fill the token block, and build.');
