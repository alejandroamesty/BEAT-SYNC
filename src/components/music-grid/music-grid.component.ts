import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MusicCardComponent } from './music-card/music-card.component';
import { Router } from '@angular/router';

interface MusicItem {
  title: string;
  cover: string;
}

@Component({
  selector: 'app-music-grid',
  templateUrl: './music-grid.component.html',
  styleUrls: ['./music-grid.component.scss'],
  standalone: true,
  imports: [CommonModule, MusicCardComponent],
})
export class MusicGridComponent {
  @Input() musicItems: MusicItem[] = [];

  constructor(private router: Router) {}

  handleCardPress(item: MusicItem) {
    this.router.navigate(['album-detail']);
    console.log('Music Card Pressed:', item);
  }
}
