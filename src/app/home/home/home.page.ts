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

  musicData: MusicData[] = [
    {
      title: 'fav songs of 2024',
      cover: '../../../assets/images/example-covers/volume.webp',
      type: 'playlist',
      description: 'ordenadas por lanzamiento',
    },
    {
      title: 'reggaetón viejo',
      cover: '../../../assets/images/example-covers/daddyyankee.jpg',
      type: 'playlist',
      description: 'Daddy Yankee y más',
    },
    {
      title: 'nostálgicas',
      cover: '../../../assets/images/example-covers/danny.jpg',
      type: 'playlist',
      description: 'Danny Ocean, Feid y más',
    },
    {
      title: 'fav songs of 2023',
      cover: '../../../assets/images/badbunny.jpeg',
      type: 'playlist',
      description: 'ordenadas por lanzamiento',
    },
  ];
}
