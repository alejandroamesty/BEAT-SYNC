import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mini-player',
  standalone: true,
  templateUrl: './mini-player.component.html',
  styleUrls: ['./mini-player.component.scss'],
  imports: [CommonModule],
})
export class MiniPlayerComponent implements OnInit {
  @Input() songTitle: string = 'Not playing';
  @Input() artists: string = 'Waiting for your next beat';
  @Input() songURL: string = '';
  @Input() coverImageUrl: string = '';
  @Output() likeClicked: EventEmitter<void> = new EventEmitter<void>();
  @Output() playClicked: EventEmitter<string> = new EventEmitter<string>();

  backgroundColor: string = '#363636';
  liked: boolean = false;
  paused: boolean = true;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.detectBackgroundColor();
  }

  detectBackgroundColor() {
    // agregar lógica para detectar el color de fondo
    this.backgroundColor = '#212121';
  }

  async onLikeClick() {
    this.liked = !this.liked;
    this.likeClicked.emit();
    await Haptics.impact({ style: ImpactStyle.Light });
  }

  async onPlayClick() {
    this.paused = !this.paused;
    this.playClicked.emit(this.songURL); // Emitir la URL de la canción al hacer clic en Play
    await Haptics.impact({ style: ImpactStyle.Light });
  }

  onPlayerClick() {
    this.router.navigate(['/music-player']);
  }
}
