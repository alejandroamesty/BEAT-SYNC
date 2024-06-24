import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'app-category-card',
  standalone: true,
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.scss'],
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
export class CategoryCardComponent implements OnInit {
  @Input() source?: string;
  @Input() title?: string;
  @Input() bgColor: string = '#ffaa1a';
  @Output() onPress: EventEmitter<void> = new EventEmitter<void>();

  constructor() {}

  ngOnInit() {}

  animationState: string = 'normal';

  handleClick() {
    this.animationState = 'scaled';
    setTimeout(() => {
      this.animationState = 'normal';
      this.onPress.emit();
    }, 200);
  }
}
