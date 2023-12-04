import { Injectable } from '@angular/core';
import { Partido } from '../models/partido';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PartidoService {
  partidos: Partido[] = []; // Asegúrate de que partidos es un array de objetos Partido

  private url_Confirmar = 'http://localhost:8080/restful/objects/simple.Partido/';


  private baseUrl = 'http://localhost:8080/restful/services/simple.PartidoServices/actions';

  private baseUrlBuscar = 'http://localhost:8080/restful/services/simple.PartidoServices';

  private apiUrl = 'http://localhost:8080/restful/services/simple.PartidoServices/actions/buscarPartidoPorRepresentante/invoke';

  private baseUrl_ver = 'http://localhost:8080/restful/services/simple.PartidoServices/actions/verPartidos/invoke';



  constructor(private http: HttpClient) { }


  verPartidos(): Observable<any> {

    const headers = new HttpHeaders({
      'Authorization': 'Basic c3ZlbjpwYXNz',
      'Accept': 'application/json;profile=urn:org.apache.causeway/v2',
    });
    return this.http.get<any>(this.baseUrl_ver, { headers });
  }


  sacarTurno(horario: string, dia: string, telefono: string): Observable<any> {
    const raw = JSON.stringify({
      horarioSting: {
        value: horario,
      },
      diaString: {
        value: dia,
      },
      telefono: {
        value: telefono,
      },
    });

    const requestOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Basic c3ZlbjpwYXNz',
        'Accept': 'application/json;profile=urn:org.apache.causeway/v2',
        'Content-Type': 'application/json',
      }),
    };

    // Devuelve el observable resultante de la solicitud HTTP
    return this.http.post(
      'http://localhost:8080/restful/services/simple.PartidoServices/actions/sacarTurno/invoke',
      raw,
      requestOptions
    );
  }







  
  
  crearPartido(nuevoPartido: Partido): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Basic c3ZlbjpwYXNz',
      'Accept': 'application/json;profile=urn:org.apache.causeway/v2;suppress=all',
      'Content-Type': 'application/json',
    });
    const requestBody = {
      horarioSting: { value: nuevoPartido.horario },
      diaString: { value: nuevoPartido.dia },
      telefono: { value: nuevoPartido.telefono },
      precio: { value: nuevoPartido.precio },
    };
  
    return this.http.post(
      'http://localhost:8080/restful/services/simple.PartidoServices/actions/crearPartido/invoke',
      requestBody,
      { headers }
    ).pipe(
      catchError((error: any) => {
        console.error('Error en la solicitud:', error);
        return throwError('Error al procesar la solicitud. Por favor, inténtalo de nuevo más tarde.');
      })
    );
  }
  
  



  private handleError(error: any): Observable<any> {
    console.error('Error en la solicitud:', error);
    return throwError('Error al procesar la solicitud. Por favor, inténtalo de nuevo más tarde.');
  }


  rechazarPartido(instanceId: string): Observable<any> {
    const url = `http://localhost:8080/restful/objects/simple.Partido/${instanceId}/actions/rechazar/invoke`;

    const headers = new HttpHeaders({
      'Authorization': 'Basic c3ZlbjpwYXNz',
      'Accept': 'application/json;profile=urn:org.apache.causeway/v2',
    });

    return this.http.put(url, null, { headers });
  }




  darDeBaja(instanceId: string): Observable<any> {
    const url = `http://localhost:8080/restful/objects/simple.Partido/${instanceId}/actions/darDeBaja/invoke`;

    const headers = new HttpHeaders({
      'Authorization': 'Basic c3ZlbjpwYXNz',
      'Accept': 'application/json;profile=urn:org.apache.causeway/v2',
    });

    return this.http.post(url, null, { headers });
  }


  confirmarPartido(instanceId: string): Observable<any> {
    const url = `${this.url_Confirmar}${instanceId}/actions/confirmar/invoke`;

    const headers = new HttpHeaders({
      Authorization: 'Basic c3ZlbjpwYXNz',
      Accept: 'application/json;profile=urn:org.apache.causeway/v2'
    });

    return this.http.put(url, null, { headers });
  }







  completar(instanceId: string): Observable<any> {
    const urlCompleta = `${this.url_Confirmar}${instanceId}/actions/completar/invoke`;

    const headers = new HttpHeaders({
      Authorization: 'Basic c3ZlbjpwYXNz',
      Accept: 'application/json;profile=urn:org.apache.causeway/v2',
    });

    return this.http.put<any>(urlCompleta, null, { headers })

  }






  buscarPartidoPorRepresentante(telefono: string): Observable<Partido[]> {
    const  apiUrl = 'http://localhost:8080/restful/services/simple.PartidoServices/actions/buscarPartidoPorRepresentante/invoke';


    const params = new HttpParams().set('telefono', telefono);


    const headers = new HttpHeaders({
      'Authorization': 'Basic c3ZlbjpwYXNz',
      'Accept': 'application/json;profile=urn:org.apache.causeway/v2'
    });

    return this.http.get<Partido[]>(apiUrl, { headers, params });
  }


  buscarPartidoEstado(estado: string): Observable<any> {
    const url = `${this.baseUrl}/buscarPartidosPorEstados/invoke?estadosString=${estado}`;

    const headers = new HttpHeaders({
      'Authorization': 'Basic c3ZlbjpwYXNz',
      'Accept': 'application/json;profile=urn:org.apache.causeway/v2'
    });

    return this.http.get(url, { headers })

  }

  buscarPartido(horario: string, dia: string, numeroCancha: string): Observable<any> {
    const url = `${this.baseUrlBuscar}/actions/buscarPartido/invoke`;

    const headers = new HttpHeaders({
      Authorization: 'Basic c3ZlbjpwYXNz',
      Accept: 'application/json;profile=urn:org.apache.causeway/v2',
      'Content-Type': 'application/json',
    });

    const body = {
      horario: horario,
      dia: dia,
      numeroCancha: numeroCancha,
    };

    return this.http.post(url, body, { headers });
  }




}