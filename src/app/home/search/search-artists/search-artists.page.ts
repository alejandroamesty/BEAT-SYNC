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
  skip: number = 0;

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
      this.skip = 0;
      this.loadArtists();
    }, 1500);
  }

  async loadArtists() {
    if (this.searchTerm.trim() === '') {
      this.filteredArtists = [];
      return;
    }
    try {
      if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(this.searchTerm)) {
        console.log('Special characters found in search term');
        return;
      }
      const response = await fetch(
        `https://beatsyncserver.onrender.com/search/Artist?filter=${this.searchTerm}&skip=${this.skip}`,
        {
          method: 'GET',
        }
      );
      const data = await response.json();
      console.log('Success:', data);
      this.artistItems =
        this.skip === 0 ? data : [...this.artistItems, ...data];
      if (this.searchTerm.trim() === '') {
        this.filteredArtists = [];
      } else {
        this.filteredArtists = this.artistItems.filter((item) =>
          item.name.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
      }
    } catch (error) {
      console.error(error);
    }
  }

  loadMoreArtists() {
    this.skip += 10;
    this.loadArtists();
  }
}
