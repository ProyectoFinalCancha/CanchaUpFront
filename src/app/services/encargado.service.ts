import { Injectable } from '@angular/core';
import { Encargado } from '../models/encargado';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EncargadoService {

  private API_GET: string = "http://localhost:8080/restful/services/simple.EncargadoServices/actions/verEncargados/invoke";
  private API_BUSCAR: string = "http://localhost:8080/restful/services/simple.EncargadoServices/actions/verEncargados/invoke";
  private API_DELETE: string = "http://localhost:8080/restful/objects/simple.Encargado/";


  encargados: Encargado[] = [];

  constructor(private http: HttpClient) { }


  verEncargados(): Observable<Encargado[]> {
    const headers = new HttpHeaders({
      'Accept': 'application/json;profile=urn:org.apache.causeway/v2;suppress=all',
      'Authorization': 'Basic c3ZlbjpwYXNz'
    });
    return this.http.get<Encargado[]>(this.API_GET, { headers })
    .pipe(
      catchError((error: any) => {
        console.error('Error en la solicitud:', error);
        throw error; // Puedes manejar el error aquí o lanzarlo nuevamente para que se maneje en el componente.
      })
    );
  }

  buscarEncargado(telefono: string): Observable<Encargado> {
    const requestOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Basic c3ZlbjpwYXNz',
        'Accept': 'application/json;profile=urn:org.apache.causeway/v2',
      })
    };

    // Realiza la solicitud GET al servicio con el número de teléfono
    return this.http.get<Encargado>(
      `${this.API_BUSCAR}?telefono=${telefono}`,
      requestOptions
    ).pipe(
      catchError((error: any) => {
        console.error('Error en la solicitud:', error);
        throw error; // Puedes manejar el error aquí o lanzarlo nuevamente para que se maneje en el componente.
      })
    );
  }




  borrarEncargado(objectId: string): Observable<any> {
    const url = `${this.API_DELETE}${objectId}/actions/eliminarEncargado/invoke`;
    const requestOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Basic c3ZlbjpwYXNz',
        'Accept': 'application/json;profile=urn:org.apache.causeway/v2;suppress=all',
      })
    };

    // Realiza la solicitud POST para eliminar el encargado
    return this.http.post(url, null, requestOptions)
      .pipe(
        catchError((error: any) => {
          console.error('Error en la solicitud:', error);
          throw error; // Puedes manejar el error aquí o lanzarlo nuevamente para que se maneje en el componente.
        })
      );
  }
}




