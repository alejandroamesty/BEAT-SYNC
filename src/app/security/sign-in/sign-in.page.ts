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
  email: string = '';
  password: string = '';
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
    if (this.email === '' || this.password === '' || this.password.length < 8) {
      return;
    }
    //regex for email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
      return;
    }
    fetch('https://beatsyncserver.onrender.com/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: this.email, password: this.password }),
    }).then((response) => {
      if (response.status === 200) {
        this.router.navigate(['main-tab']);
      } else if (response.status === 404) {
        console.log('User not Found');
      } else if (response.status === 401) {
        console.log('Invalid Password');
      } else if (response.status === 400) {
        console.log('Invalid Request');
      } else {
        console.log('Server Error');
      }
    });
  }

  passwordChange(event: any) {
    this.password = event;
    console.log(event);
  }

  emailChange(event: any) {
    this.email = event;
    console.log(event);
  }
}
