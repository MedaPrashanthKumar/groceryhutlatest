import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../cart.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-breakfast',
  templateUrl: './breakfast.component.html',
  styleUrls: ['./breakfast.component.css']
})
export class BreakfastComponent implements OnInit {
  breakfastarray = [];
  constructor(private userservice: UserService, private toaster: ToastrService, private cartService: CartService, private router: Router) { }

  ngOnInit(): void {
    this.userservice.getbreakfast().subscribe(
      res => {
        this.breakfastarray = res["message"]
      },
      err => {
        console.log("error from breakfast and Cereals", err)
      })
  }

  gotoViewProduct(productid) {
    this.router.navigateByUrl(`/viewproduct/${productid}`)
  }

  addToCart(product) {
    let username = localStorage.getItem("username");
    if (username == undefined) {
      this.toaster.error("Please login to Proceed With your order")
      this.router.navigateByUrl("/login")
    }

    else {
      let selectedProduct = {};
      selectedProduct["username"] = username;
      selectedProduct["product"] = product;
      console.log(selectedProduct)
      this.cartService.addToCart(selectedProduct).subscribe(
        res => {
          alert(res["message"])
          this.userservice.setCartSubjectSize(res["cartsize"])
          this.router.navigateByUrl(`/userdashboard/${username}`)
        },
        err => {
          alert("Error occurred")
          console.log(err)
        })
    }
  }
}