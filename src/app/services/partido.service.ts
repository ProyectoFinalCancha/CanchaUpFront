import { Injectable } from '@angular/core';
import { Partido } from '../models/partido';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PartidoService {
  partidos: Partido[] = []; // Asegúrate de que partidos es un array de objetos Partido

  private url_Confirmar = 'http://localhost:8080/restful/objects/simple.Partido/';


  private baseUrl = 'http://localhost:8080/restful/services/simple.PartidoServices/actions';


  private apiUrl = 'http://localhost:8080/restful/services/simple.PartidoServices/actions/buscarPartidoPorRepresentante/invoke';

  private baseUrl_ver = 'http://localhost:8080/restful/services/simple.PartidoServices/actions';


  
  constructor(private http: HttpClient) { }
  

  verPartidos(): Observable<any> {
    const url = `${this.baseUrl_ver}/verPartidos/invoke`;
    
    // Configurar las cabeceras
    const headers = new HttpHeaders({
      'Authorization': 'Basic c3ZlbjpwYXNz',
      'Accept': 'application/json;profile=urn:org.apache.causeway/v2',
      'Content-Type': 'application/json',
    });

    // Realizar la solicitud GET
    return this.http.get(url, { headers });
  }


  sacarTurno(horario: string, dia: string, telefono: string): void {
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
      })
    };

    this.http.post(
      'http://localhost:8080/restful/services/simple.PartidoServices/actions/sacarTurno/invoke',
      raw,
      requestOptions
    )
    .subscribe(
      (result) => {
        console.log(result);
      },
      (error) => {
        console.log('Error', error);
      }
    );
  }
  

  crearPartido(horario: string, dia: string, telefono: string, precio: string): void {
    const raw = {
      horarioSting: {
        value: horario,
      },
      diaString: {
        value: dia,
      },
      telefono: {
        value: telefono,
      },
      precio: {
        value: precio,
      },
    };

    const requestOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Basic c3ZlbjpwYXNz',
        'Accept': 'application/json;profile=urn:org.apache.causeway/v2',
        'Content-Type': 'application/json',
      })
    };

    this.http.post(
      'http://localhost:8080/restful/services/simple.PartidoServices/actions/crearPartido/invoke',
      raw,
      requestOptions
    )
    .subscribe(
      (result) => {
        console.log(result);
      },
      (error) => {
        console.log('Error', error);
      }
    );
  }



  rechazarPartido(objectId: string): Observable<any> {
    const url = `http://localhost:8080/restful/objects/simple.Partido/${objectId}/actions/rechazar/invoke`;

    const headers = new HttpHeaders({
      'Authorization': 'Basic c3ZlbjpwYXNz',
      'Accept': 'application/json;profile=urn:org.apache.causeway/v2',
    });

    return this.http.put(url, {}, { headers });
  }


  darDeBaja(objectId: string): Observable<any> {
    const url = `http://localhost:8080/restful/objects/simple.Partido/${objectId}/actions/darDeBaja/invoke`;

    const headers = new HttpHeaders({
      'Authorization': 'Basic c3ZlbjpwYXNz',
      'Accept': 'application/json;profile=urn:org.apache.causeway/v2',
    });

    return this.http.post(url, {}, { headers });
  }


  confirmarPartido(objectId: string): Observable<any> {
    const url = `${this.url_Confirmar}${objectId}/actions/confirmar/invoke`;

    const headers = new HttpHeaders({
      Authorization: 'Basic c3ZlbjpwYXNz',
      Accept: 'application/json;profile=urn:org.apache.causeway/v2'
    });

    return this.http.put(url, {}, { headers });
  }







  completar(objectId: string): Observable<any> {
    const urlCompleta = `${this.url_Confirmar}${objectId}/actions/completar/invoke`;

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Basic c3ZlbjpwYXNz',
        'Accept': 'application/json;profile=urn:org.apache.causeway/v2',
      })
    };

    return this.http.put<any>(urlCompleta, {}, httpOptions)
      .pipe(
        tap(result => console.log(result)),
        catchError(this.handleError<any>('completar'))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return new Observable<T>();
    };
  }




  buscarPartidoPorRepresentante(telefono: string): Observable<any> {
    const url = `${this.apiUrl}?telefono=${telefono}&x-causeway-querystring=MQ%3D%3D`;

    // Configurar headers
    const headers = new HttpHeaders({
      'Authorization': 'Basic c3ZlbjpwYXNz',
      'Accept': 'application/json;profile=urn:org.apache.causeway/v2'
    });

    // Realizar la solicitud GET
    return this.http.get(url, { headers });
  }


  buscarPartidoEstado(estado: string): Observable<any> {
    const url = `${this.baseUrl}/buscarPartidosPorEstados/invoke?estadosString=${estado}`;

    const headers = new HttpHeaders({
      'Authorization': 'Basic c3ZlbjpwYXNz',
      'Accept': 'application/json;profile=urn:org.apache.causeway/v2'
    });

    return this.http.get(url, { headers })
      .pipe(
        tap((result) => console.log(result)),
        catchError(this.handleError('buscarPartidoEstado', []))
      );
  }



  buscarPartido(): Observable<any> {
    const horarioSting = "_18_HS";
    const diaString = "2020-10-10";
    const numeroCanchaSting = "DOS";

    const body = {
      horarioSting: {
        value: horarioSting,
      },
      diaString: {
        value: diaString,
      },
      numeroCanchaSting: {
        value: numeroCanchaSting,
      },
    };

    const headers = new HttpHeaders({
      'Authorization': 'Basic c3ZlbjpwYXNz',
      'Accept': 'application/json;profile=urn:org.apache.causeway/v2',
    });

    return this.http.post<any>(this.apiUrl, body, { headers });
  }


}
