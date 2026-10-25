import { useState } from 'react';

import { Avatar, Count } from '@/components/Bits';
import { Icon } from '@/components/Icon';
import { PROJECTS, workspace } from '@/data/deck';
import { cx } from '@/lib/cx';
import { TABS, type Tab, type TabId } from '@/nav';

/**
 * The left rail: the workspace, the menu, and the project tree.
 *
 * Rule 1 lives in `Item`. An inactive menu entry is *visibly* inactive and
 * genuinely inert: dimmed, `aria-disabled`, skipped by the keyboard,
 * not-allowed under the pointer, and a click does nothing at all.
 *
 * The project tree is a different thing and is **not** inert: its disclosure
 * really collapses and its two leaves really switch project, which changes the
 * board's heading, its counts and its cards. A tree of dead rows under a live
 * menu would be the worst of both — it looks like navigation and answers to
 * nothing.
 */
export function Sidebar({
  active,
  onSelect,
  projectId,
  onProject,
}: {
  active: TabId;
  onSelect: (id: TabId) => void;
  projectId: string;
  onProject: (id: string) => void;
}) {
  const [open, setOpen] = useState(true);

  return (
    <aside className="border-line bg-surface flex w-[260px] shrink-0 flex-col border-r px-4 py-4">
      <div className="border-line flex items-center gap-2.5 rounded-2xl border p-2.5">
        <span className="bg-fill text-fill-fg grid h-10 w-10 shrink-0 place-items-center rounded-full text-[15px] font-extrabold">
          M
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-ink m-0 truncate text-[13.5px] font-bold">{workspace.team}</p>
          <p className="text-muted m-0 mt-0.5 flex items-center gap-1 text-[11.5px]">
            <Icon name="lock" size={11} />
            {workspace.visibility}
          </p>
        </div>
        <span className="text-muted" aria-hidden="true">
          <Icon name="stack" size={15} />
        </span>
      </div>

      <nav aria-label="Sections" className="mt-5 flex min-h-0 flex-1 flex-col">
        <Group label="Menu" />
        <ul className="m-0 mt-1 flex list-none flex-col gap-0.5 p-0">
          {TABS.map((tab) => (
            <Item key={tab.id} tab={tab} active={active === tab.id} onSelect={onSelect} />
          ))}
        </ul>

        <Group label="Workspace" action="Add a project" className="mt-6" />

        <div className="mt-1">
          <button
            type="button"
            data-tree-toggle
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="bg-fill text-fill-fg flex h-11 w-full items-center gap-2 rounded-[14px] px-3 text-[13.5px] font-bold"
          >
            <Icon
              name="chevron-down"
              size={15}
              className={cx('shrink-0 transition-transform duration-200', !open && '-rotate-90')}
            />
            <span className="min-w-0 flex-1 truncate text-left">Ongoing Projects</span>
            <Count value={PROJECTS.length} tone="fill" />
          </button>

          {open ? (
            <ul className="m-0 mt-1 flex list-none flex-col gap-0.5 p-0 pl-3">
              {PROJECTS.map((project) => (
                <li key={project.id}>
                  <button
                    type="button"
                    data-project={project.id}
                    aria-pressed={projectId === project.id}
                    onClick={() => onProject(project.id)}
                    className={cx(
                      'flex h-10 w-full items-center rounded-[12px] px-3 text-left text-[13px] transition-colors',
                      projectId === project.id
                        ? 'bg-accent-soft text-accent-deep font-bold'
                        : 'text-body hover:bg-sunken hover:text-ink font-medium',
                    )}
                  >
                    <span className="min-w-0 truncate">{project.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </nav>

      <div className="border-line mt-4 flex items-center gap-2.5 border-t pt-4">
        <Avatar src={workspace.user.face} name={workspace.user.full} size={34} />
        <div className="min-w-0 flex-1">
          <p className="text-ink m-0 truncate text-[13px] font-bold">{workspace.user.full}</p>
          <p className="text-muted m-0 truncate text-[11.5px]">Product designer</p>
        </div>
        <span className="text-muted" aria-hidden="true">
          <Icon name="dots" size={16} />
        </span>
      </div>
    </aside>
  );
}

function Group({
  label,
  action,
  className,
}: {
  label: string;
  action?: string;
  className?: string;
}) {
  return (
    <div className={cx('flex items-center justify-between px-1', className)}>
      <span className="text-muted text-[11px] font-extrabold tracking-[0.1em] uppercase">
        {label}
      </span>
      {action ? (
        <span className="text-muted" aria-hidden="true" title={action}>
          <Icon name="plus" size={14} />
        </span>
      ) : (
        <Icon name="chevron-down" size={14} className="text-muted" />
      )}
    </div>
  );
}

function Item({
  tab,
  active,
  onSelect,
}: {
  tab: Tab;
  active: boolean;
  onSelect: (id: TabId) => void;
}) {
  return (
    <li>
      <button
        type="button"
        data-tab={tab.id}
        data-live={tab.live}
        aria-current={active ? 'page' : undefined}
        aria-disabled={tab.live ? undefined : true}
        tabIndex={tab.live ? undefined : -1}
        onClick={tab.live ? () => onSelect(tab.id) : undefined}
        className={cx(
          'flex h-11 w-full items-center gap-2.5 rounded-[14px] px-3 text-[13.5px] transition-colors duration-150',
          active && 'bg-fill text-fill-fg font-bold',
          !active && tab.live && 'text-body hover:bg-sunken hover:text-ink font-semibold',
          !tab.live && 'text-muted cursor-not-allowed font-semibold opacity-55',
        )}
      >
        <Icon name={tab.icon} size={17} className="shrink-0" />
        <span className="min-w-0 flex-1 truncate text-left">{tab.label}</span>
        {tab.count ? <Count value={tab.count} tone={active ? 'fill' : 'quiet'} /> : null}
      </button>
    </li>
  );
}
