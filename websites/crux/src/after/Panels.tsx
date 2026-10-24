import { useState } from 'react';

import { Chars, Panel, StoreBadge, TryButton, Wordmark, Words } from '@/after/Parts';
import cloud2 from '@/assets/img/hero/cloud-2.webp';
import cloud1 from '@/assets/img/hero/cloud.webp';
import phoneChairNarrow from '@/assets/img/phone/chair-narrow.webp';
import phoneChair from '@/assets/img/phone/chair.webp';
import phoneHand from '@/assets/img/phone/hand.webp';
import {
  brand,
  caseStudy,
  community,
  footer,
  download,
  faq,
  features,
  hero,
  humans,
  inside,
  lesson,
  misinformation,
  why,
} from '@/content/site';
import { cx } from '@/cx';
import { CHIP_ROWS } from '@/motion/motion';

/* ------------------------------------------------------------------- hero */

/**
 * The hero: a sky, two cloud layers drifting sideways, and a 128px headline
 * filled with a gradient rather than a colour.
 */
export function Hero() {
  return (
    <main className="flex h-screen max-h-[1440px] flex-col p-4 max-md:p-3" id="top">
      <section className="from-sky-1 to-sky-2 relative mx-auto h-full w-full max-w-[1440px] flex-1 overflow-hidden rounded-[32px] bg-gradient-to-b max-md:rounded-[28px]">
        <div
          className="pointer-events-none absolute left-1/2 top-0 z-[1] w-[2048px] max-[1200px]:w-[1400px] max-lg:w-[1200px]"
          style={{ animation: 'cloud-drift 24s ease-in-out infinite' }}
        >
          <img src={cloud1} alt="" className="h-auto w-full" />
        </div>

        <div className="absolute inset-0 z-[2] flex flex-col items-center justify-center pb-6 max-md:py-8">
          <span className="font-gabarito text-sky-ink mb-3 text-[18px] font-semibold uppercase leading-[24px] tracking-[0.1em] max-lg:text-[16px] max-md:text-[14px]">
            {hero.eyebrow}
          </span>
          <h1 className="font-archivo hero-title-gradient text-center text-[128px] font-semibold leading-[140px] tracking-[-0.015em] max-[1200px]:text-[clamp(48px,8vw,120px)] max-[1200px]:leading-[1.1] max-md:px-4 max-md:text-[clamp(40px,12vw,72px)] max-md:leading-[1.15]">
            {hero.headingLines.map((line, i) => (
              <span key={line}>
                {i > 0 && <br />}
                {line}
              </span>
            ))}
          </h1>
        </div>

        <div
          className="top-2/5 pointer-events-none absolute left-1/2 z-[3] w-[2048px] max-[1200px]:w-[1400px] max-lg:w-[1200px]"
          style={{ animation: 'cloud-drift 31s ease-in-out infinite' }}
        >
          <img src={cloud2} alt="" className="h-auto w-full" />
        </div>
      </section>
    </main>
  );
}

/* -------------------------------------------------------------------- why */

export function Why() {
  return (
    <Panel
      tone="bg-peach"
      id="about"
      className="flex min-h-[760px] items-center justify-center max-[1200px]:min-h-[640px] max-lg:min-h-[500px] max-md:min-h-[560px]"
    >
      <div className="pointer-events-none absolute inset-0 z-[3]">
        {why.objects.map((o) => (
          <div
            key={o.alt}
            className="why-image bg-sand absolute overflow-hidden rounded-[16px] border-2 border-white shadow-[0_4px_22px_rgba(116,130,151,0.15)] max-lg:rounded-[12px] max-lg:border max-md:rounded-[8px]"
            style={{
              left: `${o.x}%`,
              top: `${o.y}%`,
              width: `${(o.size / 1408) * 100}%`,
              aspectRatio: '1',
            }}
          >
            <img src={o.src} alt={o.alt} className="size-full object-cover" loading="lazy" />
          </div>
        ))}
      </div>

      <div className="relative z-[2] flex max-w-[820px] flex-col items-center gap-6 px-12 py-[80px] text-center max-[1200px]:gap-5 max-[1200px]:px-8 max-lg:gap-4 max-md:gap-3 max-md:px-8">
        <h2 className="font-gabarito text-ink text-[18px] font-semibold uppercase leading-[24px] tracking-[0.1em] max-[1200px]:text-[16px] max-md:text-[14px] max-md:leading-[20px]">
          {why.eyebrow}
        </h2>
        {why.lines.map((line) => (
          <Chars
            key={line.slice(0, 16)}
            text={line}
            className="font-archivo text-ink text-balance text-[32px] font-normal leading-[40px] tracking-[-0.015em] max-[1200px]:text-[24px] max-[1200px]:leading-[32px] max-md:text-[20px] max-md:leading-[26px]"
          />
        ))}
      </div>
    </Panel>
  );
}

