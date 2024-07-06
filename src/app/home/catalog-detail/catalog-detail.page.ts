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

  musicItems: MusicItem[] = [
    {
      cover_img: ['../../../assets/images/unveranosinti.png'],
      name: 'Sweet Dreams',
      artists: [{ name: 'Artist 1', id: 'artist1' }],
      explicit: true,
      type: 'Song',
      release_date: '14-10-2010',
      refId: '2',
      popularity: 5,
    },
    {
      cover_img: ['../../../assets/images/unveranosinti.png'],
      name: 'Sweet Nothing',
      artists: [{ name: 'Artist 2', id: 'artist2' }],
      explicit: false,
      type: 'Song',
      release_date: '14-10-2010',
      refId: '2',
      popularity: 5,
    },
    {
      cover_img: ['../../../assets/images/unveranosinti.png'],
      name: 'Safety Net',
      artists: [{ name: 'Artist 3', id: 'artist3' }],
      explicit: true,
      type: 'Song',
      release_date: '14-10-2010',
      refId: '2',
      popularity: 5,
    },
    {
      cover_img: ['../../../assets/images/unveranosinti.png'],
      name: 'Songs For You',
      artists: [
        { name: 'Artist 4', id: 'artist4' },
        { name: 'Artist 5', id: 'artist5' },
      ],
      explicit: false,
      type: 'Song',
      release_date: '14-10-2010',
      refId: '2',
      popularity: 5,
    },
    {
      cover_img: ['../../../assets/images/unveranosinti.png'],
      name: 'Sweet Dreams',
      artists: [{ name: 'Artist 1', id: 'artist1' }],
      explicit: true,
      type: 'Song',
      release_date: '14-10-2010',
      refId: '2',
      popularity: 5,
    },
  ];

  yourTracks: Track[] = [
    {
      refId: '1',
      title: 'Track One',
      url: null,
      cover: '../../../assets/images/album-cover1.png',
      releaseDate: '2021-01-01',
      duration_ms: 180000,
      disc_number: 1,
      number: 1,
      album: 'Album One',
      albumRefId: 'album1',
      artists: [
        { name: 'Artist A', id: 'artist1' },
        { name: 'Artist B', id: 'artist2' },
      ],
      genres: ['Pop', 'Dance'],
      liked: true,
    },
  ];

  constructor(
    private _location: Location,
    private router: Router,
    private route: ActivatedRoute,
    private dataService: DataService
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
            songUrl: string;
            track_number: number;
            userId: string;
            explicit: boolean;
            _id?: string;
          }[]
        ) => {
          this.musicItems = songs.map((song) => {
            return {
              _id: song._id,
              refId: song.id,
              name: song.name,
              cover_img: [song.cover_img?.[0]?.url || ''],
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
}
