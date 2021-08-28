import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  $subs: Subscription;
  logStatus: boolean;
  constructor(private us: UserService, private router: Router, private toaster: ToastrService) { }

  ngOnInit(): void {
    this.$subs = this.us.receiveLoginState().subscribe(d => {
      this.logStatus = d;
    })
  }

  LoggedIn() {
    return localStorage.getItem('token')
  }

  ngOnDestroy() {
    this.$subs.unsubscribe();
  }

  logoutuser() {
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    this.logStatus = false;
    this.router.navigateByUrl("/home")
  }

  onSubmit(formRef) {
    let userobj = formRef.value;
    this.us.createUser(userobj).subscribe(
      res => {
        if (res["message"] == "user created") {
          this.toaster.success("User registration success")
          this.router.navigateByUrl("/login")
          formRef.resetForm();
        }
        if (res["message"] == "user existed") {
          this.toaster.warning("Username " + userobj.username + " is already existed.Please choose another")
          formRef.resetForm();
        }
      },
      err => {
        this.toaster.error("something went wrong !!")
        console.log(err)
      })
  }
}