/* ---------------------------------------------------------- the four panels */

const TONE = {
  sand: 'bg-sand',
  lilac: 'bg-lilac',
  mist: 'bg-mist',
  sage: 'bg-sage',
} as const;

/** Two rows of two panels, 5/7 then 7/5 of a twelve-column grid. */
export function Features({ from, to }: { from: number; to: number }) {
  return (
    <section className="bg-white px-4 pb-4 max-md:px-3 max-md:pb-3" aria-label="Key features">
      <div className="mx-auto grid max-w-[1440px] grid-cols-12 gap-4 max-lg:grid-cols-1 max-md:gap-3">
        {features.slice(from, to).map((f) => (
          <div
            key={f.key}
            data-in
            className={cx(
              'relative flex h-[760px] flex-col overflow-clip rounded-[32px] max-[1200px]:h-[560px] max-lg:h-auto max-lg:flex-row max-md:rounded-[28px] max-sm:flex-col',
              f.span === 5 ? 'col-span-5' : 'col-span-7',
              'max-lg:col-span-1',
              TONE[f.tone],
            )}
          >
            {f.art === 'phone-hand' ? (
              <div className="pointer-events-none absolute right-[8%] top-[44%] aspect-square w-[107%]">
                <div className="bg-tangerine size-full rounded-full" />
              </div>
            ) : null}

            <div className="z-[4] flex min-h-[220px] flex-shrink-0 flex-col gap-4 px-[48px] py-[48px] max-[1200px]:min-h-[200px] max-[1200px]:px-8 max-[1200px]:py-8 max-[1200px]:pb-10 max-lg:w-3/5 max-lg:px-6 max-lg:py-8 max-sm:min-h-0 max-sm:w-full">
              <Words
                as="h2"
                text={f.heading}
                className="font-archivo text-ink text-[40px] font-semibold leading-[48px] tracking-[-0.015em] max-[1200px]:text-[32px] max-[1200px]:leading-[40px] max-lg:text-[32px] max-lg:leading-[40px]"
              />
              <Words
                as="p"
                text={f.body}
                start={f.heading.split(' ').length}
                className="font-archivo text-body text-[20px] font-normal leading-[28px] tracking-[0.025em] max-[1200px]:text-[16px] max-[1200px]:leading-[24px]"
              />
            </div>

            <div className="z-[2] flex min-h-0 flex-1 items-start max-lg:aspect-[7/6] max-lg:w-2/5 max-lg:flex-none max-lg:justify-end max-lg:pt-2 max-sm:w-full max-sm:overflow-hidden max-sm:pt-0">
              {f.art === 'phone-hand' ? (
                <img
                  src={phoneHand}
                  alt="A hand holding a phone with the crux app open"
                  className="h-auto w-full object-contain object-top max-[1200px]:w-[130%]"
                  loading="lazy"
                />
              ) : null}
              {f.art === 'skills' ? <TopicChips /> : null}
              {f.art === 'lesson' ? <LessonCard /> : null}
              {f.art === 'case' ? <CaseCard /> : null}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/** The topic chips, which the reference ships as a picture of text. */
function TopicChips() {
  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-3 px-10 pb-10">
      {inside.topics.map((t) => (
        <span
          key={t}
          className="font-archivo text-ink rounded-full bg-[#E8F96B] px-5 py-2.5 text-[18px] leading-[24px] shadow-[0_2px_0_rgba(24,29,31,0.12)] max-[1200px]:text-[15px]"
        >
          {t}
        </span>
      ))}
    </div>
  );
}

/**
 * The lesson card, rebuilt. The reference illustrates this panel with a
 * screenshot of its own application; this is the same card as live markup, so
 * every word in it is selectable and it reflows at 390.
 */
function LessonCard() {
  return (
    <div className="flex w-full gap-4 px-10 pb-10 max-[1200px]:px-6">
      <div className="w-[62%] shrink-0 rounded-[18px] bg-white p-5 shadow-[0_4px_22px_rgba(116,130,151,0.18)]">
        <div className="flex items-center gap-2">
          <span className="bg-ink/15 block size-4 rounded-[4px]" />
          <span className="bg-ink/10 h-px flex-1" />
          <span className="font-archivo text-body text-[12px]">×</span>
        </div>
        <div className="bg-sky-1/20 text-sky-ink mt-4 flex size-10 items-center justify-center rounded-[8px]">
          <svg viewBox="0 0 24 24" className="size-5" fill="currentColor" aria-hidden="true">
            <path d="M4 5h16v11H4zM9 19h6v1H9z" />
          </svg>
        </div>
        <h3 className="font-archivo text-ink mt-3 text-[20px] font-semibold leading-[26px]">
          {lesson.title}
        </h3>
        {lesson.body.map((p) => (
          <p
            key={p.slice(0, 20)}
            className="font-archivo text-body mt-2 text-[12px] leading-[18px]"
            dangerouslySetInnerHTML={{ __html: p.replace(/\*\*(.+?)\*\*/g, '<b>$1</b>') }}
          />
        ))}
      </div>
      <div className="flex flex-1 flex-col gap-3 pt-10">
        {lesson.asides.map((a) => (
          <span
            key={a}
            className="font-archivo text-body rounded-[14px] bg-white px-4 py-3 text-[12px] leading-[16px] shadow-[0_4px_22px_rgba(116,130,151,0.18)]"
          >
            {a}
          </span>
        ))}
      </div>
    </div>
  );
}

/**
 * The case-study card, rebuilt and re-subjected. The reference's names a real
 * company and a real breach; a page of invented copy may not keep that.
 */
function CaseCard() {
  return (
    <div className="w-full px-10 pb-10 max-[1200px]:px-6">
      <div className="rounded-[18px] bg-white p-5 shadow-[0_4px_22px_rgba(116,130,151,0.18)]">
        <p className="font-archivo text-body text-[10px] uppercase tracking-[0.18em]">
          {caseStudy.masthead}
        </p>
        <span className="bg-ink/10 mt-2 block h-px w-full" />
        <p className="font-archivo text-ink mt-3 text-[13px] leading-[19px]">{caseStudy.body}</p>
      </div>
      <div className="mt-4 flex flex-col gap-2">
        {caseStudy.claims.map((c) => (
          <span
            key={c}
            className="font-archivo text-body w-fit rounded-[14px] bg-white px-4 py-2.5 text-[12px] leading-[16px] shadow-[0_4px_22px_rgba(116,130,151,0.18)]"
          >
            {c}
          </span>
        ))}
      </div>
      <p className="font-archivo text-body/70 mt-3 text-[10px]">{caseStudy.note}</p>
    </div>
  );
}

/* -------------------------------------------------------- made by humans */

export function Humans() {
  return (
    <Panel tone="bg-blush" className="flex h-[372px] items-center max-[1200px]:h-auto">
      <div className="relative z-[1] grid w-full items-center gap-8 px-12 py-10 max-lg:grid-cols-1 max-md:px-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div>
          <Words
            as="h2"
            text={humans.heading}
            className="font-archivo text-ink text-[40px] font-semibold leading-[48px] tracking-[-0.015em] max-lg:text-[32px] max-lg:leading-[40px]"
          />
          <Words
            as="p"
            text={humans.body}
            start={humans.heading.split(' ').length}
            className="font-archivo text-body mt-4 max-w-[760px] text-[20px] font-normal leading-[28px] tracking-[0.025em] max-[1200px]:text-[16px] max-[1200px]:leading-[24px]"
          />
        </div>
        <div className="flex justify-end max-lg:hidden">
          <VitruvianMark />
        </div>
      </div>
    </Panel>
  );
}

/**
 * The figure the reference puts in this panel is a pink Vitruvian man. It is a
 * five-hundred-year-old drawing and nobody's mark, but the reference's file is
 * its own treatment of it — so this is the idea, drawn: a figure in a circle
 * in a square.
 */
function VitruvianMark() {
  return (
    <svg viewBox="0 0 200 200" className="w-[240px]" aria-hidden="true">
      <g stroke="#E4A8A8" strokeWidth="3" fill="none">
        <circle cx="100" cy="104" r="78" />
        <rect x="28" y="36" width="144" height="144" />
        <circle cx="100" cy="56" r="14" />
        <path d="M100 70v62M100 90L40 70M100 90l60-20M100 90L34 104M100 90l66 14M100 132l-26 48M100 132l26 48M100 132l-40 36M100 132l40 36" />
      </g>
    </svg>
  );
}

/* --------------------------------------------------------- what is inside */

export function Inside() {
  const rows = [inside.lessons.slice(0, 7), inside.lessons.slice(7, 14), inside.lessons.slice(14)];

  return (
    <section className="bg-white px-4 pb-4 max-md:px-3 max-md:pb-3" id="lessons">
      <div
        className="bg-sand relative mx-auto max-w-[1440px] overflow-hidden rounded-[32px] py-12 max-[1200px]:py-8 max-lg:py-8 max-md:rounded-[28px] max-md:py-8"
        data-in
      >
        {/* the two fades that tell you the rows run past the edge */}
        <div className="from-sand pointer-events-none absolute -bottom-px -left-px -top-px z-10 w-[120px] bg-gradient-to-r to-transparent" />
        <div className="from-sand pointer-events-none absolute -bottom-px -right-px -top-px z-10 w-[120px] bg-gradient-to-l to-transparent" />

        <div className="relative z-20 mx-auto mb-[64px] max-w-[820px] px-4 text-center max-[1200px]:mb-10 max-md:mb-8">
          <Words
            as="p"
            text={inside.eyebrow}
            className="font-gabarito text-ink mb-6 text-[18px] font-semibold uppercase leading-[24px] tracking-[0.1em] max-[1200px]:mb-5 max-[1200px]:text-[16px] max-md:mb-4 max-md:text-[14px]"
          />
          <Words
            as="h2"
            text={inside.heading}
            start={2}
            className="font-archivo text-ink mb-6 text-balance text-[64px] font-semibold leading-[72px] tracking-[-0.015em] max-[1200px]:mb-5 max-[1200px]:text-[48px] max-[1200px]:leading-[56px] max-lg:text-[48px] max-lg:leading-[56px] max-md:mb-4 max-md:text-[36px] max-md:leading-[44px]"
          />
          <Words
            as="p"
            text={inside.body}
            start={8}
            className="font-archivo text-body text-balance text-[20px] font-normal leading-[28px] tracking-[0.025em] max-[1200px]:text-[16px] max-[1200px]:leading-[24px] max-md:text-[16px]"
          />
        </div>

        <div className="relative z-[1] mb-[24px] flex flex-col gap-4">
          {rows.map((row, r) => (
            <div className="overflow-hidden" key={r}>
              <div
                className="flex w-max gap-4 motion-reduce:animate-none"
                style={{
                  animation: `crux-marquee ${CHIP_ROWS.durationS[r]}s linear infinite`,
                  animationDirection: r === 1 ? 'reverse' : 'normal',
                }}
              >
                {[0, 1].map((copy) => (
                  <div className="flex flex-shrink-0 gap-4" key={copy} aria-hidden={copy > 0}>
                    {row.map((l) => (
                      <div
                        key={l.label}
                        className="flex flex-shrink-0 items-center gap-4 rounded-[24px] bg-white p-3 max-md:gap-3 max-md:rounded-[16px]"
                      >
                        <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-[12px] max-md:h-[60px] max-md:w-[60px] max-md:rounded-[8px]">
                          {'src' in l && l.src ? (
                            <img
                              src={l.src}
                              alt=""
                              className="size-full object-cover"
                              loading="lazy"
                            />
                          ) : (
                            <DunningKrugerMark />
                          )}
                        </div>
                        <span className="font-archivo text-body whitespace-nowrap pr-4 text-[20px] font-normal leading-[24px] max-[1200px]:text-[16px] max-[1200px]:leading-[20px] max-md:pr-3">
                          {l.label}
                        </span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * The one lesson thumbnail that is drawn rather than copied: the reference's
 * is a pixelated photograph of a named living person, which is not an asset an
 * invented product can carry. This is the curve the lesson is about.
 */
function DunningKrugerMark() {
  return (
    <svg viewBox="0 0 80 80" className="size-full" aria-hidden="true">
      <rect width="80" height="80" fill="#7ED0F5" />
      <path
        d="M6 62 C14 20 20 14 26 22 C32 30 34 58 44 56 C54 54 62 36 74 22"
        fill="none"
        stroke="#181D1F"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <circle cx="26" cy="20" r="5" fill="#FD956D" />
    </svg>
  );
}

/* ------------------------------------------------------------- the download */

export function Download() {
  return (
    <section className="bg-white px-4 pb-4 max-md:px-3 max-md:pb-3" id="download">
      <div
        className="relative mx-auto block h-[560px] max-w-[1440px] overflow-clip rounded-[32px] bg-white max-[1200px]:h-[480px] max-lg:h-[400px] max-md:h-auto max-md:min-h-[560px] max-md:rounded-[28px]"
        data-in
      >
        <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden">
          <div className="absolute inset-x-0 -bottom-[40px] -top-[40px] max-md:inset-0">
            <img
              src={phoneChair}
              alt="A phone resting on a chair"
              className="size-full object-cover object-[50%_38%] max-md:hidden"
            />
            <img
              src={phoneChairNarrow}
              alt="A phone resting on a chair"
              className="hidden size-full object-cover object-bottom max-md:block"
              loading="lazy"
            />
          </div>
        </div>
        <div className="absolute left-12 top-12 z-[5] flex flex-col gap-4 max-[1200px]:left-8 max-[1200px]:top-8 max-lg:left-8 max-lg:top-8 max-md:relative max-md:left-auto max-md:top-auto max-md:flex max-md:flex-col max-md:items-center max-md:p-8">
          <Words
            as="h2"
            text={download.heading}
            className="font-archivo text-ink max-w-[360px] text-[40px] font-semibold leading-[48px] tracking-[-0.5px] max-[1200px]:text-[32px] max-[1200px]:leading-[40px] max-lg:text-[32px] max-lg:leading-[40px] max-md:text-center max-md:text-[36px] max-md:leading-[44px]"
          />
          <StoreBadge />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------- the misinformation */

export function Misinformation() {
  return (
    <Panel
      tone="bg-butter"
      className="h-[560px] max-[1200px]:h-[480px] max-lg:h-[400px] max-md:h-[400px]"
    >
      <div className="pointer-events-none absolute inset-0 z-[2] flex flex-col items-center justify-center">
        <div className="pointer-events-auto flex flex-col items-center gap-6 px-6 max-[1200px]:gap-5 max-lg:gap-4 max-md:gap-3">
          <Words
            as="p"
            text={misinformation.eyebrow}
            className="font-gabarito text-ink text-[18px] font-semibold uppercase leading-[24px] tracking-[0.1em] max-[1200px]:text-[16px] max-md:text-[14px]"
          />
          <Words
            as="h2"
            text={misinformation.heading}
            start={2}
            className="font-archivo text-ink max-w-[820px] text-balance text-center text-[64px] font-semibold leading-[72px] tracking-[-0.5px] max-[1200px]:text-[48px] max-[1200px]:leading-[56px] max-lg:text-[48px] max-lg:leading-[56px] max-md:text-[36px] max-md:leading-[44px]"
          />
          <Words
            as="p"
            text={misinformation.body}
            start={6}
            className="font-archivo text-body max-w-[640px] text-center text-[20px] leading-[28px] max-[1200px]:text-[16px]"
          />
          <TryButton big className="mt-2" />
        </div>
      </div>

      {/* the little flag the reference pins to the panel's top-left corner */}
      <div className="font-gabarito absolute left-0 top-0 z-[3] flex items-center gap-2 rounded-br-[16px] bg-white px-5 py-3">
        <span className="border-ink block size-5 rounded-full border-2" aria-hidden="true" />
        <span className="text-ink text-[16px] font-semibold leading-[24px]">
          {misinformation.cta}
        </span>
      </div>
    </Panel>
  );
}

/* ------------------------------------------------------------ the community */

export function Community() {
  return (
    <Panel tone="bg-moss" className="p-12 max-lg:p-8 max-md:px-6 max-md:pb-6 max-md:pt-8">
      <div className="relative z-[1] mb-12 flex flex-col items-center gap-6 max-[1200px]:mb-10 max-[1200px]:gap-5 max-lg:mb-8 max-lg:gap-4">
        <Words
          as="p"
          text={community.eyebrow}
          className="font-gabarito text-ink text-[18px] font-semibold uppercase leading-[24px] tracking-[0.1em] max-[1200px]:text-[16px] max-md:text-[14px]"
        />
        <Words
          as="h2"
          text={community.heading}
          start={4}
          className="font-archivo text-ink max-w-[820px] text-center text-[64px] font-semibold leading-[72px] tracking-[-0.5px] max-[1200px]:text-[48px] max-[1200px]:leading-[56px] max-lg:text-[48px] max-lg:leading-[56px] max-md:text-[36px] max-md:leading-[44px]"
        />
      </div>

      <div className="relative z-[1] grid grid-cols-4 gap-4 max-lg:grid-cols-2 max-md:grid-cols-1">
        {community.quotes.map((q) => (
          <div
            key={q.who}
            className="border-body flex min-h-[160px] flex-col justify-between rounded-[24px] border-2 p-6 max-md:rounded-[16px] max-md:p-5"
          >
            <p className="font-archivo text-body text-[20px] font-normal leading-[28px] max-[1200px]:text-[16px] max-[1200px]:leading-[24px] max-md:text-[16px] max-md:leading-[24px]">
              {q.text}
            </p>
            <p className="font-gabarito text-body mt-6 text-[14px] font-normal uppercase leading-[18px] tracking-[0.1em]">
              {q.who}
            </p>
          </div>
        ))}
      </div>
    </Panel>
  );
}

/* ------------------------------------------------------------------ the faq */

export function Faq() {
  /*
   * The first row is open and the other seven are shut, which is the
   * reference's resting state — and establishing that cost a wrong build
   * first.
   *
   * The DOM dump says every row is open: its eight measure 168, 192, 168,
   * 144, 216, 144, 120 and 192, heights that only vary if the answers are
   * there. The dump is wrong about this. It is a Next.js page, the server
   * renders the accordion with every answer in the markup, and the client
   * collapses seven of them on hydration — so a dump taken early reads the
   * server's state. The band photographs, taken later, show one open row and
   * seven shut ones at a constant 96px pitch, which is what a visitor
   * actually gets; matching the dump made the section 616px too tall.
   *
   * A shut row is 80px: 16 of padding either side of a 24px question, or the
   * 48px control plus the same padding, which come to the same number.
   */
  const [closed, setClosed] = useState<ReadonlySet<number>>(
    () => new Set(faq.items.map((_, i) => i).filter((i) => i > 0)),
  );
  const toggle = (i: number) =>
    setClosed((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  return (
    <Panel tone="bg-pool" id="faq" className="p-12 max-lg:p-8 max-md:px-6 max-md:pb-6 max-md:pt-8">
      <div className="relative z-[1] mb-12 flex flex-col items-center gap-6 max-[1200px]:mb-10 max-[1200px]:gap-5 max-lg:mb-8 max-lg:gap-4">
        <Words
          as="p"
          text={faq.eyebrow}
          className="font-gabarito text-ink text-[18px] font-semibold uppercase leading-[24px] tracking-[0.1em] max-[1200px]:text-[16px] max-md:text-[14px]"
        />
        <Words
          as="h2"
          text={faq.heading}
          start={1}
          className="font-archivo text-ink max-w-[820px] text-center text-[64px] font-semibold leading-[72px] tracking-[-0.5px] max-[1200px]:text-[48px] max-[1200px]:leading-[56px] max-lg:text-[48px] max-lg:leading-[56px] max-md:text-[36px] max-md:leading-[44px]"
        />
      </div>

      <div className="relative z-[1] flex flex-col gap-4">
        {faq.items.map((item, i) => {
          const open = !closed.has(i);
          return (
            <div
              key={item.q}
              className="flex cursor-pointer items-start gap-[48px] overflow-clip rounded-[24px] bg-white py-4 pl-6 pr-4 max-[1200px]:gap-8 max-lg:gap-6 max-md:gap-4 max-md:rounded-[16px] max-md:py-3 max-md:pl-4 max-md:pr-3"
              onClick={() => toggle(i)}
            >
              <div className="flex flex-1 flex-col py-3 max-md:py-2">
                <p className="font-archivo text-ink text-[20px] font-semibold leading-[24px] max-[1200px]:text-[18px]">
                  {item.q}
                </p>
                <div
                  className={cx(
                    'grid transition-[grid-template-rows] duration-300',
                    open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="font-archivo text-body mt-4 text-[20px] font-normal leading-[24px] max-[1200px]:text-[16px] max-[1200px]:leading-[22px]">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>

              <button
                type="button"
                aria-expanded={open}
                aria-label={open ? 'Collapse this answer' : 'Show this answer'}
                onClick={(e) => {
                  e.stopPropagation();
                  toggle(i);
                }}
                className="relative flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-[24px] border-2 border-[#C8C8CE] bg-white max-md:h-10 max-md:w-10"
              >
                <span className="bg-ink absolute h-0.5 w-5 rounded-full" />
                <span
                  className={cx(
                    'bg-ink absolute h-0.5 w-5 rounded-full transition-transform duration-150',
                    open ? 'rotate-0' : 'rotate-90',
                  )}
                />
              </button>
            </div>
          );
        })}
      </div>
    </Panel>
  );
}

/* --------------------------------------------------------------- the footer */

export function Footer() {
  return (
    <footer className="bg-white px-4 pb-4 max-md:px-3 max-md:pb-3">
      <div className="bg-ink mx-auto flex max-w-[1440px] flex-col gap-12 rounded-[32px] p-12 max-[1200px]:gap-10 max-[1200px]:p-8 max-lg:gap-8 max-lg:p-8 max-md:gap-8 max-md:rounded-[28px] max-md:p-6">
        <div className="flex items-start justify-between max-md:flex-col max-md:gap-8">
          <div className="flex flex-col gap-6">
            <Wordmark className="h-10 w-[240px]" dark />
            <div className="flex gap-4">
              {['instagram', 'threads', 'linkedin'].map((s) => (
                <a
                  key={s}
                  href="#social"
                  aria-label={s}
                  className="flex size-10 items-center justify-center rounded-full text-white"
                >
                  <SocialGlyph kind={s} />
                </a>
              ))}
            </div>
          </div>

          <div className="flex gap-24 max-[1200px]:gap-16 max-lg:gap-12 max-md:gap-12">
            {footer.columns.map((col) => (
              <div className="flex flex-col gap-2 max-md:gap-4" key={col.title}>
                <h3 className="font-archivo text-[18px] font-medium leading-[24px] tracking-[0.02em] text-white/60 max-md:text-[16px]">
                  {col.title}
                </h3>
                {col.links.map((l) => (
                  <a
                    key={l}
                    href="#footer"
                    className="font-archivo text-[18px] font-normal leading-[24px] tracking-[0.02em] text-white no-underline transition-colors hover:text-white/80 max-md:text-[16px]"
                  >
                    {l}
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div>

        <p className="font-archivo text-[16px] font-normal leading-[24px] tracking-[0.02em] text-white/40 max-lg:text-[14px] max-lg:leading-[20px] max-md:text-[12px] max-md:leading-[18px]">
          {brand.legal}
        </p>
      </div>
    </footer>
  );
}

/**
 * The three social glyphs, drawn.
 *
 * The reference links to its own accounts with the platforms' own marks. An
 * invented brand has no accounts, so these are generic: a square with a dot, a
 * doubled loop, a square with a bar. They say "elsewhere", not "Instagram".
 */
function SocialGlyph({ kind }: { kind: string }) {
  if (kind === 'instagram') {
    return (
      <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="4" y="4" width="16" height="16" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17" cy="7" r="1" fill="currentColor" stroke="none" />
      </svg>
    );
  }
  if (kind === 'threads') {
    return (
      <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 4c4 0 7 3 7 8s-3 8-7 8-7-3-7-8" />
        <path d="M9 13c0-2 1.5-3 3-3s3 .8 3 2.5S13.5 16 12 15c-1-.7-.6-2.4 1-2.8" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="4" y="4" width="16" height="16" rx="3" />
      <path d="M8 11v6M8 8v.01M12 17v-4a2 2 0 014 0v4" />
    </svg>
  );
}
