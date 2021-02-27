import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, Subject, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {fbDbEnvironment} from '../../environments/environment';
import {FbAuthResponse, User} from '../models';

@Injectable()

export class AuthService {

  constructor(private http: HttpClient) {
  }

  get token(): string {
    const expDate = new Date(localStorage.getItem('fb-token-exp'));
    if (new Date() > expDate) {
      this.logout();
      return null;
    }
    return localStorage.getItem('fb-token');
  }

  public error$: Subject<string> = new Subject<string>();

  private static setToken(response: FbAuthResponse | null) {
    if (response) {
      const expDate = new Date(new Date().getTime() + +response.expiresIn * 1000);
      localStorage.setItem('fb-token', response.idToken);
      localStorage.setItem('fb-token-exp', expDate.toString());
    } else {
      localStorage.clear();
    }
  }

  login(user: User): Observable<any> {
    user.returnSecureToken = true;
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${fbDbEnvironment.apiKey}`, user)
      .pipe(
        tap(AuthService.setToken),
        catchError(this.handleError.bind(this))
      );
  }

  registration(user: User): Observable<any> {
    user.returnSecureToken = true;
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${fbDbEnvironment.apiKey}`, user)
      .pipe(
        tap(AuthService.setToken),
        catchError(this.handleError.bind(this))
      );
  }

  logout() {
    AuthService.setToken(null);
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  private handleError(error: HttpErrorResponse) {
    const {message} = error.error.error;
    switch (message) {
      case 'EMAIL_NOT_FOUND':
        this.error$.next('Такий email не знайдено.');
        break;
      case 'INVALID_EMAIL':
        this.error$.next('Невірний email.');
        break;
      case 'INVALID_PASSWORD':
        this.error$.next('Невірний пароль.');
        break;
      case 'EMAIL_EXISTS':
        this.error$.next('Адреса електронної пошти вже використовується іншим аккаунтом.');
        break;
    }
    return throwError(error);
  }
}
