import { Injectable } from '@angular/core';
import { EstadosPartido, Partido } from '../models/partido';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PartidoService {
  partidos: Partido[] = [];

  private urlBase = `http://localhost:8080`;

  constructor(private http: HttpClient) {}

  verPartidos(): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: 'Basic c3ZlbjpwYXNz',
      Accept: 'application/json;profile=urn:org.apache.causeway/v2',
    });
    return this.http.get<any>(
      `${this.urlBase}/restful/services/simple.PartidoServices/actions/verPartidos/invoke`,
      { headers }
    );
  }
  //

  // En tu servicio (PartidoService)
  // En tu servicio (PartidoService)
  sacarTurno(
    horario: string,
    diaString: string,
    telefono: string
  ): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: 'Basic c3ZlbjpwYXNz',
      Accept:
        'application/json;profile=urn:org.apache.causeway/v2;suppress=all',
    });

    const body = {
      horarioSting: { value: horario },
      diaString: { value: diaString },
      telefono: { value: telefono },
    };

    return this.http.post<any>(
      `${this.urlBase}/restful/services/simple.PartidoServices/actions/sacarTurno/invoke`,
      body,
      { headers }
    );
  }

  crearPartido(nuevoPartido: Partido): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: 'Basic c3ZlbjpwYXNz',
      Accept:
        'application/json;profile=urn:org.apache.causeway/v2;suppress=all',
      'Content-Type': 'application/json',
    });
    const requestBody = {
      horarioSting: { value: nuevoPartido.horario },
      diaString: { value: nuevoPartido.dia },
      telefono: { value: nuevoPartido.telefono },
      precio: { value: nuevoPartido.precio },
    };

    return this.http
      .post(
        `${this.urlBase}/restful/services/simple.PartidoServices/actions/crearPartido/invoke`,
        requestBody,
        { headers }
      )
      .pipe(
        catchError((error: any) => {
          console.error('Error en la solicitud:', error);
          return throwError(
            'Error al procesar la solicitud. Por favor, inténtalo de nuevo más tarde.'
          );
        })
      );
  }

  rechazarPartido(instanceId: string): Observable<any> {
    const url = `${this.urlBase}/restful/objects/simple.Partido/${instanceId}/actions/rechazar/invoke`;

    const headers = new HttpHeaders({
      Authorization: 'Basic c3ZlbjpwYXNz',
      Accept: 'application/json;profile=urn:org.apache.causeway/v2',
    });

    return this.http.put(url, null, { headers });
  }

  darDeBaja(instanceId: string): Observable<any> {
    const url = `${this.urlBase}/restful/objects/simple.Partido/${instanceId}/actions/darDeBaja/invoke`;

    const headers = new HttpHeaders({
      Authorization: 'Basic c3ZlbjpwYXNz',
      Accept: 'application/json;profile=urn:org.apache.causeway/v2',
    });

    return this.http.post(url, null, { headers });
  }

  confirmarPartido(instanceId: string): Observable<any> {
    const url = `${this.urlBase}/restful/objects/simple.Partido/${instanceId}/actions/completar/invoke`;

    const headers = new HttpHeaders({
      Authorization: 'Basic c3ZlbjpwYXNz',
      Accept: 'application/json;profile=urn:org.apache.causeway/v2',
    });

    return this.http.put(url, null, { headers });
  }

  completar(instanceId: string): Observable<any> {
    const url = `${this.urlBase}/restful/objects/simple.Partido/${instanceId}/actions/confirmar/invoke`;

    const headers = new HttpHeaders({
      Authorization: 'Basic c3ZlbjpwYXNz',
      Accept: 'application/json;profile=urn:org.apache.causeway/v2',
    });

    return this.http.put<any>(url, null, { headers });
  }

  buscarPartidoPorRepresentante(telefono: string): Observable<Partido[]> {
    const url = `${this.urlBase}/restful/services/simple.PartidoServices/actions/buscarPartidoPorRepresentante/invoke?telefono="${telefono}"`;

    const headers = new HttpHeaders({
      Authorization: 'Basic c3ZlbjpwYXNz',
      Accept: 'application/json;profile=urn:org.apache.causeway/v2',
    });

    return this.http.get<Partido[]>(url, { headers });
  }

  buscarPartidoEstado(estado: string): Observable<any> {
    const url = `${this.urlBase}/restful/services/simple.PartidoServices/actions/buscarPartidosPorEstados/invoke?estadosString=${estado}`;

    const headers = new HttpHeaders({
      Authorization: 'Basic c3ZlbjpwYXNz',
      Accept: 'application/json;profile=urn:org.apache.causeway/v2',
      'Content-Type': 'application/json',
    });

    return this.http.get(url, { headers });
  }

  buscarPartido(
    horario: string,
    dia: string,
    numeroCancha: string
  ): Observable<any> {
    const url = `${this.urlBase}/restful/services/simple.PartidoServices/actions/buscarPartido/invoke`;

    const headers = new HttpHeaders({
      Authorization: 'Basic c3ZlbjpwYXNz',
      Accept: 'application/json;profile=urn:org.apache.causeway/v2',
      'Content-Type': 'application/json',
    });

    const body = {
      horario: horario,
      dia: dia,
      numeroCancha: numeroCancha,
    };

    return this.http.post(url, body, { headers });
  }

  hayPartido(telefono: string): Observable<any> {
    const url: string = `${this.urlBase}/restful/services/simple.PartidoServices/actions/hayPartido/invoke`;

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
}
