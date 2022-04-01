import { Component, OnInit } from '@angular/core';
import { ToastRef, ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/admin.service';
import { SearchPipe } from '../../search.pipe'

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.css']
})
export class ProductlistComponent implements OnInit {
  products = [];
  productsStatus: boolean = false;
  searchTerm: string;

  constructor(private adminservice: AdminService, private toaster: ToastrService) { }

  ngOnInit(): void {
    this.adminservice.getProducts().subscribe(
      res => {
        if (res["message"] == "empty") {
          this.productsStatus = true;
        }
        if (res["message"] == "nonempty") {
          this.products = res["products"]
        }
      },
      err => {
        this.toaster.error("Error on fetcing products..Please try again")
        console.log(err)
      }
    )
  }

  edit(product) {
    product.isEdit = true;
  }

  delete(product) {
    this.adminservice.deleteProduct(product).subscribe(
      res => {
        if (res["message"]) {

          this.toaster.success("Product Removed Successfully!!")
        }

      },
      err => {
        this.toaster.error("Something went wrong")
        console.log(err)
      }
    )
  }

  save(product) {
    product.isEdit = false;
    this.adminservice.editProduct(product).subscribe(
      res => {
        if (res["message"]) {
          this.toaster.success("Product Updated Successfully!!")
        }
      },
      err => {
        this.toaster.success("Something went wrong")
        console.log(err)
      }
    )
  }

  cancel(product) {
    product.isEdit = false;
  }
}