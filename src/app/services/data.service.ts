import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private songs = new BehaviorSubject<any>([]);
  currentSongs = this.songs.asObservable();

  private updatePlaylist = new BehaviorSubject<Boolean>(false);
  currentUpdatePlaylist = this.updatePlaylist.asObservable();

  constructor() {}

  changeSongs(songs: Array<any>) {
    this.songs.next(songs);
  }

  changeUpdatePlaylist(update: Boolean) {
    this.updatePlaylist.next(update);
  }
}
