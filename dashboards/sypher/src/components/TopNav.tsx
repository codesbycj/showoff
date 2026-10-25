import { Icon, Logo } from '@/components/Icon';
import { SelectPill } from '@/components/Controls';
import { company, RANGES, type RangeId } from '@/data/deck';
import { cx } from '@/lib/cx';
import { TABS, type TabId } from '@/nav';

/**
 * The two bars across the top: the nav, and the range strip under it.
 *
 * Rule 1 lives in the nav list. An inactive entry is *visibly* inactive and
 * genuinely inert: dimmed, `aria-disabled`, skipped by the keyboard,
 * not-allowed under the pointer, and a click does nothing at all.
 */
export function TopNav({
  tab,
  onTab,
  range,
  onRange,
  onReport,
  reporting,
}: {
  tab: TabId;
  onTab: (id: TabId) => void;
  range: RangeId;
  onRange: (id: RangeId) => void;
  onReport: () => void;
  reporting: boolean;
}) {
  return (
    <>
      <header className="border-line bg-surface flex h-[52px] shrink-0 items-center gap-6 border-b px-5">
        <div className="flex shrink-0 items-center gap-2">
          <Logo size={24} />
          <span className="text-ink text-[14.5px] font-semibold">{company.name}</span>
          <Icon name="dots-v" size={14} className="text-muted" />
        </div>

        <nav aria-label="Sections" className="min-w-0 flex-1">
          <ul className="m-0 flex list-none items-center justify-center gap-6 p-0">
            {TABS.map((t) => {
              const current = tab === t.id;
              return (
                <li key={t.id}>
                  <button
                    type="button"
                    data-tab={t.id}
                    data-live={t.live}
                    aria-current={current ? 'page' : undefined}
                    aria-disabled={t.live ? undefined : true}
                    tabIndex={t.live ? undefined : -1}
                    onClick={t.live ? () => onTab(t.id) : undefined}
                    className={cx(
                      'relative block py-4 text-[13px] transition-colors',
                      current && 'text-ink font-semibold',
                      !current && t.live && 'text-body hover:text-ink font-medium',
                      !t.live && 'text-muted cursor-not-allowed font-medium opacity-50',
                    )}
                  >
                    {t.label}
                    <span
                      aria-hidden="true"
                      className={cx(
                        'bg-ink absolute inset-x-0 bottom-0 h-[2px] transition-opacity',
                        current ? 'opacity-100' : 'opacity-0',
                      )}
                    />
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex shrink-0 items-center gap-3">
          <button
            type="button"
            data-report
            onClick={onReport}
            aria-pressed={reporting}
            className={cx(
              'border-line flex h-8 items-center gap-1.5 rounded-md border px-3 text-[12.5px] font-medium transition-colors',
              reporting ? 'bg-accent-soft text-accent-deep border-accent-soft' : 'hover:bg-sunken',
            )}
          >
            <Icon name={reporting ? 'check' : 'report'} size={14} />
            {reporting ? 'Report queued' : 'Generate Report'}
          </button>
          <span
            aria-label={company.user.name}
            title={company.user.name}
            className="bg-ink grid h-7 w-7 shrink-0 place-items-center rounded-full text-[11px] font-semibold text-white"
          >
            DW
          </span>
        </div>
      </header>

      <div className="border-line bg-surface text-muted flex h-[38px] shrink-0 items-center gap-3 border-b px-5 text-[11.5px]">
        <Icon name="calendar" size={13} />
        <span className="text-body">Changes:</span>
        <SelectPill name="range" value={range} options={RANGES} onChange={onRange} align="left" />
        <span className="ml-2">Last update: {company.updated}</span>
        <span className="flex-1" />
        <button
          type="button"
          className="hover:text-ink -my-1.5 flex items-center gap-1.5 py-1.5 transition-colors"
        >
          <Icon name="layout" size={13} />
          Manage layout
        </button>
      </div>
    </>
  );
}
