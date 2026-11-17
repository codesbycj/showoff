export type SearchProps = { margin: number; height: number };

export type TitleProps = { margin: number; height: number };

export type RailProps = { margin: number; height: number; width: number; radius: number };

export type GridProps = {
  margin: number;
  height: number;
  gutter: number;
  rowH: number;
  radius: number;
  art: number;
  /** Measured tile width, so a tile does not halve when its neighbour mounts
   *  during the reveal. */
  tile: number;
};

export type DockProps = {
  width: number;
  height: number;
  lift: number;
  item: number;
  bottomInset: number;
  value: string;
  onSelect: (id: string) => void;
};
