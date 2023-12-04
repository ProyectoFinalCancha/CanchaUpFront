import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SolicitudesService {

  private apiUrl = 'http://localhost:8080/restful/services/simple.SolicituService/actions/crearSolicitud/invoke';
  private cancelarUrlBase = 'http://localhost:8080/restful/objects/simple.Solicitud';

  constructor(private http: HttpClient) {}

  crearSolicitud(dia: string, telefono: string, horario: string): Observable<any> {
    const headers = new HttpHeaders({
      Accept: 'application/json;profile=urn:org.apache.causeway/v2',
      'Content-Type': 'application/json',
      Authorization: 'Basic c3ZlbjpwYXNz',
    });

    const body = {
      diaString: { value: dia },
      telefono: { value: telefono },
      horarioSting: { value: horario },
    };

    return this.http.post(this.apiUrl, body, { headers: headers });
  }

  
  cancelarSolicitud(objectId: string): Observable<any> {
    const url = `${this.cancelarUrlBase}/${objectId}/actions/cancelarSolicitud/invoke`;

    const headers = new HttpHeaders({
      Authorization: 'Basic c3ZlbjpwYXNz',
      Accept: 'application/json;profile=urn:org.apache.causeway/v2',
    });

    return this.http.post(url, null, { headers: headers });
  }
}
