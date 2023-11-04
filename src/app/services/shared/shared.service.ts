import { Injectable } from '@angular/core';
import { Jugador } from '../../models/jugador';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private jugadoresSource = new BehaviorSubject<Jugador[]>([]);
   jugadores$ = this.jugadoresSource.asObservable();

  constructor() {}
  actualizarJugadores(jugadores: Jugador[]) {
    this.jugadoresSource.next(jugadores);
  }
}




//El símbolo $ al final del nombre de una variable es una convención común en Angular y en la programación en general para indicar que la variable es un Observable. Un Observable es un tipo de flujo de datos o secuencia que representa un conjunto de valores que pueden cambiar con el tiempo. Angular utiliza Observables para trabajar con datos asíncronos, como respuestas HTTP, eventos del usuario y más.
  // EN ESTE CASO significa que jugadores es un Observable que emite una secuencia de valores (en este caso, una lista de jugadores). 
 