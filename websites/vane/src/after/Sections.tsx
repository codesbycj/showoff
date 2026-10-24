import { useState } from 'react';

import { CompanyMark, Icon, StandardBadge, Stars, Wordmark } from '@/after/Marks';
import { Button, Chip, RuleLabel, TextLink } from '@/after/Ui';
import {
  AgentsVisual,
  CardStrip,
  HeroPanel,
  IndustriesVisual,
  RankCover,
  RankList,
  ResourceArt,
  ReviewBadges,
  SuiteVisual,
} from '@/after/Visuals';
import expertPhoto from '@/assets/img/people/expert.webp';
import featuredPhoto from '@/assets/img/people/featured.webp';
import mediaPhoto from '@/assets/img/people/media.webp';
import partnerPhoto from '@/assets/img/people/partner.webp';
import t1 from '@/assets/img/people/t-1.webp';
import t2 from '@/assets/img/people/t-2.webp';
import t3 from '@/assets/img/people/t-3.webp';
import t4 from '@/assets/img/people/t-4.webp';
import {
  agents,
  clients,
  hero,
  partnerMerger,
  partners,
  platform,
  reasons,
  recognition,
  resources,
  standards,
  stats,
  testimonials,
} from '@/content/site';
import { cx } from '@/cx';
import { MARQUEE } from '@/motion/motion';

const PEOPLE = [t1, t2, t3, t4];

/* ------------------------------------------------------------------ 1. hero */

