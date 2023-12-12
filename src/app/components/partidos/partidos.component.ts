import { formatDate } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { Jugador } from 'src/app/models/jugador';
import { Horarios, NumeroCancha, Partido } from 'src/app/models/partido';
import { PartidoService } from 'src/app/services/partido.service';
import * as moment from 'moment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-partidos',
  templateUrl: './partidos.component.html',
  styleUrls: ['./partidos.component.css'],
  providers: [PartidoService],
})
export class PartidosComponent {
  telefono: string = '';
  partidos: Partido[] = [];
  horarios: string[] = Object.values(Horarios) as string[];

  errorOccurred: boolean = false;
  errorMessage: string = '';
  searchDia: string = '';
  searchNumeroCancha: string = '';
  numeroCanchaOptions = Object.keys(NumeroCancha);
  horarioOptions = Object.keys(Horarios);
  nuevoPartido!: Partido;
  searchHorario: string = '';

  /*   estadosPartido = Object.values(EstadosPartido); */
  estadosPartido: string[] = [
    'ESPERA',
    'RECHAZADO',
    'CONFIRMADO',
    'COMPLETADO',
    'MATCHMAKING',
  ];
  selectedEstado: string = 'ESPERA';

  constructor(
    private router: Router,
    public partidoService: PartidoService,
    private fb: FormBuilder
  ) {
    this.nuevoPartido = {
      id: 0,
      dia: new Date(),
      estado: null,
      horario: Horarios['_18_HS'], // Inicializa con un valor del enum
      numeroCancha: NumeroCancha.UNO,
      precio: 0,
      telefono: null,
      representante: null,
    };
  }

