import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../../../shared/interfaces';
import {AuthService} from '../../../shared/services/auth.service';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-login-registration',
  templateUrl: './login-registration.component.html',
  styleUrls: ['./login-registration.component.css']
})
export class LoginRegistrationComponent implements OnInit {

  registrationWrapper = false;
  loginWrapper = true;
  loginForm: FormGroup;
  registrationForm: FormGroup;
  submitted: boolean;
  message: string;

  constructor(public auth: AuthService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.createLoginForm();
    this.createRegistrationForm();


    this.route.queryParams.subscribe((params: Params) => {
      if (params.loginAgain) {
        this.message = 'Будь-ласка авторизуйтеся.';
      }
    });
  }

  createLoginForm() {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }

  createRegistrationForm() {
    this.registrationForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      firstName: new FormControl(null, [Validators.required]),
      lastName: new FormControl(null, [Validators.required]),
      subscribeCheckbox: new FormControl(null)
    });
  }

  login() {
    if (this.loginForm.invalid) {
      return;
    }
    this.submitted = true;

    const user: User = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    };


    this.auth.login(user).subscribe(() => {
      this.loginForm.reset();
      this.router.navigate(['/account']);
      this.submitted = false;
    }, () => {
      this.submitted = false;
    });
  }

  registration() {
    if (this.registrationForm.invalid) {
      return;
    }
    this.submitted = true;

    const user: User = {
      email: this.registrationForm.value.email,
      password: this.registrationForm.value.password
    };


    this.auth.registration(user).subscribe(() => {
      this.registrationForm.reset();
      this.router.navigate(['/account']);
      this.submitted = false;
    }, () => {
      this.submitted = false;
    });
  }

}
