export type MusicType = 'Song' | 'Album';

export interface MusicItem {
  _id?: string;
  refId: string;
  name: string;
  url?: string | null;
  cover_img: any[];
  release_date: string;
  duration_ms?: Number;
  disc_number?: Number;
  track_number?: Number;
  album?: string;
  album_refId?: string;
  artists: any[];
  genres?: string[];
  explicit?: boolean;
  popularity: Number | null;
  total_tracks?: Number;
  type: MusicType;
}
