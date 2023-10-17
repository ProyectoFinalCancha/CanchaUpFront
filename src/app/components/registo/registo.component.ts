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
  constructor(private router:Router,
    private jugadorService:JugadorService){

  }

  // jugador!:Jugador;

agregarJugador(jugador: Jugador){
  this.jugadorService.crearJugador(jugador).subscribe(
    (response) => {
      // La petición se completó con éxito, puedes manejar la respuesta aquí
      console.log('Jugador creado:', response);
      // Redirige a la página deseada después de un registro exitoso
      this.router.navigate(['/login']);
    },
    (error) => {
      // Si ocurre un error, puedes manejarlo aquí
      console.error('Error al crear el jugador:', error);
    }
  );
}






  IraDash() {
    this.router.navigate(['/login'])
  }
}
