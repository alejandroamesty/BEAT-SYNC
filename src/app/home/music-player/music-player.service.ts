import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MusicPlayerService {
  audio: HTMLAudioElement | null = null;
  isPlaying: boolean = false;
  currentTime: number = 0;
  duration: number = 0;
  private currentTimeSubject = new BehaviorSubject<number>(0);
  private intervalSubscription: Subscription | null = null;

  currentTime$ = this.currentTimeSubject.asObservable();

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

  seekTo(time: number) {
    if (this.audio) {
      this.audio.currentTime = time;
      this.currentTime = time;
      this.currentTimeSubject.next(this.currentTime);
    }
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
