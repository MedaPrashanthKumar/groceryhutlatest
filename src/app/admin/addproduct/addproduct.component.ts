import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/admin.service';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit {
  constructor(private adminService: AdminService, private router: Router, private toaster: ToastrService) { }
  categoryArray = ["Dals&Pulses", "Flours & Grains", "Rice Products", "Dry Fruits", "Spices & Masalas", "Cooking Oils",
    "Diary Products", "Salt,Sugar&Jaggery", "Breakfast Sereals", "Other Grocery"]

  ngOnInit(): void {
  }

  file: File;
  incomingfile(event) {
    this.file = event.target.files[0];
  }

  formData = new FormData();
  onSubmit(formRef) {
    let userObj = formRef.value;
    this.formData.append('photo', this.file, this.file.name);
    this.formData.append("userObj", JSON.stringify(userObj))
    this.adminService.addNewProduct(this.formData).subscribe(
      res => {
        this.toaster.success(res["message"])
        formRef.resetForm();
      },
      err => {
        this.toaster.error("Something went wrong in creating new product")
        console.log(err)
        this.router.navigateByUrl('/productlist')
      }
    )
  }
}