import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PopupService } from '@ng-bootstrap/ng-bootstrap/util/popup';
import { Equipo } from 'src/app/models/equipo';
import { EquipoService } from 'src/app/services/equipo.service';

@Component({
  selector: 'app-dashboard-match-making',
  templateUrl: './dashboard-match-making.component.html',
  styleUrls: ['./dashboard-match-making.component.css']
})
export class DashboardMatchMakingComponent {
  sidebarVisible1: boolean = false;
  sidebarVisible2: boolean = false;
  sidebarVisible3: boolean = false;


  cursorStyle: string = 'default';
  constructor(private router: Router, public equipoService: EquipoService) {

  }
  cambiarCursor(puntero: boolean) {
    this.cursorStyle = puntero ? 'pointer' : 'default';
  }

  salir() {
    this.router.navigate(['/login']);
  }

  volver() {
    this.router.navigate(['/dashboard'])
  }


  abrirPopupCrearEquipo(): void {
    // Crea un objeto Equipo con nombre y teléfono
    const equipoData: Equipo = {
      nombre: '',
      telefono: ''
    };
    
    // Llama al método del servicio para abrir el popup con el objeto Equipo
    this.equipoService.abrirPopupCrearEquipo(equipoData);
  }
}
