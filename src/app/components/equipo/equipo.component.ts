import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { finalize, forkJoin } from 'rxjs';
import { Equipo } from 'src/app/models/equipo';
import { Jugador } from 'src/app/models/jugador';
import { EquipoService } from 'src/app/services/equipo.service';
import { JugadorService } from 'src/app/services/jugador.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-equipo',
  templateUrl: './equipo.component.html',
  styleUrls: ['./equipo.component.css'],
  providers: [JugadorService],
})
export class EquipoComponent implements OnInit {
  equipos: Equipo[] = [];

  telefonoEliminar: string = '';
  telefonoAgregar: string = '';
  id: string = '';

  jugadores: Jugador[] = [];
  telefono: string = '';

  constructor(
    private router: Router,
    private loginService: LoginService,
    private equipoService: EquipoService
  ) {
    // this.telefono = this.loginService.getTelefono();
  }

  ngOnInit(): void {
    this.telefono = this.loginService.getTelefono();
    console.log('telefono: ', this.telefono);

    this.equipoService.buscarEquipo(this.telefono).subscribe((response) => {
      this.id = response.$$instanceId;
    });
  }

  buscarEquipo(): void {
    this.equipoService.buscarEquipo(this.telefono).subscribe(
      (response) => {
        console.log('Respuesta exitosa:', response.$$instanceId);
      },
      (error) => {
        console.error('Error al crear la solicitud:', error);
      }
    );
  }

  eliminarEquipo(): void {
    this.equipoService.eliminarEquipo(this.id).subscribe(
      () => {
        console.log('Equipo eliminado exitosamente');
      },
      (error) => {
        console.error('Error al eliminar equipo:', error);
      }
    );
    this.router.navigate(['/match']);
  }

  crearEquipo(): void {
    this.equipoService.crearEquipo(this.telefono).subscribe(
      () => console.log('Equipo creado exitosamente'),
      (error) => console.error('Error al crear equipo:', error)
    );
  }

  elimarJugador(telefono: string): void {
    this.equipoService.eliminarJugador(telefono, this.id).subscribe(
      (data: any[]) => {
        console.log('Datos del servidor (Equipos):', data);
      },
      (error) => {
        console.error('Error al obtener equipos:', error);
      }
    );
  }

  agregarJugador(telefono: string): void {
    this.equipoService.agregarJugador(telefono, this.id).subscribe(
      (data: any[]) => {
        console.log('Datos del servidor (Equipos):', data);
      },
      (error) => {
        console.error('Error al obtener equipos:', error);
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
    this.router.navigate(['/match']);
  }
}
