import { Component } from '@angular/core';
import { SolicitudesService } from 'src/app/services/solicitudes.service';

@Component({
  selector: 'app-solicitud-equipo',
  templateUrl: './solicitud-equipo.component.html',
  styleUrls: ['./solicitud-equipo.component.css']
})
export class SolicitudEquipoComponent {
  nuevoDia: string = '';
  nuevoTelefono: string = '';
  solicitudes: any[] = [];


  constructor(private solicitudEquipoService: SolicitudesService) {}

  ngOnInit() {
    // Carga las solicitudes existentes al iniciar el componente
    this.cargarSolicitudes();
  }

  crearSolicitud() {
    if (this.nuevoDia && this.nuevoTelefono) {
      // Llama al servicio para crear una solicitud
      this.solicitudEquipoService.crearSolicitudEquipo(this.nuevoDia, this.nuevoTelefono).subscribe(
        (respuesta: any) => {
          console.log('Solicitud creada:', respuesta);
          // Actualiza la lista de solicitudes
          this.cargarSolicitudes();
        },
        (error: any) => {
          console.error('Error al crear la solicitud:', error);
        }
      );

      // Reinicia los campos del formulario
      this.nuevoDia = '';
      this.nuevoTelefono = '';
    }
  }

  
  cargarSolicitudes() {
    // Llama al servicio para obtener la lista de solicitudes
    this.solicitudEquipoService.obtenerSolicitudesEquipo().subscribe(
      (solicitudes) => {
        this.solicitudes = solicitudes;
      },
      (error) => {
        console.error('Error al obtener las solicitudes:', error);
      }
    );
  }
}
