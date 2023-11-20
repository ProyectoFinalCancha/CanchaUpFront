import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginEncargadoService {

  private apiUrl = 'http://localhost:8080/restful/services/simple.LoginAdmin/actions/LoginAdmin/invoke';

  constructor(private http: HttpClient) { }
  telefono: string = '';
  password: string = '';




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
// Guardar temporalmente las credenciales
this.telefono = telefono;
this.password = password;
    return this.http.post(this.apiUrl, body, { headers });
  }

  usuarioEncargadoEstaAutenticado(telefono: string, password: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Basic c3ZlbjpwYXNz'
    });

    const body = JSON.stringify({
      telefono: {
        value: telefono
      },
      password: {
        value: password
      }
    });

    return this.http.post(this.apiUrl, body, { headers });
  }
}
