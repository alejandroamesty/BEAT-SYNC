import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { ControlButtonComponent } from 'src/components/control-button/control-button.component';
import { SearchInputComponent } from 'src/components/search-input/search-input.component';
import { MusicListComponent } from 'src/components/music-list/music-list.component';

@Component({
  selector: 'app-library',
  templateUrl: './library.page.html',
  styleUrls: ['./library.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    ControlButtonComponent,
    SearchInputComponent,
    MusicListComponent,
  ],
})
export class LibraryPage implements OnInit {
  musicItems = [
    {
      cover: '../../../assets/images/unveranosinti.png',
      title: 'Sweet Dreams',
      user: 'Alejandro',
      type: 'Playlist',
    },
    {
      cover: '../../../assets/images/unveranosinti.png',
      title: 'Sweet Nothing',
      user: 'Alejandro',
      type: 'Playlist',
    },
    {
      cover: '../../../assets/images/unveranosinti.png',
      title: 'Sweet Nothing',
      user: 'Alejandro',
      type: 'Playlist',
    },
    {
      cover: '../../../assets/images/unveranosinti.png',
      title: 'Sweet Nothing',
      user: 'Alejandro',
      type: 'Playlist',
    },
    {
      cover: '../../../assets/images/unveranosinti.png',
      title: 'Sweet Nothing',
      user: 'Alejandro',
      type: 'Playlist',
    },
  ];

  constructor() {}

  ngOnInit() {}
}
