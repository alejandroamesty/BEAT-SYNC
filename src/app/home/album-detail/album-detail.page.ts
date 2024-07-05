import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlbumTracklistComponent } from 'src/components/album-tracklist/album-tracklist.component';
import { SimpleButtonComponent } from 'src/components/simple-button/simple-button.component';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from '@ionic/angular/standalone';
import { ControlButtonComponent } from 'src/components/control-button/control-button.component';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-album-detail',
  standalone: true,
  templateUrl: 'album-detail.page.html',
  styleUrls: ['album-detail.page.scss'],
  imports: [
    CommonModule,
    AlbumTracklistComponent,
    SimpleButtonComponent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    ControlButtonComponent,
  ],
})
export class AlbumDetailPage implements OnInit {
  _id: string = 'unknownId';
  refId: string = 'unknownRefId';
  albumCover: string = '../../../assets/images/unveranosinti.png';
  albumTitle: string = 'Un Verano Sin Ti';
  artists: string = 'Bad Bunny';
  artistId: string = 'unknownId';
  genre: string = 'LATIN';
  releaseYear: string = '2022';
  popularity: number = 100;

  tracklist: {
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
    mainArtist: string;
  }[] = [];

  ngOnInit(): void {
    try {
      fetch(
        `https://beatsyncserver.onrender.com/get/TracksByAlbum?filter=${this.refId}`,
        {
          method: 'GET',
        }
      )
        .then((response) => {
          if (response.status === 200) {
            return response.json();
          } else {
            throw new Error('Failed to fetch data');
          }
        })
        .then((data) => {
          console.log('Success:', data);
          this.tracklist = data.map((track: any) => {
            return {
              _id: track._id || 'unknownId',
              refId: track.id,
              title: track.name,
              url: track.url,
              cover:
                track.cover_img?.[0]?.url ||
                '../../../assets/images/no-artist-pfp.png',
              releaseDate: track.release_date,
              duration_ms: track.duration_ms,
              disc_number: track.disc_number,
              number: track.disc_number,
              album: track.album,
              albumRefId: track.album_refId,
              artists: track.artists,
              genres: track.genres,
              liked: track.liked || false,
            };
          });
        });
    } catch (error) {
      console.error(error);
    }
  }

  constructor(
    private _location: Location,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe((params) => {
      this._id = params['_id'];
      this.refId = params['refId'];
      this.albumTitle = params['title'];
      this.genre = params['genres'];
      this.albumCover =
        params['cover'] || '../../../assets/images/no-artist-pfp.png';
      this.popularity = params['popularity'];

      if (typeof params['artistNames'] === 'string') {
        this.artists = params['artistNames'];
      } else {
        this.artists = params['artistNames'].join(', ');
      }

      if (typeof params['artistIds'] === 'string') {
        this.artistId = params['artistIds'];
      } else {
        this.artistId = params['artistIds'][0];
      }
    });
  }

  handlePlayClick() {
    console.log('Play button clicked');
  }

  handleViewClick() {
    try {
      fetch(
        `https://beatsyncserver.onrender.com/Artist?artistRefId=${this.artistId}`,
        {
          method: 'GET',
        }
      )
        .then((response) => {
          if (response.status === 200) {
            return response.json();
          } else {
            throw new Error('Failed to fetch data');
          }
        })
        .then((data) => {
          console.log('Success:', data);
          this.router.navigate(['artist-detail'], {
            queryParams: {
              _id: data._id,
              refId: data.refId,
              name: data.name,
              genres: data.genres,
              image:
                data.images?.[0]?.url ||
                '../../../assets/images/no-artist-pfp.png',
              popularity: data.popularity,
            },
          });
        });
    } catch (error) {
      console.error(error);
    }
  }

  handleLikeClick(track: any) {
    console.log(`Liked track: ${track.title}`);
  }

  getStarRating(): string {
    const starCount = Math.round((this.popularity / 100) * 5);
    return '★'.repeat(starCount) + '☆'.repeat(5 - starCount);
  }

  closePage() {
    this._location.back();
    console.log('Close button clicked');
  }
}
