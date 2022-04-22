import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Login } from '../shared/user';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  authForm!: FormGroup;
  isLoading = false;
  error!: string;

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.authForm = this.fb.group({
      email: [null, Validators.required],
      password: [null, Validators.required],
    });
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit() {
    const form = this.authForm.value;
    const user = new Login(form.email, form.password);
    this.isLoading = true;
    if (this.isLoginMode) this.login(user);
    else this.signUp(user);
  }

  login(user: Login) {
    this.authService.login(user).subscribe({
      next: (data) => {
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
        this.error = error;
      },
    });
  }

  signUp(user: Login) {
    this.authService.signUp(user).subscribe({
      next: (data) => {
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
        this.error = error;
      },
    });
  }
}
