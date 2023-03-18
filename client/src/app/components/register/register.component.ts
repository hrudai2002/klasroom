import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  // Data storage
  registerUserData : any = {}

  userRegistered = false;
  alreadyRegistered = false;

  constructor(private service : AuthService,
     private toastr : ToastrService
    ) { }

  ngOnInit(): void {
  }

  // Register user function
  registerUser(){
    this.service.registerUser(this.registerUserData)
      .subscribe(
        (res: any) =>{
          if(res.success) {
            this.userRegistered  = true;
            this.toastr.success('Registered Sucessfully');
            localStorage.setItem('token', res.token);
          } else {
            this.toastr.error(res.message);
          }
        })
  };
}
