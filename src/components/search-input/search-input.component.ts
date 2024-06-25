import { Component, Input, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-search-input',
  standalone: true,
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss'],
})
export class SearchInputComponent implements AfterViewInit {
  @Input() width: string = '291px';
  @Input() placeholder: string = 'Search...';
  @Input() focusInput: boolean = false;

  constructor(private elementRef: ElementRef) {}

  ngAfterViewInit() {
    if (this.focusInput) {
      const inputElement =
        this.elementRef.nativeElement.querySelector('.search-input');
      inputElement.focus();
    }
  }
}
