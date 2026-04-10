import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../models/cliente';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5023/cliente';

  getAll() : Observable<Cliente[]>{
    return this.http.get<Cliente[]>(this.apiUrl)
  }

  getById(id : number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.apiUrl}/${id}`)
  }

  create(data: Cliente): Observable<Cliente>{
    return this.http.post<Cliente>(`${this.apiUrl}`, data);
  }

  update(id: number, data: Cliente): Observable<void>{
    return this.http.put<void>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}
