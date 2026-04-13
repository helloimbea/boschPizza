import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginResponse } from '../models/login-response';
import { LoginRequest } from '../models/login';
import { Observable } from 'rxjs';
import { RegisterRequest } from '../models/register';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private http = inject(HttpClient);
  private router = inject(Router);
  private apiUrl = 'http://localhost:5023/auth';

  login(data: LoginRequest): Observable<LoginResponse>{
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, data);
  }

  saveToken(token: string): void{
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  register(data: RegisterRequest): Observable<any> {
  return this.http.post(`${this.apiUrl}/register`, data);
}
}
