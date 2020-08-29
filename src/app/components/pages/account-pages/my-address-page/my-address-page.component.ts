import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-my-address-page',
  templateUrl: './my-address-page.component.html',
  styleUrls: ['./my-address-page.component.css']
})
export class MyAddressPageComponent implements OnInit {

  myAddressForm: FormGroup;

  constructor() {
  }

  ngOnInit(): void {
    this.createMyAddressForm();
  }

  createMyAddressForm() {
    this.myAddressForm = new FormGroup({
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      phoneNumber: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required),
      street: new FormControl(null, Validators.required),
      houseNumber: new FormControl(null, Validators.required),
      city: new FormControl(null, Validators.required),
      postcode: new FormControl(null, Validators.required),
      additionalInformation: new FormControl(null)
    });
  }

  saveChange() {
    console.log(this.myAddressForm.value);
  }

}
