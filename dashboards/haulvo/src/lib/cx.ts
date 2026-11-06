/**
 * Join class names, dropping the ones that are off.
 *
 * It exists because of a real bug rather than a preference. prettier-plugin-
 * tailwindcss sorts class strings -- including the static part of a template
 * literal -- and in doing so eats the leading space in a conditional:
 *
 *     className={"card" + (on ? " -active" : "")}   // written
 *     className={"card" + (on ? "-active" : "")}    // after prettier
 *
 * which silently produces a class that does not exist. Every conditional class
 * goes through here instead, where there is no string for the plugin to touch.
 */
export function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ');
}
