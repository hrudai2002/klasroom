import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

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

  constructor(private service : AuthService) { }

  ngOnInit(): void {
  }

  // Register user function
  registerUser(){
    this.service.registerUser(this.registerUserData)
      .subscribe(
        (res: any) =>{
          if(res.success) {
            this.userRegistered  = true;
            localStorage.setItem('token', res.token);
          } else {
            console.log(res);
          }
        })
  };
}
