import { Component, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Jugador } from 'src/app/models/jugador';
import { EquipoService } from 'src/app/services/equipo.service';
import { JugadorService } from 'src/app/services/jugador.service';




@Component({
  selector: 'app-equipo',
  templateUrl: './equipo.component.html',
  styleUrls: ['./equipo.component.css'],
  providers:[JugadorService]
})
export class EquipoComponent {
  constructor(private router:Router){
     
  }

  irAMatch(){
    this.router.navigate(['/match'])
  }
}




