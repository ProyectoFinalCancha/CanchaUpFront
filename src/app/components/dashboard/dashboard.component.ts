import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PopupService } from 'src/app/services/popup.service';
import { PartidoService } from 'src/app/services/partido.service';
import { EquipoService } from 'src/app/services/equipo.service';

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
    public equipoService: EquipoService
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
    console.log(resultado);
    if (!resultado) {
      const fechaActual = new Date();
      this.popupService.abrirPopup('', fechaActual, '');
    }
  }

  tienePartido(): Promise<boolean> {
    return new Promise((resolve) => {
      this.partidoService.hayPartido(this.telefono).subscribe(
        (response) => {
          console.log(response);
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
}
