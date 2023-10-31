import { Component } from '@angular/core';
import { SolicitudesService } from 'src/app/services/solicitudes.service';

@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  styleUrls: ['./solicitud.component.css']
})
export class SolicitudComponent {
  dia: string = '';
  telefono: string = '';

  constructor(private solicitudService: SolicitudesService) {}

  ngOnInit() {}

  crearSolicitud() {
    this.solicitudService.crearSolicitud(this.dia, this.telefono).subscribe((response) => {
      // Manejar la respuesta de la solicitud aquí
    });
  }

  verSolicitudes() {
    this.solicitudService.verSolicitudes().subscribe((response) => {
      // Manejar la respuesta de la solicitud aquí
    });
  }
}
