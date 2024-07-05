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
  playlistCover: string = '../../../assets/images/unveranosinti.png';
  playlistTitle: string = 'fav songs of 2024';
  user: string = 'Alejandro';
  description: string = '(hasta ahora) / ordenadas por lanzamiento';

  isModalVisible: boolean = false;

  @ViewChild('modalContent', { static: true }) modalContent!: TemplateRef<any>;

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
  ];

  ngOnInit(): void {}

  constructor(private _location: Location) {}

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

  handleCancel() {
    console.log('Cancel button clicked');
    this.closeModal();
  }

  handleDone() {
    console.log('Done button clicked');
    this.closeModal();
  }
}
