import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { SolicitudEquipo } from 'src/app/models/solicitudEquipo';
import { SolicitudesEquipoService } from 'src/app/services/solicitudes-equipo.service';
import { SolicitudesService } from 'src/app/services/solicitudes.service';

@Component({
  selector: 'app-solicitud-equipo',
  templateUrl: './solicitud-equipo.component.html',
  styleUrls: ['./solicitud-equipo.component.css']
})
export class SolicitudEquipoComponent {
  solicitudesEquipo: SolicitudEquipo[] = []
  nuevaSolicitudEquipo!: SolicitudEquipo


  constructor(private solicitudEquipoService: SolicitudesEquipoService) {
    this.nuevaSolicitudEquipo = {
      diaString: '',
      horarioSting: '',
      telefono: ''
    }
  }

  ngOnInit() {
    // Carga las solicitudes existentes al iniciar el componente
    this.verSolicitud();
  }


  verSolicitud(): void {
    this.solicitudEquipoService.verSolicitud().subscribe(
      (data: SolicitudEquipo[]) => {
        console.log('API Response:', data);
        // Ensure that each Solicitud object has the id property set
        this.solicitudesEquipo = data.map(solicitud => ({
          ...solicitud,
          id: solicitud.id !== undefined ? solicitud.id : '0'  // Puedes ajustar esto según el tipo real de tu id
        }));
      },
      (error) => {
        console.log('Error al obtener solicitudes:', error);
      }
    );
  }
  

  crearSolicitudEquipo(solicitudEquipoForm: NgForm) {
    const { dia, telefono, horario } = solicitudEquipoForm.value;
  
    this.solicitudEquipoService.crearSolicitudEquipo(dia, telefono, horario).subscribe(
      (response) => {
        console.log('Solicitud creada con éxito:', response);
        // Realizar acciones adicionales si es necesario
      },
      (error) => {
        console.error('Error al crear la solicitud:', error);
        // Manejar el error según tus necesidades
      }
    );
  }
  





}
