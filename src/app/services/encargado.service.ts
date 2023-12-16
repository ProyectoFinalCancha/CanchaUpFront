import { Injectable } from '@angular/core';
import { Encargado } from '../models/encargado';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EncargadoService {
  private urlBase = 'http://localhost:8080';

  encargado: Encargado[] = [];

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Basic c3ZlbjpwYXNz',
    Accept: 'application/json;profile=urn:org.apache.causeway/v2',
  });

  constructor(private http: HttpClient) {}

  crearEncargado(nuevoEncargado: Encargado): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: 'Basic c3ZlbjpwYXNz',
      Accept:
        'application/json;profile=urn:org.apache.causeway/v2;suppress=all',
      'Content-Type': 'application/json',
    });

    const body = {
      nombre: { value: nuevoEncargado.nombre },
      apellido: { value: nuevoEncargado.apellido },
      dni: { value: nuevoEncargado.dni },
      telefono: { value: nuevoEncargado.telefono },
      password: { value: nuevoEncargado.password },
    };

    return this.http
      .post(
        this.urlBase +
          '/restful/services/simple.EncargadoServices/actions/crearEncargado/invoke',
        body,
        { headers }
      )
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any): Observable<any> {
    console.error('Error en la solicitud:', error);
    return throwError(
      'Error al procesar la solicitud. Por favor, inténtalo de nuevo más tarde.'
    );
  }

  getEncargados(): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: 'Basic c3ZlbjpwYXNz',
      Accept: 'application/json;profile=urn:org.apache.causeway/v2',
    });
    return this.http.get<any>(
      this.urlBase +
        '/restful/services/simple.EncargadoServices/actions/verEncargados/invoke',
      { headers }
    );
  }

  buscarEncargadoPorTelefono(telefono: string): Observable<any> {
    const requestOptions = {
      headers: this.headers,
    };

    return this.http.get(
      `${this.urlBase}/restful/services/simple.EncargadoServices/actions/buscarEncargado/invoke?telefono="${telefono}"`,
      requestOptions
    );
  }

  eliminarEncargado(instanceId: string): Observable<any> {
    const url = `${this.urlBase}/restful/objects/simple.Encargado/${instanceId}/actions/eliminarEncargado/invoke`;
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
