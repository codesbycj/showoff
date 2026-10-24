/// <reference types="vite/client" />

/* Vite types `?url` imports but not a bare `.mp4` / `.avif` import. */
declare module '*.mp4' {
  const src: string;
  export default src;
}

declare module '*.avif' {
  const src: string;
  export default src;
}
