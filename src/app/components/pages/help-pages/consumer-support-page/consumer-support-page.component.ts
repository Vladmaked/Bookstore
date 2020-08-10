import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-consumer-support-page',
  templateUrl: './consumer-support-page.component.html',
  styleUrls: ['./consumer-support-page.component.css']
})
export class ConsumerSupportPageComponent implements OnInit {

  formOrderQuestion: FormGroup;
  formGetAdvice: FormGroup;

  constructor() {
  }

  ngOnInit(): void {
    this.createFormOrderQuestion();
    this.createFormGetAdvice();
  }

  createFormOrderQuestion() {
    this.formOrderQuestion = new FormGroup({
      name: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required),
      topic: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      orderNumber: new FormControl(null, Validators.required),
      action: new FormControl(null),
      addition: new FormControl(null)
    });
  }

  createFormGetAdvice() {
    this.formGetAdvice = new FormGroup({
      name: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required),
      topic: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      addition: new FormControl(null)
    });
  }

  sendQuestion() {
    console.log(this.formOrderQuestion.value);
  }

  getAdvice() {
    console.log(this.formGetAdvice.value);
  }
}
