import { Component } from '@angular/core';
import { Jugador } from 'src/app/models/jugador';
import { Horarios } from 'src/app/models/partido';
import { LoginService } from 'src/app/services/login.service';
import { SolicitudesEquipoService } from 'src/app/services/solicitudes-equipo.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-popup-solicitud-equipo',
  templateUrl: './popup-solicitud-equipo.component.html',
  styleUrls: ['./popup-solicitud-equipo.component.css'],
})
export class PopupSolicitudEquipoComponent {
  horario: string = '18 hs';
  horarioEnumValues = Object.values(Horarios);
  dia: string = '';
  telefono: string = '';
  email : string = ''

  constructor(
    private solicitudesEquipoService: SolicitudesEquipoService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.telefono = localStorage.getItem('telefono') || '';
    this.email = localStorage.getItem('email') || '';
    console.log('telefono: ', this.telefono);

  }

  transformarHorario(horario: string): string {
    return horario.replace('_', '').replace('_HS', ' hs');
  }

  crearSolicitud(dia: string, horario: string): void {
    const fechaFormateada: string = this.formatearFecha(dia); // Formatear la fecha
    this.solicitudesEquipoService
      .crearSolicitudEquipo(fechaFormateada, horario, this.telefono)
      .subscribe(
        (response) => {
          console.log('Respuesta exitosa:', response);
          Swal.fire({
            icon:'success',
            title:'se creo la solicitud!',
            html:`Te llegará un mail a tu casilla de correo: <br><br>  <span style="color: #000000;"><strong>${this.email}</strong></span>`
          })
        },
        (error) => {
          console.error('Error al crear la solicitud:', error);
        }
      );
  }

  formatearFecha(fecha: string): string {
    // Convertir la fecha en un objeto de tipo Date
    const fechaObjeto: Date = new Date(fecha);

    // Obtener los componentes de la fecha (año, mes y día)
    const year: number = fechaObjeto.getFullYear();
    const month: number = fechaObjeto.getMonth() + 1; // Los meses van de 0 a 11, por eso se suma 1
    const day: number = fechaObjeto.getDate();

    // Formatear la fecha a 'aaaa-mm-dd'
    const fechaFormateada: string =
      year +
      '-' +
      (month < 10 ? '0' + month : month) +
      '-' +
      (day < 10 ? '0' + day : day);

    return fechaFormateada;
  }
}
