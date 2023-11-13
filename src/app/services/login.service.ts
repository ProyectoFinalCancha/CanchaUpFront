import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'http://localhost:8080/restful/services/simple.LoginJugador/actions/LoginJugador/invoke';

  constructor(private http: HttpClient) { }

  login(telefono: string, password: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic c3ZlbjpwYXNz'
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
