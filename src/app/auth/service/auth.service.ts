import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, throwError } from 'rxjs';
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
  user = new Subject<User>();

  constructor(private http: HttpClient) {}

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
        user
      )
      .pipe(
        catchError(this.handleError),
        tap(this.handleAuthentication.bind(this))
      );
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
    const expirationDate = new Date(
      new Date().getTime() + +resData.expiresIn * 1000
    );

    const user = new User(
      resData.email,
      resData.localId,
      resData.idToken,
      expirationDate
    );

    this.user.next(user);
  }
}
