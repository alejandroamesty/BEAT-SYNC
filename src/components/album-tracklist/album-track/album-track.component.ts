import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-album-track',
  standalone: true,
  templateUrl: './album-track.component.html',
  styleUrls: ['./album-track.component.scss'],
  imports: [CommonModule],
})
export class AlbumTrackComponent {
  @Input() _id?: string = '';
  @Input() refId: string = '';
  @Input() cover: string = '';
  @Input() url: string | null = null;
  @Input() duration_ms: number = 0;
  @Input() disc_number: number = 0;
  @Input() number: number = 0;
  @Input() album: string = '';
  @Input() albumRefId: string = '';
  @Input() genres: string[] = [''];
  @Input() releaseDate: string = new Date().toISOString();
  @Input() title: string = '';
  @Input() artists: { name: string; id: string }[] = [{ name: '', id: '' }];
  @Input() liked: boolean = false;

  allArtists: string = '';

  ngOnInit() {
    this.artists.forEach((artist, index) => {
      if (index === 0) {
        this.allArtists = artist.name;
      } else {
        this.allArtists += ', ' + artist.name;
      }
    });
  }

  @Output() onPress = new EventEmitter<void>();

  onLikeClick() {
    this.liked = !this.liked;
    this.onPress.emit();
  }
}
