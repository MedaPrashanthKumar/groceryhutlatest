import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CheckoutService } from '../checkout.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  cart = [];
  sum: number = 0;
  username: String;
  constructor(private chckout: CheckoutService, private toaster: ToastrService, private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.sum = this.chckout.getSum()
  }

  onSubmit(formRef) {
    this.toaster.success("Payment Successfull!! Thank you for shopping with us")
    this.router.navigateByUrl("/home")
  }
}
