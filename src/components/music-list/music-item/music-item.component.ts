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
    cover: string;
    title: string;
    artists: string[];
    explicit: boolean;
    type: 'Song' | 'Album';
  } = {
    cover: '../../../assets/images/unveranosinti.png',
    title: 'Default Title',
    artists: ['Default Artist'],
    explicit: true,
    type: 'Song',
  };

  @Output() onPress = new EventEmitter<void>();

  handleClick() {
    this.onPress.emit();
    console.log('Music item pressed:', this.music.title);
  }

  onButtonClick() {
    this.onPress.emit();
    console.log('Button pressed:', this.music.title);
  }
}
