import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Equipo } from 'src/app/models/equipo';
import { EquipoService } from 'src/app/services/equipo.service';
import { JugadorService } from 'src/app/services/jugador.service';
import Swal from 'sweetalert2';

interface Jugador {
  nombre: string;
  apellido: string;
  telefono: string;
}

@Component({
  selector: 'app-equipo',
  templateUrl: './equipo.component.html',
  styleUrls: ['./equipo.component.css'],
})
export class EquipoComponent implements OnInit {
  equipos: Equipo[] = [];

  telefonoEliminar: string = '';
  telefonoAgregar: string = '';
  id: string = '';

  telefono: string = '';

  jugadores: Jugador[] = [];

  constructor(private router: Router, private equipoService: EquipoService) {}

  ngOnInit(): void {
    this.telefono = localStorage.getItem('telefono') || '';

    this.id = localStorage.getItem('instanceId') || '';

    this.obtenerJugadores();
  }

  obtenerJugadores(): void {
    this.equipoService.verJugadores(this.id).subscribe(
      (response) => {
        this.jugadores = response.map((jugador: any) => ({
          nombre: jugador.nombre,
          apellido: jugador.apellido,
          telefono: jugador.telefono,
        }));

        console.log(this.jugadores);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  limpiarInputs(): void {
    this.telefonoEliminar = ''; // Limpiar el input de teléfono a eliminar
    this.telefonoAgregar = ''; // Limpiar el input de teléfono a agregar
  }

  actualizarListaJugadores(): void {
    this.obtenerJugadores();
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
    localStorage.removeItem('instanceId'); // Guardar en el localStorage
    this.router.navigate(['/match']);
  }

  elimarJugador(telefono: string): void {
    this.equipoService.eliminarJugador(telefono, this.id).subscribe(
      (data: any[]) => {
        console.log('Datos del servidor (Equipos):', data);
        this.obtenerJugadores();
        this.limpiarInputs();
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
        this.obtenerJugadores();
        this.limpiarInputs();
      },
      (error) => {
        console.error('Error al obtener equipos:', error);
        Swal.fire({
          title: 'El jugador no Existe',
          icon: 'error',
        });
        this.limpiarInputs();
      }
    );
  }

  irAMatch() {
    this.router.navigate(['/match']);
  }
}
