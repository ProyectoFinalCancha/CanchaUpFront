import { Injectable } from '@angular/core';
import { Partido } from '../models/partido';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class PartidoService {

  partido: Partido;
  partidos: Partido[] = [];
                              
  private API_GET: string =  "http://localhost:8080/restful/services/simple.PartidoServices/actions/verPartidos/invoke"
  // private API_CONFIRMARPARTIDO : string = "http://localhost:8080/restful/objects/simple.Partido/1/actions/completar/invoke"   NO VA A FUNCIONAR PORQUE HAY QUE MANDARLE EL ID COMO HEADER EN ESE URL ESTA CON EL ID 1 
  private API_POST: string ="http://localhost:8080/restful/services/simple.PartidoServices/actions/crearPartido/invoke"
  private API_SACAR_TURNO: string = "http://localhost:8080/restful/services/simple.PartidoServices/actions/sacarTurno/invoke"
  private API_BORRAR: string = ''; //PEGAR LINK PARA BORRAR PARTIDO
  
  
  
  //////////MODIFIVAR ESTO
  
  constructor(private http:HttpClient) {
    this.partido = new Partido()
   }


   createPartido(partido:Partido){
    const url = `${this.API_POST}`;
    return this.http.post(url,partido);
  }
  getPartido(){
    // const url = `${this.API_SERVER}/${id}`;
    let username = "sven";
    let password = "pass";
  
    const headers = new HttpHeaders({ Authorization: 'Basic' + btoa(username + ":" + password)})
    return this.http.get<Partido>(this.API_GET, {headers, responseType: 'text' as 'json'});

  }
  getPartidos(){
    
    let username = "sven";
    let password = "pass";
  
    const headers = new HttpHeaders({ Authorization: 'Basic' + btoa(username + ":" + password)})
  
    return this.http.get<Partido[]>(this.API_GET, {headers, responseType: 'text' as 'json'});
  }
  
  deletePartido(id: number) {
    return this.http.delete(this.API_BORRAR + `/${id}`);
  }
  
  
}
