import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { Location } from '@angular/common';
import { BorderInputComponent } from 'src/components/border-input/border-input.component';
import { ControlButtonComponent } from 'src/components/control-button/control-button.component';
import { SaveButtonComponent } from 'src/components/save-button/save-button.component';

@Component({
  selector: 'app-edit-account',
  templateUrl: './edit-account.page.html',
  styleUrls: ['./edit-account.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    BorderInputComponent,
    ControlButtonComponent,
    SaveButtonComponent,
  ],
})
export class EditAccountPage implements OnInit {
  email: string = '';
  currentPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';

  constructor(private _location: Location) {}

  ngOnInit() {}

  uploadingTrack: boolean = false;

  async goBack() {
    this._location.back();
  }

  async handleSave() {
    this._location.back();
    console.log('Saving changes');
  }

  updateEmail(event: any) {
    this.email = event;
  }

  verifyPassword(event: any) {
    this.currentPassword = event;
  }

  insertNewPassword(event: any) {
    this.newPassword = event;
  }

  confirmNewPassword(event: any) {
    this.confirmPassword = event;
  }
}
