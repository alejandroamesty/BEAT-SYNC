import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlButtonComponent } from 'src/components/control-button/control-button.component';

@Component({
  selector: 'app-music-item',
  standalone: true,
  templateUrl: './music-item.component.html',
  styleUrls: ['./music-item.component.scss'],
  imports: [CommonModule, ControlButtonComponent],
})
export class MusicItemComponent {
  @Input() music: {
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
  } = {
    _id: 'unknownId',
    refId: 'unknownRefId',
    name: 'Default Title',
    url: null,
    cover_img: [],
    artists: ['Default Artist'],
    release_date: '2021-01-01',
    duration_ms: 0,
    disc_number: 0,
    track_number: 0,
    album: 'Default Album',
    album_refId: 'unknownAlbumId',
    genres: ['Default Genre'],
    explicit: false,
    popularity: 0,
    type: 'Song',
  };

  @Input() isPlaylist: boolean = false;
  @Output() onPress = new EventEmitter<any>(); // Cambiado a EventEmitter<any>
  @Output() onControlButtonClick = new EventEmitter<void>();

  allArtists: string = '';

  ngOnInit() {
    if (typeof this.music.artists === 'string') {
      this.allArtists = this.music.artists;
    } else {
      console.log(this.music.artists);
      this.allArtists = this.music.artists
        .map((artist) => artist.name)
        .join(', ');
    }
  }

  handleClick() {
    this.onPress.emit(this.music);
  }

  onButtonClick() {
    this.onControlButtonClick.emit();
  }

  getMusicCover(): string {
    if (
      this.music.cover_img &&
      this.music.cover_img.length > 0 &&
      this.music.cover_img[0]?.url
    ) {
      return this.music.cover_img[0].url;
    }
    return '../../../assets/images/no-cover.png';
  }

  getControlButtonIcon(): string {
    if (this.isPlaylist && this.music.type === 'Song') {
      return '../../../assets/images/remove.png';
    }
    return this.music.type === 'Album'
      ? '../../../assets/images/go-to.png'
      : '../../../assets/images/add.png';
  }
}
