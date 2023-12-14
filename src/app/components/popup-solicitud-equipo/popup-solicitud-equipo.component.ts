import { Component } from '@angular/core';
import { Jugador } from 'src/app/models/jugador';
import { Horarios } from 'src/app/models/partido';
import { LoginService } from 'src/app/services/login.service';
import { SolicitudesEquipoService } from 'src/app/services/solicitudes-equipo.service';
import Swal from 'sweetalert2';
import * as emailjs from 'emailjs-com';
import { EmailService } from 'src/app/services/email.service';

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
  email: string = '';

  constructor(
    private solicitudesEquipoService: SolicitudesEquipoService,
    private emailService: EmailService
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
    const fechaFormateada: string = this.formatearFecha(dia);

    this.solicitudesEquipoService
      .crearSolicitudEquipo(fechaFormateada, horario, this.telefono)
      .subscribe(
        (response) => {
          console.log('Respuesta exitosa:', response);

          // Llamada al servicio de correo electrónico después de la creación exitosa de la solicitud
          this.enviarCorreoElectronico(dia, horario);

          // Mostrar mensaje de éxito
          Swal.fire({
            icon: 'success',
            title: '¡Se creó la solicitud!',
            html: `Te llegará un correo a: <br><br>  <span style="color: #000000;"><strong>${this.email}</strong></span>`,
          });
        },
        (error) => {
          console.error('Error al crear la solicitud:', error);

          // Mostrar mensaje de error
          Swal.fire({
            icon: 'error',
            title: 'Error al crear la solicitud',
            text: 'Hubo un problema al crear la solicitud.',
          });
        }
      );
  }

  enviarCorreoElectronico(dia: string, horario: string): void {
    this.emailService.enviarCorreo(dia, horario, this.email).subscribe(
      (emailResponse) => {
        console.log('Correo electrónico enviado con éxito:', emailResponse);
      },
      (emailError) => {
        console.error('Error al enviar el correo electrónico:', emailError);
      }
    );
  }

  // enviarCorreoElectronico(): void {
  //   const fechaFormateada: string = this.formatearFecha(this.dia); // Agrega esta línea para obtener el valor del día
  //   const templateParams = {
  //     to_email: this.email,
  //     dia: fechaFormateada, // Actualiza con el valor del día formateado
  //     horario: this.horario, // Actualiza con el valor del horario
  //     subject: 'Nueva Solicitud (Match Individual) Creada!',
  //     // Otros parámetros que quieras pasar al correo
  //   };

  //   emailjs.send('service_nbd6mjj', 'template_6l1qpzb', templateParams, 'XALAjZWm5UGABP3zX')
  //     .then((response) => {
  //       console.log('Correo electrónico enviado con éxito:', response);
  //     })
  //     .catch((error) => {
  //       console.error('Error al enviar el correo electrónico:', error);
  //     });
  // }

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
