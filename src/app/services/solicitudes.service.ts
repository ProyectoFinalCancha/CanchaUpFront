import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SolicitudesService {


  //SOLICITUDES POR EQUIPO
  private POST_URL = 'http://localhost:8080/restful/services/simple.SolicitudService/actions/crearSolicitud/invoke';
  private Get_URL = 'http://localhost:8080/restful/services/simple.SolicitudEquipoServices/actions/';

  //SOLICITUDES SIMPLES
  private apiUrl = 'http://localhost:8080/restful/services/simple.SolicituService';


  constructor(private http: HttpClient) { }

  // Método para crear una solicitud de equipo
  crearSolicitudEquipo(dia: string, telefono: string): Observable<any> {
    const solicitudData = {
      dia: { value: dia },
      telefono: { value: telefono }
    };

    // Realiza una solicitud HTTP POST al servicio
    return this.http.post(this.POST_URL, solicitudData);
  }

  obtenerSolicitudesEquipo(): Observable<any[]> {
    const url = this.Get_URL + 'verSolicitudes/invoke';
    return this.http.post<any[]>(url, {});
  }



  crearSolicitud(dia: string, telefono: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { dia, telefono };
    return this.http.post(this.apiUrl + '/actions/crearSolicitud/invoke', body, { headers });
  }

  verSolicitudes(): Observable<any> {
    return this.http.get(this.apiUrl + '/actions/verSolicitudes/invoke');
  }
}
