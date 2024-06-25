import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { ControlButtonComponent } from 'src/components/control-button/control-button.component';
import { SearchInputComponent } from 'src/components/search-input/search-input.component';

@Component({
  selector: 'app-library',
  templateUrl: './library.page.html',
  styleUrls: ['./library.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, ControlButtonComponent, SearchInputComponent]
})
export class LibraryPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
