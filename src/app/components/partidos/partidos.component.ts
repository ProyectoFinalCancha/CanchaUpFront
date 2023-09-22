import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Jugador } from 'src/app/models/jugador';
import { Partido } from 'src/app/models/partido';
import { PartidoService } from 'src/app/services/partido.service';

@Component({
  selector: 'app-partidos',
  templateUrl: './partidos.component.html',
  styleUrls: ['./partidos.component.css']
})
export class PartidosComponent {

  partido!:Partido;
  
  constructor(partidoService : PartidoService) { }

  ngOnInit() {
    this.getPartidos();
  }


  getPartidos() {
    this.partidoService.getJugadores().subscribe((res) => {
      this.jugadorService.jugadores = res;
    });
  }


  agregarPartido(form:NgForm){
    this.partidoService.createJugador(form.value).subscribe((res) => {
      this.getJugadores();
      this.resetForm(form);
    })
  }

  resetForm(form:NgForm){
    if(form){
      form.reset();
      this.jugadorService.jugador = new Jugador()
    }
  }

  borrarJugador(id:number,form:NgForm){
    if(confirm("Estas seguro de borrar el jugador?")){
      this.jugadorService.deleteJugador(id).subscribe((res) =>{
        this.getJugadores();
        this.resetForm(form);
      })
    }
  }
}
