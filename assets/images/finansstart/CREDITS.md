# imagery

**None.** This showcase ships no image files.

The reference fills circles with photographs of people. Photographs of real
people are not redistributable, and a stand-in set would be stock portraits
doing nothing but filling circles — so contacts are drawn as initials on
colour, which is what a real app falls back to for a contact with no picture.

The flags are drawn in `react-native-svg` rather than set as emoji: Windows
ships no flag glyphs at all, so a harness render on this machine would show two
letters where a device shows a flag. The card's scheme mark is set in the
screen's own face and sheared — see `scheme-mark.tsx` for why it is not paths.
Every other glyph is Lucide, which is paths through the same renderer.
