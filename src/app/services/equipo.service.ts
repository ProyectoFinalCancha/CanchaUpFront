import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Equipo } from '../models/equipo';

@Injectable({
  providedIn: 'root'
})
export class EquipoService {
  private apiUrl_crear = 'http://localhost:8080/restful/services/simple.EquipoServices';
  private apiUrl_buscar = 'http://localhost:8080/restful/services/simple.EquipoServices';


  constructor(private http: HttpClient, private dialog: MatDialog) {}

  crearEquipo(nombre: string, telefono: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { nombre, telefono };
    return this.http.post(this.apiUrl_crear + '/actions/crearEquipo/invoke', body, { headers });
  }

  verEquipos(): Observable<Equipo[]> {
    const url: string = 'http://localhost:8080/restful/services/simple.EquipoServices/actions/verEquipos/invoke';
  
    const headers = new HttpHeaders({
      'Authorization': 'Basic c3ZlbjpwYXNz',
      'Accept': 'application/json;profile=urn:org.apache.causeway/v2',
    });
  
    return this.http.post<Equipo[]>(url, null, { headers: headers });
  }
  
  obtenerJugadores(): Observable<any> {
    const apiUrl:string = 'http://localhost:8080/restful/services/simple.JugadorServices/actions/verJugadores/invoke'
    const headers = new HttpHeaders({
      'Authorization': 'Basic c3ZlbjpwYXNz',
      'Accept': 'application/json;profile=urn:org.apache.causeway/v2',
    });

    return this.http.get<any>(apiUrl, { headers });
  }

  buscarEquipo(telefono: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { telefono };
    return this.http.post(this.apiUrl_buscar + '/actions/buscarEquipo/invoke', body, { headers });
  }

//   abrirPopupCrearEquipo(equipoData: Equipo): void {
//     const dialogRef2 = this.dialog.open(PopCrearEquipoComponent, {
//       width:'450px',
//       height:'450px',
//         data: equipoData
//     });
//     dialogRef2.afterClosed().subscribe(result => {
//         // Maneja el resultado si es necesario
//     });
// }

}
