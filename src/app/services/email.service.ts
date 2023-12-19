import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  private apiUrl = 'http://localhost/forma2/';

  constructor(private http: HttpClient) {}

  enviarCorreo(
    dia: string,
    horario: string,
    email1: any,
    email2: any
  ): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const body = {
      dia: dia,
      horario: horario,
      email1: email1,
      email2: email2,
    };

    console.log('Enviando correo con cuerpo:', body);

    return this.http.post(this.apiUrl, body, { headers: headers });
  }
}
