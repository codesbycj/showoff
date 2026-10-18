import { qz } from '../theme';

/**
 * Everything the home screen says.
 *
 * Kept out of the components so they stay presentational — a card renders what
 * it is handed and decides nothing, which is what lets the screen above it
 * decide where a tap goes (AGENTS.md, "Layout").
 */

export const header = {
  greeting: 'Hi, Alex',
  display: 'Ready for a quiz?',
  gems: '20',
} as const;

export const daily = {
  title: 'Daily Challenge',
  body: 'Answer 10 questions and\nwin 25 diamonds',
  done: 6,
  total: 10,
  cta: 'Play Now',
} as const;

export const categories = [
  { key: 'science', label: 'Science', meta: '12 Quizzes', color: qz.science, icon: 'flask' },
  { key: 'history', label: 'Histori', meta: '95 Quizzes', color: qz.history, icon: 'hourglass' },
  { key: 'movies', label: 'Movies', meta: '12 Quizzes', color: qz.movies, icon: 'clapper' },
  { key: 'sports', label: 'Sports', meta: '12 Quizzes', color: qz.sports, icon: 'trophy' },
] as const;

export const trending = [
  {
    key: 'space',
    title: 'Space Explorer',
    body: 'Explore the universe\nand beyond',
    meta: '10 Questions',
    color: qz.violet,
    art: 'astro',
  },
  {
    key: 'history',
    title: 'World History',
    body: 'Empires, maps and\nthe people in them',
    meta: '10 Questions',
    color: qz.forest,
    art: 'cheer',
  },
] as const;

export const sections = {
  categories: 'Categories',
  trending: 'Trending Quizzers',
  more: 'See All',
} as const;

export const dock = [
  { key: 'home', label: 'Home', icon: 'home' },
  { key: 'play', icon: 'gamepad' },
  { key: 'rank', icon: 'podium' },
  { key: 'me', icon: 'person' },
] as const;
