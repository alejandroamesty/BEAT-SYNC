import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MusicItemComponent } from './music-item/music-item.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-music-list',
  standalone: true,
  templateUrl: './music-list.component.html',
  styleUrls: ['./music-list.component.scss'],
  imports: [CommonModule, MusicItemComponent],
})
export class MusicListComponent {
  constructor(private router: Router) {}

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

  @Input() isPlaylist: boolean = false;

  @Input() height: string = 'auto';

  @Output() onItemPress = new EventEmitter<string>();

  handleItemPress(type: string) {
    if (type === 'Album') {
      this.router.navigate(['album-detail']);
    }
  }

  handleControlButtonClick() {
    this.onItemPress.emit();
  }
}
