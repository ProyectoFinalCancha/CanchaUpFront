import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, tap, throwError } from 'rxjs';
import { Jugador } from '../models/jugador';
import { SharedService } from './shared/shared.service';

@Injectable({
  providedIn: 'root'
})
export class JugadorService {

  private apiUrl = 'http://localhost:8080/restful/services/simple.JugadorServices/actions/verJugadores/invoke';
 


  constructor(private http: HttpClient) { }

  obtenerJugadores(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Basic c3ZlbjpwYXNz',
      'Accept': 'application/json;profile=urn:org.apache.causeway/v2;suppress=all'
    });
  
    return this.http.get(this.apiUrl, { headers }).pipe(
      tap(response => console.log('Respuesta del servidor:', response)), // Agregado para imprimir la respuesta
      map((response: any) => {
        if (response.result && response.result.value) {
          return response.result.value;
        } else {
          console.error('Estructura de respuesta inesperada:', response);
          throw new Error('La estructura de la respuesta del servidor no es la esperada.');
        }
      }),
      catchError((error: any) => {
        console.error('Error en la solicitud:', error);
        return throwError('Error al obtener jugadores. Consulta la consola para más detalles.');
      })
    );
  }
  

  actualizarJugador(jugador: Jugador): Observable<any> {
    const url = `${this.apiUrl}/${jugador.id}`;

    const headers = new HttpHeaders({
      'Authorization': 'Basic c3ZlbjpwYXNz',
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    });

    // Asegúrate de que el objeto 'jugador' tenga las propiedades correctas según tu backend
    return this.http.put(url, jugador, { headers });
  }


  buscarJugadorPorTelefono(telefono: string): Observable<any> {
    const requestOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Basic c3ZlbjpwYXNz',
        'Accept': 'application/json;profile=urn:org.apache.causeway/v2'
      })
    };
  
    const apiUrl = `http://localhost:8080/restful/services/simple.JugadorServices/actions/buscarJugador/invoke?telefono=${telefono}`;
  
    return this.http.get(apiUrl, requestOptions);
  }

  crearJugador(nuevoJugador: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Basic c3ZlbjpwYXNz',
      'Accept': 'application/json;profile=urn:org.apache.causeway/v2;suppress=all',
      'Content-Type': 'application/json'
    });
  
    const apiUrl = 'http://localhost:8080/restful/services/simple.JugadorServices/actions/crearJugador/invoke';
  
    return this.http.post(apiUrl, nuevoJugador, { headers });
  }

  eliminarJugador(objectId: string): Observable<any> {
    const url = `http://localhost:8080/restful/objects/simple.Jugador/${objectId}/actions/eliminarJugador/invoke`;

    const headers = new HttpHeaders({
      'Authorization': 'Basic c3ZlbjpwYXNz',
      'Accept': 'application/json'
    });

    return this.http.post(url, null, { headers });
  }

  
}