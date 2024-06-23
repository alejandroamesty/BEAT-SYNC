import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';

import { ControlButtonComponent } from 'src/components/control-button/control-button.component';
import { OptionCardComponent } from 'src/components/option-card/option-card.component';
import { ConfirmationModalComponent } from 'src/components/confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    ControlButtonComponent,
    OptionCardComponent,
    ConfirmationModalComponent,
  ],
})
export class ProfilePage implements OnInit {
  showModal: boolean = false;

  constructor(private router: Router) {}

  ngOnInit() {}

  handleLogoutPress() {
    this.showModal = true;
  }

  handleCancel() {
    this.showModal = false;
  }

  handleAccept() {
    this.showModal = false;
    this.router.navigate(['start-screen']);
  }
}
