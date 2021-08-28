import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //get token from storage
    let token = localStorage.getItem("token")
    //if token is not existed
    if (token == undefined) {
      return next.handle(req);
    }
    else {
      //add token to header of req obj
      let modifiedReqObj = req.clone({
        headers: req.headers.set("Authorization", "Bearer " + token)
      })
      //forward req obj to next
      return next.handle(modifiedReqObj)
    }
  }
}