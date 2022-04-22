import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { responseData } from 'src/app/shared/responseData';
import { Login } from 'src/app/shared/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = environment.AUTH;
  private key = environment.KEY;

  constructor(private http: HttpClient) {}

  signUp(user: Login) {
    return this.http
      .post<responseData>(`${this.url}/accounts:signUp?key=${this.key}`, {
        ...user,
        returnSecureToken: true,
      })
      .pipe(catchError(this.handleError));
  }

  login(user: Login) {
    return this.http
      .post<responseData>(
        `${this.url}/accounts:signInWithPassword?key=${this.key}`,
        user
      )
      .pipe(catchError(this.handleError));
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
        error = 'The password is invalid or email is not valid.';
        break;

      case 'EMAIL_EXISTS':
        error = 'Email already signed up.';
        break;
    }

    return throwError(() => error);
  }
}
