import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  private cartSum;
  constructor() { }
  setSum(cart: any) {
    this.cartSum = cart;
  }
  getSum() {
    return this.cartSum
  }
}