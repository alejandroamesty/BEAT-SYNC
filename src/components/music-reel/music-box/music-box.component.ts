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
  @Input() title: string = 'Un Verano Sin Ti';
  @Input() cover: string = '../../../assets/images/unveranosinti.png';
  @Input() type: 'playlist' | 'album' = 'album';
  @Input() description?: string;
  @Input() releaseDate?: string = '06/05/2022';
  @Input() songCount?: number = 23;

  @Output() onPress: EventEmitter<void> = new EventEmitter<void>();

  constructor(private router: Router) {}

  get subtitle(): string {
    if (this.type === 'playlist') {
      return `Playlist • ${this.description}`;
    } else if (this.type === 'album') {
      return `Album • ${this.releaseDate} • ${this.songCount} songs`;
    }
    return '';
  }

  handleClick() {
    if (this.type === 'playlist') {
      this.router.navigate(['playlist-detail']);
      console.log('Playlist clicked:', this.title);
    } else if (this.type === 'album') {
      this.router.navigate(['album-detail']);
      console.log('Album clicked:', this.title);
    }
    this.onPress.emit();
  }
}
