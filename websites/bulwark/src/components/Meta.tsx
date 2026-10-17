import { BlurSwap } from '@/components/BlurSwap';
import type { Project } from '@/data/projects';

/**
 * The centred project's particulars, down the left.
 *
 * Label, then value, in two columns — which is what the reference does, and
 * which lets three rows share one alignment without any of them knowing how
 * long the others are.
 *
 * The whole block swaps as one unit rather than row by row. Staggering three
 * rows of two words each reads as a glitch rather than as a transition.
 *
 * Rows with nothing in them are dropped rather than shown empty: the
 * reference's CMS genuinely has no role credited on several records, and a
 * label with a blank beside it reads as a bug.
 */
export function Meta({ project }: { project: Project }) {
  const rows: Array<[string, string[]]> = [
    ['Role', project.role],
    ['Launch', project.year ? [project.year] : []],
    ['Recognition', project.recognition],
  ];
  const shown = rows.filter(([, v]) => v.length > 0);

  /*
   * Desktop only, and dropped rather than reflowed below 1024px.
   *
   * The page is a 3D collage with columns either side of it, and there is no
   * honest way to fit those columns on a narrow screen without rebuilding it
   * as a different design. Everything this block says is also on the centred
   * index entry, so dropping it costs the visitor nothing; letting it stay and
   * run underneath the collage would cost them the collage.
   */
  return (
    <div className="absolute left-[8vw] top-1/2 hidden w-[28vw] max-w-[360px] -translate-y-1/2 lg:block">
      <div data-cascade="meta">
        <BlurSwap token={project.slug}>
          <dl className="flex flex-col gap-7">
            {shown.map(([label, values]) => (
              <div key={label} className="cascade-item flex gap-6">
                <dt className="w-[86px] shrink-0 font-mono text-[10px] uppercase tracking-[0.16em] opacity-55">
                  {label}
                </dt>
                <dd className="flex flex-col gap-0.5 text-[12px] font-medium leading-[1.5]">
                  {values.map((v) => (
                    <span key={v}>{v}</span>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
        </BlurSwap>
      </div>
    </div>
  );
}
