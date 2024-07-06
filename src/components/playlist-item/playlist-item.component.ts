import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlButtonComponent } from 'src/components/control-button/control-button.component';

@Component({
  selector: 'app-playlist-item',
  standalone: true,
  templateUrl: './playlist-item.component.html',
  styleUrls: ['./playlist-item.component.scss'],
  imports: [CommonModule, ControlButtonComponent],
})
export class PlaylistItemComponent implements OnInit {
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

  private vibrantColors: string[] = ['#FFAA1A', '#FF7A67', '#61DA5E', '#3EA0FF'];
  static usedColors: Set<string> = new Set();
  backgroundColor: string = '';

  ngOnInit() {
    this.backgroundColor = this.getUniqueVibrantColor();
  }

  getUniqueVibrantColor(): string {
    const availableColors = this.vibrantColors.filter(color => !PlaylistItemComponent.usedColors.has(color));

    if (availableColors.length === 0) {
      PlaylistItemComponent.usedColors.clear();
      availableColors.push(...this.vibrantColors);
    }

    const randomIndex = Math.floor(Math.random() * availableColors.length);
    const selectedColor = availableColors[randomIndex];

    PlaylistItemComponent.usedColors.add(selectedColor);

    return selectedColor;
  }

  handleClick() {
    this.onPress.emit();
    console.log('Playlist item pressed:', this.playlist.title);
  }

  onButtonClick() {
    this.onPress.emit();
    console.log('Button pressed:', this.playlist.title);
  }
}
