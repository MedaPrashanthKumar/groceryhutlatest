import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AdminService } from '../admin.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginStatus: boolean = false;
  logStatus: boolean;
  usercredobj;
  $subs: Subscription;
  public loading: boolean = false


  constructor(private us: UserService, private router: Router, private adminservice: AdminService, private toaster: ToastrService) { }

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

  // -----------------------------logged in person as user------------------------------
  onSelect(ref) {
    this.loading = true;
    let usercredobj = ref.value;
    if (usercredobj.person == "user") {
      this.us.loginUser(usercredobj).subscribe(
        res => {
          if (res["message"] == "success") {
            this.toaster.success("User login Successfull !!!");
            // for token it is there normally so no need to change anyting about it
            localStorage.setItem("token", res["token"])
            // but when coming to user it is in the form of js object .we need to convert to string and then store it 
            // let userObj=JSON.stringify(res["user"])
            localStorage.setItem("username", res["username"])
            this.loading = false;
            this.loginStatus = true;
            this.us.LoginStatusMethod(this.loginStatus)
            let username = localStorage.getItem("username")
            this.router.navigateByUrl(`/userdashboard/${username}`)
            ref.resetForm();
          }
          else {
            if (res["message"] == "invaliduser" || "invalidpassword")
              this.loading = false;
            this.toaster.error(res["message"])
          }
        },
        err => {
          this.loading = false;
          alert("Error occurred")
          console.log(err)
        })
    }


    //  for admin
    if (usercredobj.person == "admin" && (usercredobj.username == "admin" && usercredobj.password == "admin123")) {
      this.toaster.success(" Admin login successfull !!!")
      this.adminservice.adminLogin(usercredobj).subscribe(
        res => {
          localStorage.setItem("token", res["token"])
          localStorage.setItem("admin", res["username"])
          this.loading = false;
          this.router.navigateByUrl("/admin")
          ref.resetForm();
        },
        err => {
          this.loading = false;
          console.log(err)
        })
    }
    else {
      if ((usercredobj.person == "admin" && (usercredobj.username != "admin" || usercredobj.password != "admin123"))) {
        this.loading = false;
        this.toaster.error("Invalid username or password...")
      }
    }
  }
}