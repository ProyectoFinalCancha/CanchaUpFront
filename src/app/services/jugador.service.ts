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
  private baseUrl = 'http://localhost:8080/restful/services/simple.JugadorServices/actions/';
  jugador: Jugador[] = [];

  constructor(private http: HttpClient) { }

 


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

  
  obtenerJugadores(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Basic c3ZlbjpwYXNz',
      'Accept': 'application/json;profile=urn:org.apache.causeway/v2',
    });

    return this.http.get<any>(this.apiUrl, { headers });
  }

  crearJugador(nuevoJugador: Jugador): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Basic c3ZlbjpwYXNz',
      'Accept': 'application/json;profile=urn:org.apache.causeway/v2;suppress=all',
      'Content-Type': 'application/json',
    });

    const requestBody = {
      nombre: { value: nuevoJugador.nombre },
      apellido: { value: nuevoJugador.apellido },
      telefono: { value: nuevoJugador.telefono },
      mail: { value: nuevoJugador.mail },
      password: { value: nuevoJugador.password },
      fechaDeNacimientoString: { value: nuevoJugador.fechaDeNacimiento },
    };

    return this.http.post(this.baseUrl + 'crearJugador/invoke', requestBody, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any): Observable<any> {
    console.error('Error en la solicitud:', error);
    return throwError('Error al procesar la solicitud. Por favor, inténtalo de nuevo más tarde.');
  }


  eliminarJugador(instanceId: string): Observable<any> {
    const url = `http://localhost:8080/restful/objects/simple.Jugador/${instanceId}/actions/eliminarJugador/invoke`;

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
  