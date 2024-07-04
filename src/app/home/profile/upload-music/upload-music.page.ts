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
import { BorderInputComponent } from 'src/components/border-input/border-input.component';
import { ControlButtonComponent } from 'src/components/control-button/control-button.component';
import { SaveButtonComponent } from 'src/components/save-button/save-button.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';

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

  constructor(private _location: Location, private http: HttpClient) {}

  ngOnInit() {}

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
    this.title = event.target.value;
  }

  updateArtists(event: any) {
    this.artists = event.target.value;
  }

  updateGenres(event: any) {
    this.genres = event.target.value;
  }

  async uploadTrack() {
    if (!this.selectedFile) return;

    const formData = new FormData();
    formData.append('songFile', this.selectedFile);
    formData.append('songName', this.title);
    formData.append('songArtist', this.artists);
    formData.append('songGenres', this.genres);

    const duration = await this.getAudioDuration(this.selectedFile);
    formData.append('songDuration', duration.toString());

    formData.append('songReleaseDate', new Date().toISOString().split('T')[0]);
    formData.append('songDiscNumber', '1');
    formData.append('songTrackNumber', '1');

    this.http
      .post('https://beatsyncserver.onrender.com/track', formData)
      .subscribe({
        next: (response) => {
          console.log('Track uploaded successfully:', response);
          this.goBack();
        },
        error: (error) => {
          console.error('Error uploading track:', error);
        },
      });
  }

  getAudioDuration(file: File): Promise<number> {
    return new Promise((resolve, reject) => {
      const audio = new Audio(URL.createObjectURL(file));
      audio.addEventListener('loadedmetadata', () => {
        resolve(audio.duration * 1000);
      });
      audio.addEventListener('error', (e) => {
        reject(e);
      });
    });
  }

  async checkSession(): Promise<boolean> {
    try {
      const response = await this.http
        .get('https://beatsyncserver.onrender.com/auth/checkSession')
        .toPromise();
      console.log('Check session response:', response);
      return true;
    } catch (error) {
      console.error('Error checking session:', error);
      return false;
    }
  }
}
