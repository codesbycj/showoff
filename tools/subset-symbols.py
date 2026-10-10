"""Cut Material Symbols Outlined down to the glyphs one showcase actually uses,
and write out the codepoint map the app addresses them by.

    python tools/subset-symbols.py <slug> --ref <stitch-export-dir>
    python tools/subset-symbols.py <slug> --from-source

The full 400 cut is 944KB — most of a megabyte the device pulls before first
paint, for what amounts to fifty icons.

Subsetting by `--text` does almost nothing (944KB -> 775KB), because the font
renders icons as *ligatures* over ordinary letters: keep the alphabet and you
keep nearly every icon in the font. So this subsets by **codepoint** instead.
Each icon also has a private-use codepoint, which is both far more subsettable
and more reliable to render than a ligature — React Native's shaping of a
multi-letter ligature across platforms is not something the web harness can
verify, and a font that silently renders the literal word `notifications` is a
failure mode worth designing out.

The name -> codepoint map comes out of the font itself, via its glyph names and
cmap, so nothing here depends on a network lookup or a second package.

Two ways to find the names:

`--ref` scans the Stitch export's `*/code.html` for `material-symbols-outlined`
spans. That is the normal path while building.

`--from-source` recovers them from the showcase itself instead — every
`SYMBOL.foo` in `src/features/<slug>/`, plus every quoted camelCase token there
that happens to name a real Material glyph. It exists because the export is a
download that gets cleared out, and once it is gone `--ref` has nothing to read;
the app's own source is then the only record of which icons it needs. Always
follow it with `tsc`, which is what actually proves the map is complete: a key
the scan missed is a type error naming it.
"""

import glob
import io
import os
import re
import sys

from fontTools import subset
from fontTools.ttLib import TTFont

argv = sys.argv[1:]
if len(argv) < 2 or argv[1] not in ("--ref", "--from-source"):
    sys.exit("usage: subset-symbols.py <slug> --ref <dir> | <slug> --from-source")

SLUG = argv[0]
MODE = argv[1]
REF = argv[2] if MODE == "--ref" else None
if MODE == "--ref" and not REF:
    sys.exit("--ref needs a directory")

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
NAME = "".join(p.capitalize() for p in SLUG.split("-")) + "Symbols"

PKG = os.path.join(ROOT, "node_modules", "@expo-google-fonts", "material-symbols-outlined")
SRC = os.path.join(PKG, "400Regular", "MaterialSymbolsOutlined_400Regular.ttf")
OUT_DIR = os.path.join(ROOT, "assets", "fonts", SLUG + "-symbols")
OUT = os.path.join(OUT_DIR, NAME + "_400Regular.ttf")
FEATURE = os.path.join(ROOT, "src", "features", SLUG)
MAP = os.path.join(FEATURE, "symbols.ts")

