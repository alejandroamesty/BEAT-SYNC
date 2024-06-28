import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MusicItemComponent } from './music-item/music-item.component';

@Component({
  selector: 'app-music-list',
  standalone: true,
  templateUrl: './music-list.component.html',
  styleUrls: ['./music-list.component.scss'],
  imports: [CommonModule, MusicItemComponent],
})
export class MusicListComponent {
  @Input() musicList: Array<{
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
    type: 'Song' | 'Album';
  }> = [];

  @Input() height: string = 'auto';

  handleItemPress(title: string) {
    console.log('Music item pressed:', title);
  }
}