export function Hero() {
  return (
    <section className="bg-primary-3 overflow-hidden" id="top">
      <div className="lg:container-x">
        <div className="lg:border-greyscale-9 grid lg:grid-cols-[minmax(0,552px)_1fr] lg:gap-14 lg:border-x">
          <div className="max-lg:border-greyscale-9 max-lg:mx-4 max-lg:border-x max-lg:px-4">
            <div className="lg:py-18.5 flex w-full flex-col py-10 lg:pl-8">
              <p className="font-inter text-greyscale-8 flex gap-x-1 text-[12px]/[136%] max-lg:flex-col lg:items-center">
                {hero.counterLabel}
                <span className="text-primary-10 inline-flex items-center gap-x-1">
                  {hero.counterValue} {hero.counterUnit}
                </span>
              </p>

              <div className="mb-5 mt-4 flex flex-col gap-5">
                <h1 className="h1 max-md:text-[36px]">{hero.heading}</h1>
                <p className="p-medium">{hero.body}</p>
              </div>

              <div className="flex flex-col space-y-10">
                <div className="flex items-center gap-5 max-lg:flex-col lg:gap-4">
                  <Button href={hero.primary.href} variant="primary" className="max-lg:w-full">
                    {hero.primary.label}
                  </Button>
                  <Button href={hero.secondary.href} variant="ghost" className="max-lg:w-full">
                    {hero.secondary.label}
                  </Button>
                </div>
                <div className="flex max-lg:justify-center">
                  <Stars score={hero.rating.score} note={hero.rating.note} />
                </div>
              </div>
            </div>
          </div>

          <div className="max-lg:min-h-69.25 lg:h-114.5 relative overflow-hidden lg:mt-auto lg:rounded-tl">
            <HeroPanel />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------- 2. the client wall */

export function Clients() {
  return (
    <section>
      <div className="container-x">
        <RuleLabel>{clients.label}</RuleLabel>

        <div className="border-greyscale-9 relative border-x">
          <div className="grid grid-cols-3 gap-px lg:grid-cols-7">
            {clients.logos.map((logo, i) => (
              <div
                key={logo.name}
                className={cx(
                  'h-22 relative flex items-center justify-center bg-white px-6',
                  'hover:bg-greyscale-4 shadow-[0_0_0_1px_#e8edeb] transition-colors',
                  i >= 12 && 'max-lg:hidden',
                  'caseStudy' in logo && logo.caseStudy && 'lg:pb-5',
                )}
              >
                <CompanyMark name={logo.name} style={logo.style} className="h-22 w-full" />
                {'caseStudy' in logo && logo.caseStudy ? (
                  <div className="border-greyscale-9 px-1.25 absolute bottom-1.5 left-1/2 mt-1 flex w-fit -translate-x-1/2 items-center rounded-full border bg-white max-lg:hidden">
                    <p className="font-inter-medium p-compact px-1.25 text-greyscale-8 whitespace-nowrap uppercase">
                      {clients.caseStudyLabel}
                    </p>
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </div>

        {/* the awards strip, which runs */}
        <section className="border-greyscale-9 mt-px overflow-hidden border-x border-b">
          <div
            className="flex w-max animate-[vane-marquee_var(--d)_linear_infinite] motion-reduce:animate-none"
            style={{ ['--d' as string]: `${MARQUEE.durationS}s` }}
          >
            {[0, 1].map((copy) => (
              <div className="flex" key={copy} aria-hidden={copy > 0}>
                {clients.marquee.map((item) => (
                  <div
                    key={item.text}
                    className="h-22 flex flex-shrink-0 items-center justify-center gap-2 px-10"
                  >
                    <Icon name={item.icon} size={16} className="text-primary-10" />
                    <p className="p-small text-greyscale-8 whitespace-nowrap">{item.text}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}

/* ------------------------------------------------ 3. the platform, in dark */

const TONES = {
  mint: 'bg-greentint-2',
  sky: 'bg-[#EFF8FF]',
  lilac: 'bg-heliotrope-4',
  cream: 'bg-greyscale-4',
} as const;

export function Platform() {
  return (
    <section className="bg-primary-2" id="platform">
      <div className="container-x">
        <div className="lg:py-22 py-14 shadow-[inset_1px_0_0_var(--color-greyscale-2),inset_-1px_0_0_var(--color-greyscale-2)]">
          <h2 className="h2 remove-br lg:max-w-145 mb-12 text-center text-white max-lg:px-4 lg:mx-auto">
            {platform.heading} <br />
            {platform.headingTwo}
          </h2>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {platform.cards.map((card) => (
              <article
                key={card.key}
                className={cx(
                  'border-greyscale-2 flex flex-col overflow-hidden rounded border lg:min-h-[484px]',
                  TONES[card.tone],
                )}
              >
                <div className="flex flex-col items-start px-8 pb-6 pt-8">
                  <div className="flex gap-1">
                    <Icon
                      name={card.icon}
                      size={20}
                      stroke
                      className="text-primary-2 mt-[3.5px] shrink-0"
                    />
                    <h3 className="font-inter-semibold p-big text-primary-2">{card.title}</h3>
                  </div>
                  <p className="p-small mt-4">{card.body}</p>
                  <ul className="mt-4 flex list-none flex-wrap gap-2">
                    {card.chips.map((chip) => (
                      <Chip key={chip} hover={card.chipHover}>
                        {chip}
                      </Chip>
                    ))}
                  </ul>
                </div>
                <div className="h-39.25 relative ml-8 mt-auto overflow-hidden">
                  <CardStrip kind={card.key} />
                </div>
              </article>
            ))}
          </div>

          {/* the reference's 48px ruler: twenty-one hairlines, decorative */}
          <div
            className="border-greyscale-2 flex h-12 w-full items-stretch justify-between border-b"
            aria-hidden="true"
          >
            {Array.from({ length: 21 }).map((_, i) => (
              <span key={i} className="bg-greyscale-2 hidden h-full w-px shrink-0 lg:block" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------- 4. the stats */

export function Stats() {
  return (
    <section>
      <div className="container-x">
        <div className="border-greyscale-9 flex flex-col gap-10 border-l border-r py-[88px] max-lg:gap-6 max-lg:py-8">
          <div className="flex items-center justify-between gap-4 px-8 max-lg:px-4">
            <div>
              <div className="font-pangea-medium remove-br text-primary-2 text-[34px]/[1.18] max-lg:text-[26px]">
                {stats.heading} <br />
                <em>{stats.headingEm}</em>
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="border-greyscale-9 flex w-full border-y max-lg:flex-col">
              {stats.items.map((item) => (
                <div
                  key={item.figure}
                  className="border-greyscale-9 flex flex-1 flex-col gap-2 border-r p-8 last:border-r-0 max-lg:border-b max-lg:border-r-0 max-lg:last:border-b-0"
                >
                  <div className="font-pangea text-primary-10 whitespace-nowrap text-[64px]/[1.2]">
                    {item.figure}
                  </div>
                  <p className="p-medium text-greyscale-2">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------- 5. why vane, in a grid */

export function Reasons() {
  return (
    <div id="solutions">
      <div className="container-x">
        <div className="border-greyscale-9 lg:py-22 border-x px-4 py-14 lg:px-8">
          <h2 className="h2 mb-10">{reasons.heading}</h2>

          <div className="grid gap-4 lg:grid-cols-2">
            {reasons.cards.map((card) => (
              <article
                key={card.key}
                className={cx(
                  'flex min-h-[340px] flex-col overflow-hidden rounded border',
                  card.tone === 'dark'
                    ? 'border-primary-7 bg-primary-2'
                    : card.tone === 'mint'
                      ? 'border-greyscale-9 bg-greentint-2'
                      : 'border-greyscale-9 bg-white',
                )}
              >
                <div className="p-8">
                  <h3 className={cx('h4', card.tone === 'dark' ? 'text-white' : 'text-primary-2')}>
                    {card.title}
                  </h3>
                  <p
                    className={cx(
                      'p-small mt-3',
                      card.tone === 'dark' ? 'text-primary-9' : 'text-greyscale-2',
                    )}
                  >
                    {card.body}
                  </p>
                </div>
                <div className="mt-auto h-[188px] px-8 pb-8">
                  {card.visual === 'agents' ? <AgentsVisual /> : null}
                  {card.visual === 'suite' ? <SuiteVisual /> : null}
                  {card.visual === 'industries' ? <IndustriesVisual /> : null}
                  {card.visual === 'expert' ? (
                    <img
                      src={expertPhoto}
                      alt="A vane analyst working through a client's figures"
                      className="size-full rounded object-cover"
                      loading="lazy"
                    />
                  ) : null}
                </div>
              </article>
            ))}
          </div>

          <div className="border-greyscale-9 bg-greyscale-9 mt-4 grid gap-px border md:grid-cols-3">
            {reasons.columns.map((col) => (
              <div key={col.label} className="bg-white p-6">
                <p className="font-inter-semibold text-primary-2 text-[14px]">{col.label}</p>
                <p className="p-small mt-2">{col.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------- 6. the merger bar */

export function Merger() {
  return (
    <section className="bg-white">
      <div className="container-x">
        <div className="border-greyscale-9 lg:py-22 border-x py-12">
          <div className="border-greyscale-9 border">
            <div className="flex flex-col lg:flex-row">
              <div className="flex min-w-0 items-end p-8 lg:min-h-[290px] lg:w-1/2">
                <h2 className="h2">
                  {partnerMerger.headingTop}{' '}
                  <span className="text-greyscale-8">{partnerMerger.headingBottom}</span>
                </h2>
              </div>
              <div className="border-greyscale-9 bg-greyscale-4 flex min-w-0 flex-col justify-end gap-8 border-t p-8 lg:min-h-[290px] lg:w-1/2 lg:border-l lg:border-t-0">
                <Wordmark className="h-auto w-[155px]" />
                <ul className="flex list-none flex-col gap-2">
                  {partnerMerger.points.map((p) => (
                    <li key={p.title} className="flex items-start gap-2">
                      <Icon name="star" size={20} className="text-primary-2 shrink-0" />
                      <span className="font-inter text-greyscale-8 text-base leading-normal">
                        {p.title}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="border-greyscale-9 flex flex-col border-t lg:flex-row">
              <div className="bg-primary-2 relative min-w-0 max-lg:aspect-[608/290] lg:min-h-[290px] lg:w-1/2">
                <div className="absolute inset-0 flex items-center justify-center gap-8">
                  <Wordmark className="w-32" dark />
                  <span className="text-primary-7 text-[26px]" aria-hidden="true">
                    &times;
                  </span>
                  <span className="font-pangea-semibold text-[26px] tracking-[-0.02em] text-white">
                    {partnerMerger.partnerName}
                  </span>
                </div>
              </div>
              <div className="border-greyscale-9 flex min-w-0 flex-col justify-end gap-8 border-t p-8 lg:min-h-[290px] lg:w-1/2 lg:border-l lg:border-t-0">
                <span className="font-pangea-semibold text-primary-2 self-start text-[30px] tracking-[-0.02em]">
                  {partnerMerger.partnerName}
                </span>
                <ul className="flex list-none flex-col gap-2">
                  {[
                    'Method work that stands up to an auditor',
                    'Enterprise onboarding, run by people',
                    'Recognised climate expertise',
                  ].map((t) => (
                    <li key={t} className="flex items-start gap-2">
                      <Icon name="star" size={20} className="text-primary-2 shrink-0" />
                      <span className="font-inter text-greyscale-8 text-base leading-normal">
                        {t}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="divide-greyscale-9 border-greyscale-9 flex flex-col divide-y border-t lg:flex-row lg:divide-x lg:divide-y-0">
              {[
                ['4,000', 'customers in more than 30 countries'],
                ['418M', 'tonnes of CO₂ under management'],
                ['2030', 'Target: a billion tonnes under management'],
              ].map(([figure, note]) => (
                <div key={figure} className="flex min-w-0 flex-col gap-2 p-8 lg:w-1/3">
                  <p className="font-pangea text-primary-10 text-[48px] leading-[1.2] lg:text-[64px]">
                    {figure}
                  </p>
                  <p className="font-inter text-greyscale-2 text-base leading-normal">{note}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------- 7. the badge wall */

export function Standards() {
  return (
    <section>
      <div className="container-x">
        <div className="border-greyscale-9 lg:h-22 h-8 w-full border-x" />
        <RuleLabel>{standards.label}</RuleLabel>
        <div className="border-greyscale-9 grid grid-cols-2 border-x md:grid-cols-4">
          {standards.badges.map((badge) => (
            <div
              key={badge.mark}
              className="h-22 hover:bg-greyscale-4 flex items-center justify-center bg-white shadow-[0_0_0_1px_#e8edeb] transition-colors"
            >
              <StandardBadge mark={badge.mark} note={badge.note} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ 8. the agents */

export function Agents() {
  const [tab, setTab] = useState(0);
  const current = agents.list[tab];

  return (
    <section className="bg-primary-2" id="copilot">
      <div className="container-x">
        <div className="lg:py-22 px-4 py-14 shadow-[inset_1px_0_0_var(--color-greyscale-2),inset_-1px_0_0_var(--color-greyscale-2)] lg:px-8">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-32">
            <h2 className="h2 text-greyscale-5">
              {agents.headingTop} <br />
              <em className="text-greyscale-7 not-italic">{agents.headingBottom}</em>
            </h2>
            <p className="p-medium text-primary-9">{agents.body}</p>
          </div>

          <div>
            {/* four tabs, each a label over a rule that fills while it is open */}
            <div className="mt-10 grid grid-cols-4 gap-4 lg:gap-10">
              {agents.list.map((a, i) => (
                <button
                  key={a.name}
                  type="button"
                  onClick={() => setTab(i)}
                  aria-pressed={i === tab}
                  className="group flex cursor-pointer flex-col gap-2.5 py-2 text-start lg:py-0"
                >
                  <span className="p-small font-inter-semibold text-greyscale-5 max-lg:sr-only">
                    {a.name}
                  </span>
                  <span className="bg-primary-3/20 group-hover:bg-primary-3/30 relative h-1 w-full overflow-hidden rounded-full transition-colors">
                    <span
                      className="bg-primary-3 absolute inset-0 origin-left rounded-full transition-transform duration-500"
                      style={{ transform: 'scaleX(' + (i === tab ? 1 : 0) + ')' }}
                    />
                  </span>
                </button>
              ))}
            </div>

            <div className="mt-6 lg:mt-10">
              <div className="lg:h-104 flex h-full flex-col lg:flex-row lg:gap-4">
                <div className="border-primary-7 bg-primary-11 lg:w-92 flex flex-col rounded border px-4 pb-8 pt-6 max-lg:flex-1 max-lg:rounded-b-none lg:shrink-0 lg:p-8">
                  <p className="font-pangea-medium text-[26px] text-white">{current.name}</p>
                  <p className="p-small text-primary-9 mt-4">{current.body}</p>
                  <div className="mt-auto pt-8">
                    <TextLink href="#copilot" dark>
                      What it does, step by step
                    </TextLink>
                  </div>
                </div>
                <div className="h-40.75 border-primary-7 relative shrink-0 overflow-hidden rounded border max-lg:rounded-t-none max-lg:border-t-0 lg:h-auto lg:flex-1 lg:shrink">
                  <AgentsVisual />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between lg:gap-6">
            <p className="p-medium font-inter-semibold text-primary-3">
              See more of it live &mdash; book a demo (free, 30 minutes)
            </p>
            <div className="flex flex-wrap gap-3">
              <Button href="#demo" variant="primary" roll className="max-lg:w-full">
                Book a demo
              </Button>
              <Button href={agents.cta.href} variant="ghost-dark" roll className="max-lg:w-full">
                {agents.cta.label}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------- 9. the recognition */

export function Recognition() {
  return (
    <section className="bg-white" id="customers">
      <div className="container-x">
        <div className="lg:py-22 border-x border-[#E8EDEB] px-4 py-11 lg:px-8">
          <h2 className="h2 mb-6 lg:mb-12">{recognition.heading}</h2>
          <div className="flex flex-wrap justify-center gap-6">
            {recognition.cards.map((card) => (
              <article
                key={card.key}
                className={cx(
                  'border-greyscale-9 relative flex min-h-[416px] w-full flex-col overflow-hidden rounded border',
                  'lg:min-h-[464px] lg:w-[calc((100%-3rem)/3)]',
                  card.tone === 'dark'
                    ? 'bg-primary-2'
                    : card.tone === 'grey'
                      ? 'bg-greyscale-4'
                      : 'bg-primary-3',
                )}
              >
                <div className="relative z-10 p-8">
                  <p
                    className={cx(
                      'font-pangea-semibold text-[15px] tracking-[-0.01em]',
                      card.tone === 'dark' ? 'text-white' : 'text-primary-2',
                    )}
                  >
                    {card.mark}
                  </p>
                  <h3 className={cx('h4 mt-4', card.tone === 'dark' && 'text-greyscale-5')}>
                    {card.title}
                  </h3>
                  <p className={cx('p-medium mt-4', card.tone === 'dark' && 'text-primary-9')}>
                    {card.body}
                  </p>
                </div>
                <div
                  className={cx(
                    'relative z-10 mt-auto',
                    card.visual === 'badges' ? 'px-6 pb-8 lg:px-8 lg:pb-12' : 'h-53.75 w-full',
                  )}
                >
                  {card.visual === 'badges' ? <ReviewBadges /> : null}
                  {card.visual === 'cover' ? <RankCover /> : null}
                  {card.visual === 'list' ? <RankList /> : null}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------- 10. the resources */

export function Resources() {
  return (
    <div id="resources">
      <section className="bg-greyscale-4">
        <div className="container-x">
          <div className="lg:py-22 py-8 shadow-[inset_1px_0_0_var(--color-primary-9),inset_-1px_0_0_var(--color-primary-9)]">
            <h2 className="h2 mb-6 pl-6 lg:mb-12 lg:pl-8">{resources.heading}</h2>

            <a
              href="#fathom"
              className="border-primary-9 lg:min-h-68 group mb-4 overflow-hidden rounded border bg-white lg:flex lg:justify-between"
            >
              <div className="h-55 order-first w-full overflow-hidden lg:order-last lg:h-auto lg:w-[38%]">
                <img
                  src={mediaPhoto}
                  alt="Two people recording an episode of the vane podcast"
                  className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="lg:max-w-178.5 flex flex-col justify-center p-8">
                <div className="mb-10 flex items-center gap-3">
                  <span className="font-pangea-semibold text-primary-2 text-[18px] tracking-[-0.02em]">
                    {resources.mediaName}
                  </span>
                  <span className="border-primary-7 h-4 border" aria-hidden="true" />
                  <p className="font-inter text-greyscale-6 text-xs/[136%] uppercase">
                    {resources.mediaLabel}
                  </p>
                </div>
                <h3 className="font-pangea-medium text-primary-2 mb-8 text-[22px] leading-[122%] lg:text-[26px]">
                  {resources.mediaBody}
                </h3>
                <div className="mt-auto">
                  <TextLink href="#fathom">{resources.mediaCta}</TextLink>
                </div>
              </div>
            </a>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
              {resources.cards.map((card) => (
                <a
                  key={card.title}
                  href="#resources"
                  className="group/card border-primary-9 flex flex-col overflow-hidden rounded border bg-white"
                >
                  <div className="lg:h-34 h-40 w-full overflow-hidden">
                    {/* the reference scales its card photograph 1.05 over
                        300ms; these panels are drawn, so the panel takes it */}
                    <div className="size-full transition-transform duration-300 group-hover/card:scale-105 motion-reduce:transition-none">
                      <ResourceArt kind={card.kind} />
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-8">
                    <p className="font-inter text-primary-10 mb-4 text-sm/[140%] uppercase">
                      {card.kind}
                    </p>
                    <h3 className="font-inter-semibold text-primary-2 mb-4 text-lg/[150%]">
                      {card.title}
                    </h3>
                    <div className="mt-auto">
                      <TextLink href="#resources">{card.cta}</TextLink>
                    </div>
                  </div>
                </a>
              ))}

              <div className="border-primary-9 bg-primary-2 py-12.5 grid gap-10 rounded border px-8">
                <p className="font-inter-semibold text-lg/[150%] text-white">
                  Regulation, podcast episodes, sector briefings &mdash; miss none of it.
                </p>
                <div>
                  <label className="sr-only" htmlFor="vane-resources-email">
                    Your work email
                  </label>
                  <input
                    id="vane-resources-email"
                    type="email"
                    placeholder="name@company.com"
                    className="bg-primary-7 placeholder-primary-9 mb-1.5 w-full truncate rounded-xs border border-transparent px-4 py-3 text-sm/[140%] text-white outline-none"
                  />
                  <a
                    href="#privacy"
                    className="text-greyscale-7 mb-4 flex text-xs/[136%] underline transition-colors hover:text-white hover:no-underline"
                  >
                    privacy policy
                  </a>
                  <Button href="#subscribe" variant="primary" className="w-full" arrow={false}>
                    Subscribe
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ---------------------------------------------------- 11. the partner programme */

export function Partners() {
  return (
    <section className="border-greyscale-9 border-y" id="company">
      <div className="container-x">
        <div className="border-greyscale-9 lg:py-22 grid gap-10 border-x px-4 py-14 lg:grid-cols-2 lg:items-center lg:px-8">
          <div>
            <h2 className="h2">{partners.heading}</h2>
            <p className="p-medium mt-4">{partners.body}</p>
            <div className="mt-8">
              <Button href="#partners" variant="primary" roll>
                {partners.cta}
              </Button>
            </div>
            <div className="bg-greyscale-9 mt-10 grid grid-cols-3 gap-px">
              {partners.logos.map((name) => (
                <div
                  key={name}
                  className="hover:bg-greyscale-4 flex h-16 items-center justify-center bg-white transition-colors"
                >
                  <CompanyMark name={name} style="grotesk" tone="muted" className="h-10 w-full" />
                </div>
              ))}
            </div>
          </div>

          <figure className="border-greyscale-9 bg-greyscale-5 m-0 flex flex-col gap-6 rounded border p-8">
            <blockquote className="font-pangea-medium text-primary-2 m-0 text-[22px]/[1.3]">
              {partners.quote}
            </blockquote>
            <figcaption className="flex items-center gap-4">
              <img
                src={partnerPhoto}
                alt=""
                className="size-12 rounded-full object-cover"
                loading="lazy"
              />
              <span>
                <span className="font-inter-semibold text-primary-2 block text-[14px]">
                  {partners.person.name}
                </span>
                <span className="font-inter text-greyscale-8 block text-[13px]">
                  {partners.person.role}
                </span>
              </span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------- 12. testimonials */

export function Testimonials() {
  const [slide, setSlide] = useState(0);
  const cards = [testimonials.featured, ...testimonials.cards];
  const step = (d: number) => setSlide((i) => Math.min(cards.length - 1, Math.max(0, i + d)));

  return (
    <div id="pricing">
      <section className="bg-greyscale-4">
        <div className="container-x">
          <div className="py-14 shadow-[inset_1px_0_0_var(--color-primary-9),inset_-1px_0_0_var(--color-primary-9)] lg:py-24">
            <div className="mb-6 flex items-center justify-between gap-4 px-4 lg:mb-12 lg:px-8">
              <h2 className="h2">{testimonials.heading}</h2>
              <div className="hidden shrink-0 items-center gap-4 lg:flex">
                <button
                  type="button"
                  aria-label="Previous"
                  onClick={() => step(-1)}
                  className={cx(
                    'flex size-10 items-center justify-center rounded transition-all',
                    slide === 0
                      ? 'text-greyscale-7 pointer-events-none cursor-default bg-transparent'
                      : 'text-primary-7 cursor-pointer bg-white',
                  )}
                >
                  <Icon name="arrow" size={22} stroke className="rotate-180" />
                </button>
                <button
                  type="button"
                  aria-label="Next"
                  onClick={() => step(1)}
                  className={cx(
                    'flex size-10 items-center justify-center rounded transition-all',
                    slide === cards.length - 1
                      ? 'text-greyscale-7 pointer-events-none cursor-default bg-transparent'
                      : 'text-primary-7 cursor-pointer bg-white',
                  )}
                >
                  <Icon name="arrow" size={22} stroke />
                </button>
              </div>
            </div>

            <section className="overflow-hidden">
              <div
                className="flex gap-x-4 transition-transform duration-500 lg:gap-x-8"
                style={{ transform: 'translateX(calc(' + -slide + ' * (75% + 2rem)))' }}
              >
                {cards.map((card, i) => (
                  <article
                    key={card.company}
                    className="border-primary-9 relative flex w-[85%] shrink-0 flex-col overflow-hidden border bg-white lg:w-[75%] lg:flex-row"
                  >
                    <div className="relative shrink-0 overflow-hidden lg:w-[37.23%]">
                      <div className="lg:min-h-106 relative aspect-[4/2] w-full lg:aspect-auto lg:h-full">
                        <img
                          src={i === 0 ? featuredPhoto : PEOPLE[i - 1]}
                          alt=""
                          className="absolute inset-0 size-full object-cover object-top"
                          loading="lazy"
                        />
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col gap-6 p-6 lg:justify-between lg:p-10">
                      <div className="flex flex-col gap-6 lg:gap-8">
                        <h3 className="h3">
                          {'headline' in card
                            ? card.headline
                            : card.company + ' cut ' + card.stat + ' ' + card.statNote}
                        </h3>
                        <hr className="border-primary-9" />
                        <p className="p-medium">{card.quote}</p>
                      </div>
                      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                        <CompanyMark
                          name={card.company}
                          style="grotesk"
                          className="h-10 w-36 self-start"
                        />
                        <p className="font-inter text-greyscale-8 text-[13px]">
                          {'person' in card && typeof card.person === 'string'
                            ? card.person
                            : card.person.name + ' \u00b7 ' + card.person.role}
                        </p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </div>
        </div>
      </section>
    </div>
  );
}
