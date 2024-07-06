import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'app-music-card',
  standalone: true,
  templateUrl: './music-card.component.html',
  styleUrls: ['./music-card.component.scss'],
  imports: [CommonModule],
  animations: [
    trigger('scaleAnimation', [
      state(
        'normal',
        style({
          transform: 'scale(1)',
        })
      ),
      state(
        'scaled',
        style({
          transform: 'scale(0.9)',
        })
      ),
      transition(
        'normal <=> scaled',
        animate('150ms cubic-bezier(0.25, 0.8, 0.25, 1)')
      ),
    ]),
  ],
})
export class MusicCardComponent {
  @Input() title: string = 'Un Verano Sin Ti';
  @Input() cover: string = '../../../assets/images/unveranosinti.png';
  @Input() album: any;
  @Output() onPress: EventEmitter<any> = new EventEmitter<any>();

  animationState: string = 'normal';

  handleClick() {
    this.animationState = 'scaled';
    setTimeout(() => {
      this.animationState = 'normal';
      this.onPress.emit(this.album);
    }, 200);
  }
}
