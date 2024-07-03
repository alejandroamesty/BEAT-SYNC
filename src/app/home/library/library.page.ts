import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { ControlButtonComponent } from 'src/components/control-button/control-button.component';
import { SearchInputComponent } from 'src/components/search-input/search-input.component';
import { MusicListComponent } from 'src/components/music-list/music-list.component';
import { PlaylistCardComponent } from 'src/components/playlist-card/playlist-card.component';
import { PlaylistItemComponent } from 'src/components/playlist-item/playlist-item.component';
import { CustomModalComponent } from 'src/components/custom-modal/custom-modal.component';
import { SimpleInputComponent } from 'src/components/simple-input/simple-input.component';

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
    SimpleInputComponent
  ],
})
export class LibraryPage implements OnInit {
  originalPlaylistList = [
    {
      cover: '../../../assets/images/unveranosinti.png',
      title: 'fav songs of 2023',
      user: 'Alejandro',
    },
    {
      cover: '../../../assets/images/unveranosinti.png',
      title: 'fav songs of 2024',
      user: 'Alejandro',
    },
    {
      cover: '../../../assets/images/unveranosinti.png',
      title: 'reggaetón viejo',
      user: 'Alejandro',
    },
    {
      cover: '../../../assets/images/unveranosinti.png',
      title: 'nostálgicas',
      user: 'Alejandro',
    },
    {
      cover: '../../../assets/images/unveranosinti.png',
      title: 'boda venezolana',
      user: 'Alejandro',
    },
  ];

  playlistList: Array<{ cover: string; title: string; user: string }> = [];
  searchTerm: string = '';

  isModalVisible: boolean = false;

  @ViewChild('modalContent', { static: true }) modalContent!: TemplateRef<any>;

  constructor(private router: Router) {}

  ngOnInit() {
    this.playlistList = [...this.originalPlaylistList];
  }

  handleItemPress(title: string) {
    this.router.navigate(['playlist-detail']);
    console.log('Music item pressed:', title);
  }

  onSearchTermChanged(searchTerm: string) {
    this.searchTerm = searchTerm;

    if (this.searchTerm.trim() === '') {
      this.playlistList = [...this.originalPlaylistList];
    } else {
      this.playlistList = this.originalPlaylistList.filter((item) =>
        item.title.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
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
