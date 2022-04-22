import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RequestBody } from '../shared/user';
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

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

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
    const user = new RequestBody(form.email, form.password);
    this.isLoading = true;
    if (this.isLoginMode) this.login(user);
    else this.signUp(user);
  }

  login(user: RequestBody) {
    this.authService.login(user).subscribe({
      next: this.onSuccess.bind(this),
      error: this.onError.bind(this),
    });
  }

  signUp(user: RequestBody) {
    this.authService.signUp(user).subscribe({
      next: this.onSuccess.bind(this),
      error: this.onError.bind(this),
    });
  }

  private onError(error: any) {
    this.isLoading = false;
    this.error = error;
  }

  private onSuccess() {
    this.isLoading = false;
    this.router.navigate(['/recipes']);
  }
}
