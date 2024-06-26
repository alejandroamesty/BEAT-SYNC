import {
  Component,
  Input,
  Output,
  OnInit,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent } from '@ionic/angular/standalone';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { ControlButtonComponent } from 'src/components/control-button/control-button.component';
import { ProgressBarComponent } from 'src/components/progress-bar/progress-bar.component';
import { MusicPlayerService } from './music-player.service';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'app-music-player',
  standalone: true,
  templateUrl: './music-player.page.html',
  styleUrls: ['./music-player.page.scss'],
  imports: [
    CommonModule,
    IonContent,
    ControlButtonComponent,
    ProgressBarComponent,
  ],
})
export class MusicPlayerPage implements OnInit, OnDestroy {
  @Input() songData: {
    songURL: string;
    coverImageUrl: string;
    albumTitle: string;
    songTitle: string;
    artists: string;
  } = {
    songURL:
      'https://storage.googleapis.com/spotify-a9c33.appspot.com/images/eb8bba32-3d4c-4fa9-a142-c9354e3bbce6.mp3?GoogleAccessId=firebase-adminsdk-zuzla%40spotify-a9c33.iam.gserviceaccount.com&Expires=1721939066&Signature=TxBCuc4N3HCOZ94m7kb132z7OOuoY7m17WMfAN1UYtJrRsQX6NF1u8h2McMg2461Yy5q8G1G3ObDwE3DcIjoyIeVSs8dFj5mjrKiKZ0u5y4dAK%2ByoBuVNPmnvTGHz%2BtiOlOm6rC0s2cC4UmhD3lNaQmfL69mVYbGS6Aa%2BADKuwxyUUYKNTITQdJ7GSArvNe37UrxY7KPJtqg5wk58gmAyACErkhxZLVQn1g4dFRIDsTFDPbsGe28CrQgJUgMwz%2FlE1j6twSk2wx0rpEp2dvV3Mnsn2kGX7T8nvF%2BWMEZqxMQL%2B6OWFFDmTN31oNTmqvAhZQSYuwnc5uLyhS2Zn5%2BKw%3D%3D',
    coverImageUrl: '../../assets/images/no-cover.png',
    albumTitle: 'No album data available',
    songTitle: 'No song data available',
    artists: 'No artist data available',
  };

  @Output() likeClicked: EventEmitter<void> = new EventEmitter<void>();
  @Output() playClicked: EventEmitter<boolean> = new EventEmitter<boolean>();

  liked: boolean = false;
  duration: number = 0;
  currentTime: number = 0;
  isPlaying: boolean = false;
  private currentTimeSubscription: Subscription | null = null;

  constructor(
    private audioService: MusicPlayerService,
    private _location: Location
  ) {}

  ngOnInit(): void {
    if (this.songData && this.songData.songURL) {
      this.audioService.initAudio(this.songData.songURL);
      this.syncWithAudioService();
    }
    this.subscribeToCurrentTime();
  }

  ngOnDestroy(): void {
    this.unsubscribeFromCurrentTime();
  }

  syncWithAudioService() {
    this.duration = this.audioService.duration;
    this.currentTime = this.audioService.currentTime;
    this.isPlaying = this.audioService.isPlaying;
  }

  subscribeToCurrentTime() {
    this.currentTimeSubscription = this.audioService.currentTime$.subscribe(
      (time) => {
        this.currentTime = time;
      }
    );
  }

  unsubscribeFromCurrentTime() {
    if (this.currentTimeSubscription) {
      this.currentTimeSubscription.unsubscribe();
      this.currentTimeSubscription = null;
    }
  }

  togglePlayPause(): void {
    if (this.isPlaying) {
      this.audioService.pause();
    } else {
      this.audioService.play();
    }
    Haptics.impact({ style: ImpactStyle.Light });
    this.syncWithAudioService();
  }

  onLikeClick() {
    this.liked = !this.liked;
    Haptics.impact({ style: ImpactStyle.Light });
  }

  onTimeChanged(newTime: number): void {
    this.audioService.seekTo(newTime);
    this.syncWithAudioService();
  }

  closePlayer() {
    this._location.back();
  }
}
