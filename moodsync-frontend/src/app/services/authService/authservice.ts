import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterModel } from '../../models/register.model';
import { LoginModel } from '../../models/login.model';
import { AuthResponse } from '../../models/AuthResponse.model';

@Injectable({
  providedIn: 'root',
})
export class Authservice {

  private readonly API_URL = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient) {}

  register(userData: RegisterModel) {
  return this.http.post<AuthResponse>(
    `${this.API_URL}/register`,
    userData
  );
  }

  login(credentials: LoginModel) {
    return this.http.post<AuthResponse>(
      `${this.API_URL}/login`,
      credentials
    );
  }

  updateProfile(

    userId: number,

    payload: any

  ) {

    return this.http.put(

      `${this.API_URL}/profile/${userId}`,

      payload
    );
  }

  saveUser(user: any) {

    localStorage.setItem(

      'user',

      JSON.stringify(user)
    );
  }

  getUser() {
  const user = localStorage.getItem('user');

  return user
    ? JSON.parse(user)
    : null;
  }

  logout() {
    localStorage.removeItem('user');
  }
}