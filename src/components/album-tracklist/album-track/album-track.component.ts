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

  fetching: boolean = false;
  allArtists: string = '';

  @Output() onPress = new EventEmitter<void>();
  @Output() onLikePress = new EventEmitter<void>(); // Evento para el click de like
  @Output() onControlButtonClick = new EventEmitter<void>(); // Evento para el click del ControlButton

  ngOnInit() {
    // check if ref id is in localstorage liked songs
    const likedSongs = localStorage.getItem('likedSongs');
    if (likedSongs) {
      const likedSongsArray = JSON.parse(likedSongs);
      this.liked = likedSongsArray.includes(this.refId);
    }
    this.artists.forEach((artist, index) => {
      if (index === 0) {
        this.allArtists = artist.name;
      } else {
        this.allArtists += ', ' + artist.name;
      }
    });
  }

  onLikeClick(event: MouseEvent) {
    event.stopPropagation();
  
    if (this.fetching) return;
    this.fetching = true;
  
    fetch('https://beatsyncserver.onrender.com/toggleLike', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: localStorage.getItem('userId'),
        songRefId: this.refId,
      }),
    }).then((response) => {
      if (response.status === 200) {
        response.json().then((data) => {
          const likedSongs = localStorage.getItem('likedSongs');
          if (likedSongs) {
            const likedSongsArray = JSON.parse(likedSongs);
            let newLikedSongs: Array<any> = [...likedSongsArray];
            if (data.liked) {
              newLikedSongs.push(this.refId);
            } else {
              newLikedSongs = newLikedSongs.filter(
                (songId: string) => songId !== this.refId
              );
            }
            localStorage.setItem('likedSongs', JSON.stringify(newLikedSongs));
          }
          this.liked = data.liked;
        });
        this.fetching = false;
      } else {
        this.fetching = false;
      }
    });
    this.onLikePress.emit();
  }  

  handleControlButtonClick() {
    this.onControlButtonClick.emit();
  }

  onTrackPress() {
    this.onPress.emit();
    console.log('Track clicked');
  }
}
