import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlButtonComponent } from 'src/components/control-button/control-button.component';

@Component({
  selector: 'app-playlist-item',
  standalone: true,
  templateUrl: './playlist-item.component.html',
  styleUrls: ['./playlist-item.component.scss'],
  imports: [CommonModule, ControlButtonComponent],
})
export class PlaylistItemComponent {
  @Input() playlist: {
    cover: string;
    title: string;
    user: string;
  } = {
    cover: '../../../assets/images/unveranosinti.png',
    title: 'Default Title',
    user: 'Default User',
  };

  @Output() onPress = new EventEmitter<void>();

  handleClick() {
    this.onPress.emit();
    console.log('Playlist item pressed:', this.playlist.title);
  }

  onButtonClick() {
    this.onPress.emit();
    console.log('Button pressed:', this.playlist.title);
  }
}
