import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SolicitudesEquipoService {
  constructor(private http: HttpClient) {}

  crearSolicitudEquipo(
    dia: string,
    horario: string,
    telefono: string
  ): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: 'Basic c3ZlbjpwYXNz',
      Accept:
        'application/json;profile=urn:org.apache.causeway/v2;suppress=all',
      'Content-Type': 'application/json',
    });

    const body = {
      diaString: { value: dia },
      telefono: { value: telefono },
      horarioSting: { value: horario },
    };

    return this.http.post(
      'http://localhost:8080/restful/services/simple.SolicitudEquipoServices/actions/crearSolicitudEquipo/invoke',
      body,
      { headers: headers }
    );
  }

  verSolicitud(): Observable<any> {
    const url =
      'http://localhost:8080/restful/services/simple.SolicitudEquipoServices/actions/verSolicitudes/invoke';
    const headers = new HttpHeaders({
      Authorization: 'Basic c3ZlbjpwYXNz',
      Accept: 'application/json;profile=urn:org.apache.causeway/v2',
    });

    const body = {}; // Puedes pasar datos si es necesario

    return this.http.post(url, body, { headers });
  }

  cancelarSolicitudEquipo(objectId: string): Observable<any> {
    const url = `http://localhost:8080/restful/objects/simple.SolicitudEquipo/${objectId}/actions/cancelarSolicitud/invoke`;

    const headers = new HttpHeaders({
      Authorization: 'Basic c3ZlbjpwYXNz',
      Accept: 'application/json;profile=urn:org.apache.causeway/v2',
    });

    return this.http.post(url, null, { headers });
  }

  tieneSolicitud(telefono: string): Observable<any> {
    const url: string =
      'http://localhost:8080/restful/services/simple.SolicitudEquipoServices/actions/tieneSolicitud/invoke';

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
