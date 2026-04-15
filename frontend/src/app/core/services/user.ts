import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginResponse } from '../models/login-response';
import { LoginRequest } from '../models/login';
import { Observable } from 'rxjs';
import { RegisterRequest } from '../models/register';
import { Auth } from './auth';

@Injectable({
  providedIn: 'root',
})
export class User {
  private http = inject(HttpClient);
  private router = inject(Router);
  private apiUrl = 'http://localhost:5023/user';
  private auth = inject(Auth)

getUsers() {
  return this.http.get<any[]>(`${this.apiUrl}/users`);
}

deleteUserWithPassword(data: { id: number; password: string }) {
  return this.http.post(`${this.apiUrl}/users/delete`, data);
}

getUserId(): number | null {
  const token = this.auth.getToken();
  if (!token) return null;

  const payload = JSON.parse(atob(token.split('.')[1]));

  return Number(
    payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]
  );
}

getUserRole(): string | null {
  const token = localStorage.getItem('token');
  if (!token) return null;

  const payload = JSON.parse(atob(token.split('.')[1]));

  return payload[
    "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
  ];
}

isAdmin(): boolean {
  return this.getUserRole() === 'Admin';
}

getNome(): string | null {
  const token = localStorage.getItem('token');
  if (!token) return null;

  const payload = JSON.parse(atob(token.split('.')[1]));
  return payload["nome"];
}
}
