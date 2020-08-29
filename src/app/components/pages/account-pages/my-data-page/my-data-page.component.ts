import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-my-data-page',
  templateUrl: './my-data-page.component.html',
  styleUrls: ['./my-data-page.component.css']
})
export class MyDataPageComponent implements OnInit {

  myDataForm: FormGroup;

  constructor() {
  }

  ngOnInit(): void {
    this.createMyDataForm();
  }

  createMyDataForm() {
    this.myDataForm = new FormGroup({
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      phoneNumber: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required),
      dateOfBirth: new FormControl(null),
      currentPassword: new FormControl(null),
      newPassword: new FormControl(null),
      confirmedPassword: new FormControl(null),
      subscribeCheckbox: new FormControl(null),
      gender: new FormControl(null)
    });
  }

  saveChange() {
    console.log(this.myDataForm.value);
  }
}
