import {Component, HostBinding, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {routingAnimation} from '../../shared/animations/routing-animation';
import {User} from '../../shared/interfaces';
import {AdminAuthService} from '../shared/services/admin-auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
  animations: [routingAnimation]
})

export class LoginPageComponent implements OnInit {

  @HostBinding('@routingAnimation') private routing;

  form: FormGroup;
  submitted = false;
  message: string;

  constructor(
    public auth: AdminAuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      if (params.loginAgain) {
        this.message = 'Будь-ласка авторизуйтеся.';
      }
    });

    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }
    this.submitted = true;

    const user: User = {
      email: this.form.value.email,
      password: this.form.value.password
    };


    this.auth.login(user).subscribe(() => {
      this.form.reset();
      this.router.navigate(['/admin', 'dashboard']);
      this.submitted = false;
    }, () => {
      this.submitted = false;
    });
  }

}
