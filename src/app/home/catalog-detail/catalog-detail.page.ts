import {
  Component,
  OnInit,
  ViewChild,
  TemplateRef,
  Output,
  EventEmitter,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { ControlButtonComponent } from 'src/components/control-button/control-button.component';
import { SimpleButtonComponent } from 'src/components/simple-button/simple-button.component';
import { MusicListComponent } from 'src/components/music-list/music-list.component';
import { MusicItem } from 'src/components/music-list/music.model';
import { CustomModalComponent } from 'src/components/custom-modal/custom-modal.component';
import { SimpleInputComponent } from 'src/components/simple-input/simple-input.component';
import {
  AlbumTracklistComponent,
  Track,
} from 'src/components/album-tracklist/album-tracklist.component';
import { DataService } from 'src/app/services/data.service';
import { MusicPlayerService } from '../music-player/music-player.service';

@Component({
  selector: 'app-catalog-detail',
  templateUrl: './catalog-detail.page.html',
  styleUrls: ['./catalog-detail.page.scss'],
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
    AlbumTracklistComponent,
  ],
})
export class CatalogDetailPage implements OnInit {
  type: 'Liked' | 'Catalog' = 'Catalog';
  playlistCover: string = '';
  playlistTitle: string = '';
  description: string = '';
  user: string = '';
  rightButtonCaption: string = '';
  rightButtonIcon: string = '';
  fetching: boolean = false;
  isModalVisible: boolean = false;

  @ViewChild('modalContent', { static: true }) modalContent!: TemplateRef<any>;

  @Output() removeSongs: EventEmitter<void> = new EventEmitter<void>();
  @Output() uploadSongs: EventEmitter<void> = new EventEmitter<void>();

  musicItems: MusicItem[] = [];

  yourTracks: Track[] = [];

  constructor(
    private _location: Location,
    private router: Router,
    private route: ActivatedRoute,
    private dataService: DataService,
    private musicPlayerService: MusicPlayerService
  ) {
    this.user = localStorage.getItem('name') || '';
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const type = params.get('type') as 'Liked' | 'Catalog';
      if (type) {
        this.type = type;
        this.initializeProperties();
      }
    });
  }

  initializeProperties() {
    if (this.type === 'Liked') {
      console.log('Liked songs');
      this.playlistCover = 'linear-gradient(90deg, #4233E8 0%, #ABAEF8 100%)';
      this.playlistTitle = 'Liked Songs';
      this.description =
        "Manage all the songs you've liked as an artist in one place.";
      this.rightButtonCaption = 'Remove songs';
      this.rightButtonIcon = '../../../assets/images/remove-trash.png';
      this.dataService.currentSongs.subscribe(
        (
          songs: {
            album: string;
            album_refId: string;
            artists: { name: string; id: string }[]; // Array of artist names, must conver to array of artist objects later
            cover_img: any[];
            disc_number: number;
            duration_ms: number;
            genres: string[];
            id: string;
            name: string;
            popularity: number;
            release_date: string;
            url: string;
            track_number: number;
            userId: string;
            explicit: boolean;
            _id?: string;
          }[]
        ) => {
          this.musicItems = songs.map((song) => {
            console.log(song);
            return {
              _id: song._id,
              refId: song.id,
              name: song.name,
              cover_img: song.cover_img,
              url: song.url,
              release_date: song.release_date,
              duration_ms: song.duration_ms,
              disc_number: song.disc_number,
              artists: song.artists,
              genres: song.genres,
              explicit: song.explicit,
              popularity: song.popularity,
              type: 'Song',
            };
          });
        }
      );
    } else if (this.type === 'Catalog') {
      this.playlistCover = 'linear-gradient(90deg, #27AEAE 0%, #9BE8E3 100%)';
      this.playlistTitle = 'Your Songs';
      this.description = "Manage all the songs you've liked in one place.";
      this.rightButtonCaption = 'Upload';
      this.rightButtonIcon = '../../../assets/images/upload-playlist.png';
      this.dataService.currentSongs.subscribe(
        (
          songs: {
            album: string;
            album_refId: string;
            artists: string[]; // Array of artist names, must conver to array of artist objects later
            cover_img: any[];
            disc_number: number;
            duration_ms: number;
            genres: string[];
            id: string;
            name: string;
            popularity: number;
            release_date: string;
            songUrl: string;
            track_number: number;
            userId: string;
            _id?: string;
          }[]
        ) => {
          this.yourTracks = songs.map((song) => {
            return {
              _id: song._id,
              refId: song.id,
              title: song.name,
              url: song.songUrl,
              cover: song.cover_img[0],
              releaseDate: song.release_date,
              duration_ms: song.duration_ms,
              disc_number: song.disc_number,
              number: song.track_number,
              album: song.album,
              albumRefId: song.album_refId,
              artists: song.artists.map((artist) => {
                return { name: artist, id: '' };
              }),
              genres: song.genres,
              liked: false,
              explicit: false,
            };
          });
        }
      );
    }
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
    this._location.back();
  }

  openModal() {
    this.isModalVisible = true;
  }

  closeModal() {
    this.isModalVisible = false;
  }

  removeSongsClick() {
    console.log('Remove songs button clicked');
    this.removeSongs.emit();
  }

  uploadSongsClick() {
    this.router.navigate(['upload-music']);
  }

  handleCancel() {
    console.log('Cancel button clicked');
    this.closeModal();
  }

  handleDone() {
    console.log('Done button clicked');
    this.closeModal();
  }

  handleItemPress(item: any) {
    if (this.fetching) return;
    this.fetching = true;
    fetch('https://beatsyncserver.onrender.com/toggleLike', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: localStorage.getItem('userId'),
        songRefId: item.refId,
      }),
    }).then((response) => {
      if (response.status === 200) {
        this.fetching = false;
        this.musicItems = this.musicItems.filter(
          (song) => song.refId !== item.refId
        );
        const likedSongs = localStorage.getItem('likedSongs');
        if (likedSongs) {
          const likedSongsArray = JSON.parse(likedSongs);
          const newLikedSongs = likedSongsArray.filter(
            (songId: string) => songId !== item.refId
          );
          localStorage.setItem('likedSongs', JSON.stringify(newLikedSongs));
        }
        response.json().then((data) => {
          console.log(data);
        });
      }
    });
  }

  playMusic(item: any) {
    const songURL = item.url;
    if (songURL) {
      this.musicPlayerService.stop();
      this.musicPlayerService.resetAudio();

      this.musicPlayerService.initAudio(songURL);
      this.musicPlayerService.play();
      this.musicPlayerService.updateSongData({
        coverImageUrl: item.cover_img?.[0].url,
        albumTitle: item.album,
        songTitle: item.name,
        artists: item.artists.map((artist: any) => artist.name).join(', '),
      });
      this.musicPlayerService.queueNextSong(item.id, item.genres[0]);
    } else {
      console.error('No song URL available for playback');
    }
  }

  onItemPlay(item: any) {
    this.playMusic(item);
  }
}
