import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../admin.service';
import { ProductlistComponent } from '../admin/productlist/productlist.component';
import { CartService } from '../cart.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-viewproduct',
  templateUrl: './viewproduct.component.html',
  styleUrls: ['./viewproduct.component.css']
})
export class ViewproductComponent implements OnInit {
  product: Product;
  constructor(private acr: ActivatedRoute, private userService: UserService,
    private cartService: CartService, private router: Router,
    private adminservice: AdminService, private toaster: ToastrService) { }

  ngOnInit(): void {
    this.acr.paramMap.subscribe(data => {
      this.adminservice.getProductById(data["params"].productid).subscribe(
        res => {
          this.product = res["product"]
        },
        err => {
          // alert("Error in reading product")
          this.toaster.error("Error in reading product")
          console.log(err)
        })
    })
  }

  addProductToCart(product) {
    let username = localStorage.getItem("username");
    //if no user logged in
    if (username == undefined) {
      // alert("Please login to continue")
      this.toaster.warning("Please login to continue with your order!!")
      this.router.navigateByUrl("/login")
    }
    else {
      let selectedProduct = {};
      selectedProduct["username"] = username;
      selectedProduct["product"] = product;
      this.cartService.addToCart(selectedProduct).subscribe(
        res => {
          this.toaster.success(res["message"])
          this.userService.setCartSize(res["cartsize"])

          this.router.navigateByUrl(`/userdashboard/${username}`)
        },
        err => {
          this.toaster.error("Error occurred")
          console.log(err)
        })
    }
  }
}

interface Product {
  productid: number;
  productname: string;
  productdescription: string;
  productimage: string;
  productprice: number;
}