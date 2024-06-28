import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlButtonComponent } from 'src/components/control-button/control-button.component';

@Component({
  selector: 'app-artist-item',
  standalone: true,
  templateUrl: './artist-item.component.html',
  styleUrls: ['./artist-item.component.scss'],
  imports: [CommonModule, ControlButtonComponent],
})
export class ArtistItemComponent {
  @Input() artist: {
    _id?: string;
    refId: string;
    name: string;
    genres: string[];
    images: any[];
    popularity: Number | null;
  } = {
    _id: 'unknownId',
    refId: 'unknownRefId',
    name: 'Default Title',
    genres: ['Default Genre'],
    images: [],
    popularity: 0,
  };

  @Output() onPress = new EventEmitter<void>();

  handleClick() {
    this.onPress.emit();
  }

  onButtonClick() {
    this.onPress.emit();
  }
}
