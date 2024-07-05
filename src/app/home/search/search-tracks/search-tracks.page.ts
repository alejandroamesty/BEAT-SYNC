import {
  Component,
  OnInit,
  Output,
  ViewChild,
  TemplateRef,
} from '@angular/core';
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
  selectedItem: any = {};

  filteredItems: {
    id: string;
    name: string;
    description: string;
    userId: string;
    songIds: string[];
    checked: boolean;
  }[] = [];
  playlists: {
    id: string;
    name: string;
    description: string;
    userId: string;
    songIds: string[];
    checked: boolean;
  }[] = [
    {
      id: 'default id',
      name: 'default name',
      description: 'default description',
      userId: 'default userId',
      songIds: ['default songIds'],
      checked: false,
    },
  ];

  sortOrder: 'recent' | 'oldest' = 'recent';

  constructor(private _location: Location) {}

  backClicked() {
    this._location.back();
  }

  private searchTimeout: any;
  fetching: Boolean = false;
  openModal() {
    if (this.fetching) return;
    fetch(
      `https://beatsyncserver.onrender.com/playlist?userId=${localStorage.getItem(
        'userId'
      )}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
      .then((response) => {
        if (response.status === 200) {
          response.json().then((data) => {
            this.playlists = data.map((item: any) => {
              return {
                id: item._id,
                name: item.name,
                description: item.description,
                userId: item.userId,
                songIds: item.songIds,
                checked: false,
              };
            });
            this.filteredItems = [...this.playlists];
            this.isModalVisible = true;
          });
        } else {
          console.error('Failed to get playlists');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  closeModal() {
    this.isModalVisible = false;
  }

  handleCancel() {
    console.log('Cancel button clicked');
    this.closeModal();
  }

  handleDone() {
    if (this.fetching) return;
    this.fetching = true;
    for (const playlist of this.filteredItems) {
      if (!playlist.checked) continue;
      if (playlist.songIds.includes(this.selectedItem.id)) continue;
      console.log(
        'playlistSongs:',
        playlist.songIds,
        'selectedItem:',
        this.selectedItem.id
      );
      fetch('https://beatsyncserver.onrender.com/playlist', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: playlist.id,
          userId: localStorage.getItem('userId'),
          name: playlist.name,
          description: playlist.description,
          songIds: [...playlist.songIds, this.selectedItem.id],
        }),
      })
        .then((response) => {
          if (response.status === 200) {
            console.log('Success:', response);
          } else {
            console.error('Failed to add song to playlist');
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
    this.fetching = false;
    this.closeModal();
  }

  onControlClick(event: any) {
    this.openModal();
    this.selectedItem = event;
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
    updatedItems: {
      id: string;
      name: string;
      description: string;
      userId: string;
      songIds: string[];
      checked: boolean;
    }[]
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
