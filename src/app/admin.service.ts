import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  constructor(private hc: HttpClient) { }

  // admin login
  adminLogin(usercredobj): Observable<any> {
    return this.hc.post("/admin/login", usercredobj)
  }

  //  admin added product
  addNewProduct(formData): Observable<any> {
    return this.hc.post("/admin/addproduct", formData)
  }

  // getproducts
  getProducts(): Observable<any> {
    return this.hc.get("/admin/products")
  }
  // -------------------------------UPDATE PRODUCTS----------------from pr

  editProduct(obj: object): Observable<any> {
    return this.hc.put("/product/updateproduct", obj)
  }

  //  retreive products added by admin to home page--from pr
  getproduct(): Observable<any> {
    return this.hc.get("/product/cardstohome")
  }

  // from rs
  // get product by id
  getProductById(productid): Observable<any> {
    return this.hc.get(`/admin/product/${productid}`)
  }
  // delete product
  deleteProduct(product: object): Observable<any> {
    console.log("admin from delete product service", product)
    return this.hc.post("/product/removeproduct", product)
  }
}
