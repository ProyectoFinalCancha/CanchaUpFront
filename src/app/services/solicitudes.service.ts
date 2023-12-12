import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { Solicitud } from '../models/solicitud';

@Injectable({
  providedIn: 'root',
})
export class SolicitudesService {
  solicitudes: Solicitud[] = [];

  private apiUrl =
    'http://localhost:8080/restful/services/simple.SolicituService/actions/crearSolicitud/invoke';

  private cancelarUrlBase =
    'http://localhost:8080/restful/objects/simple.Solicitud';

  constructor(private http: HttpClient) {}

  crearSolicitud(
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

    return this.http.post(this.apiUrl, body, { headers: headers });
  }

  cancelarSolicitud(instanceId: { id: string }): Observable<any> {
    const url = `${this.cancelarUrlBase}/${instanceId.id}/actions/cancelarSolicitud/invoke`;

    const headers = new HttpHeaders({
      Authorization: 'Basic c3ZlbjpwYXNz',
      Accept:
        'application/json;profile=urn:org.apache.causeway/v2;suppress=all',
    });

    console.log('Cancelando solicitud con ID:', instanceId.id);

    return this.http.post(url, null, { headers }).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse && error.status === 404) {
          console.error(
            'La solicitud no pudo ser encontrada. Posiblemente ya ha sido eliminada.'
          );
        } else {
          console.error('Error al cancelar la solicitud:', error);
        }
        throw error; // Propaga el error para que pueda ser manejado en el componente.
      })
    );
  }

  verSolicitud(): Observable<any> {
    const url =
      'http://localhost:8080/restful/services/simple.SolicituService/actions/verSolicitudes/invoke';
    const headers = new HttpHeaders({
      Authorization: 'Basic c3ZlbjpwYXNz',
      Accept: 'application/json;profile=urn:org.apache.causeway/v2',
    });

    const body = {}; // Puedes pasar datos si es necesario

    return this.http.post(url, body, { headers });
  }
}
