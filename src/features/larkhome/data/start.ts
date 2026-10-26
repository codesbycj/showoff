/**
 * Everything the course board says, so the components stay presentational.
 *
 * The account name is gender-neutral. The portrait comes from a fixed pool,
 * so pinning a gendered name to whichever face lands first says something
 * about a real person that the data has no business saying.
 *
 * **The streak and the gem count are drawn, not emoji.** The reference uses a
 * flame and a diamond; shipped as emoji they differ across Windows, Android
 * and iOS and the flag beside them would not render on Windows at all
 * (AGENTS.md).
 *
 * **"Greet people" leads with speech bubbles rather than a handshake.** The
 * reference draws two hands meeting; hands at 78dp come out as a smudge, and
 * a greeting is as well said by two bubbles. The rest of the motifs are the
 * reference's own - a dumbbell, a pan, a case, a lipstick - and every one of
 * them is a small flat object, which is the side of the drawing-range rule
 * that *is* vectors.
 */

export const copy = {
  name: 'Alex Parker',
} as const;

export const avatar = require('../../../../assets/images/larkhome/face-1.jpg');

export const stats = { streak: 121, gems: 1218 };

export const courses = [
  {
    id: 'greet',
    title: 'Greet people',
    body: 'Greetings and introductions in Italian',
    tone: 'pink',
    art: 'bubbles',
  },
  {
    id: 'sport',
    title: 'Sport & Activities',
    body: 'Master the terminology of sports in foreign languages',
    tone: 'mint',
    art: 'dumbbell',
  },
  {
    id: 'food',
    title: 'Food & Cooking',
    body: 'Learn recipes and culinary traditions',
    tone: 'teal',
    art: 'pan',
  },
  {
    id: 'travel',
    title: 'Traveling',
    body: 'Expand your vocabulary for adventures abroad',
    tone: 'lilac',
    art: 'case',
  },
  {
    id: 'beauty',
    title: 'Beauty & Fashion',
    body: 'The words for how things look and how they are worn',
    tone: 'peach',
    art: 'lipstick',
  },
] as const;
