import type { Project } from '@/data/projects';

/**
 * One card's cover: the photograph, lifted, with the project's chrome over it.
 *
 * The image ships already cropped to the card's ratio (see
 * `assets/images/CREDITS.md`), so this is a composite rather than a layout —
 * the only work here is the tone lift and the two lines of type.
 */
const W = 1024;
const H = 640;

/** Load every cover in parallel. The strip cannot lay out until they are in. */
export function loadCovers(projects: Project[]): Promise<HTMLImageElement[]> {
  return Promise.all(
    projects.map(
      (p) =>
        new Promise<HTMLImageElement>((resolve, reject) => {
          const img = new Image();
          img.onload = () => resolve(img);
          img.onerror = () => reject(new Error(`cover failed to load: ${p.src}`));
          img.src = p.src;
        }),
    ),
  );
}

export function drawCover(p: Project, img: HTMLImageElement): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d')!;

  // The lift. A brightness filter rather than a white overlay, so the darks open
  // up without the whole frame going milky — these are Kodachromes and the
  // saturation is the point of them.
  //
  // Paired with a contrast cut, because `brightness` is a linear multiply and
  // on its own it drives the highlights straight into the ceiling: the two
  // darkest frames posterised into flat bands long before their mean was
  // usable. Easing contrast as the lift rises makes room at the top instead.
  const soften = 1 - (p.lift - 1) * 0.45;
  ctx.filter =
    p.lift === 1 ? 'none' : `brightness(${p.lift}) contrast(${soften.toFixed(3)}) saturate(1.06)`;
  ctx.drawImage(img, 0, 0, W, H);
  ctx.filter = 'none';

  // A soft darkening into the corners, so the frame has its own interior
  // shading for the sheen to play against rather than a flat exposure.
  const vig = ctx.createRadialGradient(W * 0.45, H * 0.42, H * 0.25, W * 0.5, H * 0.5, H * 1.05);
  vig.addColorStop(0, 'rgba(0,0,0,0)');
  vig.addColorStop(1, 'rgba(0,0,0,0.32)');
  ctx.fillStyle = vig;
  ctx.fillRect(0, 0, W, H);

  // The project's own chrome, so each card reads as a piece of work rather than
  // as a photograph. Shadowed, because it sits over a photograph this file does
  // not control and cannot assume is dark where the type lands.
  ctx.fillStyle = p.ink;
  ctx.shadowColor = 'rgba(0,0,0,0.55)';
  ctx.shadowBlur = H * 0.03;
  ctx.globalAlpha = 0.95;
  ctx.font = `600 ${Math.round(H * 0.042)}px "Geist Variable", system-ui, sans-serif`;

  ctx.textAlign = 'left';
  ctx.fillText(p.kind.toUpperCase(), W * 0.055, H * 0.115);
  ctx.textAlign = 'right';
  ctx.fillText(`'${p.year}`, W * 0.945, H * 0.115);

  // The title is deliberately NOT drawn here. It is DOM, pinned to the card's
  // corner by the strip — real text in the real font, selectable and readable,
  // where glyphs baked into a texture are none of those.

  return canvas;
}
