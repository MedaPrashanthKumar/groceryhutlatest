import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../user.service';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css']
})
export class MyprofileComponent implements OnInit {

  constructor(private us: UserService, private router: Router, private toaster: ToastrService) { }
  username: any;
  userfromBackend;

  ngOnInit(): void {
    this.username = localStorage.getItem("username")
    this.us.getProfileDetails(this.username).subscribe(
      res => {
        if (res["message"] == "failed") {
          this.toaster.error(res["reason"])
          this.router.navigateByUrl("/login")
          localStorage.clear()
        }
        else {
          this.userfromBackend = res["message"];
        }
      },
      err => {
        //  alert("Error occured in fetchin Profile details")
        this.toaster.error("Error occured in fetching Profile details")
        console.log(err)
      })
  }
}