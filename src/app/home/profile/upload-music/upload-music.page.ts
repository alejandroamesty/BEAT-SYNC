import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { Location } from '@angular/common';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { BorderInputComponent } from 'src/components/border-input/border-input.component';
import { ControlButtonComponent } from 'src/components/control-button/control-button.component';
import { SaveButtonComponent } from 'src/components/save-button/save-button.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-upload-music',
  templateUrl: './upload-music.page.html',
  styleUrls: ['./upload-music.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    BorderInputComponent,
    ControlButtonComponent,
    SaveButtonComponent,
    HttpClientModule,
  ],
})
export class UploadMusicPage implements OnInit {
  defaultTitle: string = 'Choose a file to upload';
  defaultSubtitle: string = 'Select an .mp3 file';
  selectedFile: File | null = null;
  title: string = '';
  artists: string = '';
  genres: string = '';

  constructor(private _location: Location) {}

  ngOnInit() {}

  uploadingTrack: boolean = false;

  async goBack() {
    this._location.back();
  }

  async handleSave() {
    if (this.selectedFile) {
      const isAuthenticated = await this.checkSession();
      if (isAuthenticated) {
        this.uploadTrack();
      } else {
        console.error('User is not authenticated');
      }
    }
  }

  handleClick() {
    Haptics.impact({ style: ImpactStyle.Light });
    const fileInput = document.getElementById('fileInput') as HTMLElement;
    fileInput.click();
  }

  handleFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.defaultTitle = file.name;
      this.defaultSubtitle = 'Ready to sync the beat';
    }
  }

  updateTitle(event: any) {
    this.title = event;
  }

  updateArtists(event: any) {
    this.artists = event;
  }

  updateGenres(event: any) {
    this.genres = event;
  }

  async uploadTrack() {
    if (
      this.title === '' ||
      this.artists === '' ||
      this.genres === '' ||
      !this.selectedFile
    ) {
      console.error('Please fill out all fields');
      return;
    }
    console.log('Session: ', localStorage.getItem('userId'));
    const formData = new FormData();
    formData.append('userId', localStorage.getItem('userId') || '');
    formData.append('songFile', this.selectedFile);
    formData.append('songName', this.title.trim());
    this.artists.split(',').forEach((artist) => {
      artist = artist.trim();
      formData.append('songArtist', artist);
    });
    this.genres.split(',').forEach((genre) => {
      genre = genre.trim();
      formData.append('songGenres', genre);
    });
    const duration = await this.getAudioDuration(this.selectedFile);
    formData.append('songDuration', duration.toString());
    formData.append('songReleaseDate', new Date().toISOString().split('T')[0]);
    formData.append('songDiscNumber', '1');
    formData.append('songTrackNumber', '1');

    if (this.uploadingTrack) return;
    this.uploadingTrack = true;
    await fetch('https://beatsyncserver.onrender.com/track', {
      method: 'POST',
      body: formData,
    }).then((response) => {
      if (response.status === 200) {
        console.log('Track uploaded successfully:', response);
        this.uploadingTrack = false;
        this.goBack();
      } else {
        console.error('Error uploading track:', response);
        this.uploadingTrack = false;
      }
    });
  }

  getAudioDuration(file: File): Promise<number> {
    return new Promise((resolve, reject) => {
      const audio = new Audio(URL.createObjectURL(file));
      audio.addEventListener('loadedmetadata', () => {
        resolve(audio.duration);
      });
      audio.addEventListener('error', (e) => {
        reject(e);
      });
    });
  }

  async checkSession(): Promise<boolean> {
    try {
      const response = await fetch(
        `https://beatsyncserver.onrender.com/auth/checkSession?userId=${localStorage.getItem(
          'userId'
        )}`
      );
      console.log('Check session response:', response);
      return true;
    } catch (error) {
      console.error('Error checking session:', error);
      return false;
    }
  }
}
