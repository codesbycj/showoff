export type BlockProps = { margin: number; height: number };

export type TabProps = {
  margin: number;
  height: number;
  value: string;
  onSelect: (id: string) => void;
};

export type BoardProps = {
  margin: number;
  height: number;
  rowH: number;
  stripH: number;
  radius: number;
  avatar: number;
};
