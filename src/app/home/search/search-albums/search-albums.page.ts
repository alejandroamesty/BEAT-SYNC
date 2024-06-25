import { Component, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { SearchInputComponent } from 'src/components/search-input/search-input.component';
import { MusicListComponent } from 'src/components/music-list/music-list.component';
import { MusicItem } from 'src/components/music-list/music.model';
import { EventEmitter } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-search-albums',
  templateUrl: './search-albums.page.html',
  styleUrls: ['./search-albums.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    SearchInputComponent,
    MusicListComponent,
  ],
})
export class SearchAlbumsPage implements OnInit {
  @Output() onCancel: EventEmitter<void> = new EventEmitter<void>();

  musicItems: MusicItem[] = [
    {
      cover: '../../../assets/images/unveranosinti.png',
      title: 'Un Verano Sin Ti',
      artists: ['Bad Bunny'],
      explicit: true,
      type: 'Album',
    },
    {
      cover: '../../../assets/images/unveranosinti.png',
      title: 'MOTOMAMI',
      artists: ['ROSALÍA'],
      explicit: true,
      type: 'Album',
    },
    {
      cover: '../../../assets/images/unveranosinti.png',
      title: 'OASIS',
      artists: ['J Balvin', 'Bad Bunny'],
      explicit: true,
      type: 'Album',
    },
    {
      cover: '../../../assets/images/unveranosinti.png',
      title: 'MAÑANA SERÁ BONITO',
      artists: ['KAROL G'],
      explicit: false,
      type: 'Album',
    },
  ];

  filteredMusic: MusicItem[] = [];
  searchTerm: string = '';

  constructor(private _location: Location) {}

  ngOnInit() {}

  backClicked() {
    this._location.back();
  }

  onSearchTermChanged(searchTerm: string) {
    this.searchTerm = searchTerm;
    if (this.searchTerm.trim() === '') {
      this.filteredMusic = [];
    } else {
      this.filteredMusic = this.musicItems.filter((item) =>
        item.title.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }
}
