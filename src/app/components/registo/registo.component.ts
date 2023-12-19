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
  styleUrls: ['./registo.component.css'],
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

  constructor(private router: Router, private jugadorService: JugadorService) {}

  crearJugador(jugadorForm: NgForm): void {
    if (jugadorForm.valid) {
      this.jugadorService.crearJugador(this.nuevoJugador).subscribe((data) => {
        console.log(data.value);
        if (data.value === true) {
          Swal.fire({
            icon: 'success',
            text: 'Se ha creado el jugador:',
          });
        } else {
          Swal.fire({
            icon: 'error',
            text: 'El jugador ya existe',
          });
        }
      });
    }
  }

  IraDash() {
    this.router.navigate(['/login']);
  }
}
