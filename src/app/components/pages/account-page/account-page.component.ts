import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../shared/services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.css']
})
export class AccountPageComponent implements OnInit {

  open = false;

  constructor(private auth: AuthService,
              private router: Router) {
  }

  ngOnInit(): void {
  }

  logout(event) {
    event.preventDefault();
    this.auth.logout();
    this.router.navigate(['login-registration']);
  }

}
