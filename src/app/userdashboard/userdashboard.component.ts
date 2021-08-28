import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../admin.service';
import { CartService } from '../cart.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-userdashboard',
  templateUrl: './userdashboard.component.html',
  styleUrls: ['./userdashboard.component.css']
})
export class UserdashboardComponent implements OnInit {
  searchTerm: string;
  searchobj = [];
  products = [];
  username: String;
  userCartSize;
  constructor(private userService: UserService, private adminservice: AdminService, private router: Router, private cartService: CartService, private toaster: ToastrService) { }

  ngOnInit(): void {
    this.adminservice.getproduct().subscribe(
      res => {
        this.products = res["message"];
        return this.products;
      },
      err => {
        console.log(err)
      }
    )

    this.username = localStorage.getItem("username")
    console.log("hello", this.username)
    this.cartStatus();
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
          this.toaster.success(res["message"])
          //inform about cartsize to user service
          this.userService.setCartSubjectSize(res["cartsize"])
          this.router.navigateByUrl(`/userdashboard/${username}`)
        },
        err => {
          alert("Error occurred")
          console.log(err)
        })
    }
  }

  cartStatus() {
    //  this.username=JSON.parse(localStorage.getItem("user"))["username"]
    // this.username=JSON.parse(localStorage.getItem("username"))["username"]---changed this
    this.username = localStorage.getItem("username")
    // this.username=localStorage.getItem("username")["username"]
    this.userService.getInitialCartSize(this.username).subscribe(
      res => {
        this.userService.setCartSubjectSize(res["cartsize"])
        this.userCartSize = res["cartsize"]
        this.userService.getCartSubjectSize().subscribe(c => {
          this.userCartSize = c;
        })
        //  localStorage.setItem("cartsize",this.userCartSize)
        localStorage.setItem("userCart", JSON.stringify(res["userCart"]))
      },
      err => {
        alert("Error occurred")
        console.log(err)
      })
  }

  userLogout() {
    this.userService.logoutUser();
  }

  showUserCart() {
    this.router.navigateByUrl('/cart')
  }
}