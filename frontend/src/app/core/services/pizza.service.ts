import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pizza } from '../models/pizza';

@Injectable({
  providedIn: 'root',
})
export class PizzaService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5023/pizza';

  getAll() : Observable<Pizza[]>{
    return this.http.get<Pizza[]>(this.apiUrl)
  }

  getById(id : number): Observable<Pizza> {
    return this.http.get<Pizza>(`${this.apiUrl}/${id}`)
  }

  create(data: Pizza): Observable<Pizza>{
    return this.http.post<Pizza>(`${this.apiUrl}`, data);
  }

  update(id: number, data: Pizza): Observable<void>{
    return this.http.put<void>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}
