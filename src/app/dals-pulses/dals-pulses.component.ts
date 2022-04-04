import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../cart.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-dals-pulses',
  templateUrl: './dals-pulses.component.html',
  styleUrls: ['./dals-pulses.component.css']
})
export class DalsPulsesComponent implements OnInit {
  products = [];
  dalsarray = [];
  public loading : boolean = false
  constructor(private userservice: UserService, private router: Router, private toaster: ToastrService, private cartService: CartService) { }

  ngOnInit(): void {
    this.loading = true
    this.userservice.getdals().subscribe(
      res => {
        this.loading = false
        this.dalsarray = res["message"]
      },
      err => {
        this.loading = false
        console.log("error from dals pulses", err)
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
          // alert(res["message"])
          this.toaster.success(res["message"]);
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