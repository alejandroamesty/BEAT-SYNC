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
  ],
})
export class SearchTracksPage implements OnInit {
  @Output() onCancel: EventEmitter<void> = new EventEmitter<void>();
  constructor(private _location: Location) {}

  ngOnInit() {}

  backClicked() {
    this._location.back();
  }
}
