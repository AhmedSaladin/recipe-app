import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { responseData } from 'src/app/shared/responseData';
import { RequestBody } from 'src/app/shared/user';
import { User } from 'src/app/shared/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = environment.AUTH;
  private key = environment.KEY;
  private tokenExpirationTimer!: any;
  user = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient, private router: Router) {}

  signUp(user: RequestBody) {
    return this.http
      .post<responseData>(`${this.url}/accounts:signUp?key=${this.key}`, {
        ...user,
        returnSecureToken: true,
      })
      .pipe(
        catchError(this.handleError),
        tap(this.handleAuthentication.bind(this))
      );
  }

  login(user: RequestBody) {
    return this.http
      .post<responseData>(
        `${this.url}/accounts:signInWithPassword?key=${this.key}`,
        {
          ...user,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap(this.handleAuthentication.bind(this))
      );
  }

  autoLogin() {
    const data = localStorage.getItem('user');
    if (!data) return;

    const { email, id, _token, _tokenExpirationDate } = JSON.parse(data);
    const user = new User(email, id, _token, new Date(_tokenExpirationDate));
    if (user.token) {
      this.user.next(user);
      const expirationDuration =
        new Date(_tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogOut(expirationDuration);
    }
  }

  private autoLogOut(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(
      () => this.logOut(),
      expirationDuration
    );
  }

  logOut() {
    this.user.next(null);
    localStorage.removeItem('user');
    this.router.navigate(['auth']);
    if (this.tokenExpirationTimer) clearTimeout(this.tokenExpirationTimer);
    this.tokenExpirationTimer = null;
  }

  private handleError(errorRes: HttpErrorResponse) {
    let error = 'Something went wrong, try again later.';
    if (!errorRes.error || !errorRes.error.error)
      return throwError(() => error);

    switch (errorRes.error.error.message) {
      case 'EMAIL_NOT_FOUND':
        error = 'Email not registered yet.';
        break;

      case 'INVALID_PASSWORD':
        error = 'The password is invalid or email is invalid.';
        break;

      case 'EMAIL_EXISTS':
        error = 'Email already signed up.';
        break;
    }

    return throwError(() => error);
  }

  private handleAuthentication(resData: responseData) {
    // + +resData.expiresIn cast string into number
    // *1000 because expiresIn in seconds and getTime return milliseconds
    const expiresIn = +resData.expiresIn * 1000;
    const expirationDate = new Date(new Date().getTime() + expiresIn);

    const user = new User(
      resData.email,
      resData.localId,
      resData.idToken,
      expirationDate
    );

    this.user.next(user);
    localStorage.setItem('user', JSON.stringify(user));
    this.autoLogOut(expiresIn);
  }
}
