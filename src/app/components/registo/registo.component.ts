import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
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
    fechaDeNacimiento: new Date() 
  };


  constructor(private router:Router,
    private jugadorService:JugadorService){

  }

  // jugador!:Jugador;

  crearJugador(jugadorForm: NgForm): void {
    if (jugadorForm.valid) {
      this.jugadorService.crearJugador(this.nuevoJugador)
        .subscribe(
          data => {
            console.log('Jugador creado:', data);
           
            jugadorForm.resetForm();
            this.nuevoJugador = {
              nombre: '',
              apellido: '',
              telefono: '',
              mail: '',
              password: '',
              username: '',
              fechaDeNacimiento: new Date() 
            };
          },
          error => {
            console.error('Error al crear jugador:', error);
            // Puedes mostrar un mensaje de error o realizar acciones específicas aquí
          }
        );
    }
  }






  IraDash() {
    this.router.navigate(['/login'])
  }
}
