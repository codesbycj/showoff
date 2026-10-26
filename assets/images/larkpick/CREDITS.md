# larkpick — image credits

**No bundled imagery.** Every mark on this screen is drawn, including the
seven flags.

Flags are the single worst thing to ship as emoji: Windows has no flag glyphs
at all, so each row would render as two letters in a box on the machine these
are recorded from — and the web harness would never show it (AGENTS.md, "Draw
small brand glyphs rather than relying on emoji ... flags in particular").

They are built from bands in clipped round `View`s rather than from SVG with a
circular `ClipPath`, because `Defs` ids are document-global on web and seven
flags on one screen would be seven chances to collide. Only China's star and
Korea's taegeuk carry a small `Svg`, and neither needs an id.
