import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { Router } from '@angular/router';
import { MusicPlayerService } from 'src/app/home/music-player/music-player.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-mini-player',
  standalone: true,
  templateUrl: './mini-player.component.html',
  styleUrls: ['./mini-player.component.scss'],
  imports: [CommonModule],
})
export class MiniPlayerComponent implements OnInit {
  @Input() songTitle: string = 'Not playing';
  @Input() artists: string = 'Waiting for your next beat';
  @Input() songURL: string = '';
  @Input() coverImageUrl: string = '';
  @Output() likeClicked: EventEmitter<void> = new EventEmitter<void>();
  @Output() playClicked: EventEmitter<string> = new EventEmitter<string>();

  backgroundColor: string = '#363636';
  liked: boolean = false;
  paused: boolean = true;
  private currentTimeSubscription: Subscription | null = null;

  constructor(
    private router: Router,
    private musicPlayerService: MusicPlayerService
  ) {}

  ngOnInit(): void {
    this.detectBackgroundColor();
    this.subscribeToMusicPlayerState();
  }

  ngOnDestroy(): void {
    this.unsubscribeFromMusicPlayerState();
  }

  detectBackgroundColor() {
    this.backgroundColor = '#212121';
  }

  async onLikeClick() {
    this.liked = !this.liked;
    this.likeClicked.emit();
    await Haptics.impact({ style: ImpactStyle.Light });
  }

  async onPlayClick() {
    if (this.paused) {
      if (this.musicPlayerService.audio?.src !== this.songURL) {
        this.musicPlayerService.initAudio(this.songURL);
      }
      this.musicPlayerService.play();
    } else {
      this.musicPlayerService.pause();
    }
    this.paused = !this.paused;
    await Haptics.impact({ style: ImpactStyle.Light });
  }

  onPlayerClick() {
    this.router.navigate(['/music-player']);
  }

  private subscribeToMusicPlayerState() {
    this.currentTimeSubscription =
      this.musicPlayerService.currentTime$.subscribe((time) => {
        if (this.musicPlayerService.audio?.src === this.songURL) {
          this.paused = !this.musicPlayerService.isPlaying;
        }
      });
  }

  private unsubscribeFromMusicPlayerState() {
    if (this.currentTimeSubscription) {
      this.currentTimeSubscription.unsubscribe();
      this.currentTimeSubscription = null;
    }
  }
}
