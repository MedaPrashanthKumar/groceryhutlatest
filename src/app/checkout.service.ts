import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  private cartSum;
  constructor() { }
  setSum(cart: any) {
    this.cartSum = cart;
    console.log("in service sum is", cart)
  }
  getSum() {
    return this.cartSum
  }
}