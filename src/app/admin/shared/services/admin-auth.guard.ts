import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {AdminAuthService} from './admin-auth.service';

@Injectable()

export class AdminAuthGuard implements CanActivate {

  constructor(private auth: AdminAuthService,
              private route: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.auth.isAuthenticated()) {
      return true;
    } else {
      this.auth.logout();
      this.route.navigate(['/admin', 'login'], {
        queryParams: {
          loginAgain: true
        }
      });
    }
  }
}
