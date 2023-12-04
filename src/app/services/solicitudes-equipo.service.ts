import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SolicitudesEquipoService {

  
  constructor(private http: HttpClient) {}

  crearSolicitudEquipo(dia: string, telefono: string, horario: string): Observable<any> {
    const url = "http://localhost:8080/restful/services/simple.SolicitudEquipoServices/actions/crearSolicitudEquipo/invoke";

    const headers = new HttpHeaders({
      Accept: "application/json;profile=urn:org.apache.causeway/v2",
      "Content-Type": "application/json",
      Authorization: "Basic c3ZlbjpwYXNz",
    });

    const body = {
      diaString: {
        value: dia,
      },
      telefono: {
        value: telefono,
      },
      horarioSting: {
        value: horario,
      },
    };

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
}
