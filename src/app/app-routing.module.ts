import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BillingComponent } from './billing/billing.component';
import { BreakfastComponent } from './breakfast/breakfast.component';
import { CarouselComponent } from './carousel/carousel.component';
import { CartComponent } from './cart/cart.component';
import { CookingoilsComponent } from './cookingoils/cookingoils.component';
import { DairyproductsComponent } from './dairyproducts/dairyproducts.component';
import { DalsPulsesComponent } from './dals-pulses/dals-pulses.component';
import { DryFruitsComponent } from './dry-fruits/dry-fruits.component';
import { FloursGrainsComponent } from './flours-grains/flours-grains.component';
import { FooterComponent } from './footer/footer.component';
import { HdfcComponent } from './hdfc/hdfc.component';
import { HomeComponent } from './home/home.component';
import { HomecardsComponent } from './homecards/homecards.component';
import { LoginComponent } from './login/login.component';
import { MyaddressComponent } from './myaddress/myaddress.component';
import { MyordersComponent } from './myorders/myorders.component';
import { MyprofileComponent } from './myprofile/myprofile.component';
import { Navbar1Component } from './navbar1/navbar1.component';
import { Navbar2Component } from './navbar2/navbar2.component';
import { OilsGheesComponent } from './oils-ghees/oils-ghees.component';
import { OthergroceryComponent } from './othergrocery/othergrocery.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { PaymentComponent } from './payment/payment.component';
import { RegisterComponent } from './register/register.component';
import { RiceProductsComponent } from './rice-products/rice-products.component';
import { SaltComponent } from './salt/salt.component';
import { SpicesMasalasComponent } from './spices-masalas/spices-masalas.component';
import { UserdashboardComponent } from './userdashboard/userdashboard.component';
import { ViewproductComponent } from './viewproduct/viewproduct.component';
import { WishlistComponent } from './wishlist/wishlist.component';


const routes: Routes = [
  { path: "register", component: RegisterComponent },
  { path: "home", component: HomeComponent },
  { path: "carousel", component: CarouselComponent },
  { path: "hdfc", component: HdfcComponent },
  { path: "oils-ghees", component: OilsGheesComponent },
  { path: "navbar1", component: Navbar1Component },
  { path: "navbar2", component: Navbar2Component },
  // 2nd navbar-------
  { path: "dals-pulses", component: DalsPulsesComponent },
  { path: "flours-grains", component: FloursGrainsComponent },
  { path: "riceproducts", component: RiceProductsComponent },
  { path: "dryfruits", component: DryFruitsComponent },
  { path: "spices-masalas", component: SpicesMasalasComponent },
  { path: "cookingoils", component: CookingoilsComponent },
  { path: "dairyproducts", component: DairyproductsComponent },
  { path: "salt", component: SaltComponent },
  { path: "breakfast", component: BreakfastComponent },
  { path: "othergrocery", component: OthergroceryComponent },
  {
    path: "userdashboard/:username", component: UserdashboardComponent, children: [
      // user dashboard components  
      { path: "myprofile", component: MyprofileComponent },
      { path: "myaddress", component: MyaddressComponent },
      { path: "wishlist", component: WishlistComponent },
      { path: "myorders", component: MyordersComponent },
    ]
  },
  { path: "billing", component: BillingComponent },
  { path: "payment", component: PaymentComponent },
  // cards component
  { path: "homecards", component: HomecardsComponent },
  { path: "footer", component: FooterComponent },
  { path: "login", component: LoginComponent },
  { path: "cart", component: CartComponent },
  { path: "viewproduct/:productid", component: ViewproductComponent },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "**", component: PagenotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }