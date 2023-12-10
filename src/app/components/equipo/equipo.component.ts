import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Equipo } from 'src/app/models/equipo';
import { Jugador } from 'src/app/models/jugador';
import { EquipoService } from 'src/app/services/equipo.service';
import { JugadorService } from 'src/app/services/jugador.service';




@Component({
  selector: 'app-equipo',
  templateUrl: './equipo.component.html',
  styleUrls: ['./equipo.component.css'],
  providers: [JugadorService]
})
export class EquipoComponent implements OnInit{

  equipos:Equipo[] = []

  jugadores: Jugador[] = [];

  constructor(private router: Router, private equipoService: EquipoService, private jugadorService:JugadorService) {

  }
  ngOnInit(): void {
    this.verEquipos();
    this.obtenerJugadores()
  }


  
  verEquipos(): void {
    this.equipoService.verEquipos().subscribe(
      (data: Equipo[]) => {
        console.log('Datos del servidor:', data);
        this.equipos = data;
        console.log('Equipos:', this.equipos);
      },
      error => {
        console.error('Error al obtener equipos:', error);
      }
    );
  }
  
  obtenerJugadores(): void {
    this.jugadorService.obtenerJugadores().subscribe(
      (data: Jugador[]) => {
        this.jugadores = data;
        console.log('Datos del servidor (Jugadores):', data);
      },
      error => {
        console.log('Error al obtener jugadores:', error);
      }
    );
  }


  obtenerDatosRepresentante(equipo: Equipo): Jugador | null {
    return this.jugadores.find(jugador => jugador.id === equipo.representanteId) || null;
  }


  irAMatch() {
    this.router.navigate(['/match'])
  }
}




