import { Injectable } from '@angular/core';
import { Encargado } from '../models/encargado';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EncargadoService {
  private API_CREATE: string =  "http://localhost:8080/restful/services/simple.EncargadoServices/actions/crearEncargado/invoke"; // Reemplaza con la URL correcta
  private API_GET: string = "http://localhost:8080/restful/services/simple.EncargadoServices/actions/buscarEncargado/invoke"; // Reemplaza con la URL correcta
  private API_DELETE: string = "URL_DE_TU_API_DELETE"; // Reemplaza con la URL correcta
private API_GET_Encargados: string  = "http://localhost:8080/restful/services/simple.EncargadoServices/actions/verEncargados/invoke"
  encargado: Encargado;
  encargados: Encargado[] = [];

  constructor(private http: HttpClient) {
    this.encargado = new Encargado();
  }

  createEncargado(encargado: Encargado) {
    return this.http.post(this.API_CREATE, encargado);
  }

  
  verEncargados() {
    const headers = new HttpHeaders({
      Authorization: 'Basic c3ZlbjpwYXNz',
      Accept: 'application/json;profile=urn:org.apache.causeway/v2;suppress=all'
    });

    const requestOptions = {
      headers: headers
    };

    return this.http.get(this.API_GET_Encargados, { responseType: 'text' });
  }

 
  eliminarEncargado(objectId: string) {
    const url = `${this.API_DELETE}/${objectId}/actions/eliminarEncargado/invoke`;

    const headers = new HttpHeaders({
      Authorization: 'Basic c3ZlbjpwYXNz',
      Accept: 'application/json;profile=urn:org.apache.causeway/v2;suppress=all'
    });

    const requestOptions = { headers };

    return this.http.post(url, null, requestOptions);
  }

  buscarEncargado(telefono: string) {
    const headers = new HttpHeaders({
      Authorization: 'Basic c3ZlbjpwYXNz',
      Accept: 'application/json;profile=urn:org.apache.causeway/v2'
    });
  
    const requestOptions = {
      headers: headers
    };
  
    return this.http.get(`${this.API_GET}?telefono=${telefono}`, requestOptions);
  
  }
}
