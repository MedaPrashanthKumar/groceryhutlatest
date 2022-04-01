import { HttpClient } from '@angular/common/http';
import { Route } from '@angular/compiler/src/core';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private subject = new Subject<any>();
  userCartSize: number = 0;
  constructor(private hc: HttpClient, private router: Router) { }
  // create user
  createUser(userObj): Observable<any> {
    return this.hc.post("/user/register", userObj)
  }
  // login user
  loginUser(usercredobj): Observable<any> {
    return this.hc.post("/user/login", usercredobj)
  }
  // ------search pipe-----------
  getdatafromoutside(): Observable<any> {
    return this.hc.get("/product/cardstohome")
  }
  // logout
  logoutUser() {
    localStorage.clear();
    this.router.navigateByUrl("/home")
  }

  LoginStatusMethod(loginstate) {
    this.subject.next(loginstate)
  }

  receiveLoginState(): Observable<any> {
    return this.subject.asObservable();
  }

  getProfileDetails(username): Observable<any> {
    return this.hc.get(`/user/getsingleuserprofiledetail/${username}`)
  }

  // increment and decrement
  updatetotal(i: any): Observable<any> {
    return this.hc.put(`/cart/updatetotal/${localStorage.getItem("username")}`, i)
  }

  // --------CATEGORIES----------
  // dals-pulses
  getdals(): Observable<any> {
    return this.hc.get("/product/getproductsofdals")
  }

  // flours-grains
  getfloursgrains(): Observable<any> {
    return this.hc.get("/product/getfloursgrains")
  }

  // riceproducts
  getriceproducts(): Observable<any> {
    return this.hc.get("/product/getriceproducts")
  }

  // dryfruits
  getdryfruits(): Observable<any> {
    return this.hc.get("/product/getdryfruits")
  }

  // spices and masalas
  getspicesmasala(): Observable<any> {
    return this.hc.get("/product/getspicesmasalas")
  }

  // Cooking oils
  getcookingoils(): Observable<any> {
    return this.hc.get("/product/getcookingoils")
  }

  // Cooking oils
  getDairyProducts(): Observable<any> {
    return this.hc.get("/product/getdairyproducts")
  }

  // salts and sugars
  getsaltsSugars(): Observable<any> {
    return this.hc.get("/product/getsaltsSugars")
  }

  // Breakfast and cereals
  getbreakfast(): Observable<any> {
    return this.hc.get("/product/getbreakfastcereals")
  }

  // Others array
  getothersarray(): Observable<any> {
    return this.hc.get("/product/getothersarray")
  }


  // -----USER Cart------
  setCartSize(newSize) {
    this.userCartSize = newSize;
  }
  getCartSize() {
    return this.userCartSize;
  }
  getInitialCartSize(username): Observable<any> {
    return this.hc.get(`/cart/getcart/${username}`)
  }
  // delete product by id in user cart
  deleteprodfromcart(cartObj): Observable<any> {
    return this.hc.post("/cart/removeprodfromcart", cartObj)
  }

  cartsize = 0;
  private cartSubject: BehaviorSubject<any> = new BehaviorSubject(this.cartsize);
  getCartSubjectSize(): Observable<any> {
    return this.cartSubject.asObservable();
  }
  setCartSubjectSize(cartsize: any) {
    this.cartSubject.next(cartsize);
  }
}