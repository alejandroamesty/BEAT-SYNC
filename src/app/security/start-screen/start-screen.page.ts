import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.page.html',
  styleUrls: ['./start-screen.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class StartScreenPage implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  navigateToSignIn() {
    this.router.navigate(['sign-in']);
  }

  navigateToSignUp() {
    this.router.navigate(['sign-up']);
  }
}
