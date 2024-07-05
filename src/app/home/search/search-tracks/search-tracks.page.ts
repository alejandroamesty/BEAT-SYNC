import { Component, OnInit, Output, ViewChild, TemplateRef } from '@angular/core';
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
import { CustomModalComponent } from 'src/components/custom-modal/custom-modal.component';
import { ListComponent } from 'src/components/list/list.component';

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
    CustomModalComponent,
    ListComponent,
    SearchInputComponent,
  ],
})

export class SearchTracksPage implements OnInit {
  @Output() onCancel: EventEmitter<void> = new EventEmitter<void>();

  isModalVisible: boolean = false;

  @ViewChild('modalContent', { static: true }) modalContent!: TemplateRef<any>;

  musicItems: MusicItem[] = [];

  filteredMusic: MusicItem[] = [];
  filteredItems: { id: number, name: string, checked: boolean }[] = [];
  searchTerm: string = '';
  filterTerm: string = '';

  playlists: { id: number, name: string, checked: boolean }[] = [
    { id: 1, name: 'Chill Vibes', checked: true },
    { id: 2, name: 'Workout Mix', checked: true },
    { id: 3, name: 'Party Time', checked: true },
    { id: 4, name: 'Focus Beats', checked: true },
    { id: 5, name: 'Classical Essentials', checked: true },
    { id: 6, name: 'Jazz & Blues', checked: true },
    { id: 7, name: 'Rock Classics', checked: true },
    { id: 8, name: 'Hip Hop Hits', checked: true },
    { id: 9, name: 'Country Roads', checked: true },
    { id: 10, name: 'Pop Favourites', checked: true },
    { id: 11, name: 'Indie Mix', checked: true },
    { id: 12, name: 'Metal Mayhem', checked: true },
  ];

  constructor(private _location: Location) {}

  backClicked() {
    this._location.back();
  }

  private searchTimeout: any;

  openModal() {
    this.isModalVisible = true;
  }

  closeModal() {
    this.isModalVisible = false;
  }

  handleCancel() {
    console.log('Cancel button clicked');
    this.closeModal();
  }

  handleDone() {
    console.log('Done button clicked');
    this.closeModal();
  }

  onControlClick() {
    this.openModal();
    console.log('Control button clicked from Search');
  }

  ngOnInit() {
    this.filteredItems = [...this.playlists];
  }

  onListSearchTermChanged(searchTerm: string) {
    if (searchTerm.trim() === '') {
      this.filteredItems = [...this.playlists];
    } else {
      this.filteredItems = this.playlists.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  }  

  updateFilteredItems(updatedItems: { id: number; name: string; checked: boolean }[]) {
    this.filteredItems = updatedItems;
  }

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
    }, 500);
  }
}
