import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClient, HttpClientModule} from '@angular/common/http'
import {ReactiveFormsModule,FormsModule} from '@angular/forms'
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { AddproductComponent } from './addproduct/addproduct.component';
import { ProductlistComponent } from './productlist/productlist.component';
import { SearchPipe } from './search.pipe';


@NgModule({
  declarations: [AdminComponent, AddproductComponent, ProductlistComponent, SearchPipe],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class AdminModule { }
