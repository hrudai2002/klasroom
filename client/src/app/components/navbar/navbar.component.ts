import { Component, OnInit, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service'
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isLogged : boolean = false;

  constructor(
    private router : Router,
    private authService : AuthService,
    private toastr: ToastrService
  ){}

  ngOnInit(): void {
    this.isLogged = this.authService.loggedIn();
  }

  navigateTo(navigate: string) {
    this.router.navigate([navigate]);
  }

  logOut() {
    this.authService.logoutUser();
    this.toastr.success('SuccessFully Logged Out');
    this.isLogged = this.authService.loggedIn();
  }
}

