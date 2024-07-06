import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { Location } from '@angular/common';
import { ControlButtonComponent } from 'src/components/control-button/control-button.component';
import { SimpleButtonComponent } from 'src/components/simple-button/simple-button.component';
import { MusicListComponent } from 'src/components/music-list/music-list.component';
import { MusicItem } from 'src/components/music-list/music.model';
import { CustomModalComponent } from 'src/components/custom-modal/custom-modal.component';
import { SimpleInputComponent } from 'src/components/simple-input/simple-input.component';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-playlist-detail',
  templateUrl: './playlist-detail.page.html',
  styleUrls: ['./playlist-detail.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    ControlButtonComponent,
    SimpleButtonComponent,
    MusicListComponent,
    CustomModalComponent,
    SimpleInputComponent,
  ],
})
export class PlaylistDetailPage implements OnInit {
  playlistCover: string = '../../../assets/images/your-songs.png';
  playlistTitle: string = 'fav songs of 2024';
  user: string = '';
  description: string = '(hasta ahora) / ordenadas por lanzamiento';
  fetching: Boolean = false;

  newTitle: string = '';
  newDescription: string = '';

  isModalVisible: boolean = false;

  @ViewChild('modalContent', { static: true }) modalContent!: TemplateRef<any>;

  musicItems: MusicItem[] = [];

  ngOnInit(): void {}
  id: string = 'default id';
  playlistUser: string = 'Alejandro';
  songIds: Array<string> = [];
  constructor(
    private _location: Location,
    private route: ActivatedRoute,
    private dataService: DataService
  ) {
    this.user = localStorage.getItem('name') || '';
    this.route.queryParams.subscribe((params) => {
      this.id = params['playlistId'] || 'default id';
      this.playlistTitle = params['playlistTitle'];
      this.description = params['playlistDescription'] || '';
      this.playlistUser = params['user'] || 'Alejandro';
      this.songIds = params['songIds'] || [];
    });

    this.dataService.currentSongs.subscribe((songs) => {
      const newSongList: Array<any> = [];
      songs.forEach((song: any) => {
        newSongList.push({
          cover_img:
            song.cover_img || '../../../assets/images/unveranosinti.png',
          name: song.name,
          artists: song.artists,
          explicit: song.explicit,
          type: 'Song',
          release_date: song.release_date,
          refId: song.id,
          popularity: song.popularity,
          url: song.url,
        });
      });
      //sorted by release date
      this.musicItems = newSongList.sort((a, b) => {
        return (
          new Date(b.release_date).getTime() -
          new Date(a.release_date).getTime()
        );
      });
    });
  }

  handlePlayClick() {
    console.log('Play button clicked');
  }

  handleLikeClick(track: any) {
    console.log(`Liked track: ${track.name}`);
  }

  closePage() {
    this._location.back();
    console.log('Close button clicked');
  }

  deletePlaylist() {
    if (this.id === 'default id') {
      this._location.back();
      return;
    }
    if (this.fetching) return;
    this.fetching = true;
    fetch(`https://beatsyncserver.onrender.com/playlist/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: this.id,
        userId: localStorage.getItem('userId'),
      }),
    })
      .then((response) => {
        if (response.status === 200) {
          console.log('Playlist deleted');
          this.fetching = false;
          this._location.back();
        } else {
          this.fetching = false;
          throw new Error('Failed to delete playlist');
        }
      })
      .catch((error) => {
        this.fetching = false;
        console.error(error);
      });
  }

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
    if (this.fetching) return;
    this.fetching = true;

    fetch(`https://beatsyncserver.onrender.com/playlist/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: this.id,
        name: this.newTitle,
        description: this.newDescription,
        userId: localStorage.getItem('userId'),
        songIds: this.songIds,
      }),
    })
      .then((response) => {
        if (response.status === 200) {
          console.log('Playlist updated');
          this.fetching = false;
          this.playlistTitle = this.newTitle;
          this.description = this.newDescription;
          this.closeModal();
        } else {
          this.fetching = false;
          throw new Error('Failed to update playlist');
        }
      })
      .catch((error) => {
        this.fetching = false;
        console.error(error);
      });
    this.closeModal();
  }

  handleTitleChange(event: string) {
    this.newTitle = event;
  }

  handleDescriptionChange(event: string) {
    this.newDescription = event;
  }

  handleItemPress(event: any) {
    if (this.fetching) return;
    this.fetching = true;
    this.songIds = this.songIds.filter((id) => id !== event.refId);

    fetch('https://beatsyncserver.onrender.com/playlist', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: this.id,
        userId: localStorage.getItem('userId'),
        name: this.playlistTitle,
        description: this.description,
        songIds: [...this.songIds],
      }),
    })
      .then((response) => {
        if (response.status === 200) {
          console.log('Success:', response);
          const newSongs: any[] = [];
          this.musicItems.forEach((song) => {
            if (song.refId !== event.refId) {
              newSongs.push(song);
            }
          });
          this.musicItems = newSongs;
          this.fetching = false;
        } else {
          this.fetching = false;
          console.error('Failed to delete song from playlist');
        }
      })
      .catch((error) => {
        this.fetching = false;
        console.error('Error:', error);
      });
  }
}
