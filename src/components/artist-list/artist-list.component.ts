import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArtistItemComponent } from './artist-item/artist-item.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-artist-list',
  standalone: true,
  templateUrl: './artist-list.component.html',
  styleUrls: ['./artist-list.component.scss'],
  imports: [CommonModule, ArtistItemComponent],
})
export class ArtistListComponent {
  @Input() artistList: Array<{
    _id?: string;
    refId: string;
    name: string;
    genres: string[];
    images: any[];
    popularity: Number | null;
  }> = [];

  constructor(private router: Router) {}

  @Input() height: string = 'auto';

  handleItemPress(artist: {
    _id?: string;
    refId: string;
    name: string;
    genres: string[];
    images: any[];
    popularity: Number | null;
  }) {
    this.router.navigate(['artist-detail'], {
      queryParams: {
        ...artist,
        image: artist.images[0].url || null,
      },
    });
  }
}
