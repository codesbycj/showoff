# lumina imagery

Lumina Learn has no real brand photography to stand in for — the only image the
app uses is its own avatar, and that shipped inside the Stitch export rather
than being sourced here.

| File | Source | License |
|---|---|---|
| `student.jpg` | The Stitch export's own generated portrait, from the folder named for its prompt (`friendly_young_male_college_student_with_curly_brown_hair_and_glasses_wearing/screen.png`). Resized 1024×1024 → 256×256 and re-encoded as JPEG, which took it from 1.5MB to 14KB; it is never drawn larger than 74dp, so 256px covers 3× density with room to spare. | Ships with the design bundle. |

The home screen's reference render shows a different face in the greeting pill —
Stitch pointed that one at a `googleusercontent` URL that is not part of the
export and does not resolve. The bundled portrait is used on both the home and
profile screens instead, which also makes them agree about who the user is; the
reference has them disagree, with "Tommy" on one screen and "Helping Hand" on
the other.
