import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterModel } from '../../models/register.model';

@Injectable({
  providedIn: 'root',
})
export class Authservice {

  private readonly API_URL = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient) {}

  register(userData: RegisterModel) {
    return this.http.post(
      `${this.API_URL}/register`,
      userData
    );
  }

  login(credentials: LoginModel) {
    return this.http.post(
      `${this.API_URL}/login`,
      credentials
    );
  }

  saveUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser() {
    return localStorage.getItem('user');
  }

  logout() {
    localStorage.removeItem('user');
  }
}