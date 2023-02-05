import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  // User details
  userLoginData: any = {};
  showToast: boolean = false;
  toastMsg: any;

  constructor(private service : AuthService, private router : Router) { }

  ngOnInit(): void {
  }

  // Login user function
  loginUser() {
  this.service.loginUser(this.userLoginData).subscribe({
    next: (res: any) => {
      if (res.success) {
        this.showToast = false;
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', res.data.user._id);
        this.router.navigate(['add']);
      } 
    },
    error: (err) => {
      this.showToast = true; 
      this.toastMsg = err.error.message;
    },
  });
}

}
