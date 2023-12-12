import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Jugador } from 'src/app/models/jugador';
import { JugadorService } from 'src/app/services/jugador.service';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  telefono: string = '';
  password: string = '';
  jugadores: Jugador[] = [];
  constructor(private loginService: LoginService, private router: Router, private jugadorService:JugadorService) {}

  ngOnInit(): void {
    localStorage.removeItem('telefono');

    localStorage.removeItem('instanceId');

    this.obtenerJugadores();
   
    
  }

  login(): void {
    this.loginService.login(this.telefono, this.password).subscribe(
      (data) => {
        const valorBooleano = data.result.value;
        if (valorBooleano) {
          this.router.navigate(['/dashboard']);
          Swal.fire(
            '⚽ Bienvenido! ⚽',
            'Nombre de Usuario: ' + `${this.telefono}`,
            'success'
          );
          this.correspondeTelefonoConJugador();
        } else {
          // Si el valor booleano es falso, muestra un cartel de error
          Swal.fire('Error', 'Usuario o contraseña incorrectos', 'error');
        }
      },
      (error) => {
        Swal.fire('Error', 'Inicio de sesión fallido', 'error');
        console.log('Error', error);
      }
    );
  }


  obtenerJugadores(): void {
    this.jugadorService.obtenerJugadores().subscribe(
      (data: Jugador[]) => {
        this.jugadores = data;
        console.log('jugadores: ', this.jugadores);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  correspondeTelefonoConJugador(): void {
    const jugadorEncontrado = this.jugadores.find(
      (jugador) => jugador.telefono === this.telefono
    );

    if (jugadorEncontrado) {
      const email = jugadorEncontrado.mail;
      localStorage.setItem('email', email);
      console.log('Email almacenado en localStorage:', email);
    } else {
      console.log('No se encontró un jugador con el teléfono proporcionado.');
    }
  }

  IraRegistro() {
    this.router.navigate(['/registro']);
  }

  IrAloginEncargado() {
    this.router.navigate(['/loginEncargado']);
  }

  irAJugadores() {
    this.router.navigate(['jugadores']);
  }

  irAEquipos() {
    this.router.navigate(['equipos']);
  }

  irAPartidos() {
    this.router.navigate(['partidos']);
  }
  irADashComun() {
    this.router.navigate(['dashboard']);
  }

  irADashMatchmaking() {
    this.router.navigate(['match']);
  }
}
