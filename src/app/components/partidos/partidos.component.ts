import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { EstadosPartido } from 'src/app/models/estadosPartido';
import { Jugador } from 'src/app/models/jugador';
import { Partido } from 'src/app/models/partido';
import { PartidoService } from 'src/app/services/partido.service';


type EstadosPartidoString = keyof typeof EstadosPartido;

@Component({
  selector: 'app-partidos',
  templateUrl: './partidos.component.html',
  styleUrls: ['./partidos.component.css'],
  providers: [PartidoService]
})
export class PartidosComponent {

  partidoForm!: FormGroup;
  telefono: string = '';

  partidos = Partido;
  selectedEstado: string = '';  // Declara la propiedad aquí


  pageSize = 10; // Tamaño de la página
  pageIndex = 0; // Índice de la página


  estadosPartido = EstadosPartido;
  estadosPartidoArray: { value: EstadosPartido; label: EstadosPartidoString }[] = [
    { value: EstadosPartido.ESPERA, label: 'ESPERA' },
    { value: EstadosPartido.RECHAZADO, label: 'RECHAZADO' },
    { value: EstadosPartido.CONFIRMADO, label: 'CONFIRMADO' },
    { value: EstadosPartido.COMPLETADO, label: 'COMPLETADO' },
    { value: EstadosPartido.MATCHMAKING, label: 'MATCHMAKING' },
  ];

  constructor(private router:Router,public partidoService: PartidoService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.partidoForm = this.fb.group({
      id: [0], // Asegúrate de agregar las validaciones necesarias
      horario: [null, Validators.required],
      dia: [null, Validators.required],
      telefono: ['', Validators.required],
      precio: ['', Validators.required],
    });
    this.obtenerPartidos();
    // this.buscarPartidoEstado();
  }


  onPageChange(event: any): void {
    // Actualiza el índice de la página
    this.pageIndex = event.pageIndex;

    // Carga los datos de la nueva página
    this.obtenerPartidos();
  }

  goToFirstPage(): void {
    // Ir a la primera página
    this.pageIndex = 0;

    // Cargar los datos de la nueva página
    this.obtenerPartidos();
  }

  goToLastPage(): void {
    // Calcular el índice de la última página
    const totalPages = Math.ceil(this.partidos.length / this.pageSize);
    this.pageIndex = totalPages - 1;

    // Cargar los datos de la nueva página
    this.obtenerPartidos();
  }

  getNombreEstado(estado: EstadosPartido): string {
    switch (estado) {
      case EstadosPartido.ESPERA:
        return 'Espera';
      case EstadosPartido.RECHAZADO:
        return 'Rechazado';
      case EstadosPartido.CONFIRMADO:
        return 'Confirmado';
      case EstadosPartido.COMPLETADO:
        return 'Completado';
      case EstadosPartido.MATCHMAKING:
        return 'Matchmaking';
      default:
        return '';
    }
  }

  obtenerPartidos() {
    this.partidoService.verPartidos().subscribe(
      data => {
        this.partidos = data; // Asigna los datos a la variable partidos
        console.log(data);
      },
      error => {
        console.error(error);
      }
    );
  }
  navegar() { 
    this.router.navigate(['dashboard'])
  }


  agregarPartido(): void {
    if (this.partidoForm.valid) {
      const horario = this.partidoForm.get('horario')?.value;
      const dia = this.partidoForm.get('dia')?.value.toISOString().split('T')[0];
      const telefono = this.partidoForm.get('telefono')?.value;

      this.partidoService.sacarTurno(horario, dia, telefono);
    }
  }



  rechazarPartido(objectId: string): void {
    if (this.partidoForm.valid) {
      this.partidoService.rechazarPartido(objectId).subscribe(
        (result) => {
          console.log(result);
          // Aquí puedes actualizar la lista de partidos o realizar otras operaciones necesarias después de rechazar el partido.
        },
        (error) => console.log('error', error)
      );
    }
  }


  darDeBaja(partidoId: string): void {
    // Llama al método darDeBaja del servicio
    this.partidoService.darDeBaja(partidoId).subscribe(
      (result) => {
        console.log('Éxito al dar de baja:', result);
        // Realiza cualquier otra acción necesaria después del éxito
      },
      (error) => {
        console.log('Error al dar de baja:', error);
        // Realiza cualquier otra acción necesaria en caso de error
      }
    );
  }



  crearPartido() {
    const { horario, dia, telefono, precio } = this.partidoForm.value;

    // Verifica si el formulario es válido antes de llamar al servicio
    if (this.partidoForm.valid) {
      this.partidoService.crearPartido(horario, dia, telefono, precio);
    } else {
      console.log('Formulario no válido. Por favor, complete todos los campos requeridos.');
    }
  }

  confirmarPartido() {
    // Obtener el ID del partido
    const partidoId = this.partidoForm.value.id;

    // Llamar al método confirmarPartido del servicio
    this.partidoService.confirmarPartido(partidoId).subscribe(
      result => console.log(result),
      error => console.error('Error al confirmar el partido', error)
    );
  }

  completar() {

    const partidoId = this.partidoForm.value.id;
    // Llamando al método completar del servicio
    this.partidoService.completar(partidoId).subscribe(
      (result) => {
        // Manejar el resultado si es necesario
        console.log(result);
      },
      (error) => {
        // Manejar el error si es necesario
        console.error(error);
      }
    );
  }

  buscarPartidoEstado() {
    if (!this.selectedEstado) {
      // Manejar el caso en que no se ha seleccionado ningún estado
      console.error('Error: No se ha seleccionado un estado');
      return;
    }
  
    this.partidoService.buscarPartidoEstado(this.selectedEstado).subscribe(
      result => {
        // Ajusta la asignación según la estructura del resultado
        this.partidos = result.partidos || result;
        console.log(result);
      },
      error => {
        console.error('Error:', error);
      }
    );
  }
  



  buscarPartido() {
    // Llama al servicio para buscar el partido y actualiza la lista de partidos
    this.partidoService.buscarPartido().subscribe(
      (result) => {
        // Aquí puedes procesar el resultado, por ejemplo, actualizar la lista de partidos
        // this.partidos = result;
        console.log(result);
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }
}
