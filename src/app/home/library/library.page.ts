import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { Router, NavigationEnd } from '@angular/router';
import { ControlButtonComponent } from 'src/components/control-button/control-button.component';
import { SearchInputComponent } from 'src/components/search-input/search-input.component';
import { MusicListComponent } from 'src/components/music-list/music-list.component';
import { PlaylistCardComponent } from 'src/components/playlist-card/playlist-card.component';
import { PlaylistItemComponent } from 'src/components/playlist-item/playlist-item.component';
import { CustomModalComponent } from 'src/components/custom-modal/custom-modal.component';
import { SimpleInputComponent } from 'src/components/simple-input/simple-input.component';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-library',
  templateUrl: './library.page.html',
  styleUrls: ['./library.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    ControlButtonComponent,
    SearchInputComponent,
    MusicListComponent,
    PlaylistCardComponent,
    PlaylistItemComponent,
    CustomModalComponent,
    SimpleInputComponent,
  ],
})
export class LibraryPage implements OnInit {
  title: string = '';
  description: string = '';
  yourSongs: any[] = [];
  likedSongs: any[] = [];
  userType: string = 'Listener';

  originalPlaylistList: {
    _id: string;
    title: string;
    description: string;
    user: string;
    songIds: Array<string>;
    songs: Array<any>;
  }[] = [];

  playlistList: Array<{
    _id: string;
    title: string;
    description: string;
    user: string;
    songIds: Array<string>;
    songs: Array<any>;
  }> = [];
  searchTerm: string = '';

  isModalVisible: boolean = false;

  @ViewChild('modalContent', { static: true }) modalContent!: TemplateRef<any>;

  constructor(private router: Router, private dataService: DataService) {
    this.userType = localStorage.getItem('userType') || 'Listener';
    this.likedSongs = JSON.parse(localStorage.getItem('likedSongs') || '[]');
    this.loadData();
  }

  loadData() {
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
          return response.json();
        } else {
          throw new Error('Failed to fetch');
        }
      })
      .then((data) => {
        this.originalPlaylistList = [];
        data.forEach((playlist: any) => {
          this.originalPlaylistList.push({
            _id: playlist._id,
            title: playlist.name,
            description: playlist.description,
            user: localStorage.getItem('userId') || 'UnknownUser',
            songIds: playlist.songIds,
            songs: playlist.songs,
          });
        });
        this.playlistList = [...this.originalPlaylistList];
      });

    fetch(
      `https://beatsyncserver.onrender.com/get/uploadedTracks?userId=${localStorage.getItem(
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
            this.yourSongs = data;
          });
        } else {
          console.error('Failed to fetch uploaded tracks');
        }
      })
      .catch((error) => {
        console.error(error);
      });

    fetch(
      `https://beatsyncserver.onrender.com/get/likedSongs?userId=${localStorage.getItem(
        'userId'
      )}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    ).then((response) => {
      if (response.status === 200) {
        response.json().then((data) => {
          this.likedSongs = data;
          const likedSongIds = data.map((song: any) => {
            return song.id;
          });
          localStorage.setItem('likedSongs', JSON.stringify(likedSongIds));
        });
      } else {
        console.error('Failed to fetch liked songs');
      }
    });
  }

  handleNavigation() {
    const currentUrl = this.router.url;
    const isLibraryPage = currentUrl.includes('/main-tab');
    if (isLibraryPage) {
      this.loadData();
    }
  }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.handleNavigation();
      }
    });
  }

  handleItemPress(item: any) {
    this.router.navigate(['playlist-detail'], {
      queryParams: {
        playlistId: item._id,
        playlistTitle: item.title,
        playlistDescription: item.description,
        playlistUser: item.user,
        songIds: item.songIds,
      },
    });
    this.dataService.changeSongs(item.songs);
    console.log('Music item pressed:', item.title);
  }

  onSearchTermChanged(searchTerm: string) {
    console.log(this.originalPlaylistList);
    this.searchTerm = searchTerm;

    if (this.searchTerm.trim() === '') {
      this.playlistList = [...this.originalPlaylistList];
    } else {
      this.playlistList = this.originalPlaylistList.filter((item) =>
        item.title.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }

  openLikedView() {
    this.dataService.changeSongs(this.likedSongs);
    this.router.navigate(['catalog-detail', 'Liked']);
  }

  openCatalogView() {
    this.dataService.changeSongs(this.yourSongs);
    this.router.navigate(['catalog-detail', 'Catalog']);
  }

  openModal() {
    this.isModalVisible = true;
  }

  closeModal() {
    this.isModalVisible = false;
  }

  handleTitleChange(title: string) {
    console.log(title);
    this.title = title;
  }

  handleDescriptionChange(description: string) {
    this.description = description;
  }

  handleCancel() {
    console.log('Cancel button clicked');
    this.closeModal();
  }
  fetching: Boolean = false;

  handleDone() {
    if (this.fetching) return;
    this.fetching = true;
    fetch('https://beatsyncserver.onrender.com/playlist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: localStorage.getItem('userId'),
        name: this.title,
        description: this.description,
        songIds: [],
      }),
    }).then((response) => {
      if (response.status === 200) {
        this.loadData();
        this.fetching = false;
      } else {
        this.fetching = false;
        console.log('Failed to create playlist');
      }
    });
    this.closeModal();
  }
}
