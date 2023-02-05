import { HttpInterceptor } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(
    private service : AuthService, 
    private injector : Injector
    ) { }

  intercept(req : any , next : any){
    let tokenizedReq = req.clone({
      setHeaders : {
        Authorization : `Bearer ${this.service.getToken()}`
      }
    });

    return next.handle(tokenizedReq)
};

}
