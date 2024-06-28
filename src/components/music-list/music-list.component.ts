import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MusicItemComponent } from './music-item/music-item.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-music-list',
  standalone: true,
  templateUrl: './music-list.component.html',
  styleUrls: ['./music-list.component.scss'],
  imports: [CommonModule, MusicItemComponent],
})
export class MusicListComponent {
  constructor(private router: Router) {}

  @Input() musicList: Array<{
    cover: string;
    title: string;
    artists: string[];
    explicit: boolean;
    type: 'Song' | 'Album';
  }> = [];

  @Input() height: string = 'auto';

  handleItemPress(type: string) {
    if (type === 'Album') {
      this.router.navigate(['album-detail']);
    }
  }
}
