import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent } from '@ionic/angular/standalone';
import { ControlButtonComponent } from 'src/components/control-button/control-button.component';
import { Location } from '@angular/common';
import { MusicReelComponent, MusicData } from 'src/components/music-reel/music-reel.component';

@Component({
  selector: 'app-artist-detail',
  templateUrl: './artist-detail.page.html',
  styleUrls: ['./artist-detail.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, ControlButtonComponent, MusicReelComponent],
})
export class ArtistDetailPage implements OnInit {
  artistImage: string = '../../../assets/images/badbunny.jpeg';
  name: string = 'Bad Bunny';
  followerCount: string = '67,123,748';

  musicData: MusicData[] = [
    {
      title: 'nadie sabe lo que pasará mañana',
      cover: '../../../assets/images/unveranosinti.png',
      type: 'album',
      releaseDate: '06/05/2022',
      songCount: 23,
    },
    {
      title: 'Un Verano Sin Ti',
      cover: '../../../assets/images/unveranosinti.png',
      type: 'album',
      releaseDate: '06/05/2022',
      songCount: 23,
    },
    {
      title: 'EL ÚLTIMO TOUR DEL MUNDO',
      cover: '../../../assets/images/unveranosinti.png',
      type: 'album',
      releaseDate: '06/05/2022',
      songCount: 23,
    },
    {
      title: 'LAS QUE NO IBAN A SALIR',
      cover: '../../../assets/images/unveranosinti.png',
      type: 'album',
      releaseDate: '06/05/2022',
      songCount: 23,
    },
  ];

  constructor(private _location: Location) {}

  ngOnInit() {}

  closePage() {
    this._location.back();
    console.log('Close button clicked');
  }
}
