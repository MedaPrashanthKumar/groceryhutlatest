import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../cart.service';
import { CheckoutService } from '../checkout.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart = [];
  sum: number = 0;
  item;
  username: any;
  i: any;
  public loading : boolean = false

  constructor(private cartservice: CartService, private router: Router, private userservice: UserService, private toaster: ToastrService, private chckout: CheckoutService) {
  }

  ngOnInit(): void {
    this.username = localStorage.getItem("username")
    this.cartservice.getCartByUsername(this.username).subscribe(
      res => {
        this.cart = res['userCart']
        for (let i = 0; i < this.cart.length; i++) {
          this.sum = this.sum + this.cart[i].productprice
        }
        this.chckout.setSum(this.sum)
      },
      err => {
        console.log("error in cart", err)
      }
    )
  }

  deleteprodincart(item) {
    this.sum = 0;
    let id = item.productid
    let cartObj = { "username": this.username, "id": id }
    this.userservice.deleteprodfromcart(cartObj).subscribe(
      res => {
        if (res['message'] == "failed") {
          this.toaster.error(res['reason'])
          localStorage.clear()
        }
        else {
          this.cart = res['product']
          for (let i of this.cart) {
            this.sum = this.sum + i.productprice
          }
          this.chckout.setSum(this.sum)
          this.toaster.success(res['message'])
        }
      },
      err => {
        alert("something went wrong")
        console.log(err)
      }
    )
  }

  minus(item: any) {
    this.sum = 0;
    item.productprice = (item.productprice) / item.quantity
    if (item.quantity > 1) {
      item.quantity--;
      item.quantity = item.quantity;
      item.productprice = (item.quantity * item.productprice)
    }
    this.userservice.updatetotal(item).subscribe(
      res => {
        if (res['message'] = "updated successfully") {
          this.toaster.success("updated success")
          this.cart = res['a']
          for (let i of this.cart) {
            this.sum = this.sum + i.productprice
          }
          this.chckout.setSum(this.sum)
        }
      },
      err => {
        this.toaster.error("update failed")
      }
    );
  }

  plus(item: any) {
    this.sum = 0;
    item.productprice = (item.productprice) / item.quantity
    item.quantity = ++item.quantity;
    item.productprice = (item.quantity * item.productprice)
    this.userservice.updatetotal(item).subscribe(
      res => {
        if (res['message'] = "updated successfully") {
          this.toaster.success("updated success")
          this.cart = res['a']
          for (let i of this.cart) {
            this.sum = this.sum + i.productprice
          }
          this.chckout.setSum(this.sum)
        }
      },
      err => {
        this.toaster.error("update failed")
      }
    )
  }

  payment() {
    this.router.navigateByUrl("/payment")
  }
  billing() {
    this.router.navigateByUrl("/billing")
  }
}