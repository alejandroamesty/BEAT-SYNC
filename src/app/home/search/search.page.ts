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
import {Location} from '@angular/common';

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
  ],
})
export class SearchPage implements OnInit {
  showSearchTracks: boolean = false;
  constructor(private router: Router, private _location: Location) {}

  ngOnInit() {}

  handleTrackCardPress() {
    this.router.navigate(['search-tracks']);
  }
}
