import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PopupService } from 'src/app/services/popup.service';
import { PartidoService } from 'src/app/services/partido.service';
import { EquipoService } from 'src/app/services/equipo.service';
import { SolicitudesEquipoService } from 'src/app/services/solicitudes-equipo.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  sidebarVisible1: boolean = false;
  sidebarVisible2: boolean = false;
  sidebarVisible3: boolean = false;

  telefono: string = '';

  cursorStyle: string = 'default';
  constructor(
    private router: Router,
    public popupService: PopupService,
    public partidoService: PartidoService,
    public equipoService: EquipoService,
    public solicitudesEquipoService: SolicitudesEquipoService
  ) {}

  ngOnInit(): void {
    this.telefono = localStorage.getItem('telefono') || '';
    console.log('telefono: ', this.telefono);
  }
  cambiarCursor(puntero: boolean) {
    this.cursorStyle = puntero ? 'pointer' : 'default';
  }

  salir() {
    this.router.navigate(['/login']);
  }
  irAMatch() {
    this.router.navigate(['/match']);
  }
  abrirPopup() {
    this.sidebarVisible2 = true;
  }

  cerrarSesion() {
    this.router.navigateByUrl('/login');
  }

  async abrirPopupDesdeDashboard(): Promise<void> {
    const resultado = await this.tienePartido();
    const resultado2 = await this.tieneSolicitud();
    if (!resultado && !resultado2) {
      const fechaActual = new Date();
      this.popupService.abrirPopup('', fechaActual, '');
    }
  }

  tieneSolicitud(): Promise<boolean> {
    return new Promise((resolve) => {
      this.solicitudesEquipoService
        .tieneSolicitud(this.telefono)
        .subscribe((response) => {
          if (response.value === true) {
            Swal.fire({
              icon: 'error',
              title: 'Ya tienes una partido pendiente de marchmaking',
            });
            resolve(true);
          } else {
            resolve(false);
          }
        });
    });
  }

  tienePartido(): Promise<boolean> {
    return new Promise((resolve) => {
      this.partidoService.hayPartido(this.telefono).subscribe(
        (response) => {
          const primerPartido = response[0];
          const idPartido = primerPartido.$$instanceId;
          const dia = primerPartido.dia;
          const horario = primerPartido.horario.enumTitle;
          Swal.fire({
            icon: 'error',
            title: 'Ya tienes un partido',
            html: `Dia: <strong>${dia}</strong>  a las: <strong>${horario}</strong>`,
            showCancelButton: true,
            confirmButtonText: 'Sí, dar de baja',
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#d33',
          }).then((result) => {
            if (result.isConfirmed) {
              this.partidoService.darDeBaja(idPartido).subscribe();
            }
            resolve(true);
          });
        },
        (error) => {
          resolve(false);
        }
      );
    });
  }

  misPartidos(): Promise<boolean> {
    return new Promise((resolve) => {
      this.partidoService.hayPartido(this.telefono).subscribe(
        (response) => {
          const primerPartido = response[0];
          const idPartido = primerPartido.$$instanceId;
          const dia = primerPartido.dia;
          const horario = primerPartido.horario.enumTitle;
          Swal.fire({
            icon: 'success',
            title: 'Tienes un Partido el',
            html: `Dia: <strong>${dia}</strong>  a las: <strong>${horario}</strong>`,
            showCancelButton: true,
            confirmButtonText: 'dar de baja',
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#d33',
          }).then((result) => {
            if (result.isConfirmed) {
              this.partidoService.darDeBaja(idPartido).subscribe();
            }
            resolve(true);
          });
        },
        (error) => {
          Swal.fire({
            icon: 'success',
            title: 'No Tienes turnos',
            html: 'Reserva Uno!',
          });
          resolve(false);
        }
      );
    });
  }
}
