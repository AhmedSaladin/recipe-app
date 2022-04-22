import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
    return this.http.post<responseData>(
      `${this.url}/accounts:signUp?key=${this.key}`,
      {
        ...user,
        returnSecureToken: true,
      }
    );
  }

  login(user: User) {
    return this.http.post(
      `${this.url}/accounts:signInWithPassword?key=${this.key}`,
      user
    );
  }
}
