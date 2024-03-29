import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../cart.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-rice-products',
  templateUrl: './rice-products.component.html',
  styleUrls: ['./rice-products.component.css']
})
export class RiceProductsComponent implements OnInit {
  public loading : boolean = false;
  riceproductsarray = [];
  constructor(private userservice: UserService, private router: Router, private cartService: CartService, private toaster: ToastrService) { }

  ngOnInit(): void {
    this.loading = true
    this.userservice.getriceproducts().subscribe(
      res => {
        this.loading = false;
        this.riceproductsarray = res["message"]
      },
      err => {
        this.loading = false;
        console.log("error from rice products", err)
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