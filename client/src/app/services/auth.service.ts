import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { app } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  api_url =  app.apiUrl + 'auth';

  constructor(
    private router : Router, 
    private http : HttpClient
  ) { }

  registerUser(user : any) {
    return this.http.post(this.api_url + '/register', user);
  }

  loginUser(user : any) {
    return this.http.post(this.api_url + '/login', user);
  }

  logoutUser() {
    localStorage.removeItem('token'); 
    this.router.navigate(['']);
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getUser() {
    return localStorage.getItem('user');
  }
}
