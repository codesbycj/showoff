import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';

import { SweepText } from '@/components/SweepText';
import { FIGURE_BASE, FIGURES, PRODUCTS } from '@/data/products';
import {
  FIGURE,
  HEADLINE,
  MARQUEE,
  PALETTE,
  STAGE,
  TILE,
  tileGap,
  tileWidth,
} from '@/motion/motion';
import { useReducedMotion } from '@/motion/useReducedMotion';

const TAU = Math.PI * 2;

/**
 * A row of product tiles arcing across the stage, and the figure they pass.
 *
 * The tiles are not a carousel and nothing about them is tweened. Each frame
 * places every tile from elapsed time alone: a position along a track one tile
 * longer than the stage at each end, wrapped with a modulo so the tile leaving
 * the right re-enters at the left, and a height taken from a single cosine
 * trough. Whichever tile is nearest the focal point — just right of the figure —
 * is the active one, and the figure changes to wear it.
 *
 * Driving it from the clock rather than from tweens means a resize, a
 * backgrounded tab or a re-render can none of them desynchronise it: the next
 * frame is correct whatever happened before it.
 */
export function OneStandard() {
  const stageRef = useRef<HTMLDivElement>(null);
  const tileRefs = useRef<(HTMLDivElement | null)[]>([]);
  const reduced = useReducedMotion();

  const [count, setCount] = useState(MARQUEE.productCount * 2);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [placed, setPlaced] = useState(false);

  /** The figure the active product calls for; the base one until there is one. */
  const target = useMemo(() => {
    const product = PRODUCTS.find((p) => p.key === activeKey);
    return product ? product.figure : FIGURE_BASE;
  }, [activeKey]);

  /** The figure on screen, and the one that has been told to fade up over it. */
  const [figure, setFigure] = useState(FIGURE_BASE);
  const [faded, setFaded] = useState<string | null>(null);

  /**
   * Derived, not stored: anything that is not the figure on screen is arriving.
   * A second change part-way through a fade therefore replaces the arriving
   * image rather than queueing behind it, and cannot leave a stale one up.
   */
  const incoming = target === figure ? null : target;
  const incomingVisible = incoming !== null && faded === incoming;

  /**
   * How many tiles it takes to fill the stage, rounded up to a whole number of
   * cycles so the six products stay in order across the wrap.
   */
  useLayoutEffect(() => {
    const measure = () => {
      const stage = stageRef.current;
      if (!stage) return;

      const width = tileWidth(window.innerWidth);
      const step = width + tileGap(window.innerWidth);
      const needed = Math.ceil((stage.clientWidth + 2 * width) / step);
      const cycles = Math.ceil(needed / MARQUEE.productCount);

      setCount(Math.max(MARQUEE.productCount, cycles * MARQUEE.productCount));
    };

    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  /** The loop. */
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    let frame = 0;
    let start = performance.now();
    let hiddenAt = 0;
    let visible = true;
    let lastActive = -1;
    let hasPlaced = false;

    let stageWidth = stage.clientWidth;
    let stageHeight = stage.clientHeight;
    const resize = new ResizeObserver(() => {
      stageWidth = stage.clientWidth;
      stageHeight = stage.clientHeight;
    });
    resize.observe(stage);

    /** Last z-index written per tile, so most frames touch transform only. */
    const depths: string[] = [];

    const tick = (now: number) => {
      const width = tileWidth(window.innerWidth);
      const track = stageWidth + 2 * MARQUEE.overscanTiles * width;
      const spacing = track / count;
      const travelled = reduced ? 0 : ((now - start) / 1000) * (width / MARQUEE.secondsPerTile);
      const focus = stageWidth / 2 + MARQUEE.focusOffset * width;

      let nearest = -1;
      let nearestDistance = Infinity;

      for (let i = 0; i < count; i += 1) {
        const tile = tileRefs.current[i];
        if (!tile) continue;

        let x = (i * spacing - travelled) % track;
        if (x < 0) x += track;
        x -= width;

        const phase = (x / (MARQUEE.arc.period * stageWidth)) * TAU;
        const y =
          stageHeight * MARQUEE.arc.base +
          stageHeight * MARQUEE.arc.depth * (0.5 - 0.5 * Math.cos(phase));

        tile.style.transform = `translate3d(${x}px, ${y}px, 0)`;

        const depth = String(Math.round((x + width) / MARQUEE.depthStep));
        if (depths[i] !== depth) {
          depths[i] = depth;
          tile.style.zIndex = depth;
        }

        const distance = Math.abs(x + width / 2 - focus);
        if (distance < nearestDistance) {
          nearestDistance = distance;
          nearest = i;
        }
      }

      if (nearest !== lastActive) {
        lastActive = nearest;
        setActiveIndex(nearest);
        setActiveKey(PRODUCTS[nearest % PRODUCTS.length].key);
      }

      if (!hasPlaced) {
        hasPlaced = true;
        setPlaced(true);
      }

      if (!reduced && visible) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);

    /**
     * Offscreen, the loop stops and the time it was away is credited back to the
     * start, so scrolling past and returning does not jump the row forward.
     */
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting === visible) return;
      visible = entry.isIntersecting;

      if (visible) {
        start += performance.now() - hiddenAt;
        if (!reduced) frame = requestAnimationFrame(tick);
      } else {
        hiddenAt = performance.now();
        cancelAnimationFrame(frame);
      }
    });
    io.observe(stage);

    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      io.disconnect();
    };
  }, [count, reduced]);

  /**
   * The figure's crossfade. The arriving image mounts transparent and is told to
   * be opaque on the following frame, because a value the browser has never
   * painted is not a value it can transition from.
   */
  useEffect(() => {
    if (!incoming || faded === incoming) return;
    const frame = requestAnimationFrame(() => setFaded(incoming));
    return () => cancelAnimationFrame(frame);
  }, [incoming, faded]);

  /** Once it has faded up it becomes the figure, and the layer above it goes. */
  useEffect(() => {
    if (!incomingVisible || !incoming) return;
    const timer = window.setTimeout(() => setFigure(incoming), FIGURE.crossfade);
    return () => window.clearTimeout(timer);
  }, [incomingVisible, incoming]);

  return (
    <section
      style={{
        position: 'relative',
        background: PALETTE.paper,
        overflow: 'hidden',
        padding: `${STAGE.padTop} 0 0`,
        borderBottom: `1px solid ${PALETTE.sectionRule}`,
      }}
    >
      <h2
        style={{
          textAlign: 'center',
          fontFamily: 'var(--font-display)',
          fontWeight: 800,
          fontSize: HEADLINE.size,
          lineHeight: 1,
          letterSpacing: HEADLINE.tracking,
          textTransform: 'uppercase',
          marginBottom: HEADLINE.marginBottom,
          padding: '0 clamp(20px, 4vw, 64px)',
        }}
      >
        <SweepText color={PALETTE.ink}>
          One Standard.
          <br />
          Every Part Of Life.
        </SweepText>
      </h2>

      <div ref={stageRef} style={{ position: 'relative', height: STAGE.height }}>
        <div style={{ opacity: placed ? 1 : 0, transition: `opacity ${TILE.appear}` }}>
          {Array.from({ length: count }, (_, i) => {
            const product = PRODUCTS[i % PRODUCTS.length];
            const isActive = activeIndex === i;

            return (
              <div
                key={i}
                ref={(el) => {
                  tileRefs.current[i] = el;
                }}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: TILE.width,
                  height: `calc(${TILE.width} * ${TILE.aspect})`,
                  display: 'flex',
                  flexDirection: 'column',
                  background: PALETTE.paper,
                  border: isActive
                    ? `${TILE.border.active}px solid ${PALETTE.accent}`
                    : `${TILE.border.rest}px solid ${PALETTE.hairline}`,
                  transition: `border-color ${TILE.border.transition}`,
                  padding: TILE.pad,
                  willChange: 'transform',
                }}
              >
                <div style={{ position: 'relative', flex: '1 1 auto', minHeight: 0 }}>
                  {/* The caption below is the accessible name; alt would repeat it. */}
                  <img
                    src={product.image}
                    alt=""
                    style={{
                      position: 'absolute',
                      inset: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                    }}
                  />
                </div>
                <p
                  style={{
                    marginTop: TILE.label.marginTop,
                    textAlign: 'center',
                    flexShrink: 0,
                    whiteSpace: 'nowrap',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: TILE.label.weight,
                    fontSize: TILE.label.size,
                    color: PALETTE.ink,
                  }}
                >
                  {product.label}
                </p>
              </div>
            );
          })}
        </div>

        <div
          style={{
            position: 'absolute',
            left: '50%',
            bottom: 0,
            transform: 'translateX(-50%)',
            height: FIGURE.height,
            aspectRatio: activeKey ? FIGURE.ratio.product : FIGURE.ratio.base,
            transition: `aspect-ratio ${FIGURE.ratio.transition}`,
            zIndex: FIGURE.zIndex,
            pointerEvents: 'none',
          }}
        >
          <img src={figure} alt="Wearing the collection" style={FIGURE_IMG} />

          {incoming && (
            <img
              key={incoming}
              src={incoming}
              alt=""
              style={{
                ...FIGURE_IMG,
                opacity: incomingVisible ? 1 : 0,
                transition: `opacity ${FIGURE.crossfade}ms ease-out`,
              }}
            />
          )}

          {/* Every other figure, painted once so a swap never waits on a decode. */}
          <div aria-hidden style={{ position: 'absolute', inset: 0, opacity: 0 }}>
            {FIGURES.filter((src) => src !== figure && src !== incoming).map((src) => (
              <img key={src} src={src} alt="" style={FIGURE_IMG} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const FIGURE_IMG = {
  position: 'absolute',
  inset: 0,
  width: '100%',
  height: '100%',
  objectFit: 'contain',
} as const;
