import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../cart.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-dry-fruits',
  templateUrl: './dry-fruits.component.html',
  styleUrls: ['./dry-fruits.component.css']
})
export class DryFruitsComponent implements OnInit {
  dryfruitsarray = [];
  constructor(private userservice: UserService, private router: Router, private toaster: ToastrService, private cartService: CartService) { }

  ngOnInit(): void {
    this.userservice.getdryfruits().subscribe(
      res => {
        this.dryfruitsarray = res["message"]
      },
      err => {
        console.log("error from Dry fruits", err)
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