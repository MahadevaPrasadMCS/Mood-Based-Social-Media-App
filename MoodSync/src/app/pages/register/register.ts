import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { Authservice } from '../../services/authService/authservice';
import { RegisterModel } from '../../models/register.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './register.html',
  styleUrls: ['./register.css'],
})
export class Register implements OnInit {

  registerForm!: FormGroup;

  isLoading = false;

  showPassword = false;
  showConfirmPassword = false;

  constructor(
    private fb: FormBuilder,
    private authService: Authservice,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.registerForm = this.fb.group({

      username: ['', Validators.required],

      email: [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ],

      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6)
        ]
      ],

      confirmPassword: ['', Validators.required],
    });
  }

  // GETTERS

  get username() {
    return this.registerForm.get('username');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }

  // TOGGLE PASSWORD

  togglePassword(): void {

    this.showPassword = !this.showPassword;
  }

  toggleConfirmPassword(): void {

    this.showConfirmPassword = !this.showConfirmPassword;
  }

  // SUBMIT

  onSubmit(): void {

  if (this.registerForm.invalid) {
    return;
  }

  if (
    this.password?.value !==
    this.confirmPassword?.value
  ) {
    alert('Passwords do not match!');
    this.registerForm.reset();
    return;
  }

  this.isLoading = true;

  const userData = new RegisterModel(

    this.username?.value,
    this.email?.value,
    this.password?.value

  );

  this.authService.register(userData)
    .subscribe({

      next: (response) => {

        this.isLoading = false;

        if (response.success) {

          this.authService.saveUser(
            response.user
          );

          alert('Registration successful! Redirecting to login...');

          setTimeout(() => {

            this.router.navigate([
              '/login'
            ]);

          }, 2000);

        } else {
            alert(response.message);
            this.registerForm.reset();
        }
      },

      error: () => {

        this.isLoading = false;
        alert('An error occurred. Please try again later.');
        this.registerForm.reset();
      }
    });
}
}