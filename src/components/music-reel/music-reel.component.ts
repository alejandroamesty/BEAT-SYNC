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
  @Input() musicData: {
    _id: string;
    refId: string;
    type: 'Album' | 'Playlist';
    name: string;
    releaseDate?: string;
    images?: { url: string }[];
    artists?: { name: string; id: string }[];
    totalTracks: number;
    cover?: string;
    description?: string;
  }[] = [];

  handleMusicBoxClick() {
    console.log('Music Box Clicked');
  }
}

export interface MusicData {
  cover: string;
  title: string;
  type: 'Playlist' | 'Album';
  description?: string;
  releaseDate?: string;
  songCount?: number;
}
