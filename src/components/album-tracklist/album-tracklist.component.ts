import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlbumTrackComponent } from './album-track/album-track.component';

interface Track {
  _id?: string;
  refId: string;
  title: string;
  url: string | null;
  cover: string;
  releaseDate: string;
  duration_ms: number;
  disc_number: number;
  number: number;
  album: string;
  albumRefId: string;
  artists: { name: string; id: string }[];
  genres: string[];
  liked: boolean;
}

@Component({
  selector: 'app-album-tracklist',
  standalone: true,
  templateUrl: './album-tracklist.component.html',
  styleUrls: ['./album-tracklist.component.scss'],
  imports: [CommonModule, AlbumTrackComponent],
})
export class AlbumTracklistComponent implements OnInit {
  @Input() tracks: {
    _id?: string;
    refId: string;
    title: string;
    url: string | null;
    cover: string;
    releaseDate: string;
    duration_ms: number;
    disc_number: number;
    number: number;
    album: string;
    albumRefId: string;
    artists: { name: string; id: string }[];
    mainArtist: string;
    genres: string[];
    liked: boolean;
  }[] = [];
  @Input() height: string = 'auto'; // Default height to auto

  sortedTracks: Track[] = [];

  ngOnInit() {
    this.sortTracks();
  }

  ngOnChanges() {
    this.sortTracks();
  }

  sortTracks() {
    this.sortedTracks = [...this.tracks].sort((a, b) => a.number - b.number);
  }

  handleTrackLike(track: Track) {
    console.log(`Track liked: ${track.title}`);
  }
}
