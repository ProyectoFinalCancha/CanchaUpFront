import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { Equipo } from 'src/app/models/equipo';
import { Jugador } from 'src/app/models/jugador';
import { EquipoService } from 'src/app/services/equipo.service';
import { JugadorService } from 'src/app/services/jugador.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-equipos',
  templateUrl: './equipos.component.html',
  styleUrls: ['./equipos.component.css']
})
export class EquiposComponent {
  
  
  equipos: Equipo[] = [];
  telefonoFiltrado: string = ''; // Asegúrate de declarar la propiedad
  nuevoEquipo!: Equipo;
  jugadores: Jugador[] = [];

telefono: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private equipoService: EquipoService,
    private router: Router,
    public dialog: MatDialog,
    private jugadorService: JugadorService
  ) {
  
  }

  ngOnInit(): void {
    this.verEquipos();
  }

  navegar() {
    this.router.navigate(['/admin2Dash']);
  }

  verEquipos(): void {
    this.equipoService.verEquipos().subscribe(
      (data: Equipo[]) => {
        this.equipos = data.filter((item) => item && item.jugadores);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // buscarJugadorPorTelefono(telefono: string): void {
  //   this.jugadorService.buscarJugadorPorTelefono(telefono).subscribe(
  //     (data) => {
  //       console.log(data);
  //       this.jugadores = Array.isArray(data) ? data : [data];
  //     },
  //     (error) => {
  //       console.log('Error', error);
  //     }
  //   );
  // }

  obtenerEquipos(): void {
    this.equipoService.verEquipos().subscribe(
      (data: any[]) => {
        console.log('Datos antes de filtrar:', data);
        // Filtrar solo objetos Partido válidos
        this.equipos = data.filter((item) => item && item.$$instanceId);
        console.log('Datos después de filtrar:', this.equipos);
      },
      (error) => {
        console.log('Error al obtener partidos:', error);
      }
    );
  }

  salir() {
    this.router.navigate(['/login']);
  }

  partidos() {
    this.router.navigate(['/partidos']);
  }
  encargados() {
    this.router.navigate(['/encargados']);
  }

irAEquipos(){
  this.router.navigate(['/equipoS'])
}
  limpiarDatos(){
    this.verEquipos()
    this.telefonoFiltrado = ''
  }
  scrollToDiv() {
    const div = document.getElementById('tabla');
    console.log(div);
    if (div !== null) {
      div.scrollIntoView({ behavior: 'smooth' });
    }
  }


}
