export type HeadProps = { margin: number; height: number };

export type Props = {
  margin: number;
  height: number;
  min: number;
  value: string;
  onSelect: (id: string) => void;
};
