import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { Jugador } from 'src/app/models/jugador';
import { JugadorService } from 'src/app/services/jugador.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registo',
  templateUrl: './registo.component.html',
  styleUrls: ['./registo.component.css']
})
export class RegistoComponent {
  nuevoJugador: Jugador = {
    nombre: '',
    apellido: '',
    telefono: '',
    mail: '',
    password: '',
    fechaDeNacimiento: new Date(),
  };

  constructor(private router: Router, private jugadorService: JugadorService) { }

  crearJugador(jugadorForm: NgForm): void {
    if (jugadorForm.valid) {
      this.jugadorService.crearJugador(this.nuevoJugador)
        .pipe(finalize(() => {
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 6000);
          // Limpiar el formulario después de una creación exitosa
          this.nuevoJugador = new Jugador();
        }))
        .subscribe(
          (jugadorCreado: Jugador) => {
            Swal.fire({
              icon: 'success',
              text: 'Se ha creado el jugador:',
            });
          },
          error => {
            console.error('Error al crear jugador:', error);
            // Mostrar un mensaje de error usando SweetAlert o manejarlo según sea necesario
            Swal.fire({
              icon: 'success',
              text: 'Se ha creado el jugador:',
            });
          }
        );
    }
  }









  IraDash() {
    this.router.navigate(['/login'])
  }
}
