/**
 * The shop's own photographs.
 *
 * Files live in public/photos/ and are processed by scripts/prepare-photos.sh
 * into a 1600px and an 800px JPEG, so a phone never downloads a 4MB original.
 *
 * Every entry is a real photograph of this shop. Nothing here is stock: an
 * empty list renders labelled frames instead, which is honest about what the
 * client has sent so far.
 */

export type Photo = {
  /** Base name without size suffix or extension, e.g. "bay-door". */
  name: string
  /** Intrinsic size of the 1600px rendition, for aspect ratio and no layout shift. */
  width: number
  height: number
  /** Locale key under photos.alt, so the description is translated. */
  altKey: string
}

/** The one wide, dark image the opening band is built on. */
export const heroPhoto: Photo | null = {
  name: 'bay-door',
  width: 1600,
  height: 1200,
  altKey: 'photos.alt.bayDoor',
}

/**
 * Everything else, shown in the photo band. The first runs full width, so it
 * is the strongest landscape shot; the portraits sit in the pair grid, where
 * a 4:3 crop keeps the mechanical work centered.
 */
export const galleryPhotos: Photo[] = [
  // Cropped above a customer's readable licence plate; see photos-source/.
  { name: 'lift', width: 1600, height: 1060, altKey: 'photos.alt.lift' },
  { name: 'interior', width: 1600, height: 1200, altKey: 'photos.alt.interior' },
  { name: 'lot', width: 1600, height: 1200, altKey: 'photos.alt.lot' },
  // Same crop, tight on the engine itself.
  { name: 'engine', width: 1200, height: 415, altKey: 'photos.alt.engine' },
  { name: 'block', width: 1200, height: 1600, altKey: 'photos.alt.block' },
]

/** Public URL for a rendition, base path included. */
export function photoSrc(photo: Photo, size: 800 | 1600): string {
  return `${import.meta.env.BASE_URL}photos/${photo.name}-${size}.jpg`
}

/** srcset covering both renditions. */
export function photoSrcSet(photo: Photo): string {
  return `${photoSrc(photo, 800)} 800w, ${photoSrc(photo, 1600)} 1600w`
}
