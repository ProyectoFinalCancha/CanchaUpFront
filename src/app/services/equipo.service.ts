import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Equipo } from '../models/equipo';

@Injectable({
  providedIn: 'root',
})
export class EquipoService {
  constructor(private http: HttpClient, private dialog: MatDialog) {}

  verEquipos(): Observable<any[]> {
    const url: string =
      'http://localhost:8080/restful/services/simple.EquipoServices/actions/verEquipos/invoke';

    const headers = new HttpHeaders({
      Authorization: 'Basic c3ZlbjpwYXNz',
      Accept: 'application/json;profile=urn:org.apache.causeway/v2',
    });

    return this.http.post<any[]>(url, null, { headers: headers });
  }

  eliminarJugador(telefono: string, instanceId: string): Observable<any> {
    const url =
      'http://localhost:8080/restful/objects/simple.Equipo/${instanceId}/actions/eliminarJugadorDeEquipo/invoke';
    const headers = new HttpHeaders({
      Authorization: 'Basic c3ZlbjpwYXNz',
      Accept:
        'application/json;profile=urn:org.apache.causeway/v2;suppress=all',
      'Content-Type': 'application/json',
    });

    const requestBody = {
      telefono: { value: telefono },
    };

    return this.http.post(url, requestBody, { headers }).pipe(
      catchError((error) => {
        console.error('Error en la solicitud HTTP:', error);
        throw error;
      })
    );
  }

  agregarJugador(telefono: string, instanceId: string): Observable<any> {
    const url =
      'http://localhost:8080/restful/objects/simple.Equipo/${instanceId}/actions/agregarJugadorAlEquipo/invoke';
    const headers = new HttpHeaders({
      Authorization: 'Basic c3ZlbjpwYXNz',
      Accept:
        'application/json;profile=urn:org.apache.causeway/v2;suppress=all',
      'Content-Type': 'application/json',
    });

    const requestBody = {
      telefono: { value: telefono },
    };

    return this.http.post(url, requestBody, { headers }).pipe(
      catchError((error) => {
        console.error('Error en la solicitud HTTP:', error);
        throw error;
      })
    );
  }

  obtenerJugadores(): Observable<any> {
    const apiUrl: string =
      'http://localhost:8080/restful/services/simple.JugadorServices/actions/verJugadores/invoke';
    const headers = new HttpHeaders({
      Authorization: 'Basic c3ZlbjpwYXNz',
      Accept: 'application/json;profile=urn:org.apache.causeway/v2',
    });

    return this.http.get<any>(apiUrl, { headers });
  }

  crearEquipo(telefono: string): Observable<any> {
    const url: string =
      'http://localhost:8080/restful/services/simple.EquipoServices/actions/crearEquipo/invoke';

    const headers = new HttpHeaders({
      Authorization: 'Basic c3ZlbjpwYXNz',
      Accept:
        'application/json;profile=urn:org.apache.causeway/v2;suppress=all',
      'Content-Type': 'application/json',
    });

    const requestBody = {
      telefono: { value: telefono },
    };

    return this.http.post(url, requestBody, { headers });
  }

  buscarEquipo(telefono: string): Observable<any> {
    const url: string =
      'http://localhost:8080/restful/services/simple.EquipoServices/actions/buscarEquipo/invoke';

    const headers = new HttpHeaders({
      Authorization: 'Basic c3ZlbjpwYXNz',
      Accept: 'application/json;profile=urn:org.apache.causeway/v2',
      'Content-Type': 'application/json',
    });

    const requestBody = {
      telefono: { value: telefono },
    };

    return this.http.post(url, requestBody, { headers });
  }

  eliminarEquipo(instanceId: string): Observable<any> {
    const url: string = `http://localhost:8080/restful/objects/simple.Equipo/${instanceId}/actions/eliminarEquipo/invoke`;

    const headers = new HttpHeaders({
      Authorization: 'Basic c3ZlbjpwYXNz',
      Accept: 'application/json;profile=urn:org.apache.causeway/v2',
    });

    return this.http.post(url, { headers });
  }
}
