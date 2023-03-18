import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';

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

  

  constructor(private service : AuthService, private router : Router, private toastr : ToastrService) { }

  ngOnInit(): void {
  }

  // Login user function
  loginUser() {
  this.service.loginUser(this.userLoginData).subscribe({
    next: (res: any) => {
      if (res.success) {
        this.toastr.success('SuccsesFully Logged In');
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', res.data.user._id); 
        localStorage.setItem('userName', res.data.user.name);

        this.router.navigate(['']);
      } 
    },
    error: (err) => {
      this.toastr.error(err.error.message);
    },
  });
}

}
