import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavController } from '@ionic/angular';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';

import { BorderInputComponent } from 'src/components/border-input/border-input.component';
import { ControlButtonComponent } from 'src/components/control-button/control-button.component';
import { SaveButtonComponent } from 'src/components/save-button/save-button.component';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
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
export class ForgotPasswordPage implements OnInit {
  constructor(private navCtrl: NavController) {}

  ngOnInit() {}

  navigateToSignIn() {
    this.navCtrl.navigateForward('sign-in', {
      animated: true,
      animationDirection: 'back',
    });
  }

  navigateToVerifyCode() {
    this.navCtrl.navigateForward('verify-code', {
      animated: true,
      animationDirection: 'forward',
    });
  }

  navigateToSignUp() {
    this.navCtrl.navigateBack('sign-up', {
      animated: true,
      animationDirection: 'forward',
    });
  }
}
