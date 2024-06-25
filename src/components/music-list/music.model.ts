export type MusicType = 'Song' | 'Album';

export interface MusicItem {
  cover: string;
  title: string;
  artists: string[];
  explicit: boolean;
  type: MusicType;
}
