import { Injectable } from '@angular/core';
import { Encargado } from '../models/encargado';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EncargadoService {

  private apiUrl = 'http://localhost:8080/restful/services/simple.EncargadoServices/actions/crearEncargado/invoke';

  private api_GET = 'http://localhost:8080/restful/services/simple.EncargadoServices/actions/verEncargados/invoke';

  private apiBuscarEncargado = 'http://localhost:8080/restful/services/simple.EncargadoServices/actions/buscarEncargado/invoke';
 
  private apiEliminarEncargado = 'http://localhost:8080/restful/objects/simple.Encargado/';


  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Basic c3ZlbjpwYXNz',
    'Accept': 'application/json;profile=urn:org.apache.causeway/v2'
  });

  constructor(private http: HttpClient) { }

  crearEncargado(nombre: string, apellido: string, dni: string, telefono: string, password: string): Observable<any> {
    const body = {
      nombre: { value: nombre },
      apellido: { value: apellido },
      dni: { value: dni },
      telefono: { value: telefono },
      password: { value: password }
    };

    return this.http.post(this.apiUrl, body, { headers: this.headers });
  }



  getEncargados(offset: number, limit: number): Observable<any> {
    const requestOptions = {
      headers: this.headers,
      params: new HttpParams()
        .set('offset', offset.toString())
        .set('limit', limit.toString())
    };
  
    return this.http.get(`${this.api_GET}`, requestOptions);
  }

  buscarEncargadoPorTelefono(telefono: string): Observable<any> {
    const requestOptions = {
      headers: this.headers
    };

    return this.http.get(`${this.apiBuscarEncargado}?telefono=${telefono}`, requestOptions);
  }

  
  eliminarEncargado(objectId: string): Observable<any> {
    const url = `${this.apiEliminarEncargado}${objectId}/actions/eliminarEncargado/invoke`;

    const requestOptions = {
      method: 'POST',
      headers: this.headers
    };

    return this.http.post(url, null, requestOptions);
  }
}




