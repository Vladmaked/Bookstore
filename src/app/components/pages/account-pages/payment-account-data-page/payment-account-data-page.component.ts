import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-payment-account-data-page',
  templateUrl: './payment-account-data-page.component.html',
  styleUrls: ['./payment-account-data-page.component.css']
})
export class PaymentAccountDataPageComponent implements OnInit {

  paymentAccountDataForm: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.createPaymentAccountDataForm();
  }

  createPaymentAccountDataForm() {
    this.paymentAccountDataForm = new FormGroup({
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      street: new FormControl(null, Validators.required),
      houseNumber: new FormControl(null, Validators.required),
      city: new FormControl(null, Validators.required),
      postcode: new FormControl(null, Validators.required)
    });
  }

  saveChange() {
    console.log(this.paymentAccountDataForm.value);
  }

}
