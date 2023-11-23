import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { Jugador } from 'src/app/models/jugador';
import { JugadorService } from 'src/app/services/jugador.service';

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
    username: '',
    fechaDeNacimiento: new Date(),
  };

  constructor(private router: Router, private jugadorService: JugadorService) { }

  crearJugador(jugadorForm: NgForm): void {
    if (jugadorForm.valid) {
      this.jugadorService.crearJugador(this.nuevoJugador)
        .pipe(finalize(() => {
          
          this.nuevoJugador = new Jugador();
        }))
        .subscribe(
          () => console.log('Jugador creado exitosamente'),
          error => console.error('Error al crear jugador:', error)
        );
    }
  }
  
  






  IraDash() {
    this.router.navigate(['/login'])
  }
}
