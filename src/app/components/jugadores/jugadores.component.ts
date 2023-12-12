import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import {
  MatPaginator,
  MatPaginatorIntl,
  PageEvent,
} from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Jugador } from 'src/app/models/jugador';
import { JugadorService } from 'src/app/services/jugador.service';
import { VerJugadoresComponent } from './ver-jugadores/ver-jugadores.component';
import { MatDialog } from '@angular/material/dialog';
import { finalize } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-jugadores',
  templateUrl: './jugadores.component.html',
  styleUrls: ['./jugadores.component.css'],
  providers: [JugadorService],
})
export class JugadoresComponent {
  jugadores: Jugador[] = [];
  telefonoFiltrado: string = ''; // Asegúrate de declarar la propiedad
  nuevoJugador!: Jugador;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private jugadorService: JugadorService,
    private router: Router,
    public dialog: MatDialog
  ) {
    this.nuevoJugador = {
      nombre: '',
      apellido: '',
      telefono: '',
      mail: '',
      password: '',
      fechaDeNacimiento: new Date(),
    };
  }

  ngOnInit(): void {
    this.obtenerJugadores();
  }

  navegar() {
    this.router.navigate(['/admin2Dash']);
  }

  obtenerJugadores(): void {
    this.jugadorService.obtenerJugadores().subscribe(
      (data: Jugador[]) => {
        this.jugadores = data.filter((item) => item && item.telefono);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  buscarJugadorPorTelefono(telefono: string): void {
    this.jugadorService.buscarJugadorPorTelefono(telefono).subscribe(
      (data) => {
        console.log(data);
        this.jugadores = Array.isArray(data) ? data : [data];
      },
      (error) => {
        console.log('Error', error);
      }
    );
  }

  crearJugador(jugadorForm: NgForm): void {
    if (jugadorForm.valid) {
      this.jugadorService
        .crearJugador(this.nuevoJugador)
        .pipe(
          finalize(() => {
            this.obtenerJugadores();
            this.nuevoJugador = new Jugador();
          })
        )
        .subscribe(
          () =>
            Swal.fire({
              icon: 'success',
              text: 'Se ha creado el Jugador',
            }),
          (error) =>
            Swal.fire({
              icon: 'error',
              text: 'No se pudo crear el Jugador',
            })
        );
    }
  }

  eliminarJugador(instanceId: string | undefined): void {
    if (instanceId !== undefined) {
      this.jugadorService.eliminarJugador(instanceId).subscribe(
        (data) => {
          console.log('Jugador eliminado:', data);
          this.obtenerJugadores();
        },
        (error) => {
          console.error('Error al eliminar jugador', error);
        }
      );
    } else {
      console.log('El $$instanceId es undefined.');
    }
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

  scrollToDiv() {
    const div = document.getElementById('tabla');
    console.log(div);
    if (div !== null) {
      div.scrollIntoView({ behavior: 'smooth' });
    }
  }

  openEditDialog(jugador: Jugador): void {
    const dialogRef = this.dialog.open(VerJugadoresComponent, {
      width: '460px', // Personaliza el ancho según tus necesidades
      data: jugador, // Pasa el encargado al componente del diálogo
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        console.log('Encargado editado:', result);
      }
    });
  }
}
