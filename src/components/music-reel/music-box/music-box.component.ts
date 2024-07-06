import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-music-box',
  standalone: true,
  templateUrl: './music-box.component.html',
  styleUrls: ['./music-box.component.scss'],
  imports: [CommonModule],
})
export class MusicBoxComponent {
  @Input() _id: string = 'unknownId';
  @Input() refId: string = 'unknownRefId';
  @Input() title: string = 'Un Verano Sin Ti';
  @Input() cover: string = '../../../assets/images/unveranosinti.png';
  @Input() type: 'Playlist' | 'Album' = 'Album';
  @Input() description?: string;
  @Input() releaseDate?: string = '06-05-2022';
  @Input() songCount?: number = 23;
  @Input() songIds?: Array<string> = [];
  @Input() artists?: { name: string; id: string }[] = [
    { name: 'Bad Bunny', id: 'unknownId' },
  ];

  @Output() onPress: EventEmitter<void> = new EventEmitter<void>();

  constructor(private router: Router) {}

  get subtitle(): string {
    if (this.type === 'Playlist') {
      return `Playlist • ${this.description}`;
    } else if (this.type === 'Album') {
      return `Album • ${this.releaseDate} • ${this.songCount} songs`;
    }
    return '';
  }

  handleClick() {
    if (this.type === 'Playlist') {
      this.router.navigate(['playlist-detail'], { queryParams: {
        id: this._id,
        playlistTitle: this.title,
        description: this.description,
        songIds: this.songIds,
      } });
      console.log('Playlist clicked:', this.title);
    } else if (this.type === 'Album') {
      console.log('artists:' + this.artists);
      this.router.navigate(['album-detail'], {
        queryParams: {
          _id: this._id,
          refId: this.refId,
          title: this.title,
          cover: this.cover,
          type: this.type,
          releaseDate: this.releaseDate,
          songCount: this.songCount,
          artistNames: this.artists?.map((artist) => artist.name),
          artistIds: this.artists?.map((artist) => artist.id),
        },
      });
      console.log('Album clicked:', this.title);
    }
    this.onPress.emit();
  }
}
