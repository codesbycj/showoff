import { useEffect, useRef, useState } from 'react';

import { PROJECTS } from '@/data/projects';
import { Strip, type TitleMark } from '@/gl/strip';
import { useReducedMotion } from '@/motion/useReducedMotion';
import { loadCovers } from '@/textures/cover';

/**
 * The canvas, and the titles that ride along with it.
 *
 * The covers are loaded here rather than inside the strip, because the strip's
 * constructor cannot be async and a card whose texture arrives late would pop in
 * a frame after its neighbours. Loading them first costs a beat on a cold cache
 * and buys a strip that is complete the moment it appears.
 *
 * The titles are DOM rather than GL on purpose: real text, in the real font,
 * selectable and readable by a screen reader, where glyphs baked into a texture
 * are none of those. The strip projects each card's corner through the same
 * camera every frame and hands back a pixel position, so the words stay pinned
 * to a card that is bending.
 */
export function Stage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();
  const [marks, setMarks] = useState<TitleMark[]>([]);
  const [hovered, setHovered] = useState<number | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let strip: Strip | null = null;
    let cancelled = false;

    loadCovers(PROJECTS)
      .then((covers) => {
        if (cancelled || !canvasRef.current) return;
        strip = new Strip({
          canvas: canvasRef.current,
          reduced,
          covers,
          // ?silhouette renders flat unshaded cards, so tools/dent.js can ask
          // whether the hover moves the outline without the shading answering
          // for it. See the note on Strip's `silhouette` option.
          silhouette: new URLSearchParams(window.location.search).has('silhouette'),
          onTitles: setMarks,
          onHover: setHovered,
        });
      })
      .catch((e) => {
        console.error(e);
        setFailed(true);
      });

    return () => {
      cancelled = true;
      strip?.dispose();
    };
  }, [reduced]);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 h-full w-full touch-none"
        style={{ cursor: hovered === null ? 'grab' : 'pointer' }}
      />

      {/* Pinned to each card's bottom-left corner, projected per frame. */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden="true">
        {marks.map((m) => (
          <span
            key={m.index}
            className="absolute text-[clamp(0.95rem,1.4vw,1.35rem)] whitespace-nowrap text-white"
            style={{
              transform: `translate3d(${m.x}px, ${m.y}px, 0)`,
              opacity: m.visible ? 1 : 0,
              transition: 'opacity 240ms linear',
            }}
          >
            {PROJECTS[m.index].title}
          </span>
        ))}
      </div>

      {/* The same list, for anything that cannot see a canvas — and the only
          thing on screen if the covers never arrive. */}
      <ul className={failed ? 'absolute top-1/3 left-10 space-y-2 text-sm' : 'sr-only'}>
        {PROJECTS.map((p) => (
          <li key={p.title}>
            {p.title} — {p.kind}, 20{p.year}
          </li>
        ))}
      </ul>
    </>
  );
}
