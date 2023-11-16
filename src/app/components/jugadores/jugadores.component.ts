import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { MatPaginator, MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Jugador } from 'src/app/models/jugador';
import { JugadorService } from 'src/app/services/jugador.service';
import { VerJugadoresComponent } from './ver-jugadores/ver-jugadores.component';
import { MatDialog } from '@angular/material/dialog';


class CustomPaginatorIntl extends MatPaginatorIntl {
  override itemsPerPageLabel = 'Items por página';
  override nextPageLabel = 'Siguiente';
  override previousPageLabel = 'Anterior';
  override firstPageLabel = 'Primera página';
  override lastPageLabel = 'Última página';
  override getRangeLabel = (page: number, pageSize: number, length: number) => {
    if (length === 0 || pageSize === 0) {
      return `0 de ${length}`;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    const endIndex = startIndex < length ?
      Math.min(startIndex + pageSize, length) :
      startIndex + pageSize;
    return `${startIndex + 1} - ${endIndex} de ${length}`;
  };
}


@Component({
  selector: 'app-jugadores',
  templateUrl: './jugadores.component.html',
  styleUrls: ['./jugadores.component.css'],
  providers: [JugadorService]
})
export class JugadoresComponent {

  jugadores: Jugador[] = [];
  telefonoFiltrado: string = ''; // Asegúrate de declarar la propiedad
  nuevoJugador: any = {};

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  paginatorIntl = new CustomPaginatorIntl();

  constructor(private jugadorService: JugadorService, private router: Router, public dialog: MatDialog) { }


  currentPage = 1;

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginator?.previousPage();
    }
  }
  
  nextPage() {
    if (this.currentPage < this.totalPages()) {
      this.currentPage++;
      this.paginator?.nextPage();
    }
  }
  
  totalPages(): number {
    if (this.paginator) {
      // Obtener el número total de elementos desde el paginador
      const totalItems = this.paginator.length || 0;
  
      // Calcular el número total de páginas
      return Math.ceil(totalItems / this.paginator.pageSize);
    }
  
    return 0; // o algún valor predeterminado si el paginador no está disponible
  }
  


  ngOnInit(): void {
    this.obtenerJugadores();
  }

  navegar() {
    this.router.navigate(['dashboard'])
  }

  obtenerJugadores(): void {
    this.jugadorService.obtenerJugadores()
      .subscribe(data => {
        this.jugadores = data; // Cambiar de data.result.value a data
      }, error => {
        console.log('Error', error);
      });
  }
  

  buscarJugadorPorTelefono(telefono: string): void {
    this.jugadorService.buscarJugadorPorTelefono(telefono)
      .subscribe(data => {
        console.log(data);
      }, error => {
        console.log('Error', error);
      });
  }
  agregarJugadorLocal(jugadorForm: NgForm): void {
    if (jugadorForm.valid) {
      this.jugadorService.crearJugador(this.nuevoJugador)
        .subscribe(data => {
          console.log('Jugador creado:', data);
          // Actualizar la lista de jugadores después de la creación
          this.obtenerJugadores();
          // Limpiar el formulario
          jugadorForm.resetForm();
        }, error => {
          console.log('Error al crear jugador', error);
        });
    }
  }


  eliminarJugadorLocal(objectId: string | number | undefined): void {
    if (objectId !== undefined) {
      this.jugadorService.eliminarJugador(objectId.toString())
        .subscribe(data => {
          console.log('Jugador eliminado:', data);
          this.obtenerJugadores();
        }, error => {
          console.log('Error al eliminar jugador', error);
        });
    } else {
      console.log('objectId es undefined. No se puede eliminar el jugador.');
    }
  }







  openEditDialog(jugador: Jugador): void {
    const dialogRef = this.dialog.open(VerJugadoresComponent, {
      width: '460px', // Personaliza el ancho según tus necesidades
      data: jugador, // Pasa el encargado al componente del diálogo
    });
  
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        // Aquí puedes manejar los datos actualizados si es necesario
        console.log('Encargado editado:', result);
      }
    });
  }
}