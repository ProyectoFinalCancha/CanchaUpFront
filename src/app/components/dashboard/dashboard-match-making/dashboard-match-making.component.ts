import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EquipoService } from 'src/app/services/equipo.service';
import { PartidoService } from 'src/app/services/partido.service';
import { PopupService } from 'src/app/services/popup.service';
import Swal from 'sweetalert2';
import { SolicitudesEquipoService } from 'src/app/services/solicitudes-equipo.service';

@Component({
  selector: 'app-dashboard-match-making',
  templateUrl: './dashboard-match-making.component.html',
  styleUrls: ['./dashboard-match-making.component.css'],
})
export class DashboardMatchMakingComponent {
  telefono: string = '';
  email: string = '';

  sidebarVisible1: boolean = false;
  sidebarVisible2: boolean = false;
  sidebarVisible3: boolean = false;

  cursorStyle: string = 'default';
  constructor(
    private router: Router,

    public equipoService: EquipoService,
    public popupService: PopupService,
    public partidoService: PartidoService,
    public solicitudesEquipoService: SolicitudesEquipoService
  ) {}

  ngOnInit(): void {
    this.telefono = localStorage.getItem('telefono') || '';
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
            title:
              '<br><h1><strong><FONT color="#941818">Ya tienes un Partido para el</FONT></strong></h1>',
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

  tieneSolicitud(): Promise<boolean> {
    return new Promise((resolve) => {
      this.solicitudesEquipoService
        .tieneSolicitud(this.telefono)
        .subscribe((response) => {
          if (response.value === true) {
            Swal.fire({
              icon: 'error',
              title: 'Ya tienes un partido pendiente de marchmaking',
            });
            resolve(true);
          } else {
            resolve(false);
          }
        });
    });
  }

  async abrirPopupSolicitud(): Promise<void> {
    const resultado = await this.tienePartido();
    const resultado2 = await this.tieneSolicitud();
    if (!resultado && !resultado2) {
      const fechaActual = new Date();
      this.popupService.abrirPopupSolicitud('18 HS', fechaActual, '');
    }
  }

  async abrirPopupEquipo(): Promise<void> {
    const resultado = await this.tienePartido();
    const resultado2 = await this.tieneSolicitud();
    if (!resultado && !resultado2) {
      this.equipoService.tieneEquipo(this.telefono).subscribe((respose) => {
        if (respose.value) {
          const fechaActual = new Date();
          this.popupService.abrirPopupEquipo('18 HS', fechaActual, '');
        } else {
          Swal.fire({
            title: 'Crear tu equipo Previamente',
            icon: 'error',
          });
        }
      });
    }
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

  equipos(): void {
    this.equipoService.tieneEquipo(this.telefono).subscribe((respose) => {
      if (!respose.value) {
        Swal.fire({
          title: 'Tu equipo se creó correctamente',
          icon: 'success',
        });
      }
    });

    this.equipoService.crearEquipo(this.telefono).subscribe(
      (response) => {
        const instanceId = response.$$instanceId; // Obtener el valor de $$instanceId
        localStorage.setItem('instanceId', instanceId); // Guardar en el localStorage

        this.router.navigate(['/equipos']);
      },
      (err) => {
        console.error(err);
      }
    );
  }
}
