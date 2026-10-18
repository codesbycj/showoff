# imagery

**None.** This showcase ships no image files.

The reference photographs its cars — specific marques, cut out and dropped on
the cards. Those photographs are not redistributable, and the sanctioned
stand-in (free-licensed stock) has no answer either: free stock does not
contain a cut-out supercar on transparency, and a found photograph badly cut
out looks worse than no photograph at all, which is the whole reason the rule
says "must not be traced badly".

So the cars are rebuilt as flat vector art in `react-native-svg`, in the same
dialect as the rest of the board — see `car-art.tsx` and `car-front.tsx`. The
review faces are plain discs for the same reason photographs of people are
avoided everywhere else in this repo. Every glyph is Lucide, which is paths
through the same renderer.
