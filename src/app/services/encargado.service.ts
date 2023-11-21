import { Injectable } from '@angular/core';
import { Encargado } from '../models/encargado';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EncargadoService {

  private apiUrl = 'http://localhost:8080/restful/services/simple.EncargadoServices/actions/crearEncargado/invoke';

  private api_GET = 'http://localhost:8080/restful/services/simple.EncargadoServices/actions/verEncargados/invoke';

  private apiBuscarEncargado = 'http://localhost:8080/restful/services/simple.EncargadoServices/actions/buscarEncargado/invoke';
 
  private apiEliminarEncargado = 'http://localhost:8080/restful/objects/simple.Encargado/';

  encargado : Encargado[] = [];

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Basic c3ZlbjpwYXNz',
    'Accept': 'application/json;profile=urn:org.apache.causeway/v2'
  });

  constructor(private http: HttpClient) { }

  crearEncargado(nuevoEncargado:Encargado): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Basic c3ZlbjpwYXNz',
      'Accept': 'application/json;profile=urn:org.apache.causeway/v2;suppress=all',
      'Content-Type': 'application/json',
    });

    const body = {
      nombre: { value: nuevoEncargado.nombre },
      apellido: { value: nuevoEncargado.apellido },
      dni: { value: nuevoEncargado.dni },
      telefono: { value: nuevoEncargado.telefono },
      password: { value: nuevoEncargado.password }
    };

    return this.http.post(this.apiUrl, body, { headers})
    .pipe(
      catchError(this.handleError)
    );;
  }

  private handleError(error: any): Observable<any> {
    console.error('Error en la solicitud:', error);
    return throwError('Error al procesar la solicitud. Por favor, inténtalo de nuevo más tarde.');
  }




  getEncargados(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Basic c3ZlbjpwYXNz',
      'Accept': 'application/json;profile=urn:org.apache.causeway/v2',
    });
    return this.http.get<any>(this.api_GET, { headers });
  }

  buscarEncargadoPorTelefono(telefono: string): Observable<any> {
    const requestOptions = {
      headers: this.headers
    };

    return this.http.get(`${this.apiBuscarEncargado}?telefono=${telefono}`, requestOptions);
  }

  
  eliminarEncargado(instanceId: string): Observable<any> {
    const url = `${this.apiEliminarEncargado}${instanceId}/actions/eliminarEncargado/invoke`;
    const headers = new HttpHeaders({
      'Authorization': 'Basic c3ZlbjpwYXNz',
      'Accept': 'application/json'
    });

    return this.http.post(url, null, { headers }).pipe(
      catchError(error => {
        console.error('Error en la solicitud HTTP:', error);
        throw error;
      })
    );
  }
}




