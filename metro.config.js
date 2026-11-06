const path = require('path');
const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname);

/**
 * Keep Metro's file map out of the sibling trees that live inside this repo.
 *
 * `dashboards/` is a Vite app with its own `node_modules` and its own dev
 * server, and `websites/` is the before/after series. Neither is part of the
 * Expo app, but Metro crawls the whole project root, so it walks both — and
 * `dist/`, this project's own export output, on top. On Windows that crawl
 * does not finish inside the watcher's start timeout, and the failure reads
 * as two unrelated errors:
 *
 *     Failed to start watch mode.
 *     TypeError: Cannot read properties of undefined (reading 'getSha1')
 *
 * The second is the first one's consequence: the file map was never built, so
 * react-native-css-interop's `ensureFileSystemPatched` dereferences undefined.
 * Chasing the `getSha1` line leads into NativeWind and finds nothing.
 *
 * The patterns are built from resolved absolute paths, and they have to match
 * the path with EITHER separator, because the two things that read this list
 * disagree about which one they test:
 *
 *   - Metro's crawler tests the native path, so on Windows, backslashes.
 *   - The watcher's directory walk tests it through
 *     `posixPathMatchesPattern`, which does `replaceAll(path.sep, '/')`
 *     first — so forward slashes, on every platform.
 *
 * A pattern written for one silently fails the other, and the watcher is the
 * half that matters here: on Windows `NativeWatcher.isSupported()` is
 * `platform() === 'darwin'`, so Metro falls back to `FallbackWatcher`, which
 * walks the tree itself and registers an `fs.watch` per directory. With the
 * block not matching, that walk covers ~250k files under `dashboards/` and
 * `websites/` and never finishes inside the watcher's 240s start timeout.
 *
 * So every separator becomes `[\\/]` rather than a literal `\`. A
 * backslash-only pattern blocks the crawl and leaves the watch walking
 * everything, which is the shape this bug had.
 */
const escape = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const ANY_SEP = '[\\\\/]';

// Escape each path segment, then rejoin on a separator class that accepts both
// forms, so the pattern matches `…\dashboards\x` and `…/dashboards/x` alike.
const pathPattern = (abs) => abs.split(/[\\/]/).map(escape).join(ANY_SEP);

const blocked = ['dashboards', 'websites', 'dist'].map(
  (dir) => new RegExp('^' + pathPattern(path.resolve(__dirname, dir)) + '(' + ANY_SEP + '.*)?$'),
);

const existing = config.resolver.blockList;
config.resolver.blockList = Array.isArray(existing)
  ? [...existing, ...blocked]
  : existing
    ? [existing, ...blocked]
    : blocked;

module.exports = withNativeWind(config, { input: './src/global.css' });
