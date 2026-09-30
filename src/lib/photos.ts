import { photoManifest } from './photo-manifest';

export type PhotoRatio = '21/9' | '16/9' | '4/3' | '3/2' | '1/1' | '4/5' | '3/4' | 'banner';

/**
 * 8x5 swatch in the surface grey. Inlined rather than computed so the constant
 * is safe to import from client components (no Buffer at runtime).
 */
export const BLUR_DATA_URL =
  'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjUiPjxyZWN0IHdpZHRoPSI4IiBoZWlnaHQ9IjUiIGZpbGw9IiNGNUY1RjciLz48L3N2Zz4=';

export function photoSrc(id: string): string | undefined {
  return photoManifest[id];
}
