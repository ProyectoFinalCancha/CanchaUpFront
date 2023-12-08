import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { MatPaginator, MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Jugador } from 'src/app/models/jugador';
import { JugadorService } from 'src/app/services/jugador.service';
import { VerJugadoresComponent } from './ver-jugadores/ver-jugadores.component';
import { MatDialog } from '@angular/material/dialog';
import { finalize } from 'rxjs/operators';





@Component({
  selector: 'app-jugadores',
  templateUrl: './jugadores.component.html',
  styleUrls: ['./jugadores.component.css'],
  providers: [JugadorService]
})
export class JugadoresComponent {

  jugadores: Jugador[] = [];
  telefonoFiltrado: string = ''; // Asegúrate de declarar la propiedad
  nuevoJugador! : Jugador
 




  @ViewChild(MatPaginator) paginator!: MatPaginator;



  constructor(private jugadorService: JugadorService, private router: Router, public dialog: MatDialog) { 
    this.nuevoJugador = {
      nombre: '',
      apellido: '',
      telefono: '',
      mail: '',
      password: '',
      fechaDeNacimiento: new Date(),
    };
  }





  
/////////////////////// PAGINADOR ////////////////////////////
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
///////////////////////////////////////////////////////////////////////////////





  ngOnInit(): void {
    this.obtenerJugadores();
  }

  navegar() {
    this.router.navigate(['/admin2Dash'])
  }




  
///////////////////////GET JUGADORES
  obtenerJugadores(): void {
    this.jugadorService.obtenerJugadores().subscribe(
      (data: Jugador[]) => {
        this.jugadores = [...data];  // Copia directa del arreglo
        console.log('Datos del servidor:', data);
      },
      error => {
        console.log('Error', error);
      }
    );
  }
  
  



  
  buscarJugadorPorTelefono(telefono: string): void {
    this.jugadorService.buscarJugadorPorTelefono(telefono)
      .subscribe(data => {
        console.log(data);
        if (telefono.trim() !== '') {
          // Si hay un teléfono especificado en el filtro, mostrar los resultados filtrados
          this.jugadores = Array.isArray(data) ? data : [data];
        } else {
          // Si no hay teléfono especificado, mostrar todos los jugadores
          this.obtenerJugadores();
        }
        this.totalItems = this.jugadores.length;
        this.currentPage = 1;
        this.paginator?.firstPage();
      }, error => {
        console.log('Error', error);
      });
  }
  
  
  
  
  

  crearJugador(jugadorForm: NgForm): void {
    if (jugadorForm.valid) {
      this.jugadorService.crearJugador(this.nuevoJugador)
        .pipe(finalize(() => {
          this.obtenerJugadores();
          this.nuevoJugador = new Jugador();
        }))
        .subscribe(
          () => console.log('Jugador creado exitosamente'),
          error => console.error('Error al crear jugador:', error)
        );
    }
  }
  


  eliminarJugador(instanceId: string | undefined): void {
    if (instanceId !== undefined) {
      this.jugadorService.eliminarJugador(instanceId)
        .subscribe(data => {
          console.log('Jugador eliminado:', data);
          this.obtenerJugadores();
        }, error => {
          console.error('Error al eliminar jugador', error);
        });
    } else {
      console.log('El $$instanceId es undefined.');
    }
  }
  
  
  
  
  
  
  
  
  
  salir(){
    this.router.navigate(['/login']);
  }

  partidos(){
    this.router.navigate(['/partidos'])
  }
  encargados(){
    this.router.navigate(['/encargados'])
  }
  
  scrollToDiv() {
    const div = document.getElementById('tabla');
  console.log(div);
    if (div !== null) {
      div.scrollIntoView({ behavior: 'smooth' });
    }
  }
  
  
  

///////////////////////METODO QUE ABRE EL POPUP
  openEditDialog(jugador: Jugador): void {
    const dialogRef = this.dialog.open(VerJugadoresComponent, {
      width: '460px', // Personaliza el ancho según tus necesidades
      data: jugador, // Pasa el encargado al componente del diálogo
    });
  
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
      
        console.log('Encargado editado:', result);
      }
    });
  }






 


}