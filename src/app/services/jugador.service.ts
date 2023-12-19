import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, tap, throwError } from 'rxjs';
import { Jugador } from '../models/jugador';

@Injectable({
  providedIn: 'root',
})
export class JugadorService {
  private urlBase = 'http://localhost:8080';

  private baseUrl =
    'http://localhost:8080/restful/services/simple.JugadorServices/actions/';
  jugador: Jugador[] = [];

  constructor(private http: HttpClient) {}

  buscarJugadorPorTelefono(telefono: string): Observable<any> {
    const requestOptions = {
      headers: new HttpHeaders({
        Authorization: 'Basic c3ZlbjpwYXNz',
        Accept: 'application/json;profile=urn:org.apache.causeway/v2',
      }),
    };

    const apiUrl = `${this.urlBase}/restful/services/simple.JugadorServices/actions/buscarJugador/invoke?telefono="${telefono}"`;

    return this.http.get(apiUrl, requestOptions);
  }

  obtenerJugadores(): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: 'Basic c3ZlbjpwYXNz',
      Accept: 'application/json;profile=urn:org.apache.causeway/v2',
    });

    return this.http.get<any>(
      `${this.urlBase}/restful/services/simple.JugadorServices/actions/verJugadores/invoke`,
      { headers }
    );
  }

  crearJugador(nuevoJugador: Jugador): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: 'Basic c3ZlbjpwYXNz',
      Accept:
        'application/json;profile=urn:org.apache.causeway/v2;suppress=all',
      'Content-Type': 'application/json',
    });

    const requestBody = {
      nombre: { value: nuevoJugador.nombre },
      apellido: { value: nuevoJugador.apellido },
      telefono: { value: nuevoJugador.telefono },
      mail: { value: nuevoJugador.mail },
      password: { value: nuevoJugador.password },
      fechaDeNacimientoString: { value: nuevoJugador.fechaDeNacimiento },
    };

    return this.http.post(
      `${this.urlBase}/restful/services/simple.JugadorServices/actions/crearJugador/invoke`,
      requestBody,
      { headers }
    );
  }

  eliminarJugador(instanceId: string): Observable<any> {
    const url = `${this.urlBase}/restful/objects/simple.Jugador/${instanceId}/actions/eliminarJugador/invoke`;

    const headers = new HttpHeaders({
      Authorization: 'Basic c3ZlbjpwYXNz',
      Accept: 'application/json',
    });

    return this.http.post(url, null, { headers }).pipe(
      catchError((error) => {
        console.error('Error en la solicitud HTTP:', error);
        throw error;
      })
    );
  }
}
