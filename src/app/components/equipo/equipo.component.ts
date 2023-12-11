import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
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
export class EquipoComponent implements OnInit {

  equipos: Equipo[] = []


  jugadores: Jugador[] = [];

  constructor(private router: Router, private equipoService: EquipoService, private jugadorService: JugadorService) {

  }
  ngOnInit(): void {
    this.cargarDatos();
  }

 
  
  cargarDatos(): void {
    this.equipoService.verEquipos().subscribe(
      (equiposData: Equipo[]) => {
        this.equipos = equiposData.map((equipo) => ({
          ...equipo,
          representante: this.obtenerRepresentante(equipo),
        }));
        console.log('Datos del servidor (Equipos):', this.equipos);
      },
      (error) => {
        console.error('Error al obtener equipos:', error);
      }
    );

    this.jugadorService.obtenerJugadores().subscribe(
      (jugadoresData: Jugador[]) => {
        this.jugadores = jugadoresData;
        console.log('Datos del servidor (Jugadores):', this.jugadores);
      },
      (error) => {
        console.error('Error al obtener jugadores:', error);
      }
    );
  }
  obtenerRepresentante(equipo: Equipo): Jugador | null {
    const representanteId = equipo.representanteId;

    return representanteId !== undefined
      ? this.jugadores.find((jugador) => jugador.id === representanteId) || null
      : null;
  }
  
  verEquipos(): void {
    this.equipoService.verEquipos().subscribe(
      (data: Equipo[]) => {
        console.log('Datos del servidor (Equipos):', data);
        this.equipos = data.map((equipo) => ({
          ...equipo,
          representante: equipo.representanteId !== undefined
            ? this.jugadores.find((jugador) => jugador.id === equipo.representanteId) || null
            : null,
        }));
        console.log('Equipos:', this.equipos);
      },
      (error) => {
        console.error('Error al obtener equipos:', error);
      }
    );
  }
  

  obtenerNombreRepresentante(equipo: Equipo): string | null {
    return equipo.representante ? equipo.representante.nombre : null;
  }

  obtenerApellidoRepresentante(equipo: Equipo): string | null {
    return equipo.representante ? equipo.representante.apellido : null;
  }

  obtenerTelefonoRepresentante(equipo: Equipo): string | null {
    return equipo.representante ? equipo.representante.telefono : null;
  }



  obtenerJugadores(): void {
    this.jugadorService.obtenerJugadores().subscribe(
      (data: Jugador[]) => {
        console.log('Datos del servidor (Jugadores):', data);
        this.jugadores = data;
        // Una vez que se obtienen los jugadores, podemos mostrar los equipos.
      },
      (error) => {
        console.log('Error al obtener jugadores:', error);
      }
    );
  }


  


  // obtenerJugadoresEquipo(equipo: Equipo): Jugador[] {
  //   return equipo.jugadores || [];
  // }

  // obtenerRepresentante(equipo: Equipo): Jugador | null {
  //   return equipo.jugadores?.[0] || null;
  // }



  irAMatch() {
    this.router.navigate(['/match'])
  }
}




