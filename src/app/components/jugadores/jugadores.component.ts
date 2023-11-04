import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Jugador } from 'src/app/models/jugador';
import { JugadorService } from 'src/app/services/jugador.service';
import { SharedService } from 'src/app/services/shared/shared.service';

import { MatDialog } from '@angular/material/dialog';
import { VerJugadoresComponent } from './ver-jugadores/ver-jugadores.component';

@Component({
  selector: 'app-jugadores',
  templateUrl: './jugadores.component.html',
  styleUrls: ['./jugadores.component.css'],
  providers: [JugadorService]
})
export class JugadoresComponent {

  jugadorPorPagina: Jugador[] = [];
  jugadores: Jugador[] = [];

  telefonoFiltrado: string = '';
  jugadoresSinFiltrar: Jugador[] = [];

  

  nuevoJugador: Jugador = {
    id: 0, // Otra propiedad si lo deseas
    nombre: '',
    apellido: '',
    telefono: '',
    mail: '',
    password: '',
    username: ''
  };
  nuevoJugadores: Jugador[] = [];


  
  constructor(public jugadorService: JugadorService, private router: Router, private sharedService: SharedService, public dialog: MatDialog) {
    this.jugadorService = jugadorService
  }

  ngOnInit() {
  this.sharedService.jugadores$.subscribe((jugadores) => {
    this.jugadores = jugadores;
    console.log('Jugadores actualizados desde SharedService:', this.jugadores);
  });

  this.getJugadoresLocal();
}

  @ViewChild('jugadoresTable', { static: true }) jugadoresTable!: ElementRef;
 





  //////////////////////////////////////local storage
  agregarJugadorLocal(form: NgForm) {
    if (form.valid) {
      const nuevoJugador = { ...this.nuevoJugador };
      this.jugadorService.crearJugadorLocal(nuevoJugador);
      this.nuevoJugadores.push(nuevoJugador);
      form.reset();
    }
    this.getJugadoresLocal();
    window.location.reload()
  }



  borrarJugadorLocal(id: number | undefined, form: NgForm) {
    if (id !== undefined) {
      if (confirm("¿Estás seguro de borrar el jugador?")) {
        const index = this.nuevoJugadores.findIndex((jugador) => jugador.id === id);
        if (index !== -1) {
          this.nuevoJugadores.splice(index, 1);
          this.jugadorService.borrarJugadorLocal(id);
          form.reset();
          this.getJugadoresLocal(); // Agregar esta línea para restaurar la lista completa
        }
      } else {
        console.error("El ID del jugador es undefined. No se puede borrar.");
      }
    }
  }

  
  buscarJugadorPorTelefono(telefono: string) {
    if (telefono.trim() !== '') {
      this.nuevoJugadores = this.jugadoresSinFiltrar.filter((jugador) =>
        jugador.telefono && jugador.telefono.startsWith(telefono)
      );
    } else {
      this.nuevoJugadores = [...this.jugadoresSinFiltrar];
    }
  }
  
  


  getJugadoresLocal() {
    // Obtener jugadores del Local Storage
    const jugadoresLocalStorage = this.jugadorService.getJugadoresLocalStorage();
    this.jugadoresSinFiltrar = [...jugadoresLocalStorage];
    this.nuevoJugadores = [...jugadoresLocalStorage];
    console.log('Jugadores: ' , this.nuevoJugadores)
  }
  ////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////











  @ViewChild(MatPaginator) paginator!: MatPaginator;
  goToFirstPage() {
    this.paginator.firstPage();
  }

  goToLastPage() {
    this.paginator.lastPage();
  }
  onPageChange(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.jugadorPorPagina = this.jugadores.slice(startIndex, endIndex);
  }

  getJugadores() {
    this.jugadorService.getJugadores().subscribe((res) => {
      // this.jugadorService.jugadores = res;
      // this.sharedService.jugadores = res;
    });
  }

  buscarJugador(id: any) {
    const telefono = '1';
    this.jugadorService.getJugador(id).subscribe(
      (response) => {
        console.log('Respuesta exitosa:', response);
      },
      (error) => {

        console.error('Error:', error);
      }
    )
  }
  agregarJugador(form: NgForm) {
    this.jugadorService.crearJugador(form.value).subscribe((res) => {
      this.getJugadores();
      this.resetForm(form);
    })
  }

  resetForm(form: NgForm) {
    if (form) {
      form.reset();
      this.jugadorService.jugador = new Jugador()
    }
  }

  borrarJugador(id: number, form: NgForm) {
    if (confirm("Estas seguro de borrar el jugador?")) {
      this.jugadorService.deleteJugador(id).subscribe((res) => {
        this.getJugadores();
        this.resetForm(form);
      })
    }
  }

  navegar() {
    this.router.navigateByUrl('/adminDash')
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