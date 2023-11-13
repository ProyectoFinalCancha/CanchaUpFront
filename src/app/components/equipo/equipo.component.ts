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
 
}