# Names each rebuild needs that its reference draws another way, and names the
# reference uses that Material Symbols does not carry. Both are per-showcase, so
# a substitution lives here rather than being smuggled into a screen.
EXTRA = {
    "pesse": {"arrow_upward", "arrow_downward", "home", "more_horiz"},
    # Mindful Pop draws nineteen of its small marks as literal emoji in the
    # markup. An emoji is resolved by whatever font the device carries for that
    # codepoint, which differs across Windows, Android and iOS and which the web
    # harness cannot see, so each is rebuilt from the icon set. These seven are
    # the replacements the reference never names as icons:
    #   U+2615 coffee -> local_cafe      U+1F30A wave    -> waves
    #   U+1F327 rain  -> rainy           U+1F35D pasta   -> dinner_dining
    #   U+1F3AF target-> track_changes   U+1F4F1 phone   -> mobile
    #   U+1F96A sandwich -> no_meals  (the row reads "Skipped Lunch")
    # Volt sets eight emoji as UI, seven of them on the sport-category chips.
    # An emoji is drawn by whichever font claims the codepoint, so it differs
    # across Windows, Android and iOS and the harness cannot see the difference.
    # Five need glyphs the markup never names as icons:
    #   U+1F3C0 basketball -> sports_basketball   U+1F3BE tennis -> sports_tennis
    #   U+1F3AE video game -> sports_esports      U+26BE baseball -> sports_baseball
    #   U+1F464 bust       -> person
    # The other three are already in the set: U+26BD -> sports_soccer,
    # U+26A1 -> bolt, U+2713 -> check.
    "volt": {
        "sports_basketball",
        "sports_tennis",
        "sports_esports",
        "sports_baseball",
        "person",
    },
    "mindful": {
        "local_cafe",
        "waves",
        "rainy",
        "dinner_dining",
        "track_changes",
        "mobile",
        "no_meals",
    },
}
ALIASES = {
    # `help_outline` simply became `help`. There is no phone-with-a-lock in
    # Symbols at all, so Pesse's two-factor row takes `encrypted` — the nearest
    # mark for a secured device. Both keep the reference's key.
    "pesse": {"help_outline": "help", "phonelink_lock": "encrypted"},
    # `location_on` is the legacy Material *Icons* name for the map pin; in
    # Symbols the same glyph is `place`.
    "redbrew": {"location_on": "place"},
    "auralegal": {"location_on": "place"},
    # Travelexa uses three legacy Material *Icons* names that Symbols renamed:
    # the pin is `place`, the hollow heart is just `favorite` (Symbols carries
    # the fill on an axis rather than in two glyphs), and `people` is `group`.
    "travelexa": {
        "location_on": "place",
        "favorite_border": "favorite",
        "people": "group",
    },
    # Fashora names three glyphs the Symbols cmap spells differently: the pin is
    # `place` as above, the Apple Pay card's phone is `mobile` (there is no
    # `smartphone`), and the turntable badge's `360` is `_360` — the font
    # prefixes an underscore onto every glyph name that would start with a
    # digit, so the reference's own name can never match.
    "fashora": {"location_on": "place", "smartphone": "mobile", "360": "_360"},
    # `card_giftcard` is Material *Icons* only. Symbols draws the same
    # gift-with-a-bow as `redeem`, which is what the profile's gifting row wants.
    "mindful": {"card_giftcard": "redeem"},
    # Symbols carries the bell's fill on an axis rather than in two glyphs, so
    # the legacy Material *Icons* name `notifications_none` has no entry at all;
    # the hollow bell is plain `notifications`. PulseFit's markup names both,
    # one in the header and one in the greeting row, and draws them identically.
    "pulsefit": {"notifications_none": "notifications"},
}
ALIAS = ALIASES.get(SLUG, {})


def camel_to_snake(s):
    return re.sub(r"(?<!^)(?=[A-Z])", "_", s).lower()


font = TTFont(SRC)
by_glyph = {}
for cp, gname in font.getBestCmap().items():
    by_glyph.setdefault(gname, cp)

names = set()

if MODE == "--ref":
    for f in glob.glob(os.path.join(REF, "*", "code.html")):
        html = io.open(f, encoding="utf-8").read()
        for m in re.finditer(r"material-symbols-outlined[^>]*>([a-z0-9_]+)<", html):
            names.add(m.group(1))
    if not names:
        sys.exit("no material-symbols spans found under %s" % REF)
else:
    # Routes name icons too, so `src/app/<slug>` counts as source; so do the
    # staged blank/finished copies, which hold lines the live tree may have
    # commented out.
    srcs = glob.glob(os.path.join(FEATURE, "**", "*.ts*"), recursive=True)
    srcs += glob.glob(os.path.join(ROOT, "src", "app", SLUG, "**", "*.ts*"), recursive=True)
    srcs += glob.glob(
        os.path.join(ROOT, "tools", "timelapse", "showcases", SLUG, "**", "*"), recursive=True
    )
    for f in srcs:
        if not os.path.isfile(f):
            continue
        try:
            text = io.open(f, encoding="utf-8").read()
        except (UnicodeDecodeError, OSError):
            continue
        for m in re.finditer(r"SYMBOL\.([a-zA-Z0-9]+)", text):
            names.add(camel_to_snake(m.group(1)))
        # Any quoted camelCase token that names a real glyph. Both quote styles:
        # data files write `icon: 'send'`, JSX writes `icon="send"`, and matching
        # only one of them silently drops every icon named in a route.
        # Over-inclusive by design — a stray match costs a few bytes, a miss
        # costs a blank icon.
        for m in re.finditer(r"['\"]([a-z][a-zA-Z0-9]{2,})['\"]", text):
            snake = camel_to_snake(m.group(1))
            if snake in by_glyph:
                names.add(snake)
    if not names:
        sys.exit("no SYMBOL usage found under %s" % FEATURE)

