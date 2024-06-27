import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'app-playlist-card',
  standalone: true,
  templateUrl: './playlist-card.component.html',
  styleUrls: ['./playlist-card.component.scss'],
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
export class PlaylistCardComponent implements OnInit {
  @Input() songCount: number = 0;
  @Input() type: 'Liked' | 'Artist' = 'Liked';
  @Output() onPress = new EventEmitter<void>();

  title: string = '';

  animationState: string = 'normal';

  ngOnInit() {
    this.title = this.getTitleByType();
  }

  getTitleByType(): string {
    if (this.type === 'Liked') {
      return 'Liked Songs';
    } else if (this.type === 'Artist') {
      return 'Your Songs';
    }
    return 'Unknown Playlist';
  }

  get leftIcon(): string {
    if (this.type === 'Liked') {
      return '../../assets/images/liked-songs.png';
    } else if (this.type === 'Artist') {
      return '../../assets/images/your-songs.png';
    }
    return '../../assets/images/liked-songs.png';
  }

  handleClick() {
    this.animationState = 'scaled';
    setTimeout(() => {
      this.animationState = 'normal';
      this.onPress.emit();
    }, 200);
  }
}
