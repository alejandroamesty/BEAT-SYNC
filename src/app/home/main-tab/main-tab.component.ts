import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonIcon } from '@ionic/angular/standalone';

import { HomePage } from '../home/home.page';
import { SearchPage } from '../search/search.page';
import { LibraryPage } from '../library/library.page';
import { ProfilePage } from '../profile/profile.page';

@Component({
  selector: 'app-main-tab',
  standalone: true,
  templateUrl: './main-tab.component.html',
  styleUrls: ['./main-tab.component.scss'],
  imports: [
    CommonModule,
    IonIcon,
    HomePage,
    SearchPage,
    LibraryPage,
    ProfilePage,
  ],
})
export class MainTabComponent implements OnInit {
  activeIndex: number = 0;

  setActive(index: number) {
    this.activeIndex = index;
  }

  ngOnInit() {}

  get indicatorPosition(): string {
    switch (this.activeIndex) {
      case 0:
        return 'translateX1';
      case 1:
        return 'translateX2';
      case 2:
        return 'translateX3';
      case 3:
        return 'translateX4';
      default:
        return 'translateX1';
    }
  }
}
