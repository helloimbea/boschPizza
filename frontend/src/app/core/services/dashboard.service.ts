import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private api = 'http://localhost:5023/dashboard';

  constructor(private http: HttpClient) {}

  getDashboard() {
    return this.http.get<any>(this.api);
  }
}