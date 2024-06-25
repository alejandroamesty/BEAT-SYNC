import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MusicItemComponent } from './music-item/music-item.component';

@Component({
  selector: 'app-music-list',
  standalone: true,
  templateUrl: './music-list.component.html',
  styleUrls: ['./music-list.component.scss'],
  imports: [CommonModule, MusicItemComponent],
})
export class MusicListComponent {
  @Input() musicList: Array<{
    cover: string;
    title: string;
    artists: string[];
    explicit: boolean;
    type: 'Song' | 'Album';
  }> = [];

  @Input() height: string = 'auto';

  handleItemPress(title: string) {
    console.log('Music item pressed:', title);
  }
}
