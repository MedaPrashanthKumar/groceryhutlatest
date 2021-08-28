import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../cart.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-cookingoils',
  templateUrl: './cookingoils.component.html',
  styleUrls: ['./cookingoils.component.css']
})
export class CookingoilsComponent implements OnInit {
  cookingoilsarray=[];
  constructor(private userservice:UserService,private router:Router,private toaster:ToastrService,private cartService:CartService) { }

  ngOnInit(): void {
    this.userservice.getcookingoils().subscribe(
      res=>{
         this.cookingoilsarray = res["message"]
      },
      err=>{
        console.log("error from Cooking Oils",err)
      })}

  
  gotoViewProduct(productid){
    this.router.navigateByUrl(`/viewproduct/${productid}`)
   }

   addToCart(product){
 let username=localStorage.getItem("username");
 if(username==undefined){
  this.toaster.error("Please login to Proceed With your order")
  this.router.navigateByUrl("/login")

}
else{
  let selectedProduct={};
  selectedProduct["username"]=username;
  selectedProduct["product"]=product;
  console.log(selectedProduct)
  this.cartService.addToCart(selectedProduct).subscribe(
    res=>{
      alert(res["message"])
       this.userservice.setCartSubjectSize(res["cartsize"])
      this.router.navigateByUrl(`/userdashboard/${username}`)
    },
    err=>{
      alert("Error occurred")
      console.log(err)
    })}
  }}