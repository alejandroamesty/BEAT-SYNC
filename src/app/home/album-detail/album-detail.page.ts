import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlbumTracklistComponent } from 'src/components/album-tracklist/album-tracklist.component';
import { SimpleButtonComponent } from 'src/components/simple-button/simple-button.component';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from '@ionic/angular/standalone';
import { ControlButtonComponent } from 'src/components/control-button/control-button.component';
import { Location } from '@angular/common';

@Component({
  selector: 'app-album-detail',
  standalone: true,
  templateUrl: 'album-detail.page.html',
  styleUrls: ['album-detail.page.scss'],
  imports: [
    CommonModule,
    AlbumTracklistComponent,
    SimpleButtonComponent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    ControlButtonComponent,
  ],
})
export class AlbumDetailPage implements OnInit {
  albumCover: string = '../../../assets/images/unveranosinti.png';
  albumTitle: string = 'Un Verano Sin Ti';
  artists: string = 'Bad Bunny';
  genre: string = 'LATIN';
  releaseYear: string = '2022';
  popularity: number = 100;

  tracklist = [
    {
      number: 1,
      title: 'Me Porto Bonito',
      artists: 'Bad Bunny, Chencho Corleone',
      liked: true,
    },
    {
      number: 2,
      title: 'Después de la Playa',
      artists: 'Bad Bunny',
      liked: false,
    },
    {
      number: 3,
      title: 'La Mama de la Mama',
      artists: 'Bad Bunny',
      liked: true,
    },
    {
      number: 4,
      title: 'La Noche de Anoche',
      artists: 'Bad Bunny, Rosalía',
      liked: false,
    },
    {
      number: 5,
      title: 'Te Mudaste',
      artists: 'Bad Bunny',
      liked: false,
    },
    {
      number: 6,
      title: 'Hoy Cobre',
      artists: 'Bad Bunny',
      liked: false,
    },
    {
      number: 7,
      title: 'Yo Visto Así',
      artists: 'Bad Bunny',
      liked: false,
    },
    {
      number: 8,
      title: 'La Droga',
      artists: 'Bad Bunny',
      liked: false,
    },
    {
      number: 9,
      title: '100 Millones',
      artists: 'Bad Bunny, Luar La L',
      liked: false,
    },
    {
      number: 10,
      title: 'Tú No Metes Cabra',
      artists: 'Bad Bunny',
      liked: false,
    },
    {
      number: 11,
      title: 'Amorfoda',
      artists: 'Bad Bunny',
      liked: false,
    },
  ];

  ngOnInit(): void {}

  constructor(private _location: Location) {}

  handlePlayClick() {
    console.log('Play button clicked');
  }

  handleLikeClick(track: any) {
    console.log(`Liked track: ${track.title}`);
  }

  getStarRating(): string {
    const starCount = Math.round((this.popularity / 100) * 5);
    return '★'.repeat(starCount) + '☆'.repeat(5 - starCount);
  }

  closePage() {
    this._location.back();
    console.log('Close button clicked');
  }
}
