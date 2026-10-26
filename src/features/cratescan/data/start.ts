/**
 * Everything the scanner says, so the components stay presentational.
 *
 * **The viewfinder is a photograph.** A parcel in two hands is a picture of
 * something, which is the bitmap side of the drawing-range rule (AGENTS.md,
 * "Photograph the picture"). Drawing one would produce a cartoon of a parcel
 * where the design had a parcel.
 *
 * The frame it sits in is drawn: four corner brackets, which are an idea
 * rather than a picture.
 */

export const copy = {
  title: 'Box Scan',
  caption: 'Place the QR code inside the frame to scan automatically.',
} as const;

export const parcel = require('../../../../assets/images/cratescan/parcel.jpg');
