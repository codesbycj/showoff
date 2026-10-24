/**
 * Join class names, dropping the ones that are off.
 *
 * It exists because of a real bug rather than a preference. The repository's
 * `.prettierrc` loads `prettier-plugin-tailwindcss`, which sorts class strings
 * -- including the static part of a template literal -- and in doing so eats
 * the leading space in a conditional:
 *
 *     className={`q-tile${on ? ' -active' : ''}`}   // written
 *     className={`q-tile${on ? '-active' : ''}`}    // after prettier
 *
 * which silently produces `q-tile-active`, a class that does not exist. Every
 * conditional class in this episode goes through here instead, where there is
 * no string for the plugin to touch.
 *
 * Both designs use it, which is why it sits above `after/` and `before/`.
 */
export function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ');
}
