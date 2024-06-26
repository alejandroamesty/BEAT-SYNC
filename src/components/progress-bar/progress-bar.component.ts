import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  HostListener,
  NgZone,
} from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss'],
  standalone: true,
})
export class ProgressBarComponent implements OnInit {
  @Input() currentTime: number = 0;
  @Input() duration: number = 0;
  @Output() timeChanged: EventEmitter<number> = new EventEmitter<number>();

  isDragging: boolean = false;
  tempTime: number = 0;

  constructor(private ngZone: NgZone) {}

  get progress(): number {
    return (this.currentTime / this.duration) * 100;
  }

  ngOnInit(): void {}

  formatTime(time: number): string {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }

  startDrag(event: MouseEvent | TouchEvent): void {
    this.isDragging = true;
    this.updateTime(event);
  }

  @HostListener('window:mousemove', ['$event'])
  @HostListener('window:touchmove', ['$event'])
  onDrag(event: MouseEvent | TouchEvent): void {
    if (this.isDragging) {
      this.ngZone.run(() => {
        this.updateTime(event);
      });
    }
  }

  @HostListener('window:mouseup')
  @HostListener('window:touchend')
  stopDrag(): void {
    if (this.isDragging) {
      this.isDragging = false;
      this.timeChanged.emit(this.tempTime);
    }
  }

  private updateTime(event: MouseEvent | TouchEvent): void {
    const progressBarElement = document.querySelector(
      '.progress-bar'
    ) as HTMLElement;
    if (!progressBarElement) return;

    const rect = progressBarElement.getBoundingClientRect();
    let clientX: number;

    if (event instanceof MouseEvent) {
      clientX = event.clientX;
    } else if (event instanceof TouchEvent) {
      clientX = event.touches[0].clientX;
    } else {
      return;
    }

    const offsetX = Math.min(Math.max(clientX - rect.left, 0), rect.width);
    const newTime = (offsetX / rect.width) * this.duration;

    if (newTime >= 0 && newTime <= this.duration) {
      this.tempTime = newTime;
      this.currentTime = newTime;
    }
  }
}
