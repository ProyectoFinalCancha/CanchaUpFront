import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Jugador } from '../models/jugador';

@Injectable({
  providedIn: 'root'
})
export class JugadorService {


  
jugador: Jugador;
jugadores!: Jugador[];

private API_DELETE: string = "http://localhost:8080/restful/objects/simple.Jugador/1/actions/delete/invoke";
private API_GET: string = "http://localhost:8080/restful/objects/simple.Jugador";
private API_CREATE: string = "http://localhost:8080/restful/services/simple.JugadorServices/actions/crearJugador/invoke"

constructor(private http: HttpClient) {
  this.jugador = new Jugador();
 }


createJugador(jugador : Jugador){
  const url = `${this.API_CREATE}`;
  return this.http.post(url,jugador);
}
getJugador(oid:number){
  
  const headers = new HttpHeaders();
  const urlWithParams = `${this.API_GET}?objectid=${oid}`;
  
  return this.http.get<Jugador>(urlWithParams, { headers, responseType: 'text' as 'json' })
  
}
getJugadores(){
  
  // let username = "sven";
  // let password = "pass";

  // const headers = new HttpHeaders({ Authorization: 'Basic' + btoa(username + ":" + password)})
  const headers = new HttpHeaders();
  return this.http.get<Jugador[]>(this.API_GET, {headers, responseType: 'text' as 'json'});
}

deleteJugador(oid: number) {
  return this.http.delete(this.API_DELETE + `/${oid}`);
}



}
  // API_SERVER: string = "http://localhost:8080/wicket/wicket/page?5";
  //API_SERVER: string = "http://localhost:8080/restful/objects/simple.Jugador";
  

  // @GetMapping("/custom/simpleObjects")
	//    /wicket es el homepage 
//		/wicket/wicket/page?   y cada vez que clickeas una nueva lista va aumentando
/*
  constructor(
    private httpClient: HttpClient
  ){}

  public createJugadores(jugadores:Jugador): Observable<Object>{
    return this.httpClient.post(`${this.API_SERVER}`,jugadores);
    
  }

  public getAllJugadores(): Observable<Jugador>{

    let username = "sven";
    let password = "pass";

    const headers = new HttpHeaders({ Authorization: 'Basic' + btoa(username + ":" + password)})

    return this.httpClient.get<Jugador>(this.API_SERVER, {headers, responseType: 'text' as 'json'});
    // return this.httpClient.get<Jugador[]>(this.API_SERVER, {headers, responseType: 'text' as 'json'});
  }
  public buscarJugadorPorId(){
    
    let username = "sven";
    let password = "pass";

    const headers = new HttpHeaders({ Authorization: 'Basic' + btoa(username + ":" + password)})

    return this.httpClient.get<Jugador>(this.API_SERVER, {headers, responseType: 'text' as 'json'});
    
  }


  borrarJugador(id: any) {
    return this.httpClient.delete(this.API_SERVER + `/${id}`);
  }
*/