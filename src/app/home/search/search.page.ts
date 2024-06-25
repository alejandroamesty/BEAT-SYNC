import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
} from '@ionic/angular/standalone';
import { CategoryCardComponent } from 'src/components/category-card/category-card.component';
import { SearchTracksPage } from './search-tracks/search-tracks.page';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { SearchAlbumsPage } from './search-albums/search-albums.page';
import { SearchArtistsPage } from './search-artists/search-artists.page';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
  standalone: true,
  imports: [
    IonButtons,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    CategoryCardComponent,
    SearchTracksPage,
    SearchAlbumsPage,
    SearchArtistsPage
  ],
})
export class SearchPage implements OnInit {
  showSearchTracks: boolean = false;
  showSearchAlbums: boolean = false;
  showSearchArtists: boolean = false;
  constructor(private router: Router, private _location: Location) {}

  ngOnInit() {}

  handleTrackCardPress() {
    this.router.navigate(['search-tracks']);
  }

  handleAlbumCardPress() {
    this.router.navigate(['search-albums']);
  }

  handleArtistCardPress() {
    this.router.navigate(['search-artists']);
  }
}
