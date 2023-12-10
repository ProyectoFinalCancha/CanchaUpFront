import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { finalize } from 'rxjs';
import { Partido, EstadosPartido, NumeroCancha, Horarios } from 'src/app/models/partido';
import { HorariosEnumTitle, Solicitud } from 'src/app/models/solicitud';
import { PartidoService } from 'src/app/services/partido.service';
import { SolicitudesService } from 'src/app/services/solicitudes.service';

@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  styleUrls: ['./solicitud.component.css']
})
export class SolicitudComponent {

  solicitudes: Solicitud[] = []
  nuevaSolicitud!: Solicitud;

  numeroCanchaOptions = Object.keys(NumeroCancha);

  horarios: string[] = Object.values(Horarios) as string[];
  horarioOptions = Object.keys(Horarios);



  constructor(private solicitudesService: SolicitudesService) {
    this.nuevaSolicitud = {
      dia: new Date(),
      edadPromedio: 0,
      estado: {
        enumName: EstadosPartido.MATCHMAKING,
        enumTitle: 'Matchmaking',  // replace with actual title
        enumType: 'domainapp.modules.simple.dom.partido.types.Estados',  // replace with actual type
      },
      jugador: null,
      precio: 0,
      horario: { enumName: '', enumTitle: '', enumType: '' },
      numeroCancha: { enumName: '', enumTitle: '', enumType: '' },
      telefono: ''
    }
  }




  crearSolicitud(solicitudForm: NgForm): void {
    if (solicitudForm.valid) {
      this.solicitudesService.crearSolicitud(this.nuevaSolicitud)
        .pipe(
          finalize(() => {
            this.verSolicitud();
            this.nuevaSolicitud = new Solicitud();
          })
        )
        .subscribe(
          response => {
            console.log('Respuesta exitosa:', response);
          },
          error => {
            console.error('Error al crear la solicitud:', error);
          }
        );
    }
  }


  cancelarSolicitud(instanceId: string, index: number): void {
    if (!instanceId || instanceId.startsWith('0[OID]')) {
      console.log('El ID es inválido:', instanceId);
      return;
    }
  
    this.solicitudesService.cancelarSolicitud({ id: instanceId })
      .subscribe(
        (result) => {
          console.log('Solicitud eliminada:', result);
          this.verSolicitud();
        },
        (error) => {
          console.error('Error al eliminar la solicitud:', error);
        }
      );
  }
  
  



  getHorarioTitle(horario: Horarios): string {
    return HorariosEnumTitle[horario];
  }


  getHorariosArray(): string[] {
    return Object.values(this.horarios) as string[];
  }
  getHorarioValue(columna: string, partido: any): Horarios | null {
    if (columna === 'horario') {
      return partido[columna] as Horarios;
    }
    // Si no es 'horario', puedes manejar otros casos aquí si es necesario
    return null;
  }


  getHorarioString(horario: Horarios): string {
    switch (horario) {
      case Horarios._18_HS: return '18 HS';
      case Horarios._19_HS: return '19 HS';
      case Horarios._20_HS: return '20 HS';
      case Horarios._21_HS: return '21 HS';
      case Horarios._22_HS: return '22 HS';
      case Horarios._23_HS: return '23 HS';
      default: return ''; // Handle other cases if needed
    }
  }

  ngOnInit(): void {
    this.verSolicitud();
  }


  mapInstanceIdToId(instanceId: string | undefined): string | undefined {
    if (instanceId === undefined) {
      return undefined;
    }

    const solicitud = this.solicitudes.find((s) => s.id === Number(instanceId));
    return solicitud?.id?.toString();
  }


  
 
  verSolicitud(): void {
    this.solicitudesService.verSolicitud().subscribe(
      (data: Solicitud[]) => {
        console.log('API Response:', data);
        // Ensure that each Solicitud object has the id property set
        this.solicitudes = data.map(solicitud => ({ ...solicitud, id: solicitud.id || 0 }));
      },
      (error) => {
        console.log('Error al obtener solicitudes:', error);
      }
    );
  }
  



  getNumeroCanchaString(numeroCancha: NumeroCancha): string {
    return numeroCancha;
  }



}
