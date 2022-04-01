import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Toast, ToastrService } from 'ngx-toastr';
import { CartService } from '../cart.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-spices-masalas',
  templateUrl: './spices-masalas.component.html',
  styleUrls: ['./spices-masalas.component.css']
})
export class SpicesMasalasComponent implements OnInit {
  spicesarray = [];
  constructor(private userservice: UserService, private router: Router, private toaster: ToastrService, private cartService: CartService) { }
  ngOnInit(): void {
    this.userservice.getspicesmasala().subscribe(
      res => {
        //  res["message"]
        this.spicesarray = res["message"]
      },
      err => {
        console.log("error from Spices and masalas", err)
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
      this.cartService.addToCart(selectedProduct).subscribe(
        res => {
          alert(res["message"])
          //inform about cartsize to user service
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