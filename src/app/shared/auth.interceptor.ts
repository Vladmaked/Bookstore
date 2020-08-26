import {Injectable} from '@angular/core';
import {HttpInterceptor} from '@angular/common/http';
import {Router} from '@angular/router';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {AdminAuthService} from '../admin/shared/services/admin-auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private auth: AdminAuthService,
    private router: Router) {
  }

  intercept(
    req: import('@angular/common/http').HttpRequest<any>,
    next: import('@angular/common/http')
      .HttpHandler): import('rxjs').Observable<import('@angular/common/http').HttpEvent<any>> {
    if (this.auth.isAuthenticated()) {
      req = req.clone({
        setParams: {
          auth: this.auth.token
        }
      });
    }
    return next.handle(req)
      .pipe(
        catchError(err => {
          if (err.status === 401) {
            this.auth.logout();
            this.router.navigate(['/admin', '']);
          }
          return throwError(err);
        })
      );
  }
}
