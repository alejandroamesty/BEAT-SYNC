import { Component } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from '@ionic/angular/standalone';
import { MusicGridComponent } from 'src/components/music-grid/music-grid.component';
import {
  MusicReelComponent,
  MusicData,
} from 'src/components/music-reel/music-reel.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    MusicGridComponent,
    MusicReelComponent,
  ],
})
export class HomePage {
  constructor() {}

  musicItems = [
    {
      title: 'Un Verano Sin Ti',
      cover: '../../../assets/images/unveranosinti.png',
    },
    {
      title: 'MAÑANA SERÁ BONITO',
      cover: '../../../assets/images/example-covers/karolg.png',
    },
    {
      title: 'HEROES & VILLAINS',
      cover: '../../../assets/images/example-covers/heroes.jpg',
    },
    {
      title: "Hollywood's Bleeding",
      cover: '../../../assets/images/example-covers/postmalone.jpg',
    },
  ];

  musicData: {
    _id: string;
    refId: string;
    type: 'Album' | 'Playlist';
    name: string;
    releaseDate?: string;
    images: { url: string }[];
    artists: { name: string; id: string }[];
    totalTracks: number;
  }[] = [
    {
      _id: 'unknownId',
      refId: 'unknownRefId',
      type: 'Album',
      name: 'nadie sabe lo que pasará mañana',
      releaseDate: '06/05/2022',
      images: [{ url: '../../../assets/images/unveranosinti.png' }],
      artists: [{ name: 'Bad Bunny', id: 'unknownId' }],
      totalTracks: 23,
    },
  ];
}
