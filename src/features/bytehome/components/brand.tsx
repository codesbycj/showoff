import Svg, { Path } from 'react-native-svg';

/**
 * The three merchant marks on the ledger, drawn.
 *
 * These are logos, which the rules put in the "draw the interface" half of
 * the split: a mark is vector art in the real app, and at 24dp a bitmap of
 * one is mush. They are authored rather than traced because the reference
 * renders them at about 30px, which is far too little resolution for
 * `trace.py` to walk a boundary from.
 *
 * Each is drawn in its own viewBox and sized by `size`, so they sit on one
 * optical weight in the row rather than one bounding box.
 */
export function AppleMark({ size = 22, tint = '#0B0B0D' }: { size?: number; tint?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        fill={tint}
        d="M17.1 12.6c0-2.2 1.8-3.3 1.9-3.3-1-1.5-2.6-1.7-3.2-1.7-1.4-.1-2.7.8-3.4.8-.7 0-1.8-.8-2.9-.8-1.5 0-2.9.9-3.7 2.2-1.6 2.7-.4 6.8 1.1 9 .8 1.1 1.6 2.3 2.8 2.3 1.1 0 1.5-.7 2.9-.7 1.3 0 1.7.7 2.9.7 1.2 0 2-1.1 2.7-2.2.9-1.2 1.2-2.4 1.3-2.5-.1 0-2.4-.9-2.4-3.8ZM14.9 6.1c.6-.7 1-1.7.9-2.7-.9 0-2 .6-2.6 1.3-.6.6-1.1 1.6-.9 2.6 1 .1 2-.5 2.6-1.2Z"
      />
    </Svg>
  );
}

/** The smile, which is what the mark is at this size. */
export function AmazonMark({ size = 22, tint = '#F0901F' }: { size?: number; tint?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        fill="#1C1C1E"
        d="M12.1 5.1c-2.4 0-4.2 1-4.5 3.1l2.3.2c.2-1 .9-1.5 2-1.5 1.2 0 1.7.6 1.7 1.8v.5c-3.6.2-5.6 1.2-5.6 3.4 0 1.7 1.3 2.8 3.1 2.8 1.4 0 2.3-.5 3-1.4.3.6.5.9 1 1.3l1.8-1.6c-.6-.6-.8-1.1-.8-2.2V8.8c0-2.4-1.4-3.7-4-3.7Zm1.5 6.1v.8c0 1.3-.8 2-1.8 2-.8 0-1.3-.4-1.3-1.2 0-1 1-1.5 3.1-1.6Z"
      />
      <Path
        fill={tint}
        d="M4.2 17.4c3 1.7 6.1 2.5 9 2.5 2.1 0 4.3-.4 6.3-1.3.3-.1.1-.5-.2-.4-1.9.5-3.9.8-5.8.8-2.9 0-5.7-.8-8.1-2.1-.3-.1-.5.3-.2.5Zm16.1.2c-.2-.3-1.6-.2-2.2-.1-.2 0-.2.2 0 .2.7-.1 1.8-.2 2 .1.2.3-.3 1.3-.5 1.7-.1.2.1.2.2.1.9-.7 1-1.7.5-2Z"
      />
    </Svg>
  );
}

/** Two overlapping P's, which is the mark however small it gets. */
export function PaypalMark({ size = 22 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        fill="#002C8A"
        d="M7.6 3.4h6.1c2.9 0 4.6 1.5 4.2 4.1-.4 2.7-2.5 4.2-5.4 4.2h-2.3a.8.8 0 0 0-.8.7l-1 6.2a.6.6 0 0 1-.6.5H5.2a.4.4 0 0 1-.4-.5L7 3.9a.6.6 0 0 1 .6-.5Z"
      />
      <Path
        fill="#009BDE"
        d="M10.9 8.1h5c2.9 0 4.5 1.5 4.1 4.2-.4 2.7-2.5 4.2-5.3 4.2h-2.3a.8.8 0 0 0-.8.7l-.9 5.5a.6.6 0 0 1-.6.5H8.5a.4.4 0 0 1-.4-.5l2.2-14.1a.6.6 0 0 1 .6-.5Z"
      />
    </Svg>
  );
}
