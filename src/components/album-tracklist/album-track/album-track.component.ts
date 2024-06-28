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
  @Input() title: string = '';
  @Input() artists: string = '';
  @Input() liked: boolean = false;

  @Output() onPress = new EventEmitter<void>();

  onLikeClick() {
    this.liked = !this.liked;
    this.onPress.emit();
  }
}
