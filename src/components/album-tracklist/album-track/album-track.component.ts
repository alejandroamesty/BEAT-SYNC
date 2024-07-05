import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlButtonComponent } from 'src/components/control-button/control-button.component'; // Asegúrate de que el path es correcto

@Component({
  selector: 'app-album-track',
  standalone: true,
  templateUrl: './album-track.component.html',
  styleUrls: ['./album-track.component.scss'],
  imports: [CommonModule, ControlButtonComponent],
})
export class AlbumTrackComponent {
  @Input() _id?: string = '';
  @Input() refId: string = '';
  @Input() cover: string = '';
  @Input() url: string | null = null;
  @Input() duration_ms: number = 0;
  @Input() disc_number: number = 0;
  @Input() number: number = 0;
  @Input() album: string = '';
  @Input() albumRefId: string = '';
  @Input() genres: string[] = [''];
  @Input() releaseDate: string = new Date().toISOString();
  @Input() title: string = '';
  @Input() artists: { name: string; id: string }[] = [{ name: '', id: '' }];
  @Input() liked?: boolean = false;
  @Input() type: 'track' | 'catalog' = 'track'; // Tipo por defecto

  allArtists: string = '';

  @Output() onPress = new EventEmitter<void>();
  @Output() onLikePress = new EventEmitter<void>(); // Evento para el click de like
  @Output() onControlButtonClick = new EventEmitter<void>(); // Evento para el click del ControlButton

  ngOnInit() {
    this.artists.forEach((artist, index) => {
      if (index === 0) {
        this.allArtists = artist.name;
      } else {
        this.allArtists += ', ' + artist.name;
      }
    });
  }

  onLikeClick() {
    this.liked = !this.liked;
    this.onLikePress.emit();
  }

  handleControlButtonClick() {
    this.onControlButtonClick.emit();
  }
}
