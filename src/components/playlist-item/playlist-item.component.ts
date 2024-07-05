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
    _id: string;
    title: string;
    user: string;
    songIds: Array<string>;
    songs: Array<any>;
  } = {
    _id: 'default Id',
    title: 'Default Title',
    user: 'Default User',
    songIds: [],
    songs: [],
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
