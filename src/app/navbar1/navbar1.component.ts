import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
// import * as EventEmitter from 'node:events';
import { Subscription } from 'rxjs';
import { AdminService } from '../admin.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-navbar1',
  templateUrl: './navbar1.component.html',
  styleUrls: ['./navbar1.component.css']
})
export class Navbar1Component implements OnInit {
  loginStatus:boolean=false;
  logStatus:boolean;
 usercredobj;
  $subs: Subscription;
  searchTerm:string;
  products=[];

  constructor(private us:UserService ,private toaster:ToastrService,private router:Router,private adminservice:AdminService) { }

  ngOnInit(): void {
    this.$subs = this.us.receiveLoginState().subscribe(d=>{
      this.logStatus=d;
    })
    // search pipe
    this.us.getdatafromoutside().subscribe(
      res=>{
        this.products = res;
      },
      err=>{
        this.toaster.error("Something went wrong in searching")
        console.log("from navbar1",err)
      })
  }

  LoggedIn(){
    return localStorage.getItem('token')
  }

  logoff(){
    return localStorage.getItem('token')
  }

  ngOnDestroy(){
    this.$subs.unsubscribe();
  }

logoutuser(){
  localStorage.removeItem('token')
  localStorage.removeItem('username')
  localStorage.removeItem('userCart')
  this.logStatus = false;
  this.router.navigateByUrl("/home")
}

//------------------------- register---------------------
  onSubmit(formRef){
    let userobj = formRef.value;
    this.us.createUser(userobj).subscribe(
      res=>{
        if(res["message"]=="user created"){
          alert("User registration success")
          // this.router.navigateByUrl("/login")
          formRef.resetForm();
        }
        if(res["message"]=="user existed"){
          alert("Username "+userobj.username+ " is already existed.Please choose another")
           formRef.resetForm();
        }
      },
      err=>{
        alert("something went wrong!!")
        console.log(err)
      })}}
