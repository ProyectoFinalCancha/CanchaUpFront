import { formatDate } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { Jugador } from 'src/app/models/jugador';
import { EstadosPartido, Horarios, NumeroCancha, Partido } from 'src/app/models/partido';
import { PartidoService } from 'src/app/services/partido.service';
import * as moment from 'moment';

@Component({
  selector: 'app-partidos',
  templateUrl: './partidos.component.html',
  styleUrls: ['./partidos.component.css'],
  providers: [PartidoService]
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
  selectedEstado: string = '';  // Declara la propiedad aquí
  nuevoPartido!: Partido
  searchHorario: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  pageSize = 10; // Tamaño de la página
  pageIndex = 0; // Índice de la página
  currentPage = 1;
  totalItems = 0;
  filteredPartidos!: Partido[];



  constructor(private router: Router, public partidoService: PartidoService, private fb: FormBuilder) {
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
          () => console.log('partido creado exitosamente'),
          (error) => console.error('Error al crear partido:', error)
        );
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginator?.previousPage();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages()) {
      this.currentPage++;
      this.paginator?.nextPage();
    }
  }

  totalPages(): number {
    if (this.paginator) {
      this.totalItems = this.paginator.length || 0;
      return Math.ceil(this.totalItems / this.pageSize);
    }
    return 0;
  }




  navegar() {
    this.router.navigate(['admin2Dash'])
  }


  sacarTurno(): void {
    const { horario, dia, telefono } = this.nuevoPartido;

    // Llama a la función sacarTurno del servicio
    this.partidoService.sacarTurno(horario, dia.toISOString(), telefono!).subscribe(
      (result) => {
        console.log('Turno sacado con éxito:', result);
        // Actualiza cualquier otra lógica necesaria después de sacar el turno
      },
      (error) => {
        console.error('Error al sacar el turno:', error);
        // Manejar el error aquí si es necesario
      }
    );
  }

  obtenerPartidos(): void {
    this.partidoService.verPartidos().subscribe(
      (data: Partido[]) => {
        console.log('Datos del servidor:', data);
        this.partidos = [...data];
      },
      error => {
        console.log('Error al obtener partidos:', error);
      }
    );
  }






  rechazarPartido(instanceId: string): void {
    this.partidoService.rechazarPartido(instanceId).subscribe(
      (result) => {
        console.log('Partido rechazado con éxito:', result);
        this.obtenerPartidos();
        // Puedes hacer algo aquí después de que el partido se ha rechazado, como actualizar la lista de partidos
        // this.actualizarListaDePartidos(); // Asume que tienes un método para actualizar la lista de partidos
      },
      (error) => {
        console.error('Error al rechazar el partido:', error);
        // Manejar el error aquí si es necesario
      }
    );
  }


  darDeBaja(instanceId: string): void {
    this.partidoService.darDeBaja(instanceId).subscribe(
      (result) => {
        console.log('Partido dado de baja con éxito:', result);
        this.obtenerPartidos();
        // Puedes hacer algo aquí después de que el partido se ha dado de baja, como actualizar la lista de partidos
        // this.actualizarListaDePartidos(); // Asume que tienes un método para actualizar la lista de partidos
      },
      (error) => {
        console.error('Error al dar de baja el partido:', error);
        // Manejar el error aquí si es necesario
      }
    );
  }








  confirmarPartido(instanceId: string): void {
    this.partidoService.confirmarPartido(instanceId).subscribe(
      (result) => {
        console.log('Partido confirmado con éxito:', result);
        this.obtenerPartidos();
        // Puedes hacer algo aquí después de que el partido se ha confirmado, como actualizar la lista de partidos
        // this.actualizarListaDePartidos(); // Asume que tienes un método para actualizar la lista de partidos
      },
      (error) => {
        console.error('Error al confirmar el partido:', error);
        // Manejar el error aquí si es necesario
      }
    );
  }

  completarPartido(instanceId: string): void {
    this.partidoService.completar(instanceId).subscribe(
      (result) => {
        console.log('Partido completado con éxito:', result);
        this.obtenerPartidos();
        // Puedes hacer algo aquí después de que el partido se ha completado, como actualizar la lista de partidos
        // this.actualizarListaDePartidos(); // Asume que tienes un método para actualizar la lista de partidos
      },
      (error) => {
        console.error('Error al completar el partido:', error);
        // Manejar el error aquí si es necesario
      }
    );
  }

  buscarPartidoPorRepresentante(): void {
    this.partidoService.buscarPartidoPorRepresentante(this.telefono).subscribe(
      (result) => {
        console.log('Partidos encontrados:', result);
        // Actualiza la lista de partidos con los resultados obtenidos
        this.partidos = result; // Asume que el resultado es un array de Partido
      },
      (error) => {
        console.error('Error al buscar partidos por representante:', error);
        // Restablecer la lista de partidos en caso de error
        this.partidos = [];
      }
    );
  }

  buscarPartidoPorEstado(): void {
    this.partidoService.buscarPartidoEstado(this.selectedEstado).subscribe(
      (result) => {
        console.log('Partidos encontrados por estado:', result);
        // Actualiza la lista de partidos con los resultados obtenidos
        this.partidos = result; // Asume que el resultado es un array de Partido
      },
      (error) => {
        console.error('Error al buscar partidos por estado:', error);
        // Manejar el error aquí si es necesario
      }
    );
  }



  buscarPartido(): void {
    console.log('Valor inicial de searchNumeroCancha:', this.searchNumeroCancha);
  
    const { numeroCancha } = this.nuevoPartido;
    const dia = this.searchDia;
    const horario = this.searchHorario;  // Modifica esta línea
  
    const diaMoment = moment(dia);
  
    if (diaMoment.isValid()) {
      const formattedDia = diaMoment.format('YYYY-MM-DD');
  
      this.partidoService.buscarPartido(horario, formattedDia, numeroCancha.toString()).subscribe(
        (result) => {
          console.log('Partidos encontrados (result):', result);
  
          if (Array.isArray(result)) {
            this.filteredPartidos = result;
  
            if (numeroCancha) {
              this.partidos = this.filteredPartidos.filter(partido => partido.numeroCancha === numeroCancha);
            } else {
              this.partidos = this.filteredPartidos;
            }
  
            if (this.paginator) {
              this.paginator.firstPage();
            }
  
            this.errorOccurred = false;
            this.errorMessage = '';
          } else {
            console.error('Error: Result is not an array of Partido objects');
            this.errorOccurred = true;
            this.errorMessage = 'Unexpected response structure';
          }
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












}