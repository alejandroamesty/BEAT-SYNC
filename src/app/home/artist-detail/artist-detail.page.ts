import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonContent } from '@ionic/angular/standalone';
import { ControlButtonComponent } from 'src/components/control-button/control-button.component';
import { Location } from '@angular/common';
import { MusicReelComponent } from 'src/components/music-reel/music-reel.component';

@Component({
  selector: 'app-artist-detail',
  templateUrl: './artist-detail.page.html',
  styleUrls: ['./artist-detail.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    CommonModule,
    ControlButtonComponent,
    MusicReelComponent,
  ],
})
export class ArtistDetailPage implements OnInit {
  artist: {
    _id?: string;
    refId: string;
    name: string;
    genres: string[];
    image: string;
    popularity: Number | null;
  } = {
    _id: 'unknownId',
    refId: 'unknownRefId',
    name: 'Default Name',
    genres: ['Default Genre'],
    image: '../../../assets/images/no-artist-pfp.png',
    popularity: 0,
  };

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
      name: 'Unknown Album',
      releaseDate: '06/05/2022',
      images: [{ url: '../../../assets/images/unveranosinti.png' }],
      artists: [{ name: 'Bad Bunny', id: 'unknownId' }],
      totalTracks: 23,
    },
  ];

  constructor(private _location: Location, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.artist = {
        _id: params['_id'],
        refId: params['refId'],
        name: params['name'],
        genres: params['genres'],
        image: params['image'] || '../../../assets/images/no-artist-pfp.png',
        popularity: params['popularity'],
      };
      try {
        fetch(
          `https://beatsyncserver.onrender.com/get/AlbumByArtist?filter=${this.artist.refId}&skip=0`,
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
            this.musicData = data.map(
              (item: {
                _id: string;
                refId: string;
                type: 'Album' | 'Playlist';
                name: string;
                release_date: string;
                images: { url: string }[];
                artists: { name: string }[];
                total_tracks: number;
              }) => {
                return {
                  _id: item._id,
                  refId: item.refId,
                  type: item.type || 'Album',
                  name: item.name,
                  releaseDate: item.release_date,
                  images: item.images,
                  artists: item.artists,
                  totalTracks: item.total_tracks,
                };
              }
            );
          });
      } catch (error) {
        console.error(error);
      }
    });
  }

  closePage() {
    this._location.back();
  }
}
