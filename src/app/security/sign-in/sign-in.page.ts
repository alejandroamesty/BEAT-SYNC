import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
} from '@ionic/angular/standalone';
import { BorderInputComponent } from 'src/components/border-input/border-input.component';
import { SaveButtonComponent } from 'src/components/save-button/save-button.component';
import { ControlButtonComponent } from 'src/components/control-button/control-button.component';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
  standalone: true,
  imports: [
    IonButton,
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
export class SignInPage implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  navigateToSignUp() {
    this.router.navigate(['sign-up']);
  }

  navigateToStartScreen() {
    this.router.navigate(['start-screen']);
  }

  navigateToForgotPassword() {
    this.router.navigate(['forgot-password']);
  }

  navigateToHome() {
    this.router.navigate(['main-tab']);
  }
}
