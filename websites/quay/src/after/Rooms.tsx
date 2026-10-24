import { useState } from 'react';

import * as Icons from '@/after/Icons';
import { Button, Rail, SectionHeader } from '@/after/Parts';
import { brand, rooms } from '@/content/site';
import { cx } from '@/cx';

type Variant = (typeof rooms.types)[number]['variants'][number];

/** The feature icons, by the key the content deck names them with. */
const FEATURE_ICONS: Record<string, (props: { size?: string | number }) => React.ReactElement> = {
  window: Icons.IconWindow,
  size: Icons.IconSize,
  bathroom: Icons.IconBathroom,
  kitchenette: Icons.IconKitchenette,
  kitchen: Icons.IconKitchen,
  wifi: Icons.IconWifi,
  furnished: Icons.IconFurnished,
  towels: Icons.IconTowels,
  bed: Icons.IconBed,
  parking: Icons.IconParking,
};

/**
 * Rooms & Prices.
 *
 * Two tab levels: the room type down the left (a sticky sidebar on a desktop,
 * an accordion on a phone) and the floor across the top of the panel. Under
 * each is a gallery that opens to full screen, a description that is clipped
 * to 9.5rem with a "Read more" below 768, a features list that shows four and
 * hides the rest behind "Load more", and the two buttons.
 *
 * The sidebar buttons and the accordion headers are cut off at the right with
 * the same 60-point clip-path the whole page uses for a flag.
 */
export function Rooms({ onApply }: { onApply: () => void }) {
  const [type, setType] = useState(0);
  const [floor, setFloor] = useState<number[]>(() => rooms.types.map(() => 0));
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);

  const setFloorFor = (t: number, f: number) =>
    setFloor((cur) => cur.map((value, i) => (i === t ? f : value)));

  return (
    <section className="q-rooms" id="rooms">
      <div className="q-rooms__container q__container">
        <aside className="q-rooms__aside">
          <div className="q-rooms__aside-inner">
            <SectionHeader
              className="q-rooms__header q-section-header"
              label={rooms.label}
              heading={rooms.heading}
            />

            <nav className="q-rooms__nav" aria-label="Room types">
              <ul className="q-rooms__nav-list">
                {rooms.types.map((item, i) => (
                  <li key={item.key}>
                    <button
                      type="button"
                      className={cx('q-rooms__nav-button q-flag', i === type && '-active')}
                      aria-pressed={i === type}
                      onClick={() => setType(i)}
                    >
                      {item.title}
                      <span className="q-rooms__nav-price">{item.price}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </aside>

        <div className="q-rooms__main">
          {rooms.types.map((item, i) => (
            <div key={item.key} className={cx('q-rooms__item', i === type && '-active')}>
              <button
                type="button"
                className={cx('q-rooms__item-toggler q-flag', i === type && '-active')}
                aria-expanded={i === type}
                onClick={() => setType((cur) => (cur === i ? -1 : i))}
              >
                {item.title}
                <span className="q-rooms__item-toggler-price">{item.price}</span>
                <span className="q-rooms__item-toggler-icon">
                  <span className="q-plus" />
                  <span className="q-plus -v" />
                </span>
              </button>

              <div className={cx('q-rooms__item-main', i === type && '-active')}>
                {item.variants.map((variant, v) => (
                  <RoomPanel
                    key={variant.floor}
                    type={item.title}
                    variant={variant}
                    floors={item.variants.map((x) => x.floor)}
                    active={v === floor[i]}
                    onFloor={(f) => setFloorFor(i, f)}
                    current={floor[i]}
                    onApply={onApply}
                    onZoom={setLightbox}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        className={cx('q-lightbox', lightbox && '-active')}
        inert={!lightbox}
        onClick={() => setLightbox(null)}
      >
        {lightbox ? <img src={lightbox.src} alt={lightbox.alt} /> : null}
        <button
          type="button"
          className="q-lightbox__close"
          aria-label="Close"
          onClick={() => setLightbox(null)}
        >
          <svg width="1.5rem" height="1.5rem" viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M5 5 L19 19 M19 5 L5 19"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
    </section>
  );
}

function RoomPanel({
  type,
  variant,
  floors,
  active,
  current,
  onFloor,
  onApply,
  onZoom,
}: {
  type: string;
  variant: Variant;
  floors: readonly string[];
  active: boolean;
  current: number;
  onFloor: (index: number) => void;
  onApply: () => void;
  onZoom: (photo: { src: string; alt: string }) => void;
}) {
  const [readMore, setReadMore] = useState(false);
  const [allFeatures, setAllFeatures] = useState(false);

  return (
    <div className={cx('q-rooms__subtab', active && '-active')}>
      <div className="q-rooms__gallery">
        <Rail
          items={variant.photos}
          label={`${type} photograph`}
          itemsClass="q-rooms__gallery-track"
          navClass="q-rooms__gallery-nav"
          paginationClass="q-rooms__gallery-pagination"
          draggable
          render={(i, copy) => {
            const photo = variant.photos[i];
            return (
              <figure
                className="swiper-slide"
                key={`${photo.src}-${copy}`}
                onClick={() => onZoom({ src: photo.src, alt: photo.alt })}
              >
                <img src={photo.src} alt={copy === 0 ? photo.alt : ''} loading="lazy" />
              </figure>
            );
          }}
        />
      </div>

      <div className="q-rooms__subtab-main">
        <h3 className="q-rooms__title">{type}</h3>

        <nav className="q-rooms__floors" aria-label={`${type}, which floor`}>
          <ul className="q-rooms__floors-list">
            {floors.map((name, i) => (
              <li key={name}>
                <button
                  type="button"
                  className={cx('q-rooms__floor-button', i === current && '-active')}
                  aria-pressed={i === current}
                  onClick={() => onFloor(i)}
                >
                  {name}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className={cx('q-rooms__description', readMore && '-active')}>
          <p>{variant.lead}</p>
          {rooms.body.map((paragraph) => (
            <p key={paragraph.slice(0, 24)}>{paragraph}</p>
          ))}
          <p>{brand.promise}</p>
          <p>{variant.price}</p>
        </div>

        <button
          type="button"
          className="q-rooms__description-toggler"
          onClick={() => setReadMore((v) => !v)}
        >
          {readMore ? rooms.readLess : rooms.readMore}
        </button>

        <footer className="q-rooms__buttons">
          <Button className="-apply" onClick={onApply}>
            {rooms.apply}
          </Button>
          <Button
            variant="alt"
            onClick={() => onZoom({ src: variant.plan, alt: `${type} floor plan` })}
          >
            {rooms.plan}
          </Button>
        </footer>
      </div>

      <aside className="q-rooms__item-aside">
        <ul className={cx('q-rooms__features', allFeatures && '-active')}>
          {variant.features.map((feature) => {
            const Icon = FEATURE_ICONS[feature.icon] ?? Icons.IconShape;
            return (
              <li className="q-rooms__features-item" key={feature.text}>
                <span className="q-rooms__features-icon">
                  <Icon size="1.5rem" />
                </span>
                <span className="q-rooms__features-text">{feature.text}</span>
              </li>
            );
          })}
        </ul>

        <button
          type="button"
          className="q-rooms__features-toggler"
          onClick={() => setAllFeatures((v) => !v)}
        >
          {allFeatures ? rooms.loadLess : rooms.loadMore}
        </button>
      </aside>
    </div>
  );
}
