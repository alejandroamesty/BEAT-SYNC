import { Component, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { Location } from '@angular/common';
import { EventEmitter } from '@angular/core';
import { SearchInputComponent } from 'src/components/search-input/search-input.component';
import { ArtistListComponent } from 'src/components/artist-list/artist-list.component';

@Component({
  selector: 'app-search-artists',
  templateUrl: './search-artists.page.html',
  styleUrls: ['./search-artists.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    SearchInputComponent,
    ArtistListComponent,
  ],
})
export class SearchArtistsPage implements OnInit {
  @Output() onCancel: EventEmitter<void> = new EventEmitter<void>();

  artistItems: any[] = [];

  filteredArtists: any[] = [];
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
          this.filteredArtists = [];
          return;
        }
        fetch(
          `https://beatsyncserver.onrender.com/search/Artist?filter=${this.searchTerm}&skip=0`,
          {
            method: 'GET',
          }
        )
          .then((response) => response.json())
          .then((data) => {
            console.log('Success:', data);
            this.artistItems = data;

            this.filteredArtists = this.artistItems.filter((item) =>
              item.name.toLowerCase().includes(this.searchTerm.toLowerCase())
            );
          });
      } catch (error) {
        console.error(error);
      }
    }, 1500);
  }
}
