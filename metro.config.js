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
 * The patterns are built from resolved absolute paths rather than written as
 * `/\/websites\//`, because a literal forward slash never matches a Windows
 * path and the block would silently do nothing.
 */
const escape = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const blocked = ['dashboards', 'websites', 'dist'].map(
  (dir) => new RegExp('^' + escape(path.resolve(__dirname, dir)) + '([\\\\/].*)?$'),
);

const existing = config.resolver.blockList;
config.resolver.blockList = Array.isArray(existing)
  ? [...existing, ...blocked]
  : existing
    ? [existing, ...blocked]
    : blocked;

module.exports = withNativeWind(config, { input: './src/global.css' });
