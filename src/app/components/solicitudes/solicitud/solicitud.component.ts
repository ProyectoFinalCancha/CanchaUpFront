import { Component } from '@angular/core';
import { Partido, EstadosPartido } from 'src/app/models/partido';
import { PartidoService } from 'src/app/services/partido.service';
import { SolicitudesService } from 'src/app/services/solicitudes.service';

@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  styleUrls: ['./solicitud.component.css']
})
export class SolicitudComponent {
  dia: string = '2020-10-10';
  telefono: string = '2';
  horario: string = '_19_HS';
  objectId: string = '6';

  constructor(private solicitudesService: SolicitudesService) {}

  realizarSolicitud() {
    this.solicitudesService.crearSolicitud(this.dia, this.telefono, this.horario).subscribe(
      (result) => {
        console.log('Solicitud creada con éxito:', result);
        // Lógica adicional en caso de éxito
      },
      (error) => {
        console.error('Error al crear la solicitud:', error);
        // Lógica adicional en caso de error
      }
    );
  }
  cancelarSolicitud() {
    // Llamada al método de cancelarSolicitud con el objectId
    this.solicitudesService.cancelarSolicitud(this.objectId).subscribe(
      (result) => {
        console.log('Solicitud cancelada con éxito:', result);
        // Lógica adicional en caso de éxito
      },
      (error) => {
        console.error('Error al cancelar la solicitud:', error);
        // Lógica adicional en caso de error
      }
    );
  }
}
