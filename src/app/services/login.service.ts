import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private urlBase = `http://localhost:8080`;

  private apiUrl = `${this.urlBase}/restful/services/simple.LoginJugador/actions/LoginJugador/invoke`;

  constructor(private http: HttpClient) {}
  telefono: string = '';
  password: string = '';
  email: string = '';

  login(telefono: string, password: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Basic c3ZlbjpwYXNz',
    });

    const body = JSON.stringify({
      telefono: {
        value: telefono,
      },
      password: {
        value: password,
      },
    });

    // Guardar temporalmente las credenciales
    this.telefono = telefono;
    this.password = password;

    localStorage.setItem('telefono', telefono);

    return this.http.post(this.apiUrl, body, { headers });
  }

  usuarioEstaAutenticado(telefono: string, password: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Basic c3ZlbjpwYXNz',
    });

    const body = JSON.stringify({
      telefono: {
        value: telefono,
      },
      password: {
        value: password,
      },
    });

    return this.http.post(this.apiUrl, body, { headers });
  }
}
