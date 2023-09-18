import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Jugador } from '../interfaces/jugador.interface';

@Injectable({
  providedIn: 'root'
})
export class JugadorService {
  // API_SERVER: string = "http://localhost:8080/wicket/wicket/page?5";
  API_SERVER: string = "http://localhost:8080/restful/objects/simple.Jugador/";

  // @GetMapping("/custom/simpleObjects")
	//    /wicket es el homepage 
//		/wicket/wicket/page?   y cada vez que clickeas una nueva lista va aumentando

  constructor(
    private httpClient: HttpClient
  ){}

  public createJugadores(jugadores:Jugador): Observable<Object>{
    return this.httpClient.post(`${this.API_SERVER}`,jugadores);
    
  }

  public getAllJugadores(): Observable<Jugador[]>{

    let username = "sven";
    let password = "pass";

    const headers = new HttpHeaders({ Authorization: 'Basic' + btoa(username + ":" + password)})

    return this.httpClient.get<Jugador[]>(this.API_SERVER);
  }
}