names |= EXTRA.get(SLUG, set())
names = {ALIAS.get(n, n) for n in names} | set(ALIAS)

found, missing = {}, []
for n in sorted(names):
    cp = by_glyph.get(n) or by_glyph.get(ALIAS.get(n, ""))
    if cp is None:
        missing.append(n)
    else:
        found[n] = cp

os.makedirs(OUT_DIR, exist_ok=True)
subset.main(
    [
        SRC,
        "--unicodes=" + ",".join("U+%04X" % cp for cp in found.values()),
        "--layout-features=",
        "--output-file=" + OUT,
    ]
)

# Give the subset its own internal family name.
#
# fontTools copies the source font's `name` table through untouched, so every
# subset comes out still calling itself "Material Symbols Outlined". On the web
# that is harmless — each `useFonts` key becomes its own `@font-face` family —
# but **Android resolves a font by the family name inside the file**, not by the
# key it was registered under. Two showcases each shipping a differently-subset
# "Material Symbols Outlined" therefore collide: whichever registers first wins,
# and every codepoint only the loser carries renders as tofu, or as whatever
# the system emoji font happens to map that PUA codepoint to.
#
# That shipped once — Kinetic's icons silently fell back to Pesse's subset, and
# only the glyphs the two sets happened to share appeared. The web harness
# cannot see it, so it is designed out here instead: the name is unique by
# construction, per showcase.
out = TTFont(OUT)
records = {
    1: NAME,  # family
    3: "%s;subset-symbols" % NAME,  # unique id
    4: "%s Regular" % NAME,  # full name
    6: "%s-Regular" % NAME,  # postscript name
    16: NAME,  # typographic family
}
for rec in out["name"].names:
    if rec.nameID in records:
        rec.string = records[rec.nameID].encode("utf-16-be" if rec.platformID == 3 else "ascii")
out.save(OUT)

lines = [
    "/**",
    " * The icon codepoints %s uses, cut out of Material Symbols Outlined."
    % SLUG.capitalize(),
    " *",
    " * The design sets every icon in Material Symbols, which renders them as",
    " * ligatures over ordinary words. This app addresses them by codepoint",
    " * instead: it is what makes the font subsettable from 944KB down to a few",
    " * KB, and it removes a dependency on React Native shaping a multi-letter",
    " * ligature identically on both platforms — a failure there renders the",
    " * literal word `notifications`, and the web harness cannot see it.",
    " *",
    " * Generated from the font's own cmap. Do not hand-edit; re-run",
    " * `tools/subset-symbols.py` if an icon is added.",
    " */",
    "export const SYMBOL = {",
]
# A glyph whose Material name would start with a digit — `360` — is spelled
# `_360` in the cmap, so an alias for it brings both spellings here and both
# reduce to the same key. The key is prefixed to make it a legal identifier,
# and the second spelling is dropped: a duplicate key is a TypeScript error,
# not a stray byte.
seen = set()
for n, cp in sorted(found.items()):
    key = "".join(p.capitalize() for p in n.split("_"))
    key = key[0].lower() + key[1:]
    if key[0].isdigit():
        key = "icon" + key
    if key in seen:
        continue
    seen.add(key)
    lines.append("  %s: '\\u%04x'," % (key, cp))
lines.append("} as const;")
lines.append("")
lines.append("export type SymbolName = keyof typeof SYMBOL;")
lines.append("")
io.open(MAP, "w", encoding="utf-8", newline="\n").write("\n".join(lines))

print("icons kept:", len(found), "missing:", missing)
print("%.1f KB -> %.1f KB" % (os.path.getsize(SRC) / 1024, os.path.getsize(OUT) / 1024))
