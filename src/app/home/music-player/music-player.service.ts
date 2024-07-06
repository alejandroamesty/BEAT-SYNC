import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MusicPlayerService {
  public audio: HTMLAudioElement | null = null;
  private intervalSubscription: Subscription | null = null;
  private currentTimeSubject = new BehaviorSubject<number>(0);
  private songDataSubject = new BehaviorSubject<any>(null);

  isPlaying: boolean = false;
  currentTime: number = 0;
  duration: number = 0;

  currentTime$ = this.currentTimeSubject.asObservable();
  songData$ = this.songDataSubject.asObservable();

  constructor() {}

  initAudio(songURL: string) {
    if (!this.audio) {
      this.audio = new Audio(songURL);
      this.audio.ontimeupdate = () => {
        this.currentTime = Math.floor(this.audio!.currentTime);
        this.currentTimeSubject.next(this.currentTime);
      };
      this.audio.onloadedmetadata = () => {
        this.duration = Math.floor(this.audio!.duration);
      };
      this.audio.onended = () => {
        this.isPlaying = false;
        this.currentTime = 0;
        this.currentTimeSubject.next(this.currentTime);
        this.stopProgressTimer();
      };
    }
  }

  play() {
    if (this.audio && !this.isPlaying) {
      this.audio.play();
      this.isPlaying = true;
      this.startProgressTimer();
    }
  }

  pause() {
    if (this.audio && this.isPlaying) {
      this.audio.pause();
      this.isPlaying = false;
      this.stopProgressTimer();
    }
  }

  stop() {
    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
      this.isPlaying = false;
      this.stopProgressTimer();
    }
  }

  resetAudio() {
    if (this.audio) {
      this.audio.pause();
      this.audio.src = '';
      this.audio.load();
      this.audio = null;
      this.isPlaying = false;
      this.currentTime = 0;
      this.currentTimeSubject.next(this.currentTime);
      this.stopProgressTimer();
    }
  }

  seekTo(time: number) {
    if (this.audio) {
      this.audio.currentTime = time;
      this.currentTime = time;
      this.currentTimeSubject.next(this.currentTime);
    }
  }

  updateSongData(songData: any) {
    this.songDataSubject.next(songData);
  }

  private startProgressTimer() {
    if (this.intervalSubscription) {
      this.intervalSubscription.unsubscribe();
    }
    this.intervalSubscription = interval(1000).subscribe(() => {
      if (this.audio && !this.audio.paused) {
        this.currentTime = Math.floor(this.audio.currentTime);
        this.currentTimeSubject.next(this.currentTime);
      }
    });
  }

  private stopProgressTimer() {
    if (this.intervalSubscription) {
      this.intervalSubscription.unsubscribe();
      this.intervalSubscription = null;
    }
  }
}
