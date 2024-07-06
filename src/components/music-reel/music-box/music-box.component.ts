import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-music-box',
  standalone: true,
  templateUrl: './music-box.component.html',
  styleUrls: ['./music-box.component.scss'],
  imports: [CommonModule],
})
export class MusicBoxComponent implements OnInit {
  @Input() _id: string = 'unknownId';
  @Input() refId: string = 'unknownRefId';
  @Input() title: string = 'Un Verano Sin Ti';
  @Input() cover: string = '../../../assets/images/unveranosinti.png';
  @Input() type: 'Playlist' | 'Album' = 'Album';
  @Input() description?: string;
  @Input() releaseDate?: string = '06-05-2022';
  @Input() songCount?: number = 23;
  @Input() artists?: { name: string; id: string }[] = [
    { name: 'Bad Bunny', id: 'unknownId' },
  ];
  @Input() userId?: string;
  @Input() songIds?: string[];
  @Input() songs?: any[];

  @Output() onPress: EventEmitter<void> = new EventEmitter<void>();

  constructor(private router: Router, private dataService: DataService) {}

  private vibrantColors: string[] = ['#FFAA1A', '#FF7A67', '#61DA5E', '#3EA0FF'];
  static usedColors: Set<string> = new Set(); // Set para almacenar colores ya usados
  backgroundColor: string = '';

  ngOnInit() {
    this.backgroundColor = this.getUniqueVibrantColor();
  }

  getUniqueVibrantColor(): string {
    const availableColors = this.vibrantColors.filter(color => !MusicBoxComponent.usedColors.has(color));

    if (availableColors.length === 0) {
      MusicBoxComponent.usedColors.clear();
      availableColors.push(...this.vibrantColors);
    }

    const randomIndex = Math.floor(Math.random() * availableColors.length);
    const selectedColor = availableColors[randomIndex];

    MusicBoxComponent.usedColors.add(selectedColor);

    return selectedColor;
  }

  handleClick() {
    if (this.type === 'Playlist') {
      this.dataService.changeSongs(this.songs || []);
      console.log('Playlist clicked:', this.title);
      this.router.navigate(['playlist-detail'], {
        queryParams: {
          playlistId: this._id,
          playlistTitle: this.title,
          playlistDescription: this.description,
          playlistUser: this.userId,
          songIds: this.songIds,
        },
      });
    } else if (this.type === 'Album') {
      console.log('artists:' + this.artists);
      this.router.navigate(['album-detail'], {
        queryParams: {
          _id: this._id,
          refId: this.refId,
          title: this.title,
          cover: this.cover,
          type: this.type,
          releaseDate: this.releaseDate,
          songCount: this.songCount,
          artistNames: this.artists?.map((artist) => artist.name),
          artistIds: this.artists?.map((artist) => artist.id),
        },
      });
      console.log('Album clicked:', this.title);
    }
    this.onPress.emit();
  }

  get subtitle(): string {
    if (this.type === 'Playlist') {
      return `Playlist • ${this.description}`;
    } else if (this.type === 'Album') {
      return `Album • ${this.releaseDate} • ${this.songCount} songs`;
    }
    return '';
  }
}
