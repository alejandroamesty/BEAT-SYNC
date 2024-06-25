import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Haptics, ImpactStyle } from '@capacitor/haptics';

@Component({
  selector: 'app-mini-player',
  standalone: true,
  templateUrl: './mini-player.component.html',
  styleUrls: ['./mini-player.component.scss'],
  imports: [CommonModule],
})
export class MiniPlayerComponent implements OnInit {
  @Input() songTitle: string = 'Ojitos Lindos';
  @Input() artists: string = 'Bad Bunny, Bomba Estéreo';
  @Input() coverImageUrl: string = '';
  @Output() likeClicked: EventEmitter<void> = new EventEmitter<void>();
  @Output() playClicked: EventEmitter<boolean> = new EventEmitter<boolean>();

  backgroundColor: string = '#363636';
  liked: boolean = false;
  paused: boolean = true;

  constructor() {}

  ngOnInit(): void {
    this.detectBackgroundColor();
  }

  detectBackgroundColor() {
    // agregar lógica para detectar el color de fondo
    this.backgroundColor = '#7C4704';
  }

  async onLikeClick() {
    this.liked = !this.liked;
    this.likeClicked.emit();
    await Haptics.impact({ style: ImpactStyle.Light });
  }

  async onPlayClick() {
    this.paused = !this.paused;
    this.playClicked.emit(this.paused);
    await Haptics.impact({ style: ImpactStyle.Light });
  }
}
