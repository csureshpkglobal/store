import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-billing-page',
  templateUrl: './billing-page.component.html',
  styleUrls: ['./billing-page.component.css'],
})
export class BillingPageComponent implements OnInit {
  constructor() {}
  isValid = true;
  ngOnInit(): void {}
  onSubmit(f: NgForm) {
    console.log(f);
  }
}
