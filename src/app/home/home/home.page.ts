import { Component, OnInit } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from '@ionic/angular/standalone';
import { MusicGridComponent } from 'src/components/music-grid/music-grid.component';
import {
  MusicReelComponent,
  MusicData,
} from 'src/components/music-reel/music-reel.component';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    MusicGridComponent,
    MusicReelComponent,
  ],
})
export class HomePage implements OnInit {
  constructor(private router: Router, private dataService: DataService) {}

  musicItems: {
    _id: string;
    refId: string;
    title: string;
    cover: string;
    type: 'Album' | 'Playlist';
    name: string;
    release_date: string;
    images: { url: string }[];
    artists: { name: string }[];
    total_tracks: number;
  }[] = [];

  musicData: {
    _id: string;
    refId: string;
    type: 'Album' | 'Playlist';
    name: string;
    releaseDate?: string;
    images: { url: string }[];
    artists: { name: string; id: string }[];
    totalTracks: number;
  }[] = [
    {
      _id: 'unknownId',
      refId: 'unknownRefId',
      type: 'Album',
      name: 'nadie sabe lo que pasará mañana',
      releaseDate: '06/05/2022',
      images: [{ url: '../../../assets/images/unveranosinti.png' }],
      artists: [{ name: 'Bad Bunny', id: 'unknownId' }],
      totalTracks: 23,
    },
  ];

  ngOnInit() {
    this.loadUserPlaylists();
    this.loadRandomAlbums();
  }

  async loadUserPlaylists() {
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        console.error('User ID not found in localStorage');
        return;
      }

      const response = await fetch(
        `https://beatsyncserver.onrender.com/playlist?userId=${userId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch playlists');
      }

      const playlists = await response.json();

      this.musicData = playlists.map((playlist: any) => ({
        _id: playlist._id,
        refId: playlist._id,
        type: 'Playlist',
        name: playlist.name,
        description: playlist.description,
        images: playlist.songs.map((song: any) => ({
          url: song.cover_img[0]?.url || '',
        })),
        artists: [],
        totalTracks: playlist.songs.length,
      }));
    } catch (error) {
      console.error('Error fetching user playlists:', error);
    }
  }

  async loadRandomAlbums() {
    try {
      const response = await fetch(
        'https://beatsyncserver.onrender.com/get/randomAlbums',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch random albums');
      }

      const albums = await response.json();

      console.log('Albums response:', albums);

      this.musicItems = albums.map((album: any) => {
        let coverUrl = '';

        if (
          album.images &&
          Array.isArray(album.images) &&
          album.images.length > 0
        ) {
          coverUrl = album.images[0].url;
        } else if (
          album.cover_img &&
          Array.isArray(album.cover_img) &&
          album.cover_img.length > 0
        ) {
          coverUrl = album.cover_img[0].url;
        } else {
          coverUrl = '../../../assets/images/no-album-cover.png';
        }

        return {
          title: album.name || 'Unknown Title',
          cover: coverUrl,
          _id: album._id,
          refId: album.refId,
          type: 'Album',
          name: album.name,
          release_date: album.release_date,
          images: album.images,
          artists: album.artists,
          total_tracks: album.total_tracks,
          popularity: album.popularity,
        };
      });
    } catch (error) {
      console.error('Error fetching random albums:', error);
    }
  }

  handleCardPress(album: any) {
    if (!album) {
      console.error('Album data is undefined or null');
      return;
    }
  
    const artistNames = Array.isArray(album.artists)
      ? album.artists.map((artist: any) => artist.name).join(', ')
      : '';
  
    const artistIds = Array.isArray(album.artists)
      ? album.artists.map((artist: any) => artist.id)
      : [];
  
    this.router.navigate(['album-detail'], {
      queryParams: {
        _id: album._id,
        refId: album.refId,
        title: album.name,
        cover: album.cover,
        artistNames: artistNames,
        artistIds: artistIds,
        genres: album.genres ? album.genres.join(', ') : '',
        popularity: album.popularity,
      },
    });
    console.log('CARD PRESSED NOJODA', album);
  }
}
