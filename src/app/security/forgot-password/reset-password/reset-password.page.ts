import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { NavController } from '@ionic/angular';
import { BorderInputComponent } from 'src/components/border-input/border-input.component';
import { SaveButtonComponent } from 'src/components/save-button/save-button.component';
import { ControlButtonComponent } from 'src/components/control-button/control-button.component';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    BorderInputComponent,
    SaveButtonComponent,
    ControlButtonComponent,
  ],
})
export class ResetPasswordPage implements OnInit {
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
      animationDirection: 'back',
    });
  }
}
