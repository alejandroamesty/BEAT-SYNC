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
  user: string = 'Alejandro';
  rightButtonCaption: string = '';
  rightButtonIcon: string = '';

  isModalVisible: boolean = false;

  @ViewChild('modalContent', { static: true }) modalContent!: TemplateRef<any>;

  @Output() removeSongs: EventEmitter<void> = new EventEmitter<void>();
  @Output() uploadSongs: EventEmitter<void> = new EventEmitter<void>();

  musicItems: MusicItem[] = [
    {
      cover_img: ['../../../assets/images/unveranosinti.png'],
      name: 'Sweet Dreams',
      artists: ['Artist 1', 'Artist 2'],
      explicit: true,
      type: 'Song',
      release_date: '14-10-2010',
      refId: '2',
      popularity: 5,
    },
    {
      cover_img: ['../../../assets/images/unveranosinti.png'],
      name: 'Sweet Nothing',
      artists: ['Artist 4', 'Artist 5'],
      explicit: false,
      type: 'Song',
      release_date: '14-10-2010',
      refId: '2',
      popularity: 5,
    },
    {
      cover_img: ['../../../assets/images/unveranosinti.png'],
      name: 'Safety Net',
      artists: ['Artist 3', 'Artist 6'],
      explicit: true,
      type: 'Song',
      release_date: '14-10-2010',
      refId: '2',
      popularity: 5,
    },
    {
      cover_img: ['../../../assets/images/unveranosinti.png'],
      name: 'Songs For You',
      artists: ['Artist 4', 'Artist 5'],
      explicit: false,
      type: 'Song',
      release_date: '14-10-2010',
      refId: '2',
      popularity: 5,
    },
    {
      cover_img: ['../../../assets/images/unveranosinti.png'],
      name: 'Sweet Dreams',
      artists: ['Artist 1', 'Artist 2'],
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
    {
      refId: '2',
      title: 'Track Two',
      url: null,
      cover: '../../../assets/images/album-cover2.png',
      releaseDate: '2021-02-01',
      duration_ms: 200000,
      disc_number: 1,
      number: 2,
      album: 'Album Two',
      albumRefId: 'album2',
      artists: [{ name: 'Artist C', id: 'artist3' }],
      genres: ['Rock'],
      liked: false,
    },
    {
      refId: '3',
      title: 'Track Three',
      url: null,
      cover: '../../../assets/images/album-cover3.png',
      releaseDate: '2021-03-01',
      duration_ms: 240000,
      disc_number: 1,
      number: 3,
      album: 'Album Three',
      albumRefId: 'album3',
      artists: [{ name: 'Artist D', id: 'artist4' }],
      genres: ['Jazz', 'Blues'],
      liked: true,
    },
    {
      refId: '4',
      title: 'Track Four',
      url: null,
      cover: '../../../assets/images/album-cover4.png',
      releaseDate: '2021-04-01',
      duration_ms: 210000,
      disc_number: 1,
      number: 4,
      album: 'Album Four',
      albumRefId: 'album4',
      artists: [{ name: 'Artist E', id: 'artist5' }],
      genres: ['Hip-Hop'],
      liked: false,
    },
    {
      refId: '5',
      title: 'Track Five',
      url: null,
      cover: '../../../assets/images/album-cover5.png',
      releaseDate: '2021-05-01',
      duration_ms: 230000,
      disc_number: 1,
      number: 5,
      album: 'Album Five',
      albumRefId: 'album5',
      artists: [{ name: 'Artist F', id: 'artist6' }],
      genres: ['Classical'],
      liked: true,
    },
  ];

  constructor(
    private _location: Location,
    private router: Router,
    private route: ActivatedRoute
  ) {}

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
      this.playlistCover = 'linear-gradient(90deg, #4233E8 0%, #ABAEF8 100%)';
      this.playlistTitle = 'Liked Songs';
      this.description =
        "Manage all the songs you've uploaded as an artist in one place.";
      this.rightButtonCaption = 'Remove songs';
      this.rightButtonIcon = '../../../assets/images/remove-trash.png';
    } else if (this.type === 'Catalog') {
      this.playlistCover = 'linear-gradient(90deg, #27AEAE 0%, #9BE8E3 100%)';
      this.playlistTitle = 'Your Songs';
      this.description = "Manage all the songs you've liked in one place.";
      this.rightButtonCaption = 'Upload';
      this.rightButtonIcon = '../../../assets/images/upload-playlist.png';
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
}
