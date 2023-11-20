import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { MatPaginator, MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Jugador } from 'src/app/models/jugador';
import { JugadorService } from 'src/app/services/jugador.service';
import { VerJugadoresComponent } from './ver-jugadores/ver-jugadores.component';
import { MatDialog } from '@angular/material/dialog';





@Component({
  selector: 'app-jugadores',
  templateUrl: './jugadores.component.html',
  styleUrls: ['./jugadores.component.css'],
  providers: [JugadorService]
})
export class JugadoresComponent {

  jugadores: Jugador[] = [];
  telefonoFiltrado: string = ''; // Asegúrate de declarar la propiedad

  nuevoJugador: Jugador = {
    nombre: '',
    apellido: '',
    telefono: '',
    mail: '',
    password: '',
    username: '',
    fechaDeNacimiento: new Date() 
  };

  @ViewChild(MatPaginator) paginator!: MatPaginator;



  constructor(private jugadorService: JugadorService, private router: Router, public dialog: MatDialog) { }


  currentPage = 1;
  pageSize = 10; // Ajusta el tamaño de la página según tus necesidades
  totalItems = 0;

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
  


  ngOnInit(): void {
    this.obtenerJugadores();
  }

  navegar() {
    this.router.navigate(['dashboard'])
  }

  obtenerJugadores(): void {
    this.jugadorService.obtenerJugadores()
      .subscribe(data => {
        console.log('Datos del servidor:', data); // Agregado para depurar
        this.jugadores = data; 
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

  crearJugador(jugadorForm: NgForm): void {
    if (jugadorForm.valid) {
      this.jugadorService.crearJugador(this.nuevoJugador)
        .subscribe(
          () => {
            console.log('Jugador creado exitosamente');
            this.obtenerJugadores();
            jugadorForm.resetForm();
            this.nuevoJugador = new Jugador(); // Crear una nueva instancia de Jugador
          },
          (error) => {
            console.error('Error al crear jugador:', error);
            // Puedes mostrar un mensaje de error o realizar acciones específicas aquí
          }
        );
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