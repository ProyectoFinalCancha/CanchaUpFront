import { Component, ElementRef } from '@angular/core';
import { Jugador } from 'src/app/models/jugador';
import { EquipoService } from 'src/app/services/equipo.service';
import { JugadorService } from 'src/app/services/jugador.service';
import { SharedService } from 'src/app/services/shared/shared.service';




@Component({
  selector: 'app-equipo',
  templateUrl: './equipo.component.html',
  styleUrls: ['./equipo.component.css'],
  providers:[JugadorService]
})
export class EquipoComponent {
  nombre: string = '';
  telefono: string = '';
  equipos: Jugador[] = [];



  jugadores: Jugador[] = [];
  nuevoJugadores: Jugador[] = [];

  constructor(private equipoService: EquipoService, 
              private sharedService: SharedService, 
              private jugadorService: JugadorService) {}


  ngOnInit() {
    // Suscríbete al Observable para obtener la lista de jugadores actualizada
    this.sharedService.jugadores$.subscribe((jugadores) => {
      this.nuevoJugadores = jugadores;
    });

    
    // Obtiene la lista de jugadores al iniciar el componente
    // this.nuevoJugadores = this.jugadorService.getJugadoresLocalStorage();
    
  }

  agregarJugador() {
    // Obtener el jugador con el número de teléfono ingresado
    const jugador = this.jugadores.find(j => j.telefono === this.telefono);

    if (jugador) {
      this.equipos.push(jugador);
      
      this.telefono = '';
      this.sharedService.actualizarJugadores(this.nuevoJugadores);
    } else {
      alert('Jugador no encontrado con este número de teléfono.');
    }
  }

  // verJugadores(){
  //   this.jugadores = this.jugadorService.getJugadoresLocalStorage();
  // }

}







  // verEquipos() {
   
  // }

  // buscarEquipo() {
  
  // }