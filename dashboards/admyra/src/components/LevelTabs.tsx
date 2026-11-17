/**
 * The three levels, and the date range.
 *
 * The tabs sit on the page ground and the active one joins the card below it,
 * which is why the active tab's bottom edge is square and carries no border --
 * it is the same surface as the toolbar under it.
 */
import { Calendar, Caret, Close, LevelTile, AdSetsIcon, AdsIcon } from '@/icons';
import { cx } from '@/lib/cx';

export type Level = 'campaigns' | 'adsets' | 'ads';

const LEVELS: { id: Level; label: string }[] = [
  { id: 'campaigns', label: 'Campaigns' },
  { id: 'adsets', label: 'Ad sets' },
  { id: 'ads', label: 'Ads' },
];

interface Props {
  level: Level;
  selected: number;
  onClearSelection: () => void;
}

export function LevelTabs({ level, selected, onClearSelection }: Props) {
  return (
    <div className="flex shrink-0 items-end gap-1 px-3 pt-2.5">
      {LEVELS.map((l) => {
        const on = l.id === level;
        return (
          <div
            key={l.id}
            data-level={l.id}
            aria-current={on ? 'page' : undefined}
            className={cx(
              'flex h-11 items-center gap-2 rounded-t-lg border border-b-0 px-4 text-[13px] font-semibold whitespace-nowrap',
              on
                ? 'border-line bg-surface text-accent'
                : 'text-ink/85 border-transparent bg-black/5',
            )}
          >
            <span className={on ? 'text-accent' : 'text-muted'}>
              {l.id === 'campaigns' ? (
                <LevelTile size={17} />
              ) : l.id === 'adsets' ? (
                <AdSetsIcon size={17} />
              ) : (
                <AdsIcon size={17} />
              )}
            </span>
            {l.label}
            {selected > 0 && (
              <span className="bg-accent-soft text-accent inline-flex items-center gap-1.5 rounded py-0.5 pr-1 pl-2 text-[12px] font-semibold">
                {selected} selected
                <button
                  type="button"
                  onClick={onClearSelection}
                  aria-label={`Clear ${l.label.toLowerCase()} selection`}
                  className="hover:bg-accent/15 rounded p-0.5 transition-colors"
                >
                  <Close size={11} />
                </button>
              </span>
            )}
          </div>
        );
      })}

      <button
        type="button"
        className="border-line-strong bg-surface hover:bg-hover mb-0.5 ml-auto inline-flex h-9 items-center gap-2 rounded-md border px-3 text-[13px] font-semibold whitespace-nowrap transition-colors"
      >
        <Calendar size={16} />
        Last 30 days: Sep 22, 2026 – Oct 21, 2026
        <Caret className="text-muted" />
      </button>
    </div>
  );
}
