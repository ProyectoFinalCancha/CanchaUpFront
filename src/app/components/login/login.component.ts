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
  constructor(
    private loginService: LoginService,
    private router: Router,
    private jugadorService: JugadorService
  ) {}

  ngOnInit(): void {
    localStorage.clear();
    console.log('telefono:', this.telefono);

    this.obtenerJugadores();
  }

  login(): void {
    localStorage.clear();

    this.loginService.login(this.telefono, this.password).subscribe(
      (data) => {
        const valorBooleano = data.result.value;
        if (valorBooleano) {
          this.correspondeTelefonoConJugador();
          this.router.navigate(['/dashboard']);
          Swal.fire(
            '⚽ Bienvenido! ⚽',
            'Nombre: ' +
              `${localStorage.getItem('nombre')}` +
              '&nbsp;&nbsp;&nbsp;Apellido: ' +
              `${localStorage.getItem('apellido')}`,
            'success'
          );
        } else {
          Swal.fire('Error', 'Usuario o contraseña incorrectos', 'error');
        }
      },
      (error) => {
        if (error.status === 500) {
          Swal.fire('Error', 'Error del servidor, pruebe denuevo');
        }
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
        location.reload();
      }
    );
  }

  correspondeTelefonoConJugador(): void {
    const jugadorEncontrado = this.jugadores.find(
      (jugador) => jugador.telefono === this.telefono
    );

    if (jugadorEncontrado) {
      const email = jugadorEncontrado.mail;
      const nombre = jugadorEncontrado.nombre;
      const apellido = jugadorEncontrado.apellido;

      localStorage.setItem('apellido', apellido);
      localStorage.setItem('nombre', nombre);
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
}
