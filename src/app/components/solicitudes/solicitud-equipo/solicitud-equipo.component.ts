import { Component } from '@angular/core';
import { SolicitudesEquipoService } from 'src/app/services/solicitudes-equipo.service';
import { SolicitudesService } from 'src/app/services/solicitudes.service';

@Component({
  selector: 'app-solicitud-equipo',
  templateUrl: './solicitud-equipo.component.html',
  styleUrls: ['./solicitud-equipo.component.css']
})
export class SolicitudEquipoComponent {
  nuevoDia: string = '';
  nuevoTelefono: string = '';
  nuevoHorario:string = '';
  solicitudes: any[] = [];
  objectId:number = 0;

  constructor(private solicitudEquipoService: SolicitudesEquipoService) {}

  ngOnInit() {
    // Carga las solicitudes existentes al iniciar el componente
   
  }

  crearSolicitud() {
    if (this.nuevoDia && this.nuevoTelefono) {
      // Llama al servicio para crear una solicitud
      this.solicitudEquipoService.crearSolicitudEquipo(this.nuevoDia, this.nuevoTelefono, this.nuevoHorario).subscribe(
        (respuesta: any) => {
          console.log('Solicitud creada:', respuesta);
          
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


  cancelarSolicitud() {
    const objectId = '9';

    this.solicitudEquipoService.cancelarSolicitudEquipo(objectId)
      .subscribe(
        (result) => console.log(result),
        (error) => console.log('error', error)
      );
  }

  
}
