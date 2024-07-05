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

  musicItems: MusicItem[] = [];

  filteredMusic: MusicItem[] = [];
  searchTerm: string = '';
  skip: number = 0;

  constructor(private _location: Location) {}

  ngOnInit() {}

  backClicked() {
    this._location.back();
  }

  private searchTimeout: any;

  onSearchTermChanged(searchTerm: string) {
    this.searchTerm = searchTerm;
    clearTimeout(this.searchTimeout);
    this.searchTimeout = setTimeout(() => {
      this.skip = 0;
      this.loadTracks();
    }, 1500);
  }

  async loadTracks() {
    if (this.searchTerm.trim() === '') {
      this.filteredMusic = [];
      return;
    }
    try {
      const response = await fetch(
        `https://beatsyncserver.onrender.com/search/TracksByGenre?filter=${this.searchTerm}&skip=${this.skip}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const data = await response.json();
      console.log('Success:', data);
      this.musicItems = this.skip === 0 ? data : [...this.musicItems, ...data];
      if (this.searchTerm.trim() === '') {
        this.filteredMusic = [];
      } else {
        this.filteredMusic = this.musicItems.filter(
          (item) =>
            item.genres?.some((genre) =>
              genre.toLowerCase().includes(this.searchTerm.toLowerCase())
            )
        );
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  loadMoreTracks() {
    this.skip += 10;
    this.loadTracks();
  }
}
