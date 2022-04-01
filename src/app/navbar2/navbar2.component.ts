import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DalsPulsesComponent } from '../dals-pulses/dals-pulses.component';
import { UserService } from '../user.service';
import { Observable } from 'rxjs'
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navbar2',
  templateUrl: './navbar2.component.html',
  styleUrls: ['./navbar2.component.css']
})
export class Navbar2Component implements OnInit {
  dalsarray = [];
  constructor(private router: Router, private userservice: UserService, private toaster: ToastrService) { }

  ngOnInit(): void {
  }
}
