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
  selector: 'app-search-tracks',
  templateUrl: './search-tracks-by-genre.page.html',
  styleUrls: ['./search-tracks-by-genre.page.scss'],
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
export class SearchTracksByGenrePage implements OnInit {
  @Output() onCancel: EventEmitter<void> = new EventEmitter<void>();

  musicItems: MusicItem[] = [
    {
      cover: '../../../assets/images/unveranosinti.png',
      title: 'Sweet Dreams',
      artists: ['Artist 1', 'Artist 2'],
      genre: 'Pop',
      explicit: true,
      type: 'Song',
    },
    {
      cover: '../../../assets/images/unveranosinti.png',
      title: 'Sweet Nothing',
      artists: ['Artist 4', 'Artist 5'],
      explicit: false,
      genre: 'Pop',
      type: 'Song',
    },
    {
      cover: '../../../assets/images/unveranosinti.png',
      title: 'Safety Net',
      artists: ['Artist 3', 'Artist 6'],
      explicit: true,
      genre: 'R&B',
      type: 'Song',
    },
    {
      cover: '../../../assets/images/unveranosinti.png',
      title: 'Songs For You',
      artists: ['Artist 4', 'Artist 5'],
      explicit: false,
      genre: 'R&B',
      type: 'Song',
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
        item.genre?.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }
}