  ngOnInit(): void {
    this.obtenerPartidos();
    // this.buscarPartidoEstado();
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

  crearPartido(partidoForm: NgForm): void {
    if (partidoForm.valid) {
      this.partidoService
        .crearPartido(this.nuevoPartido)
        .pipe(
          finalize(() => {
            this.obtenerPartidos();
            this.nuevoPartido = new Partido();
          })
        )
        .subscribe(
          () =>
            Swal.fire({
              icon: 'success',
              text: 'Se ha creado el partido:',
            }),
          (error) =>
            Swal.fire({
              icon: 'error',
              text: 'No se pudo crear el partido',
            })
        );
    }
  }

  transformarHorario(horario: string): string {
    return horario.replace('_', '').replace('_HS', ' hs');
  }

  sacarTurno(partidoForm: NgForm): void {
    const horario = partidoForm.value.horario;
    const diaString = partidoForm.value.dia; // No conviertas a Date aquí
    const telefono = partidoForm.value.telefono;

    this.partidoService.sacarTurno(horario, diaString, telefono).subscribe(
      (result) => {
        console.log(result);
        // Recargar los partidos después de agregar uno nuevo
        this.obtenerPartidos();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  convertirStringAHorario(horarioString: string): Horarios | undefined {
    // Revertir la transformación realizada en la presentación
    switch (horarioString) {
      case '18 HS':
        return Horarios._18_HS;
      case '19 HS':
        return Horarios._19_HS;
      case '20 HS':
        return Horarios._20_HS;
      case '21 HS':
        return Horarios._21_HS;
      case '22 HS':
        return Horarios._22_HS;
      case '23 HS':
        return Horarios._23_HS;
      default:
        return undefined;
    }
  }

  obtenerPartidos(): void {
    this.partidoService.verPartidos().subscribe(
      (data: any[]) => {
        this.partidos = data.filter((item) => item && item.$$instanceId);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  rechazarPartido(instanceId: string, index: number): void {
    this.partidoService.rechazarPartido(instanceId).subscribe(
      (result) => {
        console.log('Partido rechazado con éxito:', result);
        this.obtenerPartidos();
        // Puedes hacer algo aquí después de que el partido se ha rechazado
        // this.actualizarListaDePartidos(index);
      },
      (error) => {
        console.error('Error al rechazar el partido:', error);
        // Manejar el error aquí si es necesario
      }
    );
  }

  darDeBaja(instanceId: string, index: number): void {
    this.partidoService.darDeBaja(instanceId).subscribe(
      (result) => {
        console.log('Partido dado de baja con éxito:', result);
        this.obtenerPartidos();
        // Puedes hacer algo aquí después de que el partido se ha dado de baja
        // this.actualizarListaDePartidos(index);
      },
      (error) => {
        console.error('Error al dar de baja el partido:', error);
        // Manejar el error aquí si es necesario
      }
    );
  }

  confirmarPartido(instanceId: string, index: number): void {
    this.partidoService.confirmarPartido(instanceId).subscribe(
      (result) => {
        console.log('Partido confirmado con éxito:', result);
        this.obtenerPartidos();
        // Puedes hacer algo aquí después de que el partido se ha confirmado
        // this.actualizarListaDePartidos(index);
      },
      (error) => {
        console.error('Error al confirmar el partido:', error);
        // Manejar el error aquí si es necesario
      }
    );
  }

  completarPartido(instanceId: string, index: number): void {
    this.partidoService.completar(instanceId).subscribe(
      (result) => {
        console.log('Partido completado con éxito:', result);
        this.obtenerPartidos();
        // Puedes hacer algo aquí después de que el partido se ha completado
        // this.actualizarListaDePartidos(index);
      },
      (error) => {
        console.error('Error al completar el partido:', error);
        // Manejar el error aquí si es necesario
      }
    );
  }

  buscarPartidoPorRepresentante(telefono: string): void {
    this.partidoService.buscarPartidoPorRepresentante(telefono).subscribe(
      (data) => {
        console.log(data);
        if (telefono.trim() !== '') {
          // Si hay un teléfono especificado en el filtro, mostrar los resultados filtrados
          this.partidos = Array.isArray(data) ? data : [data];
        } else {
          // Si no hay teléfono especificado, mostrar todos los jugadores
          this.obtenerPartidos();
        }
      },
      (error) => {
        console.log('Error', error);
      }
    );
  }

  buscarPartidoPorEstado(selectedEstado: string): void {
    console.log(selectedEstado);

    this.partidoService.buscarPartidoEstado(selectedEstado).subscribe(
      (data) => {
        console.log('Partidos encontrados por estado:', data);
        // Filtrar los partidos que tienen el estado seleccionado
        this.partidos = Array.isArray(data) ? data : [data];
      },
      (error) => {
        console.error('Error al buscar partidos por estado:', error);
        // Manejar el error aquí si es necesario
        this.partidos = [];
      }
    );
  }

  buscarPartido(): void {
    console.log(
      'Valor inicial de searchNumeroCancha:',
      this.searchNumeroCancha
    );

    const { numeroCancha } = this.nuevoPartido;
    const dia = this.searchDia;
    const horario = this.searchHorario; // Modifica esta línea

    const diaMoment = moment(dia);

    if (diaMoment.isValid()) {
      const formattedDia = diaMoment.format('YYYY-MM-DD');

      this.partidoService
        .buscarPartido(horario, formattedDia, numeroCancha.toString())
        .subscribe(
          (result) => {
            console.log('Partidos encontrados (result):', result);
          },
          (error) => {
            console.error('Error al buscar partidos:', error);
            this.errorOccurred = true;
            this.errorMessage = 'Error communicating with the server';
          }
        );
    } else {
      console.error('Error: Invalid date');
      this.errorOccurred = true;
      this.errorMessage = 'Invalid date';
    }
    console.log('Valor final de searchNumeroCancha:', this.searchNumeroCancha);
  }

  salir() {
    this.router.navigate(['/login']);
  }

  encargados() {
    this.router.navigate(['/encargados']);
  }

  jugadores() {
    this.router.navigate(['/jugadores']);
  }

  scrollToDiv() {
    const div = document.getElementById('tabla');
    console.log(div);
    if (div !== null) {
      div.scrollIntoView({ behavior: 'smooth' });
    }
  }

  navegar() {
    this.router.navigate(['partidos']);
  }
}
