import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MusicCardComponent } from './music-card/music-card.component';

interface MusicItem {
  _id: string;
  refId: string;
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
  @Output() cardPress = new EventEmitter<MusicItem>();

  handleCardPress(item: MusicItem) {
    this.cardPress.emit(item);
  }
}
