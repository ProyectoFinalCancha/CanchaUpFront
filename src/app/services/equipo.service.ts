import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EquipoService {
  private apiUrl_crear = 'http://localhost:8080/restful/services/simple.EquipoServices';
  private apiUrl_buscar = 'http://localhost:8080/restful/services/simple.EquipoServices';


  constructor(private http: HttpClient) {}

  crearEquipo(nombre: string, telefono: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { nombre, telefono };
    return this.http.post(this.apiUrl_crear + '/actions/crearEquipo/invoke', body, { headers });
  }

  verEquipos(): Observable<any> {
    return this.http.post(this.apiUrl_crear + '/actions/verEquipos/invoke', {});
  }


  buscarEquipo(telefono: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { telefono };
    return this.http.post(this.apiUrl_buscar + '/actions/buscarEquipo/invoke', body, { headers });
  }
}
