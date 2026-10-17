import { useEffect, useRef, useState } from 'react';

import flagsPoster from '@/assets/video/flags-poster.webp';
import flagsVideo from '@/assets/video/flags.mp4';
import { CANVAS_FADE_MS } from '@/motion/motion';
import { useMediaQuery } from '@/motion/useMediaQuery';
import { useReducedMotion } from '@/motion/useReducedMotion';
import { createFlagsField } from '@/webgl/flagsField';

/**
 * The ribbons: a looping render, drawn through a displacement field.
 *
 * The `<video>` is in the DOM and painting — it is the fallback, and it is also
 * the texture source, since a video has to be decoding somewhere for WebGL to
 * sample it. The canvas lies over it and fades in once the first frame has been
 * uploaded, so there is never a flash of nothing: poster, then video, then the
 * same video with the field over it. If `getContext('webgl')` returns null the
 * canvas simply never appears and the video underneath is already correct.
 *
 * `mix-blend-multiply` is what makes the render sit on the page rather than in
 * a box: the source is ribbons on white, and multiply turns that white into
 * whatever the page is. It is also why the canvas is created with `alpha: true`
 * and premultiplied alpha — a canvas that blends has to have something to
 * blend.
 *
 * Below 768 there is no field at all, and the render is framed differently:
 * 80% of the height, anchored left, with the texture pulled to 41% across. Both
 * of those are the reference's own mobile branch, and the reasoning is the same
 * one it had — a phone has no pointer for the field to answer, so all it would
 * buy is a shader running on a battery.
 */
export function FlagsCanvas({ className = '' }: { className?: string }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [fieldReady, setFieldReady] = useState(false);
  const reduced = useReducedMotion();
  const isPhone = useMediaQuery('(max-width: 767px)');
  const fielded = !reduced && !isPhone;

  useEffect(() => {
    if (!fielded) return;
    const host = hostRef.current;
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (!host || !canvas || !video) return;

    const field = createFlagsField({ host, canvas, video, onReady: () => setFieldReady(true) });
    if (!field) return;
    return () => {
      field.destroy();
      // Cleared on the way out rather than on the way in: a stale `true` would
      // hide the video for the frame before the next field's first upload.
      setFieldReady(false);
    };
  }, [fielded]);

  if (isPhone) {
    return (
      <video
        src={reduced ? undefined : flagsVideo}
        poster={flagsPoster}
        width={1920}
        height={1080}
        muted
        loop
        playsInline
        autoPlay={!reduced}
        preload={reduced ? 'none' : 'auto'}
        aria-hidden="true"
        className="absolute -top-[10%] left-0 z-0 aspect-video h-[80%] w-auto object-cover object-[41%_0%] mix-blend-multiply saturate-[1.2]"
      />
    );
  }

  return (
    <div
      ref={hostRef}
      className={`absolute z-0 aspect-video h-full w-auto mix-blend-multiply saturate-[1.2] ${className}`}
    >
      <video
        ref={videoRef}
        src={reduced ? undefined : flagsVideo}
        poster={flagsPoster}
        width={1920}
        height={1080}
        muted
        loop
        playsInline
        autoPlay={!reduced}
        preload={reduced ? 'none' : 'auto'}
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover transition-opacity"
        style={{
          transitionDuration: `${CANVAS_FADE_MS}ms`,
          opacity: fielded && fieldReady ? 0 : 1,
        }}
      />
      {fielded ? (
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className="absolute inset-0 h-full w-full transition-opacity"
          style={{ transitionDuration: `${CANVAS_FADE_MS}ms`, opacity: fieldReady ? 1 : 0 }}
        />
      ) : null}
    </div>
  );
}
