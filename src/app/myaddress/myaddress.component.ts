import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../user.service';

@Component({
  selector: 'app-myaddress',
  templateUrl: './myaddress.component.html',
  styleUrls: ['./myaddress.component.css']
})
export class MyaddressComponent implements OnInit {
  submitted: boolean = false;
  countryArray = ["Australia", "Brazil", "Canada", "India", "Japan", "USA"]
  constructor(private toaster: ToastrService, private us: UserService, private router: Router) { }
  ngOnInit(): void {
  }

  onSubmit(formRef) {
    this.submitted = true;
    if (formRef.valid) {
      this.toaster.success("New Address added Successfully!!!");
      let addressobj = formRef.value;
      console.log(addressobj);
      formRef.resetForm();
    }
    else {
      this.toaster.error("Error in adding address")
    }
  }
}
