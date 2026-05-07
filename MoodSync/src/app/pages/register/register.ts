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

  errorMessage = '';
  successMessage = '';

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

    // reset messages
    this.errorMessage = '';
    this.successMessage = '';

    // form validation
    if (this.registerForm.invalid) {

      this.registerForm.markAllAsTouched();

      return;
    }

    const formData = this.registerForm.value;

    // password match validation
    if (formData.password !== formData.confirmPassword) {

      this.errorMessage = 'Passwords do not match';

      return;
    }

    this.isLoading = true;

    // create model object
    const user = new RegisterModel(
      formData.username,
      formData.email,
      formData.password
    );

    // API call
    this.authService.register(user).subscribe({

      next: (response) => {

        console.log(response);

        this.isLoading = false;

        this.successMessage = 'Registration Successful';

        // redirect to login
        setTimeout(() => {

          this.router.navigate(['/login']);

        }, 1500);
      },

      error: (error) => {

        console.error(error);

        this.isLoading = false;

        this.errorMessage = 'Registration Failed';
      }
    });
  }
}