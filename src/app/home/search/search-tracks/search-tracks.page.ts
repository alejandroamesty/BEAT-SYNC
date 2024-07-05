import { Component, OnInit, Output, ViewChild, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
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
    CommonModule,
    FormsModule,
    SearchInputComponent,
    MusicListComponent,
    CustomModalComponent,
    ListComponent,
    SearchInputComponent,
    IonicModule,
  ],
})
export class SearchTracksPage implements OnInit {
  @Output() onCancel: EventEmitter<void> = new EventEmitter<void>();

  isModalVisible: boolean = false;

  @ViewChild('modalContent', { static: true }) modalContent!: TemplateRef<any>;

  musicItems: MusicItem[] = [];
  filteredMusic: MusicItem[] = [];
  searchTerm: string = '';
  skip: number = 0;

  filteredItems: { id: number; name: string; checked: boolean }[] = [];
  playlists: { id: number; name: string; checked: boolean }[] = [
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

  sortOrder: 'recent' | 'oldest' = 'recent';

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
    this.loadTracks();
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

  updateFilteredItems(
    updatedItems: { id: number; name: string; checked: boolean }[]
  ) {
    this.filteredItems = updatedItems;
  }

  async onSearchTermChanged(searchTerm: string) {
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
        `https://beatsyncserver.onrender.com/search/TracksByName?filter=${this.searchTerm}&skip=${this.skip}`,
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
      this.applySorting();
    } catch (error) {
      console.error('Error:', error);
    }
  }

  applySorting() {
    if (this.sortOrder === 'recent') {
      this.filteredMusic = this.musicItems.slice().sort((a, b) => {
        return (
          new Date(b.release_date).getTime() -
          new Date(a.release_date).getTime()
        );
      });
    } else if (this.sortOrder === 'oldest') {
      this.filteredMusic = this.musicItems.slice().sort((a, b) => {
        return (
          new Date(a.release_date).getTime() -
          new Date(b.release_date).getTime()
        );
      });
    }
  }

  loadMoreTracks() {
    this.skip += 10;
    this.loadTracks();
  }
}
