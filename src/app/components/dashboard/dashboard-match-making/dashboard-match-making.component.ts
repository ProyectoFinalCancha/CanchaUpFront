import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Equipo } from 'src/app/models/equipo';
import { EquipoService } from 'src/app/services/equipo.service';
import { LoginService } from 'src/app/services/login.service';
import { PopupService } from 'src/app/services/popup.service';

@Component({
  selector: 'app-dashboard-match-making',
  templateUrl: './dashboard-match-making.component.html',
  styleUrls: ['./dashboard-match-making.component.css'],
})
export class DashboardMatchMakingComponent {
  telefono: string = '';

  sidebarVisible1: boolean = false;
  sidebarVisible2: boolean = false;
  sidebarVisible3: boolean = false;

  cursorStyle: string = 'default';
  constructor(
    private router: Router,
    public equipoService: EquipoService,
    public popupService: PopupService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.telefono = this.loginService.getTelefono();
    console.log('telefono: ', this.telefono);
  }

  abrirPopupSolicitud(): void {
    // Llama al método del servicio para abrir el popup
    const fechaActual = new Date();
    this.popupService.abrirPopupSolicitud('', fechaActual, '');
  }

  abrirPopupEquipo(): void {
    // Llama al método del servicio para abrir el popup
    const fechaActual = new Date();
    this.popupService.abrirPopupEquipo('', fechaActual, '');
  }

  cambiarCursor(puntero: boolean) {
    this.cursorStyle = puntero ? 'pointer' : 'default';
  }

  salir() {
    this.router.navigate(['/login']);
  }

  volver() {
    this.router.navigate(['/dashboard']);
  }
  solicitud() {
    this.router.navigate(['/solicitudes']);
  }
  solicitudEquipos() {
    this.router.navigate(['/solicitudes-equipo']);
  }

  equipos(): void {
    this.equipoService.crearEquipo(this.telefono).subscribe(
      (respose) => {
        console.log(respose);
      },
      (err) => {
        console.log(err);
      }
    );

    this.router.navigate(['/equipos']);
  }
}
