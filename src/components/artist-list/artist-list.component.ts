import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArtistItemComponent } from './artist-item/artist-item.component';

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

  @Input() height: string = 'auto';

  handleItemPress(title: string) {
    console.log('Artist item pressed:', title);
  }
}
