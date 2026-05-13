import { Component, OnInit } from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import {
  Router,
  RouterLink
} from '@angular/router';

import { CommonModule } from '@angular/common';

import { Authservice } from '../../services/authService/authservice';

import { LoginModel } from '../../models/login.model';

@Component({
  selector: 'app-login',
  standalone: true,

  imports: [
    CommonModule,
    RouterLink,
    ReactiveFormsModule
  ],

  templateUrl: './login.html',

  styleUrls: ['./login.css']
})

export class Login implements OnInit {

  loginForm!: FormGroup;

  isLoading = false;

  errorMessage = '';
  successMessage = '';

  showPassword = false;

  constructor(
    private fb: FormBuilder,
    private authService: Authservice,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.loginForm = this.fb.group({

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
      ]

    });
  }

  // GETTERS

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  // TOGGLE PASSWORD

  togglePassword(): void {

    this.showPassword =
      !this.showPassword;
  }

  // SUBMIT

  onSubmit(): void {

    if (this.loginForm.invalid) {
      return;
    }

    this.isLoading = true;

    const credentials = new LoginModel(

      this.email?.value,
      this.password?.value

    );

    this.authService.login(credentials)
      .subscribe({

        next: (response) => {

          this.isLoading = false;

          if (response.success) {

            this.authService.saveUser(
              response.user
            );

            alert(
              response.message
            );

            setTimeout(() => {

              this.router.navigate([
                '/user/dashboard'
              ]);

            }, 1500);

          } else {

            alert(
              response.message
            );
          }
        },

        error: () => {

          this.isLoading = false;

          alert(
            'An error occurred while logging in. Please try again.'
          );
        }
      });
  }
}