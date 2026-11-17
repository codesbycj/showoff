export type BarProps = { margin: number; height: number; control: number };

export type RailProps = { margin: number; height: number; avatar: number };

export type AuthorProps = { margin: number; height: number; avatar: number };

export type CopyProps = { margin: number; titleH: number; bodyH: number };

export type CollageProps = {
  margin: number;
  height: number;
  gap: number;
  radius: number;
  /** Measured column widths, so the big frame does not resize when the right
   *  column mounts during the reveal. */
  big: number;
  small: number;
};

export type StatProps = { margin: number; height: number };

export type ActionProps = { margin: number; height: number };

export type NextProps = { margin: number; height: number; avatar: number };

export type TabProps = {
  height: number;
  bottomInset: number;
  value: string;
  onSelect: (id: string) => void;
};
