/**
 * The car number as outlines rather than text.
 *
 * The loader scales this to a hundred times its own size to cover the screen,
 * and a glyph has to be real path geometry to survive that: scaled text is
 * rasterised at the layer's scale and goes soft at the corners. The paths are
 * Anton's own, lifted straight out of the webfont by `tools/glyph-path.py`, so
 * the mark and the headings are the same letterforms.
 *
 * `fill-rule="evenodd"` keeps the counters in the 9 and the 6 open.
 */
import type { ComponentPropsWithoutRef } from 'react';

type Props = Omit<ComponentPropsWithoutRef<'svg'>, 'fill' | 'viewBox'> & {
  /** Any SVG fill — the loader runs one copy in white over one in signal. */
  fill?: string;
  title?: string;
};

/* Ink box of "96" set in Anton, from tools/glyph-path.py --height 1000. */
const VIEW_BOX = '26 309 951 876';

const NINE =
  'M245.61 1184.08Q191.41 1184.08 144.53 1165.28Q97.66 1146.48 68.85 1108.89Q40.04 1071.29 40.04 1015.63L40.04 922.85L205.57 922.85L205.57 940.43Q205.57 961.91 207.76 983.4Q209.96 1004.88 218.99 1019.04Q228.03 1033.2 248.54 1033.2Q277.34 1033.2 288.57 1017.33Q299.8 1001.47 299.8 971.68L299.8 799.32Q287.6 821.78 263.18 835.94Q238.77 850.1 203.61 850.1Q132.81 850.1 94.24 821.53Q55.66 792.97 41.02 736.33Q26.37 679.69 26.37 594.73Q26.37 508.79 47.36 444.58Q68.36 380.37 117.43 344.73Q166.5 309.08 250.49 309.08Q340.33 309.08 390.62 339.6Q440.92 370.12 461.67 431.4Q482.42 492.68 482.42 584.96L482.42 817.38Q482.42 906.74 474.85 975.1Q467.29 1043.46 443.36 1089.84Q419.43 1136.23 372.07 1160.16Q324.71 1184.08 245.61 1184.08ZM254.39 698.24Q299.8 698.24 299.8 637.21L299.8 530.76Q299.8 467.29 256.84 467.29Q226.56 467.29 220.7 492.92Q214.84 518.56 214.84 558.59L214.84 627.93Q214.84 698.24 254.39 698.24Z';

const SIX =
  'M752.44 1184.08Q663.09 1184.08 612.55 1153.56Q562.01 1123.05 541.26 1061.52Q520.51 1000.0 520.51 908.2L520.51 675.78Q520.51 586.43 528.08 518.07Q535.64 449.71 559.57 403.32Q583.5 356.93 630.86 333.01Q678.22 309.08 757.32 309.08Q811.52 309.08 858.4 327.88Q905.27 346.68 934.08 384.03Q962.89 421.39 962.89 477.54L962.89 570.31L797.36 570.31L797.36 552.73Q797.36 531.25 795.17 509.77Q792.97 488.28 784.18 474.12Q775.39 459.96 754.39 459.96Q725.59 459.96 714.36 475.83Q703.12 491.7 703.12 521.48L703.12 693.85Q715.33 670.9 739.75 656.98Q764.16 643.07 799.32 643.07Q870.61 643.07 908.94 671.63Q947.27 700.2 961.91 756.84Q976.56 813.48 976.56 898.44Q976.56 984.38 955.57 1048.58Q934.57 1112.79 885.5 1148.44Q836.43 1184.08 752.44 1184.08ZM746.09 1025.88Q776.37 1025.88 782.23 1000.24Q788.09 974.61 788.09 934.57L788.09 865.23Q788.09 794.92 748.54 794.92Q703.12 794.92 703.12 855.96L703.12 962.4Q703.12 1025.88 746.09 1025.88Z';

export function CarNumber({ fill = 'currentColor', title, ...rest }: Props) {
  return (
    <svg
      viewBox={VIEW_BOX}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role={title ? 'img' : 'presentation'}
      aria-hidden={title ? undefined : true}
      {...rest}
    >
      {title ? <title>{title}</title> : null}
      <path d={NINE} fill={fill} fillRule="evenodd" />
      <path d={SIX} fill={fill} fillRule="evenodd" />
    </svg>
  );
}
