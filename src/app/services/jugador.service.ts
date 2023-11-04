import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Jugador } from '../models/jugador';
import { SharedService } from './shared/shared.service';

@Injectable({
  providedIn: 'root'
})
export class JugadorService {


  jugador: Jugador;
  jugadores: Jugador[] = [];

  constructor(private http: HttpClient, private sharedService:SharedService) {
    this.jugador = new Jugador();

  }

  getJugadoresEnSharedService() {
    return this.sharedService.jugadores$;
  }
  actualizarJugadoresEnSharedService(jugadores: Jugador[]) {
    this.sharedService.actualizarJugadores(jugadores);
  }

 ////////////////////////////////////////////    LOCAL STORAGE
///////////////////////////////////////////////////////////////////////////////////////////
 crearJugadorLocal(jugador: Jugador): void {
  const jugadores: Jugador[] = JSON.parse(localStorage.getItem('jugadores') || '[]');
  jugadores.push(jugador);
  localStorage.setItem('jugadores', JSON.stringify(jugadores));

  console.log('Jugador creado localmente:', jugador);
    console.log('Jugadores en el Local Storage:', jugadores);

  this.actualizarJugadoresEnSharedService(jugadores);
}

// Función para borrar un jugador localmente y actualizar el local storage
borrarJugadorLocal(id: number): void {
  const jugadores: Jugador[] = JSON.parse(localStorage.getItem('jugadores') || '[]');
  const index = jugadores.findIndex((jugador) => jugador.id === id);
  if (index !== -1) {
    jugadores.splice(index, 1);
    localStorage.setItem('jugadores', JSON.stringify(jugadores));

    this.actualizarJugadoresEnSharedService(jugadores);
  }
}

getJugadoresLocalStorage(): Jugador[] {
  const jugadores: Jugador[] = JSON.parse(localStorage.getItem('jugadores') || '[]');
  return jugadores;
}

buscarJugadorPorTelefono(telefono: string): Jugador[] {
  const jugadores: Jugador[] = JSON.parse(localStorage.getItem('jugadores') || '[]');
  return jugadores.filter((jugador) => jugador.telefono === telefono);
}



actualizarJugadorLocal(jugadorActualizado: Jugador): void {
  const jugadores: Jugador[] = JSON.parse(localStorage.getItem('jugadores') || '[]');
  const index = jugadores.findIndex((jugador) => jugador.id === jugadorActualizado.id);
  if (index !== -1) {
    jugadores[index] = jugadorActualizado;
    localStorage.setItem('jugadores', JSON.stringify(jugadores));

    // Actualiza también el servicio compartido
    this.actualizarJugadoresEnSharedService(jugadores);
  }
}

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////





















private API_DELETE: string = "http://localhost:8080/restful/objects/simple.Jugador/1/actions/delete/invoke";
private API_GET: string = "http://localhost:8080/restful/objects/simple.Jugador";
private API_CREATE: string = "http://localhost:8080/restful/services/simple.JugadorServices/actions/crearJugador/invoke"


  // Define un encabezado personalizado para enviar el nombre de usuario
  private headers = new HttpHeaders().set('Authorization', 'Basic ' + btoa('sven:pass'));


  crearJugador(jugador: Jugador) {
    const url = `${this.API_CREATE}`;
    return this.http.post(url, jugador);
  }


  getJugador(id: any) {

    const headers = new HttpHeaders();
    const urlWithParams = `${this.API_GET}?objectid=${id}`;

    return this.http.get<Jugador>(urlWithParams, { headers, responseType: 'text' as 'json' })

  }
  getJugadores() {

    // let username = "sven";
    // let password = "pass";

    // Usa los encabezados personalizados en la solicitud
    return this.http.get<Jugador[]>(this.API_GET, { headers: this.headers, responseType: 'text' as 'json' });
  }

  deleteJugador(id: number) {
    return this.http.delete(this.API_DELETE + `/${id}`);
  }

 
}