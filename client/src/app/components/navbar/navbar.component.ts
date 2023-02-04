import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor(
    private router : Router
  ){}

  navigateToHome() {
    this.router.navigate(['/']);
  }

  navigateToAddResource() {
    this.router.navigate(['/add']);
  }

  navigateToAbout() {
    this.router.navigate(['/about']);
  }
}

