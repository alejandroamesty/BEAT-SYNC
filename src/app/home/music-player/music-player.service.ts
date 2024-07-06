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
  private isPlayings = new BehaviorSubject<boolean>(false);private nextSongNameSubject = new BehaviorSubject<string>('');

  nextSongName$ = this.nextSongNameSubject.asObservable();
  isPlaying: boolean = false;
  currentTime: number = 0;
  duration: number = 0;

  currentTime$ = this.currentTimeSubject.asObservable();
  songData$ = this.songDataSubject.asObservable();
  isPlaying$ = this.isPlayings.asObservable();

  private queue: any[] = []; // Array para almacenar las canciones en cola

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
        this.playNextInQueue();
      };
    }
  }

  play() {
    if (this.audio && !this.isPlaying) {
      this.audio.play();
      this.isPlaying = true;
      this.isPlayings.next(this.isPlaying);
      this.startProgressTimer();
    }
  }

  pause() {
    if (this.audio && this.isPlaying) {
      this.audio.pause();
      this.isPlaying = false;
      this.isPlayings.next(this.isPlaying);
      this.stopProgressTimer();
    }
  }

  stop() {
    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
      this.isPlaying = false;
      this.isPlayings.next(this.isPlaying);
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
      this.isPlayings.next(this.isPlaying);
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
        this.currentTime = Math.floor(this.audio.currentTime) || 0;
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

  enqueueSong(song: any) {
    this.queue.push(song);
  }

  playNextInQueue() {
    if (this.queue.length > 0) {
      const nextSong = this.queue.shift();
      if (nextSong && nextSong.url) {
        this.resetAudio();
        this.initAudio(nextSong.url);
        this.play();
        this.updateSongData({
          coverImageUrl:
            nextSong.cover_img?.[0]?.url ||
            '../../../assets/images/no-cover.png',
          albumTitle: nextSong.album,
          songTitle: nextSong.name,
          artists: nextSong.artists
            .map((artist: any) => artist.name)
            .join(', '),
        });
        this.nextSongNameSubject.next("No song suggested");
      }
    }
  }

  clearQueue() {
    this.queue = [];
  }

  getQueue() {
    return this.queue;
  }

  queueNextSong(currentSongId: string, currentSongGenre: string) {
    console.log('currentSongGenre:', currentSongGenre);
    fetch(
      `https://beatsyncserver.onrender.com/search/TracksByGenre?skip=0&filter=${encodeURIComponent(
        currentSongGenre
      )}`
    )
      .then((response) => response.json())
      .then((data) => {
        const nextSong = data.find(
          (song: any) => song.id !== currentSongId && song.url !== null
        );
        if (nextSong) {
          this.enqueueSong(nextSong);
          console.log('Next song queued:', nextSong);
          this.nextSongNameSubject.next(nextSong.name);
        } else {
          console.log('No valid next song found.');
        }
      })
      .catch((error) => {
        console.error('Error fetching next song:', error);
      });
  }
}
