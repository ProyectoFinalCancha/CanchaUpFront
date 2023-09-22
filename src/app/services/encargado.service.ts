import { Injectable } from '@angular/core';
import { Encargado } from '../models/encargado';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EncargadoService {

  ///!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  private API_DELETE: string = "http://localhost:8080/restful/objects/simple.Jugador/1/actions/delete/invoke";
  private API_GET: string = "http://localhost:8080/restful/objects/simple.Jugador";
  private API_CREATE: string = "http://localhost:8080/restful/services/simple.JugadorServices/actions/crearJugador/invoke"
  /////////CAMBIAR ESAS URLS Y PONER LAS DEL ENCARGDO 
  
  encargado: Encargado;
  encargados!: Encargado[];
  constructor(private http:HttpClient) { 
    this.encargado = new Encargado();
  }

  
createEncargado(encargado : Encargado){
  const url = `${this.API_CREATE}`;
  return this.http.post(url,encargado);
}
getEncargado(){
  // const url = `${this.API_SERVER}/${id}`;
  let username = "sven";
  let password = "pass";

  const headers = new HttpHeaders({ Authorization: 'Basic' + btoa(username + ":" + password)})
  return this.http.get<Encargado>(this.API_GET, {headers, responseType: 'text' as 'json'});
  // return this.http.get(url);
}
getEncargados(){
  
  let username = "sven";
  let password = "pass";

  const headers = new HttpHeaders({ Authorization: 'Basic' + btoa(username + ":" + password)})

  return this.http.get<Encargado[]>(this.API_GET, {headers, responseType: 'text' as 'json'});
}

deleteEncargado(id: number) {
  return this.http.delete(this.API_DELETE + `/${id}`);
}


}
