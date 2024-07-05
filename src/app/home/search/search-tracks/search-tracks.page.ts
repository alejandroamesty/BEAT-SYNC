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
  templateUrl: './search-tracks.page.html',
  styleUrls: ['./search-tracks.page.scss'],
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
export class SearchTracksPage implements OnInit {
  @Output() onCancel: EventEmitter<void> = new EventEmitter<void>();

  musicItems: MusicItem[] = [];

  filteredMusic: MusicItem[] = [];
  searchTerm: string = '';

  constructor(private _location: Location) {}

  ngOnInit() {}

  backClicked() {
    this._location.back();
  }

  private searchTimeout: any;

  async onSearchTermChanged(searchTerm: string) {
    this.searchTerm = searchTerm;
    clearTimeout(this.searchTimeout);
    this.searchTimeout = setTimeout(() => {
      try {
        if (this.searchTerm === '') {
          this.filteredMusic = [];
          return;
        }
        fetch(
          `https://beatsyncserver.onrender.com/search/TracksByName?filter=${this.searchTerm}&skip=0`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )
          .then((response) => response.json())
          .then((data) => {
            console.log('Success:', data);
            this.musicItems = data;
            if (this.searchTerm.trim() === '') {
              this.filteredMusic = [];
            } else {
              this.filteredMusic = this.musicItems.filter((item) =>
                item.name.toLowerCase().includes(this.searchTerm.toLowerCase())
              );
            }
          });
      } catch (error) {
        console.error('Error:', error);
      }
    }, 1500);
  }
}
