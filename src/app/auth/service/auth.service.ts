import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { responseData } from 'src/app/shared/responseData';
import { User } from 'src/app/shared/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = environment.AUTH;
  private key = environment.KEY;

  constructor(private http: HttpClient) {}

  signUp(user: User) {
    return this.http
      .post<responseData>(`${this.url}/accounts:signUp?key=${this.key}`, {
        ...user,
        returnSecureToken: true,
      })
      .pipe(
        catchError((response) => {
          let error = 'Something went wrong, try again later.';
          if (!response.error || !response.error.error)
            return throwError(error);

          switch (response.error.error.message) {
            case 'EMAIL_EXISTS':
              error = 'Email already signed up.';
          }

          return throwError(error);
        })
      );
  }

  login(user: User) {
    return this.http.post(
      `${this.url}/accounts:signInWithPassword?key=${this.key}`,
      user
    );
  }
}
