/** Lowercase shirt key used by the dance-clip map. Matches the four
 *  wardrobe colours; the Overlay lowercases the ShirtColour from state
 *  to look up the clip. */
export type DanceShirt = 'white' | 'red' | 'green' | 'blue'

/** Filename-only map — the Overlay resolves to a bundled URL at runtime
 *  via import.meta.glob so missing files fall back to the white clip
 *  without a build error. */
export const danceClips: Record<DanceShirt, string> = {
  white: 'jayjay-dance.mp4',
  red: 'jayjay-dance-red.mp4',
  green: 'jayjay-dance-green.mp4',
  blue: 'jayjay-dance-blue.mp4',
}
