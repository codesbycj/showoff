import { useRef } from 'react';

import { PRODUCT } from '@/content/site';
import { CARD_HOVER } from '@/motion/motion';
import { useHoverScale } from '@/motion/useHoverScale';

/**
 * The product panel: a 1200x675 card at a 40px radius, carrying a red mesh as a
 * photograph rather than as a gradient, the panel render over it, and a price
 * bar floating at the bottom.
 *
 * Two things are easy to get wrong here. The mesh is an *image* — a CSS
 * gradient cannot reproduce it and a hand-made one always looks like a
 * hand-made one. And the heading is two spans, not two elements: the product
 * name is cream at full strength and the sentence it sits in is the same cream
 * at 50%, so the name reads as the subject of a sentence rather than as a
 * label above one.
 *
 * The render scales to 1.03 over a second on `power2.out`, desktop only, while
 * the pointer is over the **Buy now button** — not over the card. That is the
 * reference's one piece of pointer interaction on the whole page, and it is
 * bound that way deliberately: the panel drifts towards you while you are
 * deciding, and the button it is bound to does not move at all.
 */
export function Product() {
  const buyRef = useRef<HTMLAnchorElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  useHoverScale(buyRef, imgRef, CARD_HOVER);

  return (
    <section id="panels" className="px-10">
      <div className="mx-auto flex max-w-[1200px] flex-col items-center">
        <div className="reveal bg-sand relative flex aspect-[1200/675] w-full max-w-[1200px] flex-col items-center justify-between overflow-hidden rounded-[40px] px-5 pb-[60px] pt-20">
          <img
            src={PRODUCT.image}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover"
          />

          <h2 className="relative max-w-[640px] text-center text-[clamp(22px,2.5vw,36px)] font-medium leading-[110%] tracking-[-0.01em] text-[rgba(242,236,226,0.5)]">
            <span className="text-paper">{PRODUCT.titleLead}</span>
            {PRODUCT.titleRest}
          </h2>

          <img
            ref={imgRef}
            src={PRODUCT.render}
            alt={PRODUCT.alt}
            loading="lazy"
            className="absolute left-1/2 top-[12%] w-[88%] max-w-[1056px] -translate-x-1/2 will-change-transform"
          />

          {/* The price bar. Half-transparent wine over the mesh, so the mesh
              reads through it rather than being covered by it. */}
          <div className="relative flex h-[77px] w-full max-w-[722px] items-center justify-between rounded-[80px] bg-[rgba(69,30,31,0.5)] pl-[30px] pr-3 backdrop-blur-[2px]">
            <p className="text-paper text-[16.5px] font-medium leading-tight">Next-gen red light</p>
            <div className="flex items-center gap-6">
              <p className="text-paper hidden text-[24px] font-medium leading-tight sm:block">
                from &euro;2,200
              </p>
              <a
                ref={buyRef}
                href="#panels"
                className="bg-paper text-ink flex h-[60px] items-center rounded-full px-10 text-[15px] font-medium transition-opacity duration-[400ms] hover:opacity-85"
              >
                Buy now
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
