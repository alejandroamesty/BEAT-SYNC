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
    pfp: string;
    name: string;
  } = {
    pfp: '../../../assets/images/badbunny.jpeg',
    name: 'Bad Bunny',
  };

  @Output() onPress = new EventEmitter<void>();

  handleClick() {
    this.onPress.emit();
  }

  onButtonClick() {
    this.onPress.emit();
  }
}
