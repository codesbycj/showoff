import type { Project } from '@/data/deck';

const GLYPHS: Record<Project['glyph'], string> = {
  // A bracket pair, for development work.
  code: 'M9.6 8.2 6 12l3.6 3.8M14.4 8.2 18 12l-3.6 3.8',
  // A nib.
  quill: 'M7 17 17 7M9.4 14.6l-2.2 1 1-2.2M16.2 5.6l2.2 2.2-2.6 2.6-2.2-2.2z',
  // A brush.
  brush: 'M15.8 5.6 8.4 13l2.6 2.6 7.4-7.4zM8.4 13c-1.6.6-2.3 1.7-2.5 3.6 2.1-.1 3.2-.8 3.8-2.4',
  // A four-point spark.
  spark:
    'M12 5.5c0 3.2 1 4.4 4.3 4.4-3.3 0-4.3 1.2-4.3 4.4 0-3.2-1-4.4-4.3-4.4 3.3 0 4.3-1.2 4.3-4.4M17 15.2c0 1.4.5 1.9 1.9 1.9-1.4 0-1.9.5-1.9 1.9 0-1.4-.5-1.9-1.9-1.9 1.4 0 1.9-.5 1.9-1.9',
  // Four panes.
  grid: 'M6 6.8h4.4v4.4H6zM13.6 6.8H18v4.4h-4.4zM6 12.8h4.4v4.4H6zM13.6 12.8H18v4.4h-4.4z',
};

/**
 * The coloured square in front of a project's name.
 *
 * Drawn, not photographed: a bracket, a nib, a brush, a spark and four panes
 * are all small objects, which is exactly what is in drawing range. The tint is
 * the project's own, from the deck.
 */
export function ProjectTile({ project, size = 44 }: { project: Project; size?: number }) {
  return (
    <span
      aria-hidden="true"
      style={{ width: size, height: size, background: project.tint, borderRadius: size * 0.3 }}
      className="grid shrink-0 place-items-center text-white"
    >
      <svg
        width={size * 0.55}
        height={size * 0.55}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.9}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d={GLYPHS[project.glyph]} />
      </svg>
    </span>
  );
}
