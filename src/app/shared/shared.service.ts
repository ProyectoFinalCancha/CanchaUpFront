import { Injectable } from '@angular/core';
import { Jugador } from '../models/jugador';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  jugadores: Jugador[] = [];
  constructor() { }
}
