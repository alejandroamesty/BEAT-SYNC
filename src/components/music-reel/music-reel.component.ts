import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MusicBoxComponent } from './music-box/music-box.component';

@Component({
  selector: 'app-music-reel',
  standalone: true,
  templateUrl: './music-reel.component.html',
  styleUrls: ['./music-reel.component.scss'],
  imports: [CommonModule, MusicBoxComponent],
})
export class MusicReelComponent {
  @Input() musicData: MusicData[] = [];

  handleMusicBoxClick() {
    console.log('Music Box Clicked');
  }
}

export interface MusicData {
  cover: string;
  title: string;
  type: 'playlist' | 'album';
  description?: string;
  releaseDate?: string;
  songCount?: number;
}
