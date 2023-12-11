import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { finalize, forkJoin } from 'rxjs';
import { Equipo } from 'src/app/models/equipo';
import { Jugador } from 'src/app/models/jugador';
import { EquipoService } from 'src/app/services/equipo.service';
import { JugadorService } from 'src/app/services/jugador.service';
import { LoginService } from 'src/app/services/login.service';




@Component({
  selector: 'app-equipo',
  templateUrl: './equipo.component.html',
  styleUrls: ['./equipo.component.css'],
  providers: [JugadorService]
})
export class EquipoComponent implements OnInit {

  equipos: Equipo[] = []


  jugadores: Jugador[] = [];
  telefono: string = '';

  constructor(private router: Router, private loginService: LoginService,
    private equipoService: EquipoService, private jugadorService: JugadorService) {

    this.telefono = this.loginService.getTelefono();

  }
  ngOnInit(): void {

    // this.verEquipos();

    this.loginService.telefono$.subscribe(telefono => {
      this.telefono = telefono;
    });


  }


  verEquipos(): void {
    this.equipoService.verEquipos().subscribe(
      (data: Equipo[]) => {
        console.log('Datos del servidor (Equipos):', data);
        this.equipos = [...data];
      },
      (error) => {
        console.error('Error al obtener equipos:', error);
      }
    );
  }


  buscarEquipo(): void {

    const telefono = this.telefono;
  


    this.equipoService.buscarEquipo(telefono).subscribe(
      (data: any[]) => {
        console.log('Datos del servidor (Equipos):', data);

      },
      (error) => {
        console.error('Error al obtener equipos:', error);
      }
    )
  }


  obtenerJugadores(): void {
    this.jugadorService.obtenerJugadores().subscribe(
      (data: Jugador[]) => {
        console.log('Datos del servidor (Jugadores):', data);
        this.jugadores = data;
        // Una vez que se obtienen los jugadores, podemos mostrar los equipos.
      },
      (error) => {
        console.log('Error al obtener jugadores:', error);
      }
    );

  }




  crearEquipo(): void {
    this.equipoService.crearEquipo(this.telefono)
      .pipe(finalize(() => {
        this.verEquipos();
      }))
      .subscribe(
        () => console.log('Equipo creado exitosamente'),
        error => console.error('Error al crear equipo:', error)
      );
  }












  // obtenerJugadoresEquipo(equipo: Equipo): Jugador[] {
  //   return equipo.jugadores || [];
  // }

  // obtenerRepresentante(equipo: Equipo): Jugador | null {
  //   return equipo.jugadores?.[0] || null;
  // }



  irAMatch() {
    this.router.navigate(['/match'])
  }
}




