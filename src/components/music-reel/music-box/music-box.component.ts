import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

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

  get subtitle(): string {
    if (this.type === 'playlist') {
      return `Playlist • ${this.description}`;
    } else if (this.type === 'album') {
      return `Album • ${this.releaseDate} • ${this.songCount} songs`;
    }
    return '';
  }

  handleClick() {
    this.onPress.emit();
  }
}
