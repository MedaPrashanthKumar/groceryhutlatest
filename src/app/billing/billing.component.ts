import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../cart.service';
import { CheckoutService } from '../checkout.service';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css']
})
export class BillingComponent implements OnInit {
  username;
  cart = [];
  sum = 0;
  constructor(private router: Router, private chckout: CheckoutService, private cartservice: CartService) { }

  ngOnInit(): void {
    this.username = localStorage.getItem("username")
    this.cartservice.getCartByUsername(this.username).subscribe(
      res => {
        this.cart = res['userCart']
        console.log("from cart", this.cart)
        for (let i = 0; i < this.cart.length; i++) {
          this.sum = this.sum + this.cart[i].productprice
          console.log("from sum is", this.cart[i].productprice)
        }
        this.chckout.setSum(this.sum)
      },
      err => {
        console.log("error in cart", err)
      }
    )
    console.log("cart", this.cart)
  }
  onSubmit(formRef) {
  }
  payment() {
    this.router.navigateByUrl("/payment")
  }
}